

#if token not found -> infer part of speech from next word / phrase

#NPC
# introvert vs extrovert --> threshold for social excite
# if excited --> talk a lot (long AdjP)


# Recursive Descent Parser for a simplified English grammar
# Grammar (as implemented):
# S -> subordinate_conj_sentence subject predicate conj_sentence
# S   -> (CP)? NP PRED (CP)?
# PRED -> VERB (OBJ)? (PP)* (ADV)? (CP)?
# OBJ -> (DT)? (AdjP)? NOUN (PP)? (CONJ NP)? (VP)?
# NP  -> (DT)? (AdjP)? NOUN (PP)? (CONJ_NP)?
# AdjP-> ADJ (CONJ ADJ)? (ADJ)*
# PP  -> PREP NP
# VP  -> VERB (NP)? (PP)* (ADV)? (CP)?
# CP  -> CONJ S     (conjunction introducing a clause, e.g., 'that', 'because' treated as conj here)
# CNP -> CONJ NP (in subject parse)
# AP  -> W S        (relative / complementizer like 'that', 'who', 'whose' + S)
#
# Notes:
# - Lexicons are small and extensible; unknown words are handled heuristically.
# - add a POS tagger for better performance.

from typing import List, Optional

#TODO
# - add Clause class

# --- AST Node classes ---
class Node:
    def pretty(self, indent=0):
        pad = "  " * indent
        return pad + repr(self)

class Sentence(Node):
    def __init__(self, subject, predicate, cp=None, sc=None):
        self.sc = sc #subordinate conjunction
        self.subject = subject
        self.predicate = predicate
        self.cp = cp
    def __repr__(self):
        return (f", CP={self.sc}" if self.sc else "")+f"S(subject={self.subject}, predicate={self.predicate}" + (f", CP={self.cp}" if self.cp else "") + ")"

class NP(Node):
    def __init__(self, det, adjs: List[str], noun: str, pp=None, conj_np=None):
        self.det = det
        self.adjs = adjs
        self.noun = noun
        self.pp = pp
        self.conj_np = conj_np
    def __repr__(self):
        return f"NP(det={self.det}, adjs={self.adjs}, noun='{self.noun}'" + (f", pp={self.pp}" if self.pp else "") + (f", conj_np={self.conj_np}" if self.conj_np else "") + ")"

class AdjP(Node):
    def __init__(self, adjs: List[str]):
        self.adjs = adjs
    def __repr__(self):
        return f"AdjP({self.adjs})"

class PP(Node):
    def __init__(self, prep: str, np: NP):
        self.prep = prep
        self.np = np
    def __repr__(self):
        return f"PP(prep='{self.prep}', np={self.np})"

class VP(Node):
    def __init__(self, verb: List[str], obj: Optional[NP]=None, pps: Optional[List[PP]]=None, adv: Optional[str]=None, cp: Optional['CP']=None):
        self.verb = verb            # list to capture aux + main
        self.obj = obj
        self.pps = pps or []
        self.adv = adv
        self.cp = cp
    def __repr__(self):
        return f"VP(verb={self.verb}, obj={self.obj}, pps={self.pps}" + (f", adv='{self.adv}'" if self.adv else "") + (f", cp={self.cp}" if self.cp else "") + ")"

class CP(Node):
    def __init__(self, conj: str, s: Sentence):
        self.conj = conj
        self.s = s
    def __repr__(self):
        return f"CP(conj='{self.conj}', s={self.s})"

class CNP(Node):
    def __init__(self, conj: str, np: NP):
        self.conj = conj
        self.np = np
    def __repr__(self):
        return f"CNP(conj='{self.conj}', s={self.np})"


class AP(Node):  # AP -> w S  (e.g., "that he left")
    def __init__(self, w: str, s: Sentence):
        self.w = w
        self.s = s
    def __repr__(self):
        return f"AP(w='{self.w}', s={self.s})"

class PRED(Node):
    def __init__(self, adv_pre=None, verb=None, obj=None, pps=None, adv_post=None, cp=None):
        self.adv_pre = adv_pre
        self.verb = verb or []
        self.obj = obj
        self.pps = pps or []
        self.adv_post = adv_post
        self.cp = cp
    def __repr__(self):
        return f"PRED(adv_pre={self.adv_pre}, verb={self.verb}, obj={self.obj}, pps={self.pps}, adv_post={self.adv_post}, cp={self.cp})"

class OBJ(Node):
    def __init__(self, det=None, adjs=None, noun=None, pp=None, conj_np=None, vp=None):
        self.det = det
        self.adjs = adjs or []
        self.noun = noun
        self.pp = pp
        self.conj_np = conj_np
        self.vp = vp
    def __repr__(self):
        return f"OBJ(det={self.det}, adjs={self.adjs}, noun={self.noun}, pp={self.pp}, conj_np={self.conj_np}, vp={self.vp})"

# --- Adjust S to use PRED ---

# --- Simple lexicons (extendable) ---
PN = {"he", "she", "they", "it", "i", "you", "we", "him", "her", "us", "them", "me"}
DT = {"the","a","an","this","that","these","those","my","your","his","her","its","our","their"}
PREPS = {"in","on","at","with","by","for","to","from","of","about","into","over","under","near","through","between"}
CONJ = {"and","or","but","so","because","if","when","while", "although"}  # includes subordinating words we treat as CP trigger
W_SET = {"that","who","whose","whom","which"}  # complementizers / relative markers
AUX = {"is","are","was","were","have","has","had","do","does","did","will","would","shall","should","can","could","may","might","must","be","being","been"}
# small adjective & adverb lists; treat words ending with -ly as adverb; others can be assumed
ADJ = {"big","small","red","blue","green","old","young","happy","fast","slow","delicious","new","hot","cold","bright","dark","wooden"}
ADV = {"peacefully","quickly","slowly","quietly","loudly","well","badly","recently","already","soon","now","then","here","there", "that"}

# small verb lexicon; if word not present we'll accept it heuristically as a verb when parsing VP
VERBS = {"walked","eat","eats","ate","run","runs","ran","chase","chased","see","saw","think","thinks","said","say","says","be","am","is","are","have","has","make","made","go","went","sleep","slept","work","works","study","studies","know","knows","like","likes"}#left


# --- Tokenizer / scanner ---
class TokenStream:
    def __init__(self, text: str):
        # basic tokenization: split on whitespace and punctuation (~), keep tokens lower-cased
        import re
        tokens = re.findall(r"[A-Za-z']+|[.,;()?]", text)
        self.tokens = [t.lower() for t in tokens if t.strip()]
        self.i = 0

    def peek(self):
        if self.i < len(self.tokens):
            return self.tokens[self.i]
        return None

    def future(self):
        if self.i + 1 < len(self.tokens):
            return self.tokens[self.i + 1]
        return None

    def next(self):
        tok = self.peek()
        if tok is not None:
            self.i += 1
        return tok

    def eof(self):
        return self.peek() is None

# --- Recursive Descent Parser ---
class RDParser:
    def __init__(self, text: str):
        self.ts = TokenStream(text)
        # store last token convenient reference but we primarily use self.ts.peek / next
        self.result = self.parseS()

    # Helper tests
    def is_pn(self, tok): return tok in PN
    def is_dt(self, tok): return tok in DT
    def is_prep(self, tok): return tok in PREPS
    def is_conj(self, tok): return tok in CONJ
    def is_w(self, tok): return tok in W_SET
    def is_aux(self, tok): return tok in AUX
    def is_adv(self, tok): return tok in ADV
    def is_adj(self, tok): return tok in ADJ
    def is_verb(self, tok): return tok in VERBS or tok is not None and tok.endswith("s") and tok[:-1] in VERBS

    # --- Implement PRED ---
    def parsePRED(self):
        adv_pre = None
        if self.ts.peek() and self.is_adv(self.ts.peek()):
            adv_pre = self.ts.next()

        verb_words = []
        # collect auxiliaries
        while self.ts.peek() and self.is_aux(self.ts.peek()):
            verb_words.append(self.ts.next())

        if self.ts.peek() and (self.is_verb(self.ts.peek()) or not self.is_dt(self.ts.peek())):
            verb_words.append(self.ts.next())
        else:
            print('the weird condition failed',self.ts.peek())
            return None

        obj = None
        adv_post = None
        if self.ts.peek() and (
                self.is_dt(self.ts.peek()) or self.is_adj(self.ts.peek()) or not self.is_prep(self.ts.peek())):
            if (self.is_dt(self.ts.future()) or self.is_pn(self.ts.future())) and self.is_adv(self.ts.peek()): #TODO - expand to is_noun()
                adv_post = self.ts.next()
                #parseClause()
                print('checking:',self.ts.peek(),self.ts.future())
                obj = self.parseS()
            else:
                obj = self.parseOBJ()
        #TODO
        # - found the bug: check if ts.future() is dt and ts.peak() is adv
        pps = []
        while self.ts.peek() and self.is_prep(self.ts.peek()):
            pp = self.parsePP()
            if pp:
                pps.append(pp)
            else:
                break


        if self.ts.peek() and self.is_adv(self.ts.peek()):
            adv_post = self.ts.next()
            print('hopefully not this line!!!')
        if self.ts.peek() and (
                self.is_dt(self.ts.peek()) or self.is_adj(self.ts.peek()) or not self.is_prep(self.ts.peek())):
            if self.is_dt(self.ts.future()) and self.is_adv(self.ts.peek()):
                print('is this the problem?')
                pass
            else:
                obj = self.parseOBJ()
        cp = None
        if self.ts.peek() and self.is_conj(self.ts.peek()):
            conj = self.ts.next()
            s2 = self.parseS()
            if s2:
                cp = CP(conj, s2)

        return PRED(adv_pre, verb_words, obj, pps, adv_post, cp)

    # --- Implement OBJ ---
    def parseOBJ(self):
        det = None
        if self.ts.peek() and self.is_dt(self.ts.peek()):
            if not self.is_conj(self.ts.peek()): #avoid ambiguity, Ex: '...that the noun...'
                det = self.ts.next()

        adjs = []
        while self.ts.peek() and self.is_adj(self.ts.peek()):
            adjs.append(self.ts.next())

        noun = None
        if self.ts.peek() and not (self.is_prep(self.ts.peek()) or self.is_conj(self.ts.peek())):
            noun = self.ts.next()

        pp = None
        if self.ts.peek() and self.is_prep(self.ts.peek()):
            pp = self.parsePP()

        conj_np = None
        if self.ts.peek() and self.is_conj(self.ts.peek()):
            #self.ts.next()
            #conj_np = self.parseNP() #TODO fix
            #while conjunction

            #conj_np = CNP(self.ts.next(), self.parseNP())
            conj_np = self.parseCP()

        vp = None
        if self.ts.peek() and (self.is_verb(self.ts.peek()) or self.is_aux(self.ts.peek())):
            vp = self.parsePRED()

        return OBJ(det, adjs, noun, pp, conj_np, vp)

    # S -> NP VP (CP)?
    def parseS(self) -> Optional[Sentence]:
        if self.ts.eof():
            return None
        sub_conj = None
        if self.ts.peek() in CONJ:
            sub_conj = CP(self.ts.next(), self.parseS())
        subj = self.parseNP()
        if subj is None:
            # can't find NP — attempt to recover: if sentence starts with 'that'/'who' etc treat as AP/CP
            print('no subject',self.ts.peek())
            return None

        pred = self.parsePRED()
        if pred is None:
            print('no pred, but subj: ',subj)
            return None
        # optional CP (conjunction introducing clause)
        cp = None
        nxt = self.ts.peek()
        if nxt and self.is_conj(nxt):
            """
            conj = self.ts.next()
            s2 = self.parseS()
            if s2:
                cp = CP(conj, s2)
             """
            cp = self.parseCP()
        return Sentence(subj, pred, cp, sub_conj)

    # NP -> (dt) (AdjP) noun (PP) (conj NP)
    def parseNP(self) -> Optional[NP]:
        nxt = self.ts.peek()
        det = None
        noun = None
        if nxt and self.is_dt(nxt):
            det = self.ts.next()
            nxt = self.ts.peek()
        if nxt and self.is_pn(nxt):
            noun = self.ts.next()
            nxt = self.ts.peek()
            if nxt and self.is_conj(nxt):
                conj_noun = self.parseCNP()
            else:
                return NP(det, [], noun, None, None)

        # Collect a sequence of words that likely belong to the NP: adjectives + noun(s)
        words = []
        while nxt and not (self.is_prep(nxt) or self.is_conj(nxt) or self.is_verb(nxt) or self.is_adv(nxt) or nxt in {')',','}):
            words.append(self.ts.next())
            nxt = self.ts.peek()
            # break if we've overrun (allow at least one word)
        if not words:
            return None

        # Heuristic: take last word as noun, previous as adjectives
        noun = words[-1]
        adjs = words[:-1]
        if len(words) == 1:
            noun = words[0]
            adjs = None
        # If the 'noun' actually looks like a determiner/verb/prep due to lexicon gaps, fallback:
        if noun in PREPS or noun in CONJ or self.is_aux(noun) or self.is_verb(noun) or noun in ADV:
            # reject NP (likely this wasn't an NP start)
            print('mistake:', noun)
            return None

        # Optional PP(s) - allow chained prepositional phrases
        pp = None
        if self.ts.peek() and self.is_prep(self.ts.peek()):
            # parse first PP only here (grammar allows one, but we support multiple on VP)
            pp = self.parsePP()

        # Optional conjunction: conj NP
        conj_np = None
        if self.ts.peek() and self.is_conj(self.ts.peek()):
            conj_word = self.ts.peek()
            # Only treat 'and/or/but' as NP conjunction (not 'that')
            if conj_word in {"and","or","but"}:
                #self.ts.next()  # consume conj
                conj_np = self.parseCNP()#TODO -fix so that parseConj

        return NP(det, adjs, noun, pp, conj_np)

    # AdjP -> ADJ (CONJ ADJ)? (ADJ)*  (we handle adjectives as part of NP heuristically above)
    def parseAdjP(self) -> Optional[AdjP]:
        adjs = []
        while self.ts.peek() and self.is_adj(self.ts.peek()):
            adjs.append(self.ts.next())
            if self.ts.peek() and self.is_conj(self.ts.peek()):
                # e.g. "big and small"
                self.ts.next()
                if self.ts.peek() and self.is_adj(self.ts.peek()):
                    adjs.append(self.ts.next())
        if not adjs:
            return None
        return AdjP(adjs)

    # PP -> PREP NP
    def parsePP(self) -> Optional[PP]:
        if not self.ts.peek() or not self.is_prep(self.ts.peek()):
            return None
        prep = self.ts.next()
        np = self.parseNP()
        if np is None:
            # If no NP follows, return None and rewind would be desirable; we keep simple and return None
            return None
        return PP(prep, np)

    # VP -> VERB (NP)? (PP)* (ADV)? (CP)?
    # also handles optional aux: is/was + verb
    def parseVP(self) -> Optional[VP]:
        nxt = self.ts.peek()
        if nxt is None:
            return None
        verb_words = []

        # handle auxiliaries (possibly sequence: aux + aux + main)
        while nxt and self.is_aux(nxt):
            verb_words.append(self.ts.next())
            nxt = self.ts.peek()

        # Now expect a main verb (heuristic: if known verb or anything not dt/prep/conj)
        if nxt is None:
            return None
        if self.is_verb(nxt) or (not self.is_dt(nxt) and not self.is_prep(nxt) and not self.is_conj(nxt)):
            # accept token as verb
            verb_words.append(self.ts.next())
        else:
            # couldn't find verb → fail
            return None

        # Optional object NP (lookahead: dt or adjective or noun-like)
        obj = None
        if self.ts.peek() and (self.is_dt(self.ts.peek()) or self.is_adj(self.ts.peek()) or (self.ts.peek() not in PREPS and self.ts.peek() not in CONJ and not self.is_verb(self.ts.peek()))):
            obj = self.parseNP()

        # Optional sequence of PPs
        pps = []
        while self.ts.peek() and self.is_prep(self.ts.peek()):
            pp = self.parsePP()
            if pp:
                pps.append(pp)
            else:
                break

        # Optional adverb
        adv = None
        if self.ts.peek() and self.is_adv(self.ts.peek()):
            adv = self.ts.next()

        # Optional CP (e.g., "that he left")
        cp = None
        if self.ts.peek() and self.is_conj(self.ts.peek()):
            """
            conj = self.ts.next()
            #self.parseCP()
            s2 = self.parseS()
            if s2:
                cp = CP(conj, s2)
            """
            cp = self.parseCP()
        return VP(verb_words, obj, pps, adv, cp)

    """ def parseCP(self):
        conj = self.ts.next()
        s = self.parseS()
        if s is None:
            return None
        return CP(conj, s)
    """
    def parseCP(self):
        tok = self.ts.peek()
        if tok not in CONJ:
            return None
        conj = self.ts.next()
        # Lookahead: ensure what follows looks like a sentence start
        if self.ts.peek() is None:
            return None
        s = self.parseS()
        if s is None:
            return None
        return CP(conj, s)

    def parseCNP(self):
        conj = self.ts.next()
        np = self.parseNP()
        if np is None:
            return None
        return CNP(conj, np)

    # For debugging, pretty-print parse tree indented
    def pretty_print(self, node=None, indent=0):
        if node is None:
            node = self.result
        pad = "  " * indent
        if node is None:
            print(pad + "<empty>")
            return
        if isinstance(node, Sentence):
            print(pad + "Sentence:")
            print(pad + "  Subject:")
            self.pretty_print(node.subject, indent+2)
            print(pad + "  Predicate:")
            self.pretty_print(node.predicate, indent+2)
            if node.cp:
                print(pad + "  CP:")
                self.pretty_print(node.cp, indent+2)

        elif isinstance(node, NP):
            print(pad + f"NP: det={node.det}, adjs={node.adjs}, noun={node.noun}")
            if node.pp:
                print(pad + "  PP:")
                self.pretty_print(node.pp, indent+2)
            if node.conj_np:
                print(pad + "  ConjNP:")
                self.pretty_print(node.conj_np, indent+2)
        elif isinstance(node, VP):
            print(pad + f"VP: verb={' '.join(node.verb)}, adv={node.adv}")
            if node.obj:
                print(pad + "  Object:")
                self.pretty_print(node.obj, indent+2)
            for p in node.pps:
                print(pad + "  PP:")
                self.pretty_print(p, indent+2)
            if node.cp:
                print(pad + "  CP:")
                self.pretty_print(node.cp, indent+2)
        elif isinstance(node, PP):
            print(pad + f"PP: {node.prep}")
            self.pretty_print(node.np, indent+1)
        elif isinstance(node, CP):
            print(pad + f"CP conj={node.conj}")
            self.pretty_print(node.s, indent+1)
        elif isinstance(node, CNP):
            print(pad + f"CP conj={node.conj}")
            self.pretty_print(node.np, indent + 1)
        elif isinstance(node, AP):
            print(pad + f"AP w={node.w}")
            self.pretty_print(node.s, indent+1)
        elif isinstance(node, PRED):
            print(pad + f"VP: verb={' '.join(node.verb)}, adv_pre={node.adv_pre}, adv_post={node.adv_post}")
            if node.obj:
                print(pad + "  Object:")
                self.pretty_print(node.obj, indent + 2)
            for p in node.pps:
                print(pad + "  PP:")
                self.pretty_print(p, indent + 2)
            if node.cp:
                print(pad + "  CP:")
                self.pretty_print(node.cp, indent + 2)
        elif isinstance(node, OBJ):
            print(pad + f"NP: det={node.det}, adjs={node.adjs}, noun={node.noun}")
            if node.pp:
                print(pad + "  PP:")
                self.pretty_print(node.pp, indent + 2)
            if node.conj_np:
                print(pad + "  ConjNP:")
                self.pretty_print(node.conj_np, indent + 2)
        else:
            print(pad + repr(node))


# --- Example usage / tests ---
if __name__ == "__main__":
    examples = [
        "The big dog chased the cat",
        "The big dog chased the cat and the cat chased the dog",

        "A man with a telescope saw the star",
        "She thinks that the dog chased the cat",
        "The old man and the young boy walked in the park",
        "John gave Mary a book",
        "Although it was raining, the children continued playing",   # may fail CP because 'although' not in CONJ set as CP trigger
        "I know that he said that she left",
        "The cat on the mat near the window slept peacefully",
        "They quickly ate the delicious bread in the morning",
        "The king is dead and it is sad"   # edge-case (CP as subject) — parser expects NP first; may not parse
    ]
    # -> tobe_state -> tobe Adj

    for sent in examples:
        print("\n---")
        print("Input:", sent)
        p = RDParser(sent)
        if p.result is None:
            print("Parse failed or partial parse.")
        else:
            p.pretty_print()

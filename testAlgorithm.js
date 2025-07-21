const badPairs = [
  ['cucumber', 'potato'],
  ['lettuce', 'parsley'],
  ['onion', 'parsley'],
  ['garlic', 'parsley'],
  ['potato', 'carrot'],
  ['squash', 'potato'],
  ['tomato', 'corn'],
  ['tomato', 'cucumber'],
  ['tomato', 'potato'],
  ['tomato', 'broccoli'],
  ['tomato', 'cabbage'],
  ['egg plant', 'tomato'],
  ['broccoli', 'squash'],
  ['broccoli', 'bell pepper'],
  ['basil', 'mint'],
  ['green beans', 'garlic'],
  ['green beans', 'onion'],
  ['green beans', 'bell pepper'],
  ['green beans', 'peas'],
  ['peas', 'garlic'],
  ['peas', 'onion'],
  ['peas', 'bell pepper'],
  ['beetroot', 'chard'],
  ['spinach', 'potato'],
  ['spinach', 'corn'],
  ['corn', 'egg plant'],
  ['spinach', 'egg plant'],
  ['spinach', 'bell pepper'],
  ['spinach', 'chard'],
  ['rhubarb', 'broccoli'],
  ['rhubarb', 'cabbage'],
  ['chard', 'potato'],
  ['corn', 'broccoli'],
  ['corn', 'cabbage'],
  ['corn', 'kale'],
  ['lettuce', 'broccoli'],
  ['lettuce', 'cabbage'],
  ['lettuce', 'kale'],
  ['potato', 'egg plant'],
  ['potato', 'bell pepper'],
  ['broccoli', 'egg plant'],
  ['potato', 'broccoli']
];
const goodPairs = [
    ['tomato', 'basil'],
    ['tomato', 'marigold']
]
//console.log(badPairs)
//TODO : check for typos: for each element in pairs in badPairs, check if element exists in PLANTS

// - add celery

//element wise array subtraction
function listDistance(A,B){
    //C = A - B
    C = []
    if (A.length != B.length){
        alert('listDistance() error!')
        return
    }
    for (var i = 0; i < A.length; i++){
        C.push(A[i] - B[i])
    }
    return C
}
//min count element in dictionary
function argminCount(set, countMap){
    min_val = 99999
    min_key = set[0]
    for (const x of set){
        if (countMap[x] < min_val){
            min_val = countMap[x]
            min_key = x
        }
    }
    return min_key
}

function containsBadPair(subset, badPairs) {
  const set = new Set(subset.map(p => p.toLowerCase()));
  for (const [a, b] of badPairs) {
    if (set.has(a) && set.has(b)) {
      return true;
    }
  }
  return false;
}

function generatePowerSet(arr) {
  const powerSet = [];
  const total = Math.pow(2, arr.length);

  for (let i = 1; i < total; i++) {
    const subset = [];
    for (let j = 0; j < arr.length; j++) {
      if (i & (1 << j)) {
        subset.push(arr[j]);
      }
    }
    powerSet.push(subset);
  }

  return powerSet;
}

function validPowerSet(myPlants) {
  const normalized = myPlants.map(p => p.toLowerCase());
  const powerSet = generatePowerSet(normalized);
  return powerSet.filter(subset => !containsBadPair(subset, badPairs));
}
function rebalanceOptimization(goodCombos, numberOfBeds, SS, IS, plantList) {
    plantList = plantList.map(p => p.toLowerCase())
    const herbsAndFlowers = new Set(['basil', 'mint', 'oregano', 'parsley', 'thyme', 'marigold', 'lemon grass', 'garlic']);
    const highCal = new Set(['potato', 'corn','sweet potato', 'peas', 'green beans'])
    const medCal = new Set(['onion', 'carrot', 'squash', 'beetroot'])
    const lowCal = new Set(['tomato', 'bell pepper', 'egg plant', 'zucchini', 'cucumber', 'broccoli', 'kale', 'cabbage', 'lettuce', 'spinach', 'rhubarb', 'chard'])


    var herbLimit = Math.ceil(4*IS)
    var nonHerbLimit = Math.ceil(3*IS)
    if (nonHerbLimit < 1){
        nonHerbLimit = 1
    }
    console.log('non herb limit: ',nonHerbLimit)
    newGoodCombos = []
    for (const combo of goodCombos){
        //count number of herbs and number of non herbs
        //if num < limit --> newGoodCombos.push(combo)
        herbCounter = 0
        nonHerbCounter = 0
        for(const p of combo){
            if (herbsAndFlowers.has(p)){
                herbCounter += 1
            }
            else{
                nonHerbCounter += 1
            }
        }
        if (herbCounter <= herbLimit && nonHerbCounter <= nonHerbLimit){
            newGoodCombos.push(combo)
        }
    }
    goodCombos = newGoodCombos

    const numberOfPlants = plantList.length


    //probability distribution = f(SS = SurvivalScore)
    var f_herb = 0.15 - 0.111*SS //target frequency
    var f_low = 0.25 //target frequency
    var f_med = 0.55 - 0.333*SS //target frequency
    var f_high = 0.05 + 0.444*SS //target frequency
    //adjust target frequencies if we dont want group to be represented
    console.log('plantlist: ',plantList)
    if (plantList.filter(p => herbsAndFlowers.has(p)).length < 1){
        f_herb = -999
    }
    if (plantList.filter(p => lowCal.has(p)).length < 1){
        f_low = -999
    }
    if (plantList.filter(p => medCal.has(p)).length < 1){
        f_med = -999
    }
    if (plantList.filter(p => highCal.has(p)).length < 1){
        f_high = -999
    }
    var target_frequencies = [f_herb, f_low, f_med, f_high]

    var bedCount = 0
    // 1) return plantlist
    if (IS < 0.3 && numberOfBeds == numberOfPlants){
        return goodCombos.filter(c => c.length == 1)
    }
    const finalCombos = [];
    //const usedNonHerbs = new Set();
    //const herbUseCount = {};
    var plantUseCount = {'average':0};
    for (var i = 0; i < plantList.length; i++){
        plantUseCount[plantList[i]] = 0
    }
    var problemo = false
    var groupCount = {'herb': 0, 'low': 0, 'med': 0, 'high':0, 'total': 0}
    const groupMap = [herbsAndFlowers, lowCal, medCal, highCal]

    if (IS <= 0.1){
        //no combos
        if (numberOfBeds < numberOfPlants){
            //this user is a reeeetard --> infect their computer with a super dangerous virus
            problemo = true
        }
        const pool = goodCombos.filter(c => c.length == 1)

        //first iterate through each in pool
        if (!problemo){
            for (const combo of pool){
                finalCombos.push(combo)
                for (const p of combo) {
                    plantUseCount[p] = plantUseCount[p] + 1;

                    if (herbsAndFlowers.has(p)){
                        groupCount['herb'] += 1
                    }
                    if (highCal.has(p)){
                        groupCount['high'] += 1
                    }
                    if (medCal.has(p)){
                        groupCount['med'] += 1
                    }
                    if (lowCal.has(p)){
                        groupCount['low'] += 1
                    }
                    groupCount['total'] += 1
                }
                bedCount += 1
            }
        }
        while (bedCount < numberOfBeds){
            //select from pool according to distribution
            //start with least represented group
            //check representation
            //p_herb, p_l, p_m, p_h
            //console.log(bedCount)

            var current_frequencies = [groupCount['herb']/bedCount, groupCount['low']/bedCount, groupCount['med']/bedCount, groupCount['high']/bedCount]
            console.log('cf: ', current_frequencies)
            console.log('tf: ', target_frequencies)
            //least represented group = max distance(current, target)... pool = least represented group
            dd = listDistance(target_frequencies, current_frequencies)
            console.log('dd: ', dd)
            group = groupMap[dd.indexOf(Math.max(...dd))]
            //PROBLEM, this assumes we want each group...
            //need max from group that we want.. therefore change target frequencies if we dont want group
            console.log('group: ',group)
            //randomly pick plant from myList that is in pool
            choices = plantList.filter(p => group.has(p)) //choices is a sub set of plantList intersecting the desired group
            console.log('choices: ', choices)
            //plant = choices[Math.floor(Math.random() * choices.length)]
            //instead of randomly choosing fom group, pick plant with minimum count in group
            plant = argminCount(choices, plantUseCount)
            console.log('plant: ', plant)
            //add combo containing plant to bed
            for (const combo of pool){
                if (combo.includes(plant)){
                    finalCombos.push(combo) //potential error of always selecting first valid combo... therefore use que and move used combo to back
                    for (const p of combo) {
                        plantUseCount[p] = plantUseCount[p] + 1;
                        if (herbsAndFlowers.has(p)){
                            groupCount['herb'] += 1
                        }
                        if (highCal.has(p)){
                            groupCount['high'] += 1
                        }
                        if (medCal.has(p)){
                            groupCount['med'] += 1
                        }
                        if (lowCal.has(p)){
                            groupCount['low'] += 1
                        }
                        groupCount['total'] += 1
                    }
                    bedCount += 1
                    break
                }
            }
        }
        return finalCombos
    }

    // IS score is not = 0
    // 1. Prioritize diverse combinations
    goodCombos.sort((a, b) => b.length - a.length);
    while (bedCount < numberOfBeds){
        //select from pool according to distribution
        //start with least represented group
        //check representation
        //p_herb, p_l, p_m, p_h
        //console.log(bedCount)

        var current_frequencies = [groupCount['herb']/bedCount, groupCount['low']/bedCount, groupCount['med']/bedCount, groupCount['high']/bedCount]
        if (bedCount < 1){
            current_frequencies = [0, 0, 0, 0]
        }
        console.log('bc: ',bedCount)
        console.log('gc: ', groupCount)
        console.log('cf: ', current_frequencies)
        console.log('tf: ', target_frequencies)
        //least represented group = max distance(current, target)... pool = least represented group
        dd = listDistance(target_frequencies, current_frequencies)
        console.log('dd: ', dd)
        group = groupMap[dd.indexOf(Math.max(...dd))]
        //PROBLEM, this assumes we want each group...
        //need max from group that we want.. therefore change target frequencies if we dont want group
        console.log('group: ',group)
        //randomly pick plant from myList that is in pool
        choices = plantList.filter(p => group.has(p)) //choices is a sub set of plantList intersecting the desired group
        console.log('choices: ', choices)
        //plant = choices[Math.floor(Math.random() * choices.length)]
        //instead of randomly choosing fom group, pick plant with minimum count in group
        plant = argminCount(choices, plantUseCount)
        console.log('plant: ', plant)
        console.log('plantcount: ',plantUseCount)
        //add combo containing plant to bed
        pool = []
        poolScores = [] //pool index: score
        for (const combo of goodCombos){
            // collect all combos that have the plant, then select the best combo
            //best combo = combo with max score
            //score = f(least represented plants)
            if (combo.includes(plant)){
                pool.push(combo)
                //calculate score
                score = 0
                //if combo contains goodPair --> score += 5
                //5 is arbitray number.. therefore use a statistic instead of 5
                for (const p of combo){
                    //add to score
                    //score = distance(ave_count) = plantU'average' - count
                    score += plantUseCount['average'] - plantUseCount[p]
                }
                poolScores.push(score)
            }
        }
        //find max score
        max_score = poolScores[0]
        max_score_indx = 0
        for (var i = 0; i < pool.length; i++){
            if (poolScores[i] > max_score){
                max_score_indx = i
                max_score = poolScores[i]
            }
        }
        finalCombos.push(pool[max_score_indx]) //

        //update counts
        for (const p of pool[max_score_indx]) {
            plantUseCount[p] = plantUseCount[p] + 1;
            //TODO -update plantUseCount['average']
            if (herbsAndFlowers.has(p)){
                groupCount['herb'] += 1
            }
            if (highCal.has(p)){
                groupCount['high'] += 1
            }
            if (medCal.has(p)){
                groupCount['med'] += 1
            }
            if (lowCal.has(p)){
                groupCount['low'] += 1
            }
            groupCount['total'] += 1
        }
        bedCount += 1
        //update plantUseCount['average']
        //average = sum/sample_size
        sum = 0
        for (var i = 0; i < plantList.length; i++){
            sum += plantUseCount[plantList[i]]
        }
        plantUseCount['average'] = sum/plantList.length



    }
    //check if plant has count = 0
    // if so, find a way to rebalance
    //loop through all myPlants
    //  if count == 0: loop through all finalCombos
    //      replace plant only if change has a positive effect, i.e. not replacing goodPair, not replacing plant with count = 1
    return finalCombos
    //TODO - constrain size of combo: omit from powerset
    //  limits:
    //      - 2 high calorie, no herb
    //      - 1 high calorie, 1 med/low calorie, 1 herb
    //      - 2 med calorie, 1 herb
    //      - 2 low calorie, unlimited herb
    // - factor in IS

    // if IS is high and SS is low --> less constrains


  // Fallback: Fill remaining beds with individual high-priority plants
  /*
  if (finalCombos.length < numberOfBeds) {
    const allPlants = new Set(goodCombos.flat());
    const missingBeds = numberOfBeds - finalCombos.length;

    const additionalCombos = [...allPlants].filter(p =>
      !finalCombos.some(c => c.includes(p))
    ).slice(0, missingBeds).map(p => [p]);

    finalCombos.push(...additionalCombos);
  }

  return finalCombos.slice(0, numberOfBeds); // Ensure we don’t exceed bed count
  */

}


//makePairs(S)
//  Z = Power(S)
//  Z = eliminateBadPairs(Z)
//  Z = rebalanceOptimization(Z)
//  B = makeBeds(Z)


//const myPlants = ['Tomato', 'Basil', 'Mint', 'Cabbage', 'Parsley'];
//const goodCombos = validPowerSet(myPlants);
//const bestCombos = rebalanceOptimization(goodCombos, 25, 0.5, 0.65, myPlants);
//console.log(goodCombos)
//console.log(bestCombos);
 //if bestCombos < number_of_beds --> fill last beds with random assortment of herbs & flowers, or repeat bed











/*

function insertionSort(arr, arr2, order) {
  var i, j, tmp, tmp2;
  for (i = 1; i < arr.length; i++) {
    j = i;
    while (j > 0 && (order === 'asc' ? arr[j - 1] > arr[j] : arr[j - 1] < arr[j])) {
      tmp = arr[j];
      tmp2 = arr2[j]
      arr[j] = arr[j - 1];
      arr2[j] = arr2[j - 1]
      arr[j - 1] = tmp;
      arr2[j - 1] = tmp2
      j--;
    }
  }
  return [arr, arr2];
}


let myArray = [4, 7, 1, 9, 2, 6, 8, 4, 4];
let otherA = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i']
let shit = insertionSort(myArray, otherA, 'd');
//console.log(shit[0])
//console.log(shit[1]); //[d, g, b, f, i, h, a, e, c]



plants = ['tomato', 'basil', 'cabbage', 'garlic', 'bean']
//var pair = {}
let n = plants.length
cmat = [
        [0, 1, -1, 1, 0],
        [1, 0, 1, 1, 0],
        [-1, 1, 0, 1, 0],
        [1, 1, 1, 0, -1],
        [0, 0, 0, -1, 0]
]
e_count = []
ppairs = []
pp_scores = []
p = []
for (var i = 0; i < n; i++){
    for (var j = i+1; j < n; j++){
        //
        p = [i, j]
        ppairs.push( p )
        pp_scores.push(cmat[i][j])

    }
}

for (var k = 0; k < ppairs.length; k++){
    //console.log(ppairs[k], pp_scores[k])
}

//console.log(ppairs)
//console.log(pp_scores)
console.log('sorting...')
//let s_pp_scores, s_ppairs = insertionSort(pp_scores, ppairs);
let sorted = insertionSort(pp_scores, ppairs, 'd');
let s_pp_scores = sorted[0]
let s_ppairs = sorted[1]

for (var k = 0; k < ppairs.length; k++){
    //console.log(s_ppairs[k], s_pp_scores[k])

}
i = 0
ent_count = {}
while (s_pp_scores[i] > 0){
    for (var j = 0; j < 2; j++){
        if (s_ppairs[i][j] in ent_count){
            ent_count[s_ppairs[i][j] ] ++
        }
        else{
            ent_count[s_ppairs[i][j] ] = 1
        }
    }
    i++
}
while (i < s_pp_scores.length){
    for (var j = 0; j < 2; j++){
        if (s_ppairs[i][j] in ent_count){

        }
        else{
            ent_count[s_ppairs[i][j] ] = 420
        }
    }
    i++
}
//console.log(ent_count)


ents = []
counts = []
remainders = []
for (q in ent_count){
    remainders.push(q)
    ents.push(q)
    counts.push(ent_count[q])
}
//sort by count
let sc = insertionSort(counts, ents, 'asc');
counts = sc[0]
ents = sc[1]

final_pairs = []

i = 0
while (ppairs.length > 0){
    var a,b
    for (var j = 0; j < ppairs.length; j++){
        console.log('ent loop', i, 'at pair', j)
        console.log(ppairs)
        a = ppairs[j][0]
        b = ppairs[j][1]
        if (a == ents[i] || b == ents[i]){
            final_pairs.push(ppairs[j] )
            console.log('using' ,ppairs[j])
            console.log('total', final_pairs)
            //drop a & b
            new_ppairs = []
            for (var t = 0; t < ppairs.length; t++){
                if (ppairs[t][0] == a || ppairs[t][1] == a || ppairs[t][0] == b || ppairs[t][1] == b){
                    //ppairs.splice(t,1)

                }
                else{
                    new_ppairs.push(ppairs[t])
                }
            }
            ppairs = new_ppairs
            console.log('after')
            console.log(ppairs)


        }
    }
    i ++

}
console.log('end')
console.log(final_pairs)
//compare ents and final_pairs to find remainders
console.log(ents)
console.log(remainders)
console.log('fuck')
j = 0
while (j <= remainders.length){
    for (var i = 0; i < final_pairs.length; i++){
        console.log('r loop ',j, 'pair ', i)
        console.log(remainders[j], final_pairs[i])
        if (final_pairs[i][0] == remainders[j] || final_pairs[i][1] == remainders[j]){
            remainders.splice(j, 1)
            console.log('removed..', remainders)
            j--

        }
    }
    j++
}
console.log('real remainders')
console.log(remainders)
for (var i = 0; i < remainders.length; i++){
    final_pairs.push( [parseInt(remainders[i])] )
}
console.log(final_pairs)

for (var i = 0; i < final_pairs.length; i++){
    console.log('bed: ')
    for (j = 0; j < final_pairs[i].length; j++){
        console.log(plants[final_pairs[i][j]])
    }
    console.log('------------')
}


*/



console.log('vars.js loading...')
//Global Variables
//data here
//  animalData, foodData, etc.
//models
//  animalModel

//Weather
TEMP = 30
RAIN = 1

//Geography
//SOIL = obj



//TODO: Move Nation Vars to Object.js Nation obj
//Nation (society & economic)
//Societal
POP = 100 //population size: initial = 100 people
FOOD = 100 //total food = f(weather, ag_system)
d_POP = 0 // change in population = f(FOOD)

//Economic
GDP = 100 //GDP = f(FOOD, POP)
interest_rate = .05 // interest_rate = f(d_GDP/dt)
//econ growth = f(interest, gov_investment) aprox= employment

poverty = .1 // poverty = f(FOOD, POP, econ_growth)
corruption = .4 //corruption = 1 - ( gov_investment / tax_revenue)


//AnimalData

AnimalData = {
    "cow": {
      "name": "cow",
      "type": "Mammal",
      "weight": 10,
      "size": 10,
      "speed": 2,
      "bias": "eat",
      "diet": "Herbivore",
      "social": "Group",
      "sound": "Moooooo",
      "harvest": "milk",
      "shelter": "Grass"
    },
    "chicken": {
      "name": "chicken",
      "type": "bird",
      "weight": 10,
      "size": 10,
      "speed": 2,
      "bias": "eat",
      "diet": "Herbivore",
      "social": "Group",
      "sound": "Bok bok bok",
      "harvest": "eggs",
      "shelter": "Bush"
    },
    "goat": {
      "name": "goat",
      "type": "Mammal",
      "weight": 5,
      "size": 5,
      "speed": 2,
      "bias": "eat",
      "diet": "Herbivore",
      "social": "Group",
      "sound": "nyaa wrya",
      "harvest": "milk",
      "shelter": "Grass"
    },
    "sheep": {
      "name": "sheep",
      "type": "Mammal",
      "weight": 5,
      "size": 5,
      "speed": 2,
      "bias": "eat",
      "diet": "Herbivore",
      "social": "Group",
      "sound": "Bahahaha bahahaha",
      "harvest": "wool",
      "shelter": "Grass"
    },
    "pig": {

    },
    "owl": {},

    "rabbit": {
      "name": "Rabbit",
      "type": "Mammal",
      "weight": 2,
      "size": 1,
      "speed": 10,
      "bias": "escape",
      "diet": "Herbivore",
      "social": "Group",
      "sound": "",
      "shelter": "Bush"
    },
    "wolf": {
      "name": "Wolf",
      "type": "Mammal",
      "weight": 2,
      "size": 1,
      "speed": 10,
      "bias": "capture",
      "diet": "Carnivore",
      "social": "Group",
      "sound": "Grrrrrrrrr Rah!",
      "shelter": "Cave"
    },
    "eagle": {
      "name": "Eagle",
      "type": "Bird",
      "weight": 2,
      "size": 1,
      "speed": 10,
      "bias": "escape",
      "diet": "Carnivore",
      "social": "Solo",
      "sound": "Reeeeea! kaaaw!",
      "shelter": "Tree"
    },
    "mouse": {
      "name": "Mouse",
      "type": "Mammal",
      "weight": 2,
      "size": 1,
      "speed": 10,
      "bias": "escape",
      "diet": "Omnivore",
      "social": "Group",
      "sound": "eep",
      "shelter": "Hole"
    },
    "cat": {
      "name": "Cat",
      "type": "Mammal",
      "weight": 2,
      "size": 1,
      "speed": 10,
      "bias": "capture",
      "diet": "Carnivore",
      "social": "Solo",
      "sound": "meow",
      "shelter": "Tree"
    }
}

//FoodData

FoodData = {
  "test":{
    "name": "test",
    "energy": 1,
    "nutrients": ["water", "salt", "vitamin", "protein"]
  },
  "grass":{
    "name": "grass",
    "energy": 1,
    "nutrients": [9, 0.1, 7, 1]
  },
  "leaves": {
    "name": "leaves",
    "energy": 1,
    "nutrients": [8, 0.1, 9, 1]
  },
  "seeds": {
    "name": "seeds",
    "energy": 5,
    "nutrients": [4, 0.2, 4, 10]
  }
}



ANIMAL_MODEL = [
[-0.1,0.7,0.6,4,0.5,-0.7,0.8,0.9,0.9,2,0,1,0.6,-8],
[0.1,1,10,0.1,2,-0.8,0.1,0.6,0.4,0.7,1,-0.2,0.1,0.1],
[-0.1,10,1,0.2,0.1,1,-0.2,0.1,-0.1,0.2,-0.2,-10,-0.1,0.1],
[-10,1,1,6,10,-10,10,10,10,10,9,10,3,-8],
[0.1,0.1,0.2,4,-10,-9,0,0,0,0,-4,1,1,-0.7],
[-40,-10,-10,2,20,-10,100,10,20,30,-1,-30,-20,-10],
[4,5,6,10,10,-1,-0.5,-0.1,1,10,10,2,0.1,0.3],
[1,4,5,6,2,-1,0,0,0,2,-10,0,0,-0.9],
[0.5,0.6,0.5,0.1,0.2,0.1,2,-10,10,1,2,1,0.9,1],
[7,0.1,1,1,-1,-0.1,-10,-10,0,-1,0,0.1,7,10],
[-0.1,1,-0.1,-0.1,0.1,0.1,-100,300,1,0.2,-0.3,-1,-1,-1],
[500,10,10,10,-100,1,-100,-100,-100,-100,1,-100,-100,300],
[1,200,50,10,1,-1,1,10,1,1,1,1,100,100],
[10,100,300,10,1,-1,-1,-1,-1,-1,-1,100,100,200],
[200,10,1,300,1,-1,-1,-1,-1,1,-1,100,100,100],
[-100,-1,300,1,200,-1,10,-0.1,1,2,100,-1,0.4,40],
[200,9,100,2,3,-100,1,1,1,3,10,5,1,400],
[-4,1,1,1,1,-1,4,1,100,2,1,-1,-0.5,300],
[-100,-0.3,1,1,1,-0.2,1,300,1,1,1,0,0,1],
[-1,-1,-1,1,1,-1,1,1,200,1,100,1,1,100],
[-1,1,1,1,1,-1,-1,-1,-1,300,100,-1,-1,3],
[-1,-10,-10,-10,300,-10,300,1,200,-1,300,1,-1,-1],
[-1,1,1,1,1,-0.6,10,-1,1,1,1,200,100,100],
[-1,0,0,0,0,0,0,0,0,0,1,1,1,1],
[300,-100,-100,-100,-100,-100,-100,-100,-100,1,1,100,100,100]
]
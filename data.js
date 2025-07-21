//data
//!!! clearCanvas(), drawCircle(), drawRec(), drawLine() at bottom of file


const COLOR_MC1 = 'rgba(23,26,39,1)'
const COLOR_MC2 = 'rgba(59,113,146,1)'
const COLOR_MC3 = 'rgba(194,237,251,1)'

MY_PLANTS = []

MONTHS = [
    ['Jan', 31],
    ['Feb', 28],
    ['Mar', 31],
    ['Apr', 30],
    ['May', 31],
    ['Jun', 30],
    ['July', 31],
    ['Aug', 31],
    ['Sep', 30],
    ['Oct', 31],
    ['Nov', 30],
    ['Dec', 31]
]

//TODO:
//  - balance algorithm

//plants
//Celcius, Liters, Centimeters
TOMATO = {'name': 'tomato', 'family': 'nightshade', 'min_temp': 50, 'max_temp': 95, 'daily_liter_water': 3.7, 'direct_light': 'yes', 'days2harvest': 70, 'harvest_days_span': 90, 'area': 18, 'yield': 15, 'calories_pp': 200}
PEPPER = {'name': 'bell pepper', 'family': 'nightshade', 'min_temp': 55, 'max_temp': 90, 'daily_liter_water': 2.5, 'direct_light': 'yes', 'days2harvest': 75, 'harvest_days_span': 60, 'area': 16, 'yield': 2, 'calories_pp': 150}
EGG_PLANT = {'name': 'egg plant', 'family': 'nightshade', 'min_temp': 60, 'max_temp': 90, 'daily_liter_water': 3.0, 'direct_light': 'yes', 'days2harvest': 80, 'harvest_days_span': 70, 'area': 18, 'yield': 7, 'calories_pp': 200}

ONION = {'name': 'onion', 'family': 'amaryllis', 'min_temp': 45, 'max_temp': 85, 'daily_liter_water': 1.5, 'direct_light': 'yes', 'days2harvest': 90, 'harvest_days_span': 30, 'area': 9, 'yield': 0.5, 'calories_pp': 200}
GARLIC = {'name': 'garlic', 'family': 'amaryllis', 'min_temp': 32, 'max_temp': 85, 'daily_liter_water': 1.2, 'direct_light': 'yes', 'days2harvest': 180, 'harvest_days_span': 20, 'area': 9, 'yield': 0.25, 'calories_pp': 600}
CARROT = {'name': 'carrot', 'family': 'umbellifer', 'min_temp': 40, 'max_temp': 85, 'daily_liter_water': 1.5, 'direct_light': 'yes', 'days2harvest': 70, 'harvest_days_span': 20, 'area': 9, 'yield': 0.6, 'calories_pp': 200}

POTATO = {'name': 'potato', 'family': 'nightshade', 'min_temp': 45, 'max_temp': 80, 'daily_liter_water': 2.5, 'direct_light': 'yes', 'days2harvest': 100, 'harvest_days_span': 30, 'area': 16, 'yield': 4, 'calories_pp': 420}
CORN = {'name': 'corn', 'family': 'grass', 'min_temp': 60, 'max_temp': 95, 'daily_liter_water': 4.0, 'direct_light': 'yes', 'days2harvest': 90, 'harvest_days_span': 20, 'area': 24, 'yield': 1, 'calories_pp': 400}
SWEET_POTATO = {'name': 'sweet potato', 'family': 'morning glory', 'min_temp': 60, 'max_temp': 90, 'daily_liter_water': 2.8, 'direct_light': 'yes', 'days2harvest': 120, 'harvest_days_span': 20, 'area': 20, 'yield': 3, 'calories_pp': 410}

ZUCCHINI = {'name': 'zucchini', 'family': 'gourd', 'min_temp': 60, 'max_temp': 95, 'daily_liter_water': 3.0, 'direct_light': 'yes', 'days2harvest': 50, 'harvest_days_span': 45, 'area': 20, 'yield': 8, 'calories_pp': 77}
CUCUMBER = {'name': 'cucumber', 'family': 'gourd', 'min_temp': 60, 'max_temp': 90, 'daily_liter_water': 2.7, 'direct_light': 'yes', 'days2harvest': 60, 'harvest_days_span': 40, 'area': 20, 'yield': 7, 'calories_pp': 50}
SQUASH = {'name': 'squash', 'family': 'gourd', 'min_temp': 60, 'max_temp': 95, 'daily_liter_water': 3.2, 'direct_light': 'yes', 'days2harvest': 70, 'harvest_days_span': 30, 'area': 20, 'yield': 15, 'calories_pp': 200}

BROCCOLI = {'name': 'broccoli', 'family': 'brassicaceae', 'min_temp': 40, 'max_temp': 75, 'daily_liter_water': 2.0, 'direct_light': 'yes', 'days2harvest': 90, 'harvest_days_span': 20, 'area': 16, 'yield': 2, 'calories_pp': 150}
KALE = {'name': 'kale', 'family': 'brassicaceae', 'min_temp': 40, 'max_temp': 80, 'daily_liter_water': 1.8, 'direct_light': 'yes', 'days2harvest': 60, 'harvest_days_span': 60, 'area': 12, 'yield': 1, 'calories_pp': 230}
CABBAGE = {'name': 'cabbage', 'family': 'brassicaceae', 'min_temp': 45, 'max_temp': 85, 'daily_liter_water': 2.2, 'direct_light': 'yes', 'days2harvest': 85, 'harvest_days_span': 20, 'area': 16, 'yield': 2, 'calories_pp': 110}

LETTUCE = {'name': 'lettuce', 'family': 'daisy', 'min_temp': 40, 'max_temp': 75, 'daily_liter_water': 1.5, 'direct_light': 'yes', 'days2harvest': 50, 'harvest_days_span': 20, 'area': 9, 'yield': 1.1, 'calories_pp': 70}
MINT = {'name': 'mint', 'family': 'lamiaceae', 'min_temp': 55, 'max_temp': 85, 'daily_liter_water': 1.8, 'direct_light': 'partial', 'days2harvest': 60, 'harvest_days_span': 120, 'area': 9, 'yield': 2, 'calories_pp': 200}
OREGANO = {'name': 'oregano', 'family': 'lamiaceae', 'min_temp': 55, 'max_temp': 85, 'daily_liter_water': 1.5, 'direct_light': 'yes', 'days2harvest': 90, 'harvest_days_span': 120, 'area': 9, 'yield': 0.7, 'calories_pp': 200}
BASIL = {'name': 'basil', 'family': 'lamiaceae', 'min_temp': 60, 'max_temp': 90, 'daily_liter_water': 1.7, 'direct_light': 'yes', 'days2harvest': 60, 'harvest_days_span': 60, 'area': 9, 'yield': 0.6, 'calories_pp': 150}
PARSLEY = {'name': 'parsley', 'family': 'umbellifer', 'min_temp': 50, 'max_temp': 85, 'daily_liter_water': 1.4, 'direct_light': 'partial', 'days2harvest': 70, 'harvest_days_span': 90, 'area': 9, 'yield': 0.4, 'calories_pp': 100}
THYME = {'name': 'thyme', 'family': 'lamiaceae', 'min_temp': 50, 'max_temp': 85, 'daily_liter_water': 1.2, 'direct_light': 'yes', 'days2harvest': 75, 'harvest_days_span': 120, 'area': 9, 'yield': 0.2, 'calories_pp': 100}
MARIGOLD = {'name': 'marigold', 'family': 'asteraceae', 'min_temp': 60, 'max_temp': 90, 'daily_liter_water': 1.5, 'direct_light': 'yes', 'days2harvest': 50, 'harvest_days_span': 60, 'area': 9, 'yield': 0.1, 'calories_pp': 100}
LEMON_GRASS = {'name': 'lemon grass', 'family': 'grass', 'min_temp': 55, 'max_temp': 95, 'daily_liter_water': 2.0, 'direct_light': 'yes', 'days2harvest': 100, 'harvest_days_span': 60, 'area': 12, 'yield': 1, 'calories_pp': 70}

PEAS = {'name': 'peas', 'family': 'legume', 'min_temp': 40, 'max_temp': 75, 'daily_liter_water': 1.5, 'direct_light': 'yes', 'days2harvest': 60, 'harvest_days_span': 30, 'area': 12, 'yield': 1, 'calories_pp': 570}
GREEN_BEANS = {'name': 'green beans', 'family': 'legume', 'min_temp': 55, 'max_temp': 85, 'daily_liter_water': 1.7, 'direct_light': 'yes', 'days2harvest': 50, 'harvest_days_span': 30, 'area': 12, 'yield': 0.9, 'calories_pp': 150}
BEETROOT = {'name': 'beetroot', 'family': 'amaranth', 'min_temp': 50, 'max_temp': 75, 'daily_liter_water': 1.2, 'direct_light': 'yes', 'days2harvest': 55, 'harvest_days_span': 25, 'area': 9, 'yield': 0.6, 'calories_pp': 200}
SPINACH = {'name': 'spinach', 'family': 'amaranth', 'min_temp': 45, 'max_temp': 75, 'daily_liter_water': 1.0, 'direct_light': 'partial', 'days2harvest': 45, 'harvest_days_span': 20, 'area': 6, 'yield': 0.5, 'calories_pp': 106}
RHUBARB = {'name': 'rhubarb', 'family': 'polygonaceae', 'min_temp': 40, 'max_temp': 75, 'daily_liter_water': 2.5, 'direct_light': 'partial', 'days2harvest': 365, 'harvest_days_span': 60, 'area': 24, 'yield': 8, 'calories_pp': 97}
CHARD = {'name': 'chard', 'family': 'amaranth', 'min_temp': 50, 'max_temp': 85, 'daily_liter_water': 1.3, 'direct_light': 'yes', 'days2harvest': 60, 'harvest_days_span': 40, 'area': 9, 'yield': 1, 'calories_pp': 88}



//Compatability Matrix
/*
PLANTS = [
TOMATO, PEPPER, EGG_PLANT, ONION,
GARLIC, CARROT, POTATO, CORN,
SWEET_POTATO, ZUCCHINI, CUCUMBER, SQUASH, BROCCOLI, KALE, CABBAGE, LETTUCE, MINT, OREGANO, BASIL, PARSLEY, THYME, MARIGOLD, LEMON_GRASS
]
*/
PLANTS = ['tomato',
    'bell pepper',
    'egg plant',
    'onion',
    'garlic',
    'carrot',
    'potato',
    'corn',
    'sweet potato',
    'zucchini',
    'cucumber',
    'squash',
    'broccoli',
    'kale',
    'cabbage',
    'lettuce',
    'mint',
    'oregano',
    'basil',
    'parsley',
    'thyme',
    'marigold',
    'lemon grass',
    'peas',
    'green beans',
    'beetroot',
    'spinach',
    'rhubarb',
    'chard']
console.log(PLANTS)
console.log('num plants',PLANTS.length)
MAX_LIMIT = 15

PLANT_MAP = {
    'tomato': TOMATO,
    'bell pepper': PEPPER,
    'egg plant': EGG_PLANT,
    'onion': ONION,
    'garlic': GARLIC,
    'carrot': CARROT,
    'potato': POTATO,
    'corn': CORN,
    'sweet potato': SWEET_POTATO,
    'zucchini': ZUCCHINI,
    'cucumber': CUCUMBER,
    'squash': SQUASH,
    'broccoli': BROCCOLI,
    'kale': KALE,
    'cabbage': CABBAGE,
    'lettuce': LETTUCE,
    'mint': MINT,
    'oregano': OREGANO,
    'basil': BASIL,
    'parsley': PARSLEY,
    'thyme': THYME,
    'marigold': MARIGOLD,
    'lemon grass': LEMON_GRASS,
    'peas': PEAS,
    'green beans': GREEN_BEANS,
    'beetroot': BEETROOT,
    'spinach': SPINACH,
    'rhubarb': RHUBARB,
    'chard': CHARD
}

//Payoff Matrix


BEDS = []

class Bed{
    constructor(size, pnts, combo){
        //size:: [bed_width, bed_height]
        this.size = size
        //pnts:: [pnt1, pnt2, pnt3, pnt4]
        //[TopL, TopR, BottomR, BottomL]
        this.points = pnts
        //combo:: [plant1, plant2, ...]
        this.plants = combo

        //dict_of_plants:: {tomato: 10, basil: 5, marigolds: 3, ...}
        this.dict_of_plants = {}
        //this.layOutBed()
        this.total_water = 0
        //this.calculateTotals()
        //total_water
    }
    //TODO: on hover -> display details in details column
    layOutBed(){
        //sort plants in combo by size (descending)
        //for each plant fit them into bed with remaining space -- circle packing with overlap
        //update count --> dict_of_plants
        //drawPlant()
        //max number of herbs = 4
        //max number of non herbs = 3
        /*
        nonHerbSet = this.plants - herbs
        herbSet = this.plants - nonHerbSet
        divide area into row plants and non row plants
        start with row plant
        divide space into number of plants in nonHerbSet
        area_per_plant = bed_area/number_of_nonHerbs
        number_of_p = area_per_plant / p_size


        for (plant of nonHerbSet){

            if(p.row_type){
                populate area with rows
                num_rows = floor( 1 + (width - 2*space_within_rows)/space_between_rows )
                x0 = bed.pnt1.x + space_within_row
                for (number_of_p){
                    dx = 0 || space_between_rows if num_rows > 0
                    dy = space_within_row
                    drawPlant(pnt)
                    update count
                }
            }
            else{
                plants are zig zagged
                for(number_of_p)
                    drawPlant(pnt)
                    update count
            }

        }

        */

    }
    drawPlant(){
        //draw center and radius ring
    }
    calculateTotals(){
        //for each plant in dict_of_plants -> sum up count * daily_water
    }
}



class Plant{
    constructor(name, family, min_t, max_t, water_per_week, light, t_2_fruit, fruit_t_span, space){

        this.name = name
        this.family = family
        this.min_t = min_t // Celcius
        this.max_t = max_t // Celcius
        this.water_per_week = water_per_week // (liters)
        this.light = light //light: [0 : low, 1 : med, 2 : full]
        this.t_2_fruit = t_2_fruit //days until fruit
        this.fruit_t_span = fruit_t_span //days fruiting
        this.space = space //distance to nearest sibling (cm)
        this.age = 0 //days since sprouting
        this.fruiting = false

    }
    update(){
        this.age += 1
        if (this.age > this.t_2_fruit){
            this.fruiting = true
        }
    }
}


function clearCanvas(){
    c.clearRect(0, 0, canvas.width , canvas.height)
}

function drawCircle(center, radius, color_fill, color_line){
    c.beginPath()
    c.arc(center.x, center.y, radius, 0, 2*Math.PI)
    c.fillStyle = color_fill
    c.fill()
    c.strokeStyle = color_line
    //c.lineWidth = 4
    c.stroke()
}
function drawLine(first, next, color){
    //first, next : Point
    //color : string
    c.beginPath()
    c.moveTo(first.x , first.y) // first point
    c.lineTo(next.x , next.y) // next point
    c.strokeStyle = color
    c.lineWidth = 1
    c.stroke()
    c.closePath()
}
function drawRec(x0, y0, dx, dy, color){
    c.beginPath()
    c.rect(x0, y0, dx, dy)
    c.strokeStyle = color
    c.stroke()
    c.fillStyle = color
    c.fill()
    c.closePath()
}


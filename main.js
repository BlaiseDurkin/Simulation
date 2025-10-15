var canvas = document.getElementById('Board')
//console.log(canvas)
var c = canvas.getContext('2d')
//c.translate(0.1, 0.1);
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;



//TODO simulate..
//TODO: Alerts when environment changes...
//      EX: errosion and houses and trees collapse
//      EX: popular news events
//weather
//geography - elevation, biome, bodies of water, minerals
//TODO: Test Animal
/*
    TODO
        - test mouse in heaven
        - test cat vs mouse
*/

//nation
//Economy - macro(GDP, labor) & micro
//  industry
//  Resource - Raw, manufactured, flow rate
//Social
//   freedom -> happiness + danger
//   ag policy -> yeilds & soil fertility
//   foreign policy -> trade & war
//   domestic policy -> taxes, subsidies, investment, immigrants

//agriculture - crops, calories, systems, nutrient flow
//disease
//Society - population change, city area, religion, laws, government(system, politicians, institutions, laws), crime, infrastructure
//NPC
//Culture -> defines society, tech, behavior, etc...
//events: update stats
//   char & objs -> event_func -> char & objs
//    EX: Kamal help 10 people -> relation status +1 for each
//    EX: experience chaos -> emotional model -> character status

/*
                ````` Game Board ``````
                GameBoard
                        \ tiles - OBJECTS list
                              \ landgrids - cells = soil points

main:
    update GameBoard
        for all tiles: update objects


*/

TIME = 0
SUN = 1 //Math.sin(TIME/a) a=????
MAPSCALE = 4



function elevationMap(x,y){
    let pi = Math.PI
    s = MAPSCALE
    z = 160*(Math.sin(s*x*pi/1600)**12)*(Math.sin(s*y*pi/1600)**12) + 10*(Math.sin(s*x*pi/100)**2) + 3*(Math.sin(s*x*pi/30)**2)*(Math.sin(s*y*pi/27)**2) + 45*(Math.sin(s*x*pi/600)**4)*(Math.sin(s*y*pi/600)**4)
    return z
}

function updateEnvironment(){
    //weather = temp & rain = sin(
    //max, min temp
    //max rainfall
    TEMP = Math.sin(DAYS*Math.PI/183)
    RAIN = Math.sin(DAYS*Math.PI/183)
    //TODO:     *   every t = t* hours -> update temp and rain->update soil
}
function updateGeography(){
    //TOdo  *   every t = 3 days -> update geography{soil, river,..
    //geogen.js
}

function initGeography(){

    // point defined map of geography{elevation, biome{forest, plain, desert}}
    let W = canvas.width
    let H = canvas.height
    gbg = new GameBoardGrid(W, H, 24)//makes land points & tiles
    gbg.makeMesh() //update point shit

    //gbg.drawGrid()
    //gbg.makePGrid()
    //make mountains
    //gbg.makeMountains(1)

    //todo: make river
    //make river

    gbg.drawMesh() //draw tiles
    gbg.drawPGrid() //draw points
    gbg.geoStats()
    //gbg.makeRivers(5)
    testHeavenMouse(gbg)
    return gbg

}

async function testHeavenMouse(gb){
    //var AnimalData = await loadAnimalData()
    //var FoodData = await loadFoodData()
    gb.animal_data = AnimalData
    ptn1 = new Point(300, 300)
    ptn2 = new Point(700, 300)
    // 1 mouse
    let x = Math.random()
    let gender = "M"
    if(x < .5){
      gender = "F"
    }
    //console.log(AnimalData["cow"]["diet"])
    //console.log('mouse:',AnimalData["mouse"])
    console.log('making mouse')
    tmouse = new Animal('mouse', AnimalData['mouse']['type'], ptn1, AnimalData['mouse']['size'], AnimalData['mouse']['weight'], gb, gender, true)
    tmouse.draw()
    //gb.point2Tile(tmouse.position)
    gb.tiles[gb.point2Tile(tmouse.position)].objects.push(tmouse)



    tcat = new Animal('cat', AnimalData['cat']['type'], ptn2, AnimalData['cat']['size'], AnimalData['cat']['weight'], gb, gender, false)
    tcat.draw()
    gb.tiles[gb.point2Tile(tcat.position)].objects.push(tcat)
    /*
    for(var t = 0; t< gb.tiles.length; t++){
        if(gb.tiles[t].objects.length != 0){
            console.log(t)
            console.log(gb.tiles[t].objects)
        }

    }
    */
    // 2 shelter

    // 100 food
    //tiles generate "food" to mantain a certain balance or level/quantity of food
    //  EX: land tile that have grass terrain; routinely create grass objects in the tile proportional to { inputs(water manure) , and grazing}
}


function clearCanvas(){
    c.clearRect(0, 0, canvas.width , canvas.height)
}

//
console.log('hello world')

//test board
function makeRiver(f,l){
    //slope(f,l)
}
function drawBoard(){
    //board

    drawRect(0, 0, canvas.width, canvas.height, 'rgba(110,100,100,1)', 'rgba(110,200,100,1)')
    //river
    /*
    f = new Point(3*canvas.width/10, 3*canvas.height/10)
    l = new Point(7*canvas.width/10, 7*canvas.height/10)
    //makeRiver(f,l)

    //points
    */
    //elevation map
    //grid
    gbg = new GameBoardGrid(canvas.width, canvas.height, 120)
    gbg.drawGrid()
    gbg.makePGrid()
    //make mountains
    gbg.makeMountains(1)
    //make river
    gbg.makeMesh()
    gbg.drawMesh()
    //testHeavenMouse(gbg)
    /*
    tile = new Tile(8,3)//i,n
    console.log('local tiles: ',tile.neighbors)
    */

}
STARTdata = []
function closePop(){

    pwindow = document.getElementById('start-input')
    spawn = document.getElementById('startlocation').value
    year = document.getElementById('epoch').value
    level = document.getElementById('civlevel').value
    STARTdata.push(spawn, year, level)
    console.log(STARTdata)
    pwindow.style.visibility = 'hidden'
    //open popup window for loading screen: Location and epoch info with explanations for playing the game
    //

}
//drawBoard()
//TODO: Game Run

//      player chose time, place, and level of development TODO: interface -> window to select: time, place, level
//      input: time, place, level {desolate,village,town,city}
//      make world
//      populate world with objects?: plants, animals, humans, human development: roads, civ building order
//          1: roads
//              - maximize contour
//      iterate for time and all objects

var t = 0
gb = initGeography()
//TODO
/*
    TODO:
        load data
        for each tile:
            clearCanvasTile(), drawTile,
            for each obj in tie:
                obj.draw()

*/
/*
TODO
    - death and reproduction
    - dying, food
    - prevent from going out of bounds, and non traversible areas
    - update & draw tiles
    -> when health = 0 -> status="dead", body decomposes until health = -100, then remove obj from board
    - lakes & forests
    - traversible and non traversible regions

    !!!! every function needs to check target == null
*/
function animateGame(){
    //update_Environment()
    //update_UI()
    requestAnimationFrame(animateGame)
    clearCanvas()
    TIME += 1 //global time
    t += 1 //local time 48 itteration cycle
    html_element = document.getElementById('day_count')
    html_element.innerHTML = TIME
    console.log('NEW TIME Loop')
    if (t == 48){
        t = 0
        //switch day: sun/moon

    }
    //update env if rain -> forest + trees
    /*

        sentient players = { NPC, animal, god,..} \
        sentient player look -> memory
        sentient player act
    */

    for(var g = 0; g< gb.tiles.length; g++){
        //console.log(t)
        //console.log(gb.tiles[t])
        for(var i = 0; i< gb.tiles[g].objects.length; i++){
            //todo: if health < -100 --> remove object
            if (gb.tiles[g].objects[i].health < -100){
                gb.tiles[g].objects.splice(i,1)
                continue
            }
            gb.tiles[g].objects[i].update()
            gb.tiles[g].objects[i].draw()
        }
     }

    //console.log(TIME)
    //drawHome()
    //drawBoard()

}
function testRun(gb){
    for (var t=0; t<100; t++){
        console.log('t = ',t)
        console.log(gb)
        for(var g = 0; g< gb.tiles.length; g++){
            //console.log(t)
            console.log('objs len = ',gb.tiles[g].objects.length)
            for(var i = 0; i< gb.tiles[g].objects.length; i++){
                gb.tiles[g].objects[i].update()
                gb.tiles[g].objects[i].draw()
                console.log(gb.tiles[g].objects[i])
                console.log(gb.tiles[g].objects[i].position)
            }
         }
    }

}


async function testMain(){
    //test animal
    console.log('main')
    //AnimalData = await loadAnimalData()
    gb.animal_data = AnimalData
    console.log('test main')
    console.log(gb)
    try{

        //console.log('check gb')
        //console.log(gb)
        //console.log(AnimalData)
        //console.log(gb.animal_data)
        //console.log(gb.areas)
        //alert('before animate')
        animateGame()
        //testRun(gb)
        //alert('after animate')
    }
    catch (error) {
        console.error('Failed to start game:', error);
    }


}
testMain()

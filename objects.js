
//~~~~~~~~~~~~~~~~~ OBJECTS ~~~~~~~~~~~~~~~~~

//  particle; ex: point, chemical
//  natural matter; ex: water, sand, tree, fire, wind,..
//  natural concepts; ex: forest, landGeo,..
//  inanimate; ex: sword, money,..
//  animals; ex: chicken, wolf,..
//  NPC; ex: king, baker,..
//      *->> change semi NPC: team red/blue -> yellow/green
//      low compute NPC's dont change team (red/blue)
//  social concepts; ex: nation

// Viruses = Demons (gluttony, sloth, wrath..)
//         entities that can be born/infect and propogate signals proximity-wise
//          entities have relationship network:   gluttony -- greed -- pride -- wrath
//          EX: Gambling = greed: lust for things you dont deserve -> "luck" demon
//              EX: Gluttony <- "?" demon: pathogen growth, pandemic
//              *king & queen : glutton, greed, pride, wasteful <- mob wrath & execute king/queen
// Religions: {diet codes, dress codes, behavior codes, etc... }
// Culture: technology, materials, religion
// storage units: chest, box, closet, bag,...
//      volume compression -> nesting objects: EX: rice + jars = rice_jars + remainder
//points
class Point{
    constructor(x, y){
        this.x = x
        this.y = y
    }
    toInt(){
        return Math.sqrt(this.x**2 + this.y**2)
    }

}
class Point3{
    constructor(x, y, z){
        this.x = x
        this.y = y
        this.z = z
    }
}
//natural matter
class Water{
    constructor(position, mass, speed){
        this.position = position
        this.mass = mass
        this.density = 1
        this.viscosity = 1
        this.speed = speed
    }
}
class Food{
    constructor(name, mass, energy, nutrients){
        this.name = name
        this.health = 100 //percent available energy = 1/health
        this.mass = quantity
        this.energy = energy
        this.nutrients = nutrients // [water, salt, vitamin, protein]
    }
}
class Plant{
    constructor(position, name, type, size, food){
        this.position = position
        this.name = name    //"PineTree"
        this.type = type    //"Tree"
        this.size = size    //3 meter (radius from position)
        this.food = food    //"fruit" or food object
        this.food_count = 0

        //water tolerance
    }
    growFood(){
        this.food_count += 1
    }
    act(){
        //this.size += 0.02 * gb.point2Tile(this.position).water
    }
}
class UniformMaterial{
    constructor(){
        //name
        //thickness
        //length
        //width
        //mass
        //density
        //shape
        // static friction coef
        //compression strength
        //tension strength
        //shear strength
        //failed = true
        //maluability
        //conductivity
        //organic
    }

}
class CompositeMaterial{
    constructor(){
    //ex: iron 1cm, leather 3cm, wood 5cm
    //layers = []
    }
}
class Soil{
//TODO: soil is erroded = f(slope, sand organic ratio)
    constructor(position, radius, elevation){
        //location: center
        this.position = position
        //radius
        this.radius = radius
        this.elevation = elevation
        //depth
        this.depth = 3 //3 meters

        var sand = 34 - elevation / 8
        var silt  = 33 - elevation /16
        var clay = 32 - elevation/32
        var total_ssc = sand + silt + clay
        var org = 100 - total_ssc
        //this.proportions_ossc = [37, 21,21,21]//
        this.proportions_ossc = [org, sand, silt, clay]


        //soil humidity = water max saturation = f(clay, organic, temp)
        this.max_saturation = this.depth*this.proportions_ossc[0] - this.depth*this.proportions_ossc[1] + 10*this.depth*this.proportions_ossc[3]
        //water saturation
        this.soil_humidity = 30
        if (this.elevation < 1){
            this.soil_humidity = 100
        }
        this.total_water = this.max_saturation*this.soil_humidity/100

        //stone structure = f(elevation)
        //TODO: stone = f(elevation + random deposit
        //top_stone = limestone, coal, iron
        this.top_stone = [10,5,2] // 50 down
        //mid_stone = copper, lead, zinc, silver, gold
        this.mid_stone = [10, 10, 10, 10, 10] //100 down
        //deep_stone = diamonds, sapphires, rubies, uranium
        this.deep_stone = [-elevation/10, 10, 10] //200 down

        this.temperature = 20


    }
    changeSoilWater(rain){
        this.total_water += rain
        this.total_water - this.tempterature
    }
    addSoilOrganic(new_org_v){
        let soil_v = this.depth * Math.PI*this.radius**2

        let new_soil_v = soil_v + new_org_v
        let d_org = new_org_v/new_soil_v
        //ossc : organic, sand, silt, clay
        this.proportions_ossc[0] += d_org
        this.proportions_ossc[1] -= d_org/3
        this.proportions_ossc[2] -= d_org/3
        this.proportions_ossc[3] -= d_org/3
        this.depth += new_org_v /(Math.PI*this.radius**2)



    }
    updateStone(){
        //high elevation
        //low elevation
    }

}

class Fire{
    constructor(){
        //location: center
        //fuel quantity, type
        //fuel heat conversion
        //heat
        //size
    }
}
class Air{
    constructor(){
        //location: center
        //%O2, %CO2, %NO
        //speed
    }
}

//Natural concepts
class ForestMarker{
    constructor(position, tile, forest, n_trees ){
        // position
        this.position = position
        // tile index
        this.tile = tile
        // Forest pointer
        this.forest = forest
        // density
        this.count = n_trees
        // %distance to center of Forest
        // tree count
    }
}
class Forest{
    constructor(center, name, size, density, n_trees, height){
        //name EX: "Chimetengo Forest"
        this.name = name
        //location: center
        this.position = center
        //radius: size = diameter
        this.size = size
        //%cover: average density
        //area = 0.5 * pi * size^2
        //density = area / count
        this.density = density
        //tree count
        //wood count
        this.count = n_trees
        //trees types
        //canopy height
        this.height = height

        let radius = this.size/2
        TileMaker(this.position, radius)

    }
    TileMaker(c, radius){
        let gW = gb.W
        let gH = gb.H
        let tW = gb.dx
        let tH = gb.dy

        let px = (c.x/tW) - Math.floor(c.x/tW) //percent width of tile
        let py = (c.y/tH) - Math.floor(c.y/tH) //percent height of tile
        let Nx = c.x/tW - px
        let Ny = c.y/tH - py
        let mx = tW*(Nx + .5)
        let my = tH*(Ny + .5)

        let Ld = Math.ceil((1 - px) + radius/tW) - 1 //go left
        let Rd = Math.ceil(px + radius/tW) - 1 //go right

        let Ud = Math.ceil((1 - py) + radius/tH) - 1 //go up
        let Dd = Math.ceil(py + radius/tH) - 1 //go down
        //check up, right, down, left
        //Up
        while(my+Ud*tH < 0 && Ud > 0){
            Ud -= 1
        }
        //left
        while(mx+Ld*tW < 0 && Ld > 0){
            Ld -= 1
        }
        //down
        while(my+Dd*tH > gH && Dd > 0){
            Dd -= 1
        }
        //right
        while(mx+Rd*tW > gW && Rd > 0){
            Rd -= 1
        }
        Sx = Ld + Rd + 1
        Sy = Up + Dd + 1
        let cx = mx - Ld*tW //current tile x
        let cy = my - Ud*tH // current tile y
        for (var x = 1; x <= Sx; x++){
            for(var y = 1; y <= Sy; y++){
                if (distance2(cx, c.x, cy, c.y) <= radius){
                    mp = new Point(cx, cy) //mid point of current tile
                    ti = gb.point2Tile(mp) //tile index
                    mark = new ForestMarker(mp, gb.tiles[ti], forest, forest.tree_count/(Sx*Sy))
                    gb.tiles[ti].objects.push(mark)
                }

                cy += tH
            }
            cx += tW
            cy = my - Ud*tH
        }
    }
}

class Lake{
    constructor(){
        //name EX: Lake Titicaca
        //location: center
        //radius
        //depth
        //quantity of water
        //quantity of pollution
    }
}

class LakeMarker{
    constructor(){

        //location: center
        //lake
        //depth

    }
}
//stream? can make rivers
//???? is Stream object redundant? River object allready exist??
//???
class Stream{//???
    constructor(){//??????????????
        //location: start, end
        //width
        //depth
        //speed
    }
}
class River{
    constructor(fpnt, lpnt, width, depth, speed){
        //location: start, end
        this.first = fpnt
        this.last = lpnt
        this.width = width
        this.depth = depth
        //      speed   =    WaterTerminalVelocity*slope2Max(point_a, point_b)
        this.speed = speed //initial momentum speed
        this.source = null
        this.next = null
        this.terminal = false
        //width
        //depth
        //speed
    }
}
class RiverSeries{
    constructor(){
        //location: start, end
        //first = first river
        //rivers = [first, ...]
        this.rivers = []
    }
    add(river){
        this.rivers.push(river)
    }
}
class Mountain{
    constructor(position, height){
        this.position = position
        //location: center
        //area
        //height
        this.height = height
        //slope
        //this.slope = slope

        //100 H ->  .001 (steep) .005 (med) .0001 (hill)
        //10 H ->  .1 (very steep) .05 (med) .01 (hill)
        this.slope = 10/(Math.log(this.height+1)*this.height**2)
        console.log('MOUNTAIN SLOPE',this.slope)
    }
    mElevationMap(x,y){
        let b = -1*this.slope

        var z = this.height*Math.exp(b*(x-this.position.x)**2)*Math.exp(b*(y-this.position.y)**2)
        return z
    }
}
class MountainRange{
    constructor(){
        //location: center
        //area
        //mountains
    }
}
class Tunnel{
    //start
    //end
    //depth
}
class Hole{
    //center
    //size
    constructor(){
        this.type = 'Hole'
    }
    enter(){}
}
class Cave{
    constructor(){}
    enter(){}
}

class Shore{
    //regolith
    //beach_drop,
}
class Island{
    //shore = Object(regolith, beach_drop, cliff_delta, cliff_steepness

}
class Marsh{

}


class Road{
    constructor(){
        //
        //start
        //end
        //road_branches
        //lanes
        //maxspeed
        //occupants
    }
}
class Trail{
    constructor(){
        //start_p
        //end_p
    }
}
class Highway{
    //min speed -> if below = problems >:(
}
class Bridge{
//  type: suspension,..
//  material
//  max load
}
class Fortification{
    //moat, fence, spikes, thorns, wall
}
class Wall{
    constructor(){
        //position
        //size
        //material
        //load
        //openings {window, door, slit}
        //utilities {water, electricity, hooks}
    }

}
class Building{
    constructor(){
        //center
        //size
        //occupants
        //material ex: wood, brick, stone, cement_1, cement_2, etc..
        //roof material: {tile, wood, metal, stone, grass, composite
        //foundation : material, thickness
        //walls = []
        //function: house, church, school, shop
    }
}
class Statue{
    //location
    //history obj
}
class Ruin{
    //location
    //history obj
    //treasure
}
//Technology
class Machine{
    //do action: move, crush, peal, blend, cut, sort
}
class Factory{
    //inputs -> f(x) -> outputs
    //f: series of machines. f: graph structure, directed edges = next machine
    // start machine
    // next machine
}
class Vehicle{
    //type
    //empty mass
    //max occupancy
    //fuel type, density
    //fuel tank capacity
    //fuel effeceincy (distance per mass)
    //max speed
}
class CommTech{
//  ex: carrier pigeon, horse, telegraph, satelite, bluetooth, radio
}
class PowerSource{
    // water, solar, wind, gas, coal, nuclear
    // combustion -> BTU per gram
    // mechanic -> water, wind
}
class Tool{
    //same as machine?
}

class Currency{
    //material
    //exchange rate (map)
    //inflation rate
}
class Market{
// frequency of product = price
// frequency aprox supply & demand
// trade route (network graph of supply flow)
}
class QuestMarker{
    //location
    //quest type
}
//Geo Map

class LandPoint{
    constructor(position, height){
        this.position = position //(x, y)
        this.x = position.x
        this.y = position.y
        this.height = height
        this.soil = new Soil(position, 10, height)//radius = 10
        //this.neighbors = [] TODO: use neighbors for updating soil_water & plant_life
        //this.slope = slope //(dz/dx, dz/ dy)
        //this.biome = biome
        //this.soil = soil //{stone, sand, dirt}
        //extrapolate slope between points
        /*
        this.tl = null
        this.tr = null
        this.bl = null
        this.br = null
        */

    }
}
class LandGrid{
    //each tile has 1 landgrid
    constructor(tile){
        this.tile = tile
        this.n = 5 //number of cells
        this.points = []
        this.makeCells()
        this.drawCells()

    }
    makeCells(){
        //make
        const total_dx = Math.abs(this.tile.corners[0].x - this.tile.corners[3].x)
        const total_dy = Math.abs(this.tile.corners[0].y - this.tile.corners[3].y)

        //makes grid of LandPoints

        let x = 0
        let y = 0
        let x0 = this.tile.corners[0].x
        let y0 = this.tile.corners[0].y

        for (var i = 0; i < this.n+1; i++){
            y = i*total_dy/this.n + y0
            for (var j = 0; j < this.n+1; j++){
                x = j*total_dx/this.n + x0

                let pnt = new Point(x,y)
                //console.log(pnt)
                let z = elevationMap(x,y)

                let lp = new LandPoint(pnt, z)
                this.points.push(lp)

                //color 1 = f(z) = high:white/yellow, low:blue/red z={150,60,0}
                let color_1 = 'rgba('+255-z*5+','+255-z*5+',100, 1)' //fill
                //color 2 : line color
                let color_2 = 'rgba('+255-z*5+','+255-z*5+','+255-z*5+', 1)'
                //drawCircle(pnt ,3, color_1, color_2)
            }
        }

    }
    drawCells(){
        for (var i = 0; i< this.n**2; i++){
            let r = Math.floor(i/this.n)
            let c_index = [i + r, i + r + 1, i + this.n + 1 + r, i + this.n + 2 + r] //TL, TR, BL, BR
            //cell color
            //slope2Color() => [0,22]: green, [23,40]: tan, [41,55]: dirty brown, [56, 90]: gray
            var tl = this.points[c_index[0]]
            var tr = this.points[c_index[1]]
            var bl = this.points[c_index[2]]
            var br = this.points[c_index[3]]
            let corners = [tl,tr,bl,br]
            let low = tl
            let high = tl
            let min = 900
            let max = -900
            for (var j = 0; j < corners.length; j++){
                if(corners[j].height > max){
                    max = corners[j].height
                    high = corners[j]
                }
                if(corners[j].height < min){
                    min = corners[j].height
                    low = corners[j]
                }
            }

            let d_height = max - min
            let d_run = distance(high, low)
            let slope = Math.abs(d_height/d_run)
            //this.ave_elevation = (bl.height + br.height + tl.height + tr.height)/4

            let line_color = 'rgba(0,0,0,.1)'
            let fill_color = 'rgba('+i*5+',200,0,1)'

            let green = 'rgba(19,133,16,1)'
            let sand = 'rgba(218,185,132,1)'
            let dirty_gray = 'rgba(140,130,110,1)'
            let gray = 'rgba(133,140,144,1)'

            fill_color = gray
            if (slope < 1.5){
                fill_color = dirty_gray
            }
            if (slope < .9){
                fill_color = sand
            }
            if (slope < .75){
                fill_color = green
            }

            drawRect( this.points[c_index[0]].x, this.points[c_index[0]].y, this.points[c_index[3]].x, this.points[c_index[3]].y, line_color, fill_color)
        }
    }
    nearestLandPoint(p){
        //return nearest landPoint to p

    }
    nearestLandCell(p){
        //return list of 4 corners of cell = [4 landpoints]

    }
}
//tile
class Tile{
    constructor(i, n, gbg){
        this.i = i
        this.n = n // n = ?
        this.grid = gbg
        this.neighbors = [i]
        this.objects = []
        this.includeNeighbors()

        var r = Math.floor(this.i/this.n)
        this.c_index = [this.i + r, this.i + r + 1, this.i + this.n + 1 + r, this.i + this.n + 2 + r] //TL, TR, BL, BR
        this.corners = [this.grid.points[this.c_index[0]], this.grid.points[this.c_index[1]], this.grid.points[this.c_index[2]], this.grid.points[this.c_index[3]],]
        //console.log('tile number '+this.i+'')
        //console.log(this.c_index)
        //console.log(this.grid)
        //this.soil = updateSoil() //soil = f(4 corners)
        this.gradient = null
        this.ave_elevation = 10
        this.updateTerrainGradient()
        //TODO: change so each tile has a LandGrid

        this.land_grid = new LandGrid(this)
        this.water = 1

    }
    updateAll(){
        //this.updateCorners()
        this.updateTerrainGradient()
        this.updateSoil()
    }
    updateCorners(){
        //corners Tl, TR, BL, BR ((TODO: fact check this?))
        let n = this.land_grid.n
        this.corners = [this.land_grid.points[0], this.land_grid.points[n], this.land_grid.points[n**2 + n],this.land_grid.points[n**2 + 2*n]]
        //this.corners = [this.grid.points[this.c_index[0]], this.grid.points[this.c_index[1]], this.grid.points[this.c_index[2]], this.grid.points[this.c_index[3]],]

    }
    includeNeighbors(){
        let top = false
        let bottom = false
        let left = false
        let right = false
        let n = this.n
        let i = this.i

        if (i%n == 0){
            left = true
        }
        if ((i+1)%n == 0){
            right = true
        }
        if (i < n){
            top = true
        }
        if (i >= (n-1)*n ){
            bottom = true
        }

        if (top){
            if(left){
                //top left
                this.neighbors.push(i+1, i+1+n, i+n)
                return
            }
            if(right){
                //top right
                this.neighbors.push(i-1, i+n-1, i+n)
                return
            }
            //top mid
            this.neighbors.push(i+1, i+1+n, i+n, i+n-1, i-1)
            return
        }
        if (left){
            if (bottom){
                //bottom left
                this.neighbors.push(i+1, i+1-n, i-n)
                return
            }
            //left mid
            this.neighbors.push(i-n, i+n, i-n+1, i+1, i+n+1)
            return
        }
        if (bottom){
            if (right){
                //bottom right
                this.neighbors.push(i-1, i-1-n, i-n)
                return
            }
            //bottom mid
            this.neighbors.push(i-1, i+1, i-1-n, i-n, i+1-n)
            return
        }
        if (right){
            //right mid
            this.neighbors.push(i-n, i-n-1, i-1, i-1+n, i+n)
            return
        }
        //not edge
        this.neighbors.push(i-1-n, i-n, i-n+1, i+1, i+1+n, i+n, i+n-1, i-1)
        return
    }

    //func
    updateTerrainGradient(){
        var tl = this.corners[0]
        var tr = this.corners[1]
        var bl = this.corners[2]
        var br = this.corners[3]

        var dx1 = tl.height - tr.height
        var dx2 = bl.height - br.height
        var dy1 = bl.height - tl.height
        var dy2 = br.height - tr.height

        this.ave_elevation = (bl.height + br.height + tl.height + tr.height)/4

        var dx = (dx1 + dx2)/2
        var dy = (dy1 + dy2)/2

        if (dy > dx){
            if (dy > 0){
                dx = dx2
            }
            else{
                dx = dx1
            }
        }
        if (dy < dx){
            if (dx > 0){
                dy = dy1
            }
            else{
                dy = dy2
            }
        }

        this.gradient = new Point(dx, dy)
        this.gradient_mag = Math.sqrt(dx**2 + dy**2)
        console.log('gradient: ',this.gradient_mag)

    }
    updateSoil(){
        /*
        tl = this.corners[0].soil
        tr = this.corners[1].soil
        bl = this.corners[2].soil
        br = this.corners[3].soil

        return this.soil
        */

    }
    color(){
        //return color
        // green <- 4 corner total organic matter
        //%80 - 60% -> brown
        //59% - 35% -> grass
        var ave_org = (this.corners[0].soil.proportions_ossc[0] + this.corners[1].soil.proportions_ossc[0] + this.corners[2].soil.proportions_ossc[0] + this.corners[3].soil.proportions_ossc[0])/4
        var ave_sand = (this.corners[0].soil.proportions_ossc[1] + this.corners[1].soil.proportions_ossc[1] + this.corners[2].soil.proportions_ossc[1] + this.corners[3].soil.proportions_ossc[1])/4
        var c_v = 'rgba(226, 197, 153, 1)'
        if (ave_org > 6){
            c_v = 'rgba(23, 125, 30, 1)' // dark brown green
        }
        if (ave_org < 40 && ave_org > 5){
            c_v = 'rgba(110, 182, 84, 1)' // green
        }

        if (ave_sand > 23){
            c_v = 'rgba(226, 197, 153, 1)' //sand
        }
        if (ave_sand < 34 && ave_org < 25){
            c_v = 'rgba(150 ,182, 108, 1)' // sand green
        }
        if (this.gradient_mag > 12){
            c_v = 'rgba(130 ,130, 130, 1)' //mountain gray
        }
        /*
        if (this.gradient_mag > 16){
            c_v = 'rgba(130 ,130, 130, 1)' //mountain gray
        }
        */

        //console.log(c_v)
        return c_v

        //return 'rgba('+this.height+', '+total_org*2+', 153, 1)'
        //return 'red'

    }

    draw(){
        //type = f(total corner soil stats)

    }
}


class GameBoardGrid{
    //TODO: Tiles, Points, Triangle Mesh?
    constructor(W, H, n){
        this.W = W
        this.H = H
        this.n = n //n x n grid
        this.dx = W/n
        this.dy = H/n
        this.grid = [] // <---- stupid var for doing stupid line grid drawing (((retarded)))
        this.points = [] //land points. len =  (n+1)^2
        this.max_p_i
        //this.triangles = []
        this.makePGrid()

        this.tiles = []
        this.makeTiles()
        //this.map = map //map object {geography features}

        this.areas = [] //list of list of tile corner points
        this.ave_elevation = 0
    }
    point2Tile(pnt){
        //TODO: check return value???
        let dx = this.W/this.n
        let dy = this.H/this.n

        let r = Math.floor(pnt.x/dx)
        let c = Math.floor(pnt.y/dy)

        let ti = c + this.n*r
        //console.log(ti)
        return ti
    }
    makeTiles(){
     //makes tiles
     //gets called after makePGrid
     //TODO: How many iterations?

        for (var i = 0; i< this.n*this.n; i++){
            let t = new Tile(i, this.n, this)
            this.tiles.push(t)
        }
        //console.log('tiles made... hopefully?')
        //console.log(this.tiles)

    }
    makePGrid(){
        //makes grid of LandPoints
        //REAL TODO : keep or remove this function?
        let x = 0
        let y = 0
        let max_elevation = 0
        let index = 0
        let max_index = 0
        //let pnt = new Point(0,0)
        for (var i = 0; i < this.n+1; i++){
            y = i*this.dy
            for (var j = 0; j < this.n+1; j++){
                x = j*this.dx

                let pnt = new Point(x,y)
                //console.log(pnt)
                let z = elevationMap(x,y)
                if (z > max_elevation){
                    max_elevation = z
                    max_index = index
                }
                //TODO: merge with corners

                let lp = new LandPoint(pnt, z)
                this.points.push(lp)
                index += 1
                //color 1 = f(z) = high:white/yellow, low:blue/red z={150,60,0}
                let color_1 = 'rgba('+255-z*5+','+255-z*5+',100, 1)' //fill
                //color 2 : line color
                let color_2 = 'rgba('+255-z*5+','+255-z*5+','+255-z*5+', 1)'
                drawCircle(pnt ,3, color_1, color_2)
            }

        }
        this.max_p_i = max_index
    }
    drawPGrid(){
        for (var i = 0; i < this.points.length; i++){
            let z = this.points[i].height
            //color 1 = f(z) = high:white/yellow, low:blue/red z={150,60,0}
            //let color_1 = 'rgba('+z*5+','+z*5+',200, 1)' //fill
            let color_1 = 'rgba(200,'+z*5+','+z*5+', 1)' //fill
            //color 2 : line color
            let color_2 = 'rgba('+z*5+','+z*5+','+z*5+', 1)'
            drawCircle(this.points[i].position ,1, color_1, color_2)
            //console.log(this.points[i].position ,3, color_1, color_2)
        }
    }
    makeMesh(){

        let corners = []
        let t = 0
        let j = 0
        let n = this.n
        //console.log('nnnn is ',n)
        while (t < (this.n)**2 ){
            corners = [this.points[j], this.points[j+1], this.points[j+n+2], this.points[j+n+1]]
            //corners = [this.points[0], this.points[1], this.points[5], this.points[4]]
            //TODO: do something with the corners

            this.areas.push(corners)

            t += 1
            if (j !=0 && (j+2) % (n+1) == 0){
                //console.log('jump 2', j)
                j += 2
            }
            else{
                j += 1
            }
            //if (t>3) break
        }
    }
    makeGrid(){
        //Makes a ''Grid'' (just a list of horizontal and vertical lines)
        // *Note* this function is retarded. Do NOT use this function!
        //horizontal lines: iterate dx
        let x0 = 0
        let y0 = 0
        let x1 = 0
        let y1 = this.H
        let color = 'white'
        let line = []
        for(var i = 0; i < this.n; i++){
            x0 = i*this.dx
            x1 = x0
            line = [x0, y0, x1, y1, color]
            this.grid.push(line)
            //drawLine2(x0, y0, x1, y1, color)
        }
        //vertical lines
        x0 = 0
        y0 = 0
        x1 = this.W
        y1 = 0
        for(var i = 0; i < this.n; i++){
            y0 = i*this.dy
            y1 = y0
            line = [x0, y0, x1, y1, color]
            this.grid.push(line)
            //drawLine2(x0, y0, x1, y1, color)
        }
    }
    drawGrid(){
        //this function draws the shit that the other retarded function made.
        //this function is thus obsolete. do not use this function!
        for(var i = 0; i < this.grid.length; i++){

            drawLine2(this.grid[i][0], this.grid[i][1], this.grid[i][2], this.grid[i][3], this.grid[i][4])
        }
    }
    drawMesh(){
        let l_color = 'white'
        let f_color = 'white'
        let color = 'white'
        let pnts = []
        for (var i = 0; i < this.areas.length; i++){
            //this.areas[i] //[lp1,lp2,lp3,lp4]
            //this.areas[i][0].position // Point(x,y)
            f_color = 'rgba(100,'+i*2+',100, 1)'
            pnts = [this.areas[i][0].position, this.areas[i][1].position, this.areas[i][2].position, this.areas[i][3].position]
            //pnts = [this.tiles[i].corners[0].position]
            color = this.tiles[i].color()
            //drawPolygon(pnts, color, color)
        }
    }
    makeMountains(n){
        //order points by elevation
        //  take top n points
        //    for each n point: make a mountain with
        var mountains = []
        var pnts_copy = []
        for (var i = 0; i < this.points.length; i++){
            //console.log(':)',this.points[i].position)
            pnts_copy.push(this.points[i])
        }
        var ordered_points_i = bubbleSort_index(pnts_copy)
        //console.log('orrrderrr',ordered_points)
        var mp = null
        var mount = null
        for (var j = 0; j < n; j++){
            mp = this.points[ordered_points_i[j]]
            //make mountain at position = mp.position
            mount = new Mountain(mp.position, 50)
            mountains.push(mount)
            //mountain height = H
            //mountain slope = B
        }
        //console.log('mountain center:', mountains[0].position)
        for (var m = 0; m < mountains.length; m++){
            for (var i = 0; i < this.points.length; i++){
                this.points[i].height += mountains[m].mElevationMap(this.points[i].x, this.points[i].y)
                //console.log('x: ',this.points[i].x,', y:',this.points[i].y,',', mountains[m].mElevationMap(this.points[i].x, this.points[i].y))
            }
        }
    }
    makeRivers(n_rivers){
        //start river at position 0, continue down the gradient until momentum = 0
        //todo: make rivers go down hill, rivers in tiles
        //
        //width = 1

        //loop n_rivers
        //i = b*n + max_p_i , b=3?5?7?17?
        for (var j = 0; j < n_rivers; j++){
            let fp = this.points[this.max_p_i+j*27].position
            drawCircle(fp, 4, 'blue', 'blue')
            //let fp = this.points[50].position
            let rs = new RiverSeries()

            // find next point = first point + step_size
            //  step_size = (gradient)^2 + b * speed
            var current_tile = this.tiles[this.point2Tile(fp)]
            var flowing = true
            var speed_x = 0
            var speed_y = 0
            var momentum = 0
            var width = 1
            var depth = 1
            let step_size = .3 //30
            let omega = .4
            //console.log('border:',this.W,this.H)
            var iterations = 0
            while (flowing){
                if (iterations > 1500){
                    flowing = false
                }
                current_tile = this.tiles[this.point2Tile(fp)]

                speed_x = step_size* current_tile.gradient.x //- .97*speed_x// + momentum*current_tile.gradient.x/(Math.abs(current_tile.gradient.x)+.001)//
                speed_y = step_size* current_tile.gradient.y //- .97*speed_y//+ momentum*current_tile.gradient.y/(Math.abs(current_tile.gradient.y)+.001)//
                console.log('speed x: ', speed_x, 'gradient x: ', speed_y)
                momentum = Math.sqrt(speed_x**2 + speed_y**2) * width * depth * omega
                width -= .1
                depth -= .1
                //console.log('grad', current_tile.gradient.x, current_tile.gradient.y)
                //console.log('speed', speed_x, speed_y)

                /*
                if (Math.abs(speed_x) > 50){
                    speed_x = speed_x/Math.abs(speed_x) *50
                }
                if (Math.abs(speed_y) > 50){
                    speed_y = speed_y/Math.abs(speed_y) *50
                }
                */
                //let nx = fp.x + speed_x/Math.abs(speed_x) * Math.log(Math.abs(speed_x))
                let nx = fp.x - speed_x
                let ny = fp.y - speed_y///Math.abs(speed_y)* Math.log(Math.abs(speed_y))
                let np = new Point(nx,ny)
                //console.log(np)
                let r = new River(fp, np, width, depth, Math.sqrt(speed_x**2 + speed_y**2))
                current_tile.objects.push(r)
                rs.add(r)
                //update
                //check conditions to stop flowing
                //  hit minima
                /* projection */

                //  out of window
                if (np.x < 0 || np.x > this.W || np.y < 0 || np.y > this.H){
                    flowing = false
                    r.terminal = true
                }
                //draw
                drawLine(fp, np, 'rgba(0,10,255,1)', width*2)
                //console.log('line drawn')

                //update speed, width
                //find points, make river
                fp = np
                iterations += 1
            }
            //river series end
        }//all rivers series end

    }
    makeLake(){
        //search riverseries to find dense river cluster -> turn to lake
        //lake has nodes = exit/entry points -> river
    }
    geoStats(){
        //this.tiles
        //min, mean, max
        //mean, median, mode, std dev

        var sum = 0
        var min = 99999999999
        var max = -99999999999

        var sum_x = 0
        var min_x = 99999999999
        var max_x = -99999999999

        var sum_y = 0
        var min_y = 99999999999
        var max_y = -99999999999

        let n = this.tiles.length
        for (var i = 0; i < n; i++){
            let x = this.tiles[i].gradient.toInt()
            let x1 = this.tiles[i].gradient.x
            let x2 = this.tiles[i].gradient.y

            sum += x
            sum_x += x1
            sum_y += x2
            if (x > max){
                max = x
            }
            if (x1 > max_x){
                max_x = x1
            }
            if (x2 > max_y){
                max_y = x2
            }
            if (x < min){
                min = x
            }
            if (x1 < min_x){
                min_x = x1
            }if (x2 < min_y){
                min_y = x2
            }

        }
        var mean = sum/n
        var mean_x = sum_x/n
        var mean_y = sum_y/n

        console.log('------stats-----')
        console.log('min, mean, max')
        console.log(min, mean, max)
        console.log('x mmm')
        console.log(min_x, mean_x, max_x)
        console.log('y mmm')
        console.log(min_y, mean_y, max_y)

    }
}





class MentalModel{
    constructor(l){
        this.length = l
        this.mean = []
        /*
        for(var i =0; i< this.length; i++){
            this.mean.push(Math.random_int)
        }
        */

    }
    updateModel(p){
        //r = remember weight R in [0,1], default r = 0.5
        //if model is empty
        //  for x in p: mean.push(x)
        //else
        //  for i in range( p): mean.push((1-r)*p[i] + r*mean[i])
    }
}
//Memory
//change to brain?
class Memory{
    //graph data structure {object, event}
    //  connections = [relavence, time]
    //
        /*
        FindMemory() -> search algorithm
            find nearest neighbor. EX: food -> food{....,5 food}
            memory exchange. EX: food:{t=0, 5 food} -> food{t=1, 4 food} -> ... -> food{t=5, 0 food}
        */
    constructor(size){
        this.size = size
        this.memories = {} // { 'topic': [memory,...] }
        /*
            this.memories = { 'Water' :TimeEvent{water, location,..},
                                'Food' : TimeEvent{..       },
                                 ...
        */
        this.models = {} // { 'model' : [weights...] }
        this.stuff = [] //memories of things

    }
    of(p){
        //check if p is in the dictionary keys
        if (p in this.memories.keys()){
            return true
        }
    }
    addMemory(x){
        //memory: event
        this.size += 1
    }
    addModel(obj){
        //L = length of obj.features
        //W = [random_int]*L
        //this.models.add = {obj.name : W}
        //this.models[name] = W
    }
    compress(){
        //f(x) : x -> y
        //f = [a, b, c, d,... ]
    }
    process(x){
        //think -> process(x)
        //y = f(x), f = Memory
        //y = mean??
        //return y
    }
}

//Animal
class Animal{
    constructor(type, position, size, mass, gb){
        this.gb = gb //gameboard
        this.health = 100
        this.type = type
        this.size = size
        this.mass = mass
        this.position = position

        this.hunger = 100 // value range : [100,0]
        this.thirst = 100 //    [100,0]
        this.energy = 100 //    [100,0]
        this.happy = 0

        this.velocity = new Point(0,0)
        this.velocity_norm = this.velocity.toInt()
        this.max_v = 13
        this.slope_bonus = 1
        this.map = {} //{point: object}
        this.memory_size = 4
        this.memory = new Memory(this.memory_size)
        this.action = 0 // value = index of action_map
        this.action_map = ['sleep','drink', 'eat', 'sex', 'kill', 'die', 'run', 'swim', 'climb', 'capture', 'defend'] //? Speak, Groom, Rest

        this.target = null //pointer to target object
        this.target_val = 0 // 1 = sex/food, -1 = death
        this.d_2_target = null
        if (this.target == null){
            this.d_2_target = 100000
        }
        else{
            this.d_2_target = Math.sqrt((this.target.position.x - this.position.x)**2 + (this.target.position.y - this.position.y)**2)
        }

        this.inForest = 0 // 1 = True
        this.inWater = 0 // 1 = True
        this.inShelter = 0 // 1 = True
        this.constraint = 0 // measured as mass
        this.weapon = null // cat, tiger, wolf, bear  :=> bone_knifes(5),... ram, elk :=> bone_hammer,... eagle :=> bone_knives(3)
        //claws & teeth =~= bone_knives

    }
    compressMemory(){
        //update memory:
        //  Y = f(W*X)
    }
    valueAssess(obj){
            let t_val = 0
            //this.type => {dog, cat, mouse... etc.
            //FOOD
            if(obj.constructor.name == "Plant"){ //change to ---> obj.classtype == "Tree", for more specific
                //tree? shelter?
                if (AnimalData[this.type]['shelter'] == obj.type){
                    t_val = 10
                    if (this.action == 0){
                        t_val = 90
                    }
                }
                //food?
                if (AnimalData[this.type]['diet'] == "Herbivore"){
                    t_val = 100
                }
                if (AnimalData[this.type]['diet'] == "Omnivore" && obj.food_count > 0){
                    t_val = 100 + obj.food_count
                    //eat: fruit & meat & seeds
                    //fruit eater
                }
            }
            if(obj.constructor.name == "Animal"){
                //threat?
                if(AnimalData[obj.type]['diet'] == "Carnivore" && obj.size > this.size){
                    t_val = -1000
                }
                //food?
                if(AnimalData[this.type]['diet'] == "Carnivore" && obj.size < this.size){
                    t_val = 100
                }
                //mate?
                if(AnimalData[this.type]['name'] == AnimalData[obj.type]['name']){
                    t_val = 10
                    if(AnimalData[this.type]['social'] == 'Group'){
                        t_val = 50
                    }
                    if(this.gender != obj.gender){
                        t_val = 90
                        if(this.action_map[action] == 'sex'){
                            t_val = 150
                        }
                    }
                }
            }
            // if this = escape -> shelter increase target value

            // if energy = low -> sleep related objects increase target value
            // if thirst = low -> water increase target value

    }
    perceive(){
        //TODO
        //observe environment
        //      inForest? inWater? inSide? onObject? onTarget? envDensity?
        //          this tile <= water, forest
        //update target
        //return grid cell(this.location)

        var attention_distance = 10// = f(density of medium... {forest -> high density, flatland -> low density...}
        //if this.action = sleeping -> perception is handicapped
        if (this.action == 0){
            attention_distance = 1 //when sleeping
        }

        let ti = this.gb.point2Tile(this.position)
        let tile = this.gb.tiles[ti]

        for (var i = 0; i < tile.objects.length; i++){
            //todo: dynamic value assesment
            //order objects
            /*
                1) Big objects: Forests, Lake, Hill,...
                    inForest, inWater, onHill, inShelter(building, bush, cave, hole, tree)

                2) Concealing objects: Boulder, Hole, Cave, Bush, Wall...
                3) Plants
                4) Animals
                5) NPC
            */
            obj = tile.objects[i]
            var angle = toAngle(this.position, obj.position)
            //1) Check if object is perceivable (not concealed)
            //assess object type    : object type -> target val
            t_val = this.valueAssess(obj)
            if (Math.abs(t_val) > Math.abs(this.target_val)){
                this.target = obj
                this.target_val = t_val
                this.d_2_target = distance(this.position, target.position)
            }
            //inForest?
            //if(obj type == ForestMarker){ if(distance(this.position, forest.position) <= forest.radius) { inForest = true} }
            //inBuilding?
            //inVehicle
            //inWater
            //if(obj type == ForestMarker){ if(distance(this.position, forest.position) <= forest.radius) { inForest = true} }

            //create surround map = [N, NE, E, SE, S, SW, W, NW, Top, Bottom]
        }
        //for objects in cell & adjacent cells: evaluate object


    }
    act(){
        //percieve every k iterations, k = f(reaction time)
        this.perceive()
        //list of actions = [i = 0,1,2,...] each i represents different action, ex: eat, kill, sleep,...

        //action = f(this.stats, this.action, env) = arg_max(softMax(W*X))
        //env_gradient = (dx, dy)
        //env_target = (p1, p2)
        const X = [this.health, this.hunger, this.thirst, this.energy, this.happy, this.velocity_norm]
        // Stats {health, hunger, thirst, fatigue, happy, velocity}
        // Env [d_2_target, target_score, slope, this.inWater, this.inForest, this.inVehicle]
        const Env = [this.d_2_target, this.target_val, this.inForest, this.inShelter, this.inWater]

        // X = Concat(Stats, Env, action_one_hot_vec)
        //TODO: one_hot_vector

        //TODO:  if action = move -> dx, dy = f(?)
        //Return action <- y
        //y:
        //function = ActionMap(function name : function)

    }
    /*
    ['sleep','drink', 'eat', 'sex', 'kill', 'die', 'run', 'swim', 'climb', 'capture', 'defend/escape'] //? Speak, Groom, Rest
    */
    think(){
        //continue action sequence for relevant thinking
        //traverse memory graph as it relates to relevant subject, create new memory, compress memory
        /*
                Memory Graph
                    memories: relevant events to actor
                        EX: finding water at the river

        */
        //y = this.memory.process(x)
        //if y = null -> random_guess
        //else go towards y
        //m
        memories = this.memory.memories[x]
        //find nn(x, memories
    }

    speak(){
        //output animal sound from json animal data
    }
    rest(){
        //energy increase by rate
        //increase happy
    }
    sleep(){
        //if tval = -90 & d2target = close, -> energy += 1, -> defend()
        //energy increase by rate
        //increase happy

        //if no shelter ->search(shelter)
    }
    drink(){
        //thirst change
        //increase happy

        //if no water -> search(water)
    }
    eat(){
        //if sucess{
        //  hunger change
        //  energy += food.energy/(food.health + .00001)
        //  decrease food mass
        //  increase happy

        //if no food -> search(food)
    }
    sex(){
        //find opposite gender if not retarded
        //target = same type animal AND opposite gender

        //if success
        //happy increase
        //energy decrease
        // chance of offspring
    }
    kill(){
        // if (d_2_target < minimum) -> {run if far away, tackle if medium distance}
        if (d_2_target > 1.6*this.size){
            this.run()
        }
        else{
            if (d_2_target <= this.size){
                //attack target
                //attack val = f(this.size, this.mass, this.energy, this.weapon.attackForce
                //attack_val = (this.mass*this.energy)/(target.mass*target.energy) * this.size/target.size
            }
            else{
                this.capture()
            }
        }
        //if combat -> combat game
        //else -> other => dead

    }
    die(){
        //decrease happy

        //if success -> health = 0
    }
    run(){
        //change location
        if (this.target_val > 0 && this.d_2_target < 2*this.size){
            //assume no constraint effecting this.velocity
            this.position = this.target.position
            this.capture()
        }
        else{
            //      to where?: angle = towards positive tval
            let ang = toAngle(this.position, this.target.position)

            //velocity = f(close_threat, distant_reward)
            let b1 = -.1
            let b2 = .001
            let G = this.target_val/this.d_2_target //close threat
            let Y = this.target_val*this.energy*this.d_2_target //distant reward
            let vnorm = Math.max(0,b1*G) + Math.max(0,b2*Y)
            vnorm = min(1, vnorm/this.max_v) //percent of max
            //TODO constrain max = f(energy)
            //this.constraint <- constrain vnorm
            this.velocity_norm = vnorm*this.max_v
            this.velocity_norm -= 4*this.constraint/this.mass
            //TODO: how to remove constraint????
            //min speed = .1
            this.velocity_norm = max(.01, this.velocity_norm)
            if (this.target_val < 0){
                ang += Math.PI
            }
            this.velocity.x = this.velocity_norm*Math.cos(ang)
            this.velocity.y = this.velocity_norm*Math.sin(ang)
            this.position.x += this.velocity.x
            this.position.y += this.velocity.y
            //energy decrease
            this.energy -= .1*this.velocity_norm
            //happy increase = f(d2maxV, winning/losing)
            this.happy += 1/(this.velocity_norm - this.max_v)**2
        }
    }
    swim(){
        //change location
        //energy decrease
    }
    climb(){
        //change location
        //energy decrease
    }
    defend(){
        //fight or flight
        //to escape
        //  move in direction...
        //      super sprint -> avoid catch
        //      avoid
        //energy decrease
        //
    }
    capture(){
        //to grab, hold, trap, arrest, tie-up
        //add constraining force to target
        //if target is animal and not complying -> add constraint to target
        this.target.constraint += this.mass*this.energy/60 //if energy = 100% -> force = mass * 1.6
    }


    velocity_magnitude(){
        v_x = this.velocity.x
        v_y = this.velocity.y
        return Math.sqrt(v_x**2 + v_y**2)
    }
    search(p){
        //when to stop searching?
        //  if no memory -> Fibfractal search
        /*
        if (this.memory.size > 0 this.memory.of(p)){

        }*/
        //  if target = arrived & fail -> next memory
        //if (distance(obj) < c) {v = 0, pick_up(obj)}
        if (p == 'Food'){
            //use memory for destination FOOD
            //dv = f(destination)
        }
        if (p == 'Water'){
            //use memory for destination WATER
            //dv = f(destination)
        }
        if (p == 'Shelter'){
            //use memory for destination SAFE = no predators
            //dv = f(destination)
        }

        
    }
    computeChange(){
        //if perceive NPC run away
        //  -> for all local points:
        //      -> if (other.strength > this.strength AND other.type != this.type) -> danger
        //      -> if danger {velocity =

        //search for food, water, shelter <= f(hunger, thirst, fatigue)
        //if (thirst, hunger < -100) -> dead
        //if (fatigue < -100) -> sleep
        //velocity = f()

    }
    update(){
        if (this.hunger < 1){
            this.energy -= 1
        }
        if (this.thirst < 1){
            this.health -= 2
        }
        /*
        if (this.fatigue < 1){
            this.health -= 1
        }
        */
        //this.hunger -= b
        //this.thirst -= b
        //this.fatigue -= b* this.velocity_magnitude
        //this.position += velocity
    }
}

//NPC
class NPC{
    /*
    Character traits: Strength, Stamina, Agility, Intelligence, Wisdom, Charisma, Integrity, Bravery
    Character stats: Hunger, Thirst, Fatigue, Anger/Humor, Fear/Confidence, Sad/Happy, Sick
    Character Details: Name, Age, Gender, Nation, Industry, Job, Wealth=Sum(assets)-liabilities
    Knowledge:
        Smart : memory size = m
        Dumb : memory size = 1

    */
    constructor(vibe, name, age, gender, nation, industry, job, strength, stamina, agility, charisma, intelligence, wisdom, integrity, bravery, position){
        this.vibe = vibe
        this.name = name
        this.age = age
        this.gender = gender
        this.nation = nation //nationality
        this.industry = industry
        this.job = job

        this.hunger = 100 //[100,0]
        this.thirst = 100 //[100,0]
        this.energy = 100 //[100,0]
        this.humor = 0 //[-100, 100] = [sad, funny]
        this.confidence = 0 //[-100, 100] = [scared, confident]
        this.happy = 0 //[-100, 100] = [angry, happy]
        this.sick = 0 //[0,100]

        this.strength = strength
        this.stamina = stamina
        this.agility = agility
        this.charisma = charisma
        this.intelligence = intelligence
        this.wisdom = wisdom
        this.integrity = integrity
        this.bravery = bravery

        this.relationships = {} //{other : score}
        //this.relationships[other] += 1 for each time duration = 1 hour

        this.position = position
        this.velocity = new Point(0,0)
        this.max_v = 13
        this.slope_bonus = 1
        this.map = {} //{point: object}
        this.inventory = []
    }
    perceive(){
        //target value: asses all objects in environment
        //add bias
    }
    think(){
        //process memory
    }
    update(){
        //update new_position
        //update stats
    }
    computeChange(){
        //perceive env = X

        //make decision = Y = f(X)
        //decisions per function call = [talk, move, action, trivial action]

    }
}

class TimeEvent{
    /*
        EX:
          9-11 Terrorist attack
            September 11, 2001, 8AM
                - collision explosion at Tower 1
                - plane crashed, killed 300, witnessed by 1000
            September 11, 2001, 11AM
                - falling building at Tower 1
                - building fell, killed 700, witnessed by 150000

    */
    constructor(name, startTime, endTime, desc, type, location, attendees, activities){
        this.name = name //
        this.start = startTime
        this.end = endTime
        this.timeDuration = endTime - startTime
        this.desc = desc
        this.type = type
        this.location = location
        this.attendees = attendees
        this.activities = activities //
    }

}

class Policy{
    constructor(name, p_type){
        this.name = name
        this.type = p_type
        this.stickMap = {}
        this.carrotMap = {}
        this.objectives = []
    }
    readPolicy(){
    }
    addPunishment(rule, punishment){
        this.stickMap[rule] = punishment
    }
}

//Nation
class Nation{
    constructor(name, border, gov){
        //functionality: track policy, industry, economy, society of area
        this.name = name
        this.border = border //border object
        this.gov = gov

        //policy
        //     each policy exists in a n-dimensional manifold... each policy is represented by an n-dimensional vector.
        //       the n-dimensions represent variables the policy effects.
        //policy = system -> outcomes
        this.ag_policy = 1 //effects: {yeilds, life/eco, water, pollution}
        this.ed_policy = 1 //effects: {intelligence_pdf}, policy: {free child ed, invest in higher ed,..}
        this.def_policy = 1 //unit types, volunteer/required,
        this.tax_policy = 1 //tax_policy: polynomial function
        this.spend_policy = 1 //%_war, %_infrastructure, %_ed, %_justice, %_savings
        this.gov_policy = 1 //gov_policy: {democracy, democratic-republic, oligarchy, monarchy}
        this.land_policy = 1// water, forest, resource access
        //special policy; Ex: britian->archer, forest->no-deforestation

        this.civil_rights = [] //each i for all n: right has value (0,1). EX: free speech, religion, bear arms

        //econ and society data
        this.population = 1
        this.d_pop = 1 //change in population per change in time
        this.assets = {'food' : 1, 'gold' : 1}

        this.GDP = 1 // = Sum(production * product_value)
        this.interest_rate = 0.05 // = f(d_gdp/d_t) "positively correlated with growing gdp"
        this.econ_growth = 0 //econ growth = f(d_gdp, gov_investment) aprox= employment

        this.poverty = .1 // poverty = f(FOOD, POP, econ_growth, income_distribution)
        this.corruption = .4 //corruption = 1 - ( gov_investment / tax_revenue)

        this.popularity = 100 // if popularity drops below 50 -> protest, if below 30 -> riot, if below 25 -> revolution



    }
    update(){

    }
}

//King NPC
/*
    observes nation vars -> changes gov_investment

*/

/*
Blaze_NPC := alien that stimulates growth
* high compute? yes, emphasis on high ;)
- ninja King, wizard, Bus&Dev emperor,



*/

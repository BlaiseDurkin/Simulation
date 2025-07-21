var canvas = document.getElementById('Garden')
console.log(canvas)
var c = canvas.getContext('2d')
//c.translate(0.1, 0.1);
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


// Helper: check if a point is inside a polygon
function isPointInPolygon(point, polygon) {
  let inside = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const xi = polygon[i].x, yi = polygon[i].y;
    const xj = polygon[j].x, yj = polygon[j].y;

    const intersect = ((yi > point.y) !== (yj > point.y)) &&
                      (point.x < (xj - xi) * (point.y - yi) / (yj - yi + 0.00001) + xi);
    if (intersect) inside = !inside;
  }
  return inside;
}


function displayBedDetails(bed) {
    const container = document.getElementById("garden-details");
    container.innerHTML = ""; // Clear previous cards

    bed.plants.forEach(plant => {
        const data = PLANT_MAP[plant.toLowerCase()];
        if (!data) return; // Skip if not found

        const card = document.createElement("div");
        card.className = "plant-card";

        card.innerHTML = `
            <hr/>
            <h4>${capitalize(data.name)}</h4>
            <p>Water: ${data.daily_liter_water} L/day</p>
            <p>Sunlight: ${data.direct_light === 'yes' ? 'full' : 'partial'}</p>
            <p>Harvest Window: ${data.harvest_days_span} days </p>
        `;

        container.appendChild(card);
    });
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}




// Mouse move event to detect hovering
canvas.addEventListener('mousemove', (e) => {
  const scaleX = canvas.width / canvas.getBoundingClientRect().width;
  const scaleY = canvas.height / canvas.getBoundingClientRect().height;

  // Correct mouse position
  const rect = canvas.getBoundingClientRect();
  const mouse_x = (e.clientX - rect.left) * scaleX;
  const mouse_y = (e.clientY - rect.top) * scaleY;

  const mouse = {
    x: mouse_x ,
    y: mouse_y
  };

  let found = false;

  for (const bed of BEDS) {
    if (isPointInPolygon(mouse, bed.points)) {
      displayBedDetails(bed)
      found = true;
      break;
    }
  }

  if (!found) {
    //gardenDetails.innerText = ''; // Clear details if not hovering over any bed
  }
});









var p = new Point(canvas.width/2, canvas.height/2)
drawCircle(p, 3, 'red', 'white')
c.font = "12px Arial"
c.fillStyle = 'black'
c.textAlign = 'center'
start_message = 'Please enter your data to begin the garden ---->'
c.fillText(start_message, p.x, p.y+30);


function drawFence(l, w, d){
    clearCanvas()
    //default ratio = 1:2 = 0.5
    // min ratio = 1:1.5 = 0.67
    // max ratio = 1:2.5 = 0.4
    // if ratio < 1:2 --> use height=300 as base
    // else --> use width=600
    var dx = 0
    var dy = 0
    //pr = Math.log(2*d + 2)
    //var pnt = new Point(canvas.width/2 - dis, canvas.height/2 - dis*ratio)
    console.log('dis ratio',dis,ratio)
    var total_poles = 0
    var dis = 600
    var wid = w
    var len = l
    var ratio = l/w
    var x_scale = 1
    var y_scale = 1
    console.log('ratio before:', ratio)
    if (ratio > 1){
        ratio = 1/ratio
        len = w
        wid = l
    }
    console.log('ratio after:', ratio)


    var scaled_ratio = 1/(1 + 0.5*(1/ratio))
    if (ratio <= 0.5){
        scaled_ratio = 1/(1 + 0.5*(1/ratio))
        if (scaled_ratio < 0.4){
            scaled_ratio = 0.4
        }
        //reference is width = 600
        y_scale = scaled_ratio
    }
    else{
        //reference is height = 300
        scaled_ratio = 1/(0.334 + 0.834*(1/ratio))
        if (scaled_ratio > 0.856){
            scaled_ratio = 0.856
        }
        scaled_ratio = 1/scaled_ratio
        console.log('scaled ratio', scaled_ratio)
        x_scale = scaled_ratio
        dis = 300
    }

    console.log('x scale ',x_scale)
    console.log('y scale ',y_scale)

    var p1 = new Point(canvas.width/2 - dis*x_scale, canvas.height/2 - dis*y_scale)
    var p2 = new Point(canvas.width/2 + dis*x_scale, canvas.height/2 - dis*y_scale)
    var p3 = new Point(canvas.width/2 + dis*x_scale, canvas.height/2 + dis*y_scale)
    var p4 = new Point(canvas.width/2 - dis*x_scale, canvas.height/2 + dis*y_scale)

    drawLine(p1 , p2, 'black')
    drawLine(p2 , p3, 'black')
    drawLine(p3 , p4, 'black')
    drawLine(p4 , p1, 'black')


    c.font = "12px Arial"
    c.fillStyle = 'black'
    c.textAlign = 'center'
    if (isNaN(wid)){
        alert('Missing garden size data')
        message = 'Please enter garden size data'
        c.font = "20px Arial"
        c.fillStyle = 'red'
        c.fillText(message, canvas.width/2, canvas.height/2)
    }

    c.fillText(wid, canvas.width/2, canvas.height/2 - dis*y_scale - 4)
    c.fillText(len, canvas.width/2 - 1.03*dis*x_scale, canvas.height/2)
    //return [dis, ratio]
    return [dis, x_scale, y_scale]
}

//plotDem = drawFence(30, 30, 5)
//TODO set height to user input : shorter dimension
//widLength = plotDem[0]
//heightLength = widLength*plotDem[1]

function drawBeds(gw, gh, rad, xs, ys, m, bm, bed_width, bed_height){
    num_rows = Math.floor( (gh - 2*m + bm)/(bed_height + bm) )
    if (num_rows < 1){
        num_rows = 1
    }
    num_cols = Math.floor((gw - m)/(bed_width + m))
    if (num_cols < 1){
        num_cols = 1
    }

    //gw: garden_width
    //gh: garden_height
    //r: radius
    //xs: x_scale
    //yx: y_scale
    scaleX = (2*rad)/gw
    scaleY = (2*rad)/gh
    console.log('xs:', xs)
    console.log('ys: ',ys)
    nb = num_rows*num_cols
    if (nb > 0){
        document.getElementById('anal-button').style.visibility = 'visible'
    }

    const goodCombos = validPowerSet(MY_PLANTS);
    //
    //TODO -order beds by high calorie  (so potato are next to each other)
    //document interCropVal
    intercrop_score = document.getElementById('interCropVal').value/100
    survive_score = document.getElementById('survivalVal').value/100
    console.log('survive score: ', survive_score)
    console.log('intercrop score: ', intercrop_score)
    const bestCombos = rebalanceOptimization(goodCombos, nb, survive_score, intercrop_score, MY_PLANTS);


    bed_width = (gw - m*(num_cols + 1))/num_cols
    bed_height = (gh - 2*m - bm*(num_rows - 1))/num_rows

    y_0 = canvas.height/2 - rad*ys + m*scaleY*ys
    color = 'black'
    var i = 0
    for (var r = 0; r < num_rows; r++){
        x_0 = canvas.width/2 - rad*xs + m*scaleX
        for (var c = 0; c < num_cols; c++){
            my = bm

            var p1 = new Point(x_0 , y_0)
            var p2 = new Point(x_0 + scaleX*xs*bed_width, y_0)
            var p3 = new Point(x_0 + scaleX*xs*bed_width, y_0 + scaleY*ys*bed_height)
            var p4 = new Point(x_0 , y_0 + scaleY*ys*bed_height)
            drawLine(p1 , p2, color)
            drawLine(p2 , p3, color)
            drawLine(p3 , p4, color)
            drawLine(p4 , p1, color)
            //bed = makeBed()
            //Bed(pnts = [p1, p2, p3, p4],
            console.log(bestCombos[i])
            bed = new Bed([bed_width, bed_height], [p1, p2, p3, p4], bestCombos[i])
            //bed.layOutBed()
            BEDS.push(bed)
            i += 1
            x_0 += xs*scaleX*(bed_width + m)
        }
        y_0 += ys*scaleY*(bed_height + my)
    }

    //TODO - organize all the highCal beds next each other <--- sort beds to put highCal first
    //
    // - populate beds
    // - bed hover
    //
}
function drawPlant(pnt, diameter, plant){
    color = 'green'
    if (plant == 'carrot'){
        color = 'orange'
    }
    if (plant == 'potato'){
        color = 'brown'
    }
    if (plant == 'onion'){
        color = 'yellow'
    }
    if (plant == 'herb'){
        color = 'lime'
    }
    drawCircle(pnt, diameter/2, color, 'yellow')
}

function drawPlantsInBed(bed){
    //for individual bed: draw plants, update count of plants
    //set of row plants
    const rowPlants = new Set(['potato', 'onion', 'carrot', 'green beans', 'peas'])
    const herbsAndFlowers = new Set(['basil', 'mint', 'oregano', 'parsley', 'thyme', 'marigold', 'lemon grass', 'garlic']);

    //start with row plants
    //test function -> add text in bed
    var cntPnt = new Point((bed.points[1].x + bed.points[3].x)/2, (bed.points[1].y + bed.points[3].y)/2)
    bed_width = bed.size[0]
    bed_height = bed.size[1]
    dx = Math.abs(bed.points[2].x - bed.points[0].x)
    dy = Math.abs(bed.points[2].y - bed.points[0].y)
    //drawCircle(p, 3, 'red', 'white')
    c.font = "12px Arial"
    c.fillStyle = 'black'
    c.textAlign = 'center'
    message = ''
    sortedNonHerbs = []
    herbs = []
    numRowPlants = 0
    numNotHerbPlants = 0
    for (const plant of bed.plants){
        bed.dict_of_plants[plant] = 0
        //if rowPlants.has(plant) --> push
        if (rowPlants.has(plant)){
            sortedNonHerbs.push(plant)
            numRowPlants += 1
        }
        if (!herbsAndFlowers.has(plant)){

            numNotHerbPlants += 1
        }
        else{
            herbs.push(plant)
        }
    }
    for (const plant of bed.plants){
        if (!rowPlants.has(plant) && !herbsAndFlowers.has(plant)){
            sortedNonHerbs.push(plant)
        }
    }
    sx = dx/bed_width
    sy = dy/bed_height
    space_between = 19/12
    space_within = 6/12
    //area_per_plant = dx*dy / numNotHerbPlants
    width_per_plant = bed_width / numNotHerbPlants
    x0 = bed.points[0].x + space_within*sx //small initial margin
    y0 = bed.points[0].y + space_within*sy //small initial margin
    row_x_record = [x0]
    //TODO
    // -> record each row
    //      -> for each drawPlant -> keep track of new x0 values
    p_idx = 0
    for (const p of sortedNonHerbs){
        if (rowPlants.has(p)){
            //bed.dict_of_plants[p] = 0
            //TODO ->
            // -> dont double margin between plants
            num_rows = Math.floor( 1 + (width_per_plant - 2*space_within)/space_between )
            if (p_idx + 1 == sortedNonHerbs.length){
                width_per_plant = (bed.points[1].x - x0)/sx
                num_rows = Math.floor( 1 + (width_per_plant - 0.5*space_within)/space_between )
            }
            for (i = 0; i < num_rows; i++){

                while(y0 < bed.points[3].y){
                    //point
                    plantCenter = new Point(x0, y0)
                    drawPlant(plantCenter, 1*Math.sqrt(sx*sy), p)
                    if (x0 != row_x_record[row_x_record.length -1]){
                        row_x_record.push(x0)
                    }
                    //drawPlant(plantCenter, sx)
                    bed.dict_of_plants[p] += 1
                    y0 += space_within*sy
                }
                x0 += space_between*sx //next row
                y0 = bed.points[0].y + space_within*sy //reset height
            }
            // if its the last plant try to squeaze one more row in
            if (p_idx + 1 == sortedNonHerbs.length && herbs.length == 0){
                //console.log('last plant.. maybe space??')
                //remaining space: x0 < bed.points[1].x && bed.points[1].x - x0 >= space_within
                //console.log('remaining space: ', (bed.points[1].x - (x0 - space_between*sx)))
                //console.log('space needed: ', 0.9*space_between*sx)
                // tweak size comparison: change space within for something bigger?
                if ( bed.points[1].x - (x0 - space_between*sx) >= 0.9*space_between*sx){
                    //console.log('space available')
                    if (x0 >= bed.points[1].x){
                        x0 = bed.points[1].x - space_within*sx*0.5
                        //console.log('is this being triggered?')
                    }
                    x0 -= .1*space_between*sx
                    while (y0 < bed.points[3].y){
                        plantCenter = new Point(x0, y0)
                        drawPlant(plantCenter, 1*Math.sqrt(sx*sy), p)
                        if (x0 != row_x_record[row_x_record.length -1]){
                            row_x_record.push(x0)
                        }
                        bed.dict_of_plants[p] += 1
                        y0 += space_within*sy
                    }
                }
            }
        }
        else{
            //TODO
            //not row plant
            //but how many rows?
            width_remaining = (bed.points[1].x - x0)/sx
            num_rows = Math.floor( 1 + (width_remaining - space_within)/space_between )
            break
        }
        p_idx += 1
    }
    //console.log('final index: ',p_idx)

    number_remaining_plants = sortedNonHerbs.length - p_idx
    //console.log('num remaining: ', number_remaining_plants)
    if (number_remaining_plants > 0){
        var j = 0
        for (var i = 0; i < num_rows; i++){
            y0 = bed.points[0].y + space_within*sy //reset height
            while (y0 < bed.points[3].y){
                p = sortedNonHerbs[(j % number_remaining_plants) + p_idx]
                //while space is remaining
                //point
                plantCenter = new Point(x0, y0)
                drawPlant(plantCenter, 1*Math.sqrt(sx*sy), p)
                if (x0 != row_x_record[row_x_record.length -1]){
                    row_x_record.push(x0)
                }
                //drawPlant(plantCenter, sx)
                bed.dict_of_plants[p] += 1
                //rotate between rows
                //rotate between
                j += 1
                y0 += space_between*sy
            }
            x0 += space_between*sx //next row
        }
        //squeeze in one more "row"
        //ok lets do this

        if ( bed.points[1].x - (x0 - space_between*sx) >= 0.62*space_between*sx){
            console.log('space available for corn')
            if (x0 >= bed.points[1].x){
                x0 = bed.points[1].x - space_within*sx*0.5
                console.log('is this being triggered? corn')
            }
            x0 -= 0.2*space_between*sx //should i remove this
            y0 = bed.points[0].y + space_within*sy //reset height
            y0 += 0.5*space_between*sy

            while (y0 < bed.points[3].y){
                plantCenter = new Point(x0, y0)
                p = sortedNonHerbs[(j % number_remaining_plants) + p_idx]
                drawPlant(plantCenter, 1*Math.sqrt(sx*sy), p)
                if (x0 != row_x_record[row_x_record.length -1]){
                    row_x_record.push(x0)
                }
                bed.dict_of_plants[p] += 1

                y0 += space_between*sy
                j += 1
            }

        }
    }
    //check if there exists remaining space
    //TODO ->
    //  get record of each rows
    //console.log('rxr: ', row_x_record)

    if (herbs.length > 0){
        //edge case: bed is only herbs
        if (sortedNonHerbs.length == 0){
            width_per_plant = bed_width/herbs.length
            num_rows = Math.floor( 1 + (width_per_plant - 2*space_within)/space_between )
            x0 = bed.points[0].x + space_within*sx //small initial margin
            y0 = bed.points[0].y + space_within*sy //small initial margin
            //for the rows do the herbs: 1 herb per row unless num rows < num herbs... then alternate herbs
            if (num_rows >= herbs.length){
                //1 row per herb
                for (var i = 0; i < num_rows; i++){
                    p = herbs[i%herbs.length]
                    while(y0 < bed.points[3].y){
                        plantCenter = new Point(x0, y0)
                        drawPlant(plantCenter, 0.6*Math.sqrt(sx*sy), 'herb')

                        bed.dict_of_plants[p] += 1
                        y0 += space_within*sy
                    }
                    x0 += space_between*sx //next row
                    y0 = bed.points[0].y + space_within*sy //reset height
                }
                if ( bed.points[1].x - (x0 - space_between*sx) >= 0.9*space_between*sx){
                    console.log('space available')
                    if (x0 >= bed.points[1].x){
                        x0 = bed.points[1].x - space_within*sx*0.5
                        console.log('is this being triggered?')
                    }
                    x0 -= .1*space_between*sx
                    while (y0 < bed.points[3].y){
                        plantCenter = new Point(x0, y0)
                        drawPlant(plantCenter, 0.6*Math.sqrt(sx*sy), 'herb')

                        bed.dict_of_plants[p] += 1
                        y0 += space_within*sy
                    }
                }
            }
            else{
                //alternate herbs
                j = 0
                for (var i = 0; i < num_rows; i++){
                    while(y0 < bed.points[3].y){
                        plantCenter = new Point(x0, y0)
                        p = herbs[j%herbs.length]
                        drawPlant(plantCenter, 0.6*Math.sqrt(sx*sy), 'herb')

                        bed.dict_of_plants[p] += 1
                        y0 += space_within*sy
                        j += 1
                    }
                    x0 += space_between*sx //next row
                    y0 = bed.points[0].y + space_within*sy //reset height
                }
                //one more row?
                if ( bed.points[1].x - (x0 - space_between*sx) >= 0.9*space_between*sx){
                    //console.log('space available')
                    if (x0 >= bed.points[1].x){
                        x0 = bed.points[1].x - space_within*sx*0.5
                        //console.log('is this being triggered?')
                    }
                    //x0 -= .1*space_between*sx
                    while (y0 < bed.points[3].y){
                        plantCenter = new Point(x0, y0)
                        p = herbs[j%herbs.length]
                        drawPlant(plantCenter, 0.6*Math.sqrt(sx*sy), 'herb')

                        bed.dict_of_plants[p] += 1
                        y0 += space_within*sy
                        j += 1
                    }
                }
            }
        }

        else{
            //not only herb bed
            j = 0
            width_remaining = (bed.points[1].x - row_x_record[row_x_record.length -1])/sx
            //if theres enough space remaining -> fill it up with herbs
            if (width_remaining >= 0.6*space_between){
                x0 = 0.65*bed.points[1].x + 0.35*row_x_record[row_x_record.length -1]
                y0 = bed.points[0].y + space_within*sy //reset height
                while(y0 < bed.points[3].y){
                    plantCenter = new Point(x0, y0)
                    p = herbs[j%herbs.length]
                    drawPlant(plantCenter, 0.6*Math.sqrt(sx*sy), 'herb')
                    bed.dict_of_plants[p] += 1
                    y0 += space_within*sy
                    j += 1
                }
            }
            //then for each row in row_x_record, except for last, --> do herbs between row and next row
            for (var i = 0; i < row_x_record.length - 1; i++){
                y0 = bed.points[0].y + space_within*sy //reset height
                x0 = (row_x_record[i+1] + row_x_record[i])/2
                dist = row_x_record[i+1] - row_x_record[i]
                //big distance
                if (dist >= space_between*sx*0.9){
                    //if big distance, i.e. between rows -> put 5 to 6 herbs
                    //dy = (height - 2*margin) / 6
                    d_y = sy*(bed_height - 2*space_within)/4
                    while (y0 < bed.points[3].y){
                        p = herbs[j%herbs.length]
                        plantCenter = new Point(x0, y0)
                        drawPlant(plantCenter, 0.6*Math.sqrt(sx*sy), 'herb')
                        bed.dict_of_plants[p] += 1
                        y0 += d_y
                        j += 1
                    }
                }

                else{
                    //if small distance, i.e. between not rows -> interweave
                    //dy = space_between
                    x0 = 0.4*row_x_record[i+1] + 0.6*row_x_record[i]
                    y0 = bed.points[0].y + space_within*sy + 0.5*space_between*sy //reset height
                    while (y0 < bed.points[3].y){
                        p = herbs[j%herbs.length]
                        plantCenter = new Point(x0, y0)
                        drawPlant(plantCenter, 0.6*Math.sqrt(sx*sy), 'herb')
                        bed.dict_of_plants[p] += 1
                        y0 += space_between*sy
                        j += 1
                    }
                }

            }

        }

    }

}

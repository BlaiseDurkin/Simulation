//interface





function todayTemp(today, hot_day, min_t, max_t){
    return (max_t - min_t)/2 * Math.cos(2*Math.PI*(today - hot_day)/365) + (max_t + min_t)/2
}
function geoInput(){
    //thing is date to parse
    thing = document.getElementById('hot-day').value
    console.log(thing[0],thing[1],thing[2],thing[3])
    console.log(thing[5],thing[6])
    console.log(thing[8],thing[9])
    month = parseInt(thing[5]+thing[6])
    day = parseInt(thing[8]+thing[9])
    console.log(day)
    console.log(month)
    hottest_day = 0
    for (var i = 0; i < month-1; i++){
        console.log(MONTHS[i][0])
        hottest_day += MONTHS[i][1]
    }
    hottest_day += day
    console.log(hottest_day,' day/365')

    max_temp = parseInt(document.getElementById('max-temp').value)
    min_temp = parseInt(document.getElementById('min-temp').value)
    //year_temp = (max_t - min_t)/2 * Math.cos(2*Math.PI*(time - hottest_day)/365) + (max_t + min_t)/2
    //yyyy-mm-dd
    //draw chart with temp
    garden_width = parseInt(document.getElementById('garden-width').value)
    garden_height = parseInt(document.getElementById('garden-height').value)
    console.log('sanity check 1', garden_width, garden_height)


    plotDem = drawFence(garden_width, garden_height, 5)
    widLength = plotDem[0]*plotDem[1]
    heightLength = plotDem[0]*plotDem[2]

    //beds = [[1], [2], [3], [4], [5], [6], [], [], []]
    //TODO make beds
    // make beds!! RAAAAAAAAAAAAAAAAAAAAAAAAa
    // calculate number of beds given sie of garden
    // G_w : 90th ~ (2.5, 4) mean = 3.3, LB = 1.6, UB = 4.5
    // G_L : 90th ~ (4, 30) mean = 10, LB = 3
    // if Garden_area < 2x2 ---> flower pot
    margin = 1.6
    b_margin = 2.7*margin
    //between rows = 1.6 feet
    //big alley = 4ft
    //use longer side as width
    var Gw = garden_width
    var Gl = garden_height
    var ratio = Gl/Gw
    if (ratio > 1){
        ratio = 1/ratio
        garden_height = Gw
        garden_width = Gl
    }
    var mean_bed_thickness = 3.5
    var mean_bed_length = 10
    //beds are aligned vertically

    BEDS = []
    drawBeds(garden_width, garden_height, plotDem[0], plotDem[1], plotDem[2], margin, b_margin, mean_bed_thickness, mean_bed_length)

    //draw plants in bed
    //TODO
    for (var b = 0; b < BEDS.length; b++){
        drawPlantsInBed(BEDS[b])
    }
    //calculate number of plants by area of bed
    // calculate yeild per bed & total yield
    //  -> calculate time span of harvest, how many people can be fed for how long
    makeTimeChart(hottest_day, min_temp, max_temp)
    //TODO
    //drawPlantTimeSchedule()
}

function makeTimeChart(hottest_day, min_temp, max_temp){
    days = []
    temp_data = []
    y_axis_data = []
    x_axis_data = []
    j = 1
    m = 0
    x_axis_data.push({x : 0, labelx: MONTHS[m][0]+' '+j})
    for (var t = 0; t < 364; t++){
        temp = todayTemp(t, hottest_day-1, min_temp, max_temp)
        temp_data.push({x : t, y : temp})
        days.push(MONTHS[m][0]+' '+j)
        //MONTHS[m][0] special points for xlabel
        //console.log('t: ',t)
        if (j == MONTHS[m][1]){

            m += 1
            j = 1
            x_axis_data.push({x : t, labelx: MONTHS[m][0]+' '+j})
            //console.log('uhhhh', MONTHS[m][0]+' '+j)
        }
        else{
            j += 1
        }
    }
    //make yaxis ticks with min temp & max temp
    //start at min temp
    // for i in range 5:
    //      increase by dt
    //
    var num_y_ticks = 5
    var dt = (max_temp - min_temp) / num_y_ticks
    for (var i = 0; i < num_y_ticks ; i++){
        temp = Math.round(min_temp + i*dt)
        y_axis_data.push({y: temp, labely: temp})

    }
    //
    var timeData = {
    name: "Temperature",
    count: 0,
    data: temp_data,
    specialPoints: [],
    xAxisTicks: x_axis_data,
    yAxisTicks: y_axis_data
    }
    timePlot("myChart", [timeData])
    //TODO
    //TODO -> start and end of period for each category of plant
    //map temp to x-axis
    //for each plant in list -> order by min_temp -> y-axis line span temp


}


//TODO find hottest day
// list of desired veg = subset of all veg
// organize veg using compatability matrix
// order beds by comp matrix
// draw over time
//  beds
//


//Default Run shit
//TODO:
//  total plants = 29
//  MAXPLANTS = 15
//  -> keep count of selected plants
//  -> if count = max -> error message &
function loadPlants(){

    MY_PLANTS = [] //reset to prevent double adding
    document.querySelectorAll('#list1 li input[type="checkbox"]').forEach(checkbox => {
        if (checkbox.checked) {
            const plantName = checkbox.parentElement.textContent.trim().toLowerCase();
            MY_PLANTS.push(plantName);
        }
    });
    if (MY_PLANTS.length <= MAX_LIMIT){
        document.getElementById('plant-choices').style.visibility = 'hidden'
    }
    //alert(MY_PLANTS)
}

function showPlants(){
    document.getElementById('plant-choices').style.visibility = 'visible'
    MY_PLANTS = []
}


function analyzeGarden(){
    /*

    Garden Analysis
                 - expected yield for each plant type = {num_plants & total_pounds}
                        total_pounds = pounds_per_plant * num_plants

                 - number of people that can survive: num_people/year
                        total_calories = sum_over_plant_type( calories_per_pound * total_pounds)
                        num_people_per_year = total_calories / calories_needed_per_year


                 - expected water consumption (not factoring in rain)
                        total_water = sum_over_plant_type( water_per_plant * num_plants)
                            -> factor in rain
                                -> slider (desert - rainforest) -> total_water = r * total_water,
                                    r = { 1 if desert, 0 if rainforest}
                 - medicinal benifits (flowers & herbs)


    */
    //TODO
    // calculate values
    cals_per_person = 365 * 2500
    total_calories = 0
    total_plants = {} //{tomato: 15, basil: 10,...}
    total_water = 0
    rain_factor = document.getElementById('rainSlider').value/100
    //  for each bed -> bed.dict_of_plants = {plant1: number,...}
    //      for each plant in bed.plants -> number = bed.dict_of_plants[plant]
    for (var p = 0; p < MY_PLANTS.length; p++){
        total_plants[MY_PLANTS[p]] = 0
    }
    //console.log(total_plants)
    for (var i = 0; i < BEDS.length; i++){
        //for each bed
        bed = BEDS[i]
        //console.log(bed.dict_of_plants)
        for (var j = 0; j < bed.plants.length; j++){
            //for each plant
            plant = bed.plants[j]
            plant = plant.toLowerCase()

            const data = PLANT_MAP[plant]
            pounds = data.yield
            cals_per_pound = data.calories_pp
            water = data.daily_liter_water

            total_plants[plant] += bed.dict_of_plants[plant] //number of plants in bed
            total_calories += bed.dict_of_plants[plant] * pounds * cals_per_pound
            total_water += bed.dict_of_plants[plant] * water
        }
    }
    yield_container = document.getElementById('plant-yields')
    yield_container.innerHTML = ''
    //console.log(total_plants)
    for (var p = 0; p < MY_PLANTS.length; p++){
        //display each plant
        const card = document.createElement("div");
        //card.className = "plant-card";
        plant = MY_PLANTS[p]
        pounds = PLANT_MAP[plant].yield
        card.innerHTML = `

            <p> - ${plant} : ${Math.round(total_plants[plant] * pounds)} (pounds)</p>

        `;

        yield_container.appendChild(card);
    }
    // display values

    document.getElementById('max-capacity').innerHTML = Math.round(total_calories/cals_per_person *10)/10

    document.getElementById('water-consumption').innerHTML = Math.round(total_water/3.79 * 365) //3.79 liters in gallon
    document.getElementById('anal-container').style.visibility = 'visible'

}
function closeAnalCard(){
    document.getElementById('anal-container').style.visibility = 'hidden'
}
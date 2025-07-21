//line plots for time series

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

function drawLine(first, next, color, w, c){
    //first, next : Point
    //color : string
    c.beginPath()
    c.moveTo(first.x , first.y) // first point
    c.lineTo(next.x , next.y) // next point
    c.strokeStyle = color
    c.lineWidth = 6//w
    c.stroke()
    c.closePath()
}
function drawSubSupText(ctx, text, subscript, superscript, x, y) {
    ctx.fillText(text, x, y); // Base text
    ctx.font = "10px Arial";  // Smaller font for sub/superscript
    ctx.fillText(subscript, x + 15, y + 5);  // Subscript (lowered)
    ctx.fillText(superscript, x + 15, y - 10); // Superscript (raised)
}
function drawSubText(ctx, text, subscript, x, y) {
    ctx.fillText(text, x, y); // Base text
    ctx.font = "10px Arial";  // Smaller font for sub/superscript
    ctx.fillText(subscript, x + 8, y + 5);  // Subscript (lowered)
}
function drawSupText(ctx, text, superscript, x, y) {
    ctx.fillText(text, x, y); // Base text
    ctx.font = "10px Arial";  // Smaller font for sub/superscript
    ctx.fillText(superscript, x + 15, y - 10); // Superscript (raised)
}
/*
function linePlot(canvas){
    //draw y axis
    //draw x axis
    padding = 0
    p0 = new Point(0,0)
    p1 = new Point(100,100)
    drawLine(p0, p1, col, w, canvas)

}
*/

function timePlot(canvasId, datasets) {
    console.log(datasets[0])


    if (canvasId == "blank-chart"){
        return
    }
    const canvas = document.getElementById(canvasId);
    if (!canvas) {
        console.error("Canvas not found!");
        return;
    }
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    //canvas.height = window.innerHeight;

    // Clear canvas before drawing
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Get min and max values for scaling
    const allPoints = datasets.flatMap(dataset => dataset.data);
    const xMin = Math.min(...allPoints.map(point => point.x));
    const xMax = Math.max(...allPoints.map(point => point.x));
    const yMin = Math.min(...allPoints.map(point => point.y));
    const yMax = Math.max(...allPoints.map(point => point.y));

    // Padding for better visualization
    const padding_x = 80;
    const padding_y = 15;
    const width = canvas.width - 2 * padding_x;
    const height = canvas.height - 2 * padding_y;



    function scaleX(x) {
        return padding_x + ((x - xMin) / (xMax - xMin)) * width;
    }

    function scaleY(y) {
        return canvas.height - padding_y - ((y - yMin) / (yMax - yMin)) * height;
    }

    // Draw axes
    ctx.strokeStyle = COLOR_MC3;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(padding_x, padding_y); //top left corner
    ctx.lineTo(padding_x, canvas.height - padding_y); //bottom left corner
    ctx.lineTo(canvas.width - padding_x, canvas.height - padding_y); //bottom right corner
    ctx.stroke();

    //console.log('chhhhheeeeeccckkk:', datasets[0].data[0].y)
    if (isNaN(datasets[0].data[0].y)){
        //console.log('nan working')
        //display message of missing data
        //label y axis
        ctx.fillStyle = 'red';
        ctx.font = "20px Arial";
        message = 'Please enter temperature data';
        ctx.fillText(message, width/2, height/2);
        alert('Missing temperature data')
        return


    }

    // Generate distinct colors for each line
    const colors = ["purple", "blue", "green", "red", "orange", "brown", "pink"];

    // Plot each dataset
    datasets.forEach(({ name, count, data, specialPoints, xAxisTicks, yAxisTicks }, index) => {
        //const color = colors[index % colors.length];
        var color = COLOR_MC3//'#5C4033'
        ctx.strokeStyle = color;
        ctx.lineWidth = 1;
        ctx.beginPath();

        let lastPoint = null;
        //keep record of special y values {32, 40, 45, 50, 55, 60}
        // 75, 80, 85, 90, 95
        temp_start_map = {32:0, 40:0, 45:0, 50:0, 55:0, 60:0} //map y to x
        start_keys = [32, 40, 45, 50, 55, 60]
        //span: min_temp to days2harvest
        lower_bound_temp = -100
        temp_increasing = false
        min_temperature = 200
        x_of_min_y = 0

        data.forEach((point, i) => {
            const x = scaleX(point.x);
            const y = scaleY(point.y);

            //console.log(point.y)
            if (point.y < 40){
                color = 'aqua'
                console.log(color)
            }
            if (point.y >= 40 && point.y < 61){
                color = 'darkKhaki'
                console.log(color)
            }
            if (point.y >= 61 && point.y < 80){
                color = 'goldenRod'
                console.log(color)
            }
            if (point.y >= 80 && point.y < 90){
                color = 'darkOrange'
                console.log(color)
            }
            if (point.y >= 90){
                color = 'red'
                console.log(color)
            }
            color = 'goldenRod'
            ctx.strokeStyle = color;
            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
                //ctx.stroke();
            }
            lastPoint = { x, y };
            //temp map
            //
            //for all keys in temp_map, if distance(key - y) < 0.5 --> temp_map[key] = x
            //check that temp is rising not decreasing
            if (y < lower_bound_temp){ //yaxis is flipped so up is down
                temp_increasing = true
            }
            else{
                temp_increasing = false
            }
            lower_bound_temp = y
            //
            if (point.y < min_temperature && temp_increasing){
                min_temperature = point.y
                x_of_min_y = x
            }

            for (const key of start_keys) {
                if (temp_increasing){
                    if (Math.abs(point.y - key) < 0.5){
                        temp_start_map[key] = x
                    }
                }
            }

            //
        });

        ctx.stroke();

        // Label dataset name to the right of the last point
        /*
        if (lastPoint) {
            ctx.fillStyle = 'black';
            ctx.fillText(name, lastPoint.x + 10, lastPoint.y);
        }
        */
        //label y axis
        ctx.fillStyle = COLOR_MC3;
        ctx.fillText(name, padding_x - 14, padding_y - 3);

        // Label ticks on X axis
        xAxisTicks.forEach(({x, labelx}) => {
            const scaledX = scaleX(x);
            ctx.fillStyle = COLOR_MC3;
            ctx.fillText(labelx, scaledX + 5, canvas.height - padding_y + 12); // X-axis label
            //console.log('label xxx', labelx)
        });
        // Label ticks on X axis
        yAxisTicks.forEach(({y, labely}) => {
            const scaledY = scaleY(y);
            ctx.fillStyle = COLOR_MC3;
            ctx.fillText(labely, padding_x - toString(labely).length**1.1, scaledY); // Y-axis label
            //subtract length of text
        });
        // Draw and label special points for this dataset
        specialPoints.forEach(({ x, y, labelx, labely }) => {
            const scaledX = scaleX(x);
            const scaledY = scaleY(y);

            // Draw dotted lines to axes
            /*
            ctx.strokeStyle = "gray";
            ctx.setLineDash([5, 5]);
            ctx.beginPath();
            ctx.moveTo(scaledX, canvas.height - padding_y);
            ctx.lineTo(scaledX, scaledY);
            ctx.moveTo(padding_x, scaledY);
            ctx.lineTo(scaledX, scaledY);
            ctx.stroke();
            ctx.setLineDash([]); // Reset line dash
            */
            // Draw point
            /*
            ctx.fillStyle = "black";
            ctx.beginPath();
            ctx.arc(scaledX, scaledY, 5, 0, 2 * Math.PI);
            ctx.fill();
            */

            // Label x and y axes at special points
            ctx.fillStyle = COLOR_MC3;
            ctx.fillText(labelx, scaledX + 5, canvas.height - padding_y + 15); // X-axis label
            //drawSubText(ctx, labelx, count, scaledX + 3, canvas.height - padding_y + 15)
            ctx.fillText(labely, padding_x - 17, scaledY); // Y-axis label
        });


        console.log(temp_start_map)
        //height
        sturrrt = padding_y
        //n = 10
        color = COLOR_MC3
        ctx.strokeStyle = color;
        console.log(MY_PLANTS)
        for (var i = 0; i< MY_PLANTS.length; i++){
            //alert(MY_PLANTS[i])
            x = temp_start_map[PLANT_MAP[MY_PLANTS[i]].min_temp]
            if (x < padding_x){
                //set x to axis
                x = x_of_min_y
            }
            sturrrt += .9*height/MY_PLANTS.length
            ctx.font = "10px Arial";
            ctx.fillText(MY_PLANTS[i], x, sturrrt)
            d2h = PLANT_MAP[MY_PLANTS[i]].days2harvest

            console.log('d2h: ', d2h)
            x_end = x + scaleX(d2h)
            remainder = 0
            // if (x_end > (canvas.width - padding_x)) --> remainder = x_end - (canvas.width - padding_x)
            //      --> draw line(x_interval = padding_x, remainder)
            if (x_end > (canvas.width - padding_x)){
                remainder = x_end - (canvas.width - padding_x)
                console.log('remainder: ', remainder)
                ctx.beginPath()
                ctx.moveTo(x, sturrrt);
                ctx.lineTo(canvas.width - padding_x, sturrrt);
                ctx.stroke();

                ctx.beginPath()
                ctx.moveTo(padding_x, sturrrt);
                ctx.lineTo(padding_x + remainder, sturrrt);
                ctx.stroke();

            }
            else{
                ctx.beginPath()
                ctx.moveTo(x, sturrrt);
                ctx.lineTo(x_end, sturrrt);
                ctx.stroke();
            }


        }


    });
}







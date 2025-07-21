//
/*

    OLD FILE!!!! NOT IN USE!!!!

*/

var canvas = document.getElementById('Garden')
console.log(canvas)
var c = canvas.getContext('2d')
//c.translate(0.1, 0.1);
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var p = new Point(canvas.width/2, canvas.height/2)
drawCircle(p, 3, 'red', 'white')
c.font = "12px Arial"
c.fillStyle = 'black'
c.textAlign = 'center'


function drawFence(l, w, d){
    clearCanvas()
    var dx = 0
    var dy = 0
    pr = Math.log(2*d + 2)
    var pnt = new Point(canvas.width/2 - dis, canvas.height/2 - dis*ratio)
    var total_poles = 0
    var dis = 600
    var wid = w
    var len = l
    var ratio = l/w
    if (ratio > 1){
        ratio = 1/ratio
        len = w
        wid = l
    }
    var p1 = new Point(canvas.width/2 - dis, canvas.height/2 - dis*ratio)
    var p2 = new Point(canvas.width/2 + dis, canvas.height/2 - dis*ratio)
    var p3 = new Point(canvas.width/2 + dis, canvas.height/2 + dis*ratio)
    var p4 = new Point(canvas.width/2 - dis, canvas.height/2 + dis*ratio)

    drawLine(p1 , p2, 'black')
    drawLine(p2 , p3, 'black')
    drawLine(p3 , p4, 'black')
    drawLine(p4 , p1, 'black')


    c.font = "12px Arial"
    c.fillStyle = 'black'
    c.textAlign = 'center'
    c.fillText(wid, canvas.width/2, canvas.height/2 - dis*ratio - 4)
    c.fillText(len, canvas.width/2 - 1.03*dis, canvas.height/2)
    return [dis, ratio]
}

plotDem = drawFence(100, 200, 5)
//TODO set height to user input : shorter dimension
widLength = plotDem[0]
heightLength = widLength*plotDem[1]

//draw beds upright

function drawBeds(beds, heightLength, widLength){
    //heightLength = nb*by + ng*gy
    //heightLength = nb*by + ng*(.5*by)
    //hl = by(nb + ng*.5)
    nb = beds.length


    //nc: number of columns
    nc = 1
    if (nb > 3){
        nc = 2
    }
    //widLength = nc*gx+gx + nc*bx
    //widLength - nc*gx+gx = nc*bx
    //
    ng = 1 + nb

    if (nc == 1){
        by = 2*heightLength/(nb + .5*ng)
    }
    else{
        if (nb%2 == 0){
            by = 2*heightLength/(.5*nb + .5*(1 + .5*nb))
        }
        else{
            by = 2*heightLength/(Math.ceil(.5*nb) + .5*(1 + .5*nb))
        }
    }

    lens = Math.ceil((nb + ng)/nc)

    gy = .5*by
    gx = gy

    bx = (2*widLength - nc*gx - gx)/nc

    x = canvas.width/2 - widLength + gx
    y = canvas.height/2 - heightLength



    var p1 = new Point(x, y)
    var p2 = p1
    var p3 = p1
    var p4 = p1
    for (var j = 0; j < nc; j++){
        x = canvas.width/2 - widLength + gx + (gx + bx)*j
        y = canvas.height/2 - heightLength
        p1 = new Point(x, y)
        if (j > 0 && nb%2 != 0){
            lens -=1
        }
        for (var i = 0; i < lens; i++){
            if (i%2 == 0){
                //gap
                y += gy
                p2 = new Point(x, y)
                //p3 = new Point(x + bx ,y)
                //p4 = new Point(x + bx, y + by)
            }
            else{
                //bed
                y += by
                p2 = new Point(x, y)
                p3 = new Point(p1.x + bx ,p1.y)
                p4 = new Point(x + bx, y)
                drawRec(p1.x, p1.y, bx, by, 'rgba(180, 160, 130, .2)')
                drawLine(p1, p2, 'green')
                drawLine(p1, p3, 'green')
                drawLine(p2, p4, 'green')
                drawLine(p3, p4, 'green')


            }

            p1 = p2
            p3 = p4
        }
    }
}

beds = [[1]]
beds = [[1], [2]]
beds = [[1], [2], [3]]
beds = [[1], [2], [3], [4]]
beds = [[1], [2], [3], [4], [5]]
beds = [[1], [2], [3], [4], [5], [6], [], [], []]
drawBeds(beds, heightLength, widLength)


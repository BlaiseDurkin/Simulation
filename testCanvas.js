// this is a test for the hover mouse event
class Point{
    constructor(x, y){
        this.x = x
        this.y = y
    }
    toInt(){
        return Math.sqrt(this.x**2 + this.y**2)
    }
}

var canvas = document.getElementById('Garden')
console.log(canvas)
var c = canvas.getContext('2d')
//c.translate(0.1, 0.1);
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var p = new Point(canvas.width/2, canvas.height/2)
radius = 3
drawCircle(p, radius, 'red', 'white')
c.font = "12px Arial"
c.fillStyle = 'black'
c.textAlign = 'center'
start_message = 'Please enter your data to begin the garden ---->'
c.fillText(start_message, p.x, p.y+30);



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

canvas.addEventListener('mousemove', (e) => {
  // Clear canvas each time
  //clearCanvas()
  const scaleX = canvas.width / canvas.getBoundingClientRect().width;
  const scaleY = canvas.height / canvas.getBoundingClientRect().height;

  // Correct mouse position
  const rect = canvas.getBoundingClientRect();
  const mouse_x = (event.clientX - rect.left) * scaleX;
  const mouse_y = (event.clientY - rect.top) * scaleY;

  // Draw circle
  const p = { x: mouse_x, y: mouse_y };
  drawCircle(p, 3, 'red', 'white');
});
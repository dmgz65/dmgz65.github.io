//CIRCLE TRAIL

// initialize svg. querySelector retursnt the 1st element in the document that matches the css selector.
const svg = document.querySelector("svg")

// points on the trail, how many segments, how big first and last circle be. and mousr position
let points = []
let segments = 800
const maxRadius = 8
const minRadius = 2
let mouse = {
    x: 0,
    y: 0,
}

// move function
const move = (event) => {
    // find where x and y of mouse are
    const x = event.clientX
    const y = event.clientY

    // make the mouse x where x is and mouse y where y is
    mouse.x = x
    mouse.y = y

    // if .length (number of elements in array) is empty, slinky. all segments should be in the same place when start
    if (points.length === 0) {
        for (let i = 0; i < segments; i++) {
            // push adds new items to the end of list, and returns new length.
            points.push({
                x: x,
                y: y,
            })
        }
    }
}

// animation function
const anim = () => {
    // initialize start points
    let px = mouse.x
    let py = mouse.y

    // for each point (p), move the point closer to the next point
    points.forEach((p, index) => {
        // move current point towards the previous point
        p.x += (px - p.x) * 0.98
        p.y += (py - p.y) * 0.98

        // update the previous position
        px = p.x
        py = p.y
    })

    // clear previous circles
    svg.innerHTML = ''

    // draw circles for each point
    points.forEach((p, index) => {
        const radius = maxRadius - ((maxRadius - minRadius) * index / (segments - 1))
        const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle")
        circle.setAttribute("cx", p.x)
        circle.setAttribute("cy", p.y)
        circle.setAttribute("r", radius)
        circle.setAttribute("fill", "white")
        svg.appendChild(circle)
    })

    // keep running anim every time
    requestAnimationFrame(anim)
}

// resize. sets the browser dimensions
const resize = () => {
    const ww = window.innerWidth
    const wh = window.innerHeight

    svg.style.width = ww + "px"
    svg.style.height = wh + "px"
    svg.setAttribute("viewBox", `0 0 ${ww} ${wh}`)
}

// run move function when the mouse moves
document.addEventListener("mousemove", move)
// listen when the window is resized and run resize function
window.addEventListener("resize", resize)

// run da funcs
anim()
resize()


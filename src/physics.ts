import * as Matter from 'matter-js';

// module aliases
const Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Composite = Matter.Composite;

let engine: Matter.Engine;
let render: Matter.Render;

export function loadPhysics() {

    // create an engine
    engine = Engine.create();

    // get window size
    const width = window.innerWidth;
    const height = window.innerHeight;
    console.log(`width: ${width}, height: ${height}`)

    // Create a renderer
    render = Render.create({
        element: document.body,
        engine: engine,
        options: {
            width: window.innerWidth,
            height: window.innerHeight,
            wireframes: false // This allows for color
        }
    });

    // create two boxes and a ground
    const ball = Bodies.circle(400, 200, 80, {
        restitution: 0.6, // Bounciness
        render: {
            fillStyle: 'red'
        }
    });
    Composite.add(engine.world, [ball]);

    // Add walls
    const wallThickness = 10;
    createWall(window.innerWidth / 2, wallThickness / 2, window.innerWidth, wallThickness, 'red'); // Top
    createWall(window.innerWidth / 2, window.innerHeight - wallThickness / 2, window.innerWidth, wallThickness, 'blue'); // Bottom
    createWall(wallThickness / 2, window.innerHeight / 2, wallThickness, window.innerHeight, 'green'); // Left
    createWall(window.innerWidth - wallThickness / 2, window.innerHeight / 2, wallThickness, window.innerHeight, 'yellow'); // Right

    // run the renderer
    Render.run(render);

    // create runner
    const runner = Runner.create();

    // run the engine
    Runner.run(runner, engine);
    // fit the render viewport to the scene
    console.log('Physics loaded')
}

function createWall(x: number, y: number, width: number, height: number, color: string) {
    const wall = Bodies.rectangle(x, y, width, height, {
        isStatic: true,
        render: { fillStyle: color }
    });
    Composite.add(engine.world, [wall]);
}

export function setGravity(x: number, y: number) {
    if (engine) {
        engine.gravity.x = x;
        engine.gravity.y = y;
    }
}

// Resize handling
window.addEventListener('resize', function () {
    render.canvas.width = window.innerWidth;
    render.canvas.height = window.innerHeight;
});

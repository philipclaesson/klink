import * as Matter from 'matter-js';

// module aliases
const Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Composite = Matter.Composite,
    Events = Matter.Events;

let engine: Matter.Engine;
let render: Matter.Render;

export function loadPhysics() {

    // create an engine
    engine = Engine.create();
    engine.gravity.scale = 0.0001;

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
        label: 'Ball',
        render: {
            fillStyle: 'red'
        }
    });
    Composite.add(engine.world, [ball]);

    // Add walls
    const wallThickness = 10;
    createWall(window.innerWidth / 2, wallThickness / 2, window.innerWidth, wallThickness, 'red', 'Top'); // Top
    createWall(window.innerWidth / 2, window.innerHeight - wallThickness / 2, window.innerWidth, wallThickness, 'blue', 'Bottom'); // Bottom
    createWall(wallThickness / 2, window.innerHeight / 2, wallThickness, window.innerHeight, 'green', 'Left'); // Left
    createWall(window.innerWidth - wallThickness / 2, window.innerHeight / 2, wallThickness, window.innerHeight, 'yellow', 'Right'); // Right

    // Collision handling
    Events.on(engine, 'collisionStart', handleCollision);

    // run the renderer
    Render.run(render);

    // create runner
    const runner = Runner.create();

    // run the engine
    Runner.run(runner, engine);
    console.log('Physics loaded')
}

function createWall(x: number, y: number, width: number, height: number, color: string, label: string) {
    const wall = Bodies.rectangle(x, y, width, height, {
        isStatic: true,
        label: label,
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

function handleCollision(event: Matter.IEventCollision<Matter.Engine>) {
    const source = event.source
    let bodyLabel: string = ''
    if (source == null)
        return;
    const pairs: any = source.pairs
    if (pairs == null)
        return;
    const collisions: any = pairs.list
    if (collisions == null)
        return;
    if (!Array.isArray(collisions)) {
        console.log('collisions: Not an array')
        return;
    }
    if (!collisions.length) {
        console.log('collisions: Empty array')
        return;
    }
    if (!collisions[0].bodyB) {
        console.log('collisions: BodyB is null', collisions[0])
        return;
    }
    bodyLabel = collisions[0].bodyB.label

    console.log(`ball collided with ${bodyLabel}`)    
}

// Resize handling
window.addEventListener('resize', function () {
    render.canvas.width = window.innerWidth;
    render.canvas.height = window.innerHeight;
});

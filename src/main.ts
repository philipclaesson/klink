let gravityCenterX = 0;
let gravityCenterY = 0;

// @ts-ignore
import { GravitySensor } from 'motion-sensors-polyfill/src/motion-sensors.js';

window.addEventListener('deviceorientation', (event) => {
    const { beta, gamma } = event;
    const width = window.innerWidth;
    const height = window.innerHeight;
    // console.log(beta, gamma)

    if (beta !== null && gamma !== null) {
        gravityCenterX = (width / 2) + (gamma / 90) * (width / 2);
        gravityCenterY = (height / 2) + (beta / 180) * (height / 2);
    }
    // console.log(`gravity:`, gravityCenterX, gravityCenterY)
});

function updateBallPosition() {
    const ball = document.getElementById('ball');
    if (!ball) {
        requestAnimationFrame(updateBallPosition);
        return;
    }

    const currentX = parseInt(ball.style.left, 10) || 0;
    const currentY = parseInt(ball.style.top, 10) || 0;

    // Calculate the new position with easing
    const newX = currentX + (gravityCenterX - currentX) * 0.1;
    const newY = currentY + (gravityCenterY - currentY) * 0.1;

    ball.style.left = `${newX}px`;
    ball.style.top = `${newY}px`;
    // console.log(`ball:`, newX, newY)

    requestAnimationFrame(updateBallPosition);
}

// Start the loop
updateBallPosition();

window.addEventListener('deviceorientation', (event) => {
    const { alpha, beta, gamma } = event;
    // alpha is angle between 

    // Convert degrees to radians
    const alphaRadians = (alpha ?? 0) * (Math.PI / 180);
    const betaRadians = (beta ?? 0) * (Math.PI / 180);
    const gammaRadians = (gamma ?? 0) * (Math.PI / 180);

    // Compute gravity vector in device coordinates
    const gX = Math.sin(betaRadians);
    const gY = -Math.sin(gammaRadians);
    const gZ = Math.cos(betaRadians) * Math.cos(gammaRadians);

    // Rotate the gravity vector by the alpha angle around the Z-axis
    const gravityVectorX = gX * Math.cos(alphaRadians) + gY * Math.sin(alphaRadians);
    const gravityVectorY = -gX * Math.sin(alphaRadians) + gY * Math.cos(alphaRadians);

    // console.log(`Gravity Vector: (${gravityVectorX}, ${gravityVectorY})`);
});

function setElementInnerHtml(name: string, value: string) {
    const x = document.getElementById(name);
    if (x) {
        x.innerHTML = `${value}`;
        console.log(`setElementInnerHtml: ${name} = ${value}`)
    } else {
        console.log(`setElementInnerHtml: ${name} not found`)
    }
}

// First, check if the GravitySensor API is available
if ('GravitySensor' in window) {
    // Request permission to use the accelerometer
    // @ts-ignore
    const pn: PermissionName = 'accelerometer';
    navigator.permissions.query({ name: pn }).then(result => {
        console.log(result)
        if (result.state === 'granted') {
            console.log(`permission granted`)
            // Permission granted
            let sensor = new GravitySensor();
            console.log(sensor)
            setElementInnerHtml('x1', `${sensor.x}`);
            setElementInnerHtml('y1', `${sensor.y}`);
            setElementInnerHtml('z1', `${sensor.z}`);
            sensor.onreading = () => {
                // Handle sensor readings
                console.log(`Onreading along the X-axis: ${sensor.x}`);
                console.log(`Onreading along the Y-axis: ${sensor.y}`);
                console.log(`Onreading along the Z-axis: ${sensor.z}`);
                setElementInnerHtml('x1', `${sensor.x}`);
                setElementInnerHtml('y1', `${sensor.y}`);
                setElementInnerHtml('z1', `${sensor.z}`);
            }
            sensor.addEventListener('reading', () => {
                // Handle the sensor data
                console.log(`Acceleration along the X-axis: ${sensor.x}`);
                console.log(`Acceleration along the Y-axis: ${sensor.y}`);
                console.log(`Acceleration along the Z-axis: ${sensor.z}`);
                setElementInnerHtml('x2', `${sensor.x}`);
                setElementInnerHtml('y2', `${sensor.y}`);
                setElementInnerHtml('z2', `${sensor.z}`);
            });
            sensor.start();
        } else if (result.state === 'denied') {
            console.error('Permission to use accelerometer was denied.');
        } else {
            console.log('Permission to use accelerometer is not yet granted or denied');
        }
    });
} else {
    console.log('GravitySensor API not available.');
}

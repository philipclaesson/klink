import { get2dGravity, requestPermission } from './sensors.js';

function updateBallPosition() {
    const g = get2dGravity();
    setElementInnerHtml('x1', `x: ${g.x}`)
    setElementInnerHtml('y1', `y: ${g.y}`)
    requestAnimationFrame(updateBallPosition);
}

// Start the loop
updateBallPosition();

function setElementInnerHtml(name: string, value: string) {
    const x = document.getElementById(name);
    if (x) {
        x.innerHTML = `${value}`;
    }
}

window.onload = function () {
    const startButton = document.getElementById("start-btn");
    if (startButton) {
        setElementInnerHtml('msg', 'Registered click handler');
        startButton.onclick = function (e) {
            setElementInnerHtml('msg', 'Requesting permission');
            e.preventDefault();
            const rp = requestPermission()

            setElementInnerHtml('msg', `rp: ${rp}`);
        };
    }
}

let gravityCenterX = 0;
let gravityCenterY = 0;

import { get2dGravity, requestPermission } from './sensors.js';

function updateBallPosition() {
    const g = get2dGravity();
    setElementInnerHtml('x', g.x == null ? 'null' : `x: ${g.x}`)
    setElementInnerHtml('y', g.y == null ? 'null' : `y: ${g.y}`)
    requestAnimationFrame(updateBallPosition);
}

// Start the loop
updateBallPosition();
const rp = requestPermission()
if (typeof rp === 'string') {
    setElementInnerHtml('msg', rp);
}

function setElementInnerHtml(name: string, value: string) {
    const x = document.getElementById(name);
    if (x) {
        x.innerHTML = `${value}`;
    }
}

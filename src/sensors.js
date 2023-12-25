export let x = 0
export let y = 0
export let z = 0

export function requestPermission() {
    try {
        // Request permission for iOS 13+ devices
        if (
            DeviceMotionEvent &&
            typeof DeviceMotionEvent.requestPermission === "function"
        ) {
            DeviceMotionEvent.requestPermission();
        }   
    } catch (error) {
        return `${error}`;
    }

    window.addEventListener("devicemotion", handleMotion);
}

function handleMotion(event) {
    // add some extra weight to the acceleration because its hard
    // to move the phone as forceful as gravity
    x = event.accelerationIncludingGravity.x + event.acceleration.x
    y = (event.accelerationIncludingGravity.y + event.acceleration.y) * -1 // invert y axis
    z = event.accelerationIncludingGravity.z + event.acceleration.z
}

export function get2dGravity() {
    return { x, y }
}

// add window eventlistener for keydown
window.addEventListener("keydown", handleKeyDown);
function handleKeyDown(e) {
    if (!window.location.href.includes("localhost")) {
        return
    }
    if (e.key === "ArrowUp") {
        y = 9.8
        x = 0
    }
    if (e.key === "ArrowDown") {
        y = -9.8
        x = 0
    }
    if (e.key === "ArrowLeft") {
        x = -9.8
        y = 0
    }
    if (e.key === "ArrowRight") {
        x = 9.8
        y = 0
    }
}

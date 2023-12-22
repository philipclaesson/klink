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
    x = event.accelerationIncludingGravity.x
    y = event.accelerationIncludingGravity.y
    z = event.accelerationIncludingGravity.z
}

export function get2dGravity() {
    return { x, y }
}

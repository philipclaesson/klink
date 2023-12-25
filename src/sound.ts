import { Sampler, loaded } from 'tone';

let initiated = false
let sampler: Sampler;
// Function to initialize and load the sample
export async function loadSound() {
    sampler = new Sampler({
        urls: {
            "C4": "C4.mp3",
            "D#4": "Ds4.mp3",
            "F#4": "Fs4.mp3",
            "A4": "A4.mp3",
        },
        release: 1,
        baseUrl: "https://tonejs.github.io/audio/salamander/",
    }).toDestination();
    await loaded();
    initiated = true;
}

export function playSample(label: string, speed: number): void {
    if (!initiated) {
        console.log(`not initiated`)
        return
    }
    const velocity = Math.min(1, Math.max(0.1, speed / 40))
    const parts = label.split('-');
    const wall = parts[0];
    const bin = parts.length > 1 ? parts[1] : '';

    switch (wall) {
        case 'Left':
            sampler.triggerAttackRelease(["Eb4"], 4, undefined, velocity);
            break;
        case 'Right':
            sampler.triggerAttackRelease(["G3"], 4, undefined, velocity);
            break;
        case 'Top':
            sampler.triggerAttackRelease(["G4"], 4, undefined, velocity);
            break;
        case 'Bottom':
            sampler.triggerAttackRelease(["Bb4"], 4, undefined, velocity);
            break;
        default:
            console.log(`unexpected wall ${wall}`)
            break;
    }
}

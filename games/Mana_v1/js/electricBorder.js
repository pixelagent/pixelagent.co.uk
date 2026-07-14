const electricOffsets = [
    document.getElementById('electricOffset1'),
    document.getElementById('electricOffset2'),
    document.getElementById('electricOffset3'),
    document.getElementById('electricOffset4')
];

let electricStart = null;

function animateElectricBorder(timestamp) {
    if (!electricStart) electricStart = timestamp;
    const elapsed = (timestamp - electricStart) / 1000;

    if (electricOffsets[0]) {
        electricOffsets[0].setAttribute('dy', Math.sin(elapsed * 0.7) * 500);
    }
    if (electricOffsets[1]) {
        electricOffsets[1].setAttribute('dy', Math.sin(elapsed * 0.7 + Math.PI) * 500);
    }
    if (electricOffsets[2]) {
        electricOffsets[2].setAttribute('dx', Math.cos(elapsed * 0.5) * 350);
    }
    if (electricOffsets[3]) {
        electricOffsets[3].setAttribute('dx', Math.cos(elapsed * 0.5 + Math.PI) * 350);
    }

    requestAnimationFrame(animateElectricBorder);
}

requestAnimationFrame(animateElectricBorder);

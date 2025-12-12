function createBackground() {
    bgCnv.background('#333')

    // gradient bg
    gradientBG(color(0, 0, 30), color(260, 2, 10));

    // elf house
    bgCnv.noStroke()
    bgCnv.fill('#4a4a4aff')
    bgCnv.circle(width / 2, height - 20, 235)

    bgCnv.strokeWeight(32)
    bgCnv.stroke('#3a3a3a ')
    bgCnv.fill('#222');
    bgCnv.circle(width / 2, height - 20, 200)

    bgCnv.strokeWeight(2)
    bgCnv.noFill()
    bgCnv.stroke('#4a4a4a')
    bgCnv.circle(width / 2, height - 20, 170)

    // floor
    bgCnv.noStroke()
    bgCnv.fill('#fff');
    bgCnv.rect(width / 2, height - 10, width, 20)
}

function gradientBG(c1, c2) {
    for (let y = 0; y < height; y++) {
        let t = y / height;
        let c = lerpColor(c1, c2, t);
        bgCnv.stroke(c);
        bgCnv.line(0, y, width, y);
    }
}
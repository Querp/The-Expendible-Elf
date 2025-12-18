function setupDrawingModes() {
    createCanvas(1200, 800);
    rectMode(CENTER);
    textAlign(CENTER, CENTER);
    colorMode(HSL);
    textFont('Bangers')

    cnv = createGraphics(width, height);
    cnv.rectMode(CENTER);
    cnv.textAlign(CENTER, CENTER);
    cnv.colorMode(HSL);
    cnv.textFont('Bangers')

    bgCnv = createGraphics(width, height);
    bgCnv.rectMode(CENTER);
    bgCnv.textAlign(CENTER, CENTER);
    bgCnv.colorMode(HSL);
    bgCnv.textFont('Bangers')
}
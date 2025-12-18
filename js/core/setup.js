function setupDrawingModes() {
    createCanvas(1200, 800);
    rectMode(CENTER);
    textAlign(CENTER, CENTER);
    colorMode(HSL);

    cnv = createGraphics(width, height);
    cnv.rectMode(CENTER);
    cnv.textAlign(CENTER, CENTER);
    cnv.colorMode(HSL);

    bgCnv = createGraphics(width, height);
    bgCnv.rectMode(CENTER);
    bgCnv.textAlign(CENTER, CENTER);
    bgCnv.colorMode(HSL);
}
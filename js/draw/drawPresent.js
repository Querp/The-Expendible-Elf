function drawPresent(present) {
    cnv.strokeWeight(1);

    // draw Rubble
    if (present.hasFallenToTheFloor) {
        cnv.stroke('#000')
        cnv.fill(present.color)
        cnv.strokeWeight(0.5)
        cnv.push();
        cnv.translate(
            present.pos.x + present.rubblePositions[0],
            present.pos.y + 3
        )
        cnv.rotate(25)
        cnv.rect(
            0, 0,
            constrain(present.rubblePositions[1] * 2, 7, 12),
            constrain(present.rubblePositions[2], 7, 12),
        )
        cnv.pop();
        cnv.push();
        cnv.translate(
            present.pos.x + present.rubblePositions[1],
            present.pos.y + 3,
        )
        cnv.rotate(-40)
        cnv.rect(
            0, 0,
            constrain(present.rubblePositions[2], 7, 12),
            constrain(present.rubblePositions[0] * 2, 7, 12),
        )
        cnv.pop();
        cnv.rect(
            present.pos.x + present.rubblePositions[2],
            present.pos.y + 3,
            constrain(present.rubblePositions[0] * 1.5, 7, 12),
            constrain(present.rubblePositions[1] * 1.5, 7, 12),
        )

        // draw coin
    } else if (present.hasBeenCaught) {
        const alpha = 1 - (present.getElapsedTimeSinceCatch() / Present.timeToDespawn);
        cnv.strokeWeight(1.3)
        cnv.stroke(color(48, 96, 29, alpha));
        cnv.fill(color(54, 100, 50, alpha));
        cnv.circle(present.pos.x, present.pos.y, 17)

        // draw present
    } else {
        cnv.strokeWeight(1);
        cnv.stroke('#000');
        cnv.fill('#d13e3eff');
        cnv.fill(present.color);
        cnv.rect(present.pos.x, present.pos.y, 20);
        cnv.fill('#fff');
        cnv.noStroke();
        cnv.rect(present.pos.x, present.pos.y, 20, 2);
        cnv.rect(present.pos.x, present.pos.y, 2, 20);
    }
}
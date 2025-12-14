function drawElf(elf) {
    cnv.push();
    cnv.translate(elf.pos.x, elf.pos.y);
    cnv.scale(elf.scalar, elf.scalar);
    cnv.rotate(radians(elf.angle.self));
    cnv.stroke(0);
    cnv.strokeWeight(0.2)
    cnv.noStroke();
    // if (elf.scalar < 3) noStroke();

    drawElfHead(elf);

    if (elf.vel.x === 0) {
        drawElfChest(elf);
        drawElfLegLeft(elf);
        drawElfLegRight(elf);
        drawElfArmLeft(elf);
        drawElfArmRight(elf);
    } else if (elf.vel.x === -1) {
        drawElfLegRight(elf);
        drawElfArmRight(elf);
        drawElfChest(elf);
        drawElfLegLeft(elf);
        drawElfArmLeft(elf);
    } else {
        drawElfLegLeft(elf);
        drawElfArmLeft(elf);
        drawElfChest(elf);
        drawElfLegRight(elf);
        drawElfArmRight(elf);
    }

    cnv.rotate(radians(-elf.angle.self));

    if (elf.type === 'player') drawElfDashCoolDown();
    cnv.pop();
}

function drawElfHead(elf) {
    cnv.noStroke()
    cnv.fill('#e2c68fff');
    cnv.circle(0, -8, 13);

    cnv.fill('#000');
    cnv.strokeWeight(0.1);
    cnv.strokeWeight(0.1);
    cnv.stroke(255);
    let eyeLeftOffset = 0;  // perspective of user
    let eyeRightOffset = 0;
    if (elf.vel.x === 1) eyeRightOffset = -1;
    if (elf.vel.x === -1) eyeLeftOffset = 1;
    const targetEyeLeftX = -2.5 + elf.vel.x * 7 + eyeLeftOffset * 2;
    const targetEyeRightX = 2.5 + elf.vel.x * 7 + eyeRightOffset * 2;

    elf.eyePosX.left = lerp(elf.eyePosX.left, targetEyeLeftX, 0.3)
    elf.eyePosX.right = lerp(elf.eyePosX.right, targetEyeRightX, 0.3)

    cnv.circle(elf.eyePosX.left, -8, constrain((2.3 + elf.vel.x * 0.75), 0, 2.3));
    cnv.circle(elf.eyePosX.right, -8, constrain((2.3 - elf.vel.x * 0.75), 0, 2.3));

    cnv.noStroke();
    cnv.fill('#388e3fff');
    if (elf.type === 'intern') cnv.fill('hsla(282, 43%, 39%, 1.00)')
        cnv.triangle(
    -6.3, -12,
    0, -28,
    6.3, -12,
);

cnv.fill('#c72b2bff');
if (elf.type === 'intern') cnv.fill('hsla(0, 0%, 84%, 1.00)')
cnv.rect(0, -12, 13, 1.5, 0.2);
}

function drawElfChest(elf) {
    const chestWidth = elf.vel.x === 0 ? 10.5 : 6;
    cnv.fill('#388e3fff');
    if (elf.type === 'intern') cnv.fill('hsla(282, 43%, 39%, 1.00)')
    cnv.rect(0, 5.5, chestWidth, 14, 3);
}

function drawElfArmLeft(elf) {
    const xOffset = elf.vel.x !== 0 ? 0 : 4;
    cnv.fill('#e2c68fff');
    cnv.push();
    cnv.translate(xOffset, 0)
    cnv.rotate(radians(elf.angle.arm.left + 90));
    cnv.rect(6.25, 0, 14, 1.7, 999)

    cnv.circle(13.5, 0, 3)
    
    cnv.pop();
}

function drawElfArmRight(elf) {
    const xOffset = elf.vel.x !== 0 ? 0 : -4;
    cnv.fill('#e2c68fff');
    cnv.push();
    cnv.translate(xOffset, 0);
    cnv.rotate(radians(elf.angle.arm.right + 90));
    cnv.rect(6.25, 0, 14, 1.7, 999);
    cnv.circle(13.5, 0, 3);
    cnv.fill('#1d1d1dff');
    cnv.rect(0, 0, 0.35, 1);
    cnv.pop();
}

function drawElfLegLeft(elf) {
    const xOffset = elf.vel.x !== 0 ? 0 : 3;
    const shoeWidth = elf.vel.x !== 0 ? 5 : 3;
    cnv.push();
    cnv.translate(xOffset, 11.45);

    cnv.fill('#ff0000ff');
    if (elf.type === 'intern') cnv.fill('hsla(282, 43%, 39%, 1.00)')
    cnv.rotate(radians(elf.angle.leg.left));
    cnv.rect(0, 7, 1.8, 16, 99);

    cnv.fill('#8f7657ff');
    cnv.rect(elf.vel.x * 1.5, 15.3, shoeWidth, 2, 0.5);

    cnv.fill('#ecececff');
    cnv.rect(0, 2, 1.8, 2.5);
    cnv.rect(0, 6.5, 1.8, 2.5);
    cnv.rect(0, 11, 1.8, 2.5);
    cnv.pop();
}

function drawElfLegRight(elf) {
    const xOffset = elf.vel.x !== 0 ? 0 : -3;
    const shoeWidth = elf.vel.x !== 0 ? 5 : 3;
    cnv.push();
    cnv.translate(xOffset, 11.45)

    cnv.fill('#00ff00ff');
    if (elf.type === 'intern') cnv.fill('hsla(282, 43%, 39%, 1.00)')
    cnv.rotate(radians(elf.angle.leg.right));
    cnv.rect(0, 7, 1.8, 16, 99);

    cnv.fill('#8f7657ff');
    cnv.rect(elf.vel.x * 1.5, 15.3, shoeWidth, 2, 0.5);

    cnv.fill('#ecececff');
    cnv.rect(0, 2, 1.8, 2.5);
    cnv.rect(0, 6.5, 1.8, 2.5);
    cnv.rect(0, 11, 1.8, 2.5);
    cnv.pop();
}

function drawElfDashCoolDown() {
    const effective = Dash.getEffectiveDashCooldown();
    const passed = frameCount - Dash.startFrameCount;

    const maxW = 40;
    const w = map(passed, 0, effective, maxW, 0, true); // true = clamp

    cnv.rectMode(CORNER);
    cnv.fill('#ffffffa6');
    cnv.rect(-maxW / 2, -30, w, 5.5);
    cnv.rectMode(CENTER);
}

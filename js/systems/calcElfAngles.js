function calcElfSelfAngle(elf) {
    let multiplier = 3
    let lerpSpeed = 0.15;
    if (Dash.dashing) {
        multiplier = 90;
        lerpSpeed = 0.3;
    }
    let targetAngle = elf.vel.x * multiplier;

    elf.angle.self = lerp(elf.angle.self, targetAngle, lerpSpeed);
}

function calcElfLimbAngles(elf) {
    let lerpSpeed = 0.18;
    const frameDuration = 5;

    if (Dash.dashing && elf.type === 'player') {
        elf.angle.leg.left = 0;
        elf.angle.leg.right = 0;
        elf.angle.arm.left = 25;
        elf.angle.arm.right = -25;
    }

    if (elf.vel.x === 0) {
        elf.angle.leg.left = lerp(elf.angle.leg.left, 0, lerpSpeed * 1.35)
        elf.angle.leg.right = lerp(elf.angle.leg.right, 0, lerpSpeed * 1.35);
        elf.angle.arm.left = lerp(elf.angle.arm.left, -150, lerpSpeed * 0.9);
        elf.angle.arm.right = lerp(elf.angle.arm.right, 150, lerpSpeed * 0.9);
        return
    }

    const dirs = [0.3, 1.3, 0.7, 0, -0.3, -1.3, -0.7, 0];
    const keyFrames = dirs.length;
    const loopDuration = keyFrames * frameDuration;

    // which keyframe (0–7)
    const currentFrame = floor(frameCount % loopDuration / frameDuration);

    // desired direction pattern
    const dir = dirs[currentFrame];

    elf.angle.leg.left = lerp(elf.angle.leg.left, -dir * 75, lerpSpeed)
    elf.angle.leg.right = lerp(elf.angle.leg.right, dir * 75, lerpSpeed)

    if (Dash.dashing) return
    
    elf.angle.arm.left = lerp(elf.angle.arm.left, dir * 105, lerpSpeed)
    elf.angle.arm.right = lerp(elf.angle.arm.right, -dir * 105, lerpSpeed)
}
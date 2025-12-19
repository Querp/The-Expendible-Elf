const ElfMovement = {
    applyGravity(elf) {
        elf.acc.y = elf.isOnFloor() ? 0 : Elf.GRAVITY;
    },
    updateVelocity(elf) {
        elf.vel.x += elf.acc.x * elf.speed;
        elf.vel.y += elf.acc.y * elf.speed;
        elf.vel.x = constrain(elf.vel.x, -elf.maxSpeed, elf.maxSpeed);
        elf.vel.y = constrain(elf.vel.y, -elf.maxSpeed, elf.maxFallSpeed);
    },
    applyDrag(elf) {
        elf.vel.x *= elf.drag;
    }
};
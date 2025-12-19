function drawMenuWelcome() {
    bgCnv.fill('#111111e0');
    bgCnv.rect(width /2 , height/2, width, height)
    cnv.textSize(90)
    cnv.fill('#ddd')
    cnv.text('The Expendible Elf', width / 2, 150);
    
    game.elves.getPlayer().pos.y = 260;

}
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    spookyBoy.setImage(assets.image`playerU`)
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    spookyBoy.setImage(assets.image`playerL`)
})
info.onCountdownEnd(function () {
    game.splash("" + info.score() + " + " + "(" + info.life() + " * " + "50" + ")")
    info.changeScoreBy(info.life() * 50)
    game.gameOver(true)
})
sprites.onOverlap(SpriteKind.Enemy, SpriteKind.Food, function (sprite, otherSprite) {
    sprite.startEffect(effects.fire, 500)
    sprites.destroy(otherSprite)
    evilSpeed += 5
    evilAngle = Math.random() * Math.PI * 2
    evilBoy.setVelocity(Math.cos(evilAngle) * evilSpeed, Math.sin(evilAngle) * evilSpeed)
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    spookyBoy.setImage(assets.image`playerR0`)
})
sprites.onOverlap(SpriteKind.Enemy, SpriteKind.Player, function (sprite, otherSprite) {
    scene.cameraShake(4, 500)
    info.changeLifeBy(-1)
    evilBoy.setPosition(160, 0)
    evilBoy.setVelocity(Math.cos(evilAngle) * evilSpeed, Math.sin(evilAngle) * evilSpeed)
})
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    spookyBoy.setImage(assets.image`playerD`)
})
info.onLifeZero(function () {
    game.gameOver(false)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    otherSprite.startEffect(effects.ashes)
    sprites.destroy(otherSprite)
    info.changeScoreBy(1)
})
let wisp: Sprite = null
let image2 = 0
let evilAngle = 0
let evilSpeed = 0
let evilBoy: Sprite = null
let spookyBoy: Sprite = null
game.setGameOverEffect(true, effects.confetti)
game.setGameOverEffect(false, effects.dissolve)
info.startCountdown(60)
scene.setBackgroundImage(assets.image`BG`)
info.setScore(0)
spookyBoy = sprites.create(assets.image`playerN`, SpriteKind.Player)
evilBoy = sprites.create(assets.image`evilN`, SpriteKind.Enemy)
evilSpeed = 50
evilAngle = Math.random() * Math.PI * 2
spookyBoy.setPosition(0, 120)
evilBoy.setPosition(160, 0)
spookyBoy.setStayInScreen(true)
evilBoy.setBounceOnWall(true)
controller.moveSprite(spookyBoy)
evilBoy.setVelocity(Math.cos(evilAngle) * evilSpeed, Math.sin(evilAngle) * evilSpeed)
info.setLife(3)
game.onUpdateInterval(200, function () {
    image2 = randint(0, 4)
    if (image2 == 0) {
        wisp = sprites.create(assets.image`wisp1`, SpriteKind.Food)
    } else if (image2 == 1) {
        wisp = sprites.create(assets.image`wisp2`, SpriteKind.Food)
    } else if (image2 == 2) {
        wisp = sprites.create(assets.image`wisp3`, SpriteKind.Food)
    } else if (image2 == 3) {
        wisp = sprites.create(assets.image`wisp4`, SpriteKind.Food)
    } else {
        wisp = sprites.create(assets.image`wisp5`, SpriteKind.Food)
    }
    wisp.setVelocity(randint(-10, 10), randint(-25, -1))
    wisp.setPosition(randint(-15, 175), 150)
    wisp.scale = Math.randomRange(0.5, 1.5)
})

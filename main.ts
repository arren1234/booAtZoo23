namespace SpriteKind {
    export const Health = SpriteKind.create()
    export const Time = SpriteKind.create()
}
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    spookyBoy.setImage(assets.image`playerU`)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Time, function (sprite, otherSprite) {
    otherSprite.startEffect(effects.ashes)
    sprites.destroy(otherSprite)
    info.changeCountdownBy(10)
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    spookyBoy.setImage(assets.image`playerL`)
})
info.onCountdownEnd(function () {
	
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
sprites.onOverlap(SpriteKind.Player, SpriteKind.Health, function (sprite, otherSprite) {
    if (info.life() < 3) {
        info.changeLifeBy(1)
    } else {
        info.changeScoreBy(25)
    }
    otherSprite.startEffect(effects.ashes)
    sprites.destroy(otherSprite)
})
sprites.onOverlap(SpriteKind.Enemy, SpriteKind.Player, function (sprite, otherSprite) {
    music.play(music.createSoundEffect(WaveShape.Noise, 2334, 0, 255, 0, 100, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.UntilDone)
    scene.cameraShake(4, 500)
    info.changeLifeBy(-1)
    evilBoy.setPosition(160, 0)
    evilBoy.setVelocity(Math.cos(evilAngle) * evilSpeed, Math.sin(evilAngle) * evilSpeed)
})
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    spookyBoy.setImage(assets.image`playerD`)
})
info.onLifeZero(function () {
    if (info.score() >= 150) {
        game.gameOver(true)
    } else {
        game.gameOver(false)
    }
})
sprites.onOverlap(SpriteKind.Enemy, SpriteKind.Health, function (sprite, otherSprite) {
    sprite.startEffect(effects.fire, 500)
    sprites.destroy(otherSprite)
    evilSpeed += 5
    evilAngle = Math.random() * Math.PI * 2
    evilBoy.setVelocity(Math.cos(evilAngle) * evilSpeed, Math.sin(evilAngle) * evilSpeed)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    otherSprite.startEffect(effects.ashes)
    sprites.destroy(otherSprite)
    info.changeScoreBy(1)
})
sprites.onOverlap(SpriteKind.Enemy, SpriteKind.Time, function (sprite, otherSprite) {
    sprite.startEffect(effects.fire, 500)
    sprites.destroy(otherSprite)
    evilSpeed += 5
    evilAngle = Math.random() * Math.PI * 2
    evilBoy.setVelocity(Math.cos(evilAngle) * evilSpeed, Math.sin(evilAngle) * evilSpeed)
})
let wispType = 0
let wisp: Sprite = null
let wispSpecial = 0
let evilAngle = 0
let evilSpeed = 0
let evilBoy: Sprite = null
let spookyBoy: Sprite = null
game.splash("Collect Wisps", "Avoid Enemy")
game.setGameOverEffect(true, effects.confetti)
game.setGameOverEffect(false, effects.dissolve)
game.setGameOverPlayable(false, music.stringPlayable(music.convertRTTTLToMelody("s:d=4,o=5,b=125:c,8c#,c,8d,c,8d#,c,8e,c,f,e,d#,d,c#,c,1c4"), 200), false)
game.setGameOverPlayable(true, music.stringPlayable(music.convertRTTTLToMelody("s:d=4,o=5,b=125:8f#,c,8f,c,8e,c,8d#,c,8d,c,8c#,c,c#,d,d#,e,f,f#,1c"), 200), false)
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
music.play(music.createSoundEffect(WaveShape.Noise, 1, 5000, 124, 255, 999, SoundExpressionEffect.Warble, InterpolationCurve.Curve), music.PlaybackMode.UntilDone)
game.onUpdateInterval(200, function () {
    wispSpecial = randint(0, 100)
    if (wispSpecial == 0) {
        wisp = sprites.create(assets.image`wispH`, SpriteKind.Health)
    } else if (wispSpecial == 1) {
        wisp = sprites.create(assets.image`wispT`, SpriteKind.Time)
    } else {
        wispType = randint(0, 4)
        if (wispType == 0) {
            wisp = sprites.create(assets.image`wisp1`, SpriteKind.Food)
        } else if (wispType == 1) {
            wisp = sprites.create(assets.image`wisp2`, SpriteKind.Food)
        } else if (wispType == 2) {
            wisp = sprites.create(assets.image`wisp3`, SpriteKind.Food)
        } else if (wispType == 3) {
            wisp = sprites.create(assets.image`wisp4`, SpriteKind.Food)
        } else {
            wisp = sprites.create(assets.image`wisp5`, SpriteKind.Food)
        }
    }
    wisp.setVelocity(randint(-10, 10), randint(-25, -1))
    wisp.setPosition(randint(-15, 175), 150)
    wisp.scale = Math.randomRange(0.5, 1.5)
})

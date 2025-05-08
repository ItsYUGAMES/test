namespace SpriteKind {
    export const ActivePlayer = SpriteKind.create()
    export const Melee = SpriteKind.create()
}
sprites.onOverlap(SpriteKind.Melee, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprites.destroy(Enemy1)
})
// 初始朝向
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    isUp = true
    isDown = false
    isLeft = false
    isRight = false
})
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    isDown = true
    isLeft = false
    isRight = false
    isUp = false
})
scene.onOverlapTile(SpriteKind.ActivePlayer, sprites.dungeon.darkGroundSouthEast1, function (sprite, location) {
    isTriggered = false
    Enemy1.follow(null)
})
sprites.onCreated(SpriteKind.Melee, function (sprite) {
	
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    // 获取玩家前方1格的位置（以朝向为准，这里简化为右侧）
    frontX = activePlayer.tilemapLocation().column + 1
    frontY = activePlayer.tilemapLocation().row
    targetTile = tiles.getTileLocation(frontX, frontY)
    // 如果该 tile 是可破坏的，就替换为透明或地面
    if (tiles.tileAtLocationEquals(targetTile, sprites.dungeon.floorLight0)) {
        tiles.setTileAt(targetTile, sprites.dungeon.darkGroundSouthEast1)
        tiles.setWallAt(tiles.getTileLocation(activePlayer.tilemapLocation().column + 1, activePlayer.tilemapLocation().row), false)
        music.play(music.createSong(hex`0078000408020109010e02026400000403780000040a000301000000640001c80000040100000000640001640000040100000000fa0004af00000401c80000040a00019600000414000501006400140005010000002c0104dc00000401fa0000040a0001c8000004140005d0076400140005d0070000c800029001f40105c201f4010a0005900114001400039001000005c201f4010500058403050032000584030000fa00049001000005c201f4010500058403c80032000584030500640005840300009001049001000005c201f4010500058403c80064000584030500c8000584030000f40105ac0d000404a00f00000a0004ac0d2003010004a00f0000280004ac0d9001010004a00f0000280002d00700040408070f0064000408070000c80003c800c8000e7d00c80019000e64000f0032000e78000000fa00032c01c8000ee100c80019000ec8000f0032000edc000000fa0003f401c8000ea901c80019000e90010f0032000ea4010000fa0001c8000004014b000000c800012c01000401c8000000c8000190010004012c010000c80002c800000404c8000f0064000496000000c80002c2010004045e010f006400042c010000640002c409000404c4096400960004f6090000f40102b80b000404b80b64002c0104f40b0000f401022003000004200300040a000420030000ea01029001000004900100040a000490010000900102d007000410d0076400960010d0070000c8000600000001000106`), music.PlaybackMode.InBackground)
    }
    Attack = sprites.create(assets.image`myImage`, SpriteKind.Melee)
    Attack.lifespan = 200
    if (isLeft) {
        Attack.setPosition(player1.x - 16, player1.y)
    } else if (isRight) {
        Attack.setPosition(player1.x + 16, player1.y)
    } else if (isUp) {
        Attack.setPosition(player1.x, player1.y - 16)
    } else if (isDown) {
        Attack.setPosition(player1.x, player1.y + 16)
    }
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    isRight = true
    isDown = false
    isLeft = false
    isUp = false
})
function shootHomingBullet (shooter: Sprite, target: Sprite, speed: number) {
    bullet = sprites.createProjectileFromSprite(img`
        . . 5 . . 
        . 5 5 5 . 
        5 5 5 5 5 
        . 5 5 5 . 
        . . 5 . . 
        `, shooter, 0, 0)
    dx = target.x - shooter.x
    dy = target.y - shooter.y
    len = Math.sqrt(dx * dx + dy * dy)
    // 单位向量方向 * speed
    bullet.vx = dx / len * speed
    bullet.vy = dy / len * speed
}
scene.onOverlapTile(SpriteKind.ActivePlayer, sprites.dungeon.collectibleInsignia, function (sprite, location) {
    isTriggered = true
    Enemy1.follow(activePlayer, 20)
})
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    controller.moveSprite(activePlayer, 0, 0)
    if (activePlayer == player1) {
        activePlayer = player2
        player1.follow(player2, 20)
        player2.follow(null)
        player2.setKind(SpriteKind.ActivePlayer)
    } else {
        activePlayer = player1
        player2.follow(player1, 20)
        player1.follow(null)
        player1.setKind(SpriteKind.ActivePlayer)
    }
    controller.moveSprite(activePlayer, 80, 80)
    scene.cameraFollowSprite(activePlayer)
})
function EnemyPatrol (column: number, row: number, Enemy: Sprite) {
    if (Enemy.tilemapLocation().column > column) {
        Enemy.vx = 0 - Enemy.vx
    } else if (Enemy.tilemapLocation().row > row) {
        Enemy.vy = 0 - Enemy.vy
    }
    if (Enemy.tilemapLocation().column < column - 3) {
        Enemy.vx = 0 - Enemy.vx
    } else if (Enemy.tilemapLocation().row < row - 3) {
        Enemy.vy = 0 - Enemy.vy
    }
}
function shootCircleBullets (center: Sprite, count: number, speed: number) {
    for (let i = 0; i <= count - 1; i++) {
        angle = 360 / count * i
        bullet2 = sprites.createProjectileFromSprite(img`
            . . 5 . . 
            . 5 5 5 . 
            5 5 5 5 5 
            . 5 5 5 . 
            . . 5 . . 
            `, center, 0, 0)
        bullet2.vx = speed * Math.cos(angle * Math.PI / 180)
        bullet2.vy = speed * Math.sin(angle * Math.PI / 180)
    }
}
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    isLeft = true
    isDown = false
    isRight = false
    isUp = false
})
let bullet2: Sprite = null
let len = 0
let dy = 0
let dx = 0
let bullet: Sprite = null
let Attack: Sprite = null
let targetTile: tiles.Location = null
let frontY = 0
let frontX = 0
let isTriggered = false
let isRight = false
let isLeft = false
let isDown = false
let isUp = false
let Enemy1: Sprite = null
let activePlayer: Sprite = null
let player2: Sprite = null
let player1: Sprite = null
let angle = 0
angle = 0
tiles.setCurrentTilemap(tilemap`级别`)
player1 = sprites.create(img`
    . . . . . . f f f f . . . . . . 
    . . . . f f f 2 2 f f f . . . . 
    . . . f f f 2 2 2 2 f f f . . . 
    . . f f f e e e e e e f f f . . 
    . . f f e 2 2 2 2 2 2 e e f . . 
    . . f e 2 f f f f f f 2 e f . . 
    . . f f f f e e e e f f f f . . 
    . f f e f b f 4 4 f b f e f f . 
    . f e e 4 1 f d d f 1 4 e e f . 
    . . f e e d d d d d d e e f . . 
    . . . f e e 4 4 4 4 e e f . . . 
    . . e 4 f 2 2 2 2 2 2 f 4 e . . 
    . . 4 d f 2 2 2 2 2 2 f d 4 . . 
    . . 4 4 f 4 4 5 5 4 4 f 4 4 . . 
    . . . . . f f f f f f . . . . . 
    . . . . . f f . . f f . . . . . 
    `, SpriteKind.Player)
player2 = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . b 5 5 b . . . 
    . . . . . . b b b b b b . . . . 
    . . . . . b b 5 5 5 5 5 b . . . 
    . b b b b b 5 5 5 5 5 5 5 b . . 
    . b d 5 b 5 5 5 5 5 5 5 5 b . . 
    . . b 5 5 b 5 d 1 f 5 d 4 f . . 
    . . b d 5 5 b 1 f f 5 4 4 c . . 
    b b d b 5 5 5 d f b 4 4 4 4 b . 
    b d d c d 5 5 b 5 4 4 4 4 4 4 b 
    c d d d c c b 5 5 5 5 5 5 5 b . 
    c b d d d d d 5 5 5 5 5 5 5 b . 
    . c d d d d d d 5 5 5 5 5 d b . 
    . . c b d d d d d 5 5 5 b b . . 
    . . . c c c c c c c c b b . . . 
    `, SpriteKind.Player)
activePlayer = player1
player1.setKind(SpriteKind.ActivePlayer)
player2.setScale(0.8, ScaleAnchor.Middle)
controller.moveSprite(activePlayer, 80, 80)
scene.cameraFollowSprite(activePlayer)
player2.follow(player1, 20)
Enemy1 = sprites.create(img`
    ........................
    ........................
    ........................
    ........................
    ..........ffff..........
    ........ff1111ff........
    .......fb111111bf.......
    .......f11111111f.......
    ......fd11111111df......
    ......fd11111111df......
    ......fddd1111dddf......
    ......fbdbfddfbdbf......
    ......fcdcf11fcdcf......
    .......fb111111bf.......
    ......fffcdb1bdffff.....
    ....fc111cbfbfc111cf....
    ....f1b1b1ffff1b1b1f....
    ....fbfbffffffbfbfbf....
    .........ffffff.........
    ...........fff..........
    ........................
    ........................
    ........................
    ........................
    `, SpriteKind.Enemy)
tiles.placeOnTile(Enemy1, tiles.getTileLocation(8, 8))
Enemy1.setVelocity(10, 15)
game.onUpdate(function () {
    if (isTriggered) {
    	
    } else {
        if (Enemy1.vy == 0) {
            Enemy1.setVelocity(10, 15)
        }
        EnemyPatrol(10, 10, Enemy1)
    }
})
game.onUpdateInterval(1000, function () {
    if (isTriggered) {
        shootHomingBullet(Enemy1, activePlayer, 10)
    }
})

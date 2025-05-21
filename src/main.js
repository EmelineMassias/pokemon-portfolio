import Phaser from 'phaser'
import IntroScene from './scenes/IntroScene.js'
import MenuScene from './scenes/MenuScene.js'
import NewGameScene from './scenes/NewGameScene'

const config = {
    type: Phaser.AUTO,
    width: 400,
    height: 300,
    pixelArt: true,
    scene: [IntroScene, MenuScene, NewGameScene],
    scale: {
        zoom: 2,
    }
}

new Phaser.Game(config)

import Phaser from 'phaser'
import IntroScene from './scenes/IntroScene.js'
import MenuScene from './scenes/MenuScene.js'
import NewGameScene from './scenes/NewGameScene'
import PlayerSetupScene from './scenes/PlayerSetupScene.js'
import GameScene from './scenes/GameScene.js'

const config = {
    type: Phaser.AUTO,
    width: 400,
    height: 300,
    parent: 'app',
    pixelArt: true,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false // ou true si tu veux voir les hitboxes
        }
    },
    scene: [IntroScene, MenuScene, NewGameScene, PlayerSetupScene, GameScene],
    scale: {
        zoom: 2,
    }, 
    dom: {
        createContainer: true 
    }
}

new Phaser.Game(config)

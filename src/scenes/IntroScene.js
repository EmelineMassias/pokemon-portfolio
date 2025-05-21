export default class IntroScene extends Phaser.Scene {
    constructor() {
        super('IntroScene')
    }

    preload() {
        this.load.audio('intro', 'menu-theme.mp3') // Ton petit son Game Boy
    }

    create() {
        // Écran noir
        this.cameras.main.setBackgroundColor('#000000')

        // Texte "DEV GIRL" au centre, invisible au début
        const title = this.add.text(200, 150, ' DEV GIRL ', {
            fontFamily: 'monospace',
            fontSize: '22px',
            color: '#ffffff'
        }).setOrigin(0.5).setAlpha(0)

        // Effet fade-in
        this.tweens.add({
            targets: title,
            alpha: 1,
            duration: 2500,
            ease: 'Power2'
        })

        // Lecture du son au bout de 800 ms
        this.time.delayedCall(800, () => {
            this.sound.play('intro', { volume: 0.6 })
        })

        // Transition vers MenuScene après 2,5 secondes
        this.time.delayedCall(2500, () => {
            this.scene.start('MenuScene')
        })
    }
}

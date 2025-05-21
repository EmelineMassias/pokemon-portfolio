export default class MenuScene extends Phaser.Scene {
    constructor() {
        super('MenuScene')
    }

    preload() {
        // Son de navigation (bip sur ↑ ↓)
        this.load.audio('move', 'move-sound.mp3')
        this.load.image('logo', 'logo-emeline2.png')
    }

    create() {
        this.options = ['Nouvelle Partie', 'Continuer', 'Crédits']
        this.currentOption = 0

        const logo = this.add.image(this.scale.width / 2, 60, 'logo')
            .setScale(0.22)
            .setOrigin(0.5)
            .setAlpha(0)

        this.tweens.add({
            targets: logo,
            alpha: 1,
            duration: 800
        })

        // Affichage des options avec effet fade-in
        this.optionTexts = this.options.map((text, index) => {
            const item = this.add.text(50, 100 + index * 30, text, {
                fontFamily: 'monospace',
                fontSize: '16px',
                color: index === this.currentOption ? '#00ff00' : '#ffffff'
            }).setAlpha(0)

            this.tweens.add({
                targets: item,
                alpha: 1,
                delay: 300 * index,
                duration: 600
            })

            return item
        })

        // Gestion des touches ↑ ↓ + son de navigation
        this.input.keyboard.on('keydown-UP', () => {
            this.sound.play('move', {volume: 0.3})
            this.changeOption(-1)
        })

        this.input.keyboard.on('keydown-DOWN', () => {
            this.sound.play('move', {volume: 0.3})
            this.changeOption(1)
        })

        this.input.keyboard.on('keydown-ENTER', () => this.selectOption())
    }

    changeOption(delta) {
        this.currentOption = Phaser.Math.Wrap(this.currentOption + delta, 0, this.options.length)
        this.optionTexts.forEach((text, index) => {
            text.setColor(index === this.currentOption ? '#00ff00' : '#ffffff')
        })
    }

    selectOption() {
        const selected = this.options[this.currentOption]

        if (selected === 'Nouvelle Partie') {
            this.scene.start('NewGameScene')
        } else {
            console.log(`Option sélectionnée : ${selected}`)
        }
    }
}

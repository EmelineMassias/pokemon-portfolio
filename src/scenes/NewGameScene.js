export default class NewGameScene extends Phaser.Scene {
    constructor() {
        super('NewGameScene')
    }

    preload() {
        // Portrait de Prof. Emix
        this.load.image('emix', 'prof-emix2.png')

        // Musique d’intro façon Pokémon départ
        this.load.audio('theme', 'adventure-theme.mp3')

        // Dialogue d’intro façon Pokémon
        this.dialogue = [
            "Bonjour jeune développeur !",
            "Je suis la Prof. Emix, et je vais te guider.",
            "Ce monde est rempli de projets passionnants !",
            "Prépare-toi à les explorer comme une vraie dresseuse de code.",
            "Appuie sur ESPACE pour commencer ton aventure."
        ]
    }

    create() {
        this.cameras.main.setBackgroundColor('#000000')

        // Musique d'aventure qui commence
        this.music = this.sound.add('theme', { loop: true, volume: 0.5 })
        this.music.play()

        // Affichage avec effet fade-in
        const width = this.cameras.main.width
        const emix = this.add.image(0, 0, 'emix')
            .setOrigin(0, 0)
            .setDisplaySize(width, 240)
            .setAlpha(0)

        this.tweens.add({
            targets: emix,
            alpha: 1,
            duration: 1000,
            ease: 'Power2'
        })

        // Boîte de dialogue
        this.dialogueBox = this.add.rectangle(200, 270, 360, 60, 0x222222)
            .setStrokeStyle(2, 0xffffff)
            .setOrigin(0.5)

        // Nom de la prof
        this.nameText = this.add.text(30, 245, 'PROF. EMIX', {
            fontFamily: 'monospace',
            fontSize: '14px',
            color: '#00ff00'
        })

        // Texte du dialogue
        this.textObject = this.add.text(30, 265, '', {
            fontFamily: 'monospace',
            fontSize: '14px',
            color: '#ffffff',
            wordWrap: { width: 340 }
        })

        this.dialogueIndex = 0
        this.isTyping = false

        this.typeText(this.dialogue[this.dialogueIndex])

        this.input.keyboard.on('keydown-SPACE', () => {
            if (!this.isTyping) {
                this.dialogueIndex++
                if (this.dialogueIndex < this.dialogue.length) {
                    this.typeText(this.dialogue[this.dialogueIndex])
                } else {
                    this.scene.start('PlayerSetupScene', {
                        music: this.music
                    })
                }
            }
        })
    }

    typeText(text) {
        this.isTyping = true
        this.textObject.setText('')
        let i = 0

        this.time.addEvent({
            delay: 40,
            repeat: text.length - 1,
            callback: () => {
                this.textObject.text += text[i]
                i++
                if (i === text.length) {
                    this.isTyping = false
                }
            }
        })
    }
}
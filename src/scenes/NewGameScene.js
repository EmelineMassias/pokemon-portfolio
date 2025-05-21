export default class NewGameScene extends Phaser.Scene {
    constructor() {
        super('NewGameScene')
    }

    preload() {
        // Chargement du portrait de Prof. Emix
        this.load.image('emix', 'prof-emix.png')

        // Dialogue d’intro façon Pokémon
        this.dialogue = [
            "Bonjour jeune développeuse !",
            "Je suis la Prof. Emix, et je vais te guider.",
            "Ce monde est rempli de projets passionnants !",
            "Prépare-toi à les explorer comme une vraie dresseuse de code.",
            "Appuie sur ESPACE pour commencer ton aventure."
        ]
    }

    create() {
        this.cameras.main.setBackgroundColor('#000000')

        this.add.rectangle(85, 150, 100, 200, 0x000000).setDepth(-1)

        this.add.image(85, 150, 'emix')
            .setScale(0.19)
            .setOrigin(0.5)

        this.dialogueIndex = 0
        this.isTyping = false

        // Boîte de dialogue (fond gris clair)
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

        this.typeText(this.dialogue[this.dialogueIndex])

        this.input.keyboard.on('keydown-SPACE', () => {
            if (!this.isTyping) {
                this.dialogueIndex++
                if (this.dialogueIndex < this.dialogue.length) {
                    this.typeText(this.dialogue[this.dialogueIndex])
                } else {
                    this.scene.start('GameScene')
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

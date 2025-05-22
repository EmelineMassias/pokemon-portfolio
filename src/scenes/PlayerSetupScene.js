export default class PlayerSetupScene extends Phaser.Scene {
    constructor() {
        super('PlayerSetupScene')
    }

    init(data) {
        this.music = data.music
    }

    preload() {
        this.load.image('avatar1', 'avatar1.png')
        this.load.image('avatar2', 'avatar2.png')
    }

    create() {
        this.cameras.main.setBackgroundColor('#000000')
        console.log('🧪 PlayerSetupScene prête')

        this.dialogueBox = this.add.rectangle(200, 270, 360, 60, 0x222222)
            .setStrokeStyle(2, 0xffffff)
            .setOrigin(0.5)

        this.nameText = this.add.text(30, 245, 'PROF. EMIX', {
            fontFamily: 'monospace',
            fontSize: '14px',
            color: '#00ff00'
        })

        this.dialogueText = this.add.text(30, 265, "Tout d'abord... Qui es-tu ?", {
            fontFamily: 'monospace',
            fontSize: '14px',
            color: '#ffffff',
            wordWrap: { width: 340 }
        })

        this.nameInput = this.add.dom(200, 100, 'input',
            'width: 180px; height: 20px; font-size: 14px; background: transparent; color: white; border: 1px solid white;',
            ''
        )
        this.nameInput.setOrigin(0.5)
        this.nameInput.setPerspective(800)
        this.nameInput.node.setAttribute('placeholder', 'Entre ton prénom...')

        this.selectedAvatar = 'avatar1'

        const avatar2 = this.add.image(260, 160, 'avatar2')
            .setDisplaySize(64, 64)
            .setAlpha(0.5)
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => {
                console.log('Avatar 2 cliqué')
                this.selectAvatar('avatar2', avatar2, avatar1)
            })

        const avatar1 = this.add.image(140, 160, 'avatar1')
            .setDisplaySize(64, 64)
            .setAlpha(1)
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => {
                console.log('Avatar 1 cliqué')
                this.selectAvatar('avatar1', avatar1, avatar2)
            })

        const startButton = this.add.text(200, 220, 'Commencer l\'aventure !', {
            fontFamily: 'monospace',
            fontSize: '14px',
            backgroundColor: '#00ff00',
            color: '#000000',
            padding: { x: 10, y: 5 },
            align: 'center'
        })
            .setOrigin(0.5)
            .setInteractive()
            .on('pointerdown', () => this.startGame())
    }

    selectAvatar(key, selected, other) {
        this.selectedAvatar = key
        selected.setAlpha(1)
        other.setAlpha(0.5)
    }

    startGame() {
        if (!this.nameInput || !this.nameInput.node) {
            console.warn('Champ prénom introuvable !')
            return
        }

        const playerName = this.nameInput.node.value.trim()
        console.log('⏳ startGame() appelé, prénom =', playerName)

        if (playerName === '') return

        this.nameInput.destroy()

        this.scene.start('GameScene', {
            playerName: playerName,
            avatar: this.selectedAvatar
        })
    }
}

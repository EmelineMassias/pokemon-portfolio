export default class GameScene extends Phaser.Scene {
    constructor() {
        super('GameScene')
        this.sceneCreated = false
    }

    init(data) {
        this.music = data.music
        this.playerName = data.playerName || 'Joueur'
        this.avatarKey = data.avatar || 'avatar1'
    }

    preload() {
        this.load.tilemapTiledJSON('map', 'tilemap_pastel_FULLY_EMBEDDED.json')
        this.load.image('tileset_pastel', 'tileset_pastel.png')
        this.load.image('avatar1', 'avatar1.png')
        this.load.image('avatar2', 'avatar2.png')

        this.load.once('complete', () => {
            console.log('✅ Ressources chargées')
            this.createScene()
        })

        this.load.start()
    }

    create() {
        // vide
    }

    createScene() {
        const map = this.make.tilemap({ key: 'map' })
        const tileset = map.addTilesetImage('tileset_pastel')
        const ground = map.createLayer('Ground', tileset, 0, 0)

        if (!tileset || !ground) {
            console.error('❌ Tileset ou layer manquant')
            return
        }

        if (!this.textures.exists(this.avatarKey)) {
            console.warn(`⚠️ Avatar "${this.avatarKey}" non trouvé. Remplacement par "avatar1"`)
            this.avatarKey = 'avatar1'
        }

        const availableAvatars = ['avatar1', 'avatar2']

        if (!this.textures.exists(this.avatarKey)) {
            console.warn(`⚠️ Avatar "${this.avatarKey}" introuvable. Utilisation de "avatar1" à la place`)
            this.avatarKey = 'avatar1'
        }

        this.player = this.physics.add.sprite(80, 80, this.avatarKey)
        this.player.setScale(0.2)
        this.player.setCollideWorldBounds(true)

        this.nameText = this.add.text(0, 0, this.playerName, {
            fontFamily: 'monospace',
            fontSize: '12px',
            color: '#fff',
            backgroundColor: '#000'
        }).setOrigin(0.5, 1)

        this.cameras.main.startFollow(this.player)
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels)

        this.cursors = this.input.keyboard.createCursorKeys()
        this.sceneCreated = true
    }

    update() {
        if (!this.sceneCreated || !this.player) return

        const speed = 100
        this.player.setVelocity(0)

        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-speed)
        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(speed)
        }

        if (this.cursors.up.isDown) {
            this.player.setVelocityY(-speed)
        } else if (this.cursors.down.isDown) {
            this.player.setVelocityY(speed)
        }

        this.nameText.setPosition(this.player.x, this.player.y - 20)
    }
}
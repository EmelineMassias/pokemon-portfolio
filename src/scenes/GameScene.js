export default class GameScene extends Phaser.Scene {
    constructor() {
        super('GameScene')
    }

    init(data) {
        this.music = data.music
        this.playerName = data.playerName || 'Joueur'
        this.avatarKey = data.avatar || 'avatar1'
    }

    preload() {
        this.load.image('tileset_pastel', 'tileset_pastel.png')
        this.load.tilemapTiledJSON('map', 'tilemap_pastel_embedded.json')

        // Charger les avatars si besoin
        this.load.image('avatar1', 'avatar1.png')
        this.load.image('avatar2', 'avatar2.png')
    }

    create() {
        const map = this.make.tilemap({ key: 'map' })
        console.log('🧩 Map chargée ?', map)
        console.log('📦 Tilesets ?', map.tilesets)
        console.log('🧱 Layer names :', map.layers.map(l => l.name))

        const tileset = map.tilesets[0]
        if (!tileset) {
            console.error('❌ Tileset non trouvé')
            return
        }

        const ground = map.createLayer('Ground', tileset, 0, 0)

        // Création du joueur
        this.player = this.physics.add.sprite(80, 80, this.avatarKey)
        this.player.setCollideWorldBounds(true)

        // Ajout du nom du joueur au-dessus
        this.nameText = this.add.text(0, 0, this.playerName, {
            fontFamily: 'monospace',
            fontSize: '12px',
            color: '#ffffff',
            backgroundColor: '#000000'
        }).setOrigin(0.5, 1)

        // Caméra centrée sur le joueur
        this.cameras.main.startFollow(this.player)
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels)

        // Contrôles
        this.cursors = this.input.keyboard.createCursorKeys()
    }

    update() {
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

        // Position du nom
        this.nameText.setPosition(this.player.x, this.player.y - 20)
    }
}

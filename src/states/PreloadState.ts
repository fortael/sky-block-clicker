export default class PreloadState extends Phaser.State {

    private asset: Phaser.Sprite;

    constructor() {
        super();

    }

    preload() {
        this.asset = this.add.sprite(this.game.width * 0.5 - 110, this.game.height * 0.5 - 10, 'preloader');
        this.load.setPreloadSprite(this.asset);
    }

    update() {
        this.game.state.start('game');
    }
}

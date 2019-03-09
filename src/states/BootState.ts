import Main from "../main";

export default class BootState extends Phaser.State {

    public game: Main;

    constructor() {
        super();
    }

    public preload() {
        this.load.image("preloader", "assets/preloader.gif");

        this.load.image("sky", "assets/sky.jpg");
        this.load.image("star", "assets/start.png");

        this.load.spritesheet("sheet", "assets/blocks/blocks.png", 16, 16);

        this.prepareWorld();
    }

    public makeScreen() {
        this.game.input.maxPointers = 1;

        // setup device scaling
        if (this.game.device.desktop) {
            this.game.scale.pageAlignHorizontally = true;
        } else {
            this.game.scale.pageAlignHorizontally = true;
        }
    }

    /**
     * Мир всегда статично одного размера, независимо от экрана
     * Если экран меньше, то можно перемещать камеру
     */
    public prepareWorld() {
        let dx;
        let dy;

        this.stage.backgroundColor = "#000a14";
        this.world.setBounds(0, 0, 4096, 4096);

        dy = this.game.height / 2 - this.world.height / 2;
        dx = this.game.width / 2 - this.world.width / 2;

        if (dy < 0) { dy = 0; }
        if (dx < 0) { dx = 0; }
        // if (dx < 0) dx = (this.world.width - this.game.width) * 2;

        this.world.bounds.offset(dx, dy);
    }

    public create() {
        this.makeScreen();

        this.game.state.start("preloader");
    }
}

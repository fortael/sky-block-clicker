
import Main from "../main";
import Toolbar from "../utils/toolbar";

export default class BootState extends Phaser.State {

    public game: Main;

    constructor() {
        super();
    }

    preload() {
        this.load.image('preloader', 'assets/preloader.gif');

        this.load.image('sky', 'assets/sky.jpg');
        this.load.image('button', 'assets/button.png');
        this.load.image('ship', 'assets/ship.png');
        this.load.image('crystal', 'assets/crystal.png');
        this.load.image('sun', `assets/planets/sun.png`);

        this.load.image('star', `assets/start.png`);


        this.load.image('lava', `assets/blocks/lava.gif`);
        this.load.image('water', `assets/blocks/water.gif`);

        this.load.spritesheet('sheet', 'assets/blocks/blocks.png', 16, 16);

        // PlanetsArray.forEach((item) => {
        //     this.load.image(`planet.${item.type}`, item.texture);
        // });

        let ships = <any>{
            'ship.miner': 'assets/ships/miner.png'
        };

        for (let item in ships) {
            if (ships.hasOwnProperty(item)) this.load.image(item, ships[item]);
        }
        // Object.keys().forEach((item) => {
        //     this.load.image(`ship.${item}`, item.texture);
        // });

        // Object.keys(ShipsScope).forEach((item) => {
        //     console.log(item);
        // this.load.image(`ship.${ShipsScope[item].name}`, ShipsScope[item].texture);
        // });

        this.prepareWorld();
    }


    makeScreen() {
        this.game.input.maxPointers = 1;

        //setup device scaling
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
    prepareWorld() {
        let dx, dy;

        this.stage.backgroundColor = "#000a14";
        this.world.setBounds(0, 0, 4096, 4096);

        dy = this.game.height / 2 - this.world.height / 2;
        dx = this.game.width / 2 - this.world.width / 2;

        if (dy < 0) dy = 0;
        if (dx < 0) dx = 0;
        // if (dx < 0) dx = (this.world.width - this.game.width) * 2;

        this.world.bounds.offset(dx, dy);
    }

    create() {
        this.makeScreen();

        this.game.state.start('preloader');
    }
}

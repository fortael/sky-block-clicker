import Helpers from "../helpers";
import Main from "../main";
import config from "../config";
import {TilesGroup} from "../utils/phaser";

export class Block extends Phaser.Sprite {

    game: Main;

    claimed: boolean = false;
    readonly speed: number;
    theta: number;

    hover: Phaser.Graphics = null;
    ships: Array<Phaser.Sprite> = [];

    resources: Array<any>;
    resourcesGroup: TilesGroup;

    public fromSun: number;

    constructor(game: Main, scope: any, orbit: number = 0) {
        super(game, game.world.centerX, game.world.centerY, `planet.${scope.type}`);

        this.anchor.set(.5, .5);
        this.smoothed = false;
        this.inputEnabled = true;
        this.height = this.width = Helpers.randomSquare(scope.size[0], scope.size[1]);

        if (scope.tint !== null && scope.tint.length > 0) {
            this.tint = game.rnd.pick(scope.tint);
        }

        //sun radius = width / 2
        this.fromSun = config.SunSize / 2 / this.game.resolution + 10;
        this.fromSun += orbit;

        this.theta = Helpers.randomFloat(1, Math.PI * 2);
        this.speed = Helpers.randomFloat(0.001, 0.035);

        game.add.existing(this);

        // this.events.onInputDown.add(this.onClick, this);
        // this.events.onInputOver.add(this.onHover, this);
        // this.events.onInputOut.add(this.onHoverOut, this);

        this.resources = <any>[
            {name: 'plasma', amount: 3, sprite: 'planet.plasma'},
            {name: 'crystal', amount: 1, sprite: 'planet.crystal'},
        ];

        this.game.tick.add(() => {
            // this.animate();
            // if (this.ships.length > 0) {
            //     this.game.global.stats.crystals.value += 0.5 * this.ships.length;
            // }
        });
    }
}

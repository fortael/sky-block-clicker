import Helpers from "../helpers";
import Main from "../main";
import config from "../config";
import { TilesGroup } from "../utils/phaser";

interface PlanetInterface {
    claimed: boolean,
    fromSun: number,
    theta: number,
    speed: number,
}

export interface PlanetMetaInterface {
    type: string,
    size: Array<number>,
    orbit: Array<number>,
    tint: Array<number>,
    amount: Array<number> | number,
    resources: Object,
    texture: string
}


export class Planet extends Phaser.Sprite implements PlanetInterface {

    game: Main;

    claimed: boolean = false;
    readonly speed: number;
    theta: number;

    hover: Phaser.Graphics = null;
    ships: Array<Phaser.Sprite> = [];

    resources: Array<any>;
    resourcesGroup: TilesGroup;

    public fromSun: number;

    constructor(game: Main, scope: PlanetMetaInterface, orbit: number = 0) {
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

        this.events.onInputDown.add(this.onClick, this);
        this.events.onInputOver.add(this.onHover, this);
        this.events.onInputOut.add(this.onHoverOut, this);

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

    private _prepareResources(scope: PlanetMetaInterface) {

    }


    update() {
        this.animate()
    }

    private _drawResources() {
        this.resourcesGroup = new TilesGroup(this.game, null, 'planet', false);

        this.resources.forEach((item: any) => {
            this.resourcesGroup.addChild(
                this.game.drawTextWithIcon(item.sprite, item.amount + '', 8, 1)
            );
        }, this);

        this.resourcesGroup.addChild(
            this.game.drawTextWithIcon('planet.plasma', this.fromSun + '', 8, 1)
        );

        this.resourcesGroup.placeOneByOne(this.game, 1);

        this.game.add.existing(this.resourcesGroup);
    }

    onClick(sprite: Phaser.Sprite, some: any) {
        this.onHoverOut();

        if (this.game.draggable !== null) {
            // this.game.dropIt();

            let satellite = this.game.cloneSprite(this.game.draggable);

            this.game.draggable.destroy();
            this.game.draggable = null;

            satellite.width /= 3;
            satellite.height /= 3;

            this.ships.push(satellite);
            this._drawResources();

            this.claimed = true;
        } else {
            this.game.zoomIn();
            this.game.camera.follow(sprite);
        }
    }

    onHover(sprite: Phaser.Sprite) {
        this.hover = this.game.add.graphics(sprite.position.x, sprite.position.y);

        this.hover.lineStyle(2, 0xffffff);
        this.hover.drawCircle(0, 0, this.height / this.game.resolution + 2);
    }

    onHoverOut() {
        this.hover !== null ? this.hover.destroy() : null;
        this.hover = null;
    }

    animate() {
        let res = this.game.resolution;
        // if (this.claimed) {
        //     this.game.global.crystals += 0.1;
        //     this.game.global.stats.crystals.setText(Math.round(this.game.global.crystals))
        // }
        //

        // console.log(this.pivot.score);


        // if (this.angle >= 360) this.angle = 1;

        if (this.hover != null) {
            this.hover.position.copyFrom(this.position);
        }

        if (this.ships.length > 0) {
            this.ships.forEach((item) => {
                item.position.x = this.position.x;
                item.position.y = this.position.y - this.height / 2 / res;
            });
        }

        // if (this.resources.length > 0) {

        // this.resourcesGroup.alignTo(this, 0, this.width, this.height);
        // console.log(this.resourcesGroup.width / res);

        if (this.claimed) {
            this.resourcesGroup.position.x = this.centerX - (this.resourcesGroup.totalWidth / 2);
            this.resourcesGroup.position.y = this.centerY - (this.resourcesGroup.height / 2 / res) + this.height / 2;
        }


        // console.log(res)
        // this.text.position.copyFrom(this.position);
        // }

        this.position.x = this.fromSun * Math.cos(this.theta) + this.game.world.centerX;
        this.position.y = this.fromSun * Math.sin(this.theta) + this.game.world.centerY;

        this.theta += 0.1 * this.speed;

        if (this.theta >= 2 * Math.PI) {
            this.theta = 0;
        }

        // this.angle += 0.01;
    }
}

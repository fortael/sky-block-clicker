import BootState from "./states/BootState";
import GameState from "./states/GameState";
import PreloadState from "./states/PreloadState";
import Store from "./store";
import { TilesGroup } from "./utils/TileGroup";

interface GameScoreInterface {
    value: number;
    text: Phaser.Text;
    sprite: Phaser.Sprite;
}

export default class Main extends Phaser.Game {

    public draggable: Phaser.Sprite = null;
    public ui: Phaser.Group;
    public store: Store;

    public tick: Phaser.Signal;

    public toCloseToSun: number = 0;

    public global: any = {
        stats: {
            cobblestone: {} as GameScoreInterface,
        },
    };

    constructor() {
        super(window.innerWidth, window.innerHeight, Phaser.AUTO, null, null, null, true);
    }

    public boot(): void {
        super.boot();

        this.scale.scaleMode = Phaser.ScaleManager.RESIZE;

        this.state.add("boot", BootState, false);
        this.state.add("preloader", PreloadState, false);
        this.state.add("game", GameState, false);

        this.ui = this.add.group(null, "ui", true);

        this.store = new Store();
        this.tick = new Phaser.Signal();
        this.state.start("boot");
    }

    public makeText(text: string, group?: Phaser.Group | Phaser.Stage | Phaser.Stage, fontSize: number = 25) {
        const tmp: Phaser.Text = this.add.text(0, 0, text, {
            font: "Arial",
            fontSize,
            fill: "#ffffff",
            align: "left",
            stroke: "#000000",
            strokeThickness: 2,
        }, group);

        tmp.resolution = window.devicePixelRatio;

        return tmp;
    }

    public drawTextWithIcon(texture: string, text: string, size: number = 20, padding: number = 0): TilesGroup {
        let sprite: Phaser.Sprite;
        let textSprite: Phaser.Text;
        const fontSize = size;
        const group = new TilesGroup(this, this.stage);

        sprite = this.add.sprite(0, 0, texture, null, group);
        sprite.width = fontSize * this.resolution;
        sprite.height = fontSize * this.resolution;
        sprite.position.y += 2 / (this.resolution) * this.resolution;

        textSprite = this.add.text(sprite.position.x + padding + sprite.width / this.resolution, 0, text, {
            font: "Arial",
            fontSize,
            fill: "#ffffff",
            align: "center",
            stroke: "#000000",
            strokeThickness: 2,
        }, group);

        group.totalWidth = sprite.width / this.resolution + textSprite.width + padding;

        return group;
    }

    public spriteEmitter(sprite: Phaser.Sprite, size: number, maxSize: number = 1, colors: number[] = null): Phaser.Particles.Arcade.Emitter {
        const particles = 4000 / this.resolution;
        const emitter = this.add.emitter(this.world.centerX, this.world.centerY, particles);

        emitter.makeParticles("star");

        emitter.setRotation(0, 10);
        emitter.setXSpeed(1, 1);
        emitter.setYSpeed(1, 1);
        emitter.setScale(1, maxSize, 1, maxSize, 1000, Phaser.Easing.Circular.InOut);
        emitter.gravity.set(0);

        if (colors !== null && colors.length > 0) {
            emitter.forEach((particle: Phaser.Particle) => {
                particle.tint = this.rnd.pick(colors);
            }, this);
        }

        emitter.width = size;
        emitter.height = size;

        return emitter.start(false, 1000, 100, 0);
    }

    public pickUp(sprite: Phaser.Sprite): void {
        this.draggable = this.cloneSprite(sprite);
        // this.zoomOut();
        this.moveDraggable();
    }

    public dropIt(): void {
        if (this.draggable !== null) {
            this.draggable.destroy();
            this.draggable = null;
        }
    }

    public cloneSprite(sprite: Phaser.Sprite): Phaser.Sprite {
        const tmp = this.add.sprite(sprite.position.x, sprite.position.y, sprite.texture);

        tmp.height = sprite.height;
        tmp.width = sprite.width;
        tmp.anchor.set(.5, .5);
        tmp.tint = sprite.tint;

        return tmp;
    }

    public moveDraggable() {
        this.draggable.position.x = this.input.activePointer.worldX + this.draggable.width / 2 + 5;
        this.draggable.position.y = this.input.activePointer.worldY + this.draggable.height / 2 + 5;
    }

    public update(time: number): void {
        super.update(time);

        if (this.draggable !== null) {
            this.moveDraggable();
        }

        if (this.input.activePointer.rightButton.isDown) {
            this.dropIt();
            this.camera.unfollow();
            // this.zoomOut();
        }
    }
}

new Main();

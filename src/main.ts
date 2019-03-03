import BootState from './states/BootState'
import PreloadState from './states/PreloadState'
import GameState from './states/GameState'
import Toolbar from "./utils/toolbar";
import { TilesGroup } from "./utils/phaser";

interface GameScoreInterface {
    value: number,
    text: Phaser.Text,
}

export default class Main extends Phaser.Game {

    public draggable: Phaser.Sprite = null;
    public ui: Phaser.Group;
    public toolbar: Toolbar;
    public speed: number = 1;
    public tick: Phaser.Signal;

    public toCloseToSun: number = 0;

    public global: any = {
        stats: {
            cobblestone: <GameScoreInterface>{}
        }
    };

    constructor() {
        super(window.innerWidth, window.innerHeight, Phaser.AUTO, null, null, null, true);

        this.state.add('boot', BootState, false);
        this.state.add('preloader', PreloadState, false);
        this.state.add('game', GameState, false);

        this.tick = new Phaser.Signal();

        this.state.start('boot');
    }

    public makeText(text: string, group?: Phaser.Group | Phaser.Stage | Phaser.Stage, fontSize: number = 25) {
        let tmp: Phaser.Text = this.add.text(0, 0, text, {
            font: 'Arial',
            fontSize: fontSize,
            fill: '#ffffff',
            align: 'left',
            stroke: '#000000',
            strokeThickness: 2,
        }, group);

        tmp.resolution = window.devicePixelRatio;

        return tmp;
    }

    drawTextWithIcon(texture: string, text: string, size: number = 20, padding: number = 0): TilesGroup {
        let sprite: Phaser.Sprite;
        let textSprite: Phaser.Text;
        let fontSize = size;
        let group = new TilesGroup(this, this.stage);

        sprite = this.add.sprite(0, 0, texture, null, group);
        sprite.width = fontSize * this.resolution;
        sprite.height = fontSize * this.resolution;
        sprite.position.y += 2 / (this.resolution) * this.resolution;

        textSprite = this.add.text(sprite.position.x + padding + sprite.width / this.resolution, 0, text, {
            font: 'Arial',
            fontSize: fontSize,
            fill: '#ffffff',
            align: 'center',
            stroke: '#000000',
            strokeThickness: 2,
        }, group);


        group.totalWidth = sprite.width / this.resolution + textSprite.width + padding;

        return group;
    }

    spriteBorder(sprite: Phaser.Sprite | Phaser.Text, group?: Phaser.Group | Phaser.Stage): Phaser.Graphics {
        let border = this.add.graphics(sprite.position.x, sprite.position.y, group);


        border.lineStyle(1, 0xffffff);
        border.drawRect(0, 0, sprite.width, sprite.height);

        // if (sprite instanceof Phaser.Sprite) {
        //     border.lineStyle(1, 0xff0000)
        //     border.drawRect(0, 0, sprite.width / this.resolution, sprite.height / this.resolution);
        // }

        return border;
    }

    spriteEmitter(sprite: Phaser.Sprite, size: number, maxSize: number = 1, colors: Array<number> = null): Phaser.Particles.Arcade.Emitter {
        let particles = 4000 / this.resolution;
        let emitter = this.add.emitter(this.world.centerX, this.world.centerY, particles);

        emitter.makeParticles('star');

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
        this.zoomOut();
        this.moveDraggable();
    }

    public dropIt(): void {
        if (this.draggable !== null) {
            this.draggable.destroy();
            this.draggable = null;
        }
    }

    public zoomIn() {
        this.camera.scale.x = 3;
        this.camera.scale.y = 3;

        this.centerCamera();
    }

    public zoomOut() {
        this.camera.scale.x = 1;
        this.camera.scale.y = 1;

        this.camera.unfollow();
        this.centerCamera();
    }

    public centerCamera() {
        this.world.camera.focusOnXY(this.world.bounds.width / 2, this.world.bounds.height / 2);
    }

    public nextByNext(group: TilesGroup, padding: number = 0): TilesGroup {
        let prev: Phaser.Sprite | TilesGroup = null;
        let spriteWidth = 0;
        let total = 0;

        padding /= this.resolution;


        group.forEach((sprite: Phaser.Sprite | Phaser.Text | TilesGroup) => {

            if (!(sprite instanceof TilesGroup)) {
                sprite.anchor.set(0, 0);
            }

            spriteWidth = sprite instanceof TilesGroup
                ? sprite.totalWidth
                : sprite.width;

            if (prev === null) {
                sprite.position.x = 0;
                total = spriteWidth - 1;
            } else {
                sprite.position.x = (total) + padding;
                // sprite.position.x += Math.round(sprite.position.x) - sprite.position.x;
                total += padding + spriteWidth - 1;
            }

            prev = sprite;
        }, this);

        group.totalWidth = total;

        return group;
    }

    public cloneSprite(sprite: Phaser.Sprite): Phaser.Sprite {
        let tmp = this.add.sprite(sprite.position.x, sprite.position.y, sprite.texture);

        tmp.height = sprite.height;
        tmp.width = sprite.width;
        tmp.anchor.set(.5, .5);
        tmp.tint = sprite.tint;

        return tmp;
    }

    moveDraggable() {
        this.draggable.position.x = this.input.activePointer.worldX + this.draggable.width / 2 + 5;
        this.draggable.position.y = this.input.activePointer.worldY + this.draggable.height / 2 + 5;
    }

    update(time: number): void {
        super.update(time);

        if (this.draggable !== null) {
            this.moveDraggable();
        }

        if (this.input.activePointer.rightButton.isDown) {
            this.dropIt();
            this.camera.unfollow();
            this.zoomOut();
        }
    }
}

new Main();

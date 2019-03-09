import BootState from "./states/BootState";
import GameState from "./states/GameState";
import PreloadState from "./states/PreloadState";
import Store from "./store";

export default class Main extends Phaser.Game {

    public ui: Phaser.Group;
    public store: Store;

    public tick: Phaser.Signal;

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

    // todo: вынести в EffectHook
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

    public update(time: number): void {
        super.update(time);

        if (this.input.activePointer.rightButton.isDown) {
            this.camera.unfollow();
        }
    }
}

new Main();

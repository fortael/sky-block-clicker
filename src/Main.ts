import "reflect-metadata";

import { Container, Inject, Service } from "typedi";
import BootState from "./states/BootState";
import GameState from "./states/GameState";

import PreloadState from "./states/PreloadState";
import Store from "./Store";
import ToolbarUi from "./ui/ToolbarUi";
import World from "./World";

// @Service("Main", ())
// Container.set("Main", new Main(window.innerWidth, window.innerHeight, Phaser.AUTO, null, null, null, true));

@Service()
export default class Main extends Phaser.Game {

    // @Inject(() => World)
    // public world: World;

    public ui: Phaser.Group;
    public tick: Phaser.Signal;

    public store: Store;
    public showFps = true;

    public boot(): void {
        super.boot();

        this.time.advancedTiming = true;

        this.scale.scaleMode = Phaser.ScaleManager.RESIZE;
        this.ui = this.add.group(null, "ui", true);

        this.state.add("boot", BootState, false);
        this.state.add("preloader", PreloadState, false);
        this.state.add("game", GameState, false);

        this.store = new Store();
        this.tick = new Phaser.Signal();

        this.register();
        this.store.loadFromStore();

        this.state.start("boot");
    }

    public register() {
        // Container.set(World, this.world);
        Container.set(ToolbarUi, new ToolbarUi(this, this.ui, "toolbar"));
    }

    public makeText(text: string, group?: Phaser.Group | Phaser.Stage | Phaser.Stage, fontSize: number = 25) {
        const tmp: Phaser.Text = this.add.text(0, 0, text, {
            align: "left",
            fill: "#ffffff",
            font: "Arial",
            fontSize,
            stroke: "#000000",
            strokeThickness: 2,
        }, group);

        tmp.resolution = window.devicePixelRatio;

        return tmp;
    }

    public update(time: number): void {
        super.update(time);

        const game  = this;

        if (this.showFps) {
            game.debug.text("FPS: " + game.time.fps || "FPS: --", 40, 40, "#00ff00");
        }

        if (this.input.activePointer.rightButton.isDown) {
            //
        }
    }
}

Container.set(Main, new Main(window.innerWidth, window.innerHeight, Phaser.AUTO, null, null, null, true));
Container.get(Main);

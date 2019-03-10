import Main from "../Main";

import { Container } from "typedi";
import CameraComponent from "../components/CameraComponent";
import WorldEffects from "../components/EffectsComponent";
import EffectsComponent from "../components/EffectsComponent";
import StructuresComponent, { BLOCK_CHEST, BLOCK_COBBLESTONE } from "../components/StructuresComponent";
import MainTreeStructure from "../entities/structures/MainTreeStructure";
import ToolbarUi from "../ui/ToolbarUi";
import MainCookieStructure from "../entities/structures/MainCookieStructure";

let moveUp: Phaser.Key,
    moveLeft: Phaser.Key,
    moveRight: Phaser.Key,
    moveDown: Phaser.Key,
    center: Phaser.Key,
    shift: Phaser.Key;
let zoomIn: Phaser.Key, zoomOut: Phaser.Key;

class GameState extends Phaser.State {

    public StructuresHook: StructuresComponent;
    public EffectsHook: WorldEffects;
    public ToolbarUi: ToolbarUi;

    public game: Main;

    public preload() {
        this.EffectsHook = Container.get(EffectsComponent);
        this.StructuresHook = Container.get(StructuresComponent);
        this.ToolbarUi = Container.get(ToolbarUi);
        this.ToolbarUi.make();
    }

    public create() {
        const game = this.game;

        Container.get(CameraComponent).centerCamera();

        // this.ToolbarUi.make();

        this.EffectsHook
            .drawBackgroundGradient()
            .drawBorders();

        this.StructuresHook
            .spawnBaseLevel()
            .spawnIsland1();

        // const coreds = StructuresComponent.getCordsByXY(30, 32);
        // const cookie = new MainCookieBlock(game, BLOCK_COBBLESTONE, coreds.x, coreds.y);

        // game.add.tween(new MainCookieBlock(game, BLOCK_COBBLESTONE, coreds.x, coreds.y));
        // this.game.create.
        // cookie.onHover();

        const structures = [
            new MainCookieStructure(game, 32, 30),
        ];

        //todo: Починить сундук и дерево

        // Container.get(MainTreeStructure).on(35, 32).make();

        // new SaveChestBlock(game, this.StructuresHook.makeTile(BLOCK_CHEST, 37, 32));

        // this.EffectsComponent.debugGrid(true);
        // this.EffectsComponent.particlesEmitter();

        moveUp = game.input.keyboard.addKey(Phaser.Keyboard.W);
        moveDown = game.input.keyboard.addKey(Phaser.Keyboard.S);
        moveLeft = game.input.keyboard.addKey(Phaser.Keyboard.A);
        moveRight = game.input.keyboard.addKey(Phaser.Keyboard.D);
        shift = game.input.keyboard.addKey(Phaser.Keyboard.SHIFT);
        center = game.input.keyboard.addKey(Phaser.Keyboard.C);

        zoomIn = game.input.keyboard.addKey(Phaser.Keyboard.UP);
        zoomOut = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);

        this.game.tick.active = true;
        this.game.time.events.repeat(Phaser.Timer.SECOND / 10, Infinity, () => {
            this.game.tick.dispatch();
            this.updateStat();
        }, this);
    }

    // todo: вынести в CameraComponent
    public update(game: Main) {
        // this.game.debug.cameraInfo(this.camera, 100, 100);
        // this.game.debug.text(this.game.time.fps, 20, 20);

        const moveStep = shift.isDown ? 30 : 10;
        const zoomStep = 0.05;

        if (center.isDown) {
            Container.get(CameraComponent).centerCamera();
        }

        if (moveDown.isDown) {
            this.camera.y += moveStep;
        }
        if (moveUp.isDown) {
            this.camera.y -= moveStep;
        }
        if (moveLeft.isDown) {
            this.camera.x -= moveStep;
        }
        if (moveRight.isDown) {
            this.camera.x += moveStep;
        }

        // this.Planets.forEach((item) => {
        //     item.animate()
        // });
    }

    public updateStat() {
        this.ToolbarUi.render();
        // console.log(1);
    }

    public pause() {
        this.game.state.start("menu");
    }
}

export default GameState;

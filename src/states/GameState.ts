import { PlanetsArray } from "../data/Blocks";
import Main from "../main";
import { AbstractPlanet } from "../planets/AbstractPlanet";

import StructuresHook from "../hooks/StructuresHook";
import WorldEffects from "../hooks/EffectsHook";
import Camera from "../hooks/CameraHook";
import MainCookieStructure from "../structures/MainCookieStructure";
import MainTreeGroup from "../structures/GroupStructures/MainTreeGroup";

let moveUp: Phaser.Key, moveLeft: Phaser.Key, moveRight: Phaser.Key, moveDown: Phaser.Key;
let zoomIn: Phaser.Key, zoomOut: Phaser.Key;
let panel: Phaser.Group;

class GameState extends Phaser.State {

    public StructuresHook: StructuresHook;
    public EffectsHook: WorldEffects;
    public CameraHook: Camera;

    public game: Main;

    preload() {
        const { game, world } = this;

        game.time.advancedTiming = true;

        this.StructuresHook = new StructuresHook(game, world);
        this.EffectsHook = new WorldEffects(game, world);
        this.CameraHook = new Camera(game, world);
    }

    create() {
        let game = this.game;

        this.CameraHook.centerCamera();
        this.EffectsHook.drawBackgroundGradient();
        this.EffectsHook.drawBorders();

        this.StructuresHook
            .spawnBaseLevel()
            .spawnIsland1();

        const cookie = new MainCookieStructure(game, this.StructuresHook.spawnMainCookie());

        new MainTreeGroup(game, this.StructuresHook, 36, 32);
        // const tree = new MainCookieStructure(game, this.StructuresHook.spawnMainTree());

        cookie.onHover();
        // this.EffectsHook.debugGrid(true);
        // this.EffectsHook.particlesEmitter();

        moveUp = game.input.keyboard.addKey(Phaser.Keyboard.W);
        moveDown = game.input.keyboard.addKey(Phaser.Keyboard.S);
        moveLeft = game.input.keyboard.addKey(Phaser.Keyboard.A);
        moveRight = game.input.keyboard.addKey(Phaser.Keyboard.D);

        zoomIn = game.input.keyboard.addKey(Phaser.Keyboard.UP);
        zoomOut = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);

        // this.Planets = WorldGen.SpawnPlanets(game);
        // this.Sun = new Sun(this.game);


        // new AbstractPlanet(game);


        // let radius = this.Sun.width / game.resolution;

        // this.game.toCloseToSun = radius + (200);

        // let border = this.add.graphics(this.Sun.position.x, this.Sun.position.y);
        //
        // border.beginFill(0xff0000, .3);
        // border.drawCircle(0, 0, radius + (400 / this.game.resolution));

        // let border2 = this.add.graphics(this.Sun.position.x, this.Sun.position.y);
        //
        // border2.beginFill(0xff0000, .3);
        // border2.drawCircle(0, 0, radius + (230 / this.game.resolution));

        this.game.toolbar.render();

        this.drawStat();

        this.game.tick.active = true;

        this.game.time.events.repeat(Phaser.Timer.SECOND / 10, Infinity, () => {
            this.game.tick.dispatch();
            this.updateStat();
        }, this);
    }

    update(game: Main) {
        // this.game.debug.cameraInfo(this.camera, 100, 100);
        // this.game.debug.text(this.game.time.fps, 20, 20);

        let moveStep = 10;
        let zoomStep = 0.05;

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

    updateStat() {
        for (let item in this.game.global.stats) {
            this.game.global.stats[item].text.setText(this.game.global.stats[item].value);
        }
    }

    drawStat() {
        let icon = this.add.sprite(50, 50, 'crystal', null, this.game.ui);
        icon.height = icon.width = 50;
        icon.anchor.set(.5, .5);

        this.game.global.stats.cobblestone.value = 0;
        this.game.global.stats.cobblestone.text = this.add.text(70, 55, "0", {
            font: '25px Arial',
            fill: '#ffffff',
            align: 'left'
        }, this.game.ui);
        this.game.global.stats.cobblestone.text.anchor.set(0, .5);
        // last.position.x +=first.totalWidth;

        // this.game.nextByNext(gr);
    }

    pause() {
        this.game.state.start('menu');
    }
}

export default GameState;

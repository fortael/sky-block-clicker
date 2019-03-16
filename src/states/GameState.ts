import Main from "../Main";

import { Container, Service } from "typedi";
import CameraComponent from "../components/CameraComponent";
import WorldEffects from "../components/EffectsComponent";
import EffectsComponent from "../components/EffectsComponent";
import StructuresComponent from "../components/StructuresComponent";
import MainCookieStructure from "../entities/structures/MainCookieStructure";
import MainTreeStructure from "../entities/structures/MainTreeStructure";
import SaveChestStructure from "../entities/structures/SaveChestStructure";
import ToolbarUi from "../ui/ToolbarUi";

class GameState extends Phaser.State {

    public StructuresHook: StructuresComponent;
    public EffectsHook: WorldEffects;
    public ToolbarUi: ToolbarUi;

    public Camera: CameraComponent;

    public game: Main;

    public preload() {
        this.EffectsHook = Container.get(EffectsComponent);
        this.StructuresHook = Container.get(StructuresComponent);
        this.ToolbarUi = Container.get(ToolbarUi).make();
    }

    public create() {
        this.Camera = Container.get(CameraComponent).centerCamera();

        this.EffectsHook
            // .debugGrid(true)
            .drawBackgroundGradient()
            // .particlesEmitter()
            .drawBorders();

        this.StructuresHook
            .spawnBaseLevel()
            .spawnIsland1();

        Container.get(MainCookieStructure).on(30, 32);
        Container.get(SaveChestStructure).on(37, 32);
        Container.get(MainTreeStructure).on(35, 32);

        this.game.tick.active = true;
        this.game.time.events.repeat(Phaser.Timer.SECOND / 10, Infinity, () => {
            this.game.tick.dispatch();
            this.updateStat();
        }, this);
    }

    public update(game: Main) {
        this.Camera.update();
    }

    public updateStat() {
        //
    }

    public pause() {
        this.game.state.start("menu");
    }
}

export default GameState;

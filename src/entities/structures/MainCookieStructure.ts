import BaseGroupStructure from "./BaseGroupStructure";
import { Inject } from "typedi";
import Main from "../../Main";
import StructuresComponent, { BLOCK_COBBLESTONE, BLOCK_WOOD } from "../../components/StructuresComponent";
import BaseBlock from "../blocks/BaseBlock";
import { makeTile } from "../../utils/phaser";

/**
 * Главный блок в центре
 */
export default class MainCookieStructure extends BaseGroupStructure {

    protected sound: Phaser.Sound;

    constructor(
        @Inject(() => Main) game: Main,
        pivotX: number,
        pivotY: number,
    ) {
        super(game, pivotY, pivotX);
        this.regeneratable = true;
        this.regenerateTimeout = 10;
        this.sound = this.game.add.sound("click");
    }

    public make() {
        const { pivotX, pivotY, game } = this;

        this.observe([
            new BaseBlock(game, BLOCK_COBBLESTONE, pivotX, pivotY),
        ], () => {
            this.game.store.inventory.cobblestone += 1;
            this.sound.play();
        });
    }

    public create() {
        this.sound = this.game.add.sound("stone");
    }

    public onClick() {
        // super.onClick();
        this.sound.play();
    }

    public onDestroyed() {
        this.game.store.inventory.cobblestone += 1;
    }
}

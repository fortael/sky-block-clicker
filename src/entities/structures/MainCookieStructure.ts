import { Inject, Service } from "typedi";
import { BLOCK_COBBLESTONE, BLOCK_WOOD } from "../../components/StructuresComponent";
import Main from "../../Main";
import BaseBlock from "../blocks/BaseBlock";
import BaseGroupStructure from "./BaseGroupStructure";

/**
 * Главный блок в центре
 */
@Service()
export default class MainCookieStructure extends BaseGroupStructure {

    protected sound: Phaser.Sound;

    constructor(
        @Inject(() => Main) game: Main,
    ) {
        super(game);
    }

    public make() {
        const { game } = this;

        this.regeneratable = true;
        this.regenerateTimeout = 10;
        this.sound = this.game.add.sound("click");

        this.observeDestroy(
            [
                new BaseBlock(game, BLOCK_COBBLESTONE, 0, 0),
                new BaseBlock(game, BLOCK_COBBLESTONE, 0, 1),
                new BaseBlock(game, BLOCK_COBBLESTONE, 0, 2),
            ],
            () => {
                this.game.store.inventory.cobblestone += 1;
                this.sound.play();
            },
        );
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

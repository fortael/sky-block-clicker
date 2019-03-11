import { Inject, Service } from "typedi";
import { BLOCK_CHEST } from "../../components/StructuresComponent";
import Main from "../../Main";
import BaseBlock from "../blocks/BaseBlock";
import BaseGroupStructure from "./BaseGroupStructure";

/**
 * Главный блок в центре
 */
@Service()
export default class SaveChestStructure extends BaseGroupStructure {

    protected sound: Phaser.Sound;

    constructor(
        @Inject(() => Main) game: Main,
    ) {
        super(game);
        this.regeneratable = false;
        this.sound = this.game.add.sound("wood");

        this.observerClick([ new BaseBlock(game, BLOCK_CHEST, 0, 0) ], () => {
            this.game.store.save();
            this.sound.play();
        });
    }
}

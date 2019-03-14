import { Inject, Service } from "typedi";
import { BLOCK_CHEST } from "../../components/StructuresComponent";
import Main from "../../Main";
import BaseBlock from "../blocks/BaseBlock";
import Structure from "./Structure";

/**
 * Главный блок в центре
 */
@Service()
export default class SaveChestStructure extends Structure {

    protected sound: Phaser.Sound;

    constructor(
        @Inject(() => Main) game: Main,
    ) {
        super(game);
        this.regeneratable = false;
        this.sound = this.game.add.sound("wood");

        this.observeClick([ new BaseBlock(game, BLOCK_CHEST, 0, 0) ], () => {
            this.game.store.save();
            this.sound.play();

            this.disable(3);
        });
    }
}

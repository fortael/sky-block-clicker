import { Inject, Service } from "typedi";
import { BLOCK_COBBLESTONE, BLOCK_WOOD } from "../../components/StructuresComponent";
import Main from "../../Main";
import BaseBlock from "../blocks/BaseBlock";
import Structure from "./Structure";

/**
 * Главный блок в центре
 */
@Service()
export default class MainCookieStructure extends Structure {

    protected sound: Phaser.Sound;

    constructor(
        @Inject(() => Main) game: Main,
    ) {
        super(game);
        this.regeneratable = true;
        this.regenerateTimeout = 0.5;
        this.sound = this.game.add.sound("click");

        this.observe([
            new BaseBlock(game, BLOCK_COBBLESTONE, 0, 0),
        ]).destroyed(() => {
            this.game.store.inventory.cobblestone += 1;
            this.sound.play();
        }).damage(() => 10);
    }
}

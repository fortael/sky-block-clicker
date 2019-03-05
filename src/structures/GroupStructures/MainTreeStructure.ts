import BaseGroupStructure from "./BaseGroupStructure";
import BaseBlock from "../BaseBlock";

import { BLOCK_LEAVES, BLOCK_WOOD } from "../../hooks/StructuresHook";

export default class MainTreeStructure extends BaseGroupStructure {

    create() {
        const { pivotX, pivotY } = this;

        this.regeneratable = true;
        this.regenerateTimeout = 50;

        //ствол
        this.observe([
            ...this.makeBlocks(BLOCK_WOOD, pivotX, pivotY, pivotX, pivotY + 5)
        ], () => {
            this.game.store.inventory.wood += 1;
        });

        //листья
        this.observe([
            ...this.makeBlocks(BLOCK_LEAVES, pivotX - 1, pivotY + 6, pivotX + 1, pivotY + 7),
            ...this.makeBlocks(BLOCK_LEAVES, pivotX - 2, pivotY + 4, pivotX + 2, pivotY + 5),
        ], () => {
            const reward = this.game.rnd.weightedPick([
                0,
                0,
                0,
                1
            ]);

            this.game.store.inventory.sapling += reward;
        });
    }

    onReady() {

    }

    onDestroyed() {

    }
}

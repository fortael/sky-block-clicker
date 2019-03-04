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
        ]);

        //листья
        this.observe([
            ...this.makeBlocks(BLOCK_LEAVES, pivotX - 1, pivotY + 6, pivotX + 1, pivotY + 7),
            ...this.makeBlocks(BLOCK_LEAVES, pivotX - 2, pivotY + 4, pivotX + 2, pivotY + 5),
        ]);
    }

    onReady() {

    }

    onDestroyed() {

    }
}

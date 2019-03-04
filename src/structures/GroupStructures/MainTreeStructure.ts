import BaseGroupStructure from "./BaseGroupStructure";
import BaseBlock from "../BaseBlock";

import { BLOCK_LEAVES, BLOCK_WOOD } from "../../hooks/StructuresHook";

export default class MainTreeStructure extends BaseGroupStructure {

    create() {
        const { structureHook, group, game } = this;

        this.observe([
            ...this.makeBlocks(BLOCK_WOOD, this.pivotX, this.pivotY, this.pivotX, this.pivotY + 5)
        ]);
        this.observe([
            ...this.makeBlocks(BLOCK_LEAVES, this.pivotX - 2, this.pivotY + 4, this.pivotX + 2, this.pivotY + 4),
            ...this.makeBlocks(BLOCK_LEAVES, this.pivotX - 2, this.pivotY + 5, this.pivotX + 2, this.pivotY + 5),
            ...this.makeBlocks(BLOCK_LEAVES, this.pivotX - 1, this.pivotY + 6, this.pivotX + 1, this.pivotY + 6),
            ...this.makeBlocks(BLOCK_LEAVES, this.pivotX - 1, this.pivotY + 7, this.pivotX + 1, this.pivotY + 7),
        ]);
    }

    onReady() {
        this.regeneratable = true;
        this.regenerateTimeout = 50;
    }

    onDestroyed() {
        super.onDestroyed();
        console.log('destroyed TOTAL');
    }
}

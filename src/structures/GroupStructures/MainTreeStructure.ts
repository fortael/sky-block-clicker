import BaseGroupStructure from "./BaseGroupStructure";
import BaseBlock from "../BaseBlock";

import { BLOCK_LEAVES, BLOCK_WOOD } from "../../hooks/StructuresHook";

export default class MainTreeStructure extends BaseGroupStructure {

    create() {
        const { structureHook, group, game } = this;

        this.observe([
            new BaseBlock(game, structureHook.makeBlock(BLOCK_WOOD, 36, 32, group)),
            new BaseBlock(game, structureHook.makeBlock(BLOCK_WOOD, 36, 33, group)),
            new BaseBlock(game, structureHook.makeBlock(BLOCK_WOOD, 36, 34, group)),
            new BaseBlock(game, structureHook.makeBlock(BLOCK_WOOD, 36, 35, group)),
            new BaseBlock(game, structureHook.makeBlock(BLOCK_WOOD, 36, 36, group)),
            new BaseBlock(game, structureHook.makeBlock(BLOCK_WOOD, 36, 37, group)),
        ]);

        this.observe([
            new BaseBlock(game, structureHook.makeBlock(BLOCK_LEAVES, 34, 36, group)),
            new BaseBlock(game, structureHook.makeBlock(BLOCK_LEAVES, 35, 36, group)),
            new BaseBlock(game, structureHook.makeBlock(BLOCK_LEAVES, 36, 36, group)),
            new BaseBlock(game, structureHook.makeBlock(BLOCK_LEAVES, 37, 36, group)),
            new BaseBlock(game, structureHook.makeBlock(BLOCK_LEAVES, 38, 36, group)),

            new BaseBlock(game, structureHook.makeBlock(BLOCK_LEAVES, 34, 37, group)),
            new BaseBlock(game, structureHook.makeBlock(BLOCK_LEAVES, 35, 37, group)),
            new BaseBlock(game, structureHook.makeBlock(BLOCK_LEAVES, 36, 37, group)),
            new BaseBlock(game, structureHook.makeBlock(BLOCK_LEAVES, 37, 37, group)),
            new BaseBlock(game, structureHook.makeBlock(BLOCK_LEAVES, 38, 37, group)),

            new BaseBlock(game, structureHook.makeBlock(BLOCK_LEAVES, 35, 38, group)),
            new BaseBlock(game, structureHook.makeBlock(BLOCK_LEAVES, 36, 38, group)),
            new BaseBlock(game, structureHook.makeBlock(BLOCK_LEAVES, 37, 38, group)),
            new BaseBlock(game, structureHook.makeBlock(BLOCK_LEAVES, 35, 39, group)),
            new BaseBlock(game, structureHook.makeBlock(BLOCK_LEAVES, 36, 39, group)),
            new BaseBlock(game, structureHook.makeBlock(BLOCK_LEAVES, 37, 39, group)),
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

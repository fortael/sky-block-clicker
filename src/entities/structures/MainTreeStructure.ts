import BaseGroupStructure from "./BaseGroupStructure";

import { Inject, Service } from "typedi";
import Main from "../../Main";

Service();
export default class MainTreeStructure extends BaseGroupStructure {

    protected soundWood: Phaser.Sound;
    protected soundLeaf: Phaser.Sound;

    constructor(
        @Inject(() => Main) game: Main,
    ) {
        super(game);

        this.regeneratable = true;
        this.regenerateTimeout = 10;
        this.soundWood = this.game.add.sound("wood");
        this.soundLeaf = this.game.add.sound("leaf");
    }

    public make() {
        const { pivotX, pivotY } = this;

        // this.observe([
        //     ...structures.makeBlocks(BLOCK_WOOD, pivotX, pivotY, pivotX, pivotY + 5),
        // ], () => {
        //     this.game.store.inventory.wood += 1;
        //     this.soundWood.play();
        // }, () => {
        //     this.temporarySprites.push(this.structures.makeTile(BLOCK_SAPLING, pivotX, pivotY));
        // });

        // листья
        // this.observe([
        //     ...structures.makeBlocks(BLOCK_LEAVES, pivotX - 1, pivotY + 6, pivotX + 1, pivotY + 7),
        //     // ...structures.makeBlocks(BLOCK_LEAVES, pivotX - 2, pivotY + 4, pivotX + 2, pivotY + 5),
        // ], () => {
        //     this.soundLeaf.play();
        //     const reward = this.game.rnd.weightedPick([
        //         0,
        //         0,
        //         1,
        //     ]);
        //
        //     this.game.store.inventory.sapling += reward;
        // });
    }

    public onReady() {
        //
    }

    public onDestroyed() {
        //
    }
}

import Structure from "./Structure";

import { Inject, Service } from "typedi";
import StructuresComponent, { BLOCK_LEAVES, BLOCK_SAPLING, BLOCK_WOOD } from "../../components/StructuresComponent";
import Main from "../../Main";

Service();
export default class MainTreeStructure extends Structure {

    protected soundWood: Phaser.Sound;
    protected soundLeaf: Phaser.Sound;

    constructor(
        @Inject(() => Main) game: Main,
        protected structures: StructuresComponent,
    ) {
        super(game);
        this.regeneratable = true;
        this.regenerateTimeout = 5;
        this.soundWood = this.game.add.sound("wood");
        this.soundLeaf = this.game.add.sound("leaf");

        this.observeDestroy([
            ...structures.makeBlocks(BLOCK_WOOD, 0, 0, 0, 5),
        ], () => {
            this.game.store.inventory.wood += 1;
            this.soundWood.play();
        }, () => {
            this.temporarySprites.push(this.structures.makeTile(BLOCK_SAPLING, this.pivotX, this.pivotY));
        });

        // листья
        this.observeDestroy(
            [
                ...structures.makeBlocks(BLOCK_LEAVES, -1, 6, +1, 7),
                ...structures.makeBlocks(BLOCK_LEAVES, -2, 4, +2, 5),
            ],
            () => {
                this.soundLeaf.play();
                const reward = this.game.rnd.weightedPick([
                    0,
                    0,
                    1,
                ]);

                this.game.store.inventory.sapling += reward;
            },
            () => undefined,
            100,
        );
    }

    public onStructureDestroyed() {
        super.onStructureDestroyed();
        this.disable(5);
    }
}

import { debounce } from "lodash";
import { BLOCK_COBBLESTONE, BLOCK_SAPLING, BLOCK_WOOD } from "../hooks/StructuresHook";
import Main from "../main";
import { makeText, makeTile } from "../utils/phaser";
import { TilesGroup } from "../utils/TileGroup";

export default class ToolbarUi extends TilesGroup {

    constructor(game: Main, parent?: PIXI.DisplayObjectContainer, name?: string) {
        super(game, parent, name, true, true);

        this.addChild(this.makeItem(BLOCK_COBBLESTONE, () => game.store.inventory.cobblestone));
        this.addChild(this.makeItem(BLOCK_WOOD, () => game.store.inventory.wood));
        this.addChild(this.makeItem(BLOCK_SAPLING, () => game.store.inventory.sapling));
        this.pos();

        game.scale.setResizeCallback(debounce(this.pos, 100), this);
    }

    public pos() {
        this.placeInRow().verticalBottom().horizontalCenter();

        return this;
    }

    public render() {
        //
    }

    public makeItem(id: number, getValue: () => string = () => "") {
        const group = new Phaser.Group(this.game, this);
        const slot = this.makeBasicSquare(64);
        const tile = makeTile(this.game, id);
        const text = makeText(this.game, getValue());

        tile.anchor.setTo(0.5, 0.5);
        tile.x = slot.width / 2 - 10;
        tile.y = slot.height / 2 - 10;
        tile.width /= 2;
        tile.height /= 2;

        text.anchor.setTo(0.5, 0.5);
        text.x = slot.width / 2 + 10;
        text.y = slot.height / 2 + 10;

        group.addChild(slot);
        group.addChild(tile);
        group.addChild(text);

        group.update = () => {
            text.setText(getValue());
        };

        return group;
    }
}

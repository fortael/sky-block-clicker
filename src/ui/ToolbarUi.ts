import { debounce } from "lodash";
import { Service } from "typedi";
import { BLOCK_COBBLESTONE, BLOCK_SAPLING, BLOCK_WOOD } from "../components/StructuresComponent";
import { makeText, makeTile } from "../utils/phaser";
import { TilesGroup } from "../utils/TileGroup";

@Service()
export default class ToolbarUi extends TilesGroup {

    public make() {
        const { game, parent } = this;

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
        const text = makeText(this.game, getValue(), 14);

        tile.anchor.setTo(0.5, 0.5);
        tile.x = (slot.width - 4) / 2;
        tile.y = (slot.height - 4) / 2;

        text.anchor.setTo(0.5, 0.5);
        text.x = (slot.width - 4) / 2;
        text.y = (slot.height - 4) / 2 + 20;

        group.addChild(slot);
        group.addChild(tile);
        group.addChild(text);

        group.update = () => {
            text.setText(getValue());
        };

        return group;
    }
}

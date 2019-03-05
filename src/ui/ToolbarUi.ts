import BaseUi from "./BaseUi";
import { makeText, makeTile } from "../utils/phaser";
import { BLOCK_COBBLESTONE, BLOCK_WOOD, BLOCK_SAPLING } from "../hooks/StructuresHook";

export default class ToolbarUi extends BaseUi {

    public create() {
        const { group, game } = this;

        group.addChild(this.makeItem(BLOCK_COBBLESTONE, function () {
            return game.store.inventory.cobblestone;
        }));
        group.addChild(this.makeItem(BLOCK_WOOD, function () {
            return game.store.inventory.wood;
        }));
        group.addChild(this.makeItem(BLOCK_SAPLING, function () {
            return game.store.inventory.sapling;
        }));

        group.placeInRow();
        group.horizontalCenter();
        group.verticalBottom( 20);
        group.exists = true;
    }

    public makeItem(id: number, getValue: { (): string; } = () => '')
    {
        const group = new Phaser.Group(this.game);
        const slot = this.group.makeBasicSquare(64);
        const tile = makeTile(this.game, id);
        const text = makeText(this.game, this.game.store.inventory.cobblestone);

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

        this.game.tick.add(function () {
            text.setText(getValue());
        });

        return group;
    }
}

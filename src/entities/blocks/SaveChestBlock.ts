import BaseBlock from "./BaseBlock";

/**
 * Главный блок в центре
 */
export default class SaveChestBlock extends BaseBlock {

    public create() {
    }

    public onClick() {
        this.game.store.save();
        console.log("Game is saved");
    }
}

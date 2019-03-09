import BaseBlock from "./BaseBlock";

/**
 * Главный блок в центре
 */
export default class MainCookieBlock extends BaseBlock {

    public create() {
        this.regeneratable = true;
        this.regenerateTimeout = 5;
    }

    public onDestroyed() {
        this.game.store.inventory.cobblestone += 1;
    }
}

import BaseBlock from "./BaseBlock";

/**
 * Главный блок в центре
 */
export default class MainCookieBlock extends BaseBlock {

    create() {
        this.regeneratable = true;
        this.regenerateTimeout = 5;
    }

    onDestroyed() {
        this.game.store.inventory.cobblestone += 1;
    }
}

import BaseBlock from "./BaseBlock";

/**
 * Главный блок в центре
 */
export default class MainCookieBlock extends BaseBlock {

    protected sound: Phaser.Sound;

    public create() {
        this.regeneratable = true;
        this.regenerateTimeout = 5;

        this.sound = this.game.add.sound("stone");
    }

    public onClick() {
        super.onClick();
        this.sound.play();
    }

    public onDestroyed() {
        this.game.store.inventory.cobblestone += 1;
    }
}

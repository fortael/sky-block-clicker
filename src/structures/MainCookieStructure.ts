import BaseStructure from "./BaseStructure";

export default class MainCookieStructure extends BaseStructure {

    onReady() {
        this.regeneratable = true;
        this.regenerateTimeout = 5;
    }

    onDestroyed() {
        this.game.global.stats.cobblestone.value += 1;
    }
}

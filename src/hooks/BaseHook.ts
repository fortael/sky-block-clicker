import Main from "../main";

export default class BaseHook {
    protected game: Main;
    protected world: Phaser.World;

    constructor(game: Main, world: Phaser.World) {
        this.game = game;
        this.world = world;
    }
}

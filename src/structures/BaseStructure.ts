import Main from "../main";
import { borderSquare } from "../utils/phaser";

export default class BaseStructure {

    protected game: Main;
    protected sprite: Phaser.Sprite;

    protected health: number = 1;
    protected regeneratable: boolean = false;
    protected regenerateTimeout: number = 0;

    private regenerateTimeoutCounter: number = 0;

    private hover: Phaser.Graphics = null;

    constructor(game: Main, sprite: Phaser.Sprite) {
        this.game = game;
        this.sprite = sprite;

        this.sprite.inputEnabled = true;
        this.sprite.events.onInputDown.add(this.onClick, this);
        this.sprite.events.onInputOver.add(this.onHover, this);
        this.sprite.events.onInputOut.add(this.onHoverOut, this);

        this.game.tick.add(() => {
            this.regen();
        });

        this.onReady();
    }

    public onReady() {
    }

    public onDestroyed() {
    }

    public onRespawn() {
    }

    public onClick() {
        this.destroy();
    }

    public onHover() {
        if (!this.isDestroyed()) {
            this.onHoverOut();
            this.hover = borderSquare(this.game, this.sprite);
        }
    }

    public onHoverOut() {
        this.hover !== null ? this.hover.destroy() : null;
    }

    public destroy() {
        this.health = 0;
        this.sprite.exists = false;
        this.regenerateTimeoutCounter = this.regenerateTimeout;
        this.onDestroyed();

        return this;
    }

    public respawn() {
        this.health = 1;
        this.sprite.exists = true;
        this.onRespawn();

        return this;
    }

    public isDestroyed() {
        return this.health <= 0;
    }

    public regen()
    {
        if (this.regeneratable && this.isDestroyed()) {
            if (this.regenerateTimeoutCounter > 0) {
                return this.regenerateTimeoutCounter--;
            }

            this.respawn();
        }

        return this;
    }
}

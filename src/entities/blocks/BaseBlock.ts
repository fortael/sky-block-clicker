import { Inject } from "typedi";
import StructuresComponent, { DAMAGE_1, DAMAGE_2, DAMAGE_3 } from "../../components/StructuresComponent";
import Main from "../../Main";
import { borderSquare, makeTile } from "../../utils/phaser";

export default class BaseBlock extends Phaser.Sprite {

    @Inject(() => Main)
    public game: Main;

    public healthDamage: number = 30;
    public health = 100;
    public maxHealth = 100;

    private hover: Phaser.Graphics = null;
    private disabled: boolean = false;
    private damageSprite: Phaser.Sprite;

    constructor(
        game: Main,
        id: number,
        x: number,
        y: number,
    ) {
        super(game, x, y, "sheet", id - 1);

        const cords = StructuresComponent.getCordsByXY(x, y);

        this.position.y = cords.y;
        this.position.x = cords.x;
        this.width = 64;
        this.height = 64;
        this.smoothed = false;

        this.inputEnabled = true;
        this.events.onInputDown.add(() => {
            if (!this.disabled) {
                this.onClick();
            }
        });

        this.events.onInputOver.add(() => this.onHover());
        this.events.onInputOut.add(() => this.onHoverOut());
        this.events.onRevived.add(() => this.onRevived());

        this.damageSprite = makeTile(game, 49);
        this.damageSprite.anchor.set(.5, .5);
        this.damageSprite.position.x = this.width / 4;
        this.damageSprite.position.y = this.height / 4;
        this.damageSprite.exists = false;
        this.addChild(this.damageSprite);
    }

    public onRevived() {
        this.damageSprite.exists = false;
        this.health = this.maxHealth;
    }

    public damage(amount: number): Phaser.Sprite {
        super.damage(amount);

        const health = this.health / this.maxHealth * 100;

        this.damageSprite.exists = true;
        this.damageSprite.scale.set(0.7, 0.7);

        if (health < 100) {
            this.damageSprite.loadTexture("sheet", DAMAGE_1);
        }
        if (health < 70) {
            this.damageSprite.loadTexture("sheet", DAMAGE_2);
        }
        if (health < 31) {
            this.damageSprite.loadTexture("sheet", DAMAGE_3);
            this.damageSprite.scale.set(0.8, 0.8);
        }
        if (health < 21) {
            this.damageSprite.loadTexture("sheet", DAMAGE_3);
            this.damageSprite.scale.set(0.9, 0.9);
        }
        if (health < 11) {
            this.damageSprite.loadTexture("sheet", DAMAGE_3);
            this.damageSprite.scale.set(1, 1);
        }

        return this;
    }

    public onClick() {
        if (!this.disabled) {
            this.damage(this.healthDamage);
        }
    }

    public onHover() {
        if (this.alive && !this.disabled) {
            this.onHoverOut();
            this.hover = borderSquare(this.game, this);
            this.hover.position.x = this.x;
            this.hover.position.y = this.y;
        }
    }

    public onHoverOut() {
        if (this.hover !== null) {
            this.hover.destroy();
        }
    }

    public disable() {
        this.onHoverOut();
        this.disabled = true;
        this.alpha = 0.3;

        return this;
    }

    public enable() {
        this.disabled = false;
        this.alpha = 1;

        return this;
    }
}

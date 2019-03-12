import { Inject } from "typedi";
import StructuresComponent from "../../components/StructuresComponent";
import Main from "../../Main";
import { borderSquare } from "../../utils/phaser";

export default class BaseBlock extends Phaser.Sprite {

    @Inject(() => Main)
    public game: Main;

    private hover: Phaser.Graphics = null;
    private disabled: boolean = false;

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
    }

    public onClick() {
        if (!this.disabled) {
            this.kill();
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
        this.alpha = 0.5;

        return this;
    }

    public enable() {
        this.disabled = false;
        this.alpha = 1;

        return this;
    }
}

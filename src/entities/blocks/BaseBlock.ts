import { Inject } from "typedi";
import StructuresComponent from "../../components/StructuresComponent";
import Main from "../../Main";
import { borderSquare } from "../../utils/phaser";

export default class BaseBlock extends Phaser.Sprite {

    @Inject(() => Main)
    public game: Main;

    private hover: Phaser.Graphics = null;

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
        this.events.onInputDown.add(() => this.onClick());
        this.events.onInputOver.add(() => this.onHover());
        this.events.onInputOut.add(() => this.onHoverOut());
    }

    public isBlockALive() {
        return this.alive;
    }

    public onClick() {
        this.kill();
    }

    public onHover() {
        if (this.isBlockALive()) {
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
}

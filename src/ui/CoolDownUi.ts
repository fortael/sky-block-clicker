import { Inject, Service } from "typedi";
import Main from "../Main";
import { makeText } from "../utils/phaser";

@Service()
export default class CoolDownUi extends Phaser.Group {

    @Inject(() => Main)
    public game: Main;

    protected text: Phaser.Text;
    protected value: number;
    protected doneIn: number;
    protected layout: Phaser.Graphics;

    public make() {
        const { game } = this;

        this.text = makeText(game, "", 20);
        this.text.strokeThickness = 1;
        this.text.exists = false;
        this.value = null;

        this.layout = game.add.graphics(0, 0);
        // this.layout.lineStyle(5, 0xffffff, 0.8);
        this.layout.beginFill(0x000000, 0.4);
        this.layout.drawCircle(0, 0, 55);
        this.layout.exists = false;

        this.addChild(this.layout);
        this.addChild(this.text);

        return this;
    }

    public setCoolDown(value: number) {
        this.doneIn = +new Date() + value * 1000;
    }

    public isDone() {
        return +new Date() >= this.doneIn;
    }

    public draw() {
        if (this.isDone()) {
            this.text.exists = false;
            this.layout.exists = false;
            return;
        }

        this.game.world.bringToTop(this);

        const now = +new Date();
        const seconds = Math.ceil((this.doneIn - now) / 1000);

        this.text.exists = true;
        this.layout.exists = true;
        this.text.setText(`${seconds}`);
    }

    public posTo(x: number, y: number) {
        this.position.x = x + 32;
        this.position.y = y + 32;
        this.text.position.y += 3;

        this.text.anchor.set(0.5, 0.5);
    }
}

import Main from "../main";
import BaseUi from "./BaseUi";

export default class ToolbarUi extends BaseUi {

    public create() {
        const { group, game } = this;

        const rect: Phaser.Graphics = game.add.graphics(0, 0);

        rect.lineStyle(2, 0xffffff);
        rect.drawRect(0, 0, 100, 100);

        group.addChild(rect);
    }
}

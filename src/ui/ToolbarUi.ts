import Main from "../main";
import BaseUi from "./BaseUi";

export default class ToolbarUi extends BaseUi {

    public create() {
        const { group, game } = this;

        group.addChild(group.makeBasicSquare(64));
        group.addChild(group.makeBasicSquare(64));
        group.addChild(group.makeBasicSquare(64));

        group.placeInRow();
        group.horizontalCenter();
        group.verticalBottom( 20);
    }
}

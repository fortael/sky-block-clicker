import Main from "../main";
import { TilesGroup } from "../utils/TileGroup";

export default class BaseUi {

    protected game: Main;
    protected group: TilesGroup;

    constructor(game: Main) {
        this.game = game;
        this.group = new TilesGroup(this.game, this.game.ui);

        this.create();
    }

    public create() {

    }

    public postTo(x: number, y: number) {

    }
}

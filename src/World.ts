import { Inject, Service } from "typedi";
import Main from "./Main";

@Service()
export default class World extends Phaser.World {
    constructor(@Inject(() => Main) public game: Main) {
        super(game);
    }
}

import { Service } from "typedi";
import Main from "./Main";

@Service()
export default class World extends Phaser.World {
    constructor(game: Main) {
        super(game);
    }
}

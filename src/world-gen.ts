import {PlanetsArray} from "./data/Blocks";
import Helpers from "./helpers";
import {Planet, PlanetMetaInterface} from "./planet";
import Main from "./main";

export default class WorldGen {

    public static SpawnPlanets(game: Main): Array<Planet> {
        let array: Array<Planet> = [];
        let orbit: number = 30;
        let planet: Planet;

        PlanetsArray.forEach((item) => {
            let amount = item.amount;

            if (item.amount === null) amount = 1;

            if (item.amount instanceof Array && item.amount.length == 2) {
                amount = Helpers.randomSquare(item.amount[0], item.amount[1]);
            }

            console.log(`generate ${amount} planets of ${item.type}`);

            for (let i = 0; i < amount; i++) {
                planet = new Planet(game, item, orbit);
                array.push(planet);

                orbit += planet.width / game.resolution + 20;
            }

            orbit += 50;
        });

        return array;
    }

}

import {select as weightedSelect} from 'weighted';

export default class Helpers {

    static getWeightedListByChance(drop: any): object {
        let result = <any>{};

        for (let key in drop) {
            if (drop.hasOwnProperty(key))
                result[key] = weightedSelect(drop[key]);
        }

        return result;
    }

    static getWeightedListByOrder(drop: any, game: Phaser.Game): object {
        let result = <any>{};

        for (let key in drop) {
            if (drop.hasOwnProperty(key))
                result[key] = game.rnd.weightedPick(drop[key]);
        }

        return result;
    }

    static randomSquare(min: number, max: number) {
        return Math.floor(Math.abs(Math.random() - Math.random()) * (1 + max - min) + min);
    }

    static randomInteger(min: number, max: number): number {
        return Math.round(min - 0.5 + Math.random() * (max - min + 1));
    }

    static randomFloat(min: number, max: number): number {
        return Math.random() * (max - min) + min
    }

    static getRandomElem(array: Array<any>): any {
        return array[Helpers.randomInteger(0, array.length - 1)];
    }

    static easeInOutCubic(t: number): number {
        return t < .5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
    }

    static easeInOutQuart(t: number): number {
        return t < .5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t;
    }

    static easeInOutQuint(t: number): number {
        return t < .5 ? 16 * t * t * t * t * t : 1 + 16 * (--t) * t * t * t * t
    }
}
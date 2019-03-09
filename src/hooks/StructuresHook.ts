import BaseHook from "./BaseHook";
import BaseBlock from "../structures/BaseBlock";

import { makeTile } from "../utils/phaser";

export const BLOCK_GRASS = 4;
export const BLOCK_COBBLESTONE = 25;
export const BLOCK_WOOD = 29;
export const BLOCK_LAVA_FLUID = 94;
export const BLOCK_WATER_FLUID = 95;
export const BLOCK_LEAVES = 140;
export const BLOCK_SAPLING = 16;

export default class StructuresHook extends BaseHook {

    protected levelBase: Phaser.Group;
    protected mainTree: Phaser.Group;

    public spawnMainCookie() {
        return this.makeTile(BLOCK_COBBLESTONE, 30, 32, this.levelBase);
    }

    public spawnBaseLevel() {
        this.levelBase = this.game.add.group();

        this.makeTile(BLOCK_COBBLESTONE, 28, 32, this.levelBase);
        this.makeTile(BLOCK_COBBLESTONE, 32, 32, this.levelBase);

        this.makeTile(BLOCK_GRASS, 27, 31, this.levelBase);
        this.makeTile(BLOCK_GRASS, 28, 31, this.levelBase);
        this.makeTile(BLOCK_GRASS, 29, 31, this.levelBase);
        this.makeTile(BLOCK_GRASS, 30, 31, this.levelBase);
        this.makeTile(BLOCK_GRASS, 31, 31, this.levelBase);
        this.makeTile(BLOCK_GRASS, 32, 31, this.levelBase);
        this.makeTile(BLOCK_GRASS, 33, 31, this.levelBase);
        this.makeTile(BLOCK_GRASS, 34, 31, this.levelBase);
        this.makeTile(BLOCK_GRASS, 35, 31, this.levelBase);
        this.makeTile(BLOCK_GRASS, 36, 31, this.levelBase);
        this.makeTile(BLOCK_GRASS, 37, 31, this.levelBase);
        this.makeTile(BLOCK_GRASS, 38, 31, this.levelBase);

        const lava = this.makeTile(BLOCK_LAVA_FLUID, 29, 32, this.levelBase);
        const water = this.makeTile(BLOCK_WATER_FLUID, 31, 32, this.levelBase);

        const lavaEmitter = this.game.spriteEmitter(lava, lava.width / this.game.resolution, 2, [
            0xFFAE00, 0xFF9300, 0xFF7000, 0xFF4600, 0xFF1700,
        ]);
        const waterEmitter = this.game.spriteEmitter(water, water.width / this.game.resolution - 20, 1, [
            0x505dd6, 0x505dd6, 0x626ee0, 0x2b4b9b, 0x2b4b9b,
        ]);

        lavaEmitter.x = lava.x + lava.width / 2;
        lavaEmitter.y = lava.y + lava.height / 2;
        waterEmitter.x = water.x + water.width / 2;
        waterEmitter.y = water.y + water.height / 2;

        return this;
    }

    public spawnIsland1() {

        return this;
    }

    /**
     * Разместить игровой блок на игровыых координатах
     * @param id
     * @param cordX
     * @param cordY
     * @param group
     */
    public makeTile(id: number, cordX: number = 0, cordY: number = 0, group?: Phaser.Group | null) {
        const { x, y } = StructuresHook.getCordsByXY(cordX, cordY);
        const block = makeTile(this.game, id, group);

        block.x = x;
        block.y = y;
        block.width = 64;
        block.height = 64;
        block.smoothed = false;

        return block;
    }

    /**
     * Сгенерировать базовый блок
     * @param id
     * @param x
     * @param y
     * @param group
     */
    public makeBlock(id: number, x: number, y: number, group?: Phaser.Group) {
        return new BaseBlock(this.game, this.makeTile(id, x, y, group));
    }

    /**
     * Сгенерировать зону заполненную блоками
     * @param id
     * @param fromX
     * @param fromY
     * @param toX
     * @param toY
     * @param group
     */
    public makeBlocks(id: number, fromX: number, fromY: number, toX: number, toY: number, group?: Phaser.Group) {
        let array: BaseBlock[] = [];

        for (let x = fromX; x <= toX; x++) {
            for (let y = fromY; y <= toY; y++) {
                array.push(this.makeBlock(id, x, y, group));
            }
        }

        return array;
    }

    /**
     * Перевести игровые X и Y в нативные
     * @param x
     * @param y
     */
    public static getCordsByXY(x: number = 0, y: number) {
        return {
            x: x * 64,
            y: (64 - y) * 64
        };
    }
}

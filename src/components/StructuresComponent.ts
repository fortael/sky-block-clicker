import BaseBlock from "../entities/blocks/BaseBlock";

import { Inject, Service } from "typedi";
import Main from "../Main";
import { makeTile } from "../utils/phaser";
import EffectsComponent from "./EffectsComponent";

export const BLOCK_DIRT = 1;
export const BLOCK_GRASS = 2;
export const BLOCK_COBBLESTONE = 3;

export const BLOCK_LAVA_FLUID = 4;
export const BLOCK_WATER_FLUID = 5;

export const BLOCK_WOOD = 6;
export const BLOCK_LEAVES = 7;
export const BLOCK_CHEST = 8;
export const BLOCK_SAPLING = 9;

@Service()
export default class StructuresComponent {

    /**
     * Перевести игровые X и Y в нативные
     * @param x
     * @param y
     */
    public static getCordsByXY(x: number = 0, y: number) {
        return {
            x: x * 64,
            y: (64 - y) * 64,
        };
    }

    /**
     * Перевести игровые X и Y в нативные
     * @param x
     * @param y
     */
    public static getXYByCords(x: number = 0, y: number) {
        return {
            x: x / 64,
            y: y / -64 + 64,
        };
    }

    // protected levelBase: Phaser.Group;
    // protected mainTree: Phaser.Group;

    constructor(
        @Inject(() => Main) protected game: Main,
        protected effectComponent: EffectsComponent,
    ) {}

    public spawnBaseLevel() {
        // this.levelBase = this.game.add.group();

        this.makeTile(BLOCK_COBBLESTONE, 28, 32);
        this.makeTile(BLOCK_COBBLESTONE, 32, 32);

        this.makeTile(BLOCK_DIRT, 27, 31);
        this.makeTile(BLOCK_DIRT, 28, 31);
        this.makeTile(BLOCK_DIRT, 29, 31);
        this.makeTile(BLOCK_DIRT, 30, 31);
        this.makeTile(BLOCK_DIRT, 31, 31);
        this.makeTile(BLOCK_DIRT, 32, 31);
        this.makeTile(BLOCK_GRASS, 33, 31);
        this.makeTile(BLOCK_GRASS, 34, 31);
        this.makeTile(BLOCK_GRASS, 35, 31);
        this.makeTile(BLOCK_GRASS, 36, 31);
        this.makeTile(BLOCK_DIRT, 37, 31);
        this.makeTile(BLOCK_DIRT, 38, 31);

        const lava = this.makeTile(BLOCK_LAVA_FLUID, 29, 32);
        const water = this.makeTile(BLOCK_WATER_FLUID, 31, 32);

        // effectComponent.
        const lavaEmitter = this.effectComponent.spriteEmitter(lava, lava.width / this.game.resolution, 2, [
            0xFFAE00, 0xFF9300, 0xFF7000, 0xFF4600, 0xFF1700,
        ]);
        const waterEmitter = this.effectComponent.spriteEmitter(water, water.width / this.game.resolution - 20, 1, [
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
        const { x, y } = StructuresComponent.getCordsByXY(cordX, cordY);
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
        return new BaseBlock(this.game, id, x, y);
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
        const array: BaseBlock[] = [];

        for (let x = fromX; x <= toX; x++) {
            for (let y = fromY; y <= toY; y++) {
                // array.push(this.makeBlock(id, x, y, group));
            }
        }

        return array;
    }
}

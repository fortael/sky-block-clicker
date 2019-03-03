import BaseHook from "./BaseHook";

export const BLOCK_GRASS = 4;
export const BLOCK_COBBLESTONE = 25;
export const BLOCK_WOOD = 29;
export const BLOCK_LAVA_FLUID = 94;
export const BLOCK_WATER_FLUID = 95;
export const BLOCK_LEAVES = 140;

export default class StructuresHook extends BaseHook {

    protected levelBase: Phaser.Group;
    protected mainTree: Phaser.Group;

    public spawnMainCookie() {
        return this.makeBlock(BLOCK_COBBLESTONE, 30, 32, this.levelBase);
    }

    public spawnBaseLevel() {
        this.levelBase = this.game.add.group();

        this.makeBlock(BLOCK_COBBLESTONE, 28, 32, this.levelBase);
        this.makeBlock(BLOCK_COBBLESTONE, 32, 32, this.levelBase);

        this.makeBlock(BLOCK_GRASS, 27, 31, this.levelBase);
        this.makeBlock(BLOCK_GRASS, 28, 31, this.levelBase);
        this.makeBlock(BLOCK_GRASS, 29, 31, this.levelBase);
        this.makeBlock(BLOCK_GRASS, 30, 31, this.levelBase);
        this.makeBlock(BLOCK_GRASS, 31, 31, this.levelBase);
        this.makeBlock(BLOCK_GRASS, 32, 31, this.levelBase);
        this.makeBlock(BLOCK_GRASS, 33, 31, this.levelBase);
        this.makeBlock(BLOCK_GRASS, 34, 31, this.levelBase);
        this.makeBlock(BLOCK_GRASS, 35, 31, this.levelBase);
        this.makeBlock(BLOCK_GRASS, 36, 31, this.levelBase);
        this.makeBlock(BLOCK_GRASS, 37, 31, this.levelBase);
        this.makeBlock(BLOCK_GRASS, 38, 31, this.levelBase);

        const lava = this.makeBlock(BLOCK_LAVA_FLUID, 29, 32, this.levelBase);
        const water = this.makeBlock(BLOCK_WATER_FLUID, 31, 32, this.levelBase);

        const lavaEmitter = this.game.spriteEmitter(lava, lava.width / this.game.resolution, 2, [
            0xFFAE00, 0xFF9300, 0xFF7000, 0xFF4600, 0xFF1700
        ]);
        const waterEmitter = this.game.spriteEmitter(water, water.width / this.game.resolution - 20, 1, [
            0x505dd6, 0x505dd6, 0x626ee0, 0x2b4b9b, 0x2b4b9b
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
    public makeBlock(id: number, cordX: number = 0, cordY: number = 0, group?: Phaser.Group | null) {
        const { x, y } = StructuresHook.getCordsByXY(cordX, cordY);
        const block = this.game.add.sprite(x, y, 'sheet', id - 1, group);

        block.width = 64;
        block.height = 64;
        block.smoothed = false;

        return block;
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

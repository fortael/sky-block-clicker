import Main from "../../main";
import StructuresHook  from "../../hooks/StructuresHook";
import BaseBlock from "../BaseBlock";

export default class BaseGroupStructure {

    protected game: Main;
    protected group: Phaser.Group;
    protected structureHook: StructuresHook;
    protected observable: BaseBlock[] = [];

    protected regeneratable: boolean = false;

    protected pivotX: number = 0;
    protected pivotY: number = 0;

    protected regenerateTimeout: number = 0;
    private regenerateTimeoutCounter: number = 0;

    constructor(game: Main, structureHook: StructuresHook, pivotX: number, pivotY: number) {
        this.game = game;
        this.group = game.add.group();
        this.structureHook = structureHook;

        this.pivotX = pivotX;
        this.pivotY = pivotY;

        this.create();

        this.game.tick.add(() => {
            this.regen();
        });

        this.onReady();
    }

    /**
     * Создание
     */
    public create() {

    }

    /**
     * Событие при первом создании структуры в мире
     */
    public onReady() {
    }

    /**
     * Событие при уничтожении объекта
     */
    public onDestroyed() {
        this.regenerateTimeoutCounter = this.regenerateTimeout;
    }

    /**
     * Событие при восстановлении объекта
     */
    public onRespawn() {

    }

    /**
     * Уничтожить каждый блок в структуре
     */
    public destroy() {
        this.observable.forEach((item: BaseBlock) => {
            if (!item.isDestroyed()) {
                item.destroy();
            }
        });

        this.regenerateTimeoutCounter = this.regenerateTimeout;

        this.onDestroyed();
    }

    /**
     * Восстановить каждый блок в структуре
     */
    public respawn() {
        this.observable.forEach((item: BaseBlock) => {
            item.respawn();
        });

        this.onRespawn();
    }

    /**
     * Вся структура целиком уничтожена
     */
    public isDestroyed() {
        let isDestroyed = true;

        this.observable.forEach((item: BaseBlock) => {
            if (!item.isDestroyed()) {
                isDestroyed = false;
            }
        });

        return isDestroyed;
    }

    /**
     * Пытается восстановить структуру по таймауту, когда она целиком уничтожена
     */
    public regen() {
        if (this.regeneratable && this.isDestroyed()) {
            if (this.regenerateTimeoutCounter > 0) {
                this.regenerateTimeoutCounter--;
                return;
            }

            this.respawn();
        }

        return this;
    }

    /**
     * Зарегестрировать группу интерактивных блоков внутри объекта
     * @param array
     * @param onDestroyed
     * @param onAllDestroyed
     */
    public observe(
        array: BaseBlock[],
        onDestroyed: { (): void; } = () => {},
        onAllDestroyed: { (): void; } = () => {}
    ) {
        let count = array.length;

        array.forEach((item: BaseBlock) => {
            item.onDestroyed = () => {
                count--;
                onDestroyed();

                if (count <= 0) {
                    onAllDestroyed();
                }

                if (this.isDestroyed()) {
                    this.destroy(); //вызываем уничтожении, чтобы сбросить счетчик и вызвать эвент
                }
            };


            this.observable.push(item);
        });
    }

    /**
     * Сгенерировать базовый блок
     * @param id
     * @param x
     * @param y
     */
    public makeBlock(id: number, x: number, y: number) {
        return new BaseBlock(this.game, this.structureHook.makeBlock(id, x, y, this.group));
    }

    /**
     * Сгенерировать зону заполненную блоками
     * @param id
     * @param fromX
     * @param fromY
     * @param toX
     * @param toY
     */
    public makeBlocks(id: number, fromX: number, fromY: number, toX: number, toY: number) {
        let array: BaseBlock[] = [];

        for (let x = fromX; x <= toX; x++) {
            for (let y = fromY; y <= toY; y++) {
                console.log(x);
                array.push(this.makeBlock(id, x, y));
            }
        }

        return array;
    }
}

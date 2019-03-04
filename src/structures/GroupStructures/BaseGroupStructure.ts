import Main from "../../main";
import StructuresHook from "../../hooks/StructuresHook";
import BaseBlock from "../BaseBlock";

export default class BaseGroupStructure {

    protected game: Main;
    protected group: Phaser.Group;
    protected structureHook: StructuresHook;
    protected observable: BaseBlock[] = [];

    protected regeneratable: boolean = false;

    protected regenerateTimeout: number = 0;
    private regenerateTimeoutCounter: number = 0;

    constructor(game: Main, structureHook: StructuresHook, startX: number, startY: number) {
        this.game = game;
        this.group = game.add.group();
        this.structureHook = structureHook;

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
    protected observe(
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
}

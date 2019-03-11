import { Inject, Service } from "typedi";
import StructuresComponent from "../../components/StructuresComponent";
import Main from "../../Main";
import BaseBlock from "../blocks/BaseBlock";

interface ITimeOut {
    counter: number;
    initial: number;
}

interface IStructure {
    //
}

@Service()
export default abstract class BaseGroupStructure extends Phaser.Group {

    protected temporarySprites: Phaser.Sprite[] = [];

    protected regeneratable: boolean = false;

    protected pivotX: number = 0;
    protected pivotY: number = 0;

    protected regenerateTimeout: number = 0;
    private regenerateTimeoutCounter: number = 0;

    protected constructor(
        @Inject(() => Main) public game: Main,
    ) {
        super(game);
        this.game.tick.add(() => this.regen());
        this.onReady();
    }

    public on(x: number, y: number) {
        const cords = StructuresComponent.getCordsByXY(x, y);

        this.pivotY = y;
        this.pivotX = x;

        this.children.forEach((item: BaseBlock) => {
            item.position.x = cords.x + item.position.x;
            item.position.y = -cords.y + item.position.y;
        });

        return this;
    }

    /**
     * Событие при первом создании структуры в мире
     */
    public onReady() {
        //
    }

    /**
     * Событие при уничтожении объекта
     */
    public onStructureDestroyed() {
        this.regenerateTimeoutCounter = this.regenerateTimeout;
    }

    /**
     * Событие при восстановлении объекта
     */
    public onRespawnStructure() {
        this.temporarySprites.forEach((item: Phaser.Sprite) => {
            item.destroy();
        });
    }

    /**
     * Уничтожить каждый блок в структуре
     */
    public destroyStructure() {
        this.callAllExists("kill", true);
        this.onStructureDestroyed();
    }

    /**
     * Восстановить каждый блок в структуре
     */
    public respawnStructure() {
        this.callAllExists("revive", false, [ 1 ]);
        this.onRespawnStructure();
    }

    /**
     * Вся структура целиком уничтожена
     */
    public isStructureDestroyed() {
        return this.countLiving() === 0;
    }

    /**
     * Пытается восстановить структуру по таймауту, когда она целиком уничтожена
     */
    public regen() {
        if (this.regeneratable && this.isStructureDestroyed()) {
            if (this.regenerateTimeoutCounter > 0) {
                this.regenerateTimeoutCounter--;
                return;
            }

            this.regenerateTimeoutCounter = this.regenerateTimeout;
            this.respawnStructure();
        }

        return this;
    }

    /**
     * Зарегестрировать группу интерактивных блоков внутри объекта
     * @param array
     * @param onOneDestroyed - Срабатывает по удалению 1 блока
     * @param onAllDestroyed - Срабатывает, когда все блоки из массива были удалены
     */
    public observeDestroy(
        array: Phaser.Sprite[],
        onOneDestroyed: (remain: number) => void = () => undefined,
        onAllDestroyed: () => void = () => undefined,
    ) {
        let count = array.length;
        const countStart = array.length;

        array.forEach((item: BaseBlock) => {
            item.events.onKilled.add(() => {
                onOneDestroyed(count--);

                if (count <= 0) {
                    count = countStart;
                    onAllDestroyed();
                }

                if (this.isStructureDestroyed()) {
                    this.destroyStructure();
                }
            });
            this.addChild(item);
        });
    }

    public observerClick(
        array: Phaser.Sprite[],
        onClick: () => void = () => undefined,
    ) {
        array.forEach((item: BaseBlock) => {
            item.onClick = onClick;

            this.addChild(item);
        });
    }
}

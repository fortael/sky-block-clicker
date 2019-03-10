import Main from "../../Main";
import BaseBlock from "../blocks/BaseBlock";

export default class BaseGroupStructure extends Phaser.Group {

    protected temporarySprites: Phaser.Sprite[] = [];

    protected regeneratable: boolean = false;

    protected pivotX: number = 0;
    protected pivotY: number = 0;

    protected regenerateTimeout: number = 0;
    private regenerateTimeoutCounter: number = 0;

    constructor(
        public game: Main,
        pivotX: number,
        pivotY: number,
    ) {
        super(game);
        this.pivotY = pivotY;
        this.pivotX = pivotX;

        this.make();
        this.game.tick.add(() => this.regen());
        this.onReady();

    }

    /**
     * Регистрация обсервера
     */
    public make() {
        //
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
     * @param onDestroyed - Срабатывает по удалению 1 блока
     * @param onAllDestroyed - Срабатывает, когда все блоки из массива были удалены
     */
    public observe(
        array: Phaser.Sprite[],
        onDestroyed: (remain: number) => void = () => undefined,
        onAllDestroyed: () => void = () => undefined,
    ) {
        let count = array.length;
        const countStart = array.length;

        array.forEach((item: BaseBlock) => {
            item.events.onKilled.add(() => {
                count--;
                onDestroyed(count);

                if (count <= 0) {
                    count = countStart;
                    onAllDestroyed();
                }

                if (this.isStructureDestroyed()) {
                    this.destroyStructure(); // вызываем уничтожении, чтобы сбросить счетчик и вызвать эвент
                }
            });

           // this.resetAll()

            // this.observable.push(item);
            this.addChild(item);
        });
    }
}

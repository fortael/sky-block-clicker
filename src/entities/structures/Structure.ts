import { Container, Inject, Service } from "typedi";
import StructuresComponent from "../../components/StructuresComponent";
import Main from "../../Main";
import Observer from "../../Observer";
import CoolDownUi from "../../ui/CoolDownUi";
import BaseBlock from "../blocks/BaseBlock";

interface ITimeOut {
    counter: number;
    initial: number;
}

interface IStructure {
    tick(): void;
}

@Service()
export default abstract class Structure extends Phaser.Group {

    protected temporarySprites: Phaser.Sprite[] = [];

    protected regeneratable: boolean = false;

    protected pivotX: number = 0;
    protected pivotY: number = 0;

    protected disabled: boolean = false;
    protected coolDown: CoolDownUi;

    protected regenerateTimeout: number = 0;
    private regenerateTimeoutCounter: number = 0;

    protected constructor(
        @Inject(() => Main) public game: Main,
    ) {
        super(game);
        this.game.tick.add(() => this.tick());

        this.coolDown = (new CoolDownUi(game)).make();

        this.onReady();
    }

    public on(x: number, y: number) {
        const cords = StructuresComponent.getCordsByXY(x, y);

        this.pivotY = y;
        this.pivotX = x;

        this.coolDown.posTo(cords.x, cords.y);

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
        //
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
    public tick() {
        if (this.disabled && !this.coolDown.isDone()) {
            this.coolDown.draw();
        }

        if (this.regeneratable && this.isStructureDestroyed()) {
            if (+new Date() < this.regenerateTimeoutCounter) {
                return;
            }

            this.respawnStructure();
        }

        return this;
    }

    /**
     * Зарегестрировать группу блоков внутри структуру
     * @param array
     */
    public observe(array: BaseBlock[]) {
        return new Observer(this, array, (item: BaseBlock) => {
            this.addChild(item);
        });
    }

    /**
     * Make not available for interact
     * @param coolDownSeconds
     */
    public disable(coolDownSeconds = 0) {
        this.disabled = true;
        this.coolDown.setCoolDown(coolDownSeconds);
        this.callAll("disable", null);

        if (coolDownSeconds > 0) {
            setTimeout(() => this.enable(), coolDownSeconds * 1000);
        }

        return this;
    }

    public enable() {
        this.callAll("enable", null);
        this.disabled = false;
        this.coolDown.draw();

        return this;
    }

    public startRegeneration() {
        this.regenerateTimeoutCounter = +new Date() + this.regenerateTimeout * 1000;
    }
}

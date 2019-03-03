import Main from "../../main";
import { borderSquare } from "../../utils/phaser";
import StructuresHook from "../../hooks/StructuresHook";
import BaseStructure from "../BaseStructure";

export default class BaseGroupedStructure {

    protected game: Main;
    protected group: Phaser.Group;
    protected structureHook: StructuresHook;
    protected observable: BaseStructure[] = [];

    protected health: number = 1;
    protected regeneratable: boolean = false;

    protected regenerateTimeout: number = 0;
    private regenerateTimeoutCounter: number = 0;

    private hover: Phaser.Graphics = null;

    constructor(game: Main, structureHook: StructuresHook, startX: number, startY: number) {
        this.game = game;
        this.group = game.add.group();
        this.structureHook = structureHook;

        this.create();

        this.game.tick.add(() => {
            console.log('tick');
            this.regen();
        });

        this.onReady();
    }

    public create() {

    }

    public onReady() {
    }

    public onDestroyed() {
        this.regenerateTimeoutCounter = this.regenerateTimeout;
    }

    public onRespawn() {

    }

    public destroy() {
        console.log('destroy');
    }

    public respawn() {
        this.observable.forEach((item: BaseStructure) => {
            item.respawn();
        });

        this.onRespawn();
    }

    public isDestroyed() {
        let isDestroyed = true;

        this.observable.forEach((item: BaseStructure) => {
            if (!item.isDestroyed()) {
                isDestroyed = false;
            }
        });

        return isDestroyed;
    }

    public regen()
    {
        if (this.regeneratable && this.isDestroyed()) {
            if (this.regenerateTimeoutCounter > 0) {
                this.regenerateTimeoutCounter--;
                return;
            }

            this.respawn();
        }

        return this;
    }

    protected observe(array: BaseStructure[], onDestroyed: {(): void;} = () => {}, onAllDestroyed: {(): void;} = () => {}) {
        let count = array.length;

        array.forEach((item: BaseStructure) => {
            item.onDestroyed = () => {
                count--;
                onDestroyed();

                if (count <= 0) {
                    onAllDestroyed();
                }

                if (this.isDestroyed()) {
                    this.onDestroyed();
                }
            };


            this.observable.push(item);
        });
    }
}

import BaseBlock from "./entities/blocks/BaseBlock";
import Structure from "./entities/structures/Structure";

export default class Observer {

    protected countAlive = 0;

    constructor(
        protected structure: Structure,
        protected items: BaseBlock[],
        onRegistered: (item: BaseBlock) => void,
    ) {
        this.countAlive = this.items.length;

        items.forEach((item: BaseBlock) => {
            item.events.onKilled.add(() => {
                this.onOneDestroyedCallback(item);
                this.countAlive--;

                if (this.countAlive <= 0) {
                    this.countAlive = this.items.length;
                    this.onAllDestroyedCallback(item);
                }

                if (this.structure.isStructureDestroyed()) {
                    this.structure.startRegeneration();
                    this.structure.destroyStructure();
                }
            });

            onRegistered(item);
        });
    }

    public damage(callback: (item: BaseBlock) => number) {
        this.items.forEach((item: BaseBlock) => {
            item.healthDamage = callback(item);
        });

        return this;
    }

    public click(callback: (item: BaseBlock) => void) {
        this.items.forEach((item: BaseBlock) => {
            item.onClick = () => callback(item);
        });

        return this;
    }

    public destroyed(callback: (item: BaseBlock) => void) {
        this.onOneDestroyedCallback = callback;

        return this;
    }

    public allDestroyed(callback: (item: BaseBlock) => void) {
        this.onAllDestroyedCallback = callback;

        return this;
    }

    private onOneDestroyedCallback: (item: BaseBlock) => void = () => null;
    private onAllDestroyedCallback: (item: BaseBlock) => void = () => null;
}

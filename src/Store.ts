export default class Store {

    public inventory: any = {
        cobblestone: 0,
        sapling: 0,
        wood: 0,
    };

    public tool: any = null;

    public save() {
        const { inventory } = this;

        localStorage.setItem("items", JSON.stringify({
            inventory,
        }));
    }

    public loadFromStore() {
        const storage = localStorage.getItem("items");

        if (storage !== null) {
            const values = JSON.parse(storage);

            this.inventory = values.inventory;
        }
    }
}

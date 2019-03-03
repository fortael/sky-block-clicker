import Main from "../main";

interface ToolInterface {
    use: (sprite:Phaser.Sprite)=>void,
    sprite: string,
    available: boolean,
}

export default class Toolbar {

    game: Main;

    private items: Array<ToolInterface> = [];
    private readonly group: Phaser.Group;
    private tint: number = 0xFF31A5;

    constructor(game: Main) {
        this.game = game;

        this.group = game.add.group(game.ui, 'toolbar', true);

        this.add({
            sprite: 'ship.miner',
            available: true,
            use: function (sprite:Phaser.Sprite) {
                game.pickUp(sprite);
            },
        });
        this.add({
            sprite: 'ship.miner',
            available: true,
            use: function (sprite:Phaser.Sprite) {
                game.pickUp(sprite);
            },
        });
    }

    public render() {

        // this.sprite.destroy(true);

        let tile: Phaser.Graphics;
        let tileSize = 60;

        let positionX = 0;

        // tileSize * this.items.length

        for (let item of this.items) {
            tile = this.drawTile();

            this.drawIcon(tile, item);

            tile.position.x = positionX;

            positionX+= tileSize;
        }

        // this.game.stage.addChild(this.sprite);

        this.group.position.y = this.game.height - this.group.height - 10;
        this.group.position.x = (this.game.width / 2 - this.group.width / 2);
    }

    private drawTile() : Phaser.Graphics {
        let tile = this.game.add.graphics(0, 0, this.group);

        tile.beginFill(0x000000, 0.7);
        tile.lineStyle(2, 0x262626, 0.7);
        tile.drawRect(0, 0, 60, 60);

        return tile;
    }

    private drawIcon(tile:Phaser.Graphics, item:ToolInterface) {
        let sprite = this.game.add.sprite(tile.position.x, tile.position.y, item.sprite);

        // sprite.anchor.set(.5, .5);
        sprite.width = sprite.height = 50 * this.game.resolution;
        sprite.position.x += (tile.width - sprite.width / this.game.resolution) / 2 ;
        sprite.position.y += (tile.height - sprite.height / this.game.resolution) / 2;

        sprite.tint = this.tint;

        if (item.available === false) sprite.alpha = 0.5;

        tile.buttonMode = true;
        tile.inputEnabled = true;
        tile.events.onInputDown.add(() => item.use(sprite));

        tile.addChild(sprite);
    }

    protected add(item: ToolInterface) : void {
        this.items.push(item);
    }



}

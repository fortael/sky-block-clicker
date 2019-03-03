import Main from "../main";

export function borderCircle(game: Phaser.Game, sprite: Phaser.Sprite) {
    const hover: Phaser.Graphics = game.add.graphics(sprite.position.x + sprite.width / 2, sprite.position.y + sprite.height / 2);

    hover.lineStyle(2, 0xffffff);
    hover.drawCircle(0, 0, sprite.height / game.resolution + 2);

    return hover;
}

export function borderSquare(game: Phaser.Game, sprite: Phaser.Sprite) {
    const hover: Phaser.Graphics = game.add.graphics(sprite.position.x - 1, sprite.position.y - 1);

    hover.lineStyle(2, 0xffffff);
    hover.drawRect(0, 0, sprite.height / game.resolution + 2, sprite.width / game.resolution + 2);

    return hover;
}

export class TilesGroup extends Phaser.Group {

    public totalWidth: number = 0;
    public game:Main;

    public placeOneByOne(game:Main, padding:number = 0) {
        this.game.nextByNext(this, padding)
    }

    public posTo(x:number, y:number) {
        this.position.x = x;
        this.position.y = y;

        return this;
    }
}

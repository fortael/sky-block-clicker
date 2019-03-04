import Main from "../main";

export class TilesGroup extends Phaser.Group {

    public totalWidth: number = 0;
    public totalHeight: number = 0;

    public game:Main;

    public placeOneByOne(game:Main, padding:number = 0) {
        this.nextByNext(padding);
    }

    public posTo(x:number, y:number) {
        this.position.x = x;
        this.position.y = y;

        return this;
    }

    public nextByNext(padding: number = 0): TilesGroup {
        const { resolution } = this.game;

        let prev: Phaser.Sprite | Phaser.Text | TilesGroup = null;
        let total = 0;

        padding /= resolution;

        this.totalHeight = 0;
        this.totalWidth = 0;


        this.forEach((sprite: Phaser.Sprite | Phaser.Text | TilesGroup) => {
            if (!(sprite instanceof TilesGroup)) {
                sprite.anchor.set(0, 0);
            }

            const spriteWidth = sprite instanceof TilesGroup
                ? sprite.totalWidth
                : sprite.width;
            const spriteHeight = sprite instanceof TilesGroup
                ? sprite.totalHeight
                : sprite.height;

            if (prev === null) {
                sprite.position.x = 0;
                this.totalWidth += spriteWidth - 1;
                this.totalHeight += spriteHeight - 1;
            } else {
                sprite.position.x = (total) + padding;
                // sprite.position.x += Math.round(sprite.position.x) - sprite.position.x;
                total += padding + spriteWidth - 1;

                this.totalWidth += padding + spriteWidth - 1;
                this.totalHeight += spriteHeight - 1;
            }

            prev = sprite;
        }, this);

        return this;
    }
}

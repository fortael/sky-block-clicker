import Main from "../main";

export class TilesGroup extends Phaser.Group {

    public totalWidth: number = 0;
    public totalHeight: number = 0;

    public game: Main;

    public horizontalCenter() {
        this.position.x = (this.game.width - this.totalWidth) / 2;

        return this;
    }

    public verticalCenter() {
        this.position.y = this.game.height / 2 - this.totalHeight / 2;

        return this;
    }

    public verticalBottom(padding: number = 0) {
        this.position.y = this.game.height - this.totalHeight - padding;

        return this;
    }

    public placeOneByOne(padding: number = 0) {
        this.placeInRow(padding);

        return this;
    }

    public posTo(x: number, y: number) {
        this.position.x = x;
        this.position.y = y;

        return this;
    }

    /**
     * Разместить тайлы в группе один за другим в строку
     * @param padding
     */
    public placeInRow(padding: number = 0): TilesGroup {
        const { resolution } = this.game;

        let prev: Phaser.Sprite | Phaser.Text | TilesGroup = null;

        padding /= resolution;

        this.totalHeight = 0;
        this.totalWidth = 0;

        this.forEach((sprite: Phaser.Sprite | Phaser.Text | TilesGroup) => {
            if (!(sprite instanceof Phaser.Group)) {
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
            } else {
                sprite.position.x = (this.totalWidth) + padding;
                sprite.position.x += Math.round(sprite.position.x) - sprite.position.x;

                this.totalWidth += padding + spriteWidth - 1;
            }

            this.totalHeight = spriteHeight > this.totalHeight ? spriteHeight : this.totalHeight;
            prev = sprite;
        }, this);

        return this;
    }

    /**
     * Сгенерировать базовый квадрат
     * @param size
     */
    public makeBasicSquare(size: number) {
        const rect: Phaser.Graphics = this.game.add.graphics(0, 0);

        rect.beginFill(0x000000, 0.5);
        rect.lineStyle(4, 0xffffff);
        rect.drawRect(0, 0, size, size);

        return rect;
    }
}

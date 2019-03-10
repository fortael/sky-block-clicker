export function borderCircle(game: Phaser.Game, sprite: Phaser.Sprite) {
    const hover: Phaser.Graphics = game.add.graphics(0, 0);

    hover.position.x = sprite.position.x + sprite.width / 2;
    hover.position.x = sprite.position.y + sprite.height / 2;
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

export function makeTile(game: Phaser.Game, id: number, group?: Phaser.Group | null): Phaser.Sprite {
    const block = game.add.sprite(0, 0, "sheet", id - 1, group);

    block.width = 32;
    block.height = 32;
    block.smoothed = false;

    return block;
}

export function makeText(
    game: Phaser.Game,
    value: string,
    fontSize: number = 18,
    group?: Phaser.Group | Phaser.Stage | Phaser.Stage,
) {
    const text = game.add.text(0, 0, value, {
        align: "left",
        fill: "#ffffff",
        font: "Arial",
        fontSize,
        stroke: "#000000",
        strokeThickness: 2,
    }, group);

    text.resolution = window.devicePixelRatio;

    return text;
}

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

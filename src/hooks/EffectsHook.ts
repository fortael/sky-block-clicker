import BaseHook from "./BaseHook";

export default class EffectsHook extends BaseHook {

    protected objects: Phaser.Group[] = [];

    /**
     * Фоновый градиент
     */
    public drawBackgroundGradient() {
        const { game, world } = this;

        const width = world.width * game.resolution;
        const height = world.height * game.resolution;

        const myBitmap = game.add.bitmapData(width, height);
        const grd = myBitmap.context.createLinearGradient(0, 0, 0, height);

        grd.addColorStop(0, "#c6dbfd");
        grd.addColorStop(0.4, "#c6dbfd");
        grd.addColorStop(0.9, "#acc9fa");
        grd.addColorStop(0.95, "#4752c6");
        grd.addColorStop(1, "#4752c6");
        myBitmap.context.fillStyle = grd;
        myBitmap.context.fillRect(0, 0, width, height);
        myBitmap.context.fillStyle = grd;
        myBitmap.context.fillRect(0, 0, width, height);

        this.game.add.sprite(world.bounds.topLeft.x, 0, myBitmap);
        this.game.add.image(this.world.bounds.topLeft.x, 0, 'sky').anchor.set(0);

        return this;
    }

    /**
     * Нарисовать рамки вокруг уровня
     */
    public drawBorders() {
        const { game, world } = this;
        const color = 0x24ff00;

        game.add
            .graphics(0, 0, world)
            .beginFill(color)
            .drawRect(world.bounds.topRight.x - 2, world.bounds.topRight.y, 2, game.world.height);

        game.add
            .graphics(0, 0, world)
            .beginFill(color)
            .drawRect(world.bounds.topLeft.x, world.bounds.topRight.y, 2, game.world.height);

        game.add
            .graphics(0, 0, world)
            .beginFill(color)
            .drawRect(world.bounds.topLeft.x, world.bounds.topLeft.y, game.world.width, 2);

        game.add
            .graphics(0, 0, world)
            .beginFill(color)
            .drawRect(world.bounds.topLeft.x, world.bounds.bottomLeft.y - 2, game.world.width, 2);

        return this;
    }

    public particlesEmitter() {
        const { game, world } = this;

        const maxParticles = 100 / game.resolution;
        const emitter = game.add.emitter(world.centerX, world.centerY, maxParticles);

        emitter.makeParticles('star');

        const min = 0;
        const max = 1;

        emitter.setRotation(0, 10);
        emitter.setScale(min, max, min, max, 1000, Phaser.Easing.Circular.InOut);
        emitter.gravity.set(0);

        emitter.width = world.width;
        emitter.height = world.height;

        emitter.start(false, 0, 0, maxParticles);
        emitter.maxParticleSpeed = new Phaser.Point(-3, -3);
        emitter.minParticleSpeed = new Phaser.Point(3, 3);

        emitter.forEach((particle: Phaser.Particle) => {
            particle.tint = game.rnd.weightedPick([0xffffff, 0xffffff, 0xffffff]);
        }, this);
    }

    public debugGrid(cords: boolean = false) {
        const { game, world } = this;

        game.create.grid('grid', world.width, world.height, 64, 64, 'red', true, (texture:any) => {
            game.add.sprite(world.bounds.topLeft.x, 0, texture);
        });

        if (cords) {
            const textGroup = game.add.group();

            for (let x = 0; x < world.width; x += 64) {
                for (let y = 0; y < world.height; y += 64) {
                    const text = game.makeText(`x:${x/64}\r\ny:${64 - y/64}`, textGroup, 15);

                    text.x = x;
                    text.y = y;
                }
            }
        }
    }
}

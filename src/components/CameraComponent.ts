import { Inject, Service } from "typedi";
import Main from "../Main";

@Service()
export default class CameraComponent {

    protected moveUpKey: Phaser.Key;
    protected moveDownKey: Phaser.Key;
    protected moveLeftKey: Phaser.Key;
    protected moveRightKey: Phaser.Key;
    protected boostKey: Phaser.Key;
    protected centerKey: Phaser.Key;

    protected zoom = -8;
    protected zoomStep = 0.07;
    protected zoomMax = 25;
    protected zoomMin = -10;

    constructor(
        @Inject(() => Main) protected game: Main,
    ) {
        this.moveUpKey = game.input.keyboard.addKey(Phaser.Keyboard.W);
        this.moveDownKey = game.input.keyboard.addKey(Phaser.Keyboard.S);
        this.moveLeftKey = game.input.keyboard.addKey(Phaser.Keyboard.A);
        this.moveRightKey = game.input.keyboard.addKey(Phaser.Keyboard.D);

        this.boostKey = game.input.keyboard.addKey(Phaser.Keyboard.SHIFT);
        this.centerKey = game.input.keyboard.addKey(Phaser.Keyboard.C);

        game.input.mouse.mouseWheelCallback = () => {
            const { wheelDelta } = game.input.mouse;

            if (wheelDelta > 0) {
                this.zoomIn();
            } else if (wheelDelta < 0) {
                this.zoomOut();
            }
        };

        this.zoomToScale();
    }

     public update() {
         const { camera } = this.game.world;

         const moveStep = this.boostKey.isDown ? 30 : 10;

         if (this.centerKey.isDown) {
             this.centerCamera();
         }

         if (this.moveDownKey.isDown) {
             camera.y += moveStep;
         }
         if (this.moveUpKey.isDown) {
             camera.y -= moveStep;
         }
         if (this.moveLeftKey.isDown) {
             camera.x -= moveStep;
         }
         if (this.moveRightKey.isDown) {
             camera.x += moveStep;
         }
     }

    public zoomIn() {
        if (this.zoom < this.zoomMax) {
            this.zoom++;
            this.zoomToScale();
        }
    }

    public zoomOut() {
        if (this.zoom > this.zoomMin) {
            this.zoom--;
            this.zoomToScale();
        }
    }

    public centerCamera() {
        const { world } = this.game;

        const centerXWithScale = world.bounds.width * (this.zoom * this.zoomStep + 1);
        const centerYWithScale = world.bounds.height * (this.zoom * this.zoomStep + 1);

        world.camera.focusOnXY(centerXWithScale / 2, centerYWithScale / 2);

        return this;
    }

    private zoomToScale() {
        const zoom = this.zoom * this.zoomStep + 1;

        this.game.camera.scale.set(zoom, zoom);

        // todo: Зум относительно точки, которая была
        this.centerCamera();
    }
}

import BaseHook from "./BaseHook";

export default class CameraHook extends BaseHook {
    public zoomIn(size: number = 3) {
        this.game.camera.scale.x = size;
        this.game.camera.scale.y = size;

        this.centerCamera();
    }

    public zoomOut() {
        this.game.camera.scale.x = 1;
        this.game.camera.scale.y = 1;

        this.game.camera.unfollow();
        this.centerCamera();
    }

    public centerCamera() {
        this.world.camera.focusOnXY(this.world.bounds.width / 2, this.world.bounds.height / 2);
    }
}

import { Inject, Service } from "typedi";
import Main from "../Main";
import EffectsComponent from "./EffectsComponent";

@Service()
export default class CameraComponent {

    constructor(
        @Inject(() => Main) protected game: Main,
    ) {}

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
        const { world } = this.game;

        world.camera.focusOnXY(world.bounds.width / 2, world.bounds.height / 2);
    }
}

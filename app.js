import { Point } from "./point.js";
import { Dialog } from "./dialog.js";

const totalItems = 5;

class App {
    constructor() {
        this.canvas = document.createElement("canvas");
        this.ctx = this.canvas.getContext("2d");
        document.body.appendChild(this.canvas);

        this.items = [];
        for (let i = 0; i < totalItems; i++) {
            this.items.push(new Dialog());
        }
        
        this.downs = [];


        window.addEventListener("touchstart", this.down.bind(this), false);
        window.addEventListener("touchmove", this.move.bind(this), false);
        window.addEventListener("touchend", this.up.bind(this), false);
        window.addEventListener("resize", this.resize.bind(this), false);
        this.resize();

        window.requestAnimationFrame(this.animate.bind(this));
    }

    resize() {
        this.stageWidth = document.body.clientWidth;
        this.stageHeight = document.body.clientHeight;

        this.canvas.width = this.stageWidth;
        this.canvas.height = this.stageHeight;

        this.ctx.shadowOffsetX = 0;
        this.ctx.shadowOffsetY = 3;
        this.ctx.shadowBlur = 6;
        this.ctx.shadowColor = 'rgba(0, 0, 0, 0.1)';

        for (let item of this.items) {
            item.resize(this.stageWidth, this.stageHeight);
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);
        for (let item of this.items) {
            item.update();
            item.draw(this.ctx);
        }

        window.requestAnimationFrame(this.animate.bind(this));
    }

    down(event) {
        let touch = event.changedTouches[0];
        let tmp = new Point(touch.clientX, touch.clientY);

        for (let i = this.items.length - 1; i >= 0; i--) {
            if (this.items[i].isDown) {
                continue;
            }
            if (this.items[i].down(tmp)) {
                this.downs[touch.identifier] = this.items[i];
                this.items.push(this.items.splice(i, 1)[0]);
                break;
            }
        }
    }

    move(event) {
        for (let touch of event.changedTouches) {
            let tmp = new Point(touch.clientX, touch.clientY);
            this.downs[touch.identifier].move(tmp);
        }
    }

    up() {
        let touch = event.changedTouches[0];
        this.downs[touch.identifier].up();
        delete this.downs[touch.identifier];
    }
}

window.onload = () => {
    new App();
}

import { Point } from './point.js';

const WIDTH = 300;
const HEIGHT = 300;

export class Dialog {
    constructor() {
        this.pos = new Point();
        this.prevPos = new Point();
        this.target = new Point();
        this.offset = new Point();
        this.isDown = false;
    }

    resize(stageWidth, stageHeight) {
        this.pos.x = Math.random() * (stageWidth - WIDTH);
        this.pos.y = Math.random() * (stageHeight - HEIGHT);
        this.prevPos = this.pos.clone();
        this.target = this.pos.clone();
        this.offset = new Point();
        this.isDown = false;
    }

    update() {
        this.prevPos = this.pos.clone();

        let tmp = this.target.clone().subtract(this.pos).reduce(0.08);
        this.pos.add(tmp);
    }

    draw(ctx) {
        let center = this.pos.clone().add(this.offset);

        let dx = this.pos.x - this.prevPos.x;

        ctx.save();
        ctx.translate(center.x, center.y);
        ctx.rotate(dx / 1000 * 30);
        ctx.fillStyle = 'yellow';
        ctx.fillRect(-this.offset.x, -this.offset.y, WIDTH, HEIGHT);
        ctx.restore();
    }

    down(point) {
        if (point.collide(this.pos, WIDTH, HEIGHT)) {
            this.isDown = true;
            this.offset = point.clone().subtract(this.pos);
            return true;
        } else {
            return false;
        }
    }

    move(point) {
        if (this.isDown) {
            this.target = point.clone().subtract(this.offset);
        }
    }

    up() {
        this.isDown = false;
    }
}
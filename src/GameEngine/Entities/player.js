export class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 64;
        this.height = 64;

        this.velocity = { x: 0, y: 0 };
        this.drag = 0.9;
        this.SPEED = 500;

        this.isJumping = false;
        this.justJumped = false;
        this.jumpTime = 0;
        this.sizeRatio = 1;
    }

    update(dt) {
        // MOVING LEFT AND RIGHT
        if (this.velocity.x != 0) {
            this.x += this.velocity.x * (1.0 / dt);
            this.velocity.x *= this.drag;
        }

        // MOVING UP AND DOWN
        if (this.velocity.y != 0) this.y += this.velocity.y * (1.0 / dt);
        this.velocity.y *= this.drag;

        // JUMPING
        if (this.isJumping && this.jumpTime <= 1000) {
            this.jumpTime += dt;

            let oldSizeRatio = this.sizeRatio;
            this.sizeRatio = -(Math.pow(this.jumpTime - 500, 2) * 0.000002) + 1.5;
            let newSize = 64 * this.sizeRatio;
            this.width = newSize;
            this.height = newSize;

            let positionAdjust = (this.sizeRatio - oldSizeRatio) * 32;
            this.x -= Math.round(positionAdjust);
            this.y -= Math.round(positionAdjust);
        } else {
            this.isJumping = false;
            this.jumpTime = 0;
            this.width = 64;
            this.height = 64;
        }
    }

    render(display) {
        //Render the player to the screen
        display.drawRectangle(this.x, this.y, this.width, this.height, "#FF0000");
    }

    handleInput(controller) {
        if (controller.up.status && !controller.down.status) {
            //Go down
            this.velocity.y = -this.SPEED;
        } else if (controller.down.status && !controller.up.status) {
            //Go up
            this.velocity.y = this.SPEED;
        }

        if (controller.left.status && !controller.right.status) {
            //Go left
            this.velocity.x = -this.SPEED;
        } else if (controller.right.status && !controller.left.status) {
            //Go right
            this.velocity.x = this.SPEED;
        }

        if (Math.abs(this.velocity.x) + Math.abs(this.velocity.y) >= this.SPEED * 2) {
            this.velocity.x *= 0.75;
            this.velocity.y *= 0.75;
        }

        if (controller.space.status && !this.isJumping && !this.justJumped) {
            this.isJumping = true;
            this.justJumped = true;
        }

        if (!controller.space.status) {
            this.justJumped = false;
        }
    }
}

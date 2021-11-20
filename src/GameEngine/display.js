export class Display {
    constructor(canvas) {
        this.buffer = document.createElement("canvas").getContext("2d");
        this.context = canvas.getContext("2d");
    }

    fill(color) {
        this.buffer.fillStyle = color;
        this.buffer.fillRect(0, 0, this.buffer.canvas.width, this.buffer.canvas.height);
    }

    drawRectangle(x, y, width, height, color) {
        this.buffer.fillStyle = color;
        this.buffer.fillRect(Math.floor(x), Math.floor(y), width, height);
    }

    render() {
        this.context.drawImage(this.buffer.canvas, 0, 0);
    }

    resize(width, height) {
        this.context.canvas.width = Math.floor(width);
        this.context.canvas.height = Math.floor(height);

        this.buffer.canvas.width = Math.floor(width);
        this.buffer.canvas.height = Math.floor(height);

        this.context.imageSmoothingEnabled = false;
    }
}

export class Display {
    buffer: CanvasRenderingContext2D;
    context: CanvasRenderingContext2D;
    constructor(canvas: any) {
        this.buffer = document.createElement("canvas").getContext("2d") as CanvasRenderingContext2D;
        this.context = canvas.getContext("2d");
    }

    fill(color: string) {
        this.buffer.fillStyle = color;
        this.buffer.fillRect(0, 0, this.buffer.canvas.width, this.buffer.canvas.height);
    }

    drawRectangle(x: number, y: number, width: number, height: number, color: string) {
        this.buffer.fillStyle = color;
        this.buffer.fillRect(Math.floor(x), Math.floor(y), width, height);
    }

    drawImage(x: number, y: number, width: number, height: number, imageUrl: string) {
        //TODO
    }

    render() {
        this.context.drawImage(this.buffer.canvas, 0, 0);
    }

    resize(width: number, height: number) {
        this.context.canvas.width = Math.floor(width);
        this.context.canvas.height = Math.floor(height);

        this.buffer.canvas.width = Math.floor(width);
        this.buffer.canvas.height = Math.floor(height);

        this.context.imageSmoothingEnabled = false;
    }
}

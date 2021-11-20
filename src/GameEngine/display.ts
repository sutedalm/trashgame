import { ImageLoader } from "./imageloader";
import { TrashItem } from "./Entities/trash-item";

export class Display {
    buffer: CanvasRenderingContext2D;
    context: CanvasRenderingContext2D;

    private cameraCanvas: CanvasImageSource;
    private cameraCanvasContext: CanvasRenderingContext2D;

    private camDebugCanvas: CanvasImageSource;
    private camDebugCanvasContext: CanvasRenderingContext2D;

    public cameraCanvasWidth: number;
    public cameraCanvasHeight: number;

    private imageLoader: ImageLoader;

    constructor(canvas: any) {
        this.buffer = document.createElement("canvas").getContext("2d") as CanvasRenderingContext2D;
        this.context = canvas.getContext("2d");
        this.context.setTransform(1, 0, 0, -1, 0, this.context.canvas.height);

        this.cameraCanvas = document.querySelector(
            ".handsfree-canvas-video"
        ) as unknown as CanvasImageSource;
        // @ts-ignore
        this.cameraCanvasContext = this.cameraCanvas.getContext("2d");

        this.camDebugCanvas = document.querySelector(
            ".handsfree-hide-when-started-without-pose"
        ) as unknown as CanvasImageSource;
        // @ts-ignore
        this.camDebugCanvasContext = this.camDebugCanvas.getContext("2d");
        this.imageLoader = new ImageLoader(TrashItem.getImagesToLoad());

        this.cameraCanvasWidth = this.camDebugCanvas.width as number;
        this.cameraCanvasHeight = this.camDebugCanvas.height as number;
    }

    fill(color: string) {
        this.buffer.fillStyle = color;
        this.buffer.fillRect(0, 0, this.buffer.canvas.width, this.buffer.canvas.height);
    }

    clear() {
        // this.buffer.clearRect(0, 0, this.buffer.canvas.width, this.buffer.canvas.height);
        this.fill("#000000");

        this.buffer.setTransform(-1, 0, 0, 1, this.context.canvas.width, 0);
        this.buffer.drawImage(this.cameraCanvas, 0, 0);
        this.buffer.drawImage(this.camDebugCanvas, 0, 0);
        this.buffer.setTransform(1, 0, 0, 1, 0, 0);
    }

    drawRectangle(x: number, y: number, width: number, height: number, color: string) {
        this.buffer.fillStyle = color;
        this.buffer.fillRect(Math.floor(x), Math.floor(y), width, height);
    }

    drawImage(x: number, y: number, width: number, height: number, name: string) {
        if (this.imageLoader.isLoaded) {
            this.buffer.drawImage(
                this.imageLoader.getImage(name),
                Math.floor(x),
                Math.floor(y),
                width,
                height
            );
        } else {
            this.drawRectangle(x, y, width, height, "red");
        }
    }

    render() {
        this.context.drawImage(this.buffer.canvas, 0, 0);
    }

    resize(width: number, height: number) {
        this.context.canvas.width = Math.floor(width);
        this.context.canvas.height = Math.floor(height);

        this.buffer.canvas.width = Math.floor(width);
        this.buffer.canvas.height = Math.floor(height);

        /// --- Resizing of camera canvas --- ///

        let cameraWidth = this.cameraCanvasContext.canvas.width;
        let cameraHeight = this.cameraCanvasContext.canvas.height;
        let cameraRatio = cameraHeight / cameraWidth;

        let newCameraWidth = Math.floor(width);
        let newCameraHeight = Math.floor(width * cameraRatio);

        this.cameraCanvasContext.canvas.width = newCameraWidth;
        this.cameraCanvasContext.canvas.height = newCameraHeight;

        this.camDebugCanvasContext.canvas.width = newCameraWidth;
        this.camDebugCanvasContext.canvas.height = newCameraHeight;

        this.cameraCanvasWidth = newCameraWidth;
        this.cameraCanvasHeight = newCameraHeight;

        this.context.imageSmoothingEnabled = false;
    }
}

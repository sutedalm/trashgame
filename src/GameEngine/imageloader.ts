export class ImageLoader {
    private total : number = 0;
    private images = new Map<string, any>();
    public isLoaded : boolean = false;

    constructor(paths: string[]) {
        for(let pth of paths) {
            let img = new Image();
            let url = process.env.PUBLIC_URL + "/img/" + pth
            console.log(url)
            this.images.set(pth, img);
            img.onload = () => {
                console.log(this.total)
                this.total++;
                if(this.total === this.images.size) {
                    this.isLoaded = true;
                }
            }
            img.src = url
        }
    }

    getImage(name: string) {
        return this.images.get(name);
    }
}

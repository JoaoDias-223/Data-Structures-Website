class Drawable {
    static #context;
    static #canvas;

    constructor(context) {
        this.context = context; 
        this.Draw = this.Draw.bind(this);
    }

    Draw(x, y){
        console.log("x: " + x);
        console.log("y: " + y);
    };

    Arc (x, y, radius, startAngle, finalAngle, color){
        this.context.beginPath();
        this.context.arc(x, y, radius, startAngle, finalAngle);
        this.strokeStyle = color;
        this.context.stroke();
        this.context.closePath();
    }

    Line(x1, y1, x2, y2){
        this.context.beginPath();
        this.context.moveTo(x1, y1);
        this.context.lineTo(x2, y2);
        this.context.stroke();
    }

    Text (fontSize=10, fontUnit = "pt", fontType="Arial", x = 0, y = 0, content = "text", offsetX = 0, offsetY = 0) {    
        this.context.font = fontSize + fontUnit + " " + fontType;
        this.context.fillText(
            content,
            x - offsetX,
            y - offsetY,
        );
    }

    static setCanvas(canvas){
        this.#canvas = canvas;
    }

    static setContext(context){
        this.#context = context;
    }

    static getCanvas(){
        return this.#canvas;
    }

    static getContext(){
        return this.#context;
    }
}
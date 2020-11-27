class Drawable {
    static radius = 20;
    static offsetX = 0;
    static offsetY = 0;

    constructor(canvas){
        if (canvas == undefined){
            throw "canvas argument is undefined, please make sure you're passing the correct variable.";
        }

        this.canvas = canvas;
        this.context = canvas.getContext('2d'); 
    }

    Arc = (
        x,
        y,
        radius, 
        startAngle, 
        finalAngle, 
        fillColor, 
        borderColor
    ) => {
        this.context.beginPath();
        
        this.context.lineWidth = 2;
        this.context.strokeStyle = borderColor;
        this.context.fillStyle = fillColor;

        this.context.arc(x, y, radius, startAngle, finalAngle, false);
        this.context.stroke();
        this.context.fill();

        this.context.closePath();
    }

    Line = (
        x1, y1,
        x2, y2
    ) => {
        this.context.beginPath();

        this.context.moveTo(x1, y1);
        this.context.lineTo(x2, y2);
        this.context.stroke();

        this.context.closePath();
    }

    Text = (
        fontSize=10, 
        fontUnit = "pt", 
        fontType="Arial", 
        x = 0, 
        y = 0, 
        content = "text", 
        color = "#000000",
        offsetX = 0, 
        offsetY = 0
    ) => {    
        this.context.beginPath();

        this.context.fillStyle = color;
        this.context.font = fontSize + fontUnit + " " + fontType;
        this.context.textAlign = 'center';
        this.context.fillText(
            content,
            x, //- offsetX,
            y - offsetY,
        );

        this.context.closePath();
    }

    static setCanvas = (canvas) => {
        this.canvas = canvas;
        this.context = canvas.getContext('2d'); 
    }

    static getCanvas = () => {
        return this.canvas;
    }

    static getContext = () => {
        return this.context;
    }

    static setDefault(){
        Drawable.radius = 20;
        Drawable.offsetX = 0;
        Drawable.offsetY = 0;
    }
}

export default Drawable;
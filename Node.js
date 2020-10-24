//import './Drawable'

class Node extends Drawable {
    static #radius = 15;

    constructor(context, value=""){
        super(context);
        this.drawable = {};
        this.concept = {value: value};

        this.setCircle(-50, -50);
        this.setText(-50, -50);

        this.Draw = this.Draw.bind(this);
        this.Update = this.Update.bind(this);
        this.getDrawable = this.getDrawable.bind(this);
        this.getConcept = this.getConcept.bind(this);
        this.setCircle = this.setCircle.bind(this);
        this.setText = this.setText.bind(this);
    }

    setCircle(x, y, circleColor = "black"){
        
        let circle = {};
        
        circle.x = x;
        circle.y = y;
        circle.radius = Node.#radius;
        circle.bounds = {
            x: {
                min: circle.x - circle.radius,
                max: circle.x + circle.radius
            },
            y: {
                min: circle.y - circle.radius,
                max: circle.y + circle.radius
            }               
        };
        circle.startAngle = 0;
        circle.finalAngle = 2 * Math.PI;
        circle.color = circleColor;

        this.drawable.circle = circle;
    }

    setText(x, y, textColor = "black"){
        let fontPoint = (Node.#radius*.65) * 3/4;
        let text = {}

        text.x = x;
        text.y = y;
        text.value = this.concept.value;
        text.font = "Arial";
        text.size = fontPoint;
        text.color = textColor;
        text.unit = "pt";
        text.offsetX  = fontPoint/3;
        text.offsetY = fontPoint/2; 

        this.drawable.text = text;
    }

    Draw(){
        this.Arc(this.drawable.circle.x, this.drawable.circle.y, this.drawable.circle.radius, this.drawable.circle.startAngle, this.drawable.circle.finalAngle, this.drawable.circle.color);
        this.Text(this.drawable.text.size, this.drawable.text.unit, this.drawable.text.font, this.drawable.text.x, this.drawable.text.y, this.drawable.text.value, this.drawable.text.offsetX, -this.drawable.text.offsetY);
    }

    Draw(x, y, circleColor = "black", textColor = "black"){
        this.setCircle(x, y, circleColor);
        this.Arc(this.drawable.circle.x, this.drawable.circle.y, this.drawable.circle.radius, this.drawable.circle.startAngle, this.drawable.circle.finalAngle, this.drawable.circle.color);

        this.setText(x, y, textColor);
        this.Text(this.drawable.text.size, this.drawable.text.unit, this.drawable.text.font, this.drawable.text.x, this.drawable.text.y, this.drawable.text.value, this.drawable.text.offsetX, -this.drawable.text.offsetY);
    }

    Update() {
        this.Arc(this.drawable.circle.x, this.drawable.circle.y, this.drawable.circle.radius, this.drawable.circle.startAngle, this.drawable.circle.finalAngle, this.drawable.circle.color);
        this.Text(this.drawable.text.size, this.drawable.text.unit, this.drawable.text.font, this.drawable.text.x, this.drawable.text.y, this.drawable.text.value, this.drawable.text.offsetX, -this.drawable.text.offsetY);
    }

    getDrawable(){
        return this.drawable;
    }

    getConcept(){
        return this.concept;
    }

    static getRadius(){
        return this.#radius;
    }

}
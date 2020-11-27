import Drawable from '../base_classes/Drawable.js'

class Node extends Drawable{
    constructor(
        canvas=undefined,
        value = undefined,
        x=undefined, 
        y=undefined,
        nodeDistance = undefined,)
    {
        super(canvas);

        const xNumber = this.checkIfIsNumber(x);
        const yNumber = this.checkIfIsNumber(y);
        const valueNumber = this.checkIfIsNumber(value);
        const childDistance = this.checkIfIsNumber(nodeDistance, 1);

        this.drawable = {
            position: {
                x: xNumber,
                y: yNumber,
            },
            childDistance: childDistance,
            circle: undefined,
            text: undefined,
        };
        this.concept = {
            father: undefined,
            rightChild: undefined,
            leftChild: undefined,
            value: valueNumber,

            isRoot: false,
            isLeaf: false,
            
            isFather: false,
            isRightChild: false,
            isLeftChild: false,

            nodeLevel: undefined,
            index: undefined,
        };

        this.setCircle(xNumber, yNumber);
        this.setText(xNumber, yNumber, valueNumber.toString());

    }

    checkIfIsNumber = (number, type=0) => {
        if (number == undefined){
            return 0;
        }

        if (type == 0){
            if (parseInt(number) == NaN) {
                return 0;
            }

            return parseInt(number);
        }

        if (type == 1){
            if (parseFloat(number) == NaN) {
                return 0;
            }

            return parseFloat(number);
        }
    }

    setCircle = (x, y, circleFillColor="#ffffff", circleBorderColor="#000000") => {
        
        let circle = {};
        
        circle.x = x
        circle.y = y
        circle.radius = Drawable.radius;
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
        circle.fillColor = (circleFillColor == undefined) ? "#ffffff" : circleFillColor;
        circle.borderColor = (circleBorderColor == undefined) ? "#000000" : circleBorderColor;

        this.drawable.circle = circle;
    }

    setText = (x, y, value = undefined, textColor = "#000000") => {
        let fontPoint = (Drawable.radius*.65) * 3/4;
        let text = {}

        text.x = x
        text.y = y

        text.value = this.concept.value.toString();

        if (value != undefined){
            text.value = value;
        }

        text.font = "Arial";
        text.size = fontPoint;
        text.color = (textColor == undefined) ? "#000000" : textColor;
        text.unit = "pt";
        text.offsetX  = fontPoint/3;
        text.offsetY = fontPoint/2; 

        this.drawable.text = text;
    }

    draw = () => {
        this.Arc(
            this.drawable.circle.x + Drawable.offsetX,
            this.drawable.circle.y + Drawable.offsetY,
            this.drawable.circle.radius,
            this.drawable.circle.startAngle, 
            this.drawable.circle.finalAngle, 
            this.drawable.circle.fillColor,
            this.drawable.circle.borderColor,
        );

        this.Text(
            this.drawable.text.size, 
            this.drawable.text.unit, 
            this.drawable.text.font, 
            this.drawable.text.x + Drawable.offsetX, 
            this.drawable.text.y + Drawable.offsetY, 
            this.drawable.text.value, 
            this.drawable.text.color,
            this.drawable.text.offsetX, 
            -this.drawable.text.offsetY);
    }

    drawLine = (
        x1, y1,
        x2, y2,
    ) => {
        this.Line(x1, y1, x2, y2);
    }

    update = () => {
        this.setCircle(
            this.drawable.position.x,
            this.drawable.position.y,
            this.drawable.circle.fillColor,
            this.drawable.circle.borderColor,
        );

        this.setText(
            this.drawable.position.x,
            this.drawable.position.y,
            this.concept.value,
            this.drawable.text.color,
        );
    }

    getDrawable = () => {
        return this.drawable;
    }

    getConcept = () => {
        return this.concept;
    }
}

export default Node;
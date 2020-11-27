import Drawable from '../base_classes/Drawable.js';

class Node{
    constructor(canvas, x, y, value, width, height, next, prev, color){
        this.draw = this.draw.bind(this);
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.x = x;
        this.y = y;
        this.value = value;
        this.width = width;
        this.height = height;
        this.next = next;
        this.prev = prev;
        this.color = color;
        this.txt_x = this.x + this.width/2 - 9;
        this.txt_y = this.y + this.height/2 + 6;
    }
    draw = () => {
        this.ctx.beginPath();
        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(
            this.x + Drawable.offsetX,
            this.y + Drawable.offsetY, 
            this.width, 
            this.height);
        this.ctx.fill();
        this.ctx.beginPath();
        this.ctx.font = '20px Georgia';
        this.ctx.fillStyle = 'black';
        //this.ctx.textAlign = 'center';        
        console.log('txt_x = ', this.txt_x, 'txt_y = ', this.txt_y);
        this.ctx.fillText(this.value, this.txt_x, this.txt_y);
        this.ctx.closePath();
    }

}

export default Node;







import React, { Component } from 'react';
import Canvas from 'react-native-canvas';

class Drawable{

    constructor(Canvas, x, y, color){
        this.Canvas = Canvas;
        this.x = x;
        this.y = y;
        this.color = color;
    }
    
    draw(){
    }

}


export default Drawable;




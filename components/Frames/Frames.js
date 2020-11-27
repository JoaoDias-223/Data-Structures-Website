import React, { Component } from 'react';
import Canvas from 'react-native-canvas';
import Drawable from './Canvas_';


class NodeFrame{

    constructor(canvas, x, y, value, father, rchild, lchild, search=false, alpha=Math.PI/15, opening_factor=2,
        radius=18, std_dist=100, proximity_factor=10, color='#a3a39b', leaf=true){
        this.draw = this.draw.bind(this);
        this.Canvas = canvas;
        this.ctx = canvas.getContext('2d');
        //this.mult = 1.
        this.x = x;
        this.y = y;
        this.alpha = alpha;
        this.opening_factor = opening_factor;
        this.is_lechild = false;
        this.is_rchild = false;
        this.rchild = rchild;
        this.lchild = lchild;
        this.father = father;
        this.radius = radius;
        this.std_dist = std_dist;
        this.proximity_factor = proximity_factor;
        //this.x_rchild = x + Math.cos(this.alpha)*this.std_dist;
        //this.y_rchild = y + Math.sin(this.alpha)*this.std_dist;
        //this.x_lchild = x - Math.cos(this.alpha)*this.std_dist;
        //this.y_lchild = y + Math.sin(this.alpha)*this.std_dist;
        this.color = color;
        this.value = value;
        this.leaf = leaf;
        this.search = search;
        this.line_pos_x = x;
        this.line_pos_y = y;
        this.level = 0;
    }

    draw(){
        this.ctx.beginPath();
        this.ctx.fillStyle = this.color;
        this.ctx.arc(this.x, this.y, this.radius, 0, 2*Math.PI);
        this.ctx.closePath();
        this.ctx.fill();
        this.ctx.beginPath();
        this.ctx.font = '20px Georgia';
        this.ctx.fillStyle = 'black';
        this.ctx.textAlign = 'center';
        this.ctx.fillText(this.value, this.x, this.y+5);
        this.ctx.closePath();
        
    }

}


export default NodeFrame;


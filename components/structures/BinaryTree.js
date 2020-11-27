import React, {Component, useState} from 'react';
import {Text, View, Dimensions, TextInput} from 'react-native';
import Canvas from 'react-native-canvas';
//import styleOf from './styles/styles';
import NodeFrame from '../Frames/Frames';


class BinaryTree{
    constructor(canvas){
        this.canvas = canvas;
        this.root = null;
        this.init_x = canvas.width/2;
        this.init_y = 50;
        this.nodes = [];
        this.nodes_values = [];
        this.ctx = this.canvas.getContext('2d');
        this.level = -1;
        //this.k = 20;
        //this.pos = [];
        this.mult = 1.;
        this.p = 10;
        this.init_alpha = Math.PI/30;
    }

    insert = (value, flag=false, search=false) => {
        if (search){
            console.log("inserção de busca? ", search);
        }
        // precisa atualizar mais de uma vez!
        this.mult = 1;
        //console.log(this.nodes.length);
        let s = false;
        if (this.nodes.length == 0){
            if (search){
                s = true;
            }
            //console.log('primeira inserção');
            let newNode = new NodeFrame(canvas=this.canvas, x=this.init_x, y=this.init_y, value=value,
                 father=null, rchild=null, lchild=null, search=s);

            if (flag){
                this.mult += 0.5;
            }
            this.root = newNode;
            //this.root.color = 'red';
            this.nodes_values.push(newNode.value);
            
            this.nodes.push(newNode);
        }
        else{
            let ant = null;
            let it = this.root;
            this.level = 0;
            while(it != null){
                if (value > it.value){
                    ant = it;
                    it = it.rchild;
                }
                else{
                    ant = it;
                    it = it.lchild;
                }
                this.level++;
            }
            if (value > ant.value){
                //filho da direita
                let q, dist=120, x, y, f=1.1;
                if (flag){
                    this.mult += 0.5;
                }
                if (ant == this.root){
                    alpha = (this.init_alpha)+(this.init_alpha)*f*(this.level);
                }
                else{
                    alpha = (this.init_alpha)+(this.init_alpha)*f*(this.level+this.p);
                }
                if (alpha > Math.PI/3){
                    alpha = Math.PI/3;
                }
                dist = ant.std_dist-ant.proximity_factor*this.level*this.mult;
                if(dist < ant.radius*2){
                    dist = ant.radius*2*this.mult;
                }
                x = ant.x + Math.cos(alpha)*dist;
                y = ant.y + Math.sin(alpha)*dist;
                let s = false;
                if (search){
                    s = true;
                }
                
                ant.rchild = new NodeFrame(canvas=this.canvas, x=x, y=y, value=value, father=ant, rchild=null, 
                    lchild=null, search=s, alpha=alpha, std_dist=dist);
                ant.rchild.is_rchild = true;
                ant.leaf = false;
                if (flag){
                    ant.rchild.mult -= 0.5;
                }
                console.log('o ', ant.rchild.value, "R é o objeto de busca? ", ant.rchild.search);
                this.nodes_values.push(ant.rchild.value);
                this.nodes.push(ant.rchild);
            }
            else{
                // filho da esquerda
                let alpha, dist=120, x, y, f=1.1;
                if (flag){
                    this.mult += 0.5;
                }
                if (ant == this.root){
                    alpha = (this.init_alpha)+(this.init_alpha)*f*(this.level);
                }
                else{
                    alpha = (this.init_alpha)+(this.init_alpha)*f*(this.level+this.p+5);
                }
                if (alpha > Math.PI/3){
                    alpha = (Math.PI/3);
                }
                //onsole.log('alpha antes = ', ant.alpha);
                dist = ant.std_dist-ant.proximity_factor*this.level*this.mult;
                if(dist < ant.radius*2){
                    dist = ant.radius*2*this.mult;
                }
                x = ant.x - Math.cos(alpha)*dist;
                y = ant.y + Math.sin(alpha)*dist;
                let s = false;
                if (search){
                    s = true;
                }
                ant.lchild = new NodeFrame
                    (canvas=this.canvas, x=x, y=y, value=value, father=ant, rchild=null, lchild=null, search=s,
                         alpha=alpha, std_dist=dist);
                
                //console.log('alpha depois = ', ant.lchild.alpha);
                //ant.lchild.father = temp;
                ant.lchild.is_lchild = true;
                ant.leaf = false;
                this.nodes_values.push(ant.lchild.value);
                console.log('o ', ant.lchild.value, "L é o objeto de busca? ", ant.lchild.search);
                this.nodes.push(ant.lchild);
            }
        }
    }

    clear = () => {
        this.nodes.length = 0;
        this.nodes_values.length = 0;
    }

    search = (value) => {
        console.log('indice de value = ', this.nodes_values.indexOf(value));
        //let flag;
        if (this.nodes_values.indexOf(value) != -1){
            this.nodes[this.nodes_values.indexOf(value)].search = true;


            // gambiarra da gambiarra se der tempo eu melhoro kk
            console.log('this.bt.nodes[this.bt.nodes_values.indexOf(value)].search = ', this.nodes[this.nodes_values.indexOf(value)].search);
            let temp_nodes = this.copy_nodes(true, this.nodes_values.indexOf(value));
            //temp_nodes[this.nodes_values.indexOf(value)].search = true;
            this.clear();
            for (var i=0; i < temp_nodes.length; i++) {
                console.log('i = ', i);
                console.log('temp_nodes[i].search antes de chamar o insert = ', temp_nodes[i].search);
                if (temp_nodes[i].search) {
                    this.insert(temp_nodes[i].value, false, true);
                }
                else {
                    this.insert(temp_nodes[i].value, false, false);
                }
            }

            //console.log();
            //this.nodes[this.nodes_values.indexOf(value)].draw();
            //this.nodes[this.nodes_values.indexOf(value)].color = temp;
            this.draw();
            setTimeout(() => {
                temp_nodes = this.copy_nodes();
                this.clear();
                for (var i=0; i < temp_nodes.length; i++){
                    this.insert(temp_nodes[i].value);
                }
                this.draw();
                console.log("passaram 3 sec?");
            }, 3000);

            
            //this.draw();
            //if (this.nodes[this.nodes_values.indexOf(value)].color == '#ebe71c'){
             //   alert("trocou de cor mas não desenhou");
            //}
                       
            return true;
        }

        return false;
    }

    remove = (value) => {

        base = (value) => {
            let removed = this.nodes.splice(this.nodes_values.indexOf(value), 1);
            let temp = this.copy_nodes();
            this.clear();
            for (var i=0; i < temp.length; i++){
                this.insert(temp[i].value);
            }

            if (!removed.length){
                return false;
            }

            return true;
        }

        // logica do maior valor menor

        let ant = null;
        let it = this.root;

        while (it != null){
            if (it.value == value){
                //console.log ('achou o numero ', it.value);
                if (it.lchild != null){
                    var mvm = null;
                    var it_mvm = it.lchild;
                    while (it_mvm != null){
                        mvm = it_mvm;
                        // verificar?
                        it_mvm = it_mvm.rchild;
                    }                
                    this.nodes.splice(this.nodes_values.indexOf(value), 1, mvm);                                  
                    this.nodes.splice(this.nodes_values.indexOf(mvm.value), 1);
                    this.nodes_values.splice(this.nodes_values.indexOf(value), 1, mvm.value);
                    this.nodes_values.splice(this.nodes_values.indexOf(mvm.value), 1);
                }
                else if (it.rchild != null){
                    var mvm = null;
                    var it_mvm = it.rchild;
                    while (it_mvm != null){
                        mvm = it_mvm;
                        // verificar?
                        it_mvm = it_mvm.lchild;
                    }                    
                    this.nodes.splice(this.nodes_values.indexOf(value), 1, mvm);                                   
                    this.nodes.splice(this.nodes_values.indexOf(mvm.value), 1);
                    this.nodes_values.splice(this.nodes_values.indexOf(value), 1, mvm.value);
                    this.nodes_values.splice(this.nodes_values.indexOf(mvm.value), 1);
                }
                else{
                    return base();
                }
                let temp = this.copy_nodes();
                this.clear();
                //this.nodes.length = 0;
                this.nodes_values.length = 0;
                for (var i=0; i < temp.length; i++){
                    this.insert(temp[i].value);
                }
                break;
            }
            else if (value > it.value){
                // direita
                ant = it;
                it = it.rchild;
            }
            else{
                // esquerda
                ant = it;
                it = it.lchild;
            }
        }

        if (it != null){
            return true;
        }

        return false;
    }

    calc_dist = (x1, x2, y1, y2) => {
        return Math.sqrt(Math.pow(x2-x1, 2)+Math.pow(y2-y1, 2));
    }


    verify_colision = () => {

        for (var i=0; i < this.nodes.length-1; i++){
            for (var j=i+1; j < this.nodes.length; j++){
                
                if (this.calc_dist(this.nodes[i].x, this.nodes[j].x, this.nodes[i].y, this.nodes[j].y) <= this.nodes[i].radius*2){
                    console.log('Colidiu!');
                    return true;
                }
                else if (this.nodes[j].value > this.nodes[i].value && this.nodes[j].x <= this.nodes[i].x){
                    console.log('Cruzou!');
                    return true;
                }
                else if (this.nodes[j].value < this.nodes[i].value && this.nodes[j].x >= this.nodes[i].x){
                    console.log('Cruzou!');
                    return true;
                }
            }
        }

        return false;
    }

    copy_nodes = (search=false, index=-1) => {

        let s = false;
        if (search){
            s = true;
        }
        let new_nodes = [];
        // *copiar o mult
        for (var i=0; i < this.nodes.length; i++){
            if (i == index){
                new_node = new NodeFrame(canvas=this.canvas, x=this.nodes[i].x, y=this.nodes[i].y, value=this.nodes[i].value, father=this.nodes[i].father, rchild=this.nodes[i].rchild, 
                    lchild=this.nodes[i].lchild, search=s, alpha=this.nodes[i].alpha, std_dist=this.nodes[i].dist);
                new_nodes.push(new_node);
            }
            else{
                new_node = new NodeFrame(canvas=this.canvas, x=this.nodes[i].x, y=this.nodes[i].y, value=this.nodes[i].value, father=this.nodes[i].father, rchild=this.nodes[i].rchild, 
                    lchild=this.nodes[i].lchild, search=false, alpha=this.nodes[i].alpha, std_dist=this.nodes[i].dist);
                new_nodes.push(new_node);
            }
        }

        return new_nodes;

    }

    draw_resize = (k) => {
        var txt = 'dist = ';
        var txt2 = 'mult = ';
        for (var i=0; i < this.nodes.length; i++){
            txt += String(this.nodes[i].std_dist) + ' ';
            txt2 += String(this.nodes[i].mult) + ' ';
        }

        console.log(txt);
        console.log(txt2);
        txt = 'dist = ';
        txt2 = 'mult = ';

        let temp = this.copy_nodes();
        
        this.clear();
        console.log("nodes = ", temp[0].value);

        for (var i=0; i < temp.length; i++){ 
            console.log("entrou no forzin!");
            //temp[i].mult -= k;
            this.insert(temp[i].value, true);
        }

        for (var i=0; i < this.nodes.length; i++){
            txt += String(this.nodes[i].radius) + ' ';
            txt2 += String(this.nodes[i].mult) + ' ';
        }

        console.log(txt);
        console.log(txt2);
    }

    set_colors = () =>{
        
    }

    draw = () => {

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        if (this.verify_colision()){
            this.draw_resize(0.2);
        }        
        for(var i=0; i <  this.nodes.length; i++){
            if(this.nodes[i].father != null){
                this.nodes[i].ctx.moveTo(this.nodes[i].x, this.nodes[i].y);
                this.nodes[i].ctx.fillStyle = this.nodes[i].color;
                this.nodes[i].ctx.lineTo(this.nodes[i].father.x, this.nodes[i].father.y);
                this.nodes[i].ctx.stroke();
            }
        }

        for(var i=0; i <  this.nodes.length; i++){
            //console.log("");
            if(i == 0){
                if (this.nodes[i].search){
                    console.log("vai pintar o ", this.nodes[i].value, "? ", this.nodes[i].search);
                    this.nodes[i].color = '#e8e417';
                    this.nodes[i].draw();
                }
                else{
                    this.nodes[i].draw();
                }
            }
            else{
                console.log("vai pintar o ", this.nodes[i].value, "? ", this.nodes[i].search);
                if (this.nodes[i].search){
                    console.log("pintou?");
                    this.nodes[i].color = '#e8e417';
                    //this.nodes[i].color = '#825e10';
                }
                else if (this.nodes[i].leaf){
                    console.log("pintou ERRADO?");
                    this.nodes[i].color = '#245c0a';
                }
                else if (this.nodes[i].father == null){
                    this.nodes[i].color = '#75736f';
                }                
                else{
                    this.nodes[i].color = '#825e10';
                }
                this.nodes[i].draw();
            }
            
        }
    }
}

export default BinaryTree;









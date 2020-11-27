import Node from '../structures/Node.js';
import Drawable from '../base_classes/Drawable.js'

class Heap {
    constructor(canvas){
        this.canvas = canvas;
        this.context = canvas.getContext('2d');

        this.drawingConfig = {
            initialX: canvas.width/2,
            initialY: 50,
            standardAngle: Math.PI/30,
            standardDistance: 30,
            distanceMultiplier: 1,
            angleMultiplier: 10,
            resizeFactor: 0.1,

            rootColor: '#75736f',
            branchColor: '#825e10',
            leafColor: '#245c0a',
            backgroundColor: '#ffffff',
            searchNodeColor: 'yellow',
        };

        this.root = null;
        this.level = -1;
        this.nodes = [];
        this.size = 0;
    }

    leftChild = (index) => {
        return 2 * index + 1;
    }

    rightChild = (index) => {
        return 2 * index + 2;
    }

    parent = (index) => {
        return parseInt((index - 1)/2);
    }

    lastParent = () => {
        if (this.size <= 1) {
            return -1;
        }

        return this.parent(this.size - 1);
    }

    sift = (index) => {
        if (index > this.lastParent()) {
            return;
        }

        let biggestChild = this.leftChild(index);

        if ( (this.rightChild(index) < this.size) && (this.nodes[this.rightChild(index)].concept.value > this.nodes[biggestChild].concept.value) )
        {
            biggestChild = this.rightChild(index);
        }

        //console.log(`[${biggestChild}] - ${this.nodes[biggestChild].concept.value}  index: ${index}`)
        if (this.nodes[biggestChild].concept.value > this.nodes[index].concept.value) {
            this.swap(biggestChild, index);
            this.nodes[biggestChild].drawable.circle.borderColor = this.checkColor(this.nodes[biggestChild]);
            this.nodes[index].drawable.circle.borderColor = this.checkColor(this.nodes[index]);
            this.nodes[biggestChild].update();
            this.nodes[index].update();
            this.sift(biggestChild);
        }
    }

    swap = (first, second) => {
        let temp = this.nodes[first].concept.value;
        this.nodes[first].concept.value = this.nodes[second].concept.value;
        this.nodes[second].concept.value = temp;

        temp = this.nodes[first].drawable.text.value;
        this.nodes[first].drawable.text.value = this.nodes[second].drawable.text.value;
        this.nodes[second].drawable.text.value = temp;
    }

    makeHeap = () => {
        console.log("heap's makeHeap() called");

        this.print();

        for(let i = this.lastParent(); i >= 0; i--) {
            this.sift(i);
        }

        this.print();
        this.update();
    }

    setArray = (array) => {
        this.nodes = array;
        this.size = this.nodes.length;
        this.makeHeap();
    }

    insert = (value) => {
        if (this.root == undefined){
            let node = new Node(
                this.canvas,
                value,
                this.drawingConfig.initialX,
                this.drawingConfig.initialY,
                this.drawingConfig.standardDistance,
            );
            
            this.root = node;
            node.concept.isRoot = true;
            node.concept.isLeaf = true;
            node.drawable.circle.borderColor = this.checkColor(node);

            this.nodes.push(node);
            this.size++;

            return;
        }

        let node = new Node(
            this.canvas,
            value,
            this.drawingConfig.initialX,
            this.drawingConfig.initialY,
            this.drawingConfig.standardDistance,
        );

        this.nodes.push(node);
        this.size++;

        let parentNodeIndex = this.parent(this.size-1);
        let parentNode = this.nodes[parentNodeIndex];
        node.drawable.position.y = parentNode.drawable.position.y + this.drawingConfig.initialY;

        parentNode.concept.isLeaf = false;
        parentNode.concept.isFather = true;

        node.concept.isLeaf = true;
        node.concept.father = parentNode;
        node.drawable.childDistance = parentNode.drawable.childDistance/2;
        
        if (this.leftChild(parentNodeIndex) == this.size-1){
            parentNode.concept.leftChild = node;
            node.concept.isLeftChild = true;
            node.drawable.position.x = parentNode.drawable.position.x - parentNode.drawable.childDistance;
        }
        else{
            parentNode.concept.rightChild = node;
            node.concept.isRightChild = true;
            node.drawable.position.x = parentNode.drawable.position.x + parentNode.drawable.childDistance;
        }

        let i;

        for(i = this.lastParent(); i > 0; i = this.parent(i)) {
            this.sift(i);
        }

        this.sift(0);
        
        return true;
    }

    remove = () => {
        if (this.nodes.length == 0) {
            return [-1, false];
        }

        this.swap(0, this.nodes.length-1);

        this.size--;
        this.sift(0);
        let num = this.nodes[this.nodes.length - 1];

        this.nodes.pop();

        if (this.nodes.length == 0){
            this.root = undefined;
        }

        return [num, true];
    }

    clear = () => {
        this.setDefaultDrawingConfiguration();
        this.root = undefined;
        this.nodes = [];
    }

    static convertToNodeArray = (context, array) => {
        let nodeArray = [];

        for (let i = 0; i < array.length; i++) {
            let node = new Node(context, array[i]);
            nodeArray.push(node);
        }

        return nodeArray;
    }

    calculateDistanceBetweenNodes = (x1, x2, y1, y2) => {
        return Math.sqrt(Math.pow(x2-x1, 2)+Math.pow(y2-y1, 2));
    }

    verifyColision = () => {

        for (let i = 0; i < this.nodes.length-1; i++){
            for (let j = i + 1; j < this.nodes.length; j++){
                if (i == j){
                    continue;
                }

                let collided = false;
                let distanceBetweenNodes = this.calculateDistanceBetweenNodes(
                    this.nodes[i].drawable.position.x, 
                    this.nodes[j].drawable.position.x, 
                    this.nodes[i].drawable.position.y, 
                    this.nodes[j].drawable.position.y,
                );
                let nodeDiameter = Drawable.radius * 2;

                //Colisão de Nós
                if (distanceBetweenNodes <= nodeDiameter){
                    collided = true;
                }

                if (collided)
                    return true;
            }
        }

        return false;
    }

    copyNodes = () => {

        let newNodes = [];
        // *copiar o mult
        for (let i = 0; i < this.nodes.length; i++){
            let node = new Node(
                this.canvas,
                this.nodes[i].concept.value,
                this.nodes[i].drawable.position.x, 
                this.nodes[i].drawable.position.y, 
                this.nodes[i].drawable.childDistance,
            );

            newNodes.push(node);
        }

        return newNodes;

    }

    checkColor = (node) => {
        if (node.concept.isLeaf){
            return this.drawingConfig.leafColor;
        }
        else if (node.concept.isRoot){
            return this.drawingConfig.rootColor;
        }
        else{
            return this.drawingConfig.branchColor;
        }
    }

    setNewStandardDistance = (node, distance) => {
        if (node == undefined){
            return;
        }
        
        if (node.concept.isRightChild){
            node.drawable.position.x = node.concept.father.drawable.position.x + distance*2;
        }
        else if (node.concept.isLeftChild){
            node.drawable.position.x = node.concept.father.drawable.position.x - distance*2;
        }
            
        node.drawable.childDistance = distance;
        node.update();

        this.setNewStandardDistance(node.concept.leftChild, distance/2);
        this.setNewStandardDistance(node.concept.rightChild, distance/2);

        return;
    }


    resizeTree = (resizeFactor = undefined) => {

        if (resizeFactor != undefined && parseFloat(resizeFactor) != NaN){
            this.drawingConfig.distanceMultiplier += resizeFactor;
        }
        else{
            this.drawingConfig.distanceMultiplier += 1;
        }

        this.drawingConfig.standardDistance += this.drawingConfig.standardDistance * this.drawingConfig.distanceMultiplier;

        this.setNewStandardDistance(this.root, this.drawingConfig.standardDistance);
    }

    pushToArray = (node) => {
        this.nodes.push(node);
        this.size++;
    }

    print = () => {
        let msg = this.toString();
        console.log(msg);
    }

    toString = () => {
        let msg = "[";
        for (let i = 0; i < this.nodes.length; i++) {
            msg += this.nodes[i].concept.value;

            if (i < this.nodes.length-1) {
                msg += ", ";
            }
        }
        msg += "]\n";

        return msg;
    }

    getSize = () => {
        return this.nodes.length;
    }

    getNode = (index) => {
        if (index < this.nodes.length && index >= 0) {
            return [this.nodes[index], true];
        }

        return [this.nodes[0], false];
    }

    update = () => {
        console.log("Heap update() called");

        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

        for (let node of this.nodes) {
            node.update();
        }
    }

    drawLines = () => {
        for(let i=0; i < this.nodes.length; i++){
            if(this.nodes[i].concept.father != undefined){
                this.context.moveTo(
                    this.nodes[i].drawable.position.x + Drawable.offsetX, 
                    this.nodes[i].drawable.position.y + Drawable.offsetY
                );
                this.context.fillStyle = this.nodes[i].drawable.circle.fillColor;
                this.context.lineTo(
                    this.nodes[i].concept.father.drawable.position.x + Drawable.offsetX,
                    this.nodes[i].concept.father.drawable.position.y + Drawable.offsetY
                );
                this.context.stroke();
            }
        }
    }

    updateAndDraw = () => {
        while(this.verifyColision() == true){
            this.resizeTree(this.drawingConfig.resizeFactor);
        }
        
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawLines();

        for (let node of this.nodes) {
            node.update();
            node.draw();
        }
    }

    draw = () => {
        for (let node of this.nodes) {
            node.draw();
        }
    }

    setDefaultDrawingConfiguration = () => {
        this.drawingConfig = {
            initialX: this.canvas.width/2,
            initialY: 50,
            standardAngle: Math.PI/30,
            standardDistance: 30,
            distanceMultiplier: 1,
            angleMultiplier: 10,
            resizeFactor: 0.1,

            rootColor: '#75736f',
            branchColor: '#825e10',
            leafColor: '#245c0a',
            backgroundColor: '#ffffff',
            searchNodeColor: 'yellow',
        };
    }
}

export default Heap;
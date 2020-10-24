//import './Heap'
//import './Node'

const canvas = document.getElementById("canvas");
const canvasLeft = canvas.offsetLeft + canvas.clientLeft;
const canvasTop = canvas.offsetTop + canvas.clientTop;
const context = canvas.getContext('2d');
Drawable.setCanvas(canvas);
Drawable.setContext(context);

const width = 1000;
const height = 600;

let circles = [];
let i = 0;

context.beginPath();
context.rect(0, 0, width, height);
context.stroke();

function click(event) {
    let x = event.pageX - canvasLeft,
    y = event.pageY - canvasTop;

    if ((x < 0 || x > width) || (y < 0 || y > height)){
        console.log("Click out of bounds!");
        return;
    }
    else {
        let collide = false;

        for (let circle of circles){
            let dict =  circle.getDrawable().circle;

            collide =
            NodeCollision(
                {x: x, y: y, radius: Node.getRadius()},
                {x: dict.x, y: dict.y, radius: dict.radius}
            ) 
            || CanvasCollision(
                {x: x, y: y, radius: Node.getRadius()},
                {x1:0, y1:0, x2:width, y2:height}
            );

            if (collide){
                break;
            }
        }

        if (collide){
            console.log("There was a collision!");
            return;
        }
    }

    let circle = new Node(context, i);
    circles.push(circle);

    circle.Draw(x, y);

    i++;
}

function NodeCollision(first, second){
    let diffRadius = first.radius - second.radius;
    let sumRadius = first.radius + second.radius;
    let dist = Math.sqrt(Math.pow((first.x - second.x), 2) + Math.pow((first.y - second.y), 2))

    if (dist >= diffRadius && dist <= sumRadius){
        return true;
    }

    return false;
}

function CanvasCollision(circle, rect){
    if ((circle.x - circle.radius < rect.x1 || circle.x + circle.radius > rect.x2)
    || (circle.y - circle.radius < rect.y1 || circle.y + circle.radius > rect.y2)){
        return true;
    }

    return false;
}

let array = [1, 2, 3, 3, 2, 6, 10, 8, 7];
let nodeArray = Heap.convertToNodeArray(context, array);
let heap = new Heap();
//heap.setArray(nodeArray);
//heap.print();
//heap.insert(new Node(context, 9));
//heap.insert(new Node(context, 0));
heap.print();

// x_growth = parseInt(width/(2*treeHeight));
// y_growth = parseInt((2 * treeHeight * Node.getRadius()));
// treeHeight = Math.ceil(Math.log2(circles.length + 1));
// tree_growth = 2**tree_height;
let start_x = 0, start_y = 0, previous = 0, treeHeight = 0, x_growth = 0, y_growth = 0;

function addNodeToHeap(){
    let value = parseInt(document.getElementById("node_value").value);
    let node = new Node(context, value);
    heap.insert(node);

    previous = treeHeight;
    treeHeight = Math.ceil(Math.log2(heap.getSize() + 1))

    x_growth = 1/(2*treeHeight);
    y_growth = parseInt((2 * treeHeight * Node.getRadius()));

    let lastParent = heap.lastParent();
    let [lastParentNode, result] = heap.getNode(lastParent);

    if (lastParent < 0) {
        node.Draw(width/2, y_growth);
    }
    else{
        let rightChild = heap.rightChild(lastParent);

        if (rightChild < heap.getSize()){
            node.Draw(lastParentNode.drawable.circle.x + parseInt(lastParentNode.drawable.circle.x * x_growth), y_growth);
        }
        else{
            node.Draw(lastParentNode.drawable.circle.x - parseInt(lastParentNode.drawable.circle.x * x_growth), y_growth);
        }
    }

    i++;

    console.log("size: %d", heap.getSize());
}

function addNodeToArray(){
    let value = parseInt(document.getElementById("node_value").value);
    let node = new Node(context, value);
    heap.pushToArray(node);

    previous = treeHeight;
    treeHeight = Math.ceil(Math.log2(heap.getSize() + 1))

    x_growth = parseInt(width*2/(2*treeHeight));
    y_growth = parseInt((2 * treeHeight * Node.getRadius()));

    let lastParent = heap.lastParent();
    let [lastParentNode, result] = heap.getNode(lastParent);

    if (lastParent < 0) {
        node.Draw(width/2, y_growth);
    }
    else{
        let rightChild = heap.rightChild(lastParent);

        if (rightChild < heap.getSize()){
            node.Draw(lastParentNode.drawable.circle.x + x_growth, y_growth);
        }
        else{
            node.Draw(lastParentNode.drawable.circle.x - x_growth, y_growth);
        }
    }

    i++;

}

function reset(){
    start_x = 0;
    start_y = 0;
    heap.clear();
    while(circles.length > 0){
        circles.shift();
    }
    i = 0;

    heap.print();
    context.clearRect(0, 0, width, height);
}

function makeHeap(){
    heap.makeHeap();
}

canvas.addEventListener('click', click);

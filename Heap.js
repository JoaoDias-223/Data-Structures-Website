class Heap {
    constructor(){
        this.array = [];
        this.size = 0;

        this.leftChild = this.leftChild.bind(this);
        this.rightChild = this.rightChild.bind(this);
        this.parent = this.parent.bind(this);
        this.lastParent = this.lastParent.bind(this);
        this.sift = this.sift.bind(this);
        this.swap = this.swap.bind(this);
        this.makeHeap = this.makeHeap.bind(this);
        this.setArray = this.setArray.bind(this);
        this.insert = this.insert.bind(this);
        this.remove = this.remove.bind(this);
        this.print = this.print.bind(this);
        this.toString = this.toString.bind(this);
        this.getSize = this.getSize.bind(this);
        this.update = this.update.bind(this);
    }

    leftChild(index){
        return 2 * index + 1;
    }

    rightChild(index){
        return 2 * index + 2;
    }

    parent(index){
        return parseInt((index - 1)/2);
    }

    lastParent(){
        if (this.size <= 1){
            return -1;
        }

        return this.parent(this.size - 1);
    }

    sift(index){
        if (index > this.lastParent()){
            return;
        }

        let biggestChild = this.leftChild(index);

        if ( (this.rightChild(index) < this.size) && (this.array[this.rightChild(index)].concept.value > this.array[biggestChild].concept.value) ){
            biggestChild = this.rightChild(index);
        }

        if (this.array[biggestChild].concept.value > this.array[index].concept.value){
            this.swap(biggestChild, index);
            this.sift(biggestChild);
        }
    }

    swap(first, second){
        let temp = this.array[first].concept.value;
        this.array[first].concept.value = this.array[second].concept.value;
        this.array[second].concept.value = temp;

        temp = this.array[first].drawable.text.value;
        this.array[first].drawable.text.value = this.array[second].drawable.text.value;
        this.array[second].drawable.text.value = temp;
    }

    makeHeap(){
        console.log("heap's makeHeap() called");

        this.print();

        for(let i = this.lastParent(); i >= 0; i--){
            this.sift(i);
        }

        this.print();
        this.update();
    }

    setArray(array){
        this.array = array;
        this.size = this.array.length;
        this.makeHeap();
    }

    insert(node){
        this.array.push(node);
        this.size++;
        let i;

        for(i = this.lastParent(); i > 0; i = this.parent(i)){
            this.sift(i);
        }

        this.sift(0);

        this.update();
        
        return true;
    }

    remove(){
        if (this.array.length == 0){
            return [-1, false];
        }

        this.swap(0, this.array.length-1);

        this.size--;
        this.sift(0);
        let num = this.array[this.array.length - 1];

        this.array.pop();

        return [num, true];
    }

    clear(){
        let [elem, ok] = this.remove();

        while (ok){
            elem, ok = this.remove();
        }
    }

    static convertToNodeArray(context, array){
        let nodeArray = [];

        for (let i = 0; i < array.length; i++){
            let node = new Node(context, array[i]);
            nodeArray.push(node);
        }

        return nodeArray;
    }

    pushToArray(node){
        this.array.push(node);
        this.size++;
    }

    print(){
        let msg = this.toString();
        console.log(msg);
    }

    toString(){
        let msg = "[";
        for (let i = 0; i < this.array.length; i++){
            msg += this.array[i].concept.value;

            if (i < this.array.length-1){
                msg += ", ";
            }
        }
        msg += "]\n";

        return msg;
    }

    getSize(){
        return this.array.length;
    }

    getNode(index){
        if (index < this.array.length && index >= 0){
            return [this.array[index], true];
        }

        return [this.array[0], false];
    }

    update(){
        Drawable.getContext().clearRect(0, 0, Drawable.getCanvas().width, Drawable.getCanvas().height);
        for (let node of this.array){
            node.Update();
        }
    }

    Draw(){
        
    }
}
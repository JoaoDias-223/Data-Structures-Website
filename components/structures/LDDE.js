
import Node from '../Frames/Node';

class LDDE{
    constructor(canvas, first, last, init_x, init_y, width, height, color, std_dist){
        console.log('std_dist = ', std_dist);
        this.canvas = canvas;
        this.first = first;
        this.last = last;
        this.init_x = init_x;
        this.init_y = init_y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.nodes = []
        this.nodes_values = [];
        this.ctx = this.canvas.getContext('2d');
        this.std_dist = std_dist;
        // implementar a lógica da direção oposta
        this.direc = true;
    }

    _add = (node) => {
        this.nodes.push(node);
        this.nodes_values.push(node.value);
    }

    _delete = (index) => {
        this.nodes.splice(index, 1);
        this.nodes_values.splice(index, 1);
    }

    insert = (value) => {

        let it = this.first;
        let ant = null;
        if (this.nodes.length == 0){
            let newNode = new Node(
                this.canvas, 
                this.init_x, 
                this.init_y, 
                value, 
                this.width,
                this.height, 
                null, 
                null, 
                this.color
            );

            this.first = newNode;
            this._add(newNode);
        }
        else{
            while (it != null){
                ant = it;
                it = it.next;
            }
            if (this.direc){

                if (ant.x+2*this.width+this.std_dist+5 < this.canvas.width){
                    let newNode = new Node(
                        this.canvas, 
                        ant.x+this.width+this.std_dist, 
                        ant.y, 
                        value, 
                        this.width, 
                        this.height, 
                        null, 
                        ant, 
                        this.color
                    );

                    ant.next = newNode;
                    this._add(newNode);
                }
                else if (this.init_y+2*this.height+this.std_dist < this.canvas.height){
                    this.direc = false;
                    let newNode = new Node(
                        this.canvas, 
                        ant.x, 
                        ant.y+this.height+this.std_dist/2, 
                        value, 
                        this.width, 
                        this.height, 
                        null, 
                        ant, 
                        this.color
                    );
                    ant.next = newNode;
                    this._add(newNode);
                }
                else{
                    alert("Stack Overflow!");
                }
            }
            else{
                if (ant.x-2*this.width-this.std_dist-5 > 0){
                    let newNode = new Node(
                        this.canvas, 
                        ant.x-this.width-this.std_dist, 
                        ant.y, 
                        value, 
                        this.width, 
                        this.height, 
                        null, 
                        ant, 
                        this.color
                    );
                    ant.next = newNode;
                    this._add(newNode);
                }
                else if (this.init_y+2*this.height+this.std_dist < this.canvas.height){
                    this.direc = true;
                    let newNode = new Node(
                        this.canvas, 
                        ant.x, 
                        ant.y+this.height+this.std_dist/2, 
                        value, 
                        this.width, 
                        this.height, null, 
                        ant, 
                        this.color
                    );
                    ant.next = newNode;
                    this._add(newNode);
                }
                else{
                    alert("Stack Overflow!");
                }
            }
        }

    }
    clear = () => {
        this.nodes.length = 0;
        this.nodes_values.length = 0;
    }
    search = (value) =>{
        let index = this.nodes_values.indexOf(value);
        if(index != -1){
            this.nodes[index].color = '#f2ef24';
            this.draw();
            setTimeout(() => {
                this.nodes[index].color = this.color;
                this.draw();
                console.log("passaram 3 sec?");
            }, 3000);
            return true;
        }
        else{
            alert("Valor não encontrado!");
            return false;
        }
    }
    remove = (value) => {
        console.log('index', this.nodes_values.indexOf(value));
        let index = this.nodes_values.indexOf(value);
        console.log('index', index);
        if (index != -1){
            console.log('não entrou pq então?');
            let it = this.first;
            let ant = null;
            while (it.value != value){
                ant = it;
                it = it.next;
            }
            ant.next = it.next;
            //it.prev = ant;
            this._delete(index);
            this.draw();
            return true;
        }
        return false;
    }
    draw = () => {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        for (var i=0; i < this.nodes.length; i++){
            this.nodes[i].draw();
        }
    }
}

export default LDDE;




import React, { useState } from 'react';
import { Text, Button, View, StatusBar, Dimensions } from 'react-native';
import { PanGestureHandler, ScrollView, State } from 'react-native-gesture-handler';
import { withNavigation } from 'react-navigation';
import Canvas from 'react-native-canvas';
import { IconButton, Colors, TextInput } from 'react-native-paper';
import { Standard } from '../styles/Standard.js';
import { Picker } from '@react-native-picker/picker';
import CustomButton, {  } from '../components/CustomButton.js';
import Drawable from '../base_classes/Drawable.js';
import Node from '../structures/Node.js';
import BinaryTree from '../structures/BinaryTree.js';

class BinaryTreePage extends React.Component {
    constructor(props){
        super(props);

        Drawable.setDefault();

        this.screenWidth = Math.round(Dimensions.get('window').width);
        this.screenHeight = Math.round(Dimensions.get('window').height);

        this.canvasSideMargins = 20;

        this.TextInput = React.createRef();
        this.binaryTree = undefined;
        this.canvas = undefined;
        this.offset = {x: 0, y: 0};

        this.state = {
            operationValue: "insert",
            nodeValue: 0,
            operationLabel: 'Inserir',
            labels: ["Inserir", "Inserir", "Remover", "Buscar"],
        };

        this.updateMessage = "Essa função sempre implementada em atualizações futuras.\nFique ligado para mais informações no nosso GitHub: https://github.com/JoaoDias-223/Data-Structures-Website .\n\n ¯\\_(ツ)_/¯";
    }

    handleCanvas = (Canvas) => {
        console.log('handleCanvas(Canvas) called.')
        if (Canvas != null){
            this.canvas = Canvas;
            Canvas.width = this.screenWidth - this.canvasSideMargins;
            Canvas.height = Math.floor((this.screenHeight/2)*1.2);
            this.binaryTree = new BinaryTree(Canvas);
        }
    }

    clearButton = () => {
        console.log("clearButton pressed.");

        Drawable.setDefault();

        if (this.binaryTree !== undefined){
            this.binaryTree.clear();
            this.binaryTree.draw();
        }

        console.log("end of clearButton()\n\n");
    }

    handleOperation = () => {
        console.log('\n');

        console.log(`current offsets: (${Drawable.offsetX}, ${Drawable.offsetY})`);
        if (this.canvas === undefined){
            console.log("Attribute canvas in HeapPage is undefined");
            return;
        }

        console.log(`textInputValue: ${this.state.nodeValue}`);

        //Insert operation
        if (this.state.operationValue === "insert") { this.binaryTree.insert(this.state.nodeValue); }

        //Remove operation
        else if (this.state.operationValue === "remove"){ this.binaryTree.remove(this.state.nodeValue); }

        //Search operation
        else { this.binaryTree.search(this.state.nodeValue); }

        this.binaryTree.draw();

        this.setState({nodeValue: 0});
        this.TextInput.current.clear();

        console.log(`Lista de Nós: ${this.binaryTree.toString()}`);
        console.log("----------------------------\n\n");
    }

    parseText = (text) => {
        let number = parseFloat(text);

        if (number == NaN){
            return 0;
        }

        return number;
    }

    _onGestureEvent = (event) => {
        if (this.binaryTree != undefined){

            
        }
    }

    _onHandlerStateChange = (event) => {
        console.log("onHandlerStateChange() called.");

        if (event.nativeEvent.oldState === State.ACTIVE) {
            console.log("State changed");

            let touchX = Math.floor(event.nativeEvent.translationX/5);
            let touchY = Math.floor(event.nativeEvent.translationY/5);

            console.log(`touchX: ${touchX}  touchY: ${touchY}`);

            this.offset.x += touchX
            this.offset.y += touchY;

            Drawable.offsetX = this.offset.x;
            Drawable.offsetY = this.offset.y;

            this.binaryTree.draw();
        }
    }

    render(){
        return(
            <View style={Standard.container}>


                {/* Top Content */}
                <View style={Standard.topContent}>
                    <View style={Standard.menuButtonContainer}>
                        <IconButton 
                            icon="menu"
                            color="#1A0A89"
                            size={40}
                            onPress={ ()=> { this.props.navigation.openDrawer() } }
                            style={Standard.menuButton}
                        />
                    </View>
                    <View style={Standard.titleContainer}>
                        <Text style={Standard.titleText}>{"Árvore Binária"}</Text>
                    </View>
                </View>


                {/* Canvas Content */}
                <PanGestureHandler
                    onGestureEvent={this._onGestureEvent}
                    onHandlerStateChange={this._onHandlerStateChange}
                    >
                    <View style={Standard.canvasContainer}>
                        {<Canvas ref={this.handleCanvas}/>}
                    </View>
                </PanGestureHandler>


                {/* Bottom Content */}
                <View style={Standard.bottomContent}>

                    <View style={Standard.operationContainer}>
                        <TextInput
                            style={Standard.inputArea}
                            ref = {this.TextInput}
                            onChangeText={(text) => this.setState({nodeValue: this.parseText(text)})}
                            placeholder="Número"
                            underlineColorAndroid='#ffffff00'
                            clearTextOnFocus={true}
                            keyboardType='numeric'/>

                        <View style={Standard.comboBoxContainer}>
                            {
                            <CustomButton
                                buttonStyle={Standard.pickerStyle}
                                textStyle={Standard.textStyle}
                                title={this.state.operationLabel}
                                onPress={ ()=>this.handleOperation() }
                            />
                            }

                            <View style={{borderRadius: 5}}>
                                <Picker
                                    style={Standard.pickerContainer}
                                    selectedValue={"▽"}
                                    mode="dropdown"
                                    onValueChange={ (itemValue, itemIndex) => this.setState( {
                                        operationValue: itemValue,
                                        operationLabel: this.state.labels[itemIndex]
                                    })}
                                >
                                    <Picker.Item label="▽" value="insert" />
                                    <Picker.Item label="Inserir" value="insert" />
                                    <Picker.Item label="Remover" value="remove" />
                                    <Picker.Item label="Buscar" value="search" />
                                </Picker>
                            </View>
                            
                        </View>
                    </View>

                    <View style={Standard.buttonsContainer}>
                        <CustomButton
                            buttonStyle={Standard.buttonStyle}
                            textStyle={Standard.textStyle}
                            title="Limpar"
                            onPress={ ()=>{this.clearButton()} }/>
                        <CustomButton
                            buttonStyle={Standard.buttonStyle} 
                            textStyle={Standard.textStyle} 
                            title="Exemplo" 
                            onPress={ ()=>alert(this.updateMessage) }/>
                    </View>

                </View>


            </View>
        );
    }
}

export default withNavigation(BinaryTreePage);
import React, { useState } from 'react';
import { Text, Button, View, StatusBar, Dimensions } from 'react-native';
import { PanGestureHandler, ScrollView, State } from 'react-native-gesture-handler';
import { withNavigation } from 'react-navigation';
import Canvas from 'react-native-canvas';
import { IconButton, Colors, TextInput } from 'react-native-paper';
import { Standard } from '../styles/Standard.js';
import { Picker } from '@react-native-picker/picker';
import CustomButton, {  } from '../components/CustomButton.js';
import Heap from '../structures/Heap.js';
import Drawable from '../base_classes/Drawable.js';

class HeapPage extends React.Component {
    constructor(props){
        super(props);

        Drawable.setDefault();

        this.screenWidth = Math.round(Dimensions.get('window').width);
        this.screenHeight = Math.round(Dimensions.get('window').height);
        this.canvasSideMargins = 20;

        this.TextInput = React.createRef();
        this.heap = undefined;
        this.canvas = undefined;
        this.offset = {x: 0, y: 0};

        this.state = {
            operationValue: "insert",
            nodeValue: 0,
            operationLabel: 'Inserir',
            labels: ["Inserir", "Inserir", "Remover"],
        };

        this.updateMessage = "Essa função sempre implementada em atualizações futuras.\nFique ligado para mais informações no nosso GitHub: https://github.com/JoaoDias-223/Data-Structures-Website .\n\n ¯\\_(ツ)_/¯";
    }

    handleCanvas = (Canvas) => {
        if (Canvas != null){
            this.canvas = Canvas;
            Canvas.width = this.screenWidth - this.canvasSideMargins;
            Canvas.height = Math.floor((this.screenHeight/2)*1.2);
            this.heap = new Heap(Canvas);
        }
    }

    clearButton = () => {
        Drawable.setDefault();

        if (this.heap !== undefined){
            this.heap.clear();
            this.heap.updateAndDraw();
        }

    }

    handleOperation = () => {
        console.log('\n');

        if (this.canvas === undefined){
            console.log("Attribute canvas in HeapPage is undefined");
        }

        //Insert operation
        if (this.state.operationValue === "insert"){ this.heap.insert(this.state.nodeValue); }
        
        //Remove operation
        else if (this.state.operationValue === "remove"){ this.heap.remove(); }

        this.heap.updateAndDraw();

        this.setState({nodeValue: 0});
        this.TextInput.current.clear()
    }

    parseText = (text) => {
        let number = parseFloat(text);

        if (number == NaN){
            return 0;
        }

        return number;
    }

    _onGestureEvent = (event) => {
        if (this.heap != undefined){

            
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

            this.heap.updateAndDraw();
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
                            //color="#1A0A89"
                            size={40}
                            onPress={ ()=> { this.props.navigation.openDrawer() } }
                            style={Standard.menuButton}
                        />
                    </View>
                    <View style={Standard.titleContainer}>
                        <Text style={Standard.titleText}>{"HEAP"}</Text>
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
                            ref={this.TextInput}
                            style={Standard.inputArea}
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

export default withNavigation(HeapPage);
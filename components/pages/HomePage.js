import React, { useState } from 'react';
import { Text, Button, View, StatusBar, Dimensions } from 'react-native';
import { PanGestureHandler, ScrollView, State } from 'react-native-gesture-handler';
import { withNavigation } from 'react-navigation';
import Canvas from 'react-native-canvas';
import { IconButton, Colors, TextInput } from 'react-native-paper';
import { Standard } from '../styles/Standard.js';
import { homePageStye } from '../styles/HomePage.js';
import { Picker } from '@react-native-picker/picker';
import CustomButton, {  } from '../components/CustomButton.js';
import Heap from '../structures/Heap.js';
import Drawable from '../base_classes/Drawable.js';

class HomePage extends React.Component {
    constructor(props){
        super(props);

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
                        <Text style={Standard.titleText}>{"HOME"}</Text>
                    </View>
                </View>

                {/* Routes */}
                <View
                    style={homePageStye.cardsContainer}
                >
                    <View style={homePageStye.cardsPair}>
                        <View style={homePageStye.cardStyle}>
                            <CustomButton
                                buttonStyle={homePageStye.cardButton}
                                textStyle={homePageStye.textStyle}
                                title={"LDDE"}
                                onPress={ ()=>{this.props.navigation.navigate("LDDE")} }
                            />
                        </View>
                        <View style={homePageStye.cardStyle}>
                            <CustomButton
                                buttonStyle={homePageStye.cardButton}
                                textStyle={homePageStye.textStyle}
                                title={"HEAP"}
                                onPress={ ()=>{this.props.navigation.navigate("Heap")} }
                            />
                        </View>
                    </View>

                    <View style={homePageStye.cardsPair}>
                        <View style={homePageStye.cardStyle}>
                            <CustomButton
                                buttonStyle={homePageStye.cardButton}
                                textStyle={homePageStye.textStyle}
                                title={"ABB"}
                                onPress={ ()=>{this.props.navigation.navigate("AVL")} }
                            />
                        </View>
                    </View>

                </View>
            </View>
        );
    }
}

export default withNavigation(HomePage);
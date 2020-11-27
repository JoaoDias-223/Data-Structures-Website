import React from 'react';
import { Text, TouchableOpacity, Touchable } from 'react-native';

class CustomButton extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <TouchableOpacity style={this.props.buttonStyle} onPress={this.props.onPress}>
                <Text style={this.props.textStyle}>{this.props.title}</Text>
            </TouchableOpacity>
        );
    }
}

export default CustomButton;
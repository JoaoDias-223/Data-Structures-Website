import { StyleSheet } from 'react-native';

const deepBlueColor = '#243983';
const lightBlue = '#f4f2ff';
const white = '#fcfcfc';
const commonRadius = 5;

export const Standard = StyleSheet.create({
    container: {
        display: 'flex',
        flex: 1,
        paddingTop: 20,
        paddingBottom: 20,
        paddingLeft: 10,
        paddingRight: 10,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: white,
    },



    topContent: {
        flexDirection: 'row',
        alignItems: 'stretch',
    },

    canvasContainer: {
        borderWidth: 3,
        borderColor: deepBlueColor,
        borderRadius: commonRadius,
    },

    bottomContent: {
        width: '100%',
        paddingTop: 30,

        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        
        //borderWidth: 1,
        //borderColor: "red",
        //borderRadius: 30,
    },



    /*--------------------------------- TOP CONTENT ---------------------------------*/

    menuButtonContainer: {
        width: '20%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'stretch',
        alignSelf: 'stretch',
    },

    menuButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignSelf: 'stretch',
    },

    titleContainer: {
        width: '80%',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: "center",
        paddingRight: 20,
    },

    titleText: {
        //fontFamily: 'Noto Serif Tamil',
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: 28,
        lineHeight: 44,
        alignItems: 'center',
        textAlign: 'center',
        color: deepBlueColor,
    },

    /*-------------------------------------------------------------------------------*/




    /*--------------------------------- BOTTOM CONTENT ---------------------------------*/

    operationContainer: {
        flex: 2,
        flexDirection: 'row',
        width: '100%',
        alignItems: 'stretch',
        justifyContent: 'space-between',
        paddingBottom: 5,
    },

    buttonsContainer: {
        flex: 2,
        flexDirection: 'row',
        width: '100%',
        alignItems: 'stretch',
        justifyContent: 'space-between',
        paddingTop: 5,
    },

    inputArea: {
        width: '45%',
        color: deepBlueColor,
        backgroundColor: white,
        fontSize: 20,
        textAlign: 'center',

        borderWidth: 2,
        borderColor: deepBlueColor,
        borderRadius: commonRadius,
    },

    comboBoxContainer:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '45%',

        //borderWidth: 2,
        //borderColor: 'red',
    },  

    pickerContainer: {
        //width: 0,
        //height: 0,
        //color: deepBlueColor,
        //backgroundColor: deepBlueColor,

        width: '15%',
        height: '100%',
        color: 'white',
        borderLeftWidth: 20,
        borderRightWidth: 20,
        borderBottomWidth: 20,
        borderStyle: 'solid',
        backgroundColor: deepBlueColor,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: '#00BCD4',
        borderTopRightRadius: commonRadius,
        borderBottomRightRadius: commonRadius,

        borderRadius: commonRadius,
    },

    pickerStyle: {
        width: '70%',
        backgroundColor: deepBlueColor,
        justifyContent: 'center',

        borderRadius: commonRadius,
    },

    buttonStyle: {
        width: '45%',
        backgroundColor: deepBlueColor,
        color: deepBlueColor,
        justifyContent: 'center',
        
        borderRadius: commonRadius,
    },

    textStyle: {
        alignSelf: 'center',
        fontSize: 20,
        color: white,
    },  

    /*-------------------------------------------------------------------------------*/


});
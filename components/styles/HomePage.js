import {StyleSheet} from 'react-native';

const deepBlueColor = '#243983';
const lightBlue = '#f4f2ff';
const white = '#fcfcfc';
const commonRadius = 5;

export const homePageStye = StyleSheet.create({
    cardsContainer: {
        display: 'flex',
        flexDirection: 'column',
        height: '80%'
    },

    cardsPair: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: 10,
    },

    cardStyle: {
        width: '48%',
    },

    cardButton: {
        justifyContent: 'center',
        backgroundColor: deepBlueColor,
        height: 200,
        borderRadius: commonRadius, 
    },

    textStyle: {
        alignSelf: 'center',
        fontSize: 40,
        color: white,
    },  
});
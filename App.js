import React from 'react';
import 'react-native-gesture-handler';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomePage from './components/pages/HomePage.js';
import HeapPage from './components/pages/HeapPage.js';
import LDDEPage from './components/pages/LDDEPage.js';
import BinaryTreePage from './components/pages/BinaryTreePage.js';

const Drawer = createDrawerNavigator();

class App extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    return (
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="HomePage">
          <Drawer.Screen name="HomePage" component={HomePage} />
          <Drawer.Screen name="AVL" component={BinaryTreePage} />
          <Drawer.Screen name="Heap" component={HeapPage} />
          <Drawer.Screen name="LDDE" component={LDDEPage} />
        </Drawer.Navigator>
      </NavigationContainer>
    );
  }
}

export default App;
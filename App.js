import React, { Component,useState } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import SpeechToText from './SpeechToText'
import LoginScreen from './components/LoginScreen';
import RegisterScreen from './components/RegisterScreen';
import Home from './components/Home';
import ForgotPasswordScreen from './components/ForgotPasswordScreen';
import Addmenu from './components/Addmenu';
import { createStackNavigator,StackNavigator} from 'react-navigation-stack';
import {createAppContainer } from 'react-navigation';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' + 'Shake or press menu button for dev menu',
});
const AppNavigator = createStackNavigator({
  // Vendor: {
  //   screen: LoginScreen,
  // },
 
  // Signup: {
  //    screen: RegisterScreen
  // },
  // Home: {
  //   screen: HomeScreen
  // }
LoginScreen,
RegisterScreen,
ForgotPasswordScreen,
Home,
Addmenu,
SpeechToText,
 },
{
  initialRouteName: 'SpeechToText',
  headerMode: 'none',
}
);

export default class App extends Component {
  render() {
    return (
	     // <UserInactivity
    //   isActive={active}
    //   timeForInactivity={timer}
    //   onAction={isActive => { setActive(isActive); }}
    //   style={{ flex: 1 }}>
    //  <SpeechToText />
      <AppContainer />
    //  {/* { active?<AppContainer />:<Login/>} */}
    //   {/* ///Comment this portion below if testing with login
    // // <View>
    // //   <MOApp style={styles.container} />
    // // </View> */}
    //</UserInactivity>
    )
  }
}

const AppContainer = createAppContainer(AppNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

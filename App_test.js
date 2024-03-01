import { StatusBar } from 'expo-status-bar';
import { View, Text, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ThemeProvider, createTheme } from '@rneui/themed';
import React from 'react';

import {tabBarOptions, headerTitleStyle, header_styler, tarballLabel_style, bottomTab} from "./Styles/app";
import {screenOptions, screen_baricon_secondary, screen_baricon_main, screen_option} from "./Styles/app";


import HomeScreen from './Screens/Home';

import { isWeb,theme } from './Styles/general';

const Tab = createBottomTabNavigator();


export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        loading:true,
        allow_live:false,
    };
  }
  componentDidMount(){
    //this.showLive();
  }

  render(){
    return (
      <NavigationContainer>
        <StatusBar animated={true} backgroundColor="#5856D6" />
        <Tab.Navigator
          screenOptions={screenOptions}>
          <Tab.Screen
            name="Matches"
            component={HomeScreen}
            options={screen_baricon_secondary("home")}
          />
        </Tab.Navigator>
      </NavigationContainer>
    );
  }
}

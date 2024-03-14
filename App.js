import { StatusBar } from 'expo-status-bar';
import { View, Text, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/FontAwesome';
import React from 'react';

import {tabBarOptions, headerTitleStyle, header_styler, tarballLabel_style, bottomTab} from "./Styles/app";
import {screenOptions, screen_baricon_secondary, screen_baricon_main, screen_option} from "./Styles/app";


import NewsScreen from './Screens/News';
import MachesScreen from './Screens/Matches';
import ArticleScreen from './Screens/Article';
import Matchcreen from './Screens/Match';
import LiveHSLScreen from './Screens/HSL';
import TeamScreen from './Screens/Team';
import PlayerScreen from './Screens/Player';


import { isWeb,theme } from './Styles/general';
import API from './libs/API';

import LiveScreen from './Screens/Live';
import LiveLinkScreen from './Screens/LiveLink';

import Favorites from "./libs/favorites";
import Cache from "./libs/cache";



global.isWeb = Platform.OS == 'web';
global.isIOS = Platform.OS == 'ios';
global._API  = new API();
global._Favs  = new Favorites();
global._Cache  = new Cache();


global.adUnitId_banner_ios = "ca-app-pub-3940256099942544/9214589741";//not used
global.adUnitId_inters_ios = "ca-app-pub-3940256099942544/1033173712";

if(isWeb){
  try {
    document.getElementById("root").style.overflow = "hidden";
  } catch (error) {}
  
}

const navigationOptions =  (IconName='', routeName='') => {
  const options = {
      headerStyle: header_styler,
      headerTitleStyle: headerTitleStyle,
    };

  if (IconName!=""){
    options["tabBarLabel"] =  ({ focused, tintColor }) => {
      if(!routeName) return null;
      return focused ? null : <Text  color={tintColor} style={tarballLabel_style}>{routeName?routeName+"":""}</Text>;
    };

    options["tabBarIcon"] =  (({focused, tintColor}) => {
      const iconSize = focused ? 37 : 33;
      tintColor = focused ? tintColor : "#c182ba";
      return <Icon name={IconName}   color={tintColor} size={iconSize} style={{marginTop: focused ? 0 : 0 }} /> 
    }) ;
    options["tabBarOptions"] =tabBarOptions;
  }

return options;
}



const MatchesStack = createNativeStackNavigator();
function MatchesStackScreen() {
  return (
    <MatchesStack.Navigator>
      <MatchesStack.Screen name="MatchesList" component={MachesScreen} options={screen_option}  />
      <MatchesStack.Screen name="Match" component={Matchcreen} options={screen_option} />
      <MatchesStack.Screen name="Team" component={TeamScreen} options={screen_option} />
      <MatchesStack.Screen name="Player" component={PlayerScreen} options={screen_option} />
      
      
    </MatchesStack.Navigator>
  );
}
const newsStack = createNativeStackNavigator();
function NewsStackScreen() {
  return (
    <newsStack.Navigator>
      <newsStack.Screen name="NewsList" component={NewsScreen} options={screen_option} />
      <newsStack.Screen name="Article" component={ArticleScreen} options={screen_option} />
    </newsStack.Navigator>
  );
}
const LiveStack = createNativeStackNavigator();
function LiveStackScreen() {
  return (
    <LiveStack.Navigator>
      <LiveStack.Screen name="LiveList" component={LiveScreen} options={screen_option} />
      <LiveStack.Screen name="LiveLink" component={LiveLinkScreen} options={screen_option} />
      <LiveStack.Screen name="LiveHSL" component={LiveHSLScreen} options={screen_option} />

    </LiveStack.Navigator>
  );
}

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
    this.showLive(0);
  }
  showLive=async(retired=0)=>{
    const is_allowed = await _API.is_Live_allowed();
    this.setState({allow_live:is_allowed})
    if(retired==0 && !is_allowed){
      //just incase of a network issue or something else, retry to check the dislay after 5seond;
      setTimeout(() => {
        this.showLive(1);
      }, 5000);
    }

  }
  render(){
    return (
      <NavigationContainer>
        <StatusBar animated={true} backgroundColor="#5856D6" />
        <Tab.Navigator
          screenOptions={screenOptions}>
          <Tab.Screen
            name="Matches"
            component={MatchesStackScreen}
            options={screen_baricon_secondary("home")}
          />
          {this.state.allow_live==true ? 
          
          <Tab.Screen
            name="Live"
            component={LiveStackScreen}
            options={screen_baricon_main("tv")}
          />
          :null}
          <Tab.Screen
            name="News"
            component={NewsStackScreen}
            options={screen_baricon_secondary("globe")}
          />
        </Tab.Navigator>
      </NavigationContainer>
    );
  }
}

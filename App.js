import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import {Translation} from "react-native-essential-tools";
import Icon from 'react-native-vector-icons/FontAwesome';
import { ThemeProvider, createTheme } from '@rneui/themed';

import theme from "./Styles/theme";
import {tabBarOptions, headerTitleStyle, header_styler, tarballLabel_style, bottomTab} from "./Styles/app"

import NewsScreen from './Screens/News';
import MachesScreen from './Screens/Matches';
import ArticleScreen from './Screens/Article';
import Matchcreen from './Screens/Match';
import { isWeb } from './Styles/general';
import API from './libs/API';

import xlistScreen from './Screens/xlist';
import xArticleScreen from './Screens/xArticle';


global.isWeb = Platform.OS == 'web';
global.isIOS = Platform.OS == 'ios';
global._API   = new API();
if(isWeb){
  try {
    document.getElementById("root").style.overflow = "hidden";
  } catch (error) {}
  
}

global.TXT = {};
global.Translation_ = new Translation();

Translation_.getTranslation().then(t=>{
  TXT=t;
});




const navigationOptions =  (IconName='', routeName='') => {
  const options = {
      headerStyle: header_styler,
      headerTitleStyle: headerTitleStyle,
    };

  if (IconName!=""){
    options["tabBarLabel"] =  ({ focused, tintColor }) => {
      if(!TXT[routeName]) return null;
      return focused ? null : <Text  color={tintColor} style={tarballLabel_style}>{TXT[routeName]?TXT[routeName]+"":""}</Text>;
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
      <MatchesStack.Screen name="Matches" component={MachesScreen} />
      <MatchesStack.Screen name="Match" component={Matchcreen} />
    </MatchesStack.Navigator>
  );
}
const newsStack = createNativeStackNavigator();
function NewsStackScreen() {
  return (
    <newsStack.Navigator>
      <newsStack.Screen name="NewsList" component={NewsScreen} />
      <newsStack.Screen name="Article" component={ArticleScreen} />
    </newsStack.Navigator>
  );
}
const xStack = createNativeStackNavigator();
function xStackScreen() {
  return (
    <xStack.Navigator>
      <xStack.Screen name="Live" component={xlistScreen} />
      <xStack.Screen name="xArticle" component={xArticleScreen} />
    </xStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();


export default function App() {
  return (
    <ThemeProvider theme={theme} >
      <NavigationContainer
        theme={bottomTab}
        >
        <Tab.Navigator screenOptions={{ headerShown: false }}>
          <Tab.Screen  name="Matches" component={MatchesStackScreen} options={navigationOptions("home", "MachesScreen")} />
          <Tab.Screen name="News"   component={NewsStackScreen} options={navigationOptions("globe", "News")} />
          <Tab.Screen name="Live" component={xStackScreen} options={navigationOptions("tv", "Live")} />
        </Tab.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}


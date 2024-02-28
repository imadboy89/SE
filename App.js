import { StatusBar } from 'expo-status-bar';
import { View, Text, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ThemeProvider, createTheme } from '@rneui/themed';

import {tabBarOptions, headerTitleStyle, header_styler, tarballLabel_style, bottomTab} from "./Styles/app";
import {screenOptions, screen_baricon_secondary, screen_baricon_main, screen_option} from "./Styles/app";


import NewsScreen from './Screens/News';
import MachesScreen from './Screens/Matches';
import ArticleScreen from './Screens/Article';
import Matchcreen from './Screens/Match';
import { isWeb,theme } from './Styles/general';
import API from './libs/API';

import LiveScreen from './Screens/Live';
import LiveLinkScreen from './Screens/LiveLink';


global.isWeb = Platform.OS == 'web';
global.isIOS = Platform.OS == 'ios';
global._API   = new API();
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
      <MatchesStack.Screen name="Matches" component={MachesScreen} options={screen_option}  />
      <MatchesStack.Screen name="Match" component={Matchcreen} options={screen_option} />
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
const xStack = createNativeStackNavigator();
function LiveStackScreen() {
  return (
    <xStack.Navigator>
      <xStack.Screen name="Live" component={LiveScreen} options={screen_option} />
      <xStack.Screen name="LiveLink" component={LiveLinkScreen} options={screen_option} />
    </xStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

/*
export default function App() {
  return (
    <ThemeProvider theme={theme} >
      <NavigationContainer
        theme={bottomTab}
        >
        <Tab.Navigator screenOptions={{ headerShown: false }}>
          <Tab.Screen  name="Matches" component={MatchesStackScreen} options={navigationOptions("home", "MachesScreen")} />
          <Tab.Screen name="News"   component={NewsStackScreen} options={navigationOptions("globe", "News")} />
          <Tab.Screen name="Live" component={LiveStackScreen} options={navigationOptions("tv", "Live")} />
        </Tab.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}
*/

export default function App() {
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
        <Tab.Screen
          name="Live"
          component={LiveStackScreen}
          options={screen_baricon_main("tv")}
        />
        <Tab.Screen
          name="News"
          component={NewsStackScreen}
          options={screen_baricon_secondary("globe")}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

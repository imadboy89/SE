import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {Translation} from "react-native-essential-tools";
import Icon from 'react-native-vector-icons/FontAwesome';
import { ThemeProvider, createTheme } from '@rneui/themed';

import theme from "./Styles/theme";
import {tabBarOptions, headerTitleStyle, header_styler, tarballLabel_style, bottomTab} from "./Styles/app"

import HomeScreen from './Screens/Home';
import NewsScreen from './Screens/News';
import MachesScreen from './Screens/Matches';
import ArticleScreen from './Screens/Article';
import Matchcreen from './Screens/Match';
import { isWeb } from './Styles/general';


global.isWeb = Platform.OS == 'web';
global.isIOS = Platform.OS == 'ios';

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

const Tab = createBottomTabNavigator();


function News(){
  return(
    <Tab.Navigator screenOptions={{ headerShown: false,tabBarVisible: false }}>
      <Tab.Screen screenOptions={{ headerShown: false,tabBarVisible: false }} name="NewsList" component={NewsScreen} />
      <Tab.Screen screenOptions={{ headerShown: false,tabBarVisible: false }} name="Article" component={ArticleScreen} />
    </Tab.Navigator>

  );
}

function Matches(){
  return(
    <Tab.Navigator screenOptions={{ headerShown: false,tabBarVisible: false }}>
      <Tab.Screen screenOptions={{ headerShown: false,tabBarVisible: false }} name="Matches" component={MachesScreen} />
      <Tab.Screen screenOptions={{ headerShown: false,tabBarVisible: false }} name="Match" component={Matchcreen} />
    </Tab.Navigator>

  );
}



export default function App() {
  return (
    <ThemeProvider theme={theme} >
      <NavigationContainer
        theme={bottomTab}
        >
        <Tab.Navigator >
          <Tab.Screen name="Matches" component={Matches} options={navigationOptions("home", "MachesScreen")} />
          <Tab.Screen name="News"   component={News} options={navigationOptions("globe", "News")} />
          <Tab.Screen name="Home" component={HomeScreen} options={navigationOptions("tv", "Live")} />
        </Tab.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}
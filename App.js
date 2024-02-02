import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {Translation} from "react-native-essential-tools";
import Icon from 'react-native-vector-icons/FontAwesome';
import { ThemeProvider, createTheme } from '@rneui/themed';

import theme from "./Styles/theme";
import HomeScreen from './Screens/Home';
import NewsScreen from './Screens/News';



global.TXT = {};
global.Translation_ = new Translation();

Translation_.getTranslation().then(t=>{
  TXT=t;
});

const tabBarOptions= {
  activeTintColor: '#ecb4e6',
  activeBackgroundColor : '#924089',
  showIcon :true, 
  labelStyle: {
    fontSize: 16,
    color:"red",
  },
  barStyle:{ paddingTop: 48 },
  style: {
    backgroundColor: '#5c2656',
    justifyContent:"center",
    alignItems:"center",
    //textAlign:"center",
  },
}

const headerTitleStyle = {
  fontWeight: 'bold',
  color:"white"
};

const header_styler={
  backgroundColor : "#5c2656",
  //color:"white",
};
const tarballLabel_style= {
  fontSize: 15,
  //color: '#c5c5c5',
  textAlign:"center",
}
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

console.log(theme)
export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer
        theme={{
          colors: {
            primary: theme?.colors?.primary,
            background: theme?.colors?.background,
            card: theme?.colors?.white,
            text: theme?.colors?.black,
          },
          dark: theme?.mode === 'dark',
        }}
        >
        <Tab.Navigator>
          <Tab.Screen name="Home" component={HomeScreen} options={navigationOptions("home", "")} />
          <Tab.Screen name="News" component={NewsScreen} options={navigationOptions("news", "News")} />
          
        </Tab.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

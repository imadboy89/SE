import {  View, Text, Platform} from 'react-native';
import {theme,maxWidth,_isMobile,isWeb  } from "../Styles/general";
import Icon from 'react-native-vector-icons/FontAwesome';

const tabBarOptions= {
    activeTintColor: theme.headerTintColor,
    activeBackgroundColor : theme.headerStyle_backgroundColor,
    showIcon :true, 
    labelStyle: {
      fontSize: 16,
      color:"red",
    },
    barStyle:{ 
        //paddingTop: 48 
    },
    style: {
      backgroundColor: theme.background_color_default,
      justifyContent:"center",
      alignItems:"center",
      //textAlign:"center",
    },

}
const headerTitleStyle = {
    fontWeight: 'bold',
    color:theme.headerTintColor
  };
  
const header_styler={
backgroundColor : theme.headerStyle_backgroundColor,
//color:"white",
};
const tarballLabel_style= {
fontSize: 15,
//color: '#c5c5c5',
textAlign:"center",
}
const bottomTab = {
    colors: {
        primary: "green",
        background: theme.background_color_default,
        card: theme.headerStyle_backgroundColor,
        text: theme.headerTintColor,
      },
}

const screenOptions = ({route}) => ({
  tabBarHideOnKeyboard: true,
  tabBarStyle: {
    display: 'flex',
    position: 'absolute',
    bottom: 20,
    left: 25,
    right: 25,
    elevation: 5,
    backgroundColor: theme.headerStyle_backgroundColor,
    borderRadius: 30,
    height: 60,
  },
  tabBarShowLabel: false,
  headerShown: false,
})
const screen_baricon_main = (iconName)=> {
  return {
      tabBarIcon: ({focused}) => (
        <View
          style={{
            top: Platform.OS === 'ios' ? -5 : -10,
            width: Platform.OS === 'ios' ? 60 : 70,
            height: Platform.OS === 'ios' ? 60 : 70,
            borderRadius: Platform.OS === 'ios' ? 30 : 35,
            borderWidth:1,
            backgroundColor: 'white',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
          <Icon
            name={iconName}
            size={Platform.OS === 'ios' ? 30 : 35}
            color={focused ? '#ff4162' : '#ff748c'}
          />
        </View>
      ),
      tabBarIconStyle: {},
      headerStyle: header_styler,
      headerTitleStyle: headerTitleStyle,
    
    }
}

const screen_baricon_secondary = (iconName)=> {
  return {
    tabBarIcon: ({focused}) => (
      <View
        style={{
          top: Platform.OS === 'ios' ? 10 : 0,
        }}>
        <Icon
          name={iconName}
          size={30}
          color={focused ? 'white' : '#9594e5'}
        />
      </View>
    ),
  
  }
}
const screen_option = {
  headerStyle: header_styler,
  headerTitleStyle: headerTitleStyle,
  
}


export {tabBarOptions, headerTitleStyle, header_styler, tarballLabel_style, bottomTab, screenOptions, screen_baricon_secondary, screen_baricon_main, screen_option };
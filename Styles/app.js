import {  StyleSheet, Dimensions} from 'react-native';
import {theme,maxWidth,_isMobile,isWeb  } from "../Styles/general";

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

export {tabBarOptions, headerTitleStyle, header_styler, tarballLabel_style, bottomTab};

import {  StyleSheet, Dimensions} from 'react-native';
import {theme,maxWidth,_isMobile,isWeb  } from "../Styles/general";

const styles_home = StyleSheet.create({
    container: {
      flex: 1,
      //justifyContent: 'center',
      //paddingTop: Constants.statusBarHeight,
      backgroundColor: theme.background_color_default,
      color : "#fff",
    },
    stats_view:{
      backgroundColor: theme.matche_container_backgroundColor,
      width:"98%",
      marginLeft:5,
      marginVertical:5,
      flexWrap:'wrap',
      flex: 1 ,
      marginRight:5,
      //marginLeft:5,
      borderRadius:10,
      //borderWidth:1,
      borderColor:"#5e5e698a",
      flexDirection:'row', 
      
    },
    stats_sides_view:{
      flex:1,
      padding:20,
      margin:10
    },
    stats_right_view:{
      textAlign:"right",
      alignItems:'right',
    },
    stats_left_view:{

    },
    stats_right_text:{
      textAlign:"right",
    },
  });

export default styles_home;

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
    title_view:{
      width:"99%",
      textAlign:"center",
      alignItems:'center',

    },
    title_text:{
      fontSize:20,
    },
    stats_sides_view:{
      flex:1,
      padding:20,
      margin:10
    },
    stats_right_view:{
      textAlign:"right",
      alignItems:'flex-end',
    },
    stats_left_view:{

    },
    stats_right_text:{
      textAlign:"right",
    },
    general_info_container:{
      margin:5,
      backgroundColor: theme.matche_container_backgroundColor,
      padding:20,
      flex:1,
    },
    general_info_row:{
      height:50,
      flex:1,
      flexDirection:"row",
    },
    general_info_label_text:{
      height:50,
      padding:5,
      flex:1,

      textAlign:"right",
      alignItems:'flex-end',


    },
    general_info_value_text:{
      height:50,
      padding:5,
      flex:1,
      textAlign:"left",
      alignItems:'flex-start',

    },
  });

export default styles_home;
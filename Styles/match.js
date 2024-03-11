
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
    container_container:{
      justifyContent:"center",
      alignContent:"center",
      flexGrow: 1
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
      //margin:5,
      backgroundColor: theme.matche_container_backgroundColor,
      padding:20,
      flex:1,
    },
    general_info_row:{
      height:30,
      flex:1,
      flexDirection:"row",
    },
    general_info_label_text:{
      height:30,
      padding:5,
      flex:2,

      textAlign:"right",
      alignItems:'flex-end',


    },
    general_info_value_text:{
      height:30,
      padding:5,
      flex:3,
      textAlign:"left",
      alignItems:'flex-start',

    },

    events_container:{
      backgroundColor:theme.matche_container_backgroundColor,
      flex:1,
      //height:6000,
      flexDirection:"row",
      width:"100%",
    },

    events_side:{
      flex:1,
    },
    events_side_home:{
      borderRightWidth:1,
    },
    events_side_away:{

    },
    pullright:{
      alignSelf:"flex-end",
    },
    
    placeholder:{
      justifyContent:"center",alignItems:"center",
      width:50,
      //backgroundColor:"red",
      height:40,
      marginVertical:4,
      flexDirection:"row"
      
    },
    events_side_row:{
      justifyContent:"center",alignItems:"center",
      marginVertical:4,
      //backgroundColor:"green",
      //width:20,
      flexDirection:"row",
      height:40,
      //borderWidth:1,


    },
    events_side_row_home:{
      borderTopLeftRadius:200,
      borderTopRightRadius:2,
      borderBottomLeftRadius:200,
      borderBottomRightRadius:2,
      backgroundColor:"#00000010",

    },
    events_side_row_away:{
      textAlign:"left",
      borderTopLeftRadius:2,
      borderTopRightRadius:200,
      borderBottomLeftRadius:2,
      borderBottomRightRadius:200,
      backgroundColor:"#00000010",

    },
    events_side_row_text:{
      width:"90%",
      height:"100%",
      
      borderColor:"black",
      paddingVertical:10,
      paddingHorizontal:0,
      //borderTopRightRadius:100,

      //backgroundColor:"red",
    },
    events_side_text_home:{
      textAlign:"right"
    },
    events_side_text_away:{
      textAlign:"left"
    },

    lineup_container:{
      backgroundColor:theme.matche_container_backgroundColor,
    },
    lineup_row:{
      flexDirection:"row"
    },
    line_row_number:{
      paddingVertical:5,
      paddingHorizontal:5,
      width:30,
    },
    line_row_name:{
      padding:5,
      flex:1,

    },
  });

export default styles_home;
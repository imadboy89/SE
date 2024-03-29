
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

    matche_container:{

      backgroundColor: theme.matche_container_backgroundColor,
      width:"100%",
      flexWrap:'wrap',
      marginVertical:8,
      marginHorizontal:6,
      
      flex: 1 ,
      height: isWeb ? 150 : 155,
      height: "100%",
      //marginLeft:5,
      borderRadius:10,
      //borderWidth:1,
      borderColor:"#5e5e698a",
      
      
    },
    matche_container_live:{
      borderWidth:2,
      borderColor:"#00ff4e",
    },
    matche_container_img:{

      width:"100%",
      flexWrap:'wrap',      
      flex: 1 ,
      height: "99%",
      //marginLeft:5,
      borderRadius:10,
      //borderWidth:1,
      //borderColor:"#5e5e698a",
      //borderColor:"red",
      //borderWidth:2,
      
      
    },
    
    matche_team_logo_view:{
      flex:2,
      //backgroundColor:"red",
      justifyContent: 'center',
      alignItems:'center',

    },
    matche_team_time_view:{
      flex:1,
      backgroundColor: theme.match_time_backgroundColor,
      borderTopWidth:1,
      //backgroundColor:"#00000070",
      borderColor:"#5e5e698a",
      justifyContent: 'center',
      alignItems:'center',
      paddingBottom:3

    },

    matche_team_logo_image:{
      flex:1,
      //backgroundColor:"yellow",
      aspectRatio: 1,
      margin:"5%"
    },
    matche_team_scor_text:{
      paddingHorizontal:10,
      color:theme.match_name_color
    },
    home_team_score_text_penalties:{
      justifyContent: 'flex-start',
      alignItems:'flex-start',
    },
    away_team_score_text_penalties:{
      alignItems:'flex-end',
    },
    home_team_view:{
      flex:1,
    },
    away_team_view:{},
    teams_and_score_view:{
      flex:1,
      flexDirection:'row', 
      flexWrap:'wrap',
      //height: isWeb ? 87 : 83,
      //borderWidth:1,
      borderColor:"black",
    },
    extra_details_view:{
      flexDirection:'row', 
      height:40
    },
    home_team_name_view:{
      flex:1,
      height:35,
    },

    team_name_text:{
      flex:1,
      width:"98%",
      color: theme.match_name_color,
      paddingLeft:5,
      paddingRight:5,
      justifyContent: 'center',
      fontSize:13,
      lineHeight:25,
      textAlign:"center",
    },
    home_team_score_view:{
      flexDirection:'row', 

    },
    team_score_text:{
      flex:5,
      color: theme.match_name_color,
      fontSize:18,
      justifyContent: 'center',
      textAlign:"center",
    },
    team_name_winner:{
      
    },
    team_name_drawer:{
      
    },
    team_name_drawer:{

    },
    matche_team_time_text:{
      color:theme.match_time_color,
      fontWeight: 'bold',
      textAlign:"right",
      fontSize:22,
    },
    matche_team_time_live:{
      fontWeight:"bold",
      fontSize:22,
      color:"#00ff4e",
      width:"70%",
      textAlign:"center",
      //paddingRight:20,
      paddingBottom:2,
      //backgroundColor:"red"
    },
    matche_team_time_status:{
      fontWeight:"bold",
      fontSize:20,
      color:theme.link_text_color,
      width:"95%",
      textAlign:"center",
      //paddingRight:20,
      paddingBottom:2,
      //backgroundColor:"red"
    },
  });

export default styles_home;
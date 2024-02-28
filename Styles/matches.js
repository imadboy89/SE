
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
    list_container:{
    },
    matche_container:{
      backgroundColor: theme.matche_container_backgroundColor,
      width:"98%",
      flexWrap:'wrap',
      marginVertical:10,
      marginHorizontal:6,
      
      flex: 1 ,
      height: isWeb ? 150 : 135,
      //marginLeft:5,
      borderRadius:10,
      //borderWidth:1,
      borderColor:"#5e5e698a",
      
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
      borderWidth:1,
      borderColor:"#5e5e698a",
      justifyContent: 'center',
      alignItems:'center',


    },
    matche_team_logo_image:{
      flex:1,
      //backgroundColor:"yellow",
      aspectRatio: 1,
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
      height:20
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
    matche_team_time_live:{

    },
  });

export default styles_home;
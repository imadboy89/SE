
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

    text:{
      color : theme.text_color_default,
      marginRight:10,
      justifyContent: 'center',
      alignItems: 'center'
    },
    date_text: {
      fontSize: 12,
      fontWeight: 'bold',
      textAlign: 'center',
      color : theme.home_title_color,
      marginTop:10,
      //fontFamily : "cairoregular",
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      textAlign: 'center',
      color : theme.home_title_color,
      //fontFamily : "cairoregular",
    },
    header_icons:{
      padding:10,
      //marginLeft :20,
    },
    icons:{
      marginHorizontal:3,
      alignItems:"center",
      justifyContent: "center",
      height:40,  
      width:40,
      borderRadius: 20 ,
      backgroundColor:theme.headerStyle_backgroundColor,
      borderColor:theme.text_color_default,
      borderWidth:1,
    }
  });

const styles_list__ = {
    list_container: {
      marginRight: "1%",
      //marginLeft: isWeb ? "20%" : 0, 
      marginTop:"1%",
      flex: 1,
      width: "100%" ,
      backgroundColor: theme.background_color_default,
      
    },
    container: {
      //marginRight:_isMobile ? "1%" : 10,
      flex: 1,
      //width:"99%",
      backgroundColor: theme.background_color_default,
    },
    onFocus:{
      backgroundColor:"red"
    },
    item_container: {
      flex:1,
      marginHorizontal:"auto",
      width: maxWidth ,
      backgroundColor: theme.background_color_default,
    },
    columnWrapperStyle:{
      justifyContent: 'flex-end',
      paddingRight: _isMobile ? 10 : 20
    },
    columnWrapperStyle2:{
      justifyContent: 'flex-end',
      //paddingRight: _isMobile ? 10 : 20
    },
    item: {
      padding: 2,
      paddingRight:50,
      fontSize: 18,
      //height: 50,
      flex:1,
      color:theme.text_color_default,
      textAlign: 'right'
    },
    item_related: {
      padding: 2,
      paddingRight:50,
      fontSize: 18,
      //height: 50,
      flex:1,
      color:theme.link_text_color,
      textAlign: 'right'
    },
    header_container: {
      //backgroundColor: theme.list_header_backgroundColor,
      marginVertical:1,
      marginLeft:"1%", 
      width:"98%",
      height:48,
      borderTopLeftRadius:20,
      borderTopRightRadius:20,
      borderBottomLeftRadius:5,
      borderBottomRightRadius:5,
      textAlign:"left"
    },
    header: {
      borderTopLeftRadius:20,
      borderTopRightRadius:20,
      borderBottomLeftRadius:5,
      borderBottomRightRadius:5,
      fontSize: 20,
      backgroundColor: theme.list_header_backgroundColor,
      width:"100%",
      textAlign:"right",
      height:"99%",
    },
    header_components: {
      //marginRight:5,
      borderTopLeftRadius:20,
      marginLeft:5,
      //marginTop:3,
      fontSize: 20,
      backgroundColor: theme.list_header_backgroundColor,
      textAlign:"right",
      height:"98%",
    },
    title: {
      fontSize: 23
    },
    shadow_3:{fontSize: 23},
    shadow_1:{
      shadowColor: theme.text_color_default,
      shadowOffset: {
        width: 5,
        height: 3
      },
      shadowOpacity: 0.25,
      //shadowRadius: 3,
      elevation: 5
    },
    shadow_2:{
      shadowColor: theme.text_color_default,
      shadowOffset: {
        width: 5,
        height: 3
      },
      shadowOpacity: 0.30,
      //shadowRadius: 3,
      elevation: 5
    },
    matche_container:{
      width:"98%",
      marginLeft:5,
      marginVertical:5,
      flexDirection:'row', 
      flexWrap:'wrap',
      flex: 1 ,
      height: isWeb ? 87 : 83,
      marginRight:5,
      //marginLeft:5,
      borderRadius:10,
      borderWidth:1,
    },
    matche_container_live:{
      borderRadius:10,
      borderWidth: 2,
      borderColor: theme.live_borderColor,
    },
    matche_container_notif:{
      borderRadius:10,
      borderWidth: 2,
      borderColor: theme.text_color_default,
      //borderColor: theme.list_header_backgroundColor,
      //backgroundColor:"yellow"
    },
    matche_container_liveNotif:{
      borderRadius:10,
      borderWidth: 2,
      borderColor: theme.activeBackgroundColor,
      //backgroundColor:"yellow"
    },
    team_name_winner :theme.live_borderColor,
    team_name_loser :theme.match_results_winer_background,
    team_name_drawer:theme.match_results_drawer_background,
    matche_team_names:{
      flex: 15 ,
      backgroundColor: theme.match_name_backgroundColor,
      //resizeMode: "contain",
      justifyContent: "center"
      
    },
    matche_team_name_text:{
      flex:1,
      width:"98%",
      color: theme.match_name_color,
      paddingLeft:5,
      paddingRight:5,
      paddingTop: isWeb ? 3 : 10,
      justifyContent: 'center',
      fontSize:22,
      lineHeight:25,
      textAlign:"right",
      //backgroundColor : theme.background_color_default

    },
    matche_team_name_text_fav:{
      textDecorationLine: 'underline',
    },
    matche_team_score:{
      flex: 2 ,
      backgroundColor: theme.match_score_backgroundColor,
      alignItems:'center',
      color:theme.match_score_color,
      borderTopRightRadius:8,
      borderBottomRightRadius:8,
      alignContent:"center",

    },
    matche_team_score_penalties:{
      flex: 1 ,
      backgroundColor: theme.match_score_backgroundColor,
      alignItems:'center',
      color:theme.match_score_color,
      alignContent:"center",

    },
    matche_team_score_text_penalties:{
      flex:1,
      borderWidth:1,
      borderColor:theme.text_color_default,
      fontSize:23,
      justifyContent: 'center',

    },
    matche_team_score_text:{
      flex:1,
      fontSize:23,
      justifyContent: 'center',

    },
    matche_team_time:{
      flex: 4 ,
      alignItems:'center',
      justifyContent: 'center',
      color:theme.text_color_default,
      borderTopLeftRadius:8,
      borderBottomLeftRadius:8,
      backgroundColor: theme.match_time_backgroundColor,
      textAlignVertical: 'center',
    },
    matche_team_time_t:{
      //lineHeight:20,
    
      //flex:4,
      fontSize:20,
      alignItems:'center',
      color: theme.match_time_color,
      //backgroundColor:"#ff3a3a9c",
      alignContent:"center",
    },
    matche_team_time_live:{
      //flex:3,
      fontSize:20,
      alignItems:'center',
      justifyContent: 'center',
      color:theme.live_borderColor,
      //backgroundColor:"#ffe738cc",
    },

    matche_team_logo:{
      //margin :3,
      width: "100%",
      height: "45%",
      aspectRatio: 1,
      resizeMode:"contain"
    },
    matche_league_logo_c:{
      width: "100%",
      height: "100%",
      //borderRadius: isWeb ? 8 : 5
      
    },
    matche_league_logo:{
      //margin :3,
      marginVertical:1,
      width: "100%",
      height: "95%",
      aspectRatio: 1,
      resizeMode:"contain",
      borderRadius: 5,
      borderTopRightRadius:20,
    },
    matche_league_logo_k:{
      //margin :3,
      marginVertical:1,
      width: "100%",
      borderWidth:1,
      height: "95%",
      aspectRatio: 1,
      //resizeMode:"contain",
      borderRadius:  5,
      borderTopRightRadius:20,
    },
    matche_team_badge:{
      flex: 2 ,
      backgroundColor: theme.match_badge_backgroundColor,
      alignItems:'center',
      color:"#d1d8e0",
      justifyContent: 'center',
    },
    news_container:{
      marginVertical:7,
      marginHorizontal:3,
      height:200,
      width:"98%",
      backgroundColor: theme.news_cont_backgroundColor,
      justifyContent: 'center',
      
    },
    movies_container:{
      marginVertical:7,
      marginHorizontal:3,
      height:400,
      width:"98%",
      backgroundColor: theme.news_cont_backgroundColor,
      justifyContent: 'center',
      
    },
    news_img_v:{
      flex: 10 ,
      width:"100%",
      color:"#fff",
      alignItems:'center',
    },
    league_header:{
      height:20,
      width:"100%",
      color:"#fff",
      flexDirection:'row', 
      flexWrap:'wrap',
    },
    news_img_i:{
      width: "100%",
      height: "100%",
      aspectRatio: 1,
      resizeMode:"stretch",
      alignItems:'center',
    },
    news_title_v:{
      width:"100%",
      height : 50,
      paddingBottom:5,
      flex: 2 ,
      fontSize:18,
      color:"#fff",
      backgroundColor: theme.news_title_backgroundColor
    },
    news_title_t:{
      height : "100%",
      flex: 9,
      fontSize:15,
      alignItems:'center',
      justifyContent: 'center',
      alignSelf : "center",
      color: theme.news_title_color,
      paddingHorizontal:3,//backgroundColor:"red"
      fontWeight: "bold",
    },
    news_title_icon:{
      //fontSize:15,
      alignItems:'center',
      justifyContent: 'center',
      alignSelf : "center",
      color: theme.news_title_backgroundColor,
    },
  }
console.log(styles_list__)
//var styles_list = StyleSheet.create(styles_list__);

export default styles_list__;
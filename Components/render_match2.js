import {  View, TouchableOpacity, Image, ImageBackground  } from 'react-native';
import { Text } from 'react-native';
import {  StyleSheet, Dimensions} from 'react-native';
import {theme,maxWidth,_isMobile,isWeb  } from "../Styles/general";


function parse_details(){
    return ;
  }

const render_match=(item,windowWidth)=>{
    let home_team_name = item["home_team_ar"] ? item["home_team_ar"] : item["home_team"];
    let away_team_name = item["away_team_ar"] ? item["away_team_ar"] : item["away_team"];
    if(home_team_name==undefined || away_team_name==undefined ){
      return null;
    }
    let home_team_style = {};
    let away_team_style = {};
    const max_lenght = parseInt(windowWidth/19) ;
    if(home_team_name.length>max_lenght){ home_team_style={fontSize:17}; }
    if(away_team_name.length>max_lenght){ away_team_style={fontSize:17}; }
    
    if(item.home_team_status && item.home_team_status.toLowerCase()=="w"){ 
      home_team_style["color"]=styles_matches.team_name_winner; 
    }
    if(item.away_team_status && item.away_team_status.toLowerCase()=="w"){ 
      away_team_style["color"]=styles_matches.team_name_winner; 
    }
    if(item.home_team_status && item.home_team_status.toLowerCase()=="l"){ 
      home_team_style["color"]=styles_matches.team_name_drawer; 
    }
    if(item.away_team_status && item.away_team_status.toLowerCase()=="l"){ 
      away_team_style["color"]=styles_matches.team_name_drawer; 
    }

    const league_img = item.league_img ? item.league_img : null;
    let time_style={};
    const game_nbr  ={color:"#8fa2ff", fontSize:12};
    try {
      time_style = JSON.parse(JSON.stringify(styles_matches.matche_team_time_live));
    } catch (error) {}
    if(item.time_played=="Pen"){
      time_style["color"]="#ff5252";
    }else if(item.is_done){
      time_style["color"]="#8fa2ff";
      time_style["fontSize"]=13;
    }
    let time_played= item.time_played>0?item.time_played+"'": item.time_played;
    const match_details = parse_details(item.details);
    let match_nbr = 0;
    if(match_details && match_details.mn && match_details.mn.length>0 && match_details.mn[0].length>0){
      match_nbr = match_details.mn[0][1];
    }
    const time_status = <>{item.is_done==true ? 
      <Text style={time_style}>{"Finished"}</Text> 
    : null}
    {item.live==1 && time_played? 
      <Text style={time_style}  noFonts={true}>{time_played}</Text>
    : null}
    {match_nbr!==0 ? 
      <Text style={game_nbr}  noFonts={true}>M {match_nbr}</Text>
    : null}</>;

    return render(item, time_status,home_team_name,away_team_name,league_img);
}

const render=(item, time_status,home_team_name,away_team_name,league_img,home_team_style ,away_team_style )=>{
    const shadow_style = isWeb ? styles_matches.shadow_3  : styles_matches.shadow_1;

    const palceholder_logo = require('../assets/placeholder.png');
    const home_team_logo = item.home_team_logo ? {uri: item.home_team_logo} : palceholder_logo;
    const away_team_logo = item.away_team_logo ? {uri: item.away_team_logo} : palceholder_logo;

    return (
      <View style={[styles_matches.matche_container,shadow_style,{opacity:.8}]} >
        <View style={[styles_matches.teams_and_score_view,{backgroundColor:"white"}]}>

          <View style={styles_matches.home_team_view}>
            <View style={styles_matches.matche_team_logo_view}>
              { home_team_logo ? <Image style={styles_matches.matche_team_logo_image} source={home_team_logo} /> : <Text>-</Text>}
            </View>
            <View style={styles_matches.home_team_name_view}>
              <Text style={styles_matches.team_name_text}>{home_team_name}</Text>
            </View>
            <View style={styles_matches.home_team_score_view}>
              <Text style={styles_matches.team_score_text}>{item.home_team_score}</Text>
              <Text style={[styles_matches.home_team_score_text_penalties, styles_matches.matche_team_scor_text]} noFonts={true}>{item.home_team_score_penalties ? item.home_team_score_penalties : ""}</Text>
            </View>
          </View>

          <View style={styles_matches.home_team_view}>
            <View style={styles_matches.matche_team_logo_view}>
              { away_team_logo ? <Image style={styles_matches.matche_team_logo_image} source={away_team_logo} /> : <Text>-</Text>}
            </View>
            <View style={styles_matches.home_team_name_view}>
              <Text style={styles_matches.team_name_text}>{away_team_name}</Text>
            </View>
            <View style={styles_matches.home_team_score_view}>
            <Text style={[styles_matches.away_team_score_text_penalties, styles_matches.matche_team_scor_text]} noFonts={true}>{item.away_team_score_penalties ? item.away_team_score_penalties : ""}</Text>
              <Text style={styles_matches.team_score_text}>{item.away_team_score}</Text>
            </View>
          </View>
        </View>

        <View style={styles_matches.extra_details_view}>
          <View style={styles_matches.matche_team_time_view}></View>
          <View style={styles_matches.matche_team_time_view}>
            <Text style={styles_matches.matche_team_time_text} noFonts={true}>{item.time}"</Text>
          </View>
          <View style={styles_matches.matche_team_time_view}>{time_status}</View>
        </View>
      </View>
      );
  }


const styles_matches = StyleSheet.create({
    container: {
      flex: 1,
      //justifyContent: 'center',
      //paddingTop: Constants.statusBarHeight,
      backgroundColor:"white" ,//theme.background_color_default,
      color : "#fff",
      
    },

    matche_container:{
      //backgroundColor: theme.matche_container_backgroundColor,
      width:"100%",
      flexWrap:'wrap',
      marginVertical:8,
      marginHorizontal:6,
      backgroundColor:"white",
      flex: 1 ,
      height: isWeb ? 150 : 155,
      height: "100%",
      //marginLeft:5,
      borderRadius:10,
      //borderWidth:1,
      borderColor:"#5e5e698a",
      
      
    },
    matche_container_img:{
      width:"100%",
      flexWrap:'wrap',      
      flex: 1 ,
      height: "100%",
      //marginLeft:5,
      borderRadius:10,
      //borderWidth:1,
      borderColor:"#5e5e698a",
      //borderColor:"red",
      borderWidth:2,
      
      
    },
    
    matche_team_logo_view:{
      backgroundColor:"white",
      flex:2,
      //backgroundColor:"red",
      justifyContent: 'center',
      alignItems:'center',

    },
    matche_team_time_view:{
      flex:1,
      //backgroundColor: theme.match_time_backgroundColor,
      backgroundColor:"white",
      borderTopWidth:1,
      borderColor:"black",
      justifyContent: 'center',
      alignItems:'center',

    },
    matche_team_time_text:{
      color: theme.text_color_default_dark,
      fontWeight: 'bold',
    },
    matche_team_logo_image:{
      flex:1,
      //backgroundColor:"yellow",
      aspectRatio: 1,
      margin:"5%"
    },
    matche_team_scor_text:{
      paddingHorizontal:10,
      color:theme.text_color_default_dark,
      fontSize:15
    },
    home_team_score_text_penalties:{
      justifyContent: 'flex-start',
      alignItems:'flex-start',
      color: theme.text_color_default_dark
    },
    away_team_score_text_penalties:{
      alignItems:'flex-end',
    },
    home_team_view:{
      flex:1,
    },
    away_team_view:{},
    teams_and_score_view:{
      backgroundColor:"white",
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
      color: theme.text_color_default_dark,
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
      color: theme.text_color_default_dark,
      fontSize:18,
      justifyContent: 'center',
      textAlign:"center",
    },
    team_name_winner:{
      fontWeight:"bold"

    },
    team_name_drawer:{
      
    },
    team_name_looser:{

    },
    matche_team_time_live:{
      color:"green"
    },
  });

  export default render_match;
import {  View, TouchableOpacity, Image, ImageBackground  } from 'react-native';
import { SafeAreaView, FlatList, Dimensions,TouchableHighlight, Text } from 'react-native';

import styles_matches from "../Styles/matches";

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
      time_style["fontSize"]=16;
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
    {item.live==1 ? 
      <Text style={time_style}  noFonts={true}>{time_played}</Text>
    : null}
    {match_nbr!==0 ? 
      <Text style={game_nbr}  noFonts={true}>M {match_nbr}</Text>
    : null}</>;

    return render(item, time_status,home_team_name,away_team_name,league_img);
}

const render=(item, time_status,home_team_name,away_team_name,league_img,home_team_style ,away_team_style )=>{
    const shadow_style = isWeb ? styles_matches.shadow_3  : styles_matches.shadow_1;
    const logo_placeholder = "https://guessthefootballplayer.com/Js/placeholder3.png";
    item.home_team_logo = item.home_team_logo ? item.home_team_logo : logo_placeholder;
    item.away_team_logo = item.away_team_logo ? item.away_team_logo : logo_placeholder;
    return (
      <View style={[styles_matches.matche_container,shadow_style]}>
        <View style={styles_matches.teams_and_score_view}>

          <View style={styles_matches.home_team_view}>
            <View style={styles_matches.matche_team_logo_view}>
              { item.home_team_logo ? <Image style={styles_matches.matche_team_logo_image} source={{uri: item.home_team_logo}} /> : <Text>...</Text>}
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
              { item.away_team_logo ? <Image style={styles_matches.matche_team_logo_image} source={{uri: item.away_team_logo}} /> : <Text>...</Text>}
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

  export default render_match;
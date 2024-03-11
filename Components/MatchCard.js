import React from 'react';
import {  View, Pressable, StyleSheet  } from 'react-native';
import { Text } from 'react-native';
import { Image,ImageBackground } from 'expo-image';

import styles_matches from "../Styles/matches";
import FavoriteIcon from "./FavoriteIcon";
import {ActivityIndicator} from 'react-native';

const parse_details=()=>{

}

class MatchCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dynamic_style:false,
      header_to_hide:[],
      numColumns:1,
      list : [],
    }
  }
  render_start=(item, time_status,home_team_name,away_team_name,league_img,home_team_style ,away_team_style )=>{
    const shadow_style = isWeb ? styles_matches.shadow_3  : styles_matches.shadow_1;
    const match_live = item.live ? styles_matches.matche_container_live : {};
    const palceholder_logo = require('../assets/placeholder.png');
    const match_backg      = require('../assets/b.jpg');
    const home_team_logo = item.home_team_logo ? {uri: item.home_team_logo} : palceholder_logo;
    const away_team_logo = item.away_team_logo ? {uri: item.away_team_logo} : palceholder_logo;
    return (
      <ImageBackground 
        style={[styles_matches.matche_container,match_live,{opacity:.8}]}
        imageStyle={styles_matches.matche_container_img}
        source={match_backg}
        
      >
        <View style={[styles_matches.teams_and_score_view,{backgroundColor:"#00000061"}]}>

          <View style={styles_matches.home_team_view}>
            <FavoriteIcon favType="teams" favId={item.home_team_id} item={[item.home_team_id,home_team_name,item.home_team_logo]}/>
            <Pressable style={styles_matches.matche_team_logo_view} onPress={()=>this.onPressTeam(item.home_team_id)}>
              { home_team_logo ? 
                <Image 
                  style={styles_matches.matche_team_logo_image} 
                  source={home_team_logo}
                  contentFit="contain"
                  /> 
                  : <Text>-</Text>}
            </Pressable>
            <Pressable style={styles_matches.home_team_name_view} onPress={()=>this.onPressTeam(item.home_team_id)}>
              <Text style={styles_matches.team_name_text} numberOfLines={1}>{home_team_name}</Text>
            </Pressable>
            <View style={styles_matches.home_team_score_view}>
              <Text style={styles_matches.team_score_text}>{item.home_team_score}</Text>
              <Text style={[styles_matches.home_team_score_text_penalties, styles_matches.matche_team_scor_text]} noFonts={true}>{item.home_team_score_penalties ? item.home_team_score_penalties : ""}</Text>
            </View>
          </View>

          <View style={styles_matches.home_team_view}>
            <FavoriteIcon favType="teams" favId={item.away_team_id} pullRight item={[item.away_team_id,away_team_name,item.away_team_logo]}/>
            <Pressable style={styles_matches.matche_team_logo_view} onPress={()=>this.onPressTeam(item.away_team_id)}>
              { away_team_logo ? 
              <Image 
                style={styles_matches.matche_team_logo_image} 
                source={away_team_logo} 
                contentFit="contain"
                /> : <Text>-</Text>}
            </Pressable>
            <Pressable style={styles_matches.home_team_name_view} onPress={()=>this.onPressTeam(item.away_team_id)}>
              <Text style={styles_matches.team_name_text} numberOfLines={1}>{away_team_name}</Text>
            </Pressable>
            <View style={styles_matches.home_team_score_view}>
            <Text style={[styles_matches.away_team_score_text_penalties, styles_matches.matche_team_scor_text]} noFonts={true}>{item.away_team_score_penalties ? item.away_team_score_penalties : ""}</Text>
              <Text style={styles_matches.team_score_text}>{item.away_team_score}</Text>
            </View>
          </View>
        </View>

        <View style={styles_matches.extra_details_view}>
          <View style={styles_matches.matche_team_time_view}></View>
          <View style={styles_matches.matche_team_time_view}>
            <Text style={styles_matches.matche_team_time_text} noFonts={true}>{item.time}</Text>
          </View>
          <View style={styles_matches.matche_team_time_view}>{time_status}</View>
        </View>
      </ImageBackground>
      );
  }
  onPressTeam=(team_id)=>{
    let payload = {};
    if(team_id==this.props.item.home_team_id){
      payload = {team_id:team_id,team_name_en:this.props.item.home_team,team_logo:this.props.item.home_team_logo};
    }else{
      payload = {team_id:team_id,team_name_en:this.props.item.away_team,team_logo:this.props.item.away_team_logo};
    }
    if(this.props.pressableTeams){
      this.props.navigation.navigate('Team',payload);
    }else{
      this.props.navigation.navigate('Match',this.props.item);
    }
  }
  render(){
    const windowWidth = this.props.windowWidth;
    const item = this.props.item;
    let home_team_name = item["home_team"] ? item["home_team"] : item["home_team_ar"];
    let away_team_name = item["away_team"] ? item["away_team"] : item["away_team_ar"];
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
    let time_style={textAlign:"right",fontSize:16,};
    const game_nbr  ={color:"#8fa2ff", fontSize:12,};
    
    /*
    try {
      time_style = JSON.parse(JSON.stringify(styles_matches.matche_team_time_live));
    } catch (error) {}
    if(item.time_played=="Pen"){
      time_style["color"]="#ff5252";
    }else if(item.is_done){
      time_style["color"]="#8fa2ff";
      //time_style["fontSize"]=13;
    }
    
    */
    let time_played= item.time_played>0?item.time_played+"'": item.time_played;
    const match_details = parse_details(item.details);
    let match_nbr = 0;
    if(match_details && match_details.mn && match_details.mn.length>0 && match_details.mn[0].length>0){
      match_nbr = match_details.mn[0][1];
    }

    const time_status = <>
    {item.is_done==true ? 
      <Text style={styles_matches.matche_team_time_status}>{"Finished"}</Text> 
    : null}
    {item.live==1 && time_played? 
      <View style={{flexDirection:"row"}}>
        <Text style={styles_matches.matche_team_time_live}  >{time_played}</Text>
        <ActivityIndicator size="small" color={styles_matches.matche_team_time_live.color} />
      </View>

    : null}
    {match_nbr!==0 ? 
      <Text style={game_nbr}  >M {match_nbr}</Text>
    : null}
    </>;

    return this.render_start(item, time_status,home_team_name,away_team_name,league_img);
}

}



export default MatchCard;
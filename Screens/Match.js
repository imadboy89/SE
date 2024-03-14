import React from "react";
import { View, TouchableHighlight, Modal, Text, Switch, TouchableOpacity, Dimensions, ScrollView, RefreshControl, Pressable} from 'react-native';
import Loading from '../Components/Loader';
import styles_match from "../Styles/match"
import MatchCard from '../Components/MatchCard';
import IconButton from '../Components/iconBtn';
import BackBtn from "../Components/backBtn";
import EmptySpace from  '../Components/EmptySpace';
import { Tab, TabView } from '@rneui/themed';
import { theme } from "../Styles/general";
import { Image } from "expo-image";
import {Divider} from "@rneui/base";
let list = [

          ];
class Matchcreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        list:list,
        modalVisible_match:false,
        player_type:1,
        key_:"en_name",
        channel:null,
        matche_details:this.props.route.params,
        loading:true,
        loading_lineup:true,
        height:"100%",
        is_live_match:false,

    };
    this.sub_out = {"home":[],"away":[]};
    this.event_symbols = {"g":"⚽","o":"⚽", "y":"🟨", "r":"🟥","p":"🥅"};
    this.windowWidth = Dimensions.get('window').width<=1000 ? Dimensions.get('window').width : 1000;

  }
  componentDidMount(){
    this.render_header();
    
    this.didBlurSubscription = this.props.navigation.addListener(
      'focus',
      payload => {
          this.is_focused = true;
          if(this._isMounted==false){
          return;
          }
          this.state.matche_details = this.props.route.params&&this.props.route.params.id ? this.props.route.params : undefined;
          this.refresh();
      }
      );
  }
  refresh=()=>{
    this.get_Match(this.state.matche_details.id);
  }
  render_header=()=>{
    let title = "";
    if(this.state.matche_details){
      title=`${this.state.matche_details.home_team} VS ${this.state.matche_details.away_team}`;
    }
    this.props.navigation.setOptions({
      title: title,
      headerLeft: (props) => (
        <BackBtn  {...props} navigation={this.props.navigation}/>
      ),

      "headerRight":()=>(
        <View style={{flexDirection:"row",margin:5,}}>
                  <IconButton
            name='refresh'
            onPress={this.refresh}

          />
      </View>
      )
      });
  }
  get_Match(id){
    if(this.state.matche_details.id==undefined){
      return;
    }
    _API.get_match(id).then(resp=>{
      if(resp ){
        resp.home_team_logo = this.state.matche_details.home_team_logo;
        resp.away_team_logo = this.state.matche_details.away_team_logo;
        this.state.matche_details = resp;
        if(this.state.matche_details.round){
          this.state.matche_details.round = this.state.matche_details.round.replace("الأسبوع","Week")
        }
        this.home_team_ar = this.state.matche_details.home_team_ar ? this.state.matche_details.home_team_ar : this.state.matche_details.home_team;
        this.away_team_ar = this.state.matche_details.away_team_ar ? this.state.matche_details.away_team_ar : this.state.matche_details.away_team; 
        this.render_header();
        //_API.setTitleWeb(this.home_team_ar +" - "+ this.away_team_ar);
      }
      this.setState({loading:false});
    });
  }
  get_head2head(){
    if(!this.state.head2head || Object.keys(this.state.head2head).length!=3 ){
      return null
    }
    const head2head_info = bject.keys(this.state.head2head).map(k=><Text style={[styles_match.text_info,{color:"orange"}]} key={k}>{k} : {this.state.head2head[k]}</Text>);
    return head2head_info;
  }
  get_subs(type_){
    let substitutions = []
    try{
    substitutions = type_=="home" ? 
      JSON.parse(JSON.stringify(this.state.matche_details.home_substitutions)) :
      JSON.parse(JSON.stringify(this.state.matche_details.away_substitutions));
    }catch(err){
      return [];
    }
    let subs = [];
    for (let k=0;k<substitutions.length;k++){
      let el = substitutions[k];
      let pp = el.substitution ? el.substitution.split("|") : ["",el.lineup_player];
      if(el.time==""){
        continue;
      }

      subs.push({player_key:el.player_key,lineup_player:pp[1].trim(), player_out:pp[0].trim(),time:el.time ,lineup_number:el.time ? el.time.split("+")[0]+'"':""});
    }
    subs = subs.sort((a,b)=>{return a.time<b.time?-1:1;});
    return subs;
  }
  async get_lineup_api(){
    const _lineup = await _API.get_lineup(this.state.matche_details.id);
    
    this.setState({lineup:_lineup,loading_lineup:false});
  }
  lineup_player(l,_type="home"){
    const player_id = l.player_key;
    const player_name_en = l.lineup_player;
    const number = <Text style={styles_match.line_row_number}>{l.lineup_number}</Text>;
    const name = <Text style={styles_match.line_row_name} numberOfLines={1}>{l.lineup_player?l.lineup_player:"-"}</Text>;
    return <Pressable
      style={styles_match.lineup_row} 
      key={l.player_key+"_"+l.lineup_player}
      onPress={()=>this.props.navigation.navigate("Player",{player_id,player_name_en})}
      >
      {_type=="home" ? 
      <>{number}{name}</>
      : 
      <>{name}{number}</>
      }
      </Pressable>;
  }
  get_lineup(){
    if(!this.state.lineup || !this.state.lineup.home_lineup || !this.state.lineup.away_lineup){
      return <Text>Line up for this match is not available!</Text>;
    }
    const home_side = this.state.lineup.home_lineup.map(l=>this.lineup_player(l, "home"));
    const away_side = this.state.lineup.away_lineup.map(l=>this.lineup_player(l, "away"));

    let home_subtitle_side = this.state.lineup.home_substitutions.filter(l=>l.subs_in_time>=0);
    let away_subtitle_side = this.state.lineup.home_substitutions.filter(l=>l.subs_in_time>=0);
    home_subtitle_side = home_subtitle_side.map(l=>this.lineup_player(l, "home"));
    away_subtitle_side = away_subtitle_side.map(l=>this.lineup_player(l, "away"));

    return (<View style={styles_match.events_container}>
    <View style={[styles_match.events_side,styles_match.events_side_home]}>
      {home_side}
      <Divider color="black" style={{marginVertical:10,width:"80%",alignSelf:"flex-end"}}/>
      {home_subtitle_side}
    </View>
    <View style={[styles_match.events_side,styles_match.events_side_away]}>
      {away_side}
      <Divider color="black" style={{marginVertical:10,width:"80%",alignSelf:"flex-start"}}/>
      {away_subtitle_side}
    </View>

  </View>);
  }
  get_info(){
    const key2show=[
      {"key":"status","label":"Status","default":"-"},
      {"key":"datetime","label":"Date & Time","default":"-"},
      {"key":"league","label":"League","default":"-"},
      {"key":"phase","label":"Phase","default":"-"},
      {"key":"group","label":"Group","default":"-"},
      {"key":"round","label":"Round","default":"-"},
      {"key":"retour_score","label":"1st leg results","default":"-"},
      {"key":"stadium","label":"Stadium","default":"-"},
      {"key":"desc","label":"Description","default":"-"},
      {"key":"match_status","label":"Match status","default":"-"},
    ]
    let attrs = key2show.map(i=> {
      if(!this.state.matche_details[i.key] || this.state.matche_details[i.key]=="" || this.state.matche_details[i.key]=="-"){
        return null;
      }
      let value = <Text style={styles_match.general_info_value_text}>{this.state.matche_details[i.key]}</Text>;
      if(i.key=="retour_score" && this.state.matche_details[i.key]){
        const home_img = <Image style={{height:30,width:30}} source={{uri:this.state.matche_details.home_team_logo}} />;
        const away_img = <Image style={{height:30,width:30}} source={{uri:this.state.matche_details.away_team_logo}} />;
        value = <Text style={[styles_match.general_info_value_text,{flex:0,textAlign:"center",textAlignVertical:"center",fontSize:16,}]}>{this.state.matche_details[i.key]}</Text>;
        value = <View style={[styles_match.general_info_value_text,{flexDirection:"row"}]}>{away_img}{value}{home_img}</View>
      }
      return (
    <View style={styles_match.general_info_row} key={i.key}>
      <Text style={styles_match.general_info_label_text}>{i.label} : </Text>
      {value}
    </View>);
    }) ;
    return(
      <>
      <View style={styles_match.general_info_container}>
        {attrs}
      </View>
      </>
    );
  }

  e_format(e,index){
    let c = null;
    const event_symbole = this.event_symbols[e.type]?this.event_symbols[e.type]:e.type;
    const key = `${e.player_id}_${index}`;
    const player_id = e.player_id;
    const player_name_en = e.player_name;

    if(e.team=="home"){
      c = <Pressable 
            key={key} 
            style={[styles_match.events_side_row,styles_match.events_side_row_home]}
            onPress={()=>this.props.navigation.navigate("Player",{player_id,player_name_en})}
            >
            <Text style={[styles_match.events_side_row_text,styles_match.events_side_text_home]} numberOfLines={1}>{e.player_name}</Text>
          </Pressable>;
    }else{
      c = <Pressable 
            key={key} 
            style={[styles_match.events_side_row,styles_match.events_side_row_away]}
            onPress={()=>this.props.navigation.navigate("Player",{player_id,player_name_en})}
            >
            <Text style={[styles_match.events_side_row_text,styles_match.events_side_text_away]} numberOfLines={1}>{e.player_name}</Text>
          </Pressable>;
    }
    const placeholder_l=<View key={key+"_l"} style={[styles_match.placeholder,styles_match.pullright]}>
        <Text style={styles_match.events_time}>{e.time}'</Text>
        <Text style={styles_match.events_symbole}>{event_symbole}</Text>
        <View style={styles_match.events_line}><Text> </Text></View>
      </View>;
    const placeholder_r=<View key={key+"_r"} style={[styles_match.placeholder,]}>
        <View style={styles_match.events_line}><Text> </Text></View>
        <Text style={styles_match.events_symbole}>{event_symbole}</Text>
        <Text style={styles_match.events_time}>{e.time}'</Text>
      </View>;

    return [c,placeholder_l,placeholder_r];

    return c;
  }
  get_events(){
    let home_side = [];
    let away_side = [];
    let events
    try {
      events = [...this.state.matche_details.cards, ...this.state.matche_details.goal_scorer]      
    } catch (error) {
      events=[]
    }

    events = events.sort((a,b)=>{
      return a.time<b.time?-1:1
    });
    let index=0;
    for( const e of events){
      index+=1;
      const e_res = this.e_format(e,index);
      home_side.push( e.team=="home" ? e_res[0] : e_res[1] );
      away_side.push( e.team=="away" ? e_res[0] : e_res[2] );
    }
    return <View style={styles_match.events_container}>
      <View style={[styles_match.events_side,styles_match.events_side_home]}>{home_side}</View>
      <View style={[styles_match.events_side,styles_match.events_side_away]}>{away_side}</View>

    </View>;
  }

  render() {
    //render_match(item, time_status,home_team_name,away_team_name,league_img)
    return (
      <View style={styles_match.container}
        contentContainerStyle={styles_match.container_container}
        refreshControl={
          <RefreshControl
            refreshing={this.state.loading}
            onRefresh={()=>this.get_Match(this.state.matche_details.id)}
          />}
      >
        <View style={{height:250,width:"95%"}}>
          <MatchCard 
            item={this.state.matche_details} 
            windowWidth={this.windowWidth} 
            pressableTeams={true} 
            navigation={this.props.navigation}
            />
        </View>
        

          
      <Tab
        value={this.state.tab_index}
        onChange={(e) => {
          this.setState({tab_index:e});
          if(e==2 && !this.state.lineup){
            this.get_lineup_api();
            
          }
        }}
        indicatorStyle={{
          backgroundColor: theme.buttons_color,
          height: 3,
        }}
        containerStyle={{backgroundColor:theme.headerStyle_backgroundColor}}
        variant="primary"
      >
        <Tab.Item
          title="Details"
          titleStyle={{ fontSize: 12 }}
          icon={{ name: 'newspaper-outline', type: 'ionicon', color: 'white' }}
        />
        <Tab.Item
          title="Events"
          titleStyle={{ fontSize: 12 }}
          icon={{ name: 'list-circle-outline', type: 'ionicon', color: 'white' }}
        />

        <Tab.Item
          title="Line Up"
          titleStyle={{ fontSize: 12 }}
          icon={{ name: 'apps-outline', type: 'ionicon', color: 'white' }}
        />
      </Tab>
      {this.state.loading ? <Loading /> : 
        <TabView 
          style={{backgroundColor:"green",flex:1,height:50}}
          value={this.state.tab_index} 
          onChange={(e) => {
            this.setState({tab_index:e});
            
          }}
          animationType="timing"

          >
          <TabView.Item style={{ flex:1 , }}>
            <ScrollView style={{flex:1,backgroundColor:theme.matche_container_backgroundColor}}>
              {this.get_info()}
              <EmptySpace/>
            </ScrollView>
          </TabView.Item>
          <TabView.Item style={{ width: '100%', flex:1}}>
           <ScrollView style={{flex:1,backgroundColor:theme.matche_container_backgroundColor}}>
              {this.get_events()}
              <EmptySpace/>
            </ScrollView>
          </TabView.Item>
          <TabView.Item  style={{ width: '100%', flex:1}}>
            <ScrollView style={{flex:1,backgroundColor:theme.matche_container_backgroundColor}}>
              {this.state.loading_lineup==false? this.get_lineup() :<Loading/>}
              <EmptySpace/>
            </ScrollView>
          </TabView.Item>
        </TabView>
        }
        
      </View>
    );
  }
}

export default Matchcreen;

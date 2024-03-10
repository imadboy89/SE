import React from "react";
import { View, TouchableHighlight, Modal, Text, Switch, TouchableOpacity,Image, Dimensions, ScrollView, RefreshControl} from 'react-native';
import Loading from '../Components/Loader';
import styles_match from "../Styles/match"
import MatchCard from '../Components/MatchCard';
import IconButton from '../Components/iconBtn';
import BackBtn from "../Components/backBtn";
import EmptySpace from  '../Components/EmptySpace';

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
        height:"100%",
        is_live_match:false,

    };
    this.sub_out = {"home":[],"away":[]};
    this.id = 0;
    this.event_symbols = {"g":"⚽", "y":"🟨", "r":"🟥","p":"🥅"};
    this.windowWidth = Dimensions.get('window').width<=1000 ? Dimensions.get('window').width : 1000;
  }
  componentDidMount(){
    this.state.matche_details = this.state.matche_details && this.state.matche_details!="-" ? this.state.matche_details : undefined;
    //console.log("componentDidMount",this.props.route.params.match_item.id);
    this.id = this.state.matche_details && this.state.matche_details.id ? this.state.matche_details.id : this.props.route.params.id ;    
    this.render_header();

    this.didBlurSubscription = this.props.navigation.addListener(
      'focus',
      payload => {
          this.is_focused = true;
          if(this._isMounted==false){
          return;
          }
          this.state.matche_details = this.props.route.params&&this.props.route.params.id ? this.props.route.params : undefined;
          this.id = this.state.matche_details && this.state.matche_details.id ? this.state.matche_details.id : this.props.route.params.id ;
          this.refresh();
      }
      );
  }
  refresh=()=>{
    this.get_Match(this.id);
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
    if(this.id==undefined){
      return;
    }
    _API.get_match(id).then(resp=>{
      if(resp ){
        resp.home_team_logo = this.state.matche_details.home_team_logo;
        resp.away_team_logo = this.state.matche_details.away_team_logo;
        this.state.matche_details = resp;
        this.state.matche_details.round = this.state.matche_details.round.replace("الأسبوع","Week")
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
  get_info(){
    const key2show=[
      {"key":"status","label":"Status","default":"-"},
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
      return (
    <View style={styles_match.general_info_row} key={i.key}>
      <Text style={styles_match.general_info_label_text}>{i.label} : </Text>
      <Text style={styles_match.general_info_value_text}>{this.state.matche_details[i.key]}</Text>
    </View>);
    }) ;
    return(
      <>
      <View style={styles_match.title_view}><Text style={styles_match.title_text}>Match details </Text></View>
      <View style={styles_match.general_info_container}>
        {attrs}
      </View>
      </>
    );
  }
  get_eventsLine(){
    return (<View style={styles_match.stats_view}>
      <View style={[styles_match.stats_sides_view, styles_match.stats_left_view]}>
        <Text>test 1</Text>
      </View>
      <View style={[styles_match.stats_sides_view, styles_match.stats_right_view]}>
        <Text style={styles_match.stats_right_text}>test2</Text>
      </View>
    </View>);
  }
  get_scores(type_="home"){
    if(type_=="home"){this.scorers_h =[];this.assist_h =[];}
    else{this.scorers_a =[];this.assist_a =[];}

    let style_class = type_=="home"? styles_match.match_results_team_name_r : styles_match.match_results_team_name_l ;
    if(this.state.matche_details.goal_scorer){
      this.state.matche_details.goal_scorer = this.state.matche_details.goal_scorer.sort((a,b)=>{
        return a.time<b.time?-1:1
      });
      let res = this.state.matche_details.goal_scorer.map(elm=>{
        if(elm[type_+"_scorer"]==undefined || elm[type_+"_scorer"]=="" || elm[type_+"_scorer"]==null) return false;
        let text = "";
        if(type_=="away"){
          text = this.symbol_goal + " " +(elm.time ? elm.time+'"' : "-") +" "+ elm[type_+"_scorer"];
          /*
          if(_API.is_ascii(elm[type_+"_scorer"]) == false){
            text = this.symbol_goal + " " +(elm.time ? elm.time+'"' : "-") +" "+ elm[type_+"_scorer"];
          }else{
            text = elm[type_+"_scorer"]+" "+(elm.time ? elm.time+'"' : "-") +" "+this.symbol_goal;
          }*/
          this.scorers_a.push(elm[type_+"_scorer"]);
          this.assist_a.push(elm[type_+"_assist"]);
          
        }else{
          /*
          if(_API.is_ascii(elm[type_+"_scorer"]) == false){
            text = elm[type_+"_scorer"] +" "+(elm.time ? elm.time+'"' : "-") +" "+this.symbol_goal;
          }else{
            text = this.symbol_goal + " " +(elm.time ? elm.time+'"' : "-") +" " +elm[type_+"_scorer"];
          }*/
          text = elm[type_+"_scorer"] +" "+(elm.time ? elm.time+'"' : "-") +" "+this.symbol_goal;
          this.scorers_h.push(elm[type_+"_scorer"]);
          this.assist_h.push(elm[type_+"_assist"]);
        }
        return <Text style={[style_class,styles_match.match_results_scorer_text]} key={text}>{text}</Text>;
      });
      return(
          <View style={[style_class]}>
            {res ? res :null}
          </View>
      );
    }
  }
  e_format(e){
    let c = null;
    const event_symbole = this.event_symbols[e.type]?this.event_symbols[e.type]:e.type;
    const key = `${e.player_id}_${e.card_type}_${e.time}`;
    if(e.team=="home"){
      c = <View key={key} style={[styles_match.events_side_row,styles_match.events_side_row_home]}>
            <Text style={[styles_match.events_side_row_text,styles_match.events_side_text_home]} numberOfLines={1}>{e.player_name}</Text>
          </View>;
    }else{
      c = <View key={key} style={[styles_match.events_side_row,styles_match.events_side_row_away]}>
            <Text style={[styles_match.events_side_row_text,styles_match.events_side_text_away]} numberOfLines={1}>{e.player_name}</Text>
          </View>;
    }
    const placeholder_l=<View style={[styles_match.placeholder,styles_match.pullright]}>
        <Text style={styles_match.events_time}>{e.time}'</Text>
        <Text style={styles_match.events_symbole}>{event_symbole}</Text>
        <View style={styles_match.events_line}><Text> </Text></View>
      </View>;
    const placeholder_r=<View style={[styles_match.placeholder,]}>
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
    
    let events = [...this.state.matche_details.cards, ...this.state.matche_details.goal_scorer]
    events = events.sort((a,b)=>{
      return a.time<b.time?-1:1
    });
    for( const e of events){
      console.log(e)
      const e_res = this.e_format(e);
      home_side.push( e.team=="home" ? e_res[0] : e_res[1] );
      away_side.push( e.team=="away" ? e_res[0] : e_res[2] );
    }
    return <View style={styles_match.events_container}>
      <View style={[styles_match.events_side,styles_match.events_side_home]}>{home_side}</View>
      <View style={[styles_match.events_side,styles_match.events_side_away]}>{away_side}</View>
    </View>;
  }
  get_cards(type_="home"){
    this.match_events = [];
    this.ycards_h =[];
    this.rcards_h =[];
    this.ycards_a =[];
    this.rcards_a =[];

    let style_class = type_=="home"? styles_match.match_results_team_name_r : styles_match.match_results_team_name_l ;
    if(this.state.matche_details.cards){
      this.state.matche_details.cards = this.state.matche_details.cards.sort((a,b)=>{
        return a.time<b.time?-1:1
      });
      let res = this.state.matche_details.cards.map(elm=>{
        const __key = type_+"_card";
        console.log("elm", elm);
        //if(elm[__key]==undefined || elm[__key]=="" || elm[__key]==null) return false;
        let text = "";
        const card_type = elm.type=="r" ? this.symbol_redcard : this.symbol_yallowcard ;
        if(elm.team=="away"){
          text = card_type + " " + (elm.time ? elm.time+'"' : "-") +" "+ elm.player_name;
          if(elm.type=="r"){
            this.rcards_a.push(elm);
          }else{
            this.ycards_a.push(elm);
          }
          
          
        }else{
          text = elm.player_name +" "+(elm.time ? elm.time+'"' : "-") + " " + card_type;
          if(elm.type=="r"){
            this.rcards_h.push(elm);
          }else{
            this.ycards_h.push(elm);
          }
        }
        return <Text style={[style_class,styles_match.match_results_scorer_text]} key={text}>{text}</Text>;
      });
      return(
          <View style={[style_class]}>
            {res ? res :null}
          </View>
      );
    }
  }
  
  render() {
    //render_match(item, time_status,home_team_name,away_team_name,league_img)
    return (
      <ScrollView style={styles_match.container}
        contentContainerStyle={styles_match.container_container}
        refreshControl={
          <RefreshControl
            refreshing={this.state.loading}
            onRefresh={()=>this.get_Match(this.id)}
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
        
        {this.state.loading ? null : this.get_events()}
        {this.state.loading ? <Loading /> : this.get_info()}
        <EmptySpace />
      </ScrollView>
    );
  }
}

export default Matchcreen;

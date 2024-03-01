import React from "react";
import { View, TouchableHighlight, Modal, Text, Switch, TouchableOpacity,Image, Dimensions, ScrollView, RefreshControl} from 'react-native';
import Loading from '../Components/Loader';
import styles_match from "../Styles/match"
import render_match  from '../Components/render_match';
import IconButton from '../Components/iconBtn';

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
    this.symbol_goal = "⚽";
    this.symbol_redcard = "🟥";
    this.symbol_yallowcard = "🟨";
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
    this.props.navigation.setOptions({title: title,
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
      if(resp && resp["data"] && resp["data"][0] ){
        this.state.matche_details = resp["data"][0];
        this.home_team_ar = this.state.matche_details.home_team_ar ? this.state.matche_details.home_team_ar : this.state.matche_details.home_team;
        this.away_team_ar = this.state.matche_details.away_team_ar ? this.state.matche_details.away_team_ar : this.state.matche_details.away_team; 
        this.render_header();
        API_.setTitleWeb(this.home_team_ar +" - "+ this.away_team_ar);
      }
      this.setState({loading:false});
    });
  }

  get_View_general(){
    this.state.matche_details.channels = this.state.matche_details.channels ? this.state.matche_details.channels : [];
    this.state.matche_details.channels = this.state.matche_details.channels.sort((a,b)=>{return ( this.state.favorite.indexOf(a.en_name)>=this.state.favorite.indexOf(b.en_name))?-1:1;});
    this.state.matche_details.channels = this.state.matche_details.channels.sort((a,b)=>{return (a.commentator!=undefined && this.state.favorite.indexOf(b.en_name)==-1  )?-1:0;});
    
    if(this.state.matche_details=={}) {return null;}

    this.state.matche_details.status       = this.state.matche_details.status ? this.state.matche_details.status : "-";
    this.state.matche_details.league       = this.state.matche_details.league ? this.state.matche_details.league : "-";
    this.state.matche_details.phase        = this.state.matche_details.phase ? this.state.matche_details.phase : "-";
    this.state.matche_details.group        = this.state.matche_details.group ? this.state.matche_details.group : "-";
    this.state.matche_details.round        = this.state.matche_details.round ? this.state.matche_details.round : "-";
    this.state.matche_details.retour_score = this.state.matche_details.retour_score ? this.state.matche_details.retour_score : "-";
    this.state.matche_details.stadium      = this.state.matche_details.stadium ? this.state.matche_details.stadium : "-";
    this.state.matche_details.desc         = this.state.matche_details.desc ? this.state.matche_details.desc : "-";
    this.state.matche_details.match_status = this.state.matche_details.match_status ? this.state.matche_details.match_status : "OK";
    
    //const fav_style_h = this.state.matche_details && this.get_fav_icon(row.team.id, true) ? {backgroundColor: global_theme.fav_background} : {};
    //const fav_style_a = this.state.matche_details && this.get_fav_icon(row.team.id, true) ? {backgroundColor: global_theme.fav_background} : {};
    const fav_style={};
    const team_badge_h= this.state.matche_details && this.state.matche_details.home_team_logo ? this.state.matche_details.home_team_logo : false;
    const team_badge_a= this.state.matche_details && this.state.matche_details.away_team_logo ? this.state.matche_details.away_team_logo : false;
    const style_team_name ={flexDirection:'row',flexWrap:'wrap',width:"100%",height:50,borderColor:global_theme.text_color_default,borderBottomWidth :1,borderRadius:40,justifyContent:"center"};

    const live_style = this.state.matche_details.live ? {"color":global_theme.live_borderColor}:{};
    
    const head2head_info = this.state.head2head && Object.keys(this.state.head2head).length==3 ?
    Object.keys(this.state.head2head).map(k=><Text style={[styles_match.text_info,{color:"orange"}]} key={k}>{k} : {this.state.head2head[k]}</Text>)
    : null;
    return (
      <View style={styles_match.view_tab}>
        <Text style={styles_match.text_info}>{this.state.matche_details.datetime ? this.state.matche_details.datetime : this.state.matche_details.date+" "+API_.convert_time(this.state.matche_details.time)} </Text>
        {1==2 && this.state.matche_details && this.home_team_ar!="-" ?
          <TouchableOpacity 
            activeOpacity={0.7}
            style={[fav_style, style_team_name]} 
            onPress={() => { if (this.state.matche_details.home_team_id)this.setState({modalVisible_team:true,team_id:this.state.matche_details.home_team_id}) } }
            delayLongPress={300}
            >
          <View style={{flex:1}}></View>
          <View style={{flex:5}}><Text style={styles_match.text_info}>HomeTeam :</Text></View>
          <View style={{flex:2,padding:2}} >
            {team_badge_h ? <Image style={{height:"95%",width:"95%"}} source={{uri: team_badge_h}} /> : null}
          </View>
          <View style={{flex:7}}><Text style={styles_match.text_info} numberOfLines={1}> {this.home_team_ar}</Text></View>
          <View style={{flex:1}}></View>
        </TouchableOpacity>
         : null}
        {1==2 &&  this.state.matche_details && this.away_team_ar!="-" ?
          <TouchableOpacity 
          activeOpacity={0.7}
          style={[fav_style, style_team_name]} 
          onPress={() => { if (this.state.matche_details.away_team_id)this.setState({modalVisible_team:true,team_id:this.state.matche_details.away_team_id}) } }
          delayLongPress={300}
          >
        <View style={{flex:1}}></View>
        <View style={{flex:5}}><Text style={styles_match.text_info}>AwayTeam :</Text></View>
        <View style={{flex:2,padding:2}} >
          {team_badge_a ? <Image style={{height:"95%",width:"95%"}} source={{uri: team_badge_a}} /> : null}
        </View>
        <View style={{flex:7}}><Text style={styles_match.text_info} numberOfLines={1}> {this.away_team_ar}</Text></View>
        <View style={{flex:1}}></View>
      </TouchableOpacity>
         : null}
        {this.state.matche_details.status!="-" && this.state.matche_details.match_status=="ok" ?
          <Text style={styles_match.text_info}>Status : {this.state.matche_details.status}</Text>
         : null}
        {this.state.matche_details.match_status!="ok" ?
          <Text style={[styles_match.text_info,{color:"red"}]}>Status : {this.state.matche_details.match_status}</Text>
         : null}
        {this.state.matche_details.time_played && this.state.matche_details.time_played!="-" ?
          <Text style={[styles_match.text_info,live_style]}>Playing time : {this.state.matche_details.time_played}</Text>
         : null}
        {this.state.matche_details.league!="-" ?
          <Text style={styles_match.text_info}>League : {this.state.matche_details.league}</Text>
         : null}
        {this.state.matche_details.phase!="-" ?
          <Text style={styles_match.text_info}>Phase : {this.state.matche_details.phase}</Text>
         : null}
        {this.state.matche_details.group!="-" ?
          <Text style={styles_match.text_info}>Group : {this.state.matche_details.group}</Text>
         : null}
        {this.state.matche_details.round!="-" ?
          <Text style={styles_match.text_info}>Round : {this.state.matche_details.round}</Text>
         : null}
        {this.state.matche_details.retour_score!="-" ?
          <Text style={styles_match.text_info}>First leg : {this.state.matche_details.retour_score}</Text>
         : null}
        {this.state.matche_details.stadium!="-" ?
          <Text style={styles_match.text_info}>Staduim : {this.state.matche_details.stadium}</Text>
         : null}
        {this.state.matche_details.referee && this.state.matche_details.referee!="-" ?
          <Text style={styles_match.text_info}>Referee : {this.state.matche_details.referee}</Text>
         : null}
        {this.state.matche_details.desc!="-" ?
          <Text style={[styles_match.text_info,{color:"Orange"}]}>Description : {this.state.matche_details.desc}</Text>
         : null}
        {head2head_info && head2head_info.length>0 && 
        <Text style={styles_match.text_info}>Head to Head : </Text>
        }
        {head2head_info}

        <View style={{flexDirection:'row', flexWrap:'wrap', flex:1}}>
          <Text style={styles_match.text_info}>Live match :</Text>
          <Switch
                    style={{justifyContent:"center",marginVertical:"auto",marginHorizontal:10,width:40}}
                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                    thumbColor={this.state.is_live_match ? "#f5dd4b" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={async()=>{
                      if(this.state.is_live_match){
                        this.state.is_live_match = !await backup.remove_live_match(this.state.matche_details.id, this.away_team_ar + " VS " + this.home_team_ar);
                      }else{
                        this.state.is_live_match = await backup.save_live_match(this.state.matche_details, this.away_team_ar + " VS " + this.home_team_ar);
                      }
                      this.setState({ is_live_match : this.state.is_live_match ? true : false});
                    }}
                    value={this.state.is_live_match}
                  />
        </View>
        {channels!=null && channels.length>0 ?
          <Text style={styles_match.text_info}>Channels :</Text>
         : null}
        {channels!=null && channels.length>0 ?
          channels
         : null}
      </View> 
    );
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
    this.state.matche_details.status       = this.state.matche_details.status ? this.state.matche_details.status : "-";
    this.state.matche_details.league       = this.state.matche_details.league ? this.state.matche_details.league : "-";
    this.state.matche_details.phase        = this.state.matche_details.phase ? this.state.matche_details.phase : "-";
    this.state.matche_details.group        = this.state.matche_details.group ? this.state.matche_details.group : "-";
    this.state.matche_details.round        = this.state.matche_details.round ? this.state.matche_details.round : "-";
    this.state.matche_details.retour_score = this.state.matche_details.retour_score ? this.state.matche_details.retour_score : "-";
    this.state.matche_details.stadium      = this.state.matche_details.stadium ? this.state.matche_details.stadium : "-";
    this.state.matche_details.desc         = this.state.matche_details.desc ? this.state.matche_details.desc : "-";
    this.state.matche_details.match_status = this.state.matche_details.match_status ? this.state.matche_details.match_status : "OK";
    return(
      <>
      <View style={styles_match.title_view}><Text style={styles_match.title_text}>Match details : </Text></View>
      <View style={styles_match.general_info_container}>
        <View style={styles_match.general_info_row}>
          <Text style={styles_match.general_info_label_text}>League : </Text>
          <Text style={styles_match.general_info_value_text}>{this.state.matche_details.league}</Text>
        </View>
        <View style={styles_match.general_info_row}>
          <Text style={styles_match.general_info_label_text}>Phase : </Text>
          <Text style={styles_match.general_info_value_text}>{this.state.matche_details.phase}</Text>
        </View>
        <View style={styles_match.general_info_row}>
          <Text style={styles_match.general_info_label_text}>Group : </Text>
          <Text style={styles_match.general_info_value_text}>{this.state.matche_details.group}</Text>
        </View>
        <View style={styles_match.general_info_row}>
          <Text style={styles_match.general_info_label_text}>Round : </Text>
          <Text style={styles_match.general_info_value_text}>{this.state.matche_details.round}</Text>
        </View>
        <View style={styles_match.general_info_row}>
          <Text style={styles_match.general_info_label_text}>Status : </Text>
          <Text style={styles_match.general_info_value_text}>{this.state.matche_details.status}</Text>
        </View>
        <View style={styles_match.general_info_row}>
          <Text style={styles_match.general_info_label_text}>1st leg results : </Text>
          <Text style={styles_match.general_info_value_text}>{this.state.matche_details.retour_score}</Text>
        </View>
        <View style={styles_match.general_info_row}>
          <Text style={styles_match.general_info_label_text}>Stadium : </Text>
          <Text style={styles_match.general_info_value_text}>{this.state.matche_details.stadium}</Text>
        </View>
        <View style={styles_match.general_info_row}>
          <Text style={styles_match.general_info_label_text}>Description : </Text>
          <Text style={styles_match.general_info_value_text}>{this.state.matche_details.desc}</Text>
        </View>
        <View style={styles_match.general_info_row}>
          <Text style={styles_match.general_info_label_text}>Match status : </Text>
          <Text style={styles_match.general_info_value_text}>{this.state.matche_details.match_status}</Text>
        </View>

      </View>
      </>
    );
  }
  get_eventsLine(){
    return (        <View style={styles_match.stats_view}>
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
          if(API_.is_ascii(elm[type_+"_scorer"]) == false){
            text = this.symbol_goal + " " +(elm.time ? elm.time+'"' : "-") +" "+ elm[type_+"_scorer"];
          }else{
            text = elm[type_+"_scorer"]+" "+(elm.time ? elm.time+'"' : "-") +" "+this.symbol_goal;
          }
          this.scorers_a.push(elm[type_+"_scorer"]);
          this.assist_a.push(elm[type_+"_assist"]);
          
        }else{
          if(API_.is_ascii(elm[type_+"_scorer"]) == false){
            text = elm[type_+"_scorer"] +" "+(elm.time ? elm.time+'"' : "-") +" "+this.symbol_goal;
          }else{
            text = this.symbol_goal + " " +(elm.time ? elm.time+'"' : "-") +" " +elm[type_+"_scorer"];
          }
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

  get_cards(type_="home"){
    if(type_=="home"){
      this.ycards_h =[];
      this.rcards_h =[];
    }else{
      this.ycards_a =[];
      this.rcards_a =[];
    }
    let style_class = type_=="home"? styles_match.match_results_team_name_r : styles_match.match_results_team_name_l ;
    if(this.state.matche_details.cards){
      this.state.matche_details.cards = this.state.matche_details.cards.sort((a,b)=>{
        return a.time<b.time?-1:1
      });
      let res = this.state.matche_details.cards.map(elm=>{
        const __key = type_+"_card";
        if(elm[__key]==undefined || elm[__key]=="" || elm[__key]==null) return false;
        let text = "";
        const card_type = elm.type=="r" ? this.symbol_redcard : this.symbol_yallowcard ;
        if(type_=="away"){
          if(API_.is_ascii(elm[__key]) == false){
            text = card_type + " " + (elm.time ? elm.time+'"' : "-") +" "+ elm[__key];
          }else{
            text = elm[__key]+" "+(elm.time ? elm.time+'"' : "-") + " " + card_type;
          }
          if(elm.type=="r"){
            this.rcards_a.push(elm[__key]);
          }else{
            this.ycards_a.push(elm[__key]);
          }
          
          
        }else{
          if(API_.is_ascii(elm[__key]) == false){
            text = elm[__key] +" "+(elm.time ? elm.time+'"' : "-") + " " + card_type;
          }else{
            text = card_type + " " + (elm.time ? elm.time+'"' : "-") +" " +elm[__key];
          }
          if(elm.type=="r"){
            this.rcards_h.push(elm[__key]);
          }else{
            this.ycards_h.push(elm[__key]);
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
        refreshControl={
          <RefreshControl
            refreshing={this.state.loading}
            onRefresh={()=>this.get_Match(this.id)}
          />}
      >
        <View style={{height:200}}>
          {render_match(this.state.matche_details, this.windowWidth)}
        </View>
        {this.state.loading ? <Loading /> : null}
        {this.get_info()}
      </ScrollView>
    );
  }
}

export default Matchcreen;

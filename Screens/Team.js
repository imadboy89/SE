import React from "react";
import { View, Pressable, Modal, Text, ScrollView} from 'react-native';
import Loading from '../Components/Loader';
import styles_match from "../Styles/match"
import render_match  from '../Components/MatchCard';
import IconButton from '../Components/iconBtn';
import { Image,ImageBackground } from 'expo-image';
import EmptySpace from  '../Components/EmptySpace';
import Team from "../libs/teams";
import FavoriteIcon from "../Components/FavoriteIcon";
import BackBtn from "../Components/backBtn"
class Teamcreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        list:[],
        key_:"en_name",
        team_details:this.props.route.params,
        loading:true,
        height:"100%",

    };
    this.id = this.props.route?.params?.team_id ;
    console.log(this.props.route.params)
  }
  componentDidMount(){
    this._isMounted=true;
    this.state.team_details = this.state.team_details && this.state.team_details!="-" ? this.state.team_details : undefined;
    this.id = this.state.team_details && this.state.team_details.team_id ? this.state.team_details.team_id : this.props.route.params.team_id ;    
    this.render_header();

    this.didBlurSubscription = this.props.navigation.addListener(
      'focus',
      payload => {
          this.is_focused = true;
          if(this._isMounted==false){return;}
          this.state.team_details = this.state.team_details && this.state.team_details!="-" ? this.state.team_details : undefined;
          this.id = this.state.team_details && this.state.team_details.team_id ? this.state.team_details.team_id : this.props.route.params.team_id ;
          this.refresh();
      }
      );
  }
  refresh=()=>{
    this.get_Team();
  }
  render_header=()=>{
    let title = "";
    if(this.state.team_details){
      title=`${this.state.team_details.team_name_en}`;
    }
    this.props.navigation.setOptions({title: title,
      headerLeft: (props) => (
        <BackBtn  {...props} navigation={this.props.navigation}/>
      ),
    });
  }
  async get_Team(){
    if(this.id==undefined){
      return;
    }
    const resp = await _API.get_team(this.id)
    if(resp && resp.team_id && resp.team_logo){
      const tm = new Team();
      tm.updateTeams(resp.team_id,resp.team_logo);
    }
    if(resp ){
    //resp.home_team_logo = this.state.team_details.home_team_logo;
    //resp.away_team_logo = this.state.team_details.away_team_logo;
    this.state.team_details = resp;
    this.render_header();
    //_API.setTitleWeb(this.home_team_ar +" - "+ this.away_team_ar);
    }
    this.setState({loading:false});
  }
  player_onLongPress=async(item)=>{
    const isok = await _Favs.toggle_favorite("players",_Favs.format(...item));
    if(isok){
      this.setState({})
    }
  }
  get_squad(){
    if(this.state.team_details && this.state.team_details.squad_club && this.state.team_details.squad_club.map){
      this.state.team_details.squad_club = this.state.team_details.squad_club.filter((sq,ind,self)=>this.state.team_details.squad_club.indexOf(sq)===ind);
    }
    const players = this.state.team_details && this.state.team_details.squad_club && this.state.team_details.squad_club.map
    ? this.state.team_details.squad_club.map(row=>{
      const p_id = row[0];
      const p_pos = row[1];
      const p_nbr = p_pos>0 ? row[3] : "🗣️";
      const p_ccode = row[7];
      const p_name = row[4] && row[4].trim ? row[4].trim() : "";
      const ma_style = p_ccode && p_ccode.trim && p_ccode.toLocaleLowerCase().trim() == "ma" ? {borderWidth:1}: {};
      const cc_flag = p_ccode && p_ccode.trim && p_ccode.toLocaleLowerCase().trim()!="" ?  p_ccode.toLocaleLowerCase().trim() : false;
      const text = {fontSize:20};
      return  <Pressable key={p_id+"-"+p_pos}
      onLongPress={()=>{
        this.player_onLongPress([p_id,p_name,""]);
      }}
      delayLongPress={300}
      activeOpacity={0.7}
      style={[{flexDirection:"row",flex:1,height:35,borderBottomWidth:1,justifyContent:"center",alignContent:"center",alignItems:"center",alignContent:"center"},ma_style ]}>

        <FavoriteIcon favType="players" favId={p_id}  size={18} style={{}}
            item={[p_id,p_name,""]}/>
        <View style={{width:30,}}><Text style={text}>{p_nbr}</Text></View>
        <View style={{flex:1}}><Text style={text}>{p_name}</Text></View>
        {cc_flag!=false ? 
        <View style={{width:40,padding:5,marginHorizontal:22}} >
          <Image 
          style={{height:"99%",width:"99%"}}  
          imageStyle={{borderRadius:  20,height:"99%",width:"99%"}} 
          source={{uri: _API.get_cc_img(cc_flag, true)}} />
        </View> : null }
        </Pressable>;

      return <View key={p_id} styles={this.state.dynamic_style.info_row}>
                <Text style={this.state.dynamic_style.text_carrier}>{p_name}</Text>
              </View>
    }) : null;
    return <>
          <View style={styles_match.title_view}><Text style={styles_match.title_text}>Players List : </Text></View>
          {players}
          </>;
  }
  get_info(){
    const key2show=[
      {"key":"team_country","label":"Country","default":"-"},
      {"key":"team_type","label":"Type","default":"-"},
      {"key":"team_sport","label":"Sport","default":"-"},
      {"key":"team_class","label":"Class","default":"-"},
      {"key":"team_url","label":"Web site","default":"-"},
      {"key":"team_year_established","label":"Established","default":"-"},
    ]
    let attrs = key2show.map(i=> {

      if(!this.state.team_details[i.key] || this.state.team_details[i.key]=="" || this.state.team_details[i.key]=="-"){
        return null;
      }
      let value = this.state.team_details[i.key];
      if(i.key=="team_type"){
        value=parseInt(value);
        value = _API.team_types[value]?_API.team_types[value]:"-";
      }
      if(i.key=="team_sport"){
        value=parseInt(value);
        value = _API.sport_types[value]?_API.sport_types[value]:"-";
      }
      return (
    <View style={styles_match.general_info_row} key={i.key}>
      <Text style={styles_match.general_info_label_text}>{i.label} : </Text>
      <Text style={styles_match.general_info_value_text}>{value}</Text>
    </View>);
    }) ;
    return(
      <>
      <View style={styles_match.title_view}><Text style={styles_match.title_text}>Team details : </Text></View>
      <View style={styles_match.general_info_container}>
        {attrs}
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

  render() {
    //render_match(item, time_status,home_team_name,away_team_name,league_img)
    return (
      <ScrollView style={styles_match.container}
        contentContainerStyle={styles_match.container_container}
      >
        <FavoriteIcon 
          favType="teams" 
          favId={this.id} 
          pullRight showAlways size={50} 
          onPress={()=>this.setState({})}
          item={[this.id,this.state.team_details.team_name_en,this.state.team_details.team_logo]}
          />
        <View style={{height:250,width:"98%",alignItems:"center",justifyContent:"center",alignContent:"center", flex:1}}>
            <Image
                source={{uri:this.state.team_details.team_logo}}
                style={{width:150,height:150}}
                contentFit="contain"
            />
          <Text style={{width:"80%",textAlign:"center",margin:10,fontSize:18,fontWeight:"bold"}}>{this.state.team_details.team_name_en}</Text>

        </View>
        <View style={{width:"100%",flex:1,alignItems:"center",justifyContent:"center",alignContent:"center",}}>
        {this.state.team_details && this.state.team_details.team_group_photo ? <Image
                source={{uri:this.state.team_details.team_group_photo}}
                style={{width:"95%",height:200, }}
                contentFit="contain"
            />:null}
        </View>
        {this.state.loading ? <Loading /> : this.get_info()}

        {this.get_squad()}
        <EmptySpace/>
      </ScrollView>
    );
  }
}

export default Teamcreen;

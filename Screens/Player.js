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
class PlayerSreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        list:[],
        key_:"en_name",
        player_details:this.props.route.params,
        loading:true,
        height:"100%",

    };
  }
  componentDidMount(){
    this._isMounted=true;
    this.state.player_details = this.state.player_details && this.state.player_details!="-" ? this.state.player_details : undefined;
    this.render_header();

    this.didBlurSubscription = this.props.navigation.addListener(
      'focus',
      payload => {
          this.is_focused = true;
          if(this._isMounted==false){return;}
          this.state.player_details = this.state.player_details && this.state.player_details!="-" ? this.state.player_details : undefined;
          this.refresh();
      }
      );
  }
  refresh=()=>{
    this.get_Player();
  }
  render_header=()=>{
    let title = "";
    if(this.state.player_details){
      title=`${this.state.player_details.player_name_en}`;
    }
    this.props.navigation.setOptions({title: title,
      headerLeft: (props) => (
        <BackBtn  {...props} navigation={this.props.navigation}/>
      ),
    });
  }
  async get_Player(){
    if(this.state.player_details==undefined || this.state.player_details.player_id==undefined){
      return;
    }
    const resp = await _API.get_player(this.state.player_details.player_id)
    console.log(resp)
    if(resp ){
    //resp.home_team_logo = this.state.player_details.home_team_logo;
    //resp.away_team_logo = this.state.player_details.away_team_logo;
    this.state.player_details = resp;
    this.render_header();
    //_API.setTitleWeb(this.home_team_ar +" - "+ this.away_team_ar);
    }
    this.setState({loading:false});
  }

  get_info(){
    const key2show=[
      {"key":"player_nationality","label":"Nationality","default":"-"},
      {"key":"player_position","label":"Position","default":"-"},
      {"key":"player_sport","label":"Sport","default":"-"},
      {"key":"player_birthdate","label":"Birth day","default":"-"},
      {"key":"player_team_name","label":"Team","default":"-"},
    ]
    let attrs = key2show.map(i=> {

      if(!this.state.player_details[i.key] || this.state.player_details[i.key]=="" || this.state.player_details[i.key]=="-"){
        return null;
      }
      let value = this.state.player_details[i.key];
      if(i.key=="player_sport"){
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
      <View style={styles_match.title_view}><Text style={styles_match.title_text}>Player details : </Text></View>
      <View style={styles_match.general_info_container}>
        {attrs}
      </View>
      </>
    );
  }


  render() {
    //render_match(item, time_status,home_team_name,away_team_name,league_img)
    return (
      <ScrollView style={styles_match.container}
        contentContainerStyle={styles_match.container_container}
      >
        <FavoriteIcon 
          favType="players" 
          favId={this.state.player_details.player_id} 
          pullRight showAlways size={50} 
          onPress={()=>this.setState({})}
          item={[this.state.player_details.player_id,this.state.player_details.player_name_en,this.state.player_details.player_photo]}
          style={{position: 'absolute',top:2,right:2, zIndex:999}}
          />
        <View style={{height:250,width:"98%",alignItems:"center",justifyContent:"center",alignContent:"center", flex:1}}>
            <Image
                source={{uri:this.state.player_details.player_photo}}
                style={{width:150,height:150}}
                contentFit="contain"
            />
          <Text style={{width:"80%",textAlign:"center",margin:10,fontSize:18,fontWeight:"bold"}}>
            {this.state.player_details.player_name_en}
            </Text>

        </View>
        <View style={{width:"100%",flex:1,alignItems:"center",justifyContent:"center",alignContent:"center",}}>
        {this.state.player_details && this.state.player_details.team_group_photo ? <Image
                source={{uri:this.state.player_details.team_group_photo}}
                style={{width:"95%",height:200, }}
                contentFit="contain"
            />:null}
        </View>
        {this.state.loading ? <Loading /> : this.get_info()}
        <EmptySpace/>
      </ScrollView>
    );
  }
}

export default PlayerSreen;

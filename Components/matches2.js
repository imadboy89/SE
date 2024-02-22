import * as React from 'react';
import {  View, TouchableOpacity, Image, ImageBackground  } from 'react-native';
import { SafeAreaView, FlatList, Dimensions,TouchableHighlight, Text } from 'react-native';
import Loader from "./Loader";
import styles_list from "../Styles/matches";
import styles_matches from "../Styles/matches2";
import {_isMobile,isBigScreen, isWeb} from "../Styles/general";

import {img_domain} from "../libs/config";
function parse_details(){
  return ;
}
class ItemsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dynamic_style:false,
      header_to_hide:[],
      numColumns:1,
      list : [],
    }
    this.minWidth = this.props.minWidth ? this.props.minWidth : 400; 
    this.list = [];
    this.elem_width = this.minWidth;
    this.check_width(false);
    this.flatListRef = false;
    this.windowHeight = Dimensions.get('window').height ;
    this.ScrollNav = false;
    this.refs_list = [];
    this.refs_map = {};
    this.page = this.props.page;
    this.flatlist_offset = 0;
  }
  componentDidMount=()=>{
    this._isMounted=true;
    //AppState.addEventListener("resize", this.check_width.bind(this));
    if(isWeb && Dimensions && Dimensions.addEventListener){
      Dimensions.addEventListener("change",this.check_width);
    }
  }
  componentWillUnmount(){
    //alert("componentWillUnmount");
    this._isMounted=false;
    if(isWeb && Dimensions && Dimensions.removeEventListener){
      Dimensions.removeEventListener("change",this.check_width);
    }
    try {
      this.ScrollNav.unsubscribe();
    } catch (error) {}
  }
  componentDidUpdate(){
    /*
    if(this.refs_list && this.refs_list[0] && this.refs_list[0].current && this.refs_list[0].current.focus){
      console.log(this.refs_list[0],this.refs_list[0].current , this.refs_list[0].current.focus);
      this.refs_list[0].current.focus();
    }
    */
  }
  check_width=(render=true)=>{
    const current_windowWidth= Dimensions.get('window').width<=1000 ? Dimensions.get('window').width : 1000;
    if(this.windowWidth == current_windowWidth || this.props.disable_auto_scal==true){return ;}
    let margin2add = _isMobile ? 15 : 40;
    margin2add = this.minWidth<300 ? parseInt(margin2add * (this.minWidth/300)): margin2add;
    this.windowWidth = current_windowWidth;
    this.state.numColumns = parseInt(this.windowWidth/this.minWidth);
    this.state.numColumns = this.state.numColumns>=1 ? this.state.numColumns : 1;
    this.elem_width = this.props.fixedWidth ? this.minWidth : parseInt((this.windowWidth-margin2add)/this.state.numColumns);
    if(render && this.props.refresh_list){
      if(this._isMounted){
        this.props.refresh_list(1);
      }
    }
    return true;
  } 
  render_match(item, time_status,home_team_name,away_team_name,league_img,home_team_style ,away_team_style ){
    const shadow_style = isWeb ? styles_matches.shadow_3  : styles_matches.shadow_1;
    console.log(item.away_team_logo)
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
            <Text style={styles_list.matche_team_time_text} noFonts={true}>{item.time}"</Text>
          </View>
          <View style={styles_matches.matche_team_time_view}>{time_status}</View>
        </View>
      </View>
      );
  }
  render_match2(item, time_status,home_team_name,away_team_name,league_img,home_team_style ,away_team_style ){
    const shadow_style = isWeb ? styles_list.shadow_3  : styles_list.shadow_1;
    return (
      <View style={[styles_list.matche_container,shadow_style]}>
        <View style={styles_list.matche_team_time}>
          <Text style={styles_list.matche_team_time_t} noFonts={true}>{item.time}</Text>
          {time_status}
        </View>
        {item.home_team_badge && item.away_team_badge ? 
          <View style={styles_list.matche_team_badge}>
            <Image
            style={styles_list.matche_team_logo}
            source={{uri: item.home_team_badge}}
              />
            <Image
            style={styles_list.matche_team_logo}
            source={{uri: item.away_team_badge}}
              />
          </View>
        : null }

        <View style={styles_list.matche_team_names}>
          <ImageBackground source={{uri: league_img}} style={{height:"100%",width:"100%"}}  resizeMode="stretch" imageStyle={{opacity: 0.3}}>
            <Text style={[styles_list.matche_team_name_text,home_team_style]} numberOfLines={1}>{home_team_name}</Text>
            <Text style={[styles_list.matche_team_name_text,away_team_style]} numberOfLines={1}>{away_team_name}</Text>
          </ImageBackground>
        </View >
        { item.home_team_score_penalties==undefined ? null : 
          <View style={styles_list.matche_team_score_penalties}>
            <Text style={styles_list.matche_team_score_text_penalties} noFonts={true}>{item.home_team_score_penalties ? item.home_team_score_penalties : "-"}</Text>
            <Text style={styles_list.matche_team_score_text_penalties} noFonts={true}>{item.away_team_score_penalties ? item.away_team_score_penalties : "-"}</Text>
          </View>
        }
        <View style={styles_list.matche_team_score}>
          <Text style={styles_list.matche_team_score_text} noFonts={true}>{item.home_team_score ? item.home_team_score : "-"}</Text>
          <Text style={styles_list.matche_team_score_text} noFonts={true}>{item.away_team_score ? item.away_team_score : "-"}</Text>
        </View>
      </View>
      );
  }
  get_item(item,col_key){
    
    const style_small = {}
    let home_team_name = item["home_team_ar"] ? item["home_team_ar"] : item["home_team"];
    let away_team_name = item["away_team_ar"] ? item["away_team_ar"] : item["away_team"];
    if(home_team_name==undefined || away_team_name==undefined ){
      return null;
    }
    let home_team_style = {};
    let away_team_style = {};
    const max_lenght = parseInt(this.windowWidth/19) ;
    if(home_team_name.length>max_lenght){ home_team_style={fontSize:17}; }
    if(away_team_name.length>max_lenght){ away_team_style={fontSize:17}; }
    
    if(item.home_team_status && item.home_team_status.toLowerCase()=="w"){ 
      home_team_style["color"]=styles_list.team_name_winner; 
    }
    if(item.away_team_status && item.away_team_status.toLowerCase()=="w"){ 
      away_team_style["color"]=styles_list.team_name_winner; 
    }
    if(item.home_team_status && item.home_team_status.toLowerCase()=="l"){ 
      home_team_style["color"]=styles_list.team_name_drawer; 
    }
    if(item.away_team_status && item.away_team_status.toLowerCase()=="l"){ 
      away_team_style["color"]=styles_list.team_name_drawer; 
    }

    const league_img = item.league_img ? item.league_img : null;
    let time_style={};
    const game_nbr  ={color:"#8fa2ff", fontSize:12};
    try {
      time_style = JSON.parse(JSON.stringify(styles_list.matche_team_time_live));
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

    return this.render_match(item, time_status,home_team_name,away_team_name,league_img);
  }


  _render_item=({item})=>{
    const item2render=  (<TouchableOpacity
      
      style={{width:this.elem_width,alignSelf:"center"}}
      activeOpacity={0.5}
      onPress={ () => {this.props.onclick(item) }} 
      onLongPress={ () => {this.props.onLongPress?this.props.onLongPress(item):null; }} >
      <View style={{flexDirection:'row', flexWrap:'wrap',width:"100%",justifyContent: 'center',alignItems:"center",alignContent:"center",marginHorizontal:3,}}>
        {this.get_item(item,this.props.key_)}
      </View>
    </TouchableOpacity>);
    return item2render;
  }

  _render_header=({ section: { title,img,id,is_koora,options } })=>{
    //console.log(title,img,id);
    const fav_icon = this.get_fav_icon(title,id);
    if(title==undefined || title==""){
      return null;
    }
    let header_style = {flex:1};
    const max_lenght = parseInt(this.windowWidth/14) ;
    if(title.length>max_lenght){ header_style={fontSize:17}; }
    
    return (
      <TouchableHighlight style={styles_list.header_container}
        underlayColor={"green"}
        activeOpacity={0.9}
        onPress={()=>{
          let id_=0;
          try {
            id_ = title;
            
          } catch (error) {}
          if (id_==0 || this.props.refresh_list == undefined) return;
          if(this.state.header_to_hide.includes(id_)){
            this.state.header_to_hide=this.state.header_to_hide.filter(x=>{if(x!=id_)return x});
          }else{
            this.state.header_to_hide.push(id_);
          }
          this.props.refresh_list();
          }}
      >
        <View style={[{paddingLeft:3,paddingRight:1,flexDirection:'row', flexWrap:'wrap'},styles_list.header]}>

          <View style={{flex:7,maxHeight:"100%",}} >
            <Text style={[styles_list.header_components,header_style]} numberOfLines={1}>{title}</Text>
          </View>
          {fav_icon}
          <View style={{width: isBigScreen ? 100 : 70,height:"99%"}}>
          { img ?  
                  <ImageBackground 
                    style={styles_list.matche_league_logo_c}
                    imageStyle={is_koora ? styles_list.matche_league_logo_k : styles_list.matche_league_logo}
                    source={{uri: img.slice(0,8)=="https://" ? img :img_domain+img}}
                    />
            : null}
          </View>
        </View>
      </TouchableHighlight>);

  }



  render_list() {
    
    /*let is_new = JSON.stringify(this.list_origin) != JSON.stringify(this.props.list);
    is_new = is_new && (this.props.ListHeaderComponent!= this.ListHeaderComponent || this.props.ListFooterComponent!=this.ListFooterComponent);
    */
    let list_n;
    const list_o = this.list_origin ? JSON.parse(JSON.stringify(this.list_origin)).map(o=>{ delete o["data"];return o}) : [];
    try {
      list_n = this.props.list ? JSON.parse(JSON.stringify(this.props.list)).map(o=>{ delete o["data"];return o}) : [];
    } catch (error) {
      console.log(error, this.props.list);
      return ;
    }
    
    let is_new = JSON.stringify(list_o) != JSON.stringify(list_n);
    const is_paginated = this.props.ListHeaderComponent!= this.ListHeaderComponent || this.props.ListFooterComponent!=this.ListFooterComponent ;

    this.list_origin = this.props.list;
    this.ListFooterComponent = this.props.ListFooterComponent;
    this.ListHeaderComponent = this.props.ListHeaderComponent;

    this.list = this.props.list;
    if (this.list && this.list[0] && this.list[0]["title"]==undefined){
      this.list=[{"title":"",data:this.list}];
    }
    //this.list = this.list[0] ? this.list[0]["data"]: [];

      let final_list = [];
      for(let i=0;i<this.list.length;i++){
        let header = JSON.parse(JSON.stringify(this.list[i])) ;
        delete header["data"];
        header["is_header"] = true;
        //final_list = final_list.concat([header]);
        let _items = this.list[i] ? this.list[i].data : [];
        _items = _items==undefined ? [this.list[i],] : _items;
        final_list = final_list.concat(_items);
      }
      console.log("heere");
      //to avoid 'FlatList : Invariant Violation: Changing numColumns on the fly is not supported' error
      if(this.props.loading==false && this.props.list && this.props.list.length == 0){
        return (
        <>
        {this.props.ListHeaderComponent!=undefined ? this.props.ListHeaderComponent : undefined}
        </>);
      }
      return (
        <View style={styles_list.list_container}>
          <SafeAreaView style={styles_list.item_container}>
            <FlatList
              ListHeaderComponent = {this.props.ListHeaderComponent!=undefined ? this.props.ListHeaderComponent : undefined}
              ListFooterComponent = {this.props.ListFooterComponent!=undefined ? this.props.ListFooterComponent : undefined}
              numColumns={this.state.numColumns} 
              stickySectionHeadersEnabled={false}
              onEndReached = {this.props.onEndReached}
              refreshControl={this.props.refreshControl}
              data={final_list}
              keyExtractor={(item, index) => {return item[this.props.key_key]+""}} 
              renderItem={this._render_item}
              renderSectionHeader={this._render_header}

            
            />
          </SafeAreaView>
        </View>
      );

  }

  render() {
    if( this.props.loading==false && (this.check_width(false) || styles_list==false || this.props.list==undefined)){
      return (<View style={styles_list.container}>
        {this.props.ListHeaderComponent!=undefined ? this.props.ListHeaderComponent : null}
        <Loader/>
        {this.props.ListFooterComponent!=undefined ? this.props.ListFooterComponent : null}
        </View>);
    }
    /*
    this cause to not show date+source header component for matches pages
    if(this.props.loading==false && this.props.list && this.props.list.length == 0){
      return null;
    }*/
    
    return (<View style={styles_list.container}>
      {this.props.loading && (this.props.refreshControl==undefined || isWeb || this.props.list==undefined || this.props.list.length == 0)  
      ? <>
        {this.props.ListHeaderComponent!=undefined ? this.props.ListHeaderComponent : null}
        <Loader/>
        {this.props.ListFooterComponent!=undefined ? this.props.ListFooterComponent : null}
      </> : this.render_list()}
    </View>);
  }
}


export default ItemsList;
import * as React from 'react';
import {  View, TouchableOpacity, Image, ImageBackground  } from 'react-native';
import { SafeAreaView, FlatList, Dimensions,TouchableHighlight, Text } from 'react-native';
import Loader from "./Loader";
import styles_list from "../Styles/matches";
import styles_news from "../Styles/news";

import {_isMobile,isBigScreen, isWeb} from "../Styles/general";
import {img_domain} from "../libs/config";
import render_match  from './render_match';

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
  get_item(item){
    if(this.props.type=="matches"){

      return render_match(item,this.windowWidth);

    }else if(this.props.type=="news"){

      return (
        <View style={[styles_news.container]}>
          <ImageBackground style={styles_news.img_background} source={{uri: item.img}} imageStyle={styles_news.image_style}>
            { item.date ? <Text style={{backgroundColor:"#00000091",color:"#fff",width:90,textAlign:"center",}}>{item.date}</Text> : null}
            <View style={styles_news.news_img_v}>
            </View>
            <View style={styles_news.news_title_v}>
              <Text style={styles_news.news_title_t} numberOfLines={1}>{item.title_news}</Text>
            </View>
          </ImageBackground>
        </View>
        );

    }
  }


  _render_item=({item})=>{
    const item2render=  (<TouchableOpacity
      
      style={{width:this.elem_width,alignSelf:"center"}}
      activeOpacity={0.5}
      onPress={ () => {this.props.onclick(item) }} 
      onLongPress={ () => {this.props.onLongPress?this.props.onLongPress(item):null; }} >
      <View style={{flexDirection:'row', flexWrap:'wrap',width:"100%",justifyContent: 'center',alignItems:"center",alignContent:"center",marginHorizontal:3,}}>
        {this.get_item(item)}
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
              keyExtractor={(item, index) => {return item[this.props.id]+""}} 
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
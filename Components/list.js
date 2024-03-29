import * as React from 'react';
import {  ScrollView, View, TouchableOpacity  } from 'react-native';
import { SectionList, FlatList, Dimensions,TouchableHighlight, Text } from 'react-native';
import Loader from "./Loader";
import styles_matches from "../Styles/matches";
import styles_news from "../Styles/news";
import styles_list from "../Styles/list";
import { Image,ImageBackground } from 'expo-image';


import {_isMobile,isBigScreen, isWeb} from "../Styles/general";
import EmptySpace from  './EmptySpace';
import MatchCard from './MatchCard';
import { Pressable } from 'react-native';
import FavoriteIcon from "../Components/FavoriteIcon";

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
    this.height = this.props.height ? this.props.height : 400; 
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
    margin2add = 10
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

  get_item(item){
    if(this.props.type=="matches"){

      return <MatchCard item={item} windowWidth={this.windowWidth} navigation={this.props.navigation}/>

    }else if(this.props.type=="news"){
      return (
        <View style={[styles_news.container]}>
          <ImageBackground 
            style={styles_news.img_background} 
            source={{uri: item.img}} 
            imageStyle={styles_news.image_style}
            
            >
            { item.date ? <Text style={styles_news.date_text}>{item.date}</Text> : null}
            <View style={styles_news.news_img_v}>
            </View>
            <View style={styles_news.news_title_v}>
              <Text style={styles_news.news_title_t} numberOfLines={1}>{item.title_news}</Text>
            </View>
          </ImageBackground>
        </View>
        );

    }else if(this.props.type=="live" ){
      return (
        <View style={[styles_news.live_container]}>
          <ImageBackground  
            style={styles_news.live_img_background} 
            source={{uri: item.logo}} 
            imageStyle={styles_news.live_image_style}
            contentFit="contain"
            >
            { item.date ? <Text style={styles_news.date_text}>{item.date}</Text> : null}

            <FavoriteIcon favType="channels" favId={item.name} 
            item={[item.name,item.name,item.logo]} pullRight/>
            <View style={styles_news.news_img_v}>
            </View>
            <View style={styles_news.news_title_v}>
              <Text style={styles_news.news_title_t} numberOfLines={1}>{item.name}</Text>
            </View>
          </ImageBackground>
        </View>
        );
    }
  }


  _render_item=({item})=>{
    const item_style = this.props.type=="matches"?styles_list.item_container:styles_list.item_container_nomarggin;
    
    let styles_sub = [styles_list.item_sub_container,];
    if(this.props.type=="matches"){
      styles_sub.push(styles_list.item_sub_matches);
    }
    const item2render=  (<TouchableOpacity
      
      style={[item_style,{width:this.elem_width}]}
      activeOpacity={0.5}
      onPress={ () => {this.props.onclick(item) }} 
      onLongPress={ () => {this.props.onLongPress?this.props.onLongPress(item):null; }} >
      <View style={styles_sub}>
        {this.get_item(item)}
      </View>
    </TouchableOpacity>);
    return item2render;
  }
  header_long_press= async (item)=>{
    const _item = _Favs.format(item[0],item[1],item[2])
    const isok = await _Favs.toggle_favorite("leagues", _item);
    if(isok){
      this.setState({});

    }
  }
  _render_header=({ section: { title,img,id,is_koora,options } })=>{
    if(title==undefined || title==""){
      return null;
    }
    const style_fav = _Favs.is_fav('leagues', id) ? {backgroundColor:"#2f282838"} : {};
    //<View style={[{paddingHorizontal:5,flexDirection:'row', flexWrap:'wrap'},styles_list.header]}>
    return (
      <Pressable style={[styles_list.header_container, style_fav]}
        underlayColor={"#00000030"}
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
          onLongPress={()=>this.header_long_press([id,title,img])}
      >
        <View style={[{paddingHorizontal:5,flexDirection:'row', flexWrap:'wrap'},styles_list.header]} >
            <ImageBackground  
            style={styles_list.header_image_v} 
            source={{uri: img}} 
            imageStyle={styles_list.header_image}
            contentFit="contain"
            ></ImageBackground>
          <View style={styles_list.header_text_v} >
            <Text style={styles_list.header_text} numberOfLines={1}>{title}</Text>
          </View>
          <FavoriteIcon favType="leagues" favId={id} item={[id,title,img]} />
          </View>
      </Pressable>);

  }

  render_list() {

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
      
      //to avoid 'FlatList : Invariant Violation: Changing numColumns on the fly is not supported' error
      if(this.props.loading==false && this.props.list && this.props.list.length == 0){
        return (
        <>
        {this.props.ListHeaderComponent!=undefined ? this.props.ListHeaderComponent : undefined}
        </>);
      }
      const ListToRender =this.props.type=="matches"?SectionList:FlatList;
      if(!this.list || this.list.length==0){
        return <Text>Empty, Please Check later!</Text>;
      }
      return (
        <View style={styles_list.list_container}>
            <ListToRender

              ListHeaderComponent = {this.props.ListHeaderComponent!=undefined ? this.props.ListHeaderComponent : undefined}
              ListFooterComponent = {EmptySpace}
              numColumns={this.state.numColumns} 
              stickySectionHeadersEnabled={false}
              onEndReached = {this.props.onEndReached}
              refreshControl={this.props.refreshControl}
              sections={this.list}
              data={final_list}


              keyExtractor={(item, index) => {return item[this.props.id]+""}} 
              renderItem={this._render_item}
              renderSectionHeader={this._render_header}

            />
        </View>
      );

  }

  render() {

    if( this.props.loading==false && (this.check_width(false) || styles_list==false || this.props.list==undefined)){
      return (<View style={styles_matches.container}>
        {this.props.ListHeaderComponent!=undefined ? this.props.ListHeaderComponent : null}
        <Loader />
        {this.props.ListFooterComponent!=undefined ? this.props.ListFooterComponent : null}
        </View>);
    }
    /*
    this cause to not show date+source header component for matches pages
    if(this.props.loading==false && this.props.list && this.props.list.length == 0){
      return null;
    }*/
    
    return (<View style={styles_matches.container}>
      {this.props.loading && (this.props.refreshControl==undefined || isWeb || this.props.list==undefined || this.props.list.length == 0)  
      ? <View style={{flex:1,}}>
        {this.props.ListHeaderComponent!=undefined ? this.props.ListHeaderComponent : null}
        <Loader />
        {this.props.ListFooterComponent!=undefined ? this.props.ListFooterComponent : null}
      </View> : this.render_list()}
    </View>);
  }
}


export default ItemsList;
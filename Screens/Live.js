import React from "react";
import { StyleSheet, Platform, View } from 'react-native';
import ListCustom from "../Components/list";
import styles_news from "../Styles/news";
import IconButton from '../Components/iconBtn';
import Constants from 'expo-constants'


export default class LiveScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        list:[],
        loading:true,
        
    };
    this.is_interstitial_loaded=false,
    this.live2open=false;
    // for tests envirenments 
    this.showAds = Constants.appOwnership != 'expo' && !_API.isWeb;
  }
  onLoaded=()=>{
    this.is_interstitial_loaded=true;
  }
  onClosed=()=>{
    this.is_interstitial_loaded=false;
    if(this.live2open){
      this.props.navigation.navigate('LiveHSL',this.live2open);
    }
    
    this.live2open=false;
    
  }
  load_interstitial(){
    if(this.showAds){
      const admobs = require('../Components/admobs');
      this.interstitial = admobs.Interstitial_load(this.onLoaded,this.onClosed);
    }

  }
  interstitial_showReady = async() => { 
    if(!this.showAds){return true;}
    try {
      this.interstitial.show();
    } catch (error) {
      console.log(error);
    }
  }
  
  refresh=()=>{
    _API.get_live_list().then(data =>{
      this.setState({loading:false,list:data})
    });

    this.setState({loading:true,list:[]});
  }
  componentDidMount(){ 
    this.refresh();

    this.render_header();
    this.load_interstitial();

  }
  render_header=()=>{
    this.props.navigation.setOptions({
    "headerRight":()=>(
      <View style={{flexDirection:"row",margin:5}}>
        <IconButton
          name='refresh'
          onPress={this.refresh}

        />
    </View>
    )
    });
  }
  onclick = (item)=>{
    this.interstitial_showReady();
    this.live2open=item;
    if(this.is_interstitial_loaded==false){
      this.onClosed();
    }
  }
  
  render(){

    return (<View style={styles_news.root_container}>

    <ListCustom 
      loading={this.state.loading} 
      list={this.state.list} 
      onclick={this.onclick}
      type="live" 
      id="_id"
      minWidth={150}
        />  
              </View>);

  }
}
import React from "react";
import { StyleSheet, Platform, View } from 'react-native';
import ListCustom from "../Components/list";

import styles_news from "../Styles/news";
import IconButton from '../Components/iconBtn';
import {Interstitial_load, interstitial_addLoadedEvent,interstitial_addClosedEvent} from '../Components/admobs';


export default class LiveScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        list:[],
        loading:true,
        
    };
    this.is_interstitial_loaded=false,
    this.live2open=false;
  }
  onLoaded=()=>{
    console.log('-----------ADSLoaded')
    this.is_interstitial_loaded=true;
  }
  onClosed=()=>{
    console.log('***********ADSCLOSEd')
    this.is_interstitial_loaded=false;
    if(this.live2open){
      this.props.navigation.navigate('LiveHSL',this.live2open);
    }
    
    this.live2open=false;
    
  }
  load_interstitial(){
    this.interstitial = Interstitial_load(this.onLoaded,this.onClosed);
   

  }
  interstitial_showReady = async() => { 
    if(Platform.OS === 'web'){return true;}
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
      id="id"
        />  
              </View>);

  }
}
import React from "react";
import {  View, Dimensions,ScrollView , ImageBackground, Text} from 'react-native';
import styles_live from "../Styles/live";
import Loader from "../Components/Loader";
import { WebView } from 'react-native-webview';
import IconButton from '../Components/iconBtn';
import BackBtn from "../Components/backBtn";

const kooora_domain="domain.com"

export default class LiveLinkScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        list:[],
        loading:true,
        live:this.props.route.params,
        link:undefined,
        
    };
    this.is_focused=false;
  }
  componentDidMount(){
    this._isMounted=true;
    this.didBlurSubscription = this.props.navigation.addListener(
    'focus',
    payload => {
        this.is_focused = true;
        if(this._isMounted==false){
        return;
        }
        this.state.live = this.props.route.params&&this.props.route.params.iframe ? this.props.route.params : undefined;
        this.setState({loading:false});
        this.render_header();
    }
    );

  }
  componentWillUnmount(){
    this._isMounted=false
  }
  refresh=()=>{
    this.setState({loading:true,});
  
    setTimeout(() => {
      this.setState({loading:false})
    }, 400);
  }
  hsl=()=>{
    this.setState();
  }
  go_iptv=()=>{
    this.setState({live:{}});
    this.props.navigation.navigate('LiveHSL',this.props.route.params)
  }
  render_header=()=>{
    let title = this.state.live && this.state.live.title ? this.state.live.title : "";
    this.props.navigation.setOptions({title: title,
      headerLeft: (props) => (
        <BackBtn  {...props} navigation={this.props.navigation}/>
      ),
    "headerRight":()=>(
      <View style={{flexDirection:"row",margin:5}}>
        <IconButton
          name='refresh'
          onPress={this.refresh}
        />
        <IconButton
          name='tv'
          onPress={this.go_iptv}
        />
    </View>
    )
    });
  }
  render() {
    return (
      <View  style={styles_live.container}>
        {this.state.live && this.state.live.iframe  && !this.state.loading?
          <WebView
            originWhitelist={['*']}
            style={styles_live.webview}
            source={{ uri: this.state.live.iframe }}
            allowsFullscreenVideo={true}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            userAgent={_API.user_agents["iPhone"] }
          />
          :null}

        </View >
    );
  }
}

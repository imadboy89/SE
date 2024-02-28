import React from "react";
import {  View, Dimensions,ScrollView , ImageBackground, Text} from 'react-native';
import styles_live from "../Styles/live";
import Loader from "../Components/Loader";
import { WebView } from 'react-native-webview';
import IconButton from '../Components/iconBtn';


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
    let short_title = this.state.link && this.state.article.title ? this.state.article.title:"-";
    short_title = short_title.length > 0 ? short_title.slice(0,30)+"..." : short_title;
    this.props.navigation.setOptions({title: <Text>{short_title}</Text>})
    this.render_header();
    this.didBlurSubscription = this.props.navigation.addListener(
    'focus',
    payload => {
        this.is_focused = true;
        if(this._isMounted==false){
        return;
        }
        this.state.live = this.props.route.params&&this.props.route.params.link ? this.props.route.params : undefined;
        this.link = this.state.live && this.state.live.link ? this.state.live.link+"" : undefined;
        this.setState({link:this.link,loading:false});
        
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
  render_header=()=>{
    let title = this.state.live && this.state.live.title ? this.state.live.title : "";
    this.props.navigation.setOptions({title: title,
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
  render() {
  console.log('LL RENDER', this.state.link)
    return (
      <ScrollView  style={styles_live.container}>
        {this.state.link!=undefined  && !this.state.loading?
          <WebView
            originWhitelist={['*']}
            style={styles_live.webview}
            source={{ uri: this.state.link }}
            allowsFullscreenVideo={true}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            userAgent={_API.user_agents["iPhone"] }
          />
          :null}

        </ScrollView >
    );
  }
}

import React from "react";
import {  View, Dimensions,ScrollView , ImageBackground, Text} from 'react-native';
import styles_article from "../Styles/article";
import Loader from "../Components/Loader";
import { WebView } from 'react-native-webview';


const kooora_domain="domain.com"

export default class LiveLinkScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        list:[],
        loading:true,
        article:{},
        
    };
    this.is_focused=false;
  }
  componentDidMount(){
    this._isMounted=true;
    let short_title = this.state.article && this.state.article.title_news ? this.state.article.title_news:"-";
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
        this.state.article = this.props.route.params&&this.props.route.params.link ? this.props.route.params : undefined;
        this.link = this.state.article && this.state.article.link ? this.state.article.link+"" : undefined;
    }
    );

  }
  componentWillUnmount(){
    this._isMounted=false
  }
  render_header=()=>{
    let title = this.state.article && this.state.article.title_news ? this.state.article.title_news : "";
    this.props.navigation.setOptions({title: title,
    "headerRight":()=>(
      <View style={{flexDirection:"row",margin:5}}>
    </View>
    )
    });
  }
  render() {
  
    return (
      <ScrollView  style={styles_article.container}>
        {this.link!=undefined  ?
          <WebView
            style={styles_article.xsub_container}
            source={{ uri: this.link }}
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

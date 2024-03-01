import React from "react";
import {  View, Dimensions,ScrollView , ImageBackground, Text} from 'react-native';
import styles_live from "../Styles/live";
import Loader from "../Components/Loader";
import IconButton from '../Components/iconBtn';
import HSL from '../Components/hsl_layer';

const kooora_domain="domain.com"

export default class LiveLinkScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        list:[],
        loading:false,
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
  render_header=()=>{
    let title = this.state.live && this.state.live.title ? this.state.live.title : "";
    this.props.navigation.setOptions({title: title,
    "headerRight":()=>(
      <View style={{flexDirection:"row",margin:5}}>
        <IconButton
          name='refresh'
          onPress={this.refresh}
        />
        <IconButton
          name='safari'
          onPress={()=>this.props.navigation.navigate('LiveLink',this.props.route.params)}
        />
    </View>
    )
    });
  }
  hsl=()=>{
    this.setState();
  }

  render() {
    return (
      <View  style={styles_live.container}>
        {this.state.live && this.state.live.url  && !this.state.loading?
          <HSL
          link={this.state.live.url}
          />
          :null}

        </View >
    );
  }
}

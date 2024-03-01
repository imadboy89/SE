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
    this.state.live = this.props.route.params&&this.props.route.params.iframe ? this.props.route.params : undefined;

    this.setState({})
    console.log(this.state.live);


  }
  componentWillUnmount(){
    this._isMounted=false
  }

  hsl=()=>{
    this.setState();
  }

  render() {
    return (
      <View  style={styles_live.container}>
        {this.state.live && this.state.live.url!=undefined  && !this.state.loading?
          <HSL
          link={this.state.live.url}
          />
          :null}

        </View >
    );
  }
}

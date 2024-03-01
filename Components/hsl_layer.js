import React from 'react';
import { View , StyleSheet,Button} from 'react-native';
import { Video, ResizeMode } from 'expo-av';




export default class Hsl extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
          loading:true,
          allow_live:false,
          status:{}
      };
      this.video=null;
    }
    componentDidMount(){
    }
    statusUpdate=(status)=>{
        this.setState({status:status});
    }
    videoError=()=>{}

    render(){
        const url='https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4';
        const url2="https://rmtv.akamaized.net/hls/live/2043154/rmtv-en-web/master.m3u8";
      return (
        <View style={{flex:1,backgroundColor:'black',width:'100%',maxHeight:'80%'}}>
            <Video
            ref={this.video}
            style={styles.video}
            source={{
            uri: this.props.link,
            }}
            shouldPlay={true}
            useNativeControls
            resizeMode={ResizeMode.CONTAIN}

            isLooping
            onPlaybackStatusUpdate={this.statusUpdate}
        />



        </View>
      );
    }
  }

  const styles = StyleSheet.create({ 
    video:{
        flex:1,
        backgroundColor:'black',
    },
    buttons:{
        flex:1
    }

   }); 
import React from 'react';
import { View , StyleSheet} from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import Loader from './Loader';




export default class Hsl extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
          loading:true,
          allow_live:false,
          status:{},
      };
      this.video=null;
      
    }
    pauseVideo=()=>{
      this.video?.pauseAsync() ;
    }
    componentDidMount(){
      this.willBlurSubscription=this.props.navigation.addListener(
        'blur', payload => {
          this.pauseVideo();
        });
  

    }
    statusUpdate=(status)=>{
        this.setState({status:status});
    }
    videoError=()=>{}

    render(){
      return (
        <View style={{flex:1,backgroundColor:'black',width:'101%',maxHeight:'80%',marginLeft:-1}}>
            <Video
            ref={ref=>{this.video=ref;}}
            style={styles.video}
            source={{
            uri: this.props.link,
            }}
            shouldPlay={true}
            useNativeControls
            resizeMode={ResizeMode.CONTAIN}
            isLooping
            onPlaybackStatusUpdate={this.statusUpdate}
            onLoadStart={() => this.setState({loading:true})}
            onReadyForDisplay={() => this.setState({loading:false})}

        />
        {this.state.loading ? <Loader size="large" /> : null}



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
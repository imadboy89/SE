import React from 'react';
import { View } from 'react-native';


class EmptySpace extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
      };
    }


    render(){
        return (
            <View style={{width:'100%',height:100,}}></View>
        );
    }
}

 
export default EmptySpace;

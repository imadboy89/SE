import React from 'react';
import { StyleSheet, Pressable, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {theme  ,styles_colors} from "../Styles/general";


class BackBtn extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        is_fav:0
      };
      this.default_color = theme.buttons_color;
      this.default_size = 25;
    }
    onPress=async ()=>{
        this.props.favType
        this.props.favId
        await _Favs.toggle_favorite(this.props.favType, this.props.favId);
        if(this.props.onPress){
            this.props.onPress();
        }
    }

    render(){
        return (
            <Pressable
                disabled={this.props.disabled ? this.props.disabled : false}
                onPress={() => this.props.navigation.goBack(null)}
                style={[styles.container,this.props.style]}
                >
                <Icon 
                    name={"long-arrow-left"} 
                    size={this.default_size} 
                    color={this.default_color}
                     />
            </Pressable>
        );
    }
}

var styles = StyleSheet.create({
    container:{
        justifyContent:"center",
        alignItems: 'center', 
        //backgroundColor:"red",
        margin:2
    },
    badge : {
        borderRadius: 10,
        position : "absolute",
        top:0,
        right:0,
        width:16,
        height:16, 
        textAlign:"center",
        textAlignVertical:"top",
        paddingBottom:20,
        backgroundColor:"red"
        
    }
});
export default BackBtn;

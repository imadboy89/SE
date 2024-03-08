import React from 'react';
import { StyleSheet, Pressable, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {theme  ,styles_colors} from "../Styles/general";


class FavoriteIcon extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        is_fav:0
      };
      this.icons=["heart-o","heart",];
      this.default_color = theme.headerStyle_backgroundColor;
      this.default_size = 28;
    }
    onPress=()=>{
        this.props.favType
        this.props.favId
        _Favs.toggle_favorite(this.props.favType, this.props.favId);
        if(this.props.onPress){
            this.props.onPress();
        }
    }

    render(){
        const isFav = _Favs.is_fav(this.props.favType, this.props.favId);
        let color = this.props.color!=undefined?this.props.color:this.default_color ;
        color = this.props.disabled ? theme.inactiveTintColor :color;
        /*
        let backgroundColor  = this.props.badge_bg_color ? this.props.badge_bg_color : "bg_danger";
        backgroundColor = styles_colors[backgroundColor] ? styles_colors[backgroundColor] : {};

        */
       const size = this.props.size!=undefined?this.props.size:28;
       const extra_styles = {width:size,height:size};
       if(this.props.pullRight){
        extra_styles.alignSelf="flex-end";
       }
       if(this.props.pullLeft){
        extra_styles.alignSelf="flex-start";
       }
        
        //color = styles_colors[color] ? styles_colors[color] : {};
        return (
            <Pressable
                disabled={this.props.disabled ? this.props.disabled : false}
                onPress={this.onPress}
                style={[styles.container,extra_styles,this.props.style]}
                >
                <Icon 
                    name={this.icons[isFav]} 
                    size={size} 
                    color={color}
                     />
            </Pressable>
        );
    }
}

var styles = StyleSheet.create({
    container:{
        justifyContent:"center",
        alignItems: 'center', 
        backgroundColor:"red",
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
export default FavoriteIcon;

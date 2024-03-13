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
      this.icons=["","star",];
      this.default_color = "orange";
      this.default_size = 20;
    }
    componentDidMount(){
        if(this.props.showAlways){
            this.icons[0]=this.icons[1]+"-o";
        }
        this.item = _Favs.format(...this.props?.item);
    }
    onPress=async ()=>{
        await _Favs.toggle_favorite(this.props.favType, this.item);
        if(this.props.onPress){
            this.props.onPress();
        }
    }

    render(){
        this.item = _Favs.format(...this.props?.item);

        if(this.props.item==undefined){
            return null
        }
        
        const isFav = _Favs.is_fav(this.props.favType, this.item);
        let color = this.props.color!=undefined?this.props.color:this.default_color ;
        color = this.props.disabled ? theme.inactiveTintColor :color;
        /*
        let backgroundColor  = this.props.badge_bg_color ? this.props.badge_bg_color : "bg_danger";
        backgroundColor = styles_colors[backgroundColor] ? styles_colors[backgroundColor] : {};

        */
       const size = this.props.size!=undefined?this.props.size:this.default_size;
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
                {this.icons[isFav] && this.icons[isFav]!="" ?
                    <Icon 
                        style={styles.icon}
                        name={this.icons[isFav]} 
                        size={size} 
                        color={color}
                        />
                    : null}
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
    icon:{
        textShadowColor: 'black',
        textShadowOffset: {width: 2, height: 1},
        textShadowRadius: 1
      
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

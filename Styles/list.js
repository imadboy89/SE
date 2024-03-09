
import {  StyleSheet, Dimensions} from 'react-native';
import {theme,maxWidth,_isMobile,isWeb  } from "../Styles/general";

const styles_home = StyleSheet.create({
    container: {
      flex: 1,
      //justifyContent: 'center',
      //paddingTop: Constants.statusBarHeight,
      backgroundColor: theme.background_color_default,
      color : "#fff",

      
    },
    list_container:{
      width:"100%",
    },
 
    header_components:{},
    item_container:{
        alignSelf:"center",
        //paddingRight:5
        marginVertical:10
    },
    item_container_nomarggin:{
      alignSelf:"center",
      //paddingRight:5
      marginVertical:2
    },
    item_sub_container:{
        flexDirection:'row', 
        flexWrap:'wrap',
        width:"100%",
        justifyContent: 'center',
        alignItems:"center",
        alignContent:"center",
        //marginHorizontal:3,
        
    },
    item_sub_matches:{
      height:200
    },
    header_container:{
        height:40,
        //padding:10,
        borderTopWidth:.3,
        borderRightWidth:2,
        borderLeftWidth:2,
        borderRadius:100,
        fontSize:15,
        textAlign:"center"

        
    },
    header_image : {
        height:40,
        borderRadius:40,
        contentFit:"stretch",
        width:"100%",
        borderWidth:0

      },
    header_image_v:{
        width:40,
        
    },
    header:{
    },
    header_text:{
        textAlign:"center",
        fontSize:16,
        padding:3
    },
    header_text_v:{
        flex:1,
        height:"100%",
        justifyContent:"center",
    },
    matche_league_logo:{},
    matche_league_logo_img:{},

  });

export default styles_home;
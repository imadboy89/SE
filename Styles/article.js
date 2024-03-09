
import {  StyleSheet, Dimensions} from 'react-native';
import {theme,maxWidth,_isMobile,isWeb  } from "../Styles/general";

const styles_news = StyleSheet.create({

    container:{
      margin:4,
      flexWrap:'wrap',
      flex: 1 ,
      //marginLeft:5,
      borderRadius:10,
      borderWidth:1,
      borderColor:"#5e5e698a",
      color:theme.article_body_color,
      backgroundColor:theme.article_body_backgroundColor,
      padding:10,
      width:"96%",
      minHeight:500,

      
    },
    webview:{
      backgroundColor:'red',
      borderWidth:1,
      flex:1,
      width:"99%",
      minHeight:500,
      minWidth:"100%",

  },
    sub_container:{
        flex:1,
        width:"100%",

    },
    article_v:{
        color:"black",
    },
    article_img_v:{
        color:"black",
        borderColor:"#5e5e698a",
        width:"99%",
        height:300,
        padding:10,

    },
    article_img:{
        flex:1,
        width:"100%",
        contentFit:"repeat"
    },

    article_body_t:{
        padding:10,
        color:theme.article_body_color,
        backgroundColor:theme.article_body_backgroundColor,
    },

    article_date_t:{
        color:theme.article_date_color,
    },

    article_title_t:{
      fontWeight: 'bold',

        color:theme.article_title_color,
        backgroundColor:theme.article_title_backgroundColor,
    },


    img_background:{
      flex:1,
      width:"100%"
    },
    image_style : {
      contentFit:"stretch",
      width:"100%",
    },
  });

export default styles_news;
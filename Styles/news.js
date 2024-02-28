
import {  StyleSheet, Dimensions} from 'react-native';
import {theme,maxWidth,_isMobile,isWeb  } from "../Styles/general";

const styles_news = StyleSheet.create({
    root_container:{
      flex: 1,
      backgroundColor: theme.background_color_default,
      alignItems: 'center',
      justifyContent: 'center',

    },
    container:{
      backgroundColor: theme.matche_container_backgroundColor,
      width:"98%",
      marginLeft:5,
      marginVertical:5,
      flexWrap:'wrap',
      flex: 1 ,
      marginRight:5,
      //marginLeft:5,
      borderRadius:10,
      borderWidth:1,
      borderColor:"#5e5e698a",
      height:230,
      
    },
    img_background:{
      flex:1,
      width:"100%"
    },
    image_style : {
      resizeMode:"stretch",
      width:"100%",
    },
    news_img_v:{
      flex:1
    },
    news_title_v:{
      //flex:1,
      height:40,
      padding:5,
      backgroundColor: theme.news_title_backgroundColor,
    },
    news_title_t:{
      flex:1,
      color:theme.news_title_color
    },
    date_text:{
      backgroundColor:"#00000091",
      color:"#fff",
      width:90,
      textAlign:"center",
      fontSize:10
    },
  });

export default styles_news;
import {  StyleSheet, Dimensions, Platform} from 'react-native';

function isMobile(){
  var isMobile = true;
  if(isWeb==false){
    return isMobile;
  }
  isMobile = (/iphone|ipod|android|ie|blackberry|fennec/i).test(navigator.userAgent);
  return isMobile;
}

var styles_colors = {    
    txt_danger  : {color:"#fd7f72"},
    txt_success : {color:"#42dc84"},
    txt_info    : {color:"#5fb2ea"},
    txt_warning : {color:"#f9cd87"},
    bg_danger   : {backgroundColor:"#e74c3c"},
    bg_success  : {backgroundColor:"#2ecc71"},
    bg_info     : {backgroundColor:"#3498db"},
    bg_warning  : {backgroundColor:"#f39c12"},
  };
  
const window_width = Dimensions.get('window').width;
const window_height = Dimensions.get('window').height;

const isWeb = Platform.OS == 'web';
const isIOS = Platform.OS == 'ios';

const header_height = isIOS? 90 : 50;

const _isMobile = isMobile();
const isBigScreen = Dimensions.get('window').width>900 || Dimensions.get('window').height>900
const maxWidth = window_width<1000 ? "100%" : 1000;
const modal_maxWidth = window_width<1000 ? window_width*0.9 : 1000;

const theme_base = {

  color_1:"#4d4dff",
  color_2:"#3655b3",
  color_3:"#d3deff",
  color_4:"#ffb84d",
  color_5:"#b38136",
  color_6:"#041c67",
  color_7:"#f9f9f942", // semi transparent
  noColor:"#00000000", //full transpaent
}
const theme = {
    //headerStyle:
  headerStyle_backgroundColor: theme_base.color_1,
  headerTintColor: '#fff',
  activeBackgroundColor: '#30336b',
  inactiveBackgroundColor: '#130f40',
  activeTintColor: '#ffffff',
  inactiveTintColor: '#57606f',

  background_color_default : theme_base.color_3,
  home_title_color : theme_base.color_6,
  alert_body_backgroundColor : theme_base.color_4,
  alert_body_color : theme_base.color_6,

  fav_background : "#0093fb4a",

  text_color_default : theme_base.color_6,

  list_header_backgroundColor: theme_base.color_5,
  live_borderColor:"#2ecc71",
  matche_container_backgroundColor : theme_base.color_4,
  match_name_backgroundColor: theme_base.color_7,
  match_name_color: theme_base.color_1,
  match_score_backgroundColor: theme_base.color_1,
  match_score_color : theme_base.noColor,
  match_time_backgroundColor: theme_base.noColor,
  match_time_color:"#fff",


  match_badge_backgroundColor: theme_base.noColor,

  news_cont_backgroundColor:"#34495e",
  news_title_backgroundColor:"#00000091",
  news_title_color:"#fff",

  article_body_backgroundColor:"#293542d6",
  article_body_color : "#fff",
  article_title_backgroundColor:"#323350d6",
  article_title_color : "#fff",
  article_date_color : "#fff",
  article_photo_background : "#000",

  match_lineup2_color : "#d1d8e0",
  match_lineup2_number_color : "#f1c40f",
  match_linup_team_backgroundColor:"#dae6fd",
  match_linup_team__backgroundColor:"#97d1f9",
  match_stats_color : "#d1d8e0",
  match_lineup_player_color:"#000",
  match_text_info_color : "#d1d8e0",
  match_results_team_scor_color : "#f1c40f",
  match_results_winer_background  : "#16a085",
  match_results_loser_background  : "#c0392b",
  match_results_drawer_background : "#7f8c8d",
  match_results_scorer_color :"#dbd9ff",
  link_text_color : "#3498db",
};

export {theme,styles_colors,window_width,window_height,isWeb,header_height,_isMobile, isBigScreen, maxWidth, modal_maxWidth};
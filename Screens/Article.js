import React from "react";
import {  View, Dimensions,ScrollView , Text, Image} from 'react-native';
import styles_article from "../Styles/article";
import Loader from "../Components/Loader";
import EmptySpace from  '../Components/EmptySpace';
import BackBtn from "../Components/backBtn";
import { Divider } from '@rneui/themed';

import {ImageBackground} from "expo-image";

const kooora_domain="domain.com"

class ArticleScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        list:[],
        loading:true,
        article:this.props.route.params,
        
    };
    if(this.state.article && this.state.article.img){
      this.state.article.img = this.state.article.img.split("&")[0];
    }
    this.is_focused=false;
  }
  componentDidMount(){
    this._isMounted=true;
    let short_title = this.state.article && this.state.article.title_news ? this.state.article.title_news:"-";
    short_title = short_title.length > 0 ? short_title.slice(0,30)+"..." : short_title;
    this.props.navigation.setOptions({title: <Text>{short_title}</Text>})
    this.render_header();
    this.didBlurSubscription = this.props.navigation.addListener(
    'focus',
    payload => {
        this.is_focused = true;
        if(this._isMounted==false){
        return;
        }
        this.state.article = this.props.route.params&&this.props.route.params.link ? this.props.route.params : undefined;
        this.id = this.state.article && this.state.article.link ? this.state.article.link+"" : undefined;
        this.get_article();
    }
    );

  }
  componentWillUnmount(){
    this._isMounted=false
  }
  render_header=()=>{
    let title = this.state.article && this.state.article.title_news ? this.state.article.title_news : "";
    this.props.navigation.setOptions({title: title,
      headerLeft: (props) => (
        <BackBtn  {...props} navigation={this.props.navigation}/>
      ),
    "headerRight":()=>(
      <View style={{flexDirection:"row",margin:5,}}>
    </View>
    )
    });
  }
  get_article(){
    //this.state.article.date =  this.state.article && this.state.article.date ? API_.get_date2(new Date(this.state.article.date.replace("#","") * 1000)) : "";
    _API.get_article(this.id)
    .then(article =>{
      if(article.constructor == Object){
        this.state.article = this.state.article?this.state.article:{};
        this.state.article.title_news = article.title_news ? article.title_news : this.state.article.title_news;
        this.state.article.body = article.body ? article.body : this.state.article.body;
        this.state.article.img  = article.img  ? article.img  : this.state.article.img;
        this.state.article.date = article.date ? article.date : this.state.article.date;
        this.state.article.author = article.author ? article.author : this.state.article.author;
        this.state.article.author_cc = article.author_cc ? article.author_cc : this.state.article.author_cc;
        article.related = article.related ? article.related.map(r=>{
          if(r.related_link && r.related_link.slice(0,1)=="m" && r.related_title.includes(":") ){
            r.related_title = r.related_title.split(":").slice(1).join(":").replace("ضد", "Vs");
          }
          return r;
        }) : [];
        this.state.article.related = article.related ? article.related : this.state.article.related;
        this.state.article.related_news = article.related_news ? article.related_news : this.state.article.related_news;

        this.state.article.img = (this.state.article.img=="" || this.state.article.img==undefined) && article.related_images && article.related_images.length>0 
        ? article.related_images[0]["img_link"] : this.state.article.img;
        if( article.related_images && article.related_images[1] && parseInt(article.related_images[1]["img_link"])>0){
          this.isVideo(parseInt(article.related_images[1]["img_link"]));
        }
        this.render_header();
      }else{
        this.state.article.body = article;
      }
      this.setState({loading:false,});
      //API_.setTitleWeb(this.state.article.title_news);
    });
  }

  render() {
    const article_img = this.state.article && this.state.article.img ? this.state.article.img : null;
    const article_body = this.state.article && this.state.article.body ? this.state.article.body : "";
    const body_composed = article_body && article_body.split ? article_body.split("IMG**").map(o=>{
      if(o.trim()==""){
        return null;
      }
      let dom2retrurn=null;
      if(o[0]=="*"){
        const width = Dimensions.get('window').width<=400 ? "99%" : "70%";
        let img_src = o.replace(/\*/gi,"").trim();
        img_src = img_src && img_src.slice(0,2) == "//" ? "https:"+img_src : img_src;
        img_src = img_src && img_src.slice(0,4) == "http" ? img_src : `${kooora_domain}${img_src}`;
        dom2retrurn = <View key={o} style={{flexDirection: 'row',height:300,width:width,alignSelf:"center",marginVertical:10}}>
        <ImageBackground source={{uri:img_src}} style={{aspectRatio: 1,flex: 1,}} contentFit={'contain'}/>
        </View>;
      }else{
        dom2retrurn = <Text key={o} style={styles_article.article_body_t}>{o}</Text>
      }
      return dom2retrurn;
    }) : <Text style={styles_article.article_body_t}>{article_body}</Text>;
    const author_flag = null;
    return (
      <ScrollView  style={styles_article.container}>
        <View style={styles_article.sub_container}>

        <View style={styles_article.article_img_v}>
        
            <ImageBackground 
            key={"article_backgrnd"} 
            style={styles_article.article_img} 
            imageStyle={styles_article.article_img}
            source={{uri: article_img, headers: { 'Accept': 'image/*'}}}
            contentFit="contain">
            </ImageBackground>

        </View>
            
          <View style={styles_article.article_v}>
            <Text style={styles_article.article_date_t}>{this.state.article && this.state.article.date?this.state.article.date:"-"}</Text>
            {this.state.article!=undefined && this.state.article.author!=undefined ? 
            <View style={{flexDirection:"row-reverse",width:"100%",}}>
              {author_flag}
              <Text style={styles_article.article_date_t}>{this.state.article.author}</Text> 
            </View>
            : null}
            <Text style={styles_article.article_title_t}>{this.state.article && this.state.article.title_news ? this.state.article.title_news : ""}</Text>
            <Divider inset={true} insetType="middle" style={{marginVertical:10}} />

            {this.state.loading ? <Loader/> : body_composed  }
            <EmptySpace />
          </View>
        </View>
        </ScrollView >
    );
  }
}


export default ArticleScreen;


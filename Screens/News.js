import React from "react";
import { StyleSheet, Text, View } from 'react-native';
import ListCustom from "../Components/list";
import styles_news from "../Styles/news";
import IconButton from '../Components/iconBtn';
import FavNews from "../Components/favNews";
const list = [

  {"id":1,"title_news":"newsxxxssss1 title","date":"2022-02-22","img":"//img.kooora.com/?i=mhmed_aziz%2fjanuary%2f1%2f1%2f2019_january_koo_1%2fibrahim_samir_koo_%2fmohamed+boudrega.jpg&z=320|240&c=0|0|738|417&h=8828"},
  {"id":2,"title_news":"news222 title","date":"2022-02-22","img":"https://img.kooora.com/?i=mhmed_aziz%2fjanuary%2f1%2f1%2f2019_january_koo_1%2fibrahim_samir_koo_%2fmohamed+boudrega.jpg&z=320|240&c=0|0|738|417&h=8828"},
  {"id":3,"title_news":"news3333 title","date":"2022-02-22","img":"https:////img.kooora.com/?i=mhmed_aziz%2fjanuary%2f1%2f1%2f2019_january_koo_1%2fibrahim_samir_koo_%2fmohamed+boudrega.jpg&z=320|240&c=0|0|738|417&h=8828"},
];
export default class NewsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        page:1,
        link:"ncma",
        list:[],
        loading:true,
    };
  }
  refresh=()=>{
    this.setState({loading:true,list:[]});
    _API.get_news(this.state.link, this.state.page).then(data =>{
      this.setState({loading:false,list:data})
    });
  }
  componentDidMount(){ 
    this.refresh();
    this.render_header();
  }
  render_header=()=>{
    this.props.navigation.setOptions({
    "headerRight":()=>(
      <View style={{flexDirection:"row",margin:5}}>
        <IconButton
          name='refresh'
          onPress={this.refresh}

        />
    </View>
    )
    });
  }
  onclick = (item)=>{
    this.props.navigation.navigate('Article',item);
  }
  onChangeCat=(item)=>{
    this.state.selectedItem = item;
    this.state.link = item.link;
    this.refresh();
  }
  render(){
    const ListHeaderComponent = <FavNews onChangeCat={this.onChangeCat} selectedItem={this.state.selectedItem}/>;
    return (<View style={styles_news.root_container}>

    <ListCustom 
      ListHeaderComponent={ListHeaderComponent}
      loading={this.state.loading} 
      list={this.state.list} 
      onclick={this.onclick}
      type="news" 
      id="link"
        />  
              </View>);

  }
}
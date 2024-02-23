import React from "react";
import { StyleSheet, Text, View } from 'react-native';
import ListCustom from "../Components/list";

const list = [
  {"id":1,"title_news":"newsxxxssss1 title","date":"2022-02-22","img":"//img.kooora.com/?i=mhmed_aziz%2fjanuary%2f1%2f1%2f2019_january_koo_1%2fibrahim_samir_koo_%2fmohamed+boudrega.jpg&z=320|240&c=0|0|738|417&h=8828"},
  {"id":2,"title_news":"news222 title","date":"2022-02-22","img":"https://img.kooora.com/?i=mhmed_aziz%2fjanuary%2f1%2f1%2f2019_january_koo_1%2fibrahim_samir_koo_%2fmohamed+boudrega.jpg&z=320|240&c=0|0|738|417&h=8828"},
  {"id":3,"title_news":"news3333 title","date":"2022-02-22","img":"https:////img.kooora.com/?i=mhmed_aziz%2fjanuary%2f1%2f1%2f2019_january_koo_1%2fibrahim_samir_koo_%2fmohamed+boudrega.jpg&z=320|240&c=0|0|738|417&h=8828"},
];
export default class NewsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        list:[],
        loading:true,
    };
  }
  onclick = (item)=>{
    this.props.navigation.navigate('Article',item);
  }
  
  render(){

    return (<View style={styles.container}>

    <ListCustom 
      loading={false} 
      list={list} 
      onclick={this.onclick}
      type="news" 
      id="id"
        />  
              </View>);

  }
}

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
  
import React from "react";
import { StyleSheet, View } from 'react-native';
import ListCustom from "../Components/list";
import styles_news from "../Styles/news";

import IconButton from '../Components/iconBtn';


  export default class MatchesScreen extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          list:[],
          loading:true,
      };
      

    }
    refresh=()=>{
      this.setState({loading:true,list:[]})
      _API.get_matches(new Date()).then(data =>{
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
      this.props.navigation.navigate('Match',item);
    }
    
    render(){
  
      return (<View style={styles_news.root_container}>
  
      <ListCustom 
        loading={this.state.loading} 
        list={this.state.list} 
        onclick={this.onclick}
        type="matches" 
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
  
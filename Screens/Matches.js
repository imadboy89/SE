import React from "react";
import { StyleSheet, View } from 'react-native';
import ListCustom from "../Components/list";
import styles_news from "../Styles/news";

const list = [
    {id:1,is_done:1,home_team:"Real Madrid",away_team:"FC Barca",home_team_status:"w",away_team_status:"l",time_played:10,home_team_score:10,away_team_score:1,time:20},
    {id:2,
      home_team:"Raja CLub athlatic",away_team:"Wydad athletec club",
      home_team_status:"w",away_team_status:"l",
      home_team_logo:"https://img.kooora.com/?i=6556%2flogo+raja.jpg",away_team_logo:"https://img.kooora.com/?i=o%2ft%2f0%2f864%2fwydad-athletic-club-1.png",
      time_played:10,home_team_score:10,away_team_score:1,time:20,
      home_team_score_penalties:4,
      away_team_score_penalties:5,
      home_events:[{"type":"yellow","time":"65",},{"type":"goal","time":"23"}],
      away_events:[{"type":"red","time":"90",},{"type":"goal","time":"91"}]
    },
    {id:3,home_team:"madrid",away_team:"barca",home_team_status:"w",away_team_status:"l",time_played:10,home_team_score:10,away_team_score:1,time:20},
    {id:4,home_team:"madrid",away_team:"barca",home_team_status:"w",away_team_status:"l",time_played:10,home_team_score:10,away_team_score:1,time:95}];

  export default class MatchesScreen extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          list:[],
          loading:true,
      };
      

    }

    componentDidMount(){ 
      _API.get_matches(new Date()).then(data =>{
        console.log(data);
        this.setState({loading:false,list:data})
      });
    }
    onclick = (item)=>{
      this.props.navigation.navigate('Match',item);
    }
    
    render(){
  
      return (<View style={styles_news.root_container}>
  
      <ListCustom 
        loading={false} 
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
  
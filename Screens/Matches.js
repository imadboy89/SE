import React from "react";
import { StyleSheet, View, Text } from 'react-native';
import ListCustom from "../Components/list";
import styles_news from "../Styles/news";
import Teams from "../libs/teams.js"

import IconButton from '../Components/iconBtn';


  export default class MatchesScreen extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          list:[],
          loading:true,
      };
      this.Tm = new Teams();


    }
    refresh=async ()=>{
      this.setState({loading:true,list:[]})
      _API.get_matches(new Date()).then( async data =>{
        let ids=[];
        data.map(l=>{
          l.data.map(m=>{
            ids.push(m.away_team_id);
            ids.push(m.home_team_id);
          })
        })
        //.home_team_logo
        //console.log(data);
        const res = await this.Tm.get_teams_logo(ids)
        let teams_logos={};
        for(const r of res){
          teams_logos[r.id]=r.logo;
        }
        data.map(l=>{
          l.data.map(m=>{
            m.home_team_logo = teams_logos[m.home_team_id];
            m.away_team_logo = teams_logos[m.away_team_id];

          })
        })
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
        ListHeaderComponent={<View><Text></Text></View>}
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
  
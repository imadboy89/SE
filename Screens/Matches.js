import React from "react";
import { StyleSheet, View, Text } from 'react-native';
import ListCustom from "../Components/list";
import styles_news from "../Styles/news";
import Teams from "../libs/teams.js"

import IconButton from '../Components/iconBtn';

import DateNav from "../Components/DateNav"

export default class MatchesScreen extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          list:[],
          loading:true,
          date:new Date(),
          only_live:false,
      };
      if(!_API.isWeb){
        this.Tm = new Teams();
      }

    }
    refresh=async (live_only=false)=>{
      this.setState({loading:true,list:[]})
      _API.get_matches(this.state.date,this.state.only_live)?.then( async data =>{
        if(!data || !data.map){
          this.setState({loading:false,list:[]});
          return
        }
        //console.log(data[0])
        //console.log(data.map(m=>m.country+" "+m.title));
        let ids=[];
        data.map(l=>{
          l.data.map(m=>{
            ids.push(m.away_team_id);
            ids.push(m.home_team_id);
          })
        })
        //.home_team_logo
        //console.log(data);
        if(!_API.isWeb){
          const res = this.Tm.is_db_loaded ? await this.Tm.get_teams_logo(ids) : [];
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
        }
        this.setState({loading:false,list:data})
      });

    }

    componentDidMount(){ 
      this.refresh();
      this.render_header();
      if(!_API.isWeb){
        this.Tm.init_first().then(inserted=>{
          if(inserted){
            this.refresh();
          }
        })
      }
    }
    toggle_liveonly(){

    }
    render_header=()=>{
      const live_btn_color = this.state.only_live ? "#00ff4e" : undefined;
      this.props.navigation.setOptions({

        "headerRight":()=>(
          <View style={{flexDirection:"row",margin:5}}>
              <IconButton
              style={{paddingRight:10}}
              name='hourglass-start'
              color={live_btn_color}
              onPress={()=>{
                this.state.only_live = !this.state.only_live;
                this.refresh(true);
                this.render_header();
              }}
            />
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
      <DateNav 
          refresh={this.refresh} 
          loading={this.state.loading} 
          date={this.state.date}></DateNav>

      <ListCustom 
        loading={this.state.loading} 
        list={this.state.list} 
        onclick={this.onclick}
        type="matches" 
        id="id"
        navigation={this.props.navigation}
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
  
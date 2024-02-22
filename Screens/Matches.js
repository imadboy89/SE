import { StyleSheet, View } from 'react-native';
import { Text, Button, Card } from '@rneui/themed';
import M1 from "./m1";
import Matches from "../Components/matches2";

const list = [
    {id:1,is_done:1,home_team:"Real Madrid",away_team:"FC Barca",home_team_status:"w",away_team_status:"l",time_played:10,home_team_score:10,away_team_score:1,time:20},
    {id:2,
      home_team:"Raja CLub athlatic",away_team:"Wydad athletec club",
      home_team_status:"w",away_team_status:"l",
      home_team_logo:"https://img.kooora.com/?i=6556%2flogo+raja.jpg",away_team_logo:"https://img.kooora.com/?i=o%2ft%2f0%2f864%2fwydad-athletic-club-1.png",
      time_played:10,home_team_score:10,away_team_score:1,time:20,
      home_team_score_penalties:4,
      away_team_score_penalties:5,
    },
    {id:3,home_team:"madrid",away_team:"barca",home_team_status:"w",away_team_status:"l",time_played:10,home_team_score:10,away_team_score:1,time:20},
    {id:4,home_team:"madrid",away_team:"barca",home_team_status:"w",away_team_status:"l",time_played:10,home_team_score:10,away_team_score:1,time:95}];
export default function App() {
    return (
      <View style={styles.container}>

        <Matches 
          loading={false} 
          list={list} 
          key_="home_team" key_key="id"
            />      
            
            </View>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
  
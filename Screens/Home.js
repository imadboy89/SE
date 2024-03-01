import { StyleSheet, View } from 'react-native';
import { Text, Button, Card } from '@rneui/themed';

//const matches = [{id:1,homeTeam:{logo:"",name:"barca"},awayTeam:{logo:"",name:"madrid"}},];
const list = [{home_team:"madrid",away_team:"barca",home_team_status:"w",away_team_status:"l",time_played:10}];
export default function App() {
    return (
      <View style={styles.container}>
        <Text>Home ; Homep age!</Text>
        <Button title="Clear" type="clear" />
        <Button title="Solid" />

        <Card>
            <Text>Word of the Day</Text>
            <Text h4>be-nev-o=lent</Text>
            <Text>adjective</Text>
            <Text>
                well meaning and kindly.
                {'"a benevolent smile"'}
            </Text>
            <Button size="sm" type="clear">
                Learn More
            </Button>
        </Card>
            
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
  
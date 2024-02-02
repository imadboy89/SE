import { StyleSheet, View } from 'react-native';
import { Text, Button, Card } from '@rneui/themed';



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
                <br />
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
  
import React from 'react';
import { StyleSheet, ActivityIndicator, View  } from 'react-native';
import {_isMobile,theme} from "../Styles/general";


const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flex:1,
    width:"100%",
    backgroundColor:"#0000001f"
  },
  horizontal: {
    alignContent:"center",
    alignSelf:"center",
    alignItems:"center",
    padding: 10
  }
});

function Loader(){
  return (      
    <View style={[styles.container, styles.horizontal]}>
      <ActivityIndicator size="large" color="#00ff00" />
    </View>);
} 

export default Loader;
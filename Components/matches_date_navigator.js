import React from 'react';
import { StyleSheet, TouchableOpacity , View, Text  } from 'react-native';
import {_isMobile,isBigScreen,theme} from "../Styles/general";
import {Scrap_tools} from "react-native-essential-tools";
import IconButton from '../Components/iconBtn';


const styles = StyleSheet.create({
  container: {
    flexDirection:'row', 
    flexWrap:'wrap', 
    alignSelf:"center",
    justifyContent:"center",
    width:isBigScreen?400:"98%",
    //backgroundColor:"#a29bfe6b",
    //padding:5,
    //borderColor:"black",
    margin:2,
    marginBottom:5
  },
  date_container:{
    alignContent:"center",
    alignSelf:"center",
    alignItems:"center",
    marginHorizontal:10,
    width:200
  },
  date_text:{
    fontSize:20
  },
  horizontal: {
    alignContent:"center",
    alignSelf:"center",
    alignItems:"center",
    padding: 10
  },
  buttons:{
    //backgroundColor:theme.headerStyle_backgroundColor,
    width:60,
    height:60,
    borderRadius:30,
    //backgroundColor:"red"

    //justifyContent:"center"
  }
});


class DateNav extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        dynamic_style:false,
        header_to_hide:[],
        numColumns:1,
        list : [],
      }
      this.Scrap_tools = new Scrap_tools();
    }
    nextPage = ()=>{
      this.end=false;
      this.props.date .setDate(this.props.date .getDate() + 1);
      this.setState({});
      if(this.props.refresh){
        this.props.refresh();
      }
    }
    previousPage = ()=>{
      this.end=false;
      this.props.date .setDate(this.props.date .getDate() - 1);
      this.setState({});
      if(this.props.refresh){
        this.props.refresh();
      }
    }
   
    render(){
        const dayname = this.props.date.toLocaleDateString("us-US", { weekday: 'short'});
        return (        
            <View style={styles.container} >
            <IconButton 
              disabled={this.props.loading}
              name="arrow-circle-left" 
              size={47} 
              style={styles.buttons} 
              onPress={()=>this.previousPage()}  />
            <TouchableOpacity
              style={styles.date_container}
              disabled={this.props.loading}
              activeOpacity={0.5}
              onPress={()=>this.setState({show_datPicker:true})}
              >
              <Text style={styles.date_text} >{this.Scrap_tools.get_date2(this.props.date)+" - "+dayname}</Text>
            </TouchableOpacity>
            <IconButton 
              disabled={this.props.loading}
              name="arrow-circle-right" 
              size={47} 
              style={styles.buttons} 
              onPress={()=>this.nextPage()}  
              />
          </View>);
    }
}


export default DateNav;



    

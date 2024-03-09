import React from 'react';
import { StyleSheet, TouchableOpacity , View, Text  } from 'react-native';
import {_isMobile,isBigScreen,theme} from "../Styles/general";
import IconButton from './iconBtn';
import SelectDropdown from 'react-native-select-dropdown'


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


class FavNews extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        list : [],
      }
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
      const items = _Favs.favorite_news()//.map(n=><Picker.Item label={n.name} value={n.link} key={n.link}/>);
      return (        
          <View style={styles.container} >
            <SelectDropdown
              style={{ width:"100%",height:100,backgroundColor:"red"}}
              data={items}
              onSelect={(selectedItem, index) => {
                console.log("selectedItem",selectedItem, index)
                this.props.onChangeCat(selectedItem);
              }}
            	buttonTextAfterSelection={(selectedItem, index) => {
                alert(selectedItem.name)
                return selectedItem.name
              }}
              rowTextForSelection={(item, index) => {
                return item.name
              }}
              renderDropdownIcon={()=>{
                return <IconButton name="sort-down" color="black"></IconButton>
              }}
              />

        </View>);
    }
}


export default FavNews;



    

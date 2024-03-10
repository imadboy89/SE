import React from 'react';
import { StyleSheet, TouchableOpacity , View, Text  } from 'react-native';
import {_isMobile,isBigScreen,theme} from "../Styles/general";
import IconButton from './iconBtn';
import SelectDropdown from 'react-native-select-dropdown'
import Icon from 'react-native-vector-icons/FontAwesome';


const styles = StyleSheet.create({
  container: {
    flexDirection:'row', 
    flexWrap:'wrap', 
    alignSelf:"center",
    justifyContent:"center",
    width:isBigScreen?400:"90%",
    //backgroundColor:"#a29bfe6b",
    //padding:5,
    //borderColor:"black",
    margin:2,
    marginBottom:5
  },
  buttonStyle:{
    width:"80%",
    borderRadius:10
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
    componentDidMount=()=>{
      //this.props.onChangeCat();
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
              buttonStyle={styles.buttonStyle}
              data={items}
              onSelect={(selectedItem, index) => {
                this.state.selectedItem = selectedItem.name;
                this.setState({selectedItem:selectedItem});
                this.props.onChangeCat(selectedItem);
                return selectedItem.name;
                //alert(this.state.selectedItem)
              }}
              defaultValueByIndex={0}
              rowTextForSelection={(item, index) => {
                return item.name
              }}
            	buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem.name
              }}

              renderDropdownIcon={()=>{
                return                 <Icon 
                name="sort-down"
                size={20} 
                color="black"
                style={{paddingBottom:5}}
                 />
              }}
              />

        </View>);
    }
}


export default FavNews;



    

import React,{Component,useState} from "react";
 
import { View, Picker, StyleSheet, Text , Button, Alert,AsyncStorage} from "react-native";
import List from './List';
import DeprecatedViewPropTypes from "react-native/Libraries/DeprecatedPropTypes/DeprecatedViewPropTypes";
class Drop extends Component  {
     constructor(props) {
      super(props);
     }
     state = {
      pickerValues:[],
      Value:"",
      venue : ''
      }
      changeValue(Value){
        this.setState({Value});
      }
      
     GetMenuTypes = async () => {
      console.log("Venuename for picker fetch"+this.state.venue)
      var uri = "https://mcr-api051020.herokuapp.com/Eatery/"+this.state.venue
      console.log("API call for drop menu:"+uri)
      await fetch(`https://mcr-api051020.herokuapp.com/Eatery/${this.state.venue}`)
      .then(response => response.json())
      .then(json => {
      console.log("Pickervalues:"+json)
      this.setState({
      pickerValues:json
      })
      })
      }
      componentDidMount = async() => {
       var venuename = await AsyncStorage.getItem("venuename")
       this.setState({
         venue : venuename
       })
        this.GetMenuTypes()
        }
 
  render(){
    let myMenu = this.state.pickerValues.map((Value,myIndex)=>{
      // console.log('myValue: ' + Value)
      // console.log('myIndex: ' + myIndex)
      return(
        <Picker.Item label={Value} value={Value} key={myIndex}/>
        )
      })
  return (
    <View style={styles.container}>
      <Text style={styles.text}> Choose a meal:-</Text> 
      <Picker
         selectedValue = {this.state.Value}
        style={{ height: 50, width: 300, padding: 5 }}
        onValueChange={e => { this.setState({Value:e});this.props.Parentcallback(e)  
      }}
       >
        <Picker.Item label="Choose one menu" value="4" />
        {myMenu}
      </Picker>
      
      <View style={styles.body}>
           <List listname = {this.state.Value} menunav={this.props.menu} 
           />
 
      </View>
 
    </View>
  );
  }
}
 
const styles = StyleSheet.create({
  container: {
    flex: 3,
    paddingTop: 30,
  },
  text:{
    padding: 5,
    fontSize: 20,
    fontWeight: '400',
    color: 'black',
  },
  body: {
    marginTop:10,
    padding:10,
  },
  buttonContainer:{
      flexDirection:'column',
      paddingTop: 5,
      color: 'green',
 
  },
});
 
export default Drop;
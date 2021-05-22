import React, { Component } from 'react';
import { Button, View, Text,TextInput,StyleSheet,
          TouchableOpacity,Platform,Alert,AsyncStorage} from 'react-native';
import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

export default class Addmenu extends Component {
  constructor(props) {
    super(props); 
    this.AddMenuItem = this.AddMenuItem.bind(this);
    this.state = {
                 description: '',
                 name : '',
                 price: '',
                 wholeResult: '',
                 venuename:'',
                 menucat:''
                };
   }
   onClickListener = async () => {
    if(this.state.description || this.state.description != " "){
     if(this.state.name){
      if(this.state.price){
           var test = await AsyncStorage.getItem("venuename")
            var test1= await AsyncStorage.getItem("menucat")
            this.setState({
              venuename:test,
              menucat:test1
          })
          this.AddMenuItem();
       }else{
      Alert.alert("Please Enter Description");
     }
     }else{
    Alert.alert("Please Enter Name of the Item");
    }
  }else{
Alert.alert("Please enter Price of Item");
}
}
AddMenuItem=async () =>{
  var that = this;
   console.log("picker from Home.js"+JSON.stringify(this.props.navigation.getParam('pickervalue', 'NO-ID')))
   var temp = JSON.stringify(this.props.navigation.getParam('pickervalue', 'NO-ID'))
   temp = temp.slice(1,-1)
   var url = `https://mcr-api051020.herokuapp.com/Eatery/${this.state.venuename}/`+temp
   console.log("url for Addmenu"+url)
   await fetch(url,{
        method: 'POST',
        headers: {
          'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({"name": this.state.name,"price": this.state.price,"description": this.state.description})
        })
        .then(function (response) {
          console.log("Response from addmenu API"+response)
          return response.text();
        }).then(function (result) { 
          if(!result.error){
           that.setState({ 
                          //  status: result.error,
                           wholeResult: result,
                        });
           Alert.alert("Data added successfully"+that.state.wholeResult);
           console.log("Response after add item"+that.state.wholeResult);
       }else{
        Alert.alert(result.error_msg);
        console.log("error while adding data"+result);
  }
}).catch(function (error) {
  console.log("-------- error ------- "+error);
  Alert.alert("result:"+error)
});
await AsyncStorage.setItem("menuupdated","1")

}
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={styles.sectionTitle}>+AddItem</Text>
      <TextInput
        style = {styles.input}
        color="green"
        placeholder = "name"
        color="green"
       underlineColorAndroid='transparent'
       onChangeText={(name) => this.setState({name})}
      />
      <TextInput
        style = {styles.input}
        color="green"
        placeholder = "price"
        keyboardType="number-pad"
        underlineColorAndroid='transparent'
        onChangeText={(price) => this.setState({price})}
      />
      <TextInput
        style = {styles.input}
        color="green"
        placeholder = "description"
        underlineColorAndroid='transparent'
        onChangeText={(description) => this.setState({description})}
      />
      <View style={[{ width: "90%", margin: 10, backgroundColor: "red" }]} >
          <Button
          title="AddItem"
          color="green"
          onPress={() =>{ this.onClickListener(); this.props.navigation.navigate('Home')}}          
          />
          </View>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container:{
    backgroundColor:Colors.grey,
  },
  sectionTitle: {
    fontSize: 32,
    fontWeight: '600',
    color: 'green',
    justifyContent:'center',
  },
  input : {
    width : "90%",
    backgroundColor : "white",
    padding:15,
    marginBottom:10,
    borderColor:"green",
    borderWidth: 2
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  label: {
    color: "black",
  },
  link: {
    fontWeight: 'bold',
    color: "green",
  },
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
    color: "green",
  },
});
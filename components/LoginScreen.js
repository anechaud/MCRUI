import React, { Component } from 'react';
import { Button, View, Text,TextInput,StyleSheet,TouchableOpacity,Alert, AsyncStorage } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';



 
export default class LoginScreen extends Component {
 
state={
  username:'',
  password:'',
  
}

 
login = async ()=>{
 

  if(this.state.username=="Dell6" && this.state.password=="test"){
   await AsyncStorage.setItem("venuename","Dell%206%20Cafeteria")
    this.props.navigation.navigate('Home', {
      venuename: "Dell%206%20Cafeteria",
    });
 
  }
  else if(this.state.username=="Bikaner" && this.state.password=="test123"){
    await AsyncStorage.setItem("venuename","Bikaner")
    this.props.navigation.navigate('Home', {
      venuename: "Bikaner",
    });
      } 
  else{
 
Alert.alert("Please Enter Correct Username and Password");
    }
 
  
 
}
 
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        {/* <Text>Home Screen</Text> */}
        <Text style={styles.sectionTitle}>Vendor Login</Text>
        <TextInput
        style = {styles.input}
        label="Username"
        color="green"
        placeholder = "Username"
        value={this.state.username}
        onChangeText={(username) => this.setState({ username })}
      />
      <TextInput
        style = {styles.input}
        label="Password"
        color="green"
        placeholder = "Password"
        color="green"
        secureTextEntry={true}
        value={this.state.password}
        onChangeText={(password) => this.setState({ password })}
      />
      {/* <TextInput
        style = {styles.input}
        label="Venue"
        color="green"
        placeholder = "Venue"
        color="green"
      /> */}
      {/* <View style={styles.forgotPassword}>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('ForgotPasswordScreen')}
        >
          <Text style={styles.label}>Forgot your password?</Text>
        </TouchableOpacity>
      </View > */}
      <View style={[{ width: "90%", margin: 10, backgroundColor: "red" }]} >
          <Button
          title="Login"
          color="green"
          onPress={() => this.login()}
          
          />
          </View>
      {/* <View style={styles.row}>
        <Text style={styles.label}>Don’t have an account? </Text>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('RegisterScreen')}>
          <Text style={styles.link}>Sign up</Text>
        </TouchableOpacity>
      </View> */}
 
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
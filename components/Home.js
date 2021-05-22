import React,{Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
  Alert, AsyncStorage
} from 'react-native';
 
import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
 
import Drop from './dropmenu';
class Home extends Component  {
  constructor(props) {
    super(props);
   }
   state = {
     pick:"",
     venuename : ""
    }
    changeValue= async (pick) =>{
      this.setState({pick})
      await AsyncStorage.setItem("menucat",this.state.pick)
    }
    
    componentDidMount= async () => {
      var test = await AsyncStorage.getItem("venuename")
      this.setState({
        venuename:test
      })
      this.changeValue()
      }
  Gotomenu= () =>{
   this.props.navigation.navigate('Addmenu',
   {pickervalue:this.state.pick})
 
  }
  render(){ 
  return (
    <ScrollView>
    <View style={styles.sectionContainer} >
      <Text style={styles.sectionTitle}>Welcome, Vendor!</Text>
      <Text style ={styles.sectionsubTitle}>Venuename:</Text>
      <Text style ={styles.sectionsubTitle}>{this.state.venuename}</Text>
      <View style={styles.body}>
      <Drop 
       menu={this.Gotomenu}
       Parentcallback = {this.changeValue}
      />
      </View>
    </View>
    </ScrollView>
  );
  }
};
 
const styles = StyleSheet.create({
  container:{
    backgroundColor:Colors.grey,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    marginTop:0,
    padding:1,
  },
  bodybutton: {
    marginTop:20,
    padding:40,
    color:'green',
  },
  sectionContainer: {
    marginTop: 30,
    paddingHorizontal: 5,
  },
  sectionTitle: {
    fontSize: 32,
    fontWeight: '600',
    color: 'green',
    justifyContent:'center',
     paddingHorizontal:10,
  },
  sectionsubTitle: {
    fontSize: 22,
    fontWeight: '500',
    color: Colors.black,
    justifyContent:'center',
    paddingHorizontal:15,
  },
  buttonContainer:{
    flexDirection:'column',
    paddingTop:5,
    color:'green',
 
  },
  sectionDescription: {
    marginTop: 5,
    fontSize: 18,
    fontWeight: '400',
    
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});
 
export default Home;
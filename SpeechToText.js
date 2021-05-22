// App.js
import React from 'react';

import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  AppRegistry,
  TouchableHighlight,
  ImageBackground,
  AsyncStorage 
} from 'react-native';
import Voice from  'react-native-voice';
import ChatBot from './ChatBot'
import playImage from './play1.png'
import pauseImage from './pause2.png'
import Logo from './Logo'
import Tts from 'react-native-tts';
import LoginScreen from './components/LoginScreen';

import {Dialogflow_V2} from 'react-native-dialogflow';

import { dialogflowConfig } from './env';

const BOT_USER = {
  _id: 2,
  name: 'Virtual Assistant',
  avatar: 'https://media-exp1.licdn.com/dms/image/C4E0BAQERwqLK35zG0A/company-logo_200_200/0?e=2159024400&v=beta&t=jt9W4ycT0Y4g38R3gfjuGAtAzKrGfsx25YbszmHik0A',
};



export default class VoiceNative extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recognized: '',
      started: '',
      results: [],
	  active : false,
	  currentImage: './play.png',
    End: '',
    prev:''
    
    };
	Voice.onSpeechStart = this.onSpeechStart.bind(this);
    Voice.onSpeechRecognized = this.onSpeechRecognized.bind(this);
    Voice.onSpeechResults = this.onSpeechResults.bind(this);
    Voice.onSpeechEnd = this.onSpeechEnd.bind(this);
  }
  componentDidMount() {
    Dialogflow_V2.setConfiguration(
      dialogflowConfig.client_email,
      dialogflowConfig.private_key,
      Dialogflow_V2.LANG_ENGLISH_US,
      dialogflowConfig.project_id
    );
    Tts.voices().then(voices => console.log(voices));
    Tts.setDefaultVoice()
  }
  
componentWillUnmount() {
    Voice.destroy().then(Voice.removeAllListeners);
  }
onSpeechStart(e) {
    this.setState({
      started: '√',
    });
  };
onSpeechRecognized(e) {
    this.setState({
      recognized: '√',
    });
  };
 onSpeechEnd(e) {
    this.setState({
      End: '√',
	  active: false
    });
  };
async onSpeechResults(e) {
    this.setState({
      results: e.value[0],
    });
  console.log("From SPT "+e.value[0]);
  if(e.value[0].includes("repeat")){
    Tts.getInitStatus().then(() => {
      Tts.speak(String(this.state.prev), { androidParams: { KEY_PARAM_PAN: -1, KEY_PARAM_VOLUME: 1, KEY_PARAM_STREAM: 'STREAM_ALARM' } });;
      Tts.setDucking(true);
    });
  

  }
  else if(e.value[0].includes("vendor")){
    this.props.navigation.navigate('LoginScreen')
  }
  else{
  Dialogflow_V2.requestQuery(
    e.value[0],
    result => this.handleGoogleResponse(result),
    error => console.log (error)
  )

  }


  }
  
  sendBotResponse(text) {
   
  console.log(text);
this.setState({
  prev:text
});
  Tts.getInitStatus().then(() => {
    Tts.speak(String(text), { androidParams: { KEY_PARAM_PAN: -1, KEY_PARAM_VOLUME: 1, KEY_PARAM_STREAM: 'STREAM_ALARM' } });;
    Tts.setDucking(true);
  });
  }
  handleGoogleResponse (result) {
    let text = result.queryResult.fulfillmentMessages[0].text.text[0];
    this.sendBotResponse (text);
  }
  
  
  
async _startRecognition(e) {
  console.log("Ores");
    this.setState({
      recognized: '',
      started: '',
      results: [],
	  active: true,
    });
    try {
      await Voice.start('en-US');
    } catch (e) {
      console.error(e);
    }
  }
 
async  _stopRecognizing(e){
	  this.setState({
	  active: false,
    });
    try {
      await Voice.stop();
    } catch (e) {
      //eslint-disable-next-line
      console.error(e);
    }
  };


render () {
    return (
      <ImageBackground source={require('./back.jpg')} style={{ 
        flexGrow:1,
        height:null,
        width:null,
        alignItems: 'center',
        justifyContent:'center',opacity:0.6}}>
     
      <View  style={styles.MainContainer}>
      
        <Logo/>
	<TouchableHighlight onPress={
	this.state.active ?  this._stopRecognizing.bind(this) : this._startRecognition.bind(this)}>

	
	<Image style={styles.imageStyle} source={this.state.active ? pauseImage : playImage} />
    </TouchableHighlight>
    <View style={styles.ResultCOntaimer}>
    <Text style={{alignSelf:'center',textAlign:'justify',color:'rgb(255,255,255)'}}>{this.state.prev}</Text>
    </View>

      </View>
      </ImageBackground>
    );

  }
}
const styles = StyleSheet.create({

  MainContainer: {
    marginTop:150,
    flex: 1,
    justifyContent: 'center',
    alignItems : 'center',

  },
  imageStyle : {
	width: 200,
    height: 200,
    
  },
  rightImageStyle:{

    width: 50,
    height: 50,
  
  },

  result:{
    marginTop:200
  },
  ResultCOntaimer:{
    alignItems: 'center',
    justifyContent: 'center',
    
    borderWidth: 2,
    borderRadius: 30,
    borderColor: 'rgb(0,1,34)',
    width: 300,
    height: 200,
    padding: 10
  }

});
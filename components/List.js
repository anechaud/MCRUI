import React, {Component} from 'react';

import {StyleSheet, Text, View, FlatList,  TextInput, Modal, 
        TouchableHighlight ,ScrollView,Button,Alert,AsyncStorage } from 'react-native';

export default class List extends Component {
    constructor(props) {
        super(props);
        this.handleDeleteItem = this.handleDeleteItem.bind(this);
        this.GetMenuItems = this.GetMenuItems.bind(this),
        this.state =  {
            data : [],
      isModalVisible: false,
            inputText: '',
            inputPrice:'',
            editedItem: 0, 
            resp :'',
            venuename:'',
            menucat:''
        };
    }
     GetMenuItems= async ()=> {
        console.log("venuename for list API "+this.state.venuename)
        console.log("Menucategory for list API "+this.props.listname)
        await fetch(`https://mcr-api051020.herokuapp.com/Eatery/${this.state.venuename}/${this.props.listname}`)
        .then(response => response.json())
        .then(json => {
        console.log("response from list API"+json)
        this.setState({
           data:json
        })
        })
         }
        componentDidUpdate = async()=> {
            var test = await AsyncStorage.getItem("venuename")
            var test1= await AsyncStorage.getItem("menucat")
            if(this.state.menucat !== test1)
            {
                this.setState({
                    venuename:test,
                    menucat:test1
                })
                this.GetMenuItems(); 
            }
            var temp1 = await AsyncStorage.getItem("menuupdated")
            if(temp1=="1"){
                this.GetMenuItems();
                await AsyncStorage.setItem("menuupdated","0")
            }
              
              }
        handleChange = event => {
                this.setState({ data: event });
              };
       
    // static getDerivedStateFromProps = async (props, state) => {     
    //    // static async getDerivedStateFromProps(props, state){
    //    // componentWillReceiveProps(props) {
    //       // var temp1 = null
    //       var test = await AsyncStorage.getItem("venuename")
    //       var test1= await AsyncStorage.getItem("menucat")
    //       return {
    //         venuename : test,
    //         menucat : test1
    //       };
    //       console.log("venuename"+this.state.venuename)
    //       console.log("menupicker"+this.state.menucat)
    //       if(props.listname!==state.previouslistname){
    //       var json1 =null
    //         console.log("response "+props.listname)
    //        await fetch(`https://mcr-api051020.herokuapp.com/Eatery/Dell%206%20Cafeteria/${props.listname}`)
    //     .then(response => response.json())
    //     .then(json => {
    //     console.log("response from API"+json)
    //     json1=json
    //     this.handleChange(json1)
    //     //data=json
    // })
    //      console.log("data"+json1)
    //      console.log("print"+state.previouslistname)
    //      if (true) {
    //         return {
    //           data: json1,
    //           previouslistname:props.listname,
    //         };
    //       } }
    //       return null
    //     }


    setModalVisible = (bool) => {
        this.setState({ isModalVisible: bool })
    }

    setInputText = (text) => {
        this.setState({ inputText: text })
      
    }

    setInputPrice = (price) => {
        this.setState({ inputPrice: price })
      
    }

    setEditedItem = (id) => {
        this.setState({ editedItem: id })
    }

    handleEditItem = (editedItem) => {
        const newData = this.state.data.map( item => {
            if (item.id === editedItem ) {
                item.text = this.state.inputText
                item.price= this.state.inputPrice
                return item
            }
            return item
        })
        this.setState({ data: newData })
    }
    onClickListener = (viewId) => {
    this.handleDeleteItem();
    }
    
    handleDeleteItem= async ()=>{

        var that = this;
     await fetch(`https://mcr-api051020.herokuapp.com/Eatery/${this.state.venuename}/${this.props.listname}`,{
        method: 'DELETE',
        headers: {
          'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({"name": this.state.inputText})
        })
        .then(function (response) {
         console.log("DelETE API response"+response)
          return response.text();
        }).then(function (result) { 
          if(!result.error){
           that.setState({ 
                           resp: result,
                        });
           Alert.alert(that.state.resp);
           console.log("Response after delete item :"+that.state.resp);
       }else{
          Alert.alert(result.error_msg);
        console.log("Error in Deleting item :"+result);
  }
}).catch(function (error) {
  console.log("-------- error ------- "+error);
 Alert.alert("result:"+error)
});
this.GetMenuItems()
    }


    renderItem = ({item}) => (
        <TouchableHighlight onPress={() => {this.setModalVisible(true); this.setInputText(item.name),this.setInputPrice(item.price), this.setEditedItem(item.id)}}
            underlayColor={'#f1f1f1'}> 
            <View style={styles.item} >
                <View style={styles.marginLeft}>
                    <View style={[styles.menu, { backgroundColor: "green"}]}></View>
                    <View style={[styles.menu, { backgroundColor: "green" }]}></View>
                    <View style={[styles.menu, { backgroundColor: "green" }]}></View>
                </View>
                    {/* <Text style={styles.text}> {item.text} </Text> */}
                    <Text style={styles.text}> {item.name} </Text>
                    <Text style={styles.text}> {item.price} </Text>
            </View>
        </TouchableHighlight>
        
    )
    
    render() {
        return (
            <View style={styles.contentContainer}>
                <View style={styles.header}>
                    <Text style={styles.headerText}> Today's Menu </Text>
                </View> 
                <FlatList 
                    data={this.state.data}
                    keyExtractor={(item) => item.toString()} 
                    //keyExtractor={(item, index) => item.toString()}
                    renderItem={this.renderItem}
                    
                   
                />
                <Modal animationType="fade" visible={this.state.isModalVisible} 
                    onRequestClose={() => this.setModalVisible(false)}>
                    <View style={styles.modalView}>
                        <Text style={styles.text}>Change details:</Text>
                        <TextInput
                            style={styles.textInput}
                            onChangeText={(text) => {this.setState({inputText: text}); console.log('state ', this.state.inputText)}}
                            defaultValue={this.state.inputText}
                            editable = {true}
                            multiline = {false}
                            maxLength = {200}
                        /> 
                        <TextInput
                            style={styles.textInput}
                            onChangeText={(price) => {this.setState({inputPrice: price}); console.log('state ', this.state.inputPrice)}}
                            defaultValue={this.state.inputPrice}
                            editable = {true}
                            multiline = {false}
                            maxLength = {200}
                        /> 
                        {/* <TouchableHighlight onPress={() => {this.handleEditItem(this.state.editedItem); this.setModalVisible(false)}} 
                            style={[styles.touchableHighlight, {backgroundColor: 'green'}]} underlayColor={'#f1f1f1'}>
                            <Text style={styles.text}>Save</Text>
                        </TouchableHighlight>   */}
                        <TouchableHighlight onPress={() => {this.onClickListener(); this.setModalVisible(false)}} 
                            style={[styles.touchableHighlight, {backgroundColor: 'green'}]} underlayColor={'#f1f1f1'}>
                            <Text style={styles.text}>Delete</Text>
                        </TouchableHighlight> 
                        
                    </View>           
                </Modal> 
                 <View>
                <Button
                         title="Add Item"
                          color="green"
                        onPress={(e) =>{
                           this.props.menunav(e)}
                    }
                       />
                       
                </View>
            </View>
        )
    }
};

const styles = StyleSheet.create({
    header: {
        height: 60,
        height: 70,
        backgroundColor: 'green',
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
    },
    contentContainer: {
        backgroundColor: 'white',
    },
    item: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: 'grey',
        alignItems: 'center',
    },
    marginLeft: {

        marginLeft: 5,
    },
    menu: {
        width: 10,
        height: 2,
        backgroundColor: '#111',
        margin: 2,
        borderRadius: 3,
    },
    text: {
        marginVertical: 30,
        marginVertical: 20,
        fontSize: 14,
        fontWeight: 'bold',
        marginLeft: 10,
    },

    textInput: {
        width: '90%',
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 30,
        borderColor: 'gray', 
        borderBottomWidth: 2,
        fontSize: 16,
    },
    modalView: {
        flex: 1, 
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
    touchableHighlight: {
        backgroundColor: 'white', 
        marginVertical: 10,
        alignSelf: 'stretch',
        alignItems: 'center',
    } 
})
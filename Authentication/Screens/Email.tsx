import  React, {useState,useRef,useEffect, useContext} from 'react';
import { View, StyleSheet, Text, TextInput,TouchableOpacity,ScrollView,Image, FlatList,Picker,PanResponder,Animated, TouchableWithoutFeedback, SafeAreaView,Dimensions, KeyboardAvoidingView, Platform} from 'react-native';
import { useMutation,useQuery } from '@apollo/react-hooks';
import {Header, Continue} from '../../src/common/Common'; 
import { gql } from 'apollo-boost';
import { getMaxListeners } from 'cluster';
import { mutateSettings } from '../../networking';
import {Button} from 'react-native-elements'; 
import { firebase } from '../../config'; 
import AppContext from '../../AppContext'; 
import {updateUser} from '../../networking';
const db = firebase.firestore();  

 
function ValidateEmail(mail) 
{
 if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(mail))
  {
    return true
  }
    
    return false
}


export default function Email({navigation, route}){
const myContext = useContext(AppContext);
const {user, userId} = myContext; 
  const {page} = route.params; 
  const [Email, setEmail] = useState();

 useEffect(() => {
  navigation.setOptions({
     headerTitle:false
  })
 }, [])
  const _sendToServer = () => {
     db.collection('user').doc(userId).set({email:Email}, {merge:true}).then(() => console.log('added')).catch(() => console.log('not updated'))
  }
  const _handlePage = () => {
    if(page == "AccountSettings"){
       navigation.navigate('AccountSettings'); 
       return; 
    } 
    navigation.navigate('Password')
  }   
const _handleEmail = () => {
 const hello = "zaheeryakub@gmail.com";     
 verifyEmail({variables:{email1:Email}});     
 navigation.navigate('Password')
}
return(
  <KeyboardAvoidingView style = {{flex:1}} behavior={Platform.OS == "ios" ? "padding" : "height"}>
<View style = {{flex:1, }}>   
<View style = {{flex:0.2}}>

</View>
<View style = {{flex:0.5, marginLeft:30}}>
<Header text = {"My Email is...."} />
<View style = {{borderBottomWidth:0.4, width:Dimensions.get('window').width - 60, marginTop:20}}/> 
<TextInput 
style = {{fontSize:35,borderBottomWidth:1, borderColor:"black",width:Dimensions.get('window').width -60,
  marginTop:40 }}
   placeholder = {"email"}  
   autoCorrect = {false}
   autoCapitalize = {"none"}
   value = {Email}
   
   onChangeText = {(text) => { setEmail(text)}}
  ></TextInput>
</View>
<View style = {{flex:0.3,justifyContent:"center",}}>
 {/* <Continue  onPress = {() => {_handleEmail(), mutateSettings({email:Email}) }}/>     */}
 <Button
  title="Continue"
  type="outline"
  disabled = {ValidateEmail(Email) ? false:true}
  containerStyle = {{backgroundColor:"black",marginLeft:30, marginRight:30}}
  titleStyle = {{color:"white", fontWeight:"700"}}
  disabledStyle = {{backgroundColor:"grey",}}
  onPress = {() => { _handlePage(), _sendToServer()}}
/>
</View>
</View>
</KeyboardAvoidingView>
)
}
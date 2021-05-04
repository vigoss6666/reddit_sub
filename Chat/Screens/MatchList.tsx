import  React, {useState,useRef,useEffect, useContext} from 'react';
import { StatusBar,View, StyleSheet, Text, TextInput,TouchableOpacity,ScrollView,Image, Button,Picker,PanResponder,Animated, TouchableWithoutFeedback, SafeAreaView, Dimensions} from 'react-native';
import { useMutation,useQuery } from '@apollo/react-hooks';
import { MaterialIcons } from '@expo/vector-icons';
import {HeaderBar } from '../../src/common/Common'; 
import {merge} from '../../src/common/helper'; 
import { firebase } from '../../config';
import AppContext from '../../AppContext'; 
import {updateUser} from '../../networking';
import { Introductions } from './Introductions';
import { MatchesList } from './MatchesList';
import { MatchChats } from './MatchChats';

// @refresh reset
export const db = firebase.firestore();

export function UserFactory({user, onPress}){
   
if(user.seen && user.clientUser.profilePic){
return <TouchableOpacity onPress = {() => onPress(user)}><Image source = {{uri:user.clientUser .profilePic}} style = {{height:50, width:50, borderRadius:25, marginLeft:10, marginRight:10}}/></TouchableOpacity>
}
if(user.seen && !user.clientUser.profilePic){
  return <TouchableOpacity 
  style = {{height:50, width:50, borderRadius:25, borderWidth:1,justifyContent:"flex-end", alignItems:"center", marginLeft:10}}
  onPress = {() => onPress(user)}
  >
  <MaterialIcons name="account-circle" size={50} color="black" />
  </TouchableOpacity> 
}
if(!user.seen && user.clientUser.profilePic){
  return <TouchableOpacity onPress = {() => onPress(user)}>
    <View style = {{height:15,width:15, position:'absolute', left:5, backgroundColor:'red', borderRadius:7.5, top:13, zIndex:200}}/>
    <Image source = {{uri:user.clientUser.profilePic}} style = {{height:50, width:50, borderRadius:25, marginLeft:10, marginRight:10, zIndex:100}}/>
  </TouchableOpacity>
}
if(!user.seen && !user.clientUser.profilePic){
  return <TouchableOpacity 
style = {{height:50, width:50, borderRadius:25, borderWidth:1,justifyContent:"flex-end", alignItems:"center", marginLeft:10}}
onPress = {() => onPress(user)}
>
<MaterialIcons name="account-circle" size={50} color="black" />
<View style = {{height:15,width:15, position:'absolute', left:-5, backgroundColor:'red', borderRadius:7.5, top:13}}/>
</TouchableOpacity>
  
}
return <View>
  <Text>Hello world</Text>
</View>
}




export default function MatchList({navigation}){
  const myContext = useContext(AppContext);
  const { user, userId, setChatNotification, setChatterNotification } = myContext;

const [MatchNotification, setMatchNotification] = useState(false);   
const [IntroNotification, setIntroNotification] = useState(false);   
const [ChatNotifcaiton1, setChatNotification1] = useState(false);

console.log("Intro"+IntroNotification)

useEffect(() => {
if(MatchNotification || IntroNotification || ChatNotifcaiton1){
  setChatNotification(true); 
  return
}
setChatNotification(false); 
}, [MatchNotification, IntroNotification, ChatNotifcaiton1])
return(
<SafeAreaView style = {{flex:1, marginTop:20, marginLeft:20, marginRight:20}}>
<Introductions navigation = {navigation} setIntroNotification = {setIntroNotification}/>
<MatchesList navigation = {navigation} setMatchNotification = {setMatchNotification}/>
<MatchChats navigation = {navigation} setChatNotification = {setChatNotification1}/>
</SafeAreaView>
)
}
import  React, {useState,useRef,useEffect, useContext} from 'react';
import { View, StyleSheet, Text, TextInput,TouchableOpacity,ScrollView,Image, FlatList,Picker,PanResponder,Animated, TouchableWithoutFeedback, SafeAreaView} from 'react-native';
import { useMutation,useQuery } from '@apollo/react-hooks';
import { MaterialIcons } from '@expo/vector-icons';
import {Button,Icon } from "react-native-elements"; 
import { gql } from 'apollo-boost';
import { useRoute } from '@react-navigation/native';
import { firebase } from '../../config'; 
import AppContext from '../../AppContext'; 

const db = firebase.firestore(); 

function computeName(obj) {
  if (obj.name) {
      return obj.name;
  }
  if (obj.firstName && obj.lastName) {
      return obj.firstName + obj.lastName;
  }
  return obj.firstName;
}


export default function Endorsement({navigation, route}){
  const myContext = useContext(AppContext); 
  const { userId} = myContext;
  const createChatThread = (userID:string, user2ID:string) => {
    if(userID > user2ID){
       return userID+user2ID.toString()
    }
    if(userID < user2ID){
     return user2ID+userID.toString()
    }
  }
  const {client, user} = route.params; 
  const endorse = () => {
      const chat = createChatThread(client.phoneNumber, user.phoneNumber); 
      
         db.collection('introductions').doc(chat).set({
            client1:user.phoneNumber,
            client2:client.phoneNumber, 
            discoveredBy:userId, 
            createdAt:new Date()
          })
         db.collection('user').doc(userId).update({
           points:firebase.firestore.FieldValue.arrayUnion({
             pointFor:'matchDiscovered', 
             point:50, 
             createdAt:new Date()
           })
         }) 
      
  }
  const user1 = {
    name:"Zaid shaikh", 
    profilePic:'data:image/jpeg;base64,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'
  }
  const user2 = {
    name:"Zaid shaikh", 
    profilePic:'data:image/jpeg;base64,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'
  }
   useEffect(() => {
    navigation.setOptions({
      headerTitle:false, 
      headerLeft:false, 
    })
   }, [])
    return(
        <View style = {{flex:1,backgroundColor:"black" }}>
        <View style = {{flex:0.2}}>
        
        </View>
        <View style = {{flex:0.6,}}>
         <Text style = {{color:"white", fontWeight:"bold", fontSize:35, fontStyle:"italic", alignSelf:'center'}}> It's a Match ! </Text>
         <View style = {{flexDirection:"row",marginTop:50, justifyContent:'space-around', alignItems:'center'  }}>
         <View style = {{alignItems:"center",}}>
         {client.profilePic ? <Image source = {{uri:client.profilePic}} style = {{height:100, width:100, borderRadius:50}}/>:
         <MaterialIcons name="account-circle" size={100} color="blue" />}
         <Text style = {{color:"white", fontWeight:"bold",fontSize:20, marginTop:10}}>{computeName(client)} </Text>
         </View>
         <View style = {{alignItems:"center", }}>
         {user.profilePic ? <Image source = {{uri:user.profilePic}} style = {{height:100, width:100, borderRadius:50}}/>:
         <MaterialIcons name="account-circle" size={100} color="blue" />}
         <Text style = {{color:"white", fontWeight:"bold",fontSize:20, marginTop:10}}>{computeName(user)} </Text>
         </View>
         {/* <MaterialIcons name="account-circle" size={100} color="red" /> */}
         
         </View>
         <View style = {{flexDirection:"row"}}>
         
         {/* <Text style = {{color:"white", fontWeight:"bold", fontSize:20}}> {data.generateMatches.data[index]}</Text> */}
        
         </View>
        
        </View>
        <View style = {{flex:0.2}}>
         <Button title = "Endorse this match" buttonStyle = {{backgroundColor:"#f5b507",}} titleStyle = {{color:"white", fontWeight:"bold"}} containerStyle = {{marginLeft:30, marginRight:30}} icon={
            <Icon
              name="star"
              size={15}
              color="white"
            />
            
          }
        //   onPress = {() => setIndexWrapper()}
        onPress = {() => { endorse() ,navigation.navigate('PlayGameLatest')}}
          >
         
        </Button>
        <Button title = "Maybe Not" buttonStyle = {{backgroundColor:"#6e6b65",}} titleStyle = {{color:"white", fontWeight:"bold"}} containerStyle = {{marginLeft:30, marginRight:30, marginTop:30}}
        onPress = {() => navigation.goBack()}
        >
        </Button>
        
        </View>
        </View>
        )

}
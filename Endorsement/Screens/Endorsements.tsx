import  React, {useState,useRef,useEffect} from 'react';
import { View, StyleSheet, Text, TextInput,TouchableOpacity,ScrollView,Image, FlatList,Picker,PanResponder,Animated, TouchableWithoutFeedback, SafeAreaView} from 'react-native';
import { useMutation,useQuery } from '@apollo/react-hooks';
import { MaterialIcons } from '@expo/vector-icons';
import {Button,Icon } from "react-native-elements"; 
import { gql } from 'apollo-boost';
import { useRoute } from '@react-navigation/native';
import { firebase } from '../../config'; 
const db = firebase.firestore(); 
const GENERATE_MATCHES = gql`
 query {
    generateMatches {
        user 
        data 
    }
 }

`
const SET_EVENT = gql`
 mutation namer($event:event1! = {type:"matchEndorsed"}){
   setEvent(event:$event)
 }

`
//getDatingPoolfake: datingPoolFake!




const GET_FAKE_DATING = gql`
 query {
     getDatingPoolfake {
          data {
               firstname
               profilePic
               gender
               
          }
     }
 }
`



export default function Endorsement({navigation, route}){
const data1 = [{user:"Amy Guion", matches:["eric hemsworth", "david boctor", "steve"]}]; 

const client = route.params.isMatch.user; 
const client1 = route.params.isMatch.client;
const matchId = route.params.isMatch.matchId; 

console.log(client); 
console.log(client1)


function endorse(){
   db.collection('user').doc('trial_user').update({matchEndorsed:firebase.firestore.FieldValue.increment(1), endorsements:firebase.firestore.FieldValue.arrayUnion(matchId)})
   
   db.collection('matches').doc(matchId).update({endorseBy:firebase.firestore.FieldValue.arrayUnion('trial_user')}); 
}











   



    
    
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
         <Text style = {{color:"white", fontWeight:"bold",fontSize:20, marginTop:10}}>{client1.name} </Text>
         </View>
         <View style = {{alignItems:"center", }}>
         {client1.profilePic ? <Image source = {{uri:client1.profilePic}} style = {{height:100, width:100, borderRadius:50}}/>:
         <MaterialIcons name="account-circle" size={100} color="blue" />}
         <Text style = {{color:"white", fontWeight:"bold",fontSize:20, marginTop:10}}>{client.name} </Text>
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
        onPress = {() => { endorse() ,navigation.navigate('GameHomepage')}}
          >
         
        </Button>
        <Button title = "Maybe Not" buttonStyle = {{backgroundColor:"#6e6b65",}} titleStyle = {{color:"white", fontWeight:"bold"}} containerStyle = {{marginLeft:30, marginRight:30, marginTop:30}}
        onPress = {() => navigation.navigate('Matchmake')}
        >
        </Button>
        
        </View>
        </View>
        )



// return (
//    <View style = {{justifyContent:"center", alignItems:"center"}}>
//      <Text>Endorsement Page</Text>
//    </View>
// )


}
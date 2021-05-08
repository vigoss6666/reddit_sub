import  React, {useState,useRef,useEffect, useContext} from 'react';
import {  View, StyleSheet,Image,Share } from 'react-native';
import {Text,Button,Icon} from 'react-native-elements'; 
import { MaterialIcons } from '@expo/vector-icons';
import {Line} from '../../src/common/Common'; 
import AppContext from '../../AppContext';

interface InvitetoplayProps {}

const Invitetoplay = ({navigation,route}) => {
 const myContext = useContext(AppContext); 
 const { computeName,db,userId,firebase } = myContext;
  const {client} = route.params;  
  const invite = () => {
    Share.share({message:`Inviting you to try Friends Help Friends app
    https://exp.host/@votexclient/friends_help_friends_chat
    username:votexclient 
    password:chemistry1Zu!2     
    `}).then(result => {
        console.log(result)
    })
    
    // if(Share.sharedAction){
    //     db.collection('invitationSent').add({client:client.phoneNumber, matchMaker:userId}).then(() => {
    //         db.collection('user').doc(userId).set({invitations:firebase.firestore.FieldValue.arrayUnion(client.phoneNumber)}, {merge:true}).then(() => {
                
    //              navigation.goBack()
    //         })   
              
    //        })        
    // }
    

  }

  navigation.setOptions({
      headerShown:false
  })  
  return (
    <View style={{flex:1,backgroundColor:'black',paddingTop:150}}>
    <Text h1 style = {{color:'white',alignSelf:'center',fontStyle:'italic',fontWeight:'bold',marginBottom:20}}> Invite to play </Text>    
    {client.profilePic ? <Image source = {{uri:client.profilePic}} style = {{height:100, width:100, borderRadius:50,alignSelf:'center'}}/>:<MaterialIcons name="account-circle" size={160} color="red" style = {{alignSelf:'center'}}/>}
    <Text h4 style = {{color:'white',alignSelf:'center',fontStyle:'italic',fontWeight:'bold',marginBottom:10,marginTop:20}}> {computeName(client)} </Text>    
    <View style = {{borderBottomColor:'white', borderBottomWidth:2, marginLeft:30, marginRight:30}}/>
    <Text h6 style = {{marginBottom:30,marginTop:30,color:'white',alignSelf:'center',fontStyle:'italic',fontWeight:'bold',marginBottom:10,marginLeft:30, marginRight:30}}> {computeName(client)} has not downloaded the Friends Help Friends app. Invite {computeName(client)} to play.</Text>    
    <View style = {{borderBottomColor:'white', borderBottomWidth:2, marginLeft:30, marginRight:30,marginTop:10}}/>
    <Button containerStyle = {{marginLeft:50, marginRight:50,marginTop:75,marginBottom:50}} title = {"Invite To Play"} buttonStyle = {{backgroundColor:'#7f9c65'}} titleStyle = {{fontWeight:'bold', color:'black'}} iconContainerStyle = {{marginRight:30}} onPress = {() => invite()} icon={
    <Icon
      name="chat"
      size={15}
      color="black"
      reverse
    />
  }/>
    <Button containerStyle = {{marginLeft:50, marginRight:50,}} title = {"Not Right Now "} buttonStyle = {{backgroundColor:'#ced1cb'}} titleStyle = {{fontWeight:'bold', color:'black'}} onPress = {() => navigation.goBack()}/>
  

    
    </View>
  );
};

export default Invitetoplay;



import  React, {useState,useRef,useEffect, useContext} from 'react';
import { MaterialIcons } from '@expo/vector-icons';

import { Text, View, StyleSheet } from 'react-native';
import * as Animatable from 'react-native-animatable';
import AppContext from '../../AppContext'; 

interface MatchEndorsedProps {}

const MatchEndorsed = ({navigation, route}) => {
    const myContext = useContext(AppContext); 
    const { userId,db, createChatThread, firebase, computeName, setGeneratedMatch, generatedMatch, selfFilter} = myContext;
const {client, user} = route.params;     
const namer = useRef(); 
if(namer.current){
     console.log(namer)
}
console.log(client)
useEffect(() => {
    navigation.setOptions({
         headerShown:false
    }) 
}, [])
const setEvent = () => {
    
    // setGeneratedMatch((generatedMatch) => [...generatedMatch, {client:tester[sliderState.currentPage].client, user:tester[sliderState.currentPage].data[sliderState1.currentPage]}])
    const _id = createChatThread(client.phoneNumber, user.phoneNumber);
    console.log("id is"+_id)   
    db.collection('introductions').doc(_id).set({client1:client.phoneNumber, client2:user.phoneNumber, createdAt:new Date(), discoveredBy:userId}, {merge:true});
    db.collection('user').doc(userId).set({points:firebase.firestore.FieldValue.arrayUnion({
      pointFor:'matchDiscovered', 
      point:50, 
      createdAt: new Date(), 
      client:client.phoneNumber
    })}, {merge:true}).then(() => {
        
        
    }) 

  }
useEffect(() => {
     setEvent()
}, [])
    
   
  return (
    <View style={styles.container}>
        <Animatable.View style = {{flexDirection:'row',marginTop:50,marginLeft:20,justifyContent:'center'}}>
        <Animatable.Image animation="zoomInUp" source = {{uri:"https://media1.giphy.com/media/jIRyzncqRWzM3GYaQm/200w.webp?cid=ecf05e4794i8r2y4pn7rz4q07079kp70edvf3074yzak89dd&rid=200w.webp&ct=g"}} style = {{height:80, width:80,borderRadius:40}}  useNativeDriver = {true}/>
      <Animatable.Text animation="zoomInUp" style = {{color:'yellow',marginLeft:0,marginTop:20,fontSize:30}} useNativeDriver = {true}>+50 pts!!</Animatable.Text>
      </Animatable.View>
      <Animatable.View style = {{marginTop:100, flexDirection:'row',justifyContent:'space-around'}}>
          
      <Animatable.View>
      {client.profilePicSmall ? <Animatable.Image animation="zoomInUp" source = {{uri:client.profilePicSmall}} style = {{height:80, width:80,borderRadius:40}} />:
         <MaterialIcons name="account-circle" size={80} color="blue" />}
      
      <Animatable.Text animation="zoomInUp" style = {{color:'white',marginTop:20}}>{computeName(client)}</Animatable.Text>
      </Animatable.View>    
      <Animatable.View>
      {user.profilePicSmall ? <Animatable.Image animation="zoomInUp" source = {{uri:user.profilePicSmall}} style = {{height:80, width:80,borderRadius:40}} />:
         <MaterialIcons name="account-circle" size={80} color="blue" />}
      
      <Animatable.Text animation="zoomInUp" style = {{color:'white',marginTop:20}}>{computeName(user)}</Animatable.Text>
      </Animatable.View>
      

      </Animatable.View>  
      <Animatable.Text style = {{color:'yellow',fontSize:30,alignSelf:'center', marginTop:40,fontStyle:'italic', fontWeight:'bold'}}  animation = "zoomInUp" easing = "ease-in-cubic" onAnimationEnd = {(endState) => endState.finished ? setTimeout(() => navigation.pop(2),1000):null} useNativeDriver = {true}>
        Match Discovered!!
      </Animatable.Text>
      

    </View>
  );
};

export default MatchEndorsed;

const styles = StyleSheet.create({
  container: {flex:1, paddingTop:100,  backgroundColor:'black'}
});

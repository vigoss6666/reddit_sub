import React, { useState, useEffect, useRef, useContext } from 'react';
import { View, Text,TouchableOpacity,ScrollView, StyleSheet, Share } from 'react-native'; 
import {Button} from 'react-native-elements';  

import AppContext from '../../AppContext';
import {ClientHeader, ClientDetails, ClientPhotos, ClientMatchMakers, ClientTraits, ClientVotes, LoadScreen} from '../../src/common/Common'; 

export default function ProfileClientView({route, navigation}) {
    const myContext = useContext(AppContext);
    const { db, CustomBackComponent, userId, firebase} = myContext;
    useEffect(() => {
       navigation.setOptions({
           headerTitle:false, 
           headerLeft:() => <CustomBackComponent navigation = {navigation}/>
       }) 
        
    }, [])
    const {intro} = route.params; 
    const [user, setUser] = useState(); 

    
    
    
    const handleIntro = () => {
      db.collection('user').doc(userId).set({introMatches:firebase.firestore.FieldValue.arrayUnion(intro._id)}, {merge:true});
      db.collection('matches').doc(intro._id).set({client1:intro.client1, client2:intro.client2, createdAt:new Date(), discoveredBy:intro.discoveredBy ? intro.discoveredBy:null})
      db.collection('user').doc(intro.discoveredBy).set({points:firebase.firestore.FieldValue.arrayUnion({pointFor:'matchAccepted', point:250, createdAt:new Date(), client:intro.client1})}, {merge:true})
      navigation.goBack()
  }  


    useEffect(() => {
        db.collection('user').doc(intro.clientUser.phoneNumber).get().then(onDoc => {
             setUser(onDoc.data())
        })
    }, [intro.clientUser])

    if(user){
        return (
            <View style={styles.container}>
            <ScrollView>
            
             <ClientHeader client = {user} style = {{ flex:0.3}}/>  
             
              <View style = {{flex:0.7, marginLeft:30, marginRight:30}}>
                     <View style = {{flexDirection:'row', justifyContent:'space-evenly', borderWidth:2, marginTop:40}}>
  
                         
                         
                     </View> 
                      <ClientTraits client = {user} />
                     <ClientDetails client = {user} client2 = {{latitiude:32.735487, longitude:-117.149025}}/>
                    <ClientPhotos client = {user}/>
                    <ClientMatchMakers client = {user} />
                    <Button title = {'Accept Introduction'} onPress = {handleIntro} style = {{marginTop:100, marginBottom:100}}/>

                    
                   
                   
                   
                    
                    
                    
    
                    
    
    
                    
                    
    
                    
              </View>
              </ScrollView>    
              
            </View>
          );    
       }
       return (
            <LoadScreen />
       )
    
}

const styles = StyleSheet.create({
    container: {flex:1}, 
    textStyle:{fontWeight:'500', fontSize:30}, 
    line:{borderBottomWidth:3,}, 
    iconNames:{marginLeft:10, fontSize:17, fontWeight:'500'}, 
    dotted:{borderStyle:'dotted', borderWidth:2, borderRadius:10, marginTop:10 }
  });
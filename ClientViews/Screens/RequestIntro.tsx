import  React, {useState,useRef,useEffect, useContext} from 'react';
import { Text, View, StyleSheet } from 'react-native';
import {Button} from 'react-native-elements'; 
import { ScrollView } from 'react-native-gesture-handler';
import AppContext from '../../AppContext';
import {ClientHeader, ClientDetails, ClientTraits, ClientPhotos, ClientMatchMakers} from '../../src/common/Common'; 

interface RequestIntroProps {}

const RequestIntro = ({route,navigation}) => {
    const myContext = useContext(AppContext); 
    const {user, userId, setChatNotification,setChatterNotification,db,firebase, createChatThread, CustomBackComponent} = myContext;  
    useEffect(() => {
        navigation.setOptions({
            headerTitle:false, 
            headerLeft:() => <CustomBackComponent navigation = {navigation}/>
        })
    }, [])

    const {intro} = route.params; 
    
  
  const handleIntro = () => {
    db.collection('user').doc(userId).set({introMatches:firebase.firestore.FieldValue.arrayUnion(intro._id)}, {merge:true});
    db.collection('matches').doc(intro._id).set({client1:intro.client1, client2:intro.client2, createdAt:new Date()})
    navigation.goBack()
}  
  return (
    <ScrollView style={{flex:1}}>
        <View style = {{flex:1, marginLeft:20, marginRight:20}}>
       <ClientHeader client = {intro.clientUser} /> 
       <ClientTraits client = {intro.clientUser} />
       <ClientDetails client = {intro.clientUser} />
       <ClientPhotos client = {intro.clientUser} />
       <ClientMatchMakers client = {intro.clientUser} />
       
       
      <Button title = {'Accept Introduction'} onPress = {handleIntro} style = {{marginTop:100, marginBottom:100}}/>
      </View>
    </ScrollView>
  );
};

export default RequestIntro;

const styles = StyleSheet.create({
  container: {}
});

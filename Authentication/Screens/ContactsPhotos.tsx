
import  React, {useState,useRef,useEffect, useContext} from 'react';
import { View, StyleSheet, ScrollView, Image, TouchableOpacity} from 'react-native';

import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import {Button, Text} from 'react-native-elements'; 
import {firebase} from '../../config'; 
import { object } from 'underscore';
import { MaterialIcons } from '@expo/vector-icons';
import AppContext from '../../AppContext'; 
import {updateUser} from '../../networking';
const db = firebase.firestore(); 

interface ContactsPhotosProps {}
const computeName = (obj) => {
    if(obj.name){
       return obj.name
    }
    if(obj.firstName && obj.lastName){
       return obj.firstName+obj.lastName
    }
    return obj.firstName
 }

const ContactsPhotos = ({navigation}) => {
  const [profiles, setProfiles] = useState([{firstName:"zaid"}]);   
  const myContext = useContext(AppContext); 
  const {user, userId} = myContext;
  const [gate, checkGate] = useState(true); 
  useEffect(() => {
    
    async function namer(){
      
     const onResult = await db.collection('user').where(firebase.firestore.FieldPath.documentId(), 'in', user.datingPoolList).get();
     const users = onResult.docs.map(val => val.data());
     
     const profilesWithMatchMaker = users.filter(val => val.matchMaker == userId); 
     const profilesWithoutMatchmaker = users.filter(val => val.matchMaker !== userId); 
     const finalUsers = [...profilesWithoutMatchmaker, ...profilesWithMatchMaker];
     
     setProfiles(finalUsers); 
 
    }
    namer()
    
 }, [])
  
  let openImagePickerAsync = async (obj) => {
    
    let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }
    
    

    let pickerResult = await ImagePicker.launchImageLibraryAsync({mediaTypes:ImagePicker.MediaTypeOptions.Images});
    
    
      
      
      const response = await fetch(pickerResult.uri); 
        const blob = await response.blob(); 
        const namer = Math.random().toString(36).substring(2);
        const ref = firebase.storage().ref().child("images/"+ namer); 
        await ref.put(blob)
        const result1 = await ref.getDownloadURL();
        const cloner = profiles.concat();  
        const objIndex = cloner.findIndex(val => val.phoneNumber == obj.phoneNumber);
        cloner[objIndex].profilePic = result1;  
        setProfiles(cloner); 
        const serverObject = {
        profilePic:result1   
        }
       db.collection('user').doc(obj.phoneNumber).set(serverObject, {merge:true}); 
    
    
    
  }
  return(
    <View style = {{flex:1, }}>
    <View style = {{flex:0.1, }}>
    
    </View>
    <View style = {{flex:0.1}}>
    <Text h4 style = {{alignSelf:'center', fontWeight:"600"}}>Tell us about your friends</Text>
    <Text h5 style = {{alignSelf:'center', fontWeight:"600"}}>Add a photo for each friend</Text>
   
    </View>
    <View style = {{flex:0.6}}>
    <ScrollView>
              {profiles.map((val,index) => {
                return (
                  <View key={index} 
                  style = {{borderWidth:1, height:50,flexDirection:"row",  justifyContent:'space-between', marginLeft:20, marginRight:20, borderLeftWidth:0, borderRightWidth:0,}}
                  onPress = {() => { addArray(index)  }}
                  >
                      <View style = {{flexDirection:'row', alignItems:'center', flex:0.9}}>
                      {val.profilePic ? <Image source = {{uri:val.profilePic}} style = {{height:40, width:40, borderRadius:20}}/>:<MaterialIcons name="account-circle" size={30} color="black" />}
                      <Text style = {{marginLeft:10}}>{computeName(val)}</Text>

                      </View>
                      <TouchableOpacity style = {{alignItems:'center', justifyContent:'center'}} onPress = {() => openImagePickerAsync(val)}>
                          <Text style = {{fontWeight:'bold'}}>Add photo</Text>
                      </TouchableOpacity>
                  </View>
                )
              })}
            </ScrollView> 
    </View>
    <View style = {{flex:0.2, justifyContent:'center',marginTop:10 }}>
    <Button title = "save" containerStyle = {{marginLeft:30, marginRight:30,}} buttonStyle = {{backgroundColor:'black'}} onPress = {() => {navigation.navigate('Homer')}}></Button>   

    </View>
    </View>
    ) 
};

export default ContactsPhotos;

const styles = StyleSheet.create({
  container: {}
});

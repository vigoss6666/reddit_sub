
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
import AsyncStorage from '@react-native-async-storage/async-storage';
const db = firebase.firestore(); 

interface ContactsPhotosProps {}


const ContactsPhotos = ({navigation}) => {
  const [profiles, setProfiles] = useState([{firstName:"zaid"}]);   
  const myContext = useContext(AppContext); 
  const { userId, setCurrentUser,setUser,defaultDataObject,firebase,profileAuth,setProfilesAuth,computeName} = myContext;
  const [gate, checkGate] = useState(true); 
  const [user,setUser1] = useState({}); 

  const [checkPhoto, setCheckPhoto] = useState('Skip'); 


  // useEffect(() => {
  //   profileAuth.map(val => {
  //      if(val.profilePic){
  //        setCheckPhoto(true);
  //        return;  
  //      }
  //      setCheckPhoto(false); 
  //   })
  // }, [profileAuth])

  useEffect(() => {
    navigation.setOptions({
      headerLeft:false
    })
  }, [])
    

    useEffect(() => {
      db.collection('user').doc(userId).get().then(onDoc => {
          setUser1(onDoc.data())
      })
    }, [])
//   useEffect(() => {
    
//     async function namer(){
      
//      const onResult = await db.collection('user').where(firebase.firestore.FieldPath.documentId(), 'in', user.datingPoolList).get();
//      const users = onResult.docs.map(val => val.data());
     
//      const profilesWithMatchMaker = users.filter(val => val.matchMaker == userId); 
//      const profilesWithoutMatchmaker = users.filter(val => val.matchMaker !== userId); 
//      const finalUsers = [...profilesWithoutMatchmaker, ...profilesWithMatchMaker];
     
//      setProfiles([...profilesWithMatchMaker]); 
 
//     }
//     if(Object.keys(user).length){
//       namer()
//   }
    
    
//  }, [user])
const addProfilePicSmall = async (uri:string,userGamer:string) => {
      
  const manipResult = await ImageManipulator.manipulateAsync(
    uri,
    [{resize:{width:60, height:60}}], 
    { compress: 1.0, format: ImageManipulator.SaveFormat.PNG }
  );
  const response = await fetch(manipResult.uri); 
  const blob = await response.blob(); 
  const namer = Math.random().toString(36).substring(2);
  const ref = firebase.storage().ref().child("images/"+ namer); 
  await ref.put(blob,{cacheControl:'max-age=31536000', contentType:'image/png'})
  const result1 = await ref.getDownloadURL()
  updateUser(userGamer, {profilePicSmall:result1})

  
}

 const handleInit = () => {
  const userInit = Object.assign({}, {...defaultDataObject},{...user}) 
  db.collection('user').doc(userId).update(userInit);
  const batch = db.batch(); 
  profiles.map(val => {
   const friendInit = Object.assign({}, {...defaultDataObject}, {...val}) 
   const ref = db.collection('user').doc(val.phoneNumber); 
   batch.set(ref, {...friendInit})  
  })
  batch.commit().then(async () => {
    setUser(user);
    await AsyncStorage.setItem('user', userId);  
    navigation.navigate('Homer')
  })

 }
  
  let openImagePickerAsync = async (obj) => {
    
    let permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }
    
    

    let pickerResult = await ImagePicker.launchImageLibraryAsync({mediaTypes:ImagePicker.MediaTypeOptions.Images});
    
    
      
    const cloner = profileAuth.concat();  
    const objIndex = cloner.findIndex(val => val.phoneNumber == obj.phoneNumber);
    cloner[objIndex].profilePicSmall = pickerResult.uri;  
    setProfilesAuth(cloner);
    setCheckPhoto('Save')
      const response = await fetch(pickerResult.uri); 
        const blob = await response.blob(); 
        const namer = Math.random().toString(36).substring(2);
        const ref = firebase.storage().ref().child("images/"+ namer); 
        await ref.put(blob,{cacheControl:'max-age=31536000', contentType:'image/jpeg'});
        
        const result1 = await ref.getDownloadURL();
         
        const serverObject = {
        profilePic:result1   
        }
       db.collection('user').doc(obj.phoneNumber).set(serverObject, {merge:true});
       addProfilePicSmall(pickerResult.uri, obj.phoneNumber);  
    
    
    
  }
  return(
    <View style = {{flex:1, }}>
    <View style = {{flex:0.1, }}>
    
    </View>
    <View style = {{flex:0.1}}>
    <Text h4 style = {{alignSelf:'center', fontWeight:"600"}}>Tell us about your friends</Text>
    <Text h5 style = {{alignSelf:'center', fontWeight:"600"}}>Add a photo for each friend (optional)</Text>
   
    </View>
    <View style = {{flex:0.6}}>
    <ScrollView>
              { profileAuth !== undefined ? profileAuth.map((val,index) => {
                return (
                  <View key={index} 
                  style = {{borderWidth:1, height:50,flexDirection:"row",  justifyContent:'space-between', marginLeft:20, marginRight:20, borderLeftWidth:0, borderRightWidth:0,}}
                  onPress = {() => { addArray(index)}}
                  >
                      <View style = {{flexDirection:'row', alignItems:'center', flex:0.9}}>
                      {val.profilePicSmall ? <Image source = {{uri:val.profilePicSmall}} style = {{height:40, width:40, borderRadius:20}}/>:<MaterialIcons name="account-circle" size={30} color="black" />}
                      <Text style = {{marginLeft:10,maxHeight:50, maxWidth:100}} numberOfLines = {2}>{computeName(val)}</Text>

                      </View>
                      <TouchableOpacity style = {{alignItems:'center', justifyContent:'center'}} onPress = {() => openImagePickerAsync(val)}>
                          <Text style = {{fontWeight:'bold'}}>Add photo</Text>
                      </TouchableOpacity>
                  </View>
                )
              }):null}
            </ScrollView> 
    </View>
    <View style = {{flex:0.2, justifyContent:'center',marginTop:10 }}>
    <Button title = {checkPhoto} containerStyle = {{marginLeft:30, marginRight:30,}} buttonStyle = {{backgroundColor:'black'}} onPress = {() => {navigation.navigate('ContactsLocationLatest')}}></Button>   

    </View>
    </View>
    ) 
};

export default ContactsPhotos;

const styles = StyleSheet.create({
  container: {}
});

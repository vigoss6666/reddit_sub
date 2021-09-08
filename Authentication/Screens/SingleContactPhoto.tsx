
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


const SingleContactPhoto = ({navigation}) => {
  const [profiles, setProfiles] = useState([{firstName:"zaid"}]);   
  const myContext = useContext(AppContext); 
  const {user, userId, singleContact, CustomBackComponent,computeName} = myContext;
  const [gate, checkGate] = useState(true); 
  useEffect(() => {
    navigation.setOptions({
        headerLeft:() => <CustomBackComponent navigation = {navigation}/>, 
        headerTitle:false
    })
  }, [])
  useEffect(() => {
    
    async function namer(){
      
     setProfiles([singleContact]); 
 
    }
    namer()
    
 }, [singleContact])
  
  let openImagePickerAsync = async (obj) => {
    console.log('the function was called')  
    let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }
    console.log("conatacts photos called")  
    

    let pickerResult = await ImagePicker.launchImageLibraryAsync({mediaTypes:ImagePicker.MediaTypeOptions.All});
    console.log(pickerResult.type)
    if(pickerResult.type == 'image'){
      // const manipResult = await ImageManipulator.manipulateAsync(
      //   pickerResult.uri,
      //   [{resize:{width:200, height:200}}],
      //   { compress: 0.1, format: ImageManipulator.SaveFormat.PNG,}
      // );
      const cloner = profiles.concat();  
        const objIndex = cloner.findIndex(val => val.phoneNumber == obj.phoneNumber);
        cloner[objIndex].profilePic = pickerResult.uri;  
        setProfiles(cloner); 
      
      const response = await fetch(pickerResult.uri); 
        const blob = await response.blob(); 
        const namer = Math.random().toString(36).substring(2);
        const ref = firebase.storage().ref().child("images/"+ namer); 
        await ref.put(blob,{cacheControl:'max-age=31536000', contentType:'image/png'})
        const result1 = await ref.getDownloadURL();
        
        const serverObject = {
        profilePic:result1   
        }
       db.collection('user').doc(obj.phoneNumber).set(serverObject, {merge:true}); 
    }
    if(pickerResult.type == 'video'){
      alert('Video format not allowed')
      return; 
    }
    
  }
  return(
    <View style = {{flex:1, }}>
    <View style = {{flex:0.1, }}>
    
    </View>
    <View style = {{flex:0.1}}>

    <Text h4 style = {{alignSelf:'center', fontWeight:"600"}}>Tell us about your friend</Text>
    <Text h5 style = {{alignSelf:'center', fontWeight:"600"}}>Add a photo for your friend</Text>
   
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
    <Button title = "save" containerStyle = {{marginLeft:30, marginRight:30,}} buttonStyle = {{backgroundColor:'black'}} onPress = {() => {navigation.navigate('SingleContactGender')}}></Button>   

    </View>
    </View>
    ) 
};

export default SingleContactPhoto;

const styles = StyleSheet.create({
  container: {}
});

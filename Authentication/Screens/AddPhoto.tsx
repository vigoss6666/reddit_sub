import  React, {useState,useRef,useEffect,useContext} from 'react';
import { Dimensions,View, StyleSheet, Text, TextInput,TouchableOpacity,ScrollView,Image,FlatList,Picker,PanResponder,Animated, TouchableWithoutFeedback, SafeAreaView, KeyboardAvoidingView, Platform} from 'react-native';
import {Button} from 'react-native-elements'; 
import { useMutation,useQuery } from '@apollo/react-hooks';
import { Header } from '../../src/common/Common';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import AppContext from '../../AppContext';
import {firebase} from '../../config';
import {updateUser} from '../../networking';
import * as ImageManipulator from 'expo-image-manipulator';
export default function School({navigation}){
  const myContext = useContext(AppContext); 
    const {userId, CustomBackComponent,profilePicLocal,setProfilePicLocal} = myContext;
    const [openGate, setOpenGate] = useState(true); 
    const [Email, setEmail] = useState();
    const loadProfilePic = async () => {
      let permissionResult = await ImagePicker.requestCameraPermissionsAsync();
          
          if (permissionResult.granted === false) {
            alert("Permission to access camera roll is required!");
            return;
          }
          
      let pickerResult = await ImagePicker.launchImageLibraryAsync({mediaTypes:ImagePicker.MediaTypeOptions.Images});
      setProfilePicLocal(pickerResult.uri) 
      addProfilePicSmall(pickerResult.uri);  
      const response = await fetch(pickerResult.uri); 
      const blob = await response.blob(); 
      const namer = Math.random().toString(36).substring(2);
      const ref = firebase.storage().ref().child("images/"+ namer); 
      await ref.put(blob)
      const result1 = await ref.getDownloadURL()
      updateUser(userId, {profilePic:result1})
      // addProfilePicSmall()
    }
    useEffect(() => {
      navigation.setOptions({
        headerTitle:false, 
        headerLeft:() => <CustomBackComponent navigation = {navigation}/>
      })
    }, [])

    const addProfilePicSmall = async (uri:string) => {
      
      const manipResult = await ImageManipulator.manipulateAsync(
        uri,
        [{resize:{width:80, height:80}}], 
        { compress: 1, format: ImageManipulator.SaveFormat.PNG }
      );
      const response = await fetch(manipResult.uri); 
      const blob = await response.blob(); 
      const namer = Math.random().toString(36).substring(2);
      const ref = firebase.storage().ref().child("images/"+ namer); 
      await ref.put(blob,{cacheControl:'max-age=31536000', contentType:'image/png'})
      const result1 = await ref.getDownloadURL()
      updateUser(userId, {profilePicSmall:result1})

      
    }

    useEffect(() => {
      if(profilePicLocal){
        setOpenGate(false); 
      }
      if(!profilePicLocal){
        setOpenGate(true)
      }
    }, [profilePicLocal])

    const _handleEmail = () => {
    const hello = "zaheeryakub@gmail.com";     
   
   navigation.navigate('Password')
   
  }
    return(
      
      <View style = {{flex:1, backgroundColor:'white'}}>   
      <View style = {{flex:0.2}}>
      {/* <TouchableOpacity onPress = {() => { navigation.navigate('School', {page:'something'})}}>
      <Text style = {{marginTop:20, alignSelf:"flex-end", marginRight:30, color:"orange", fontWeight:"bold"}}>Skip</Text>   
      </TouchableOpacity> */}
      </View>
      <View style = {{flex:0.5, marginLeft:30}}>
      <Text style = {{fontWeight:"bold", fontSize:23,  marginLeft:30,marginRight:30 }}> Upload your photo</Text>
      <View style = {{borderBottomWidth:1, marginTop:10,marginLeft:30, marginRight:30}}/> 
      <View style = {{justifyContent:"center", alignItems:"center", marginTop:60, marginLeft:-30}}>
      {profilePicLocal ? <Image source = {{uri:profilePicLocal}} style = {{height:120, width:120, borderRadius:60}}/>: <TouchableOpacity onPress = {loadProfilePic}><Image source = {require('../../assets/addPhoto.png')} style = {{height:120, width:120}}/></TouchableOpacity>}
      </View>
      <View style = {{flexDirection:"row", justifyContent:"center"}}>
      {/* <TouchableOpacity onPress = {() => navigation.navigate('AuthPhotos', {page:"AddPhoto"})} style = {{flexDirection:"row", alignItems:"center"}}>
      <Text style = {{ fontWeight:"bold", marginLeft:-30, marginRight:5}}>Change Photo</Text>
      <FontAwesome name="caret-down" size={24} color="black" />
      </TouchableOpacity> */}
      
      </View>
        <View style = {{borderBottomWidth:1, marginTop:40, borderBottomColor:"grey",marginLeft:30, marginRight:30}}/> 
      </View>
      <View style = {{flex:0.3,justifyContent:"center", }}>
       {/* <Continue  onPress = {() => {_handleEmail(), mutateSettings({email:Email}) }}/>     */}
       <Button
  title="Continue"
  type="outline"
  containerStyle = {{backgroundColor:"black",marginLeft:30, marginRight:30}}
  titleStyle = {{color:"white", fontWeight:"700"}}
  disabledStyle = {{backgroundColor:"grey",}}
  disabled = {profilePicLocal ? false:true}
  
  onPress = {() => { navigation.navigate('Posted', {page:'something'})}}
/>
      </View>
      </View>
      
      )
}
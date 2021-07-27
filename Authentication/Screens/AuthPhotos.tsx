import  React, {useState,useRef,useEffect, useContext, useLayoutEffect} from 'react';
import { View, StyleSheet, Text, TextInput,TouchableOpacity,ScrollView,Image, Button,FlatList,Picker,PanResponder,Animated, TouchableWithoutFeedback, SafeAreaView, AsyncStorage} from 'react-native';
import { useMutation,useQuery } from '@apollo/react-hooks';
import { FontAwesome } from '@expo/vector-icons';
import { Entypo, AntDesign, MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import { uploadImage } from '../../networking'; 
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {firebase} from '../../config'; 
//@refresh reset

import { pick } from 'underscore';
import AppContext from '../../AppContext'; 

import {updateUser} from '../../networking';



export default function Photos({navigation, route }){
  const myContext = useContext(AppContext); 
    const { userId,CustomBackComponent, setProfilePicLocal} = myContext;     
    const insets = useSafeAreaInsets();
    const [camera,setCamera] = useState(); 
    
    //const {page} = route.params; 
    
    
    const [profilePic,setProfilePic] = useState(null);
    
    
    
    
    
    async function updateProfilePicToServer(){
      
    //   const pattern = /file/i; 
    //   const result = profilePic.match(pattern); 
      
      setProfilePicLocal(profilePic)
      const response = await fetch(profilePic); 
      
      const blob = await response.blob(); 
      const namer = Math.random().toString(36).substring(2);
      const ref = firebase.storage().ref().child("images/"+ namer); 
      await ref.put(blob)
      const result1 = await ref.getDownloadURL()
      
      
      

      updateUser(userId, {profilePic:result1})
      
      
      }
      useLayoutEffect(() => {
        navigation.setOptions({
          headerShown:false,
        });
      }, [navigation]);
    
    
    const [photos, setPhotos] = useState([null, null, null, null,null,null])
    
    const loadProfilePic = async () => {
    let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();
        
        if (permissionResult.granted === false) {
          alert("Permission to access camera roll is required!");
          return;
        }
        
        let pickerResult = await ImagePicker.launchImageLibraryAsync({mediaTypes:ImagePicker.MediaTypeOptions.Images});
        setProfilePic(pickerResult.uri) 
  }   

  const keys = ["apple", "banana", "mango", "cheery", "gobhi", "lemon", "chocolate", "vanilla", "juice", "bruce", "viagra", "vigoss"]
    const [namer, setNamer] = useState(); 
     async function getId(){
      const result = await AsyncStorage.getItem('_id')
      return result; 
   }
   let key;  
   
    
    useEffect(() => {
        const result = getId(); 
        key = result; 
        return () => {
           
        }
    }, [photos,namer])
    const setPhotosFunc = (uri) => {
         const arr = photos.concat(); 
         const imageLength = arr.filter(val => val != null); 
         arr[imageLength.length] = uri; 
         setPhotos([ ...arr, ]);
         
    }
    const uploadPhotosToServer = async () => {
       
      const result = photos.map(async val => {
        if(val == null){
          return val; 
        }
        // const pattern = /file/i; 
        // const resulter = val.match(pattern); 
        
       const response = await fetch(val); 
        const blob = await response.blob(); 
        const namer = Math.random().toString(36).substring(2);
        const ref = firebase.storage().ref().child("images/"+ namer); 
        await ref.put(blob)
        const result1 = await ref.getDownloadURL(); 
        return result1; 
       
        return val;       
      })
      Promise.all(result).then(finaler => {
         
         updateUser(userId, {photos:finaler})
      }).catch(error => console.log(error)); 
    
    }     
    
     
    
    let openImagePickerAsync = async () => {
        let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();
        
        if (permissionResult.granted === false) {
          alert("Permission to access camera roll is required!");
          return;
        }
        
        let pickerResult = await ImagePicker.launchImageLibraryAsync({base64:false});
        
        setPhotosFunc(pickerResult.uri)
        // var storageRef = firebase.storage().ref();
        // var mountainsRef = storageRef.child('mountains.png');
        // const data = new FormData();
        // const result = pickerResult.uri.replace('file://', '');
        // //data.append('file',  {uri: result,filename :'imageName.png',type: 'image/png'});
        // mountainsRef.putString(pickerResult.base64).then(function(snapshot) {
        
        // }); 

         
        
        
      }
      const _deletePhoto = (uri:any) => {
        const arr = photos.concat(); 
        const index = arr.indexOf(uri); 
        arr.splice(index,1,)
        arr.push(null); 
        setPhotos(arr); 
}
 const updateToServer = async () => {
    
 }

 const profileTemplate = profilePic ? 
 <TouchableOpacity onPress = {() => loadProfilePic()} style = {{justifyContent:"center", alignItems:"center"}}>
   <View>
   <Image source = {{uri:profilePic}} style = {{height:160, width:160, borderRadius:80}}/>
   <AntDesign name="pluscircle" size={20} color="red" style = {{position:'absolute', top:120, right:8 }}/>
   </View>
 </TouchableOpacity>
 :<TouchableOpacity 
 onPress = {() => loadProfilePic()}
 style = {{flexDirection:"row", justifyContent:"center"}}
 >
 
 <Entypo name="camera" size={80} color="pink" />
 <View style = {{alignSelf:"flex-end", marginLeft:-10}}>
 <AntDesign name="pluscircle" size={30} color="red" />
 </View>
 </TouchableOpacity>     
 const template = photos.map((ages, index) => {
     
   if(ages){

     return <View key = {index.toString()} style = {{flexDirection:"row"}}>
       
       <Image source = {{uri:ages}} style = {{height:100, width:100,}} key = {index.toString()}/>
       <TouchableOpacity 
       style = {{position:'absolute', top:80, right:0 }}
       onPress = {() => _deletePhoto(ages)}
       >
       <Entypo name="circle-with-cross" size={24} color="red" />
       </TouchableOpacity>   
       </View>
   } 
   

return <View style = {{marginRight:10, justifyContent:'center', alignItems:'center'}} key = {keys[index]}>
<MaterialIcons name="insert-photo" size={100} color="black" />
</View>

})  



const marker = <TouchableOpacity  onPress = {() => openImagePickerAsync()} style = {{width:100, height:100, justifyContent:'center', alignItems:'center'}}> 
<AntDesign name="pluscircle" size={40} color="red" />

</TouchableOpacity>
const image = photos.filter(val => val != null); 
template[image.length] = marker; 



  
 




const row1 = <View style = {{ flexDirection:"row",  marginBottom:15, justifyContent:'space-between',marginRight:30}}>
    {[template[0], template[1], template[2]]}
    </View>
const row2 = <View style = {{flexDirection:"row",marginBottom:15, justifyContent:'space-between', marginRight:30}}>
{[template[3], template[4], template[5]]

}
</View>    

return(
<View style = {{flex:1,marginLeft:30, marginRight:30, paddingTop:insets.top}}>
<View style = {{flex:0.2}}> 
<TouchableOpacity onPress = {() => {updateProfilePicToServer(),uploadPhotosToServer(),  navigation.navigate('School', {page:'something'})}} style = {{alignItems:'flex-end', marginTop:10}}>
   <Text style = {{color:"orange", fontSize:15, fontWeight:"bold"}}>Done</Text>
   </TouchableOpacity>
   
</View>
<View style = {{flex:0.7}}>

{profileTemplate}
<Text style = {{alignSelf:"center", fontStyle:'italic', fontWeight:"bold", marginTop:30}}>Add Multiple Photos to increase your chances </Text>
<View style = {{borderBottomWidth:2, marginTop:30}}>

</View>
<View style = {{  flexWrap:'wrap',  marginTop:30}}>


{
    [row1,
    row2]
    
}

</View>
<View style = {{borderBottomWidth:2, marginTop:30}}>

</View>
</View>

<View style = {{flex:0.1}}>

</View>

</View>
)
}
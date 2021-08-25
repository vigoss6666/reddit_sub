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
import * as FileSystem from 'expo-file-system';
import { Asset } from 'expo-asset';
//@refresh reset
import SettingsHome from './SettingsHome';
import { pick } from 'underscore';
import AppContext from '../../AppContext'; 

import {updateUser} from '../../networking';
import {DragSortableView} from 'react-native-drag-sort'; 
import { FadeOutToBottomAndroidSpec } from '@react-navigation/stack/lib/typescript/src/TransitionConfigs/TransitionSpecs';



export default function PhotosLatest({navigation, route }){
  const myContext = useContext(AppContext); 
    
    const {user, userId,db, setUser} = myContext;     
    const insets = useSafeAreaInsets();
    const [camera,setCamera] = useState(); 
    const [profilePic, setProfilePic] = useState(); 
    
    
    //const {page} = route.params; 
    
    const localUri = (uri) => {
      
    }

  
    // useEffect(() => {
    // user.photos.map(val => {
    //     Image.prefetch(val); 
    // })    
    // }, [])
    
    
    async function updateProfilePicToServer(){
      
      const pattern = /file/i; 
      const result = profilePic.match(pattern); 
      
      
      const response = await fetch(profilePic); 
      const blob = await response.blob(); 
      const namer = Math.random().toString(36).substring(2);
      const ref = firebase.storage().ref().child("images/"+ namer); 
      await ref.put(blob, {cacheControl:'max-age=31536000', contentType:'image/jpeg'}).catch(error => console.log(error))
      const result1 = await ref.getDownloadURL().catch(error => console.log(error))
      
      db.collection('user').doc(userId).set({profilePic:result1}, {merge:true});  
      
      
      }
      useLayoutEffect(() => {
        navigation.setOptions({
          headerShown:false,
        });
      }, [navigation]);
    
    
    const [photos, setPhotos] = useState(user.photos)
    
    const loadProfilePic = async () => {
    let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();
        
        if (permissionResult.granted === false) {
          alert("Permission to access camera roll is required!");
          return;
        }
        
        let pickerResult = await ImagePicker.launchImageLibraryAsync({mediaTypes:ImagePicker.MediaTypeOptions.Images});
        setProfilePic(pickerResult.uri)
        setUser({...user, profilePic:pickerResult.uri}) 
  }   

  const keys = ["apple", "banana", "mango", "cheery", "gobhi", "lemon", "chocolate", "vanilla", "juice", "bruce", "viagra", "vigoss"]
    const [namer, setNamer] = useState(); 
     async function getId(){
      const result = await AsyncStorage.getItem('_id')
      return result; 
   }
   let key;  
   
    
    // useEffect(() => {
    //     const result = getId(); 
    //     key = result; 
    //     return () => {
           
    //     }
    // }, [photos,namer])
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
        const pattern = /file/i; 
        const resulter = val.match(pattern); 
        if(resulter !== null){
       const response = await fetch(val); 
        const blob = await response.blob(); 
        console.log("blob is"); 
        console.log(blob); 
        const namer = Math.random().toString(36).substring(2);
        const ref = firebase.storage().ref().child("images/"+ namer); 
        await ref.put(blob,{cacheControl:'max-age=31536000', contentType:'image/jpeg'}); 
        const result1 = await ref.getDownloadURL(); 
        return result1; 
        }
        return val;       
      })
      Promise.all(result).then(finaler => {
         
         updateUser(userId, {photos:finaler})
      }) 
    
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

 const profileTemplate = user.profilePic ? 
 <TouchableOpacity onPress = {() => loadProfilePic()} style = {{justifyContent:"center", alignItems:"center"}}>
   <View>
   <Image source = {{uri:user.profilePic}} style = {{height:160, width:160, borderRadius:80}}/>
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



  
 
console.log(photos)



const row1 = <View style = {{ flexDirection:"row",  marginBottom:15, justifyContent:'space-between',marginRight:30}}>
    {[template[0], template[1], template[2]]}
    </View>
const row2 = <View style = {{flexDirection:"row",marginBottom:15, justifyContent:'space-between', marginRight:30}}>
{[template[3], template[4], template[5]]

}
</View>    

return(
<View style = {{flex:1,paddingLeft:30, paddingRight:30, paddingTop:insets.top,backgroundColor:'white'}}>
<View style = {{flex:0.2}}> 

<TouchableOpacity onPress = {() => {updateProfilePicToServer(),uploadPhotosToServer(),  navigation.goBack()}} style = {{alignItems:'flex-end', marginTop:10}}>
   <Text style = {{color:"orange", fontSize:15, fontWeight:"bold"}}>Done</Text>
   </TouchableOpacity>
   
</View>
<View style = {{flex:0.7}}>

{profileTemplate}
<Text style = {{alignSelf:"center", fontStyle:'italic', fontWeight:"bold", marginTop:30}}>Add Multiple Photos to increase your chances </Text>
<View style = {{borderBottomWidth:2, marginTop:30}}>

</View>
{/* <View style = {{  flexWrap:'wrap',  marginTop:30}}>


{
    [row1,
    row2]
    
}

</View> */}
<DragSortableView
    onDataChange = {(data) => setPhotos(data)}
    dataSource={photos}
    parentWidth={400}
    marginChildrenLeft = {10}
    marginChildrenTop = {10}
    childrenWidth= {75}
    childrenHeight={80}
    keyExtractor={(item,index)=> index.toString()}
    renderItem={(item,index)=>{
        return item ? <View key = {index.toString()} style = {{flexDirection:"row"}}>
       
        <Image source = {{uri:item,cache:'force-cache'}} style = {{height:75, width:75,}} key = {index.toString()} resizeMode = {'cover'}  />
         
        <TouchableOpacity 
        style = {{position:'absolute', top:60, right:0 }}
        onPress = {() => _deletePhoto(item)}
        >
        <Entypo name="circle-with-cross" size={24} color="red" />
        </TouchableOpacity>   
        </View>:
        <TouchableOpacity onPress = {openImagePickerAsync}>
        <Image 
        resizeMethod = {'auto'}
        resizeMode = {'contain'}
        source = {require('../../assets/addedPhoto.png')} style = {{height:75, width:75}}/>
        </TouchableOpacity>
        
    }}
/>
<View style = {{borderBottomWidth:2, marginTop:30}}>

</View>
</View>

<View style = {{flex:0.1}}>

</View>

</View>
)
}
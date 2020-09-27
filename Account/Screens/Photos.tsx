import  React, {useState,useRef,useEffect} from 'react';
import { View, StyleSheet, Text, TextInput,TouchableOpacity,ScrollView,Image, Button,FlatList,Picker,PanResponder,Animated, TouchableWithoutFeedback, SafeAreaView, AsyncStorage} from 'react-native';
import { useMutation,useQuery } from '@apollo/react-hooks';
import { FontAwesome } from '@expo/vector-icons';
import { Entypo, AntDesign } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { uploadImage } from '../../networking'; 


import gql from 'graphql-tag';




// deletePhoto(photo: String!): Boolean!
const DELETE_PHOTO = gql`
 mutation namer($photo:String!){
    deletePhoto(photo:photo)
 }
`
//getPhotos: [String!]!
const GET_PHOTOS = gql`
 query {
    getPhotos
 }
`
export default function Photos({navigation, route }){
    const [camera,setCamera] = useState(); 
    const {page} = route.params; 
    const [photoExample, setExample] = useState(); 
    const [profilePic,setProfilePic] = useState(); 
    const [deletePhoto] = useMutation(DELETE_PHOTO); 
    // const {data, loading, error,} = useQuery(GET_PHOTOS); 
    const letter = [null,null,null,null,null,null,null,null,null,null,null,null];
    const [photos, setPhotos] = useState([
      null, 
      null, 
      null, 
      null, 
      null, 
      null,     
    ])
    // if(data){
    //     data.getPhotos.map((val) => {
    //         photos.pop(); 
    //         photos.unshift(val); 
    //     })

    // } 

  let joker = [
    null, 
    null, 
    null, 
    null, 
    null, 
    null,     
    null, 
    null, 
    null, 
    null, 
    null, 
    null,
  ]
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
    }, [photos,namer])
    const setPhotosFunc = (uri) => {
         const arr = photos.concat(); 
         const imageLength = arr.filter(val => val != null); 
         if(imageLength.length < 1 && !profilePic){
            setProfilePic(uri); 
         }
         
         arr[imageLength.length] = uri; 
         setPhotos([ ...arr, ]);
         uploadImage(uri, 'responder');
    }     
    let openImagePickerAsync = async () => {
        let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();
    
        if (permissionResult.granted === false) {
          alert("Permission to access camera roll is required!");
          return;
        }
    
        let pickerResult = await ImagePicker.launchImageLibraryAsync();
        
        setPhotosFunc(pickerResult.uri)
         
        
        
      }
      const _deletePhoto = (uri:any) => {
        const arr = photos.concat(); 
        const index = arr.indexOf(uri); 
        arr.splice(index,1,)
        arr.push(null); 
        setPhotos(arr); 
        //deletePhoto({variables:{photo:uri}}); 
          
      }
 const profileTemplate = profilePic ? 
 <TouchableOpacity onPress = {() => setCamera(true)} style = {{justifyContent:"center", alignItems:"center"}}><Image source = {{uri:profilePic}} style = {{height:80, width:80, borderRadius:40}}></Image></TouchableOpacity>:<TouchableOpacity 
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
       
       <Image source = {{uri:ages}} style = {{height:60, width:60, marginRight:10, }} key = {index.toString()}/>
       {camera ? <TouchableOpacity 
       style = {{alignItems:"flex-end", justifyContent:"flex-end", marginLeft:-20}}
       onPress = {() => {setCamera(false), setProfilePic(ages)}}
       >
       <AntDesign name="pluscircle" size={24} color="black" />
       </TouchableOpacity>:<TouchableOpacity 
       style = {{alignItems:"flex-end", justifyContent:"flex-end", marginLeft:-20}}
       onPress = {() => _deletePhoto(ages)}
       >
       <Entypo name="circle-with-cross" size={24} color="red" />
       </TouchableOpacity>   }
       </View>
   } 
   

return <View style = {{marginRight:10}} key = {keys[index]}>
<FontAwesome name="photo" size={57} color="black" />
</View>

})  

const marker = <TouchableOpacity style = {{marginRight:15}} onPress = {() => openImagePickerAsync()}> 
<AntDesign name="pluscircle" size={40} color="red" />

</TouchableOpacity>
const image = photos.filter(val => val != null); 
template[image.length] = marker; 


const row1 = <View style = {{ flexDirection:"row", flexWrap:'no-wrap', marginBottom:15, alignItems: 'center',}}>
    {[template[0], template[1], template[2]]}
    </View>
const row2 = <View style = {{flexDirection:"row", flexWrap:'wrap', marginBottom:15}}>
{[template[3], template[4], template[5]]

}
</View>    
const row3 = <View style = {{flexDirection:"row", flexWrap:'wrap'}}>
{[template[8], template[9], template[10], template[10]]

}
</View>
    
return(
<View style = {{flex:1,marginLeft:30, marginRight:30}}>
<View style = {{flex:0.2}}> 
<View style = {{flexDirection:"row", justifyContent:"space-between",marginTop:60, alignItems:"center", }}>
   <Text>
   </Text> 
   <Text style = {{fontWeight:"bold",fontSize:18}}>
       Photos
   </Text>
   <TouchableOpacity onPress = {() => navigation.navigate(page)}>
   <Text style = {{color:"orange", fontSize:15, fontWeight:"bold"}}>Done</Text>
   </TouchableOpacity>
</View>
</View>
<View style = {{flex:0.6}}>

{profileTemplate}
<Text style = {{alignSelf:"center", fontStyle:'italic', fontWeight:"600", marginTop:30}}>Add Multiple Photos to increase your chances </Text>
<View style = {{borderBottomWidth:2, marginTop:30}}>

</View>
<View style = {{flexDirection:"row", justifyContent:"space-around", flexWrap:'wrap', alignItems:"center", marginTop:30}}>


{
    [row1,
    row2]
    
}
</View>
<View style = {{borderBottomWidth:2, marginTop:30}}>

</View>
</View>

<View style = {{flex:0.2}}>

</View>

</View>
)
}
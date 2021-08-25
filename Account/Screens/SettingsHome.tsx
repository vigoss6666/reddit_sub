import  React, {useState,useRef,useEffect, useContext} from 'react';
import { View, StyleSheet, Text, TextInput,TouchableOpacity,ScrollView,Image, Button,FlatList,Picker,PanResponder,Animated, TouchableWithoutFeedback, SafeAreaView,Navigator} from 'react-native';
import { useMutation,useQuery } from '@apollo/react-hooks';
import {HeaderBar} from '../../src/common/Common'; 
import { Feather } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';
import {firebase} from '../../config';
import AppContext from '../../AppContext'; 

import {updateUser} from '../../networking';
import { AntDesign } from '@expo/vector-icons';



export default function SettingsHome({navigation}){
    const myContext = useContext(AppContext); 
    const {user, userId,setInitialRouteName,computeName} = myContext; 
    console.log("user id is"+userId)
    
      
    const [firstName, setFirstname] = useState(); 
    const [age, setAge] = useState(); 
    const [state, setState] = useState(); 
    const [subLocality, setSubLocality] = useState(); 
    
    const db = firebase.firestore();
    
    




const _firebaseCaller = () => { 
     const lamer = firebase.functions().httpsCallable('batman');
     lamer();  
}
console.log("userId is",userId)
return(
<View style = {{flex:1,  backgroundColor:'white' }}>
<View style = {{flex:0.1}}>

</View>
<View style = {{flex:0.7}}>
<View style = {{alignItems:"center", marginBottom:100}}>
<TouchableOpacity style = {{alignItems:"center"}} onPress = {() => navigation.navigate('SelfView')}>
{user.profilePic ? <Image source = {{uri:user.profilePic}} style = {{height:160, width:160, borderRadius:80}}/>:<MaterialIcons name="account-circle" size={200} color="black" />}
</TouchableOpacity>

<Text style = {{fontWeight:"bold", fontSize:25, marginTop:10}}>
{user.firstName} {user.lastName}
</Text>

<Text style = {{fontWeight:"bold", fontSize:15, marginTop:5}}>
    {user.age} years old
</Text>
<Text style = {{fontWeight:"bold", fontSize:15, marginTop:5}}>
    {user.subLocality}{user.subLocality ? ',':null}{user.state}
</Text>
</View>
<View style = {{flexDirection:"row",justifyContent:"space-around"}}>
<TouchableOpacity style = {{justifyContent:"center", alignItems:"center"}} 
onPress = {() => navigation.navigate('AccountSettings')}
>
<MaterialIcons name="settings" size={50} color="grey" />
<Text style = {{fontSize:20, color:"grey", marginTop:5, fontWeight:"600"}}>SETTINGS</Text> 
</TouchableOpacity>
<TouchableOpacity style = {{justifyContent:"center", alignItems:"center"}}
onPress = {() => navigation.navigate('DetailsSettings')}
>
<Entypo name="edit" size={40} color="grey" />
<Text style = {{fontSize:20, color:"grey",marginTop:5,fontWeight:"600"}}>EDIT INFO</Text> 

</TouchableOpacity>
</View>
<TouchableOpacity style = {{justifyContent:"center", alignItems:"center", marginTop:30}}
onPress = {() => navigation.navigate('PhotosLatest', {page:"SettingsHome"})}
>
<View style = {{flexDirection:"row"}}>
<Entypo name="camera" size={50} color="orange" />
<View style = {{alignSelf:"flex-end", marginLeft:-10}}>
<AntDesign name="pluscircle" size={20} color="grey" />
</View>
</View>
<Text style = {{fontSize:20, color:"grey",marginTop:5,fontWeight:"600"}}> PHOTOS</Text> 
</TouchableOpacity>
</View>
<View style = {{flex:0.2,}}>

</View>
</View>
)
}
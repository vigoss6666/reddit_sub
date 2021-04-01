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
    useEffect(() => {
         navigation.setOptions({
             headerLeft:() => <TouchableOpacity onPress = {() => navigation.navigate('Homer')}>
                 <Text style = {{fontWeight:'bold', color:'blue', marginLeft:10, }}> Back </Text>
             </TouchableOpacity>
         })
    })
    const myContext = useContext(AppContext); 
    const {user, userId,} = myContext;   
    const [firstName, setFirstname] = useState(); 
    const [age, setAge] = useState(); 
    const [state, setState] = useState(); 
    const [subLocality, setSubLocality] = useState(); 
    
    const db = firebase.firestore();
    var docRef = db.collection("user").doc('trialUser');
    useEffect(() => {
        const currentUser = firebase.auth().currentUser; 
         
        
         
    
        var docRef = db.collection("user").doc('trialUser');
        docRef.onSnapshot((doc) => {
            console.log(doc.data())
            let timestamp = doc.data().timeStamp;
            const d = new Date(timestamp);
            var ageDifMs = Date.now() - d.getTime();
            var ageDate = new Date(ageDifMs);
            const finalAge = Math.abs(ageDate.getUTCFullYear() - 1970); 
            setAge(finalAge);
            setSubLocality(doc.data().subLocality)
            setState(doc.data().state); 
             
        },)


        
        
 },[state, subLocality])
 const computeName = (obj) => {
    if(obj.name){
       return obj.name
    }
    if(obj.firstName && obj.lastName){
       return obj.firstName+""+obj.lastName
    }
    return obj.firstName
}

useEffect(() => {
 docRef.get().then(function(doc) {
    if (doc.exists) {
        //console.log("Document data:", doc.data());
        
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
}).catch(function(error) {
    console.log("Error getting document:", error);
});    
}, [state, subLocality])

const _firebaseCaller = () => { 
     const lamer = firebase.functions().httpsCallable('batman');
     lamer().then(result => console.log(result));  
}

return(
<View style = {{flex:1, marginLeft:30, marginRight:30 }}>
<View style = {{flex:0.1}}>

</View>
<View style = {{flex:0.7}}>
<View style = {{alignItems:"center", marginBottom:100}}>
<TouchableOpacity style = {{alignItems:"center"}} onPress = {() => _firebaseCaller()}>
{user.profilePic ? <Image source = {{uri:user.profilePic}} style = {{height:160, width:160, borderRadius:80}}/>:<MaterialIcons name="account-circle" size={200} color="black" />}
</TouchableOpacity>
<Text style = {{fontWeight:"bold", fontSize:25, marginTop:10}}>
{computeName(user)}
</Text>
<Text style = {{fontWeight:"bold", fontSize:15, marginTop:5}}>
    {user.age} years old
</Text>
<Text style = {{fontWeight:"bold", fontSize:15, marginTop:5}}>
    {user.subLocality},{user.state}
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
onPress = {() => navigation.navigate('AddPhotos', {page:"SettingsHome"})}
>
<View style = {{flexDirection:"row"}}>
<Entypo name="camera" size={50} color="orange" />
<View style = {{alignSelf:"flex-end", marginLeft:-10}}>
<AntDesign name="pluscircle" size={20} color="grey" />
</View>
</View>
<Text style = {{fontSize:20, color:"grey",marginTop:5,fontWeight:"600"}}>ADD PHOTOS</Text> 
</TouchableOpacity>
</View>
<View style = {{flex:0.2,}}>

</View>
</View>
)
}
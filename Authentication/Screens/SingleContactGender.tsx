import  React, {useState,useRef,useEffect, useContext} from 'react';
import { View, StyleSheet,  TextInput,TouchableOpacity,ScrollView,Image, FlatList,Picker,PanResponder,Animated, TouchableWithoutFeedback, SafeAreaView} from 'react-native';
import { useMutation,useQuery } from '@apollo/react-hooks';
import {Text, Avatar, Icon} from 'react-native-elements'; 
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { gql } from 'apollo-boost';
import {Button} from 'react-native-elements'; 
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import {firebase} from '../../config'; 
import AppContext from '../../AppContext'; 
import {updateUser} from '../../networking';
const db = firebase.firestore();    
import { MaterialIcons } from '@expo/vector-icons'; 
// @refresh reset

export default function SingleContactGender({navigation,route}){
const myContext = useContext(AppContext); 
const {user, userId, singleContact, CustomBackComponent} = myContext;   
const data1 = [{fullname:"Zaid shaikh", identification:'something',gender:'male', _id:1},{fullname:"ALi reza", identification:'something', _id:2},{fullname:"Huraira", identification:'something', _id:3},{fullname:"Samadh Khan",identification:'something', _id:4},{fullname:"Nihal Modal",identification:'somehting',_id:5},{fullname:"Rafiq modal", identification:'something', _id:6},{fullname:"Baiju Noyan", identification:'something', _id:7},{fullname:"Bilkis baji",identification:'something', _id:8},{fullname:"Bismil",identification:'something', gender:'female', _id:9}]
const [fetchData,setFetchdata] = useState([]); 
const [arr,addArr] = useState([]); 
const [namer, setNamer] = useState(0); 
const [gate, checkGate] = useState(true); 
const [gender,addGender] = useState([]); 
const [profiles, setProfiles] = useState([]);  
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
   
}, [])
console.log(profiles)
const updateToServer = () => {
    const db = firebase.firestore(); 
    let batch = db.batch(); 
    db.collection('user')
    profiles.map(val => {
      const ref = db.collection('user').doc(val.phoneNumber); 
      batch.set(ref, {gender:val.gender}, {merge:true});   
    })
    batch.commit().then(() => console.log('DOcument updated successfully')); 
}

const addMale = (obj => {
   
const data = profiles.concat(); 
const result = data.filter(val => {
    return val.phoneNumber == obj.phoneNumber 
})
result[0].gender = "male"; 
setProfiles(data); 
})
const addFemale = (obj => {
  const data = profiles.concat(); 
   
   
const result = data.filter(val => {
    return val.phoneNumber == obj.phoneNumber 
})
result[0].gender = "female"; 
setProfiles(data); 
})

useEffect(() => {
   profiles.map(val => {
       if(val.gender == undefined){
          checkGate(true); 
          return; 
      }
      checkGate(false); 
      
  })    
}, [profiles])



const _sendToServer = () => {
 const finaler = profiles.map(val => {
    return {_id:val.phoneNumber, gender:val.gender}
 }) 
 console.log({data:finaler})
 updateContactsGender({variables:{userInputList:{data:finaler}}});   
}
const computeName = (obj) => {
   if(obj.name){
      return obj.name
   }
   if(obj.firstName && obj.lastName){
      return obj.firstName+obj.lastName
   }
   return obj.firstName
}

   var radio_props = [
      {label: 'param1', value: 0 },
      {label: 'param2', value: 1 }
    ];
   
  return(
    <View style = {{flex:1, }}>
    <View style = {{flex:0.1, }}>
    
    </View>
    <View style = {{flex:0.1}}>
    <Text h4 style = {{alignSelf:'center', fontWeight:"600"}}>Tell us about your friends</Text>
    <Text h5 style = {{alignSelf:'center', fontWeight:"600"}}>Confirm the sex and age of each friend</Text>
   
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
                      <View style = {{alignItems:'center', justifyContent:'space-between', marginRight:10, flexDirection:'row',flex:0.2}}>
                         <TouchableOpacity onPress = {() => {addMale(val)}} style = {{}}> 
                         <FontAwesome name="male" size={34} color={val.gender == 'male' ? 'green':'black' || val.gender} />
                         </TouchableOpacity>
                         <TouchableOpacity onPress = {() => {addFemale(val)}}>
                         <FontAwesome5 name="female" size={34} color={val.gender == 'female' ? 'green':'black'} />
                         </TouchableOpacity>
    
                      </View>
                  </View>
                )
              })}
            </ScrollView> 
    </View>
    <View style = {{flex:0.2, justifyContent:'center',marginTop:10 }}>
    <Button title = "save" containerStyle = {{marginLeft:30, marginRight:30,}} buttonStyle = {{backgroundColor:'black'}} onPress = {() => { updateToServer(), navigation.navigate('SingleContactAge')}} disabled = {gate}></Button>   

    </View>
    </View>
    ) 
}
import  React, {useState,useRef,useEffect} from 'react';
import { View, StyleSheet,  TextInput,TouchableOpacity,ScrollView,Image, FlatList,Picker,PanResponder,Animated, TouchableWithoutFeedback, SafeAreaView} from 'react-native';
import { useMutation,useQuery } from '@apollo/react-hooks';
import {Text, Avatar, Icon} from 'react-native-elements'; 
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { gql } from 'apollo-boost';
import {Button} from 'react-native-elements'; 
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';


// getDatingPool: Boolean!
//updateContactGender(userInputList: userInputList1!)

const UPDATE_CONTACT_GENDER = gql`
mutation namer($userInputList:userInputList1!){
   updateContactGender(userInputList:$userInputList){
      data {
         minAge
         maxAge 
         _id
         name 
         firstname
      }
   }
}


`





export default function ContactsSex({navigation,route}){
const data1 = [{fullname:"Zaid shaikh", identification:'something',gender:'male', _id:1},{fullname:"ALi reza", identification:'something', _id:2},{fullname:"Huraira", identification:'something', _id:3},{fullname:"Samadh Khan",identification:'something', _id:4},{fullname:"Nihal Modal",identification:'somehting',_id:5},{fullname:"Rafiq modal", identification:'something', _id:6},{fullname:"Baiju Noyan", identification:'something', _id:7},{fullname:"Bilkis baji",identification:'something', _id:8},{fullname:"Bismil",identification:'something', gender:'female', _id:9}]
const [updateContactsGender,{data}] = useMutation(UPDATE_CONTACT_GENDER); 
const [fetchData,setFetchdata] = useState([]); 
const [arr,addArr] = useState([]); 
const [namer, setNamer] = useState(0); 
const [gender,addGender] = useState([]); 
const {profiles} = route.params; 
useEffect(() => {
  
}, [namer])

if(data){
   console.log(data); 
   navigation.navigate('ContactsAge', {profiles:data.updateContactGender.data}); 
}

const addMale = (obj => {
const data = profiles.concat(); 
   
   
const result = data.filter(val => {
    return val._id == obj._id 
})

result[0].gender = "male"; 
data.splice(0,1,result[0]); 
setNamer(namer + 1);
console.log(profiles) 
})
const addFemale = (obj => {
  const data = profiles.concat(); 
   
   
const result = data.filter(val => {
    return val._id == obj._id 
})

result[0].gender = "female"; 
data.splice(0,1,result[0]); 
setNamer(namer + 1);  
})

const _sendToServer = () => {
 const finaler = profiles.map(val => {
    return {_id:val._id, gender:val.gender}
 }) 
 console.log({data:finaler})
 updateContactsGender({variables:{userInputList:{data:finaler}}});   
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
                      <Avatar rounded icon = {{name:'account-circle', color:'black'}} activeOpacity = {0.8} size = {"medium"} />  
                      <Text>{val.fullname || val.firstname}</Text>
                      </View>
                      <View style = {{alignItems:'center', justifyContent:'space-between', marginRight:10, flexDirection:'row',flex:0.2}}>
                         <TouchableOpacity onPress = {() => {addMale(val)}} style = {{}} > 
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
    <View style = {{flex:0.2, justifyContent:'center', }}>
    <Button title = "save" containerStyle = {{marginLeft:30, marginRight:30,}} buttonStyle = {{backgroundColor:'black'}} onPress = {() => { _sendToServer()}}></Button>   
    </View>
    </View>
    ) 
}
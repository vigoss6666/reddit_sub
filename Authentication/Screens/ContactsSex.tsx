import  React, {useState,useRef,useEffect} from 'react';
import { View, StyleSheet,  TextInput,TouchableOpacity,ScrollView,Image, FlatList,Picker,PanResponder,Animated, TouchableWithoutFeedback, SafeAreaView} from 'react-native';
import { useMutation,useQuery } from '@apollo/react-hooks';
import {Text, Avatar, Icon} from 'react-native-elements'; 
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { gql } from 'apollo-boost';
import {Button} from 'react-native-elements'; 

// getDatingPool: Boolean!

const GET_DATING_POOL = gql`
query {
   getDatingPool {
      data {
        firstname
        name
        _id
      }
      
      
   }
}

`; 




export default function ContactsSex({navigation}){
const data1 = [{fullname:"Zaid shaikh", identification:'something',gender:'male'},{fullname:"ALi reza", identification:'something'},{fullname:"Huraira", identification:'something'},{fullname:"Samadh Khan",identification:'something'},{fullname:"Nihal Modal",identification:'somehting'},{fullname:"Rafiq modal", identification:'something'},{fullname:"Baiju Noyan", identification:'something'},{fullname:"Bilkis baji",identification:'something'},{fullname:"Bismil",identification:'something', gender:'female'}]
const [arr,addArr] = useState([]); 
const [gender,addGender] = useState([]); 
const addMale = async (index) => {
 addGender([...gender, {index,gender:'male' }])
}

const checkBackground = (index) => {
   if(gender[index].gender == undefined){
      return false; 
   }  
   if(gender[index].gender == 'male'){
      console.log(true); 
      return; 
   }
   return console.log(false); 
   
}

 


const addFemale = () => {
  
}
console.log(gender)
const {data, loading, error} = useQuery(GET_DATING_POOL); 
if(data){
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
              {data.getDatingPool.data.map((val,index) => {
                return (
                  <View key={index} 
                  style = {{borderWidth:1, height:50,flexDirection:"row",  justifyContent:'space-between', marginLeft:20, marginRight:20, borderLeftWidth:0, borderRightWidth:0,}}
                  onPress = {() => { addArray(index)  }}
                  >
                      <View style = {{flexDirection:'row', alignItems:'center', flex:0.9}}>
                      <Avatar rounded icon = {{name:'account-circle', color:'black'}} activeOpacity = {0.8} size = {"medium"} />  
                      <Text>{val.name || val.firstname}</Text>
                      </View>
                      <View style = {{alignItems:'center', justifyContent:'space-between', marginRight:10, flexDirection:'row',flex:0.2}}>
                         <TouchableOpacity onPress = {() => {addMale(index), checkBackground(index)}} style = {{}} > 
                         <FontAwesome name="male" size={34} color={val.gender == 'male' ? 'green':'black' || val.gender} />
                         </TouchableOpacity>
                         <TouchableOpacity onPress = {() => {}}>
                         <FontAwesome5 name="female" size={34} color={val.gender == 'female' ? 'green':'black'} />
                         </TouchableOpacity>
    
                      </View>
                  </View>
                )
              })}
            </ScrollView> 
    </View>
    <View style = {{flex:0.2}}>
    <Button title = "save" containerStyle = {{marginLeft:30, marginRight:30,}} buttonStyle = {{backgroundColor:'black'}} onPress = {() => {navigation.navigate('ContactsAge')}}></Button>   
    </View>
    </View>
    ) 
}
if(loading){
   return (
     <View style = {{flex:1,justifyContent:'center', alignItems:'center'}}>
       <Text>Loading</Text>
     </View>
   )
}


}
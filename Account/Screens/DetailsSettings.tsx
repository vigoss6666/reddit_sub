import  React, {useState,useRef,useEffect,useContext} from 'react';
import { View, StyleSheet, Text, TextInput,TouchableOpacity,ScrollView,Image, Button,FlatList,Picker,PanResponder,Animated, TouchableWithoutFeedback, SafeAreaView} from 'react-native';
import { useMutation,useQuery } from '@apollo/react-hooks';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import { gql } from 'apollo-boost';
import { firebase } from '../../config'; 
import AppContext from '../../AppContext';
import {format} from 'date-fns'; 

//getSettingsMutation: AccountSettingsMutation!
export const GET_DETAILS = gql`
 query {
    getSettingsMutation{
       inches 
       feet
       gender
       job
       hometown

    }
 }
`




export default function DetailsSettings({navigation}){
//const {data, loading, error} = useQuery(GET_DETAILS);    
const [data, setData] = useState(1); 
const [serverData, setServerData] = useState({}); 
const [month, setMonth] = useState(); 
const db = firebase.firestore(); 
const myContext = useContext(AppContext); 
const {user, userId,setInitialRouteName} = myContext; 

console.log("In details Settings"); 
console.log(user.hometown)


useEffect(() => {
const d = format(new Date(user.timeStamp), 'MMM'); 
setMonth(d); 
},[user.timeStamp])



   return(
      <View style = {{flex:1, marginLeft:30, marginRight:30}}>
      <View style = {{flex:0.2, marginTop:20}}>
      <View style = {{flexDirection:"row", justifyContent:"space-between", alignItems:"center", marginTop:60}}>
      <Text>
      
      </Text>
      <Text style = {{fontSize:20, fontWeight:"600",marginLeft:40}}>
      Details
      </Text>
      <TouchableOpacity onPress = {() => {navigation.goBack()}}>
      <Text style = {{color:"orange", fontWeight:"600", fontSize:17}}>
          Done
      </Text>
      </TouchableOpacity>
      
      </View>
      </View>
      <View style = {{flex:0.6}}>
      <Text style = {{fontWeight:"600", fontSize:20, color:"grey"}}>
          YOUR INFO 
      </Text>
      <View style = {{borderBottomWidth:2, borderBottomColor:"grey", marginTop:10}}>
      
      </View>
      <View style = {{flexDirection:"row", marginTop:30, justifyContent:"space-between", alignItems:"center"}}>
      <Text style = {{fontWeight:"600"}}>
          SEX
      </Text>
      {user.gender == "male" ? <FontAwesome name="male" size={30} color="black" />:user.gender == 'female' ? <FontAwesome name="female" size={30} color="black" />: user.gender !== 'male' || user.gender !== 'female' ? <FontAwesome5 name="transgender" size={24} color="black" />:null}
      
      
      <TouchableOpacity onPress= {() => navigation.navigate('Gender', {page:"DetailsSettings"})}>
      <Text style = {{color:"orange", fontSize:15, fontWeight:"bold"}}>Edit</Text> 
      </TouchableOpacity>
      
      </View>
      <View style={{
          borderStyle: 'dotted',
          borderWidth: 1,
          borderRadius: 10,
          borderColor:'grey',
          marginBottom:15,
          marginTop: 10,
       }}/>
       <View style = {{flexDirection:"row", justifyContent:"space-between",marginTop:20, alignItems:"center"}}>
         <Text style = {{fontWeight:"600"}}>
            BIRTHDAY 
         </Text> 
         
         <Text style = {{fontWeight:"bold",fontSize:15}}>
          {month} {user.day},{user.year}  
         </Text>
         <TouchableOpacity onPress = {() => navigation.navigate('Birthday', {page:"DetailsSettings"})}>
         <Text style = {{color:"orange", fontSize:15, fontWeight:"bold"}}>Edit</Text>
          </TouchableOpacity>
          </View>
          <View style={{
          borderStyle: 'dotted',
          borderWidth: 1,
          borderRadius: 10,
          borderColor:'grey',
          marginBottom:15,
          marginTop: 10,
       }}/>
          <View style = {{flexDirection:"row", justifyContent:"space-between",marginTop:20, alignItems:"center"}}>
         <Text style = {{fontWeight:"600"}}>
            HEIGHT
         </Text> 
         
         {user.measureSystem == 'Imperial' ? <Text style = {{fontWeight:"bold",fontSize:15}}>
           {user.feet}' {user.inches ? user.inches:null} 
         </Text> : <Text style = {{fontWeight:"bold",fontSize:15}}>
           {user.cms} cm
         </Text>}
         <TouchableOpacity onPress = {() => navigation.navigate('Height', {page:"DetailsSettings"})}>
         <Text style = {{color:"orange", fontSize:15, fontWeight:"bold"}}>Edit</Text>
            </TouchableOpacity>
      
      </View>
      <View style={{
          borderStyle: 'dotted',
          borderWidth: 1,
          borderRadius: 10,
          borderColor:'grey',
          marginBottom:15,
          marginTop: 10,
       }}/>
      <View style = {{flexDirection:"row", justifyContent:"space-between",marginTop:20, alignItems:"center"}}>
         <Text style = {{fontWeight:"600"}}>
            HOME TOWN
         </Text> 
         
         <Text style = {{fontWeight:"bold",fontSize:15,maxWidth:150,}} numberOfLines = {3}>
         {user.hometown}
         </Text>
         <TouchableOpacity onPress = {() => navigation.navigate('Hometown',{page:"DetailsSettings"})}>
         <Text style = {{color:"orange", fontSize:15, fontWeight:"bold"}}>Edit</Text>
            </TouchableOpacity>
      </View>
      <View style={{
          borderStyle: 'dotted',
          borderWidth: 1,
          borderRadius: 10,
          borderColor:'grey',
          marginBottom:15,
          marginTop: 10,
       }}/>
      <View style = {{flexDirection:"row", justifyContent:"space-between",marginTop:20, alignItems:"center"}}>
         <Text style = {{fontWeight:"600"}}>
            JOB
         </Text> 
          
         <Text style = {{fontWeight:"bold",fontSize:15,maxWidth:150,}} numberOfLines = {3}>
           {user.job} 
         </Text>
         <TouchableOpacity onPress = {() => navigation.navigate('Job', {page:"DetailsSettings"})}>
         <Text style = {{color:"orange", fontSize:15, fontWeight:"bold"}}>Edit</Text>
            </TouchableOpacity>
      </View>
      <View style={{
          borderStyle: 'dotted',
          borderWidth: 1,
          borderRadius: 10,
          borderColor:'grey',
          marginBottom:15,
          marginTop: 10,
       }}/>
      <View style = {{flexDirection:"row", justifyContent:"space-between",marginTop:20, alignItems:"center"}}>
         <Text style = {{fontWeight:"600"}}>
            School
         </Text> 
          
         <Text style = {{fontWeight:"bold",fontSize:15,maxWidth:150,}} numberOfLines = {3}>
           {user.school} 
         </Text>
         <TouchableOpacity onPress = {() => navigation.navigate('School', {page:"DetailsSettings"})}>
         <Text style = {{color:"orange", fontSize:15, fontWeight:"bold"}}>Edit</Text>
            </TouchableOpacity>
      </View>
      <View style = {{borderBottomWidth:2, borderBottomColor:"grey", marginTop:20}}>
      
      </View>
      
       
      
      </View>
      <View style = {{flex:0.2}}>
      
      </View>
      
      </View>
      )
   



}
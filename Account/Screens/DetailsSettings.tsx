import  React, {useState,useRef,useEffect} from 'react';
import { View, StyleSheet, Text, TextInput,TouchableOpacity,ScrollView,Image, Button,FlatList,Picker,PanResponder,Animated, TouchableWithoutFeedback, SafeAreaView} from 'react-native';
import { useMutation,useQuery } from '@apollo/react-hooks';
import { FontAwesome } from '@expo/vector-icons';
import { gql } from 'apollo-boost';

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
const {data, loading, error} = useQuery(GET_DETAILS);    
if(data){
   return(
      <View style = {{flex:1, marginLeft:30, marginRight:30}}>
      <View style = {{flex:0.2, marginTop:20}}>
      <View style = {{flexDirection:"row", justifyContent:"space-between", alignItems:"center", marginTop:60}}>
      <Text>
      
      </Text>
      <Text style = {{fontSize:20, fontWeight:"600"}}>
      Settings
      </Text>
      <TouchableOpacity onPress = {() => navigation.navigate('SettingsHome')}>
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
      {data.getSettingsMutation.gender == "male" ? <FontAwesome name="male" size={30} color="black" />:<FontAwesome name="female" size={30} color="black" />}
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
         
         <Text style = {{fontWeight:"bold",fontSize:12}}>
           SEPTEMBER 31, 1975 
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
         
         <Text style = {{fontWeight:"bold",fontSize:20}}>
           {data.getSettingsMutation.feet}' {data.getSettingsMutation.inches}" 
         </Text>
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
         
         <Text style = {{fontWeight:"bold",fontSize:20}}>
         {data.getSettingsMutation.hometown}
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
          
         <Text style = {{fontWeight:"bold",fontSize:15}}>
           {data.getSettingsMutation.job} 
         </Text>
         <TouchableOpacity onPress = {() => navigation.navigate('Job', {page:"DetailsSettings"})}>
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
if(loading){
   return (
      <View style = {{flex:1, justifyContent:"center", alignItems:"center"}}>
         <Text>Loading</Text>
      </View>
   )
}

}
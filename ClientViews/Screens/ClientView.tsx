import React, { useState, useEffect, useRef } from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { MaterialIcons } from '@expo/vector-icons';
import {Button} from 'react-native-elements'; 
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TraitsTemplate} from '../../src/common/Common'; 


interface ClientViewProps {}


const ClientView = ({navigation, route}) => {
  const {client} = route.params;
  
  const result = TraitsTemplate(client); 
 
  

  const sortedParams = () => {
     
  const picked = (({ charisma, creativity, honest, looks, humor, status, wealthy, empathetic }) => ({ charisma, creativity, honest, looks, humor, status, wealthy,empathetic }))(data);  

  let keysSorted = Object.keys(picked).sort(function(a,b){return picked[b]-picked[a]})

  return keysSorted; 
  }
  
  const computeHeader = () => {
     if(!client.creativity && !client.charisma && !client.looks && !client.honest 
      && !client.status && !client.wealthy && !client.humour
      ){
        return (
          <View style = {{flex:0.3, justifyContent:'center', alignItems:'center', marginTop:30}}>
          <Text style = {[styles.textStyle, {fontWeight:'bold', fontSize:40, fontStyle:'italic'}]}>{computeName(client)}</Text>
          </View>
        ) 
      }
      return (
        <View style = {{flex:0.3, justifyContent:'center', alignItems:'center', marginTop:30}}>
        <Text style = {styles.textStyle}> {client.matchMakers.length} people said  </Text>
        <Text style = {[styles.textStyle, {fontWeight:'bold', fontSize:40, fontStyle:'italic'}]}>{computeName(client)}</Text>

        <Text style = {[styles.textStyle, {fontSize:25, fontStyle:'italic', marginLeft:30, marginRight:30}]}> is INTELLIGENT, GOOD HEARTED and CREATIVE </Text>
         </View>
      )
  }

  console.log(client)
  const insets = useSafeAreaInsets();
  const data = { 
      fullName:"Amy Guion", 
      firstName:"Amy", 
      matchMaker:['jandjsnjfk', 'jhadfjbfjs', 'jfbsbfjds'], 
      creativity:5.5, 
      charisma:7.7, 
      looks:3.3, 
      honest:4.4,
      age:'32', 
      job:'influencer', 
      state:'california', 
      subLocality:'westwood', 
      lattitude:'something', 
      longitude:'something', 
      distance:2, 
      photos:[], 
      appUser:false, 
      profilePhoto:"https://i.pinimg.com/originals/f0/a6/4e/f0a64e32194d341befecc80458707565.jpg", 
    
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

  const matchMaker = [{
       fullName:"David boctor",
       firstName:"David",  
    }];

      

     
   if(data){
    return (
        <View style={{flex:1, paddingTop:insets.top}}>
        <ScrollView>
         {computeHeader()}
          <View style = {{flex:0.7, marginLeft:30, marginRight:30}}>
                <View style = {[styles.line, {marginTop:40}]}/>
                <Text style = {[styles.textStyle, {alignSelf:'center', fontSize:25}]}>TOP TRAITS</Text>
                <View style = {styles.line}></View>
                {result}
                
                <View>
                  
                </View>
                <View style = {[styles.line, {marginTop:30}]}/>
                <Text style = {[styles.textStyle, {alignSelf:'center', fontSize:25}]}>{data.firstName}'s details</Text>
                <View style = {styles.line}></View>
                <View style = {{flexDirection:'row',marginTop:15, alignItems:'center'}}>
                <FontAwesome name="birthday-cake" size={24} color="black" />
                <Text style = {styles.iconNames}>{client.minAge} - {client.maxAge} years old</Text>

                </View>
                
                <View style = {{flexDirection:'row',marginTop:15, alignItems:'center'}}>
                <FontAwesome5 name="house-damage" size={24} color="black" />
                <Text style = {styles.iconNames}>Lives in {client.address}</Text>

                </View>
                
                <View style = {styles.dotted}/>
                <View style = {{flexDirection:'row',marginTop:20, alignItems:'center',marginBottom:10}}>
                <AntDesign name="instagram" size={24} color="black" />
                <Text style = {[styles.iconNames, ] }> Photo </Text>
                </View>
                {client.profilePic ? <Image source = {{uri:client.profilePic}} style = {{height:100, width:100, borderRadius:50}}></Image>:<MaterialIcons name = "account" size = {30}></MaterialIcons>}
                <View style = {[styles.line, {marginTop:40}]}/>
                <Text style = {[styles.textStyle, {alignSelf:'center', fontSize:25}]}>{data.firstName.toUpperCase()}'s MATCHMAKERS</Text>
                <View style = {styles.line}></View>
                <View style = {{flexDirection:'row', justifyContent:'center', marginTop:30}}>
                <MaterialIcons name="account-circle" size={40} color="black" />
                <MaterialIcons name="account-circle" size={40} color="black" />
                <MaterialIcons name="account-circle" size={40} color="black" />
                <MaterialIcons name="account-circle" size={40} color="black" />
                <MaterialIcons name="account-circle" size={40} color="black" />
                </View>
                <Text style = {[styles.textStyle, {alignSelf:'center', fontSize:20, fontStyle:'italic', marginTop:10}]}>David Boctor and {matchMaker.length} others</Text>
                <Button title = {"SHARE THIS PROFILE"} containerStyle = {{marginLeft:30, marginRight:30, marginTop:100, marginBottom:200,}} buttonStyle = {{backgroundColor:'green',}}>

                </Button>


                
                

                
          </View>
          </ScrollView>    
          
        </View>
      );    
   }
   return (
        <View style = {{flex:1, justifyContent:'center', alignItems:'center'}}>
            <Text>Loading</Text>
        </View>
   ) 
  
};


export default ClientView;

const styles = StyleSheet.create({
   
  textStyle:{fontWeight:'500', fontSize:30}, 
  line:{borderBottomWidth:3,}, 
  iconNames:{marginLeft:10, fontSize:17, fontWeight:'500'}, 
  dotted:{borderStyle:'dotted', borderWidth:2, borderRadius:10, marginTop:10 }

});


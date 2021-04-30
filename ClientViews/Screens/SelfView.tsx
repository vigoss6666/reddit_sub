import React, { useState, useEffect, useRef, useContext } from 'react';
import { Text, View, StyleSheet, Image,ScrollView, TouchableOpacity, Share } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import {Button} from 'react-native-elements';
import Moment from 'react-moment';
import {transformCreativity} from '../../networking'; 
import {iconFactory, LoadScreen} from '../../src/common/Common'; 
import { logTen } from './logTen';
import * as Sharing from 'expo-sharing';
//@refresh reset
import * as ImagePicker from 'expo-image-picker';
import AppContext from '../../AppContext'; 
import { formatDistanceToNow } from "date-fns";
import { firebase } from '../../config'; 
import { Octicons } from '@expo/vector-icons';
import {ClientHeader, ClientDetails, ClientPhotos, ClientMatchMakers, ClientTraits, ClientVotes} from '../../src/common/Common'; 
import * as Linking from 'expo-linking';




const db = firebase.firestore(); 

interface SelfViewProps {}







const SelfView = (props: ClientViewProps) => {
    const [selected, setSelected] = useState('traits');
    const myContext = useContext(AppContext);
    const {user, userId} = myContext;  



    const share = async () => {
      
         

        await Share.share({message:"https://friends-365d0.web.app/?name="+userId})
      
    }
    
    
     
     

     



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
     
    const imageTemplate = data.appUser ? data.photos.map(val => {
         return val.photo ? <TouchableOpacity onPress = {() => console.log("hell oworld")}><Image source = {{uri:val.photo}} style = {{height:75, width:75}}/></TouchableOpacity>:<Feather name="image" size={40} color="black" />
    }):data.profilePhoto ? <Image source = {{uri:data.profilePhoto}} style = {{height:75, width:75}}/>:<Feather name="image" size={40} color="black" /> 
  
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
  
    const matchMaker = [{
         fullName:"David boctor",
         firstName:"David",  
      }];
       
     if(data){
      return (
          <View style={styles.container}>
          <ScrollView>
          
           <ClientHeader client = {user} style = {{ flex:0.3}}/>  
           
            <View style = {{flex:0.7, marginLeft:30, marginRight:30}}>
                   <View style = {{flexDirection:'row', justifyContent:'space-evenly', borderWidth:2, marginTop:40}}>

                       <TouchableOpacity style = {{borderRightWidth:1, justifyContent:'center',backgroundColor:selected == 'traits' ? '#75a4f0':'white', flex:1}} onPress = {() => setSelected('traits')}>
                           <Text style = {{alignSelf:'center', fontSize:20,  fontWeight:'bold', marginTop:6, marginBottom:6}}>Traits</Text>

                       </TouchableOpacity> 
                       <TouchableOpacity onPress = {() => setSelected('votes')} style = {{backgroundColor:selected == 'votes' ? '#75a4f0':'white', flex:1}}>
                        <Text style = {{alignSelf:'center', fontSize:20,  fontWeight:'bold', marginTop:6, marginBottom:6}}>Votes</Text>
                       </TouchableOpacity>
                   </View> 
                   {selected == 'traits' ? <ClientTraits client = {user} />:<ClientVotes client = {user}/>}
                   <ClientDetails client = {user} client2 = {{latitiude:32.735487, longitude:-117.149025}}/>
                  <ClientPhotos client = {user}/>
                  <ClientMatchMakers client = {user} />
                  
                 
                 
                 
                  
                  
                  <Button title = {"SHARE THIS PROFILE"} containerStyle = {{marginLeft:30, marginRight:30, marginTop:100, marginBottom:200,}} buttonStyle = {{backgroundColor:'green',}} onPress = {share}>
  
                  </Button>
  
  
                  
                  
  
                  
            </View>
            </ScrollView>    
            
          </View>
        );    
     }
     return (
          <LoadScreen />
     ) 
    
  };

export default SelfView;

const styles = StyleSheet.create({
    container: {flex:1}, 
    textStyle:{fontWeight:'500', fontSize:30}, 
    line:{borderBottomWidth:3,}, 
    iconNames:{marginLeft:10, fontSize:17, fontWeight:'500'}, 
    dotted:{borderStyle:'dotted', borderWidth:2, borderRadius:10, marginTop:10 }
  });

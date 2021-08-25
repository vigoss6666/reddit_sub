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
import ViewShot from "react-native-view-shot";
import { FlatList } from 'react-native-gesture-handler';





const db = firebase.firestore(); 

interface SelfViewProps {}







const SelfView = ({navigation}) => {
    const [selected, setSelected] = useState('traits');
    const myContext = useContext(AppContext);
    const {user, userId, CustomBackComponent} = myContext;  
    const [captured, setCaptured] = useState(); 

    useEffect(() => {
      navigation.setOptions({
        headerTitle:false, 
        headerLeft:() => <CustomBackComponent navigation = {navigation}/>

      })
    }, [])

    const renderItem = () => {
      return <View style = {{marginLeft:30, marginRight:30}}>
             
           
        
      
      
      
        
      <ViewShot captureMode = "mount" onCapture = {onCapture} options = {{format:'jpg'}}>
      <View>
      <ClientHeader client = {user} style = {{ flex:0.3}}/>     
      
      
                       
      
            
                    
                   <Rest />
                   
                   {selected == 'traits' ? <ClientTraits client = {user} />:<ClientVotes client = {user}/>}
                   </View>
                   </ViewShot>
                   
      
                   <ClientDetails client = {user} client2 = {{latitiude:32.735487, longitude:-117.149025}}/>
                  <ClientPhotos client = {user}/>
                  <ClientMatchMakers client = {user} />
                  
                  
                  <Button title = {"Share Your Reputation"} containerStyle = {{marginLeft:30, marginRight:30, marginTop:100,}} buttonStyle = {{backgroundColor:'green',}} onPress = {() => shareImage()}></Button>
                  <Button title = {"Share Profile link"} containerStyle = {{marginLeft:30, marginRight:30, marginTop:10,}} buttonStyle = {{backgroundColor:'green',marginBottom:100}} onPress = {() => share()}></Button> 
                  </View>
    }


    const shareImage = async () => {
      // const result = await Sharing.isAvailableAsync(); 
      // if(result){
      //   await Sharing.shareAsync(captured);
      // }
      // await Share.share({message:"https://friends-365d0.web.app/?name=", url:captured})
      const result = await Share.share({
        url:captured,
      });

    }



    const share = async () => {
      
         

        await Share.share({message:"https://friends-365d0.web.app/?name="+userId})
      
    }
    
    function Rest(){
      return (
        <View style = {{flexDirection:'row', justifyContent:'space-evenly', borderWidth:2, marginTop:40}}>
        <TouchableOpacity style = {{borderRightWidth:1, justifyContent:'center',backgroundColor:selected == 'traits' ? '#75a4f0':'white', flex:1}} onPress = {() => setSelected('traits')}>
            <Text style = {{alignSelf:'center', fontSize:20,  fontWeight:'bold', marginTop:6, marginBottom:6}}>Traits</Text>
        </TouchableOpacity> 
        <TouchableOpacity onPress = {() => setSelected('votes')} style = {{backgroundColor:selected == 'votes' ? '#75a4f0':'white', flex:1}}>
         <Text style = {{alignSelf:'center', fontSize:20,  fontWeight:'bold', marginTop:6, marginBottom:6}}>Votes</Text>
        </TouchableOpacity>
    </View>
      )
    }
     
     

     



    const data = [1]; 
     
     console.log(captured)

     const onCapture = (uri) => {
       setCaptured(uri) 
     }
     
    const imageTemplate = data.appUser ? data.photos.map(val => {
         return val.photo ? <TouchableOpacity onPress = {() => console.log("hell oworld")}><Image source = {{uri:val.photo}} style = {{height:75, width:75}}/></TouchableOpacity>:<Feather name="image" size={40} color="black" />
    }):data.profilePhoto ? <Image source = {{uri:data.profilePhoto}} style = {{height:75, width:75}}/>:<Feather name="image" size={40} color="black" /> 
  
    
    
       
     if(data){
      return (
          
      //     <ScrollView style = {{flex:1}}>
      //     <View style = {{marginLeft:30, marginRight:30}}>
             
           
        
      
      
      
        
      // <ViewShot captureMode = "mount" onCapture = {onCapture} options = {{format:'jpg'}}>
      // <View>
      // <ClientHeader client = {user} style = {{ flex:0.3}}/>     
      
      
                       
      
            
                    
      //              <Rest />
                   
      //              {selected == 'traits' ? <ClientTraits client = {user} />:<ClientVotes client = {user}/>}
      //              </View>
      //              </ViewShot>
                   
      
      //              <ClientDetails client = {user} client2 = {{latitiude:32.735487, longitude:-117.149025}}/>
      //             <ClientPhotos client = {user}/>
      //             <ClientMatchMakers client = {user} />
                  
                  
                  
                 
                 
                 
                  
                  
      //             {/* <Button title = {"SHARE THIS PROFILE"} containerStyle = {{marginLeft:30, marginRight:30, marginTop:100, marginBottom:200,}} buttonStyle = {{backgroundColor:'green',}} onPress = {share}>
                  
  
      //             </Button> */}
      //             <Button title = {"Share Your Reputation"} containerStyle = {{marginLeft:30, marginRight:30, marginTop:100,}} buttonStyle = {{backgroundColor:'green',}} onPress = {() => shareImage()}></Button>
      //             <Button title = {"Share Profile link"} containerStyle = {{marginLeft:30, marginRight:30, marginTop:10,}} buttonStyle = {{backgroundColor:'green',marginBottom:100}} onPress = {() => share()}></Button>
                
  
                  
                  
  
                  
            
      //             </View>
      //       </ScrollView>    

      <FlatList 
      data = {data}
      renderItem = {renderItem}
      />
            
          
        );    
     }
     return (
          <LoadScreen />
     ) 
    
  };

export default SelfView;

const styles = StyleSheet.create({
    container: {flex:1, marginLeft:30, marginRight:30}, 
    textStyle:{fontWeight:'500', fontSize:30}, 
    line:{borderBottomWidth:3,}, 
    iconNames:{marginLeft:10, fontSize:17, fontWeight:'500'}, 
    dotted:{borderStyle:'dotted', borderWidth:2, borderRadius:10, marginTop:10 }
  });

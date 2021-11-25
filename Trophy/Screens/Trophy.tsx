import  React, {useState,useRef,useEffect, useContext} from 'react';
import { View, StyleSheet, Text, TextInput,TouchableOpacity,ScrollView,Image, Button,FlatList,Picker,PanResponder,Animated, TouchableWithoutFeedback, SafeAreaView,Platform } from 'react-native';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import { useMutation,useQuery } from '@apollo/react-hooks';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import {firebase} from '../../config'; 
import AppContext from '../../AppContext'; 
import {updateUser} from '../../networking';  
import Rank from './Rank'; 
import Points from './Points';
import Match from './Match';
import PointsError from './PointsError'; 

import * as Font from 'expo-font';

const db = firebase.firestore(); 
const computeName = (obj) => {
    if(obj.name){
       return obj.name
    }
    if(obj.firstName && obj.lastName){
       return obj.firstName+obj.lastName
    }
    return obj.firstName
}



const useMatchTemplate = () => {
     
}
const usePointsTemplate = () => {
    const data = [
        {
           type:'roundCompleted'  
        }, 
        {
           type:'matchDiscovered'
        }, 
        {
           type:'roundCompleted'
        },
        {
         type:'matchEndorsed'
        }, 
        {
         type:'matchAccepted'
        },
        {
         type:'friendsListUnlocked'
        },
        {
         type:'invitationAccepted'
        },
        
    ]
     
    
        
     const template = [].map(val => {
         if(val.type == 'roundCompleted'){
              return <View style = {{flexDirection:"row",  padding:10, alignItems:'center',marginBottom:20, borderBottomWidth:2}}>
                  <FontAwesome5 name="trophy" size={24} color="black" />
                  <View style = {{marginLeft:10}}>   
                  <Text style = {{fontWeight:"bold", }}>+20 pts</Text>
                  <Text style = {{fontWeight:"bold", }}>Round Completed</Text>
                  </View>
              </View>
         }
         if(val.type == 'matchDiscovered'){
             return <View style = {{flexDirection:"row",  padding:10, borderBottomWidth:2, alignItems:'center',marginBottom:20}}>
                  <MaterialIcons name="people" size={30} color="black" />
                  <View style = {{marginLeft:10}}>   
                  <Text style = {{fontWeight:"bold", }}>+100 pts</Text>
                  <Text style = {{fontWeight:"bold", }}>Match discovered</Text>
                  </View>
              </View>
        }
        if(val.type == 'matchEndorsed'){
         return <View style = {{flexDirection:"row",  padding:10, borderBottomWidth:2, alignItems:'center',marginBottom:20}}>
              <AntDesign name="star" size={24} color="black" />
              <View style = {{marginLeft:10}}>   
              <Text style = {{fontWeight:"bold", }}>+20 pts</Text>
              <Text style = {{fontWeight:"bold", }}>Match Endorsed</Text>
              </View>
          </View>
    }
    if(val.type == 'matchAccepted'){
     return <View style = {{flexDirection:"row",  padding:10, borderBottomWidth:2, alignItems:'center',marginBottom:20}}>
          <AntDesign name="heart" size={24} color="black" />
          <View style = {{marginLeft:10}}>   
          <Text style = {{fontWeight:"bold", }}>+250 pts</Text>
          <Text style = {{fontWeight:"bold", }}>Match Accepted</Text>
          </View>
      </View>
 }
 if(val.type == 'friendsListUnlocked'){
     return <View style = {{flexDirection:"row",  padding:10, borderBottomWidth:2, alignItems:'center',marginBottom:20}}>
          <Ionicons name="ios-people" size={30} color="black" />
          <View style = {{marginLeft:10}}>   
          <Text style = {{fontWeight:"bold", }}>+20 pts</Text>
          <Text style = {{fontWeight:"bold", }}>Friends List Unlocked</Text>
          </View>
      </View>
 }
 if(val.type == 'invitationAccepted'){
     return <View style = {{flexDirection:"row",  padding:10, borderBottomWidth:2, alignItems:'center',marginBottom:20}}>
          <FontAwesome name="pied-piper-alt" size={30} color="black" />
          <View style = {{marginLeft:10}}>   
          <Text style = {{fontWeight:"bold", }}>+50 pts</Text>
          <Text style = {{fontWeight:"bold", }}>Invitation Accepted</Text>
          </View>
      </View>
 }
    })
    return <ScrollView style = {{marginLeft:30, marginRight:30}}>{template}</ScrollView>; 
    
    
    
 }

const useRankTemplate = () => {
    const [allTime, setAllTime] = useState(0); 
    const [monthly, setMonthly] = useState(0);  
    const data = [
     {
       _id:"user",
       name:'Amy B', 
       monthlyPoints:1000, 
       profilePic:null, 
    },
    {
       _id:"list",   
       name:'Sam G', 
       monthlyPoints:1400, 
       profilePic:"https://homepages.cae.wisc.edu/~ece533/images/airplane.png", 
    }
   ]
   const user = data.filter((val,index) => val._id == "user"); 
    const template = data.map((val,index) => {
         return <View style = {{flexDirection:"row", alignItems:'center', borderBottomWidth:2, marginTop:15}}>
           
           {val.profilePic ? <Image source = {{uri:val.profilePic}} style = {{height:40, width:40, borderRadius:20}}/> : <MaterialIcons name="account-circle" size={40} color="black" />}
           <Text style = {{marginLeft:20, fontSize:24, fontWeight:'bold'}}>{index}.</Text>
           <Text style = {{marginLeft:5, fontSize:24, fontWeight:'bold'}}>{val.name}.</Text>
           <View style = {{marginLeft:100, justifyContent:"center", alignItems:"center"}}>
           <Text style = {{ fontSize:24, fontWeight:'bold', }}>{val.monthlyPoints}</Text>
           <Text style = {{ fontSize:18, fontWeight:'bold', marginBottom:10 }}>Points</Text>
           </View>
           </View>
    })
    return <View style = {{marginLeft:30, marginRight:30}}>
    <View style = {{justifyContent:"space-between", flexDirection:'row', marginLeft:10, marginRight:10}}>
    <View style = {{flexDirection:"row",  padding:10, alignItems:'center',marginBottom:20, }}>
                    <FontAwesome5 name="trophy" size={24} color="black" />
                    <View style = {{marginLeft:10}}>   
                    <Text style = {{fontWeight:"bold", }}>20th</Text>
                    <Text style = {{fontWeight:"bold", }}>ALL TIME</Text>
                    </View>
                </View>
                <View style = {{flexDirection:"row",  padding:10, alignItems:'center',marginBottom:20, }}>
                    <FontAwesome5 name="trophy" size={24} color="black" />
                    <View style = {{marginLeft:10}}>   
                    <Text style = {{fontWeight:"bold", }}>2nd</Text>
                    <Text style = {{fontWeight:"bold", }}>MONTHLY</Text>
                    </View>
                </View>
    </View>
   
     <View style = {{borderTopWidth:2, borderBottomWidth:2, flexDirection:'row', justifyContent:'space-between', marginLeft:10, marginRight:10}}> 
      <Text style = {{fontSize:20, fontWeight:'bold', padding:10}}>ALL TIME</Text> 
      <Text style = {{fontSize:20, fontWeight:'bold', padding:10}}>MONTHLY</Text>
     </View>   
    <ScrollView >{template}
    </ScrollView>      
    </View>

   }



  

const useIntroTemplate = () => {
    const myContext = useContext(AppContext); 
    const {userId,registeredUsers, setRegisteredUsers} = myContext;  
    const [data,setData] = useState([]); 
    useEffect(() => {
        
         const unsubscribe = db.collection('introductions').where('matchMaker', '==', userId).onSnapshot(onResult => {
           if(onResult.empty){
               
           }  
           const result = onResult.docs.map(val => val.data())            


           const finaler = Promise.all(result.map(async doc => {
                return await db.collection('user').doc(doc.client).get().then(async client => {
                    return  await db.collection('user').doc(doc.yourClient).get().then(async yourClient => {
                        return {client:client.data(), yourClient:yourClient.data()}  
                     })
                })
           }))
           finaler.then(gamer => { 
               setData(gamer)
           })
        

         })
         return () => unsubscribe()
    }, [])

    const template = data.map(val => {
        return <TouchableOpacity style = {{flexDirection:'row', marginTop:20, marginLeft:10, marginRight:10, borderBottomWidth:2, paddingBottom:5, justifyContent:'space-around', alignItems:'center'}}>
            <View>
            {val.yourClient.profilePic ? <Image style = {{height:50, width:50, borderRadius:25}} source = {{uri:val.yourClient.profilePic}}/>:<MaterialIcons name="account-circle" size={30} color="black" />}
            {val.client.profilePic ? <Image style = {{height:50, width:50, borderRadius:25, position:'absolute', left:45 }} source = {{uri:val.client.profilePic}}/>:<MaterialIcons name="account-circle" size={30} color="black" />}
            </View>
            <Text style = {{maxWidth:250, fontWeight:'bold', marginLeft:30}} numberOfLines = {3}> {computeName(val.client)} has requested an introduction with your client {computeName(val.yourClient)}</Text>

        </TouchableOpacity>
    })
   
   return <View>
        {template}
    </View>
}

export default function Trophy({navigation}){
const [page, setPage] = useState('points');   
const [loaded, setLoadder] = useState(false);  
  
  
  async function loadFonts() {
    await Font.loadAsync({
      // Load a font `Montserrat` from a static resource
      Montserrat: require('../../assets/hey.ttf'),

      // Any string can be used as the fontFamily name. Here we use an object to provide more control
      'Montserrat-SemiBold': {
        uri: require('../../assets/hey.ttf'),
        display: Font.FontDisplay.FALLBACK,
      },
    });
    setLoadder(true);
  }


const pushToken = 'ExponentPushToken[FrneiUBwFvVhNI161d99is]'; 

  useEffect(() => {
    
  }, [])

const rankText = useRankTemplate(); 
const introTemplate = useIntroTemplate(); 
const pointText = usePointsTemplate(); 
const matchText = useMatchTemplate(); 









return(
<View style = {{flex:1, backgroundColor:'#521810'}}>
<View style = {{flex:0.1}}> 
 

</View>
<View style = {{ flex:0.1,}}>
    <View style = {{flexDirection:"row" ,justifyContent:'space-around', borderWidth:1, marginLeft:30, marginRight:30, height:40}}>
    {/* <TouchableOpacity style = {[styles.touchBar, {backgroundColor:page == 'rank' ? '#add1ed':'white'}]} onPress = {() => setPage('rank')}>
    <Text style = {styles.touchBarFont}>Rank</Text>    
    </TouchableOpacity> */}
    <TouchableOpacity style = {[styles.touchBar, {backgroundColor:page == 'rank' ? '#6a3218':'#521810'}]} onPress = {() => setPage('rank')}>
    <Text style = {styles.touchBarFont}>Rank</Text>    
    </TouchableOpacity>
    <TouchableOpacity style = {[styles.touchBar,{backgroundColor:page == 'match' ? '#6a3218':'#521810'}]} onPress = {() => setPage('match')}>
    <Text style = {styles.touchBarFont}>Matches</Text>     
    </TouchableOpacity>
    <TouchableOpacity style = {[styles.touchBar,{backgroundColor:page == 'points' ? '#6a3218':'#521810'}]} onPress = {() => setPage('points')}>
    <Text style = {styles.touchBarFont}>Points</Text>    
    </TouchableOpacity>
    
    </View>

</View>
<View style = {{flex:0.8}}>
 {page == 'points' ? <Points navigation = {navigation}/>:page == 'match' ? <Match navigation = {navigation}/>:page == 'rank' ? <Rank navigation = {navigation}/>:page == 'intros'? introTemplate:null}
</View>
</View>
)
}



const styles = StyleSheet.create({
     touchBar:{
          borderRightWidth:1, 
          justifyContent:'space-around', 
          alignItems:'center',
          flex:1, 
          height:40,
          borderBottomWidth:1,
           
          
     }, 
     touchBarFont:{
         fontWeight:'bold', 
         color:'white', 


     }, 
     onPressStyle:{
        backgroundColor:'blue'  
     }
})
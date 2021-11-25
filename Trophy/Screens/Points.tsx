import  React, {useState,useRef,useEffect, useContext} from 'react';
import { Text, View, StyleSheet, Image, ScrollView } from 'react-native';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import {LoadScreen, SingleImageView} from '../../src/common/Common'; 

import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import AppContext from '../../AppContext'; 
import isPast from 'date-fns/isPast'
import sub from 'date-fns/sub'
import isAfter from 'date-fns/isAfter'
import { filter } from 'underscore';
import {Button} from 'react-native-elements'; 
import { LinearGradient } from 'expo-linear-gradient';



interface RankProps {}

const Points = ({navigation}) => {
  const myContext = useContext(AppContext); 
  const [pointRefined, setPointRefined] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const { user,userId, selfFilter, setSelfFilter,computeName,db, firebase, stringifyNumber, } = myContext;
  console.log(user)
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

    useEffect(() => {
     async function namer(){
        const result = await Promise.all(user.points.map(async val => {
           if(val.pointFor == 'invitationAccepted'){
              return await db.collection('user').doc(val.client).get().then(onDoc => {
                  return Object.assign({}, {...val},{clientPhoto:onDoc.data().profilePicSmall})
              }) 
           } 
           if(val.pointFor == 'matchAccepted'){
            return await db.collection('user').doc(val.client).get().then(onDoc => {
                return Object.assign({}, {...val},{clientPhoto:onDoc.data().profilePicSmall})
            }) 
         }
         if(val.pointFor == 'matchEndorsed'){
            return await db.collection('user').doc(val.client).get().then(onDoc => {
                return Object.assign({}, {...val},{clientPhoto:onDoc.data().profilePicSmall})
            }) 
         }
         if(val.pointFor == 'roundCompleted'){
             return val; 
         }
         if(val.pointFor == 'matchDiscovered'){
            return await db.collection('user').doc(val.client).get().then(onDoc => {
                return Object.assign({}, {...val},{clientPhoto:onDoc.data().profilePicSmall})
            })
        }
           return val;      
        }))
        setPointRefined(result)
        setLoading(false); 
     }
     namer()   
    }, [user.points])
    
     
    
     const finaler = pointRefined.reverse();
     const sliced = finaler.slice(0,20)    
     const template = sliced.map(val => {
         if(val.pointFor == 'roundCompleted'){
              return <View style = {{backgroundColor:'#c56033',flexDirection:"row",  padding:10, alignItems:'center',marginBottom:20, borderBottomWidth:2, shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.5,
              shadowRadius: 2,
              elevation: 2,}}>
                  {/* <FontAwesome5 name="trophy" size={24} color="black" /> */}
                  <Image source = {require('../../assets/ttr.png')} style = {{height:40, width:40,shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.5,
  shadowRadius: 2,
  elevation: 2,}}/>
                  <View style = {{marginLeft:10}}>   
                  <Text style = {{color:'white',fontWeight:"bold", shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.5,
  shadowRadius: 2,
  elevation: 2, }}>+{val.point} pts</Text>
                  <Text style = {{fontWeight:"bold", shadowColor: '#000',color:'white',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.5,
  shadowRadius: 2,
  elevation: 2, }}>Round Completed</Text>
                  </View>
              </View>
         }
         if(val.pointFor == 'matchDiscovered'){
            //  return <View style = {{flexDirection:"row",  padding:10, borderBottomWidth:2, alignItems:'center',marginBottom:20}}>
            //       <MaterialIcons name="people" size={30} color="black" />
            //       <View style = {{marginLeft:10}}>   
            //       <Text style = {{fontWeight:"bold", }}>+{val.point} pts</Text>
            //       <Text style = {{fontWeight:"bold", }}>Match discovered</Text>
            //       </View>
            //       {val.clientPhoto ? <SingleImageView image = {val.clientPhoto} style = {{marginLeft:20}}/>:null}
            //   </View>
              return <LinearGradient colors={[ 'rgba(255,255,255,0.1) 50%', 'rgba(188,90,49,1) 100%' ]} style = {{backgroundColor:'#c56033',flexDirection:"row",  padding:10, alignItems:'center',marginBottom:20, borderBottomWidth:2, shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.5,
              shadowRadius: 2,
              elevation: 2,}}>
              <Image source = {require('../../assets/ppo.png')} style = {{height:40, width:40,shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.5,
  shadowRadius: 2,
  elevation: 2,}}/>
              <View style = {{marginLeft:10}}>   
              <Text style = {{color:'white',fontWeight:"bold", shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.5,
  shadowRadius: 2,
  elevation: 2, }}>+{val.point} pts</Text>
              <Text style = {{color:'white',fontWeight:"bold", shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.5,
  shadowRadius: 2,
  elevation: 2, }}>Match discovered</Text>
              </View>
              {val.clientPhoto ? <SingleImageView image = {val.clientPhoto} style = {{marginLeft:20}}/>:null}
          </LinearGradient>
        }
        if(val.pointFor == 'matchEndorsed'){
         return <View style = {{flexDirection:"row",  padding:10, borderBottomWidth:2, alignItems:'center',marginBottom:20}}>
              <AntDesign name="star" size={24} color="black" />
              <View style = {{marginLeft:10}}>   
              <Text style = {{fontWeight:"bold", }}>+{val.point} pts</Text>
              <Text style = {{fontWeight:"bold", }}>Match Endorsed</Text>
              </View>
              {val.clientPhoto ? <SingleImageView image = {val.clientPhoto} style = {{marginLeft:20}}/>:null}
          </View>
    }
    if(val.pointFor == 'matchAccepted'){
     return <View style = {{flexDirection:"row",  padding:10, borderBottomWidth:2, alignItems:'center',marginBottom:20}}>
          <AntDesign name="heart" size={24} color="black" />
          <View style = {{marginLeft:10}}>   
          <Text style = {{fontWeight:"bold", }}>+{val.point} pts</Text>
          <Text style = {{fontWeight:"bold", }}>Match Accepted</Text>
          </View>
          {val.clientPhoto ? <SingleImageView image = {val.clientPhoto} style = {{marginLeft:20}}/>:null}
      </View>
 }
 if(val.pointFor == 'friendsListUnlocked'){
     return <View style = {{flexDirection:"row",  padding:10, borderBottomWidth:2, alignItems:'center',marginBottom:20}}>
          <Ionicons name="ios-people" size={30} color="black" />
          <View style = {{marginLeft:10}}>   
          <Text style = {{fontWeight:"bold", }}>+{val.point} pts</Text>
          <Text style = {{fontWeight:"bold", }}>Friends List Unlocked</Text>
          </View>
          
      </View>
 }
 if(val.pointFor == 'invitationAccepted'){
       
     return <View style = {{flexDirection:"row",  padding:10, borderBottomWidth:2, alignItems:'center',marginBottom:20}}>
          <FontAwesome name="pied-piper-alt" size={30} color="black" />
          <View style = {{marginLeft:10}}>   
          <Text style = {{fontWeight:"bold", }}>+{val.point} pts</Text>
          <Text style = {{fontWeight:"bold", }}>Invitation Accepted</Text>
          </View>
          {val.clientPhoto ? <SingleImageView image = {val.clientPhoto} style = {{marginLeft:20}}/>:null}
      </View>
 }
    })
    if(loading){
         return <LoadScreen />
    }
    if(pointRefined.length > 0){
        return <ScrollView>
        <View style = {{marginLeft:30, marginRight:30}}>
        {template}
        </View>
        </ScrollView>; 
    }
    return (
        <View style = {{marginLeft:30,marginRight:30}}>
          
          <Image source = {require('../../assets/point.png')} style = {{height:'80%', width:'100%'}}>
    
          </Image>
          <Button
      title="Play Now!"
      type="outline"
      containerStyle = {{backgroundColor:"black",marginLeft:30, marginRight:30}}
      titleStyle = {{color:"white", fontWeight:"bold"}}
      disabledStyle = {{backgroundColor:"grey",}}
      onPress = {() => navigation.navigate('PlayGameLatest')}
      
      
    />
        </View>
      )
    
 };
    


export default Points;

const styles = StyleSheet.create({
  container: {}
});

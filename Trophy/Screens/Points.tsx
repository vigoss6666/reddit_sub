import  React, {useState,useRef,useEffect, useContext} from 'react';
import { Text, View, StyleSheet, Image, ScrollView } from 'react-native';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import {SingleImageView} from '../../src/common/Common'; 

import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import AppContext from '../../AppContext'; 
import isPast from 'date-fns/isPast'
import sub from 'date-fns/sub'
import isAfter from 'date-fns/isAfter'
import { filter } from 'underscore';



interface RankProps {}

const Points = (props: RankProps) => {
  const myContext = useContext(AppContext); 
  const [pointRefined, setPointRefined] = useState([]); 
  const { user,userId, selfFilter, setSelfFilter,computeName,db, firebase, stringifyNumber, } = myContext;
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
                  return Object.assign({}, {...val},{clientPhoto:onDoc.data().profilePic})
              }) 
           } 
           if(val.pointFor == 'matchAccepted'){
            return await db.collection('user').doc(val.client).get().then(onDoc => {
                return Object.assign({}, {...val},{clientPhoto:onDoc.data().profilePic})
            }) 
         }
         if(val.pointFor == 'matchEndorsed'){
            return await db.collection('user').doc(val.client).get().then(onDoc => {
                return Object.assign({}, {...val},{clientPhoto:onDoc.data().profilePic})
            }) 
         }
         if(val.pointFor == 'roundCompleted'){
             return val; 
         }
         if(val.pointFor == 'matchDiscovered'){
            return await db.collection('user').doc(val.client).get().then(onDoc => {
                return Object.assign({}, {...val},{clientPhoto:onDoc.data().profilePic})
            })
        }
           return val;      
        }))
        setPointRefined(result)
     }
     namer()   
    }, [user.points])
    
     
    
     const finaler = pointRefined.reverse();
     const sliced = finaler.slice(0,20)    
     const template = sliced.map(val => {
         if(val.pointFor == 'roundCompleted'){
              return <View style = {{flexDirection:"row",  padding:10, alignItems:'center',marginBottom:20, borderBottomWidth:2}}>
                  <FontAwesome5 name="trophy" size={24} color="black" />
                  <View style = {{marginLeft:10}}>   
                  <Text style = {{fontWeight:"bold", }}>+{val.point} pts</Text>
                  <Text style = {{fontWeight:"bold", }}>Round Completed</Text>
                  </View>
              </View>
         }
         if(val.pointFor == 'matchDiscovered'){
             return <View style = {{flexDirection:"row",  padding:10, borderBottomWidth:2, alignItems:'center',marginBottom:20}}>
                  <MaterialIcons name="people" size={30} color="black" />
                  <View style = {{marginLeft:10}}>   
                  <Text style = {{fontWeight:"bold", }}>+{val.point} pts</Text>
                  <Text style = {{fontWeight:"bold", }}>Match discovered</Text>
                  </View>
                  {val.clientPhoto ? <SingleImageView image = {val.clientPhoto} style = {{marginLeft:20}}/>:null}
              </View>
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
    return <ScrollView>
        <View style = {{marginLeft:30, marginRight:30}}>
        {template}
        </View>
        </ScrollView>; 
 };
    


export default Points;

const styles = StyleSheet.create({
  container: {}
});

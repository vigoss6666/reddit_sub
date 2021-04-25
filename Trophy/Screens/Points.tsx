import  React, {useState,useRef,useEffect, useContext} from 'react';
import { Text, View, StyleSheet, Image, ScrollView } from 'react-native';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';

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
    
     
    
     const finaler = user.points.reverse();    
     const template = finaler.map(val => {
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
              </View>
        }
        if(val.pointFor == 'matchEndorsed'){
         return <View style = {{flexDirection:"row",  padding:10, borderBottomWidth:2, alignItems:'center',marginBottom:20}}>
              <AntDesign name="star" size={24} color="black" />
              <View style = {{marginLeft:10}}>   
              <Text style = {{fontWeight:"bold", }}>+{val.point} pts</Text>
              <Text style = {{fontWeight:"bold", }}>Match Endorsed</Text>
              </View>
          </View>
    }
    if(val.pointFor == 'matchAccepted'){
     return <View style = {{flexDirection:"row",  padding:10, borderBottomWidth:2, alignItems:'center',marginBottom:20}}>
          <AntDesign name="heart" size={24} color="black" />
          <View style = {{marginLeft:10}}>   
          <Text style = {{fontWeight:"bold", }}>+{val.point} pts</Text>
          <Text style = {{fontWeight:"bold", }}>Match Accepted</Text>
          </View>
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
      </View>
 }
    })
    return <ScrollView style = {{marginLeft:30, marginRight:30}}>{template}</ScrollView>; 
 };
    


export default Points;

const styles = StyleSheet.create({
  container: {}
});

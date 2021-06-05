import  React, {useState,useRef,useEffect, useContext} from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { MaterialIcons, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import {Button, Icon} from 'react-native-elements'; 
import AppContext from '../../AppContext'; 

interface EndorsementClientProps {}


const EndorsementClient = ({route, navigation}) => {
    const myContext = useContext(AppContext);
  const { user,userId, selfFilter, setSelfFilter,computeName,db, firebase, stringifyNumber, CustomBackComponent, setInitialRouteName } = myContext;
  const {matchInstance} = route.params; 
  function endorse(){
    db.collection('matches').doc(matchInstance._id).set({endorsements:firebase.firestore.FieldValue.arrayUnion(userId)}, {merge:true}).then(() => {
      
      db.collection('user').doc(userId).set({points:firebase.firestore.FieldValue.arrayUnion({pointFor:'matchEndorsed', point:20, createdAt:new Date, client:matchInstance.client1User.phoneNumber})}, {merge:true}).then(() => {
        setInitialRouteName('Trophy');
        navigation.navigate('Homer'); 
      })
    })

    
  }
    useEffect(() => {
        navigation.setOptions({
            headerTitle:false, 
            headerLeft:() => <CustomBackComponent navigation = {navigation}/> 
        })
    }, [])
    
    
  return (
            <View style = {{flex:1,backgroundColor:"black" }}>
        <View style = {{flex:0.2}}>
        
        </View>
        <View style = {{flex:0.6,}}>
         <Text style = {{color:"white", fontWeight:"bold", fontSize:35, fontStyle:"italic", alignSelf:'center'}}> It's a Match ! </Text>
         <View style = {{flexDirection:"row",marginTop:50, justifyContent:'space-around', alignItems:'center'  }}>
         <View style = {{alignItems:"center",}}>
         {matchInstance.client1User.profilePic ? <Image source = {{uri:matchInstance.client1User.profilePic}} style = {{height:100, width:100, borderRadius:50}}/>:
         <MaterialIcons name="account-circle" size={100} color="blue" />}
         <Text style = {{color:"white", fontWeight:"bold",fontSize:20, marginTop:10}}>{computeName(matchInstance.client1User)} </Text>
         </View>
         <View style = {{alignItems:"center", }}>
         {matchInstance.client2User.profilePic ? <Image source = {{uri:matchInstance.client2User.profilePic}} style = {{height:100, width:100, borderRadius:50}}/>:
         <MaterialIcons name="account-circle" size={100} color="blue" />}
         <Text style = {{color:"white", fontWeight:"bold",fontSize:20, marginTop:10}}>{computeName(matchInstance.client2User)} </Text>
         </View>
         {/* <MaterialIcons name="account-circle" size={100} color="red" /> */}
         
         </View>
         <View style = {{flexDirection:"row"}}>
         
         {/* <Text style = {{color:"white", fontWeight:"bold", fontSize:20}}> {data.generateMatches.data[index]}</Text> */}
        
         </View>
        
        </View>
        <View style = {{flex:0.2}}>
         <Button title = "Endorse this match" buttonStyle = {{backgroundColor:"#f5b507",}} titleStyle = {{color:"white", fontWeight:"bold"}} containerStyle = {{marginLeft:30, marginRight:30}} icon={
            <Icon
              name="star"
              size={15}
              color="white"
            />
            
          }
        //   onPress = {() => setIndexWrapper()}
        onPress = {() => { endorse()}}
          >
         
        </Button>
        <Button title = "Maybe Not" buttonStyle = {{backgroundColor:"#6e6b65",}} titleStyle = {{color:"white", fontWeight:"bold"}} containerStyle = {{marginLeft:30, marginRight:30, marginTop:30}}
        onPress = {() => {navigation.navigate('Homer'), setInitialRouteName('Trophy')}}
        >
        </Button>
        
        </View>
        </View>
  );
};

export default EndorsementClient;

const styles = StyleSheet.create({
  container: {}
});

import  React, {useState,useRef,useEffect, useContext} from 'react';

import { View, StyleSheet,  TextInput,TouchableOpacity,ScrollView,Image, FlatList,Picker,PanResponder,Animated, TouchableWithoutFeedback, SafeAreaView, KeyboardAvoidingView} from 'react-native';
import { Divider,Header,Text, SearchBar,Avatar,Icon,Button,CheckBox} from 'react-native-elements';
import { createFilter } from 'react-native-search-filter';
import { firebase } from '../../config'; 
import AppContext from '../../AppContext'; 
import {updateUser} from '../../networking';  
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function Contacts({navigation,route}){
  
const myContext = useContext(AppContext); 
const { userId,defaultDataObject,setUser,computeName} = myContext;
const db = firebase.firestore(); 
const [indexer,setIndexer] = useState([]); 
const [isSelected, setSelection] = useState(false);
const KEYS_TO_FILTERS = ['name', 'firstName', 'lastName'];
const [search, setSearch] = useState('');
const [selectAll, setSelectAll] = useState(true);
const [serverData, addServerData] = useState([]); 
const [profiles, setProfiles] = useState([]); 
const [user,setUser1] = useState({});
useEffect(() => {
  db.collection('user').doc(userId).get().then(onDoc => {
      setUser1(onDoc.data())
  })
}, [])
 

useEffect(() => {
   async function namer(){
    const onResult = await db.collection('user').where(firebase.firestore.FieldPath.documentId(), 'in', user.contactList).get();
    const users = onResult.docs.map(val => val.data()); 
    const profilesWithMatchMaker = users.filter(val => val.matchMaker == userId); 
    const profilesWithoutMatchmaker = users.filter(val => val.matchMaker !== userId); 
    const withMatchPics = await Promise.all(profilesWithoutMatchmaker.map(async val => {
      if(val.matchMaker){
        return await db.collection('user').doc(val.matchMaker).get().then(onDoc => {
          return {...val, matchMakerPic:onDoc.data().profilePic}
        })
      }
      return {...val, matchMakerPic:null}
    }))
    const finalUsers = [...withMatchPics, ...profilesWithMatchMaker]
    setProfiles(finalUsers); 

   }
   if(Object.keys(user).length){
    namer()
   }
   
   
}, [user])
const sendToServer = async () => {
    
  console.log(indexer)

   
   db.collection('user').where(firebase.firestore.FieldPath.documentId(), 'in', indexer).get().then(async onResult => {
     const result = onResult.docs.map(val => val.data());
     const filterByApp = result.filter(val => !val.appUser);
     const filterBySetter = filterByApp.filter(val => val.latitude == 0);
     if(filterBySetter.length < 1){
      const userInit = Object.assign({}, {...defaultDataObject},{...user}) 
      db.collection('user').doc(userId).set(userInit, {merge:true});

    
    await db.collection('user').doc(userId).set({datingPoolList:indexer}, {merge:true}); 
    await AsyncStorage.setItem('user', userId);  
    setUser(user);
    
     return;    
     }
     await db.collection('user').doc(userId).set({datingPoolList:indexer}, {merge:true}); 
     navigation.navigate('ContactsAge') 

   })
   
}



const addArray = (phoneNumber:string) => {
     if(indexer.includes(phoneNumber)){
        const copyIndex = indexer.concat();  
        const index = copyIndex.indexOf(phoneNumber);
            const result = copyIndex.splice(index, 1);
            setIndexer(copyIndex); 
            return; 
     }
     setIndexer([...indexer, phoneNumber]);
}


 


    
    const filteredEmails = profiles.filter(createFilter(search, KEYS_TO_FILTERS))
   return(
      <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      style={{flex:1}}
    >
        <View style = {{flex:1, }}>
        <View style = {{flex:0.1}}>
                        
        </View>
        <View style = {{flex:0.2}}>
        <Text h2 style = {{alignSelf:'center'}}> Dating Pool</Text>
        <Text h6 style = {{alignSelf:'center',fontWeight:'600', marginTop:10,marginBottom:20}}> Select the friends you want to match</Text>
        <SearchBar
          lightTheme
          round
          containerStyle = {{marginLeft:15, marginRight:15}}
          searchIcon={{ size: 24 }}
          onChangeText={text => setSearch(text)}
          placeholder="search"
          value={search}
        />
        </View>
          <View style = {{marginTop:10,flex:0.5, marginTop:40}}>
          

          <ScrollView>
          {filteredEmails.map((val,index) => {
            return (
              <TouchableOpacity key={index} 
              style = {{borderWidth:1, flexDirection:"row",  justifyContent:'space-between', marginLeft:20, marginRight:20, borderLeftWidth:0, borderRightWidth:0,}}
              onPress = {() => { addArray(val.phoneNumber)}}
              >
                
                  <View style = {{flexDirection:'row', alignItems:'center', marginTop:5, marginBottom:5}}>
                  {val.profilePic ? <Image source = {{uri:val.profilePic}} style = {{height:60, width:60, borderRadius:30, }}/>:<MaterialIcons name="account-circle" size={60} color="black" />}  
                  <Text style = {{marginLeft:10, fontSize:17,maxWidth:100,maxHeight:100}}>{computeName(val)}</Text>
                  <Text style = {{marginLeft:20}}>{val.matchMaker !== userId ? <Text style = {{fontWeight:'bold', fontSize:25}}> R </Text>:null}</Text>
                  {val.matchMakerPic ? <Image source = {{uri:val.matchMakerPic}} style = {{height:30, width:30,borderRadius:15, marginLeft:10}}/>:null}
                  </View>
                  <View style = {{alignItems:'center', justifyContent:'center', marginRight:10}}>
                     <Icon name = {"check"} iconStyle = {{opacity:indexer.includes(val.phoneNumber) ? 1:0}}/> 
                  </View>
              </TouchableOpacity>
            )
          })}
        </ScrollView>        
        </View>
        <View style = {{flex:0.2,marginTop:20}}>
            <Text style = {{alignSelf:'center', marginBottom:20, color:'black', fontWeight:"600", marginTop:10}}>{indexer.length} Friends selected</Text>
            <Button buttonStyle = {{backgroundColor:'black'}} title = {"Done"} containerStyle = {{marginLeft:20, marginRight:20}} disabledStyle = {{backgroundColor:'grey', }} disabled = {indexer.length > 0 ? false:true} onPress = {() => {sendToServer()}}>
                
            </Button>
               
        </View>
        </View>
        </KeyboardAvoidingView>
        )

}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    checkboxContainer: {
      flexDirection: "row",
      marginBottom: 20,
    },
    checkbox: {
      alignSelf: "center",
    },
    label: {
      margin: 8,
    },
  });
import React, { useState, useEffect, useRef, useContext } from 'react';
import { View, Text,TouchableOpacity,ScrollView, StyleSheet, Button } from 'react-native'; ; 
import AppContext from '../../AppContext';
import {ClientHeader, ClientDetails, ClientPhotos, ClientMatchMakers, ClientTraits, ClientVotes, LoadScreen} from '../../src/common/Common'; 

export default function ChatClientView({route, navigation}) {
    const myContext = useContext(AppContext);
    const { db, CustomBackComponent} = myContext;
    useEffect(() => {
       navigation.setOptions({
           headerTitle:false, 
           headerLeft:() => <CustomBackComponent navigation = {navigation}/>
       }) 
        
    }, [])
    const {client} = route.params; 
    const [user, setUser] = useState(); 
    
      


    useEffect(() => {
        db.collection('user').doc(client).get().then(onDoc => {
             setUser(onDoc.data())
        })
    }, [client])

    if(user){
        return (
            <View style={styles.container}>
            <ScrollView>
            
             <ClientHeader client = {user} style = {{ flex:0.3}}/>  
             
              <View style = {{flex:0.7, marginLeft:30, marginRight:30}}>
                     <View style = {{flexDirection:'row', justifyContent:'space-evenly', borderWidth:2, marginTop:40}}>
  
                         
                         
                     </View> 
                      <ClientTraits client = {user} />
                     <ClientDetails client = {user} client2 = {{latitiude:32.735487, longitude:-117.149025}}/>
                    <ClientPhotos client = {user}/>
                    <ClientMatchMakers client = {user} />
                    
                   
                   
                   
                    
                    
                    
    
                    
    
    
                    
                    
    
                    
              </View>
              </ScrollView>    
              
            </View>
          );    
       }
       return (
            <LoadScreen />
       )
    
}

const styles = StyleSheet.create({
    container: {flex:1}, 
    textStyle:{fontWeight:'500', fontSize:30}, 
    line:{borderBottomWidth:3,}, 
    iconNames:{marginLeft:10, fontSize:17, fontWeight:'500'}, 
    dotted:{borderStyle:'dotted', borderWidth:2, borderRadius:10, marginTop:10 }
  });
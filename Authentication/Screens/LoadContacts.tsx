import  React, {useState,useRef,useEffect} from 'react';
import { View, StyleSheet, Text, TextInput,TouchableOpacity,ScrollView,Image, Button,FlatList,Picker,PanResponder,Animated, TouchableWithoutFeedback, SafeAreaView} from 'react-native';
import { useMutation,useQuery } from '@apollo/react-hooks';
import {mutateSettings} from '../../networking'; 
import {firebase} from '../../config'; 

const db = firebase.firestore(); 
let batch = db.batch();
let userRef = db.collection('user');
let phoneRef = db.collection('phoneNumbers'); 



const UPLOAD_CONTACTS = gql`
 mutation namer($contacts:Contact1!){
      uploadContacts(contacts:$contacts){
          data {
               name
               firstname
               _id
          }
      }
  }
`; 



import * as Contacts from 'expo-contacts';
import { gql } from 'apollo-boost';
export default function LoadContacts({navigation}){
    
    const demoData = {data:[
        {
            firstname:"zaid", 
            name:"zaid shaikh", 
            identification:"123456", 
            phoneNumbers:[
                {
                    label:"something", 
                    id:"something",             
                    countryCode:'us', 
                    digits:'9820138437', 
                    number:'Something'
                }
            ]
        }
    ]}
    let length = useRef().current; 

    //const [uploadContacts1, {data}] = useMutation(UPLOAD_CONTACTS); 
    // if(data){
        
    //     navigation.navigate('Loader',{profiles:data.uploadContacts.data});
           
    // }
    useEffect(() => {
        _uploadContacts()
    }, [])
    const _uploadContacts = async () => {
        const { status } = await Contacts.requestPermissionsAsync(); 
        if (status === 'granted') {
            const { data } = await Contacts.getContactsAsync({
              fields: [Contacts.Fields.PhoneNumbers],
            });
            console.log(data)
            if (data.length > 0) {
              const contact = data;
              console.log(contact); 
              const finaler = contact.map(val => {
                   return {
                       fullName:val.name, 
                       id:val.id, 
                       firstName:val.firstName, 
                       lastName:val.lastName,
                       phoneNumbers:val.phoneNumbers.map(val1 => {
                            return {
                               id:val.id, 
                               number:val1.digits, 
                               formattedNumber:val1.number, 
                               countryCode:val1.countryCode
                           }
                       })
                   }
              })
             db.collection('user').doc('trialUser').set({contacts:finaler.length}); 
             await finaler.map(async val => {
                   userRef.add({fullName:val.fullName, 
                    id:val.id, 
                    firstName:val.firstName, 
                    lastName:val.lastName}); 
                  
                  
                   val.phoneNumbers.map(async val1 => {
                        db.collection('phoneNumbers').add(val1); 
                   })
              })
               navigation.navigate('Loader', {profiles:finaler})
              
              
              
              const networkData = {data:finaler}; 
              //uploadContacts1({variables:{contacts:networkData}}); 
              
              
               

              
            }
          }
    }  
return(
<View style = {{flex:1, justifyContent:'center', alignItems:'center', }}>
{/* <TouchableOpacity style = {{backgroundColor:'black',padding:20}} onPress = {() => {_uploadContacts() }}>
    <Text style = {{color:'white', fontWeight:'600'}}>Load Contacts</Text>
</TouchableOpacity> */}
</View>
)
}
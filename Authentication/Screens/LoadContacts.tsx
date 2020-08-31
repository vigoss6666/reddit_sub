import  React, {useState,useRef,useEffect} from 'react';
import { View, StyleSheet, Text, TextInput,TouchableOpacity,ScrollView,Image, Button,FlatList,Picker,PanResponder,Animated, TouchableWithoutFeedback, SafeAreaView} from 'react-native';
import { useMutation,useQuery } from '@apollo/react-hooks';

const UPLOAD_CONTACTS = gql`
 mutation namer($contacts:Contact1!){
      uploadContacts(contacts:$contacts)
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
    const [uploadContacts1, {data}] = useMutation(UPLOAD_CONTACTS, {variables:demoData}); 
    
    const _uploadContacts = async () => {
        
    
        const { status } = await Contacts.requestPermissionsAsync(); 
        if (status === 'granted') {
            const { data } = await Contacts.getContactsAsync({
              fields: [Contacts.Fields.PhoneNumbers],
            });
            if (data.length > 0) {
              const contact = data;
              const finaler = contact.map(val => {
                   return {
                       name:val.name, 
                       id:val.id, 
                       firstname:val.firstName, 
                       phoneNumbers:val.phoneNumbers.map(val1 => {
                            return {
                               id:val.id, 
                               digits:val1.digits, 
                               number:val1.number 
                           }
                       })
                   }
              })
              
              const networkData = {data:finaler}; 
              uploadContacts1({variables:{contacts:networkData}}); 
              navigation.navigate('ContactLoadSuccess'); 

              
            }
          }
    }  
return(
<View style = {{flex:1, justifyContent:'center', alignItems:'center', }}>
<TouchableOpacity style = {{backgroundColor:'black',padding:20}} onPress = {() => {_uploadContacts() }}>
    <Text style = {{color:'white', fontWeight:'600'}}>Load Contacts</Text>
</TouchableOpacity>
</View>
)
}
import  React, {useState,useRef,useEffect} from 'react';
import { View, StyleSheet,  TextInput,TouchableOpacity,ScrollView,Image, FlatList,Picker,PanResponder,Animated, TouchableWithoutFeedback, SafeAreaView} from 'react-native';
import { useMutation,useQuery } from '@apollo/react-hooks';
import { MaterialIcons } from '@expo/vector-icons';
import { Avatar, Badge, Icon, withBadge,Text, Button} from 'react-native-elements'
import { gql } from 'apollo-boost';
import { firebase } from '../../config'; 




export default function ContactLoadSuccess({navigation,route}){
    
    const [contacts, setContacts] = useState(); 
    const db = firebase.firestore(); 
    
    const {profiles} = route.params; 
    useEffect(() => {
        const subscribe = db.collection('user').doc('trialUser')
        .onSnapshot((doc) => {

             setContacts(doc.data().contacts)
             console.log(contacts); 
        }) 

         
    }, [contacts]) 
     
    
        
        return(
            <View style = {{flex:1, }}>
            <View style = {{flex:0.3}}>
            
            </View>
            <View style = {{flex:0.5,  marginLeft:30, marginRight:30}}>
            
            <View style = {{    flexDirection:'row', justifyContent:'center',  alignItems:'center', marginBottom:30}}>
            <MaterialIcons name="account-circle" size={60} color="black" />
            
                <Text h3 style = {{fontWeight:"bold"}}> {contacts} </Text>
            
            </View>
            <View style = {{borderBottomWidth:3, marginLeft:30, marginRight:20, marginBottom:20,borderColor:"grey"}}/>
            <Text h3 style = {{alignSelf:'center'}}>
            Contacts Loaded!
            </Text>
            <Text style = {{alignSelf:'center'}}>
                Awesome {profiles.length} contacts loaded
            </Text>
            <Text style = {{alignSelf:'center', marginBottom:30}}>
                Happy Matchmaking!
            </Text>
            <View style = {{borderBottomWidth:3, marginLeft:30, marginRight:20, marginBottom:20,borderColor:"grey"}}/>
            </View>
            <View style = {{flex:0.2}}>
            <Button title = "Start Matchmaking" containerStyle = {{marginLeft:30, marginRight:30, backgroundColor:'black'}} buttonStyle = {{backgroundColor:'black'}} onPress = {() => {navigation.navigate('Contacts', {profiles})}}/>
            </View>
            </View>
            )               
    
 
 
}
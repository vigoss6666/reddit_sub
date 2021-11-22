import  React, {useState,useRef,useEffect, useContext} from 'react';
import { View, StyleSheet,  TextInput,TouchableOpacity,ScrollView,Image, FlatList,Picker,PanResponder,Animated, TouchableWithoutFeedback, SafeAreaView, Keyboard} from 'react-native';
import { useMutation,useQuery } from '@apollo/react-hooks';
import { MaterialIcons } from '@expo/vector-icons';
import { Avatar, Badge, Icon, withBadge,Text, Button} from 'react-native-elements'
import { gql } from 'apollo-boost';
import { firebase } from '../../config'; 
import AppContext from '../../AppContext'; 
import {updateUser} from '../../networking';  
import { LoadScreen } from '../../src/common/Common';
import { useSafeAreaInsets } from 'react-native-safe-area-context';



export default function ContactLoadSuccess({navigation,route}){
    const myContext = useContext(AppContext); 
    const insets = useSafeAreaInsets();
    const {userId,db} = myContext;
    const [user,setUser] = useState({});
    useEffect(() => {
       Keyboard.dismiss() 
       navigation.setOptions({
           headerShown:false
       }) 
    }, [])
    useEffect(() => {
        db.collection('user').doc(userId).get().then(onDoc => {
            setUser(onDoc.data())
            Keyboard.dismiss()
        })
    }, []) 
        
        if(Object.keys(user).length){
            return(
                <TouchableOpacity style = {{flex:1,paddingTop:insets.top }} onPress = {() => Keyboard.dismiss()}>
                <View style = {{flex:0.3,alignItems:'center'}}>
                <TouchableOpacity onPress = {() => navigation.goBack()}>
<MaterialIcons name="keyboard-arrow-up" size={40} color="black" />
</TouchableOpacity>   
                </View>
                <View style = {{flex:0.5,  marginLeft:30, marginRight:30}}>
                
                <View style = {{    flexDirection:'row', justifyContent:'center',  alignItems:'center', marginBottom:30}}>
                <MaterialIcons name="account-circle" size={60} color="black" />
                
                    <Text h3 style = {{fontWeight:"bold"}}> {user.contactList.length} </Text>
                
                </View>
                <View style = {{borderBottomWidth:3, marginLeft:30, marginRight:20, marginBottom:20,borderColor:"grey"}}/>
                <Text h3 style = {{alignSelf:'center'}}>
                Contacts Loaded!
                </Text>
                <Text style = {{alignSelf:'center'}}>
                    Awesome,  {user.contactList.length} contacts loaded
                </Text>
                <Text style = {{alignSelf:'center', marginBottom:30}}>
                    Happy Matchmaking!
                </Text>
                <View style = {{borderBottomWidth:3, marginLeft:30, marginRight:20, marginBottom:20,borderColor:"grey"}}/>
                </View>
                <View style = {{flex:0.2}}>
                <Button title = "Start Matchmaking" containerStyle = {{marginLeft:30, marginRight:30, backgroundColor:'black'}} buttonStyle = {{backgroundColor:'black'}} titleStyle = {{fontWeight:'bold', }} onPress = {() => {navigation.navigate('ContactsLatest')}}/>
                </View>
                </TouchableOpacity>
                )
        }
        return <LoadScreen />
                       
    
 
 
}
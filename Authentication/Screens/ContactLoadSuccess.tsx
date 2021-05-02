import  React, {useState,useRef,useEffect, useContext} from 'react';
import { View, StyleSheet,  TextInput,TouchableOpacity,ScrollView,Image, FlatList,Picker,PanResponder,Animated, TouchableWithoutFeedback, SafeAreaView} from 'react-native';
import { useMutation,useQuery } from '@apollo/react-hooks';
import { MaterialIcons } from '@expo/vector-icons';
import { Avatar, Badge, Icon, withBadge,Text, Button} from 'react-native-elements'
import { gql } from 'apollo-boost';
import { firebase } from '../../config'; 
import AppContext from '../../AppContext'; 
import {updateUser} from '../../networking';  
import { LoadScreen } from '../../src/common/Common';



export default function ContactLoadSuccess({navigation,route}){
    const myContext = useContext(AppContext); 
    const {userId,db} = myContext;
    const [user,setUser] = useState({});
    useEffect(() => {
        db.collection('user').doc(userId).get().then(onDoc => {
            setUser(onDoc.data())
        })
    }, []) 
        
        if(Object.keys(user).length){
            return(
                <View style = {{flex:1, }}>
                <View style = {{flex:0.3}}>
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
                    Awesome {user.contactList.length} contacts loaded
                </Text>
                <Text style = {{alignSelf:'center', marginBottom:30}}>
                    Happy Matchmaking!
                </Text>
                <View style = {{borderBottomWidth:3, marginLeft:30, marginRight:20, marginBottom:20,borderColor:"grey"}}/>
                </View>
                <View style = {{flex:0.2}}>
                <Button title = "Start Matchmaking" containerStyle = {{marginLeft:30, marginRight:30, backgroundColor:'black'}} buttonStyle = {{backgroundColor:'black'}} onPress = {() => {navigation.navigate('Contacts')}}/>
                </View>
                </View>
                )
        }
        return <LoadScreen />
                       
    
 
 
}
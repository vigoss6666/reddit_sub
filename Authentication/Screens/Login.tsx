import  React, {useState,useRef,useEffect} from 'react';
import { View, StyleSheet, Text, TextInput,TouchableOpacity,ScrollView,Image, Button,FlatList,Picker,PanResponder,Animated, TouchableWithoutFeedback, SafeAreaView, AsyncStorage} from 'react-native';
import { useMutation,useQuery } from '@apollo/react-hooks';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';
import { gql } from 'apollo-boost';
import {client } from '../../networking'; 





//login(userInput: AccountSettingsMutation1!): Boolean!
const LOGIN =  gql`

mutation namer($userInput:AccountSettingsMutation1!){
     login(userInput:$userInput){
          _id
          error
     }
}

`






export default function Login({navigation}){
const [email, setEmail] = useState(); 
const [password, setPassword] = useState();
const [login, {data},] = useMutation(LOGIN); 
const [error, setError] = useState();
const [title, setTitle] = useState();  
if(data){   
    
}


 


const _sendToServer = async () => {
     console.log("called")
     const serverObject = {email}; 
     login({variables:{userInput:serverObject},
      update:((cache, {data}) => {
            if(data.login.error){
                
                setError("Phone number didnt match")
                return; 
            }
            else if(data.login.error == false){
                 
                 AsyncStorage.setItem('_id', data.login._id)
                 navigation.navigate('Endorsement')
            }
           
          
      })     
     }); 
    
 }



return(
<View style = {{flex:1,marginLeft:30,marginRight:30}}>
<View style = {{flex:0.2}}>

</View>
<View style = {{flex:0.6}}>
<Text style = {{alignSelf:"center", fontSize:20, fontWeight:'600', marginBottom:100}}>
 {title} 
</Text>
<Input
   placeholder="PhoneNumber"
   leftIcon={{ type: 'materialIcons', name: 'phone', color:'red' }}
   autoCapitalize = {'none'}
   autoCorrect = {false}
   onChangeText={value => setEmail(value)}
  />
  <Text style = {{color:"red",}}>{error}</Text>
  
  <TouchableOpacity 
  style = {{backgroundColor:'red', justifyContent:'center', alignItems:"center", height:50, borderRadius:50}}
  onPress = {() => {_sendToServer()}}
  
  >
      <Text style = {{color:"white", fontWeight:"bold"}}>SIGN IN</Text>

  </TouchableOpacity>
  <View style = {{flexDirection:"row", justifyContent:"center", marginTop:10}}> 
  <Text>NEW HERE ?</Text>
  <TouchableOpacity 
  onPress = {() => {navigation.navigate('Intro')}}
  >
      <Text>SIGN UP</Text>
  </TouchableOpacity>
  </View>

</View>
<View style = {{flex:0.2}}>

</View>
</View>
)
}
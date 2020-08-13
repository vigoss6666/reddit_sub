import  React, {useState,useRef,useEffect} from 'react';
import { View, StyleSheet, Text, TextInput,TouchableOpacity,ScrollView,Image, Button,FlatList,Picker,PanResponder,Animated, TouchableWithoutFeedback, SafeAreaView} from 'react-native';
import { useMutation,useQuery } from '@apollo/react-hooks';
import { AntDesign } from '@expo/vector-icons';
import { gql } from 'apollo-boost';

const REGISTER_PHONE = gql`
mutation namer($phoneNumber:Float!){
     phone(phoneNumber:$phoneNumber) 
}
`; 




export default function Phone({navigation,route}){
    // const dial_code = React.useRef(navigation.getParam('dial_code')).current; 
    // const country = React.useRef(navigation.getParam('code')).current;
    let dial_code = "+675"; 
    let code = 'VN'; 

    if(route.params){
     if(route.params.code){
          dial_code = route.params.dial_code;  
     }
     if(route.params.code){
          code = route.params.code; 
     }
}

    const [registerPhone, {data}] = useMutation(REGISTER_PHONE); 
    const [phone, setPhone] = useState(); 
    if(data){
          console.log(data)
    }
    const [clicker,setclicker] = React.useState({color:"grey", disabled:true}); 
    function validator(input){
         console.log(input)
         if(input.length >= 7){
              setclicker({color:"red", disabled:false})
              return; 
         }
         setclicker({color:"grey", disabled:true})

    } 
     return (
          <View style = {{flex:1,padding:30}}>
               <Text style = {{marginTop:50,fontSize:40,marginBottom:50}}> Phone Number </Text>
               <View style = {{flexDirection:"row",}}>
                <TouchableOpacity 
                style = {{borderBottomWidth:1,borderColor:"black",flexDirection:"row",justifyContent:"space-between", alignItems:"center",flex:1,padding:10}}
                onPress = {() => {navigation.navigate('CountryCodes')}}
                >
                <Text style = {{fontSize:20}}>
                { code} 
                </Text>
                <Text style = {{fontSize:20}}>
                 { dial_code}   
                </Text>
                <AntDesign name = "caretdown" color = "grey" size = {15}/>
                </TouchableOpacity>
                <View style = {{flex:0.3}}></View>
                <TextInput style = {{flex:2,borderBottomColor:"black",borderBottomWidth:1}} onChangeText = {(text) => {validator(text), setPhone(text)}}></TextInput>
               </View>
               <Text style = {{marginTop:30,alignSelf:"center",textAlign:"center"}}> When you Tap continue, Friends help Friends will send a text with verification code.</Text>
                   <TouchableOpacity 
                   style = {{width:300,backgroundColor:clicker.color, alignSelf:"center",height:40,justifyContent:"center",alignItems:"center",borderRadius:30,marginTop:40}} disabled = {clicker.disabled}
                   onPress = {() => {registerPhone({variables:{phoneNumber:parseInt(phone)}}), navigation.navigate('VerifyPhone')}}
                   >
                       <Text style = {{textAlign:"center",color:"white",fontWeight:"500",fontSize:20}}> Continue</Text>
                   </TouchableOpacity>
          </View>
     )
}
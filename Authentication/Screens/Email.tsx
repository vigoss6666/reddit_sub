import  React, {useState,useRef,useEffect} from 'react';
import { View, StyleSheet, Text, TextInput,TouchableOpacity,ScrollView,Image, Button,FlatList,Picker,PanResponder,Animated, TouchableWithoutFeedback, SafeAreaView,Dimensions} from 'react-native';
import { useMutation,useQuery } from '@apollo/react-hooks';
import {Header, Continue} from '../../src/common/Common'; 
import { gql } from 'apollo-boost';

 
const REGISTER_EMAIL = gql`
 mutation email($email1:String!){
       email(email1:$email1)
 }
`; 



export default function Email({navigation}){
const [verifyEmail, {data}] = useMutation(REGISTER_EMAIL);     
const [Email, setEmail] = useState();     
const _handleEmail = () => {
 const hello = "zaheeryakub@gmail.com";     
 verifyEmail({variables:{email1:"zaheeryakub@gmail.com"}});     
}
return(
<View style = {{flex:1, }}>   
<View style = {{flex:0.2}}>

</View>
<View style = {{flex:0.5, marginLeft:30}}>
<Header text = {"My Email is...."} />
<View style = {{borderBottomWidth:0.4, width:Dimensions.get('window').width - 60, marginTop:20}}/> 
<TextInput 
style = {{fontSize:35,borderBottomWidth:1, borderColor:"black",width:Dimensions.get('window').width -60,
  marginTop:40 }}
   placeholder = {"email"}  
   autoCorrect = {false}
   autoCapitalize = {"none"}
   value = {Email}
   onChangeText = {(text) => { setEmail(text)}}
  ></TextInput>
</View>
<View style = {{flex:0.3,justifyContent:"center", alignItems:"center"}}>
 <Continue  onPress = {() => {verifyEmail(), navigation.navigate('VerifyEmail')}}/>    
</View>
</View>
)
}
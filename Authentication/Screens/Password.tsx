import  React, {useState,useRef,useEffect} from 'react';
import { View, StyleSheet, Text, TextInput,TouchableOpacity,ScrollView,Image, FlatList,Picker,PanResponder,Animated, TouchableWithoutFeedback, SafeAreaView, Dimensions, KeyboardAvoidingView, Platform} from 'react-native';
import { useMutation,useQuery } from '@apollo/react-hooks';
import { Header, Continue } from '../../src/common/Common';
import RNPasswordStrengthMeter from 'react-native-password-strength-meter';
import { mutateSettings} from '../../networking'; 
import {Button} from 'react-native-elements'; 
export default function Password({navigation}){
    const [password, setPassword] = useState("");
    const [retype, setretype] = useState(""); 
    const [error,setError] = useState(false);
    const [shortError, setShortError] = useState(false); 
    
    const errorTemplate = error ? <Text style = {{fontSize:14, color:"red", marginLeft:10 }}>"Passwords dont match"</Text>:null; 
    const shortErrorTemplate = shortError ? <Text style = {{fontSize:14, color:"red", marginLeft:10, marginTop:10 }}>Password too short</Text>:null; 

 const MAX_LEN = 15,
 MIN_LEN = 6,
 PASS_LABELS = ["Too Short", "Weak", "Normal", "Strong", "Secure"];
 const disable = password == retype && password.length > 7 ? false:true; 
 const color = password == retype && password.length > 7 ? "green":"white"; 
 
 const _handlePasswordCheck = () => {
      if(password !== retype  ){
            setError(true); 
            return; 
      } 
      setError(false); 

 }
 const _handleLength = () => {
       if(password.length < 7){
             setShortError(true); 
             return; 
       }
       setShortError(false); 
 }

return(
<KeyboardAvoidingView style = {{flex:1}} behavior={Platform.OS == "ios" ? "padding" : "height"}>
<View style = {{flex:1, }}>
<View style = {{flex:0.2}}>

</View>
<View style = {{flex:0.5, marginLeft:30}}>
<Header text = {"Set a Password"} />
<View style = {{borderBottomWidth:0.4, width:Dimensions.get('window').width - 60, marginTop:20}}/> 
<RNPasswordStrengthMeter
          onChangeText={(text) => {setPassword(text), _handleLength()}}
          meterType="bar"
          autocapitalise = {false}
          autoCorrect = {false}
        />
{shortErrorTemplate}        
<TextInput 
style = {{fontSize:15, borderBottomWidth:1, borderColor:"black",width:Dimensions.get('window').width -60,  marginTop:30, marginLeft:10 }} placeholder = {"Retype password"} onChangeText = {async (text) => {await setretype(text), _handlePasswordCheck()} } autoCorrect = {false} autoCapitalize = {"none"}
secureTextEntry = {true}

>
</TextInput> 
{password !== retype && password.length > 7 && retype.length > 3 ? <Text style = {{fontSize:14, color:"red", marginLeft:10, marginTop:10 }}>Password dont match</Text>:null}
      

</View>
<View style = {{flex:0.3,justifyContent:"center", }}>
 {/* <Continue   disabled = {disable} backgroundColor = {color} onPress = {() => {mutateSettings({password:password}),navigation.navigate('Birthday')}}/>     */}
 <Button
  title="Continue"
  type="outline"
  disabled = {disable}
  containerStyle = {{backgroundColor:"black",marginLeft:30, marginRight:30}}
  titleStyle = {{color:"white", fontWeight:"700"}}
  disabledStyle = {{backgroundColor:"grey",}}
  onPress = {() => {mutateSettings({password:password},[]), navigation.navigate('LoadContacts')}}
/>
</View>
</View>
</KeyboardAvoidingView>
)
}




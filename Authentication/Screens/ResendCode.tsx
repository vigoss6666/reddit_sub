import  React, {useState,useRef,useEffect, useContext} from 'react';
import { Platform, View, StyleSheet, Text, TextInput,TouchableOpacity,ScrollView,Image, FlatList,Picker,PanResponder,Animated, TouchableWithoutFeedback, SafeAreaView, Dimensions,Keyboard} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import {Header, Continue} from '../../src/common/Common'; 
import { AntDesign } from '@expo/vector-icons';
import {Button} from 'react-native-elements'; 
import DropDownPicker from 'react-native-dropdown-picker';
 import AppContext from '../../AppContext'; 
import {updateUser} from '../../networking'; 
import { MaterialIcons } from '@expo/vector-icons';
import { CardStyleInterpolators } from '@react-navigation/stack';
import { FirebaseRecaptchaVerifierModal, FirebaseRecaptchaBanner } from 'expo-firebase-recaptcha';
import {firebase} from '../../config';


export default function Height({navigation,route}){
    const insets = useSafeAreaInsets();
    const myContext = useContext(AppContext); 
    const {userId, CustomBackComponent,globalPhoneNumber,setVID} = myContext;
    let [feet, setFeet] = useState(null); 
    const [timerState, setTimerState] = useState(true); 
    const firebaseConfig = firebase.apps.length ? firebase.app().options : undefined;
    const [message, showMessage] = React.useState(
    !firebaseConfig || Platform.OS === 'web'
      ? {
          text:
            'To get started, provide a valid firebase config in App.js and open this snack on an iOS or Android device.',
        }
      : undefined
  );
  const attemptInvisibleVerification = true;
     let [inches, setInches] = useState(null); 
    const [gate, setGate] = useState(true); 
    // useEffect(() => {
    //     navigation.setOptions({
    //       headerTitle:false, 
    //       headerLeft:() => <CustomBackComponent navigation = {navigation}/>
    //     })
    //   }, [])
    useEffect(() => {
        navigation.setOptions({
          headerShown:false
        })
      }, [])
      useEffect(() => {
        Keyboard.dismiss()
      },[])
    useEffect(() => {
       if(feet !== null && inches !== null){
           setGate(false)
           return; 
       } 
       setGate(true); 
    }, [feet, inches])  
    // const { page } = route.params;  

     

const _sendToServer = () => {
    updateUser(userId,{feet, inches} )
}   

const _handleTimer = () => {
    setTimerState(false)
    setTimeout(() => setTimerState(true), 60000);
     
}

const recaptchaVerifier = React.useRef(null);
const _resendCode = async () => {
  // The FirebaseRecaptchaVerifierModal ref implements the
  // FirebaseAuthApplicationVerifier interface and can be
  // passed directly to `verifyPhoneNumber`.
  try {
    const phoneProvider = new firebase.auth.PhoneAuthProvider();
    const verificationId = await phoneProvider.verifyPhoneNumber(
      globalPhoneNumber,
      recaptchaVerifier.current
    );
    
    setVID(verificationId); 
    
    
    
  } catch (err) {
    
  }
}
      
const _handleNavigation = () => {
     if(page == "DetailsSettings"){
          navigation.navigate("DetailsSettings")
          return; 
          
     }
     navigation.navigate('AddPhoto', {page:"something"})

}

return(
<View style = {{flex:1,backgroundColor:'#ffffff',paddingTop:insets.top}}>
<FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={firebaseConfig}
        attemptInvisibleVerification={true}
      />
<View style = {{flex:0.2,alignItems:'center'}}>
 <TouchableOpacity onPress = {() => navigation.goBack()}>
<MaterialIcons name="keyboard-arrow-down" size={40} color="black" />
</TouchableOpacity>   
</View>
<View style = {{flex:0.5, marginLeft:30,marginRight:30}}>
<Header text = {"Resend my code"}/>
<Text style = {{marginTop:10,fontWeight:'500'}}>Didn't receive your verification code? Press the button below to send a new one.</Text>
{!timerState ? <Text style = {{marginTop:100,fontSize:17, color:'red',fontStyle:'italic',marginRight:30}}>Code resent! Please wait 60 seconds before requesting again</Text>:null}



</View>
<View style = {{flex:0.3,justifyContent:"center", }}>
{/* <Continue backgroundColor = {"green"} onPress = {() => {navigation.navigate('Posted')}}/> */}
<Button
  title={timerState ? "Resend Code":"Try Again In 60 Seconds"}
  type="outline"
  containerStyle = {{backgroundColor:"black",marginLeft:30, marginRight:30}}
  titleStyle = {{color:"white", fontWeight:"bold"}}
  disabledStyle = {{backgroundColor:"grey",}}
  disabledTitleStyle = {{color:'white'}}
//   onPress = {() => {_sendToServer(), _handleNavigation()}}  
  onPress = {() => {_handleTimer(), _resendCode()}}
  disabled = {!timerState}
/>
</View>
</View>
)
}
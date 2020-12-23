import  React, {useState,useRef,useEffect} from 'react';
import { View, StyleSheet, Text, TextInput,TouchableOpacity,ScrollView,Image, FlatList,Picker,PanResponder,Animated, TouchableWithoutFeedback, SafeAreaView} from 'react-native';

import { AntDesign } from '@expo/vector-icons';
import { gql } from 'apollo-boost';
import {Button} from 'react-native-elements'; 
import { FirebaseRecaptchaVerifierModal, FirebaseRecaptchaBanner } from 'expo-firebase-recaptcha';
import {firebase} from '../../config';





export default function Phone({navigation,route}){
  const recaptchaVerifier = React.useRef(null);
  const [phoneNumber, setPhoneNumber] = React.useState();
  const [verificationId, setVerificationId] = React.useState();
  const [verificationCode, setVerificationCode] = React.useState();
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

  return (
    <View style={{ padding: 20, marginTop: 50 }}>
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={firebaseConfig}
        attemptInvisibleVerification={attemptInvisibleVerification}
      />
      <Text style={{ marginTop: 20 }}>Enter phone number</Text>
      <TextInput
        style={{ marginVertical: 10, fontSize: 17 }}
        placeholder="+1 999 999 9999"
        autoFocus
        autoCompleteType="tel"
        keyboardType="phone-pad"
        textContentType="telephoneNumber"
        onChangeText={phoneNumber => setPhoneNumber(phoneNumber)}
      />
      <Button
        title="Send Verification Code"
        disabled={!phoneNumber}
        onPress={async () => {
          // The FirebaseRecaptchaVerifierModal ref implements the
          // FirebaseAuthApplicationVerifier interface and can be
          // passed directly to `verifyPhoneNumber`.
          try {
            const phoneProvider = new firebase.auth.PhoneAuthProvider();
            const verificationId = await phoneProvider.verifyPhoneNumber(
              phoneNumber,
              recaptchaVerifier.current
            );
            setVerificationId(verificationId);
            showMessage({
              text: 'Verification code has been sent to your phone.',
            });
          } catch (err) {
            showMessage({ text: `Error: ${err.message}`, color: 'red' });
          }
        }}
      />
      <Text style={{ marginTop: 20 }}>Enter Verification code</Text>
      <TextInput
        style={{ marginVertical: 10, fontSize: 17 }}
        editable={!!verificationId}
        placeholder="123456"
        onChangeText={setVerificationCode}
      />
      <Button
        title="Confirm Verification Code"
        disabled={!verificationId}
        onPress={async () => {
          try {
            const credential = firebase.auth.PhoneAuthProvider.credential(
              verificationId,
              verificationCode
            );
            await firebase.auth().signInWithCredential(credential);
            showMessage({ text: 'Phone authentication successful 👍' });
            navigation.navigate('Name')
          } catch (err) {
            showMessage({ text: `Error: ${err.message}`, color: 'red' });
          }
        }}
      />
      {message ? (
        <TouchableOpacity
          style={[
            StyleSheet.absoluteFill,
            { backgroundColor: 0xffffffee, justifyContent: 'center' },
          ]}
          onPress={() => showMessage(undefined)}>
          <Text
            style={{
              color: message.color || 'blue',
              fontSize: 17,
              textAlign: 'center',
              margin: 20,
            }}>
            {message.text}
          </Text>
        </TouchableOpacity>
      ) : (
        undefined
      )}
      {attemptInvisibleVerification && <FirebaseRecaptchaBanner />}
    </View>
  );
    // const dial_code = React.useRef(navigation.getParam('dial_code')).current; 
    // const country = React.useRef(navigation.getParam('code')).current;
//     const recaptchaVerifier = React.useRef(null);
//     const [phoneNumber, setPhoneNumber] = React.useState();
//     const [verificationId, setVerificationId] = React.useState();
//     const [verificationCode, setVerificationCode] = React.useState();
//     const firebaseConfig = firebase.apps.length ? firebase.app().options : undefined;
//     const attemptInvisibleVerification = false;
     

     
    
//     let dial_code = "+1"; 
//     let code = 'US'; 

//     if(route.params){
//      if(route.params.code){
//           dial_code = route.params.dial_code;  
//      }
//      if(route.params.code){
//           code = route.params.code; 
//      }
// }

 
//     const [phone, setPhone] = useState(); 
    
//     const [clicker,setclicker] = React.useState({color:"grey", disabled:true}); 
//     function validator(input){
//          console.log(input)
//          if(input.length >= 7){
//               setclicker({color:"red", disabled:false})
//               return; 
//          }
//          setclicker({color:"grey", disabled:true})
//     } 
//      return (
//           <View style = {{flex:1,}}>
//    <FirebaseRecaptchaVerifierModal
//         ref={recaptchaVerifier}
//         firebaseConfig={firebaseConfig}
//         attemptInvisibleVerification={attemptInvisibleVerification}
//       />
//       <FirebaseRecaptchaBanner />

               {/* <View style = {{flex:0.1}}>
               </View>     
               <View style = {{flex:0.9}}>
        
               <Text style = {{marginTop:50,fontSize:40,fontWeight:"bold"}}> My Number Is... </Text>
               <Text style = {{marginTop:30,alignSelf:"center",textAlign:"center", marginBottom:20}}> When you tap "continue," we will send a text with verification code. Message and data rates may apply. </Text>
               <View style = {{borderBottomWidth:1, marginBottom:20}}>

               </View>
               <View style = {{flexDirection:"row",}}>
                <TouchableOpacity 
                style = {{borderBottomWidth:1,borderColor:"black",flexDirection:"row",justifyContent:"space-between", alignItems:"center",flex:1,padding:10}}
                onPress = {() => {navigation.navigate('CountryCodes', {page:"Phone"})}}
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
               </View> */}
                 {/* <View style = {{flex:0.2}}> */}
       
                   {/* <TouchableOpacity 
                   style = {{width:300,backgroundColor:clicker.color, alignSelf:"center",height:40,justifyContent:"center",alignItems:"center",borderRadius:30,marginTop:40}} disabled = {clicker.disabled}
                   onPress = {() => {registerPhone({variables:{phoneNumber:parseInt(phone)}}), navigation.navigate('VerifyPhone', {page:page})}}
                   >
                       <Text style = {{textAlign:"center",color:"white",fontWeight:"500",fontSize:20}}> Continue</Text>
                   </TouchableOpacity> */}
                   {/* <Button
  title="Continue"
  type="outline"
  containerStyle = {{backgroundColor:"black",marginLeft:30, marginRight:30}}
  titleStyle = {{color:"white", fontWeight:"700"}}
  disabled = {clicker.disabled}
  disabledStyle = {{backgroundColor:"grey",}}
  onPress = {() => {navigation.navigate('VerifyPhone', {page:page}) }}
/> */}
       
                   {/* </View> */}
          // </View>
     // )
}
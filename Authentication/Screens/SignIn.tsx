import  React, {useState,useRef,useEffect, useContext} from 'react';
import { View, StyleSheet, Text, TextInput,TouchableOpacity,ScrollView,Image, FlatList,Picker,PanResponder,Animated, TouchableWithoutFeedback, SafeAreaView, AsyncStorageStatic} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppContext from '../../AppContext';

import { AntDesign, FontAwesome5 } from '@expo/vector-icons';
import { gql } from 'apollo-boost';
import {Button} from 'react-native-elements'; 
import { FirebaseRecaptchaVerifierModal, FirebaseRecaptchaBanner } from 'expo-firebase-recaptcha';
import {firebase} from '../../config';


const db = firebase.firestore(); 
const auth = firebase.auth(); 

export default function SignIn({navigation}) {
  const myContext = useContext(AppContext);
  const {CustomBackComponent, setTempId, dialCode, countryCode, setUser} = myContext;
  const recaptchaVerifier = React.useRef(null);
  const storeData = async (value:string) => {
    try {
      await AsyncStorage.setItem('user', value)
    } catch (e) {
      // saving error
    }
  }
  useEffect(() => {
    navigation.setOptions({
      headerTitle:false, 
      headerLeft:() => <CustomBackComponent navigation = {navigation}/>
    })
  }, []) 
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
      <View style = {{flexDirection:'row', alignItems:'center', marginTop:5,marginBottom:10}}>
      <TouchableOpacity style = {{flexDirection:'row', marginRight:20,  height:40}} onPress = {() => navigation.navigate('CountryCodes', {page:'SignIn'})}>
        <Text style = {{borderWidth:0.5,padding:10,}}>
             {/* {countryCode}
               {dialCode} */}
               {countryCode} {dialCode}
    
        </Text>
        <View style = {{borderWidth:0.5,padding:10}}>
        <FontAwesome5 name="caret-down" size={24} color="black" />
        </View>
    
    
    </TouchableOpacity>
      <TextInput
        style={{ marginVertical: 10, fontSize: 17 }}
        placeholder="999 999 9999"
        autoFocus
        autoCompleteType="tel"
        keyboardType="phone-pad"
        textContentType="telephoneNumber"
        onChangeText={phoneNumber => setPhoneNumber(dialCode+phoneNumber)}
      />
      </View>
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
                

            firebase.auth().signInWithCredential(credential).then(async onfulfilled => {
               if(onfulfilled.user){
                  
                  await db.collection('user').doc(phoneNumber).get().then(async onDoc => {
                      if(onDoc.exists){
                        setUser(onDoc.data())  
                        await AsyncStorage.setItem('user', phoneNumber); 
                       navigation.navigate('Homer');     
                      }
                      showMessage({ text: 'PhoneNumber not found' }); 
                  })  
                  
                  

                  

                  
                  
                  
               }
               
            }).catch(err => {
              showMessage({ text: `Error: ${err.message}`, color: 'red' });
            }) 
            
            
            
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
}
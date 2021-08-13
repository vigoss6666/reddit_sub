import  React, {useState,useRef,useEffect,useContext} from 'react';
import { View, StyleSheet, Text, TextInput,TouchableOpacity,ScrollView,Image,FlatList,Picker,PanResponder,Animated, TouchableWithoutFeedback, SafeAreaView} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useMutation,useQuery } from '@apollo/react-hooks';
import {Header, Continue } from '../../src/common/Common'; 
import {Button} from 'react-native-elements'; 
import AppContext from '../../AppContext'; 
import {updateUser} from '../../networking';
import {firebase} from '../../config';
import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell,
  } from 'react-native-confirmation-code-field';
import { gql } from 'apollo-boost';
import { MaterialIcons } from '@expo/vector-icons';

  const styles = StyleSheet.create({
    root: {flex: 1, padding: 20},
    title: {textAlign: 'center', fontSize: 30},
    codeFieldRoot: {marginTop: 20},
    cell: {
      width: 40,
      height: 40,
      lineHeight: 38,
      fontSize: 24,
      borderWidth: 2,
      borderColor: '#00000030',
      textAlign: 'center',
    },
    focusCell: {
      borderColor: '#000',
    },
  });
  const CELL_COUNT = 6;

  
  
export default function VerifyPhone({navigation, route}){
    // const {page} = route.params; 
    // console.log("page on verify phone:"+page)
    const myContext = useContext(AppContext); 
    const {userId,CustomBackComponent,vID, globalPhoneNumber,setTempId,db,setId,setUser} = myContext;
    const [loading,setLoading] = useState(false); 
    // const {verificationId} = route.params; 
    useEffect(() => {
      navigation.setOptions({
        headerTitle:false, 
        headerLeft:() => <CustomBackComponent navigation = {navigation}/>
      })
    }, [])
    
    const [verificationCode, setVerificationCode] = React.useState(0);
    const firebaseConfig = firebase.apps.length ? firebase.app().options : undefined;
    let error = useRef(false).current;   
    const [message, showMessage] = React.useState(
      !firebaseConfig || Platform.OS === 'web'
        ? {
            text:
              'To get started, provide a valid firebase config in App.js and open this snack on an iOS or Android device.',
          }
        : undefined
    );
    console.log(verificationCode)
    useEffect(() => {
      if(verificationCode.length == 6){
        setLoading(true)
        _checkVerification();   
      }
    }, [verificationCode])
    const _checkVerification =  async () => {
      try {
        const credential = firebase.auth.PhoneAuthProvider.credential(
          vID,
          verificationCode
        );
            

        firebase.auth().signInWithCredential(credential).then(async onfulfilled => {
           if(onfulfilled.user){
            // await db.collection('user').doc(phoneNumber).get().then(async onDoc => {
            //   if(onDoc.exists){
            //     setUser(onDoc.data())  
            //     await AsyncStorage.setItem('user', phoneNumber); 
            //    navigation.navigate('Homer');     
            //   }
          //   await db.collection('user').doc(globalPhoneNumber).get().then(async onDoc => {
          //     if(onDoc.exists){
          //       const user = onDoc.data(); 
          //       if(user.appUser){
          //         setUser(onDoc.data())  
          //         await AsyncStorage.setItem('user', globalPhoneNumber); 
          //         navigation.navigate('Homer');     
          //       }
                
          //     }
              
          // })
              
              setTempId(globalPhoneNumber)
              navigation.navigate('FirstName'); 
              console.log("Verification has been successfull"); 
              //console.log(phoneNumber)
              //setTempId(phoneNumber)
              //navigation.navigate('Name')
             
              // db.collection('invitationSent').where('client', '==', phoneNumber).get().then(async onDocs => {
              //   if(!onDocs.empty){
              //     const docs = onDocs.docs.map(val => val.data()); 
              //     const finaler = await Promise.all(docs.map(async val => {
              //      return db.collection('user').doc(val.matchMaker).set({points:firebase.firestore.FieldValue.arrayUnion({pointFor:'invitationAccepted',point:50, client:val.client, createdAt:new Date()})}, {merge:true})
              //   }))
              //   navigation.navigate('Name')
              //   }
              //   navigation.navigate('Name')
                
              // })
              

              // showMessage({ text: 'Phone authentication successful 👍' })

              
              //navigation.navigate('Name'); 
              
           }
           
        }).catch(err => {
          showMessage({ text: `Error: ${err.message}`, color: 'red' });
        }) 
        
        
        
      } catch (err) {
        showMessage({ text: `Error: ${err.message}`, color: 'red' });
      }
    }

    
     
    const [value, setValue] = useState('');
    const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
      value,
      setValue,
    });
    
   
   
  return(
  <View style = {{flex:1, justifyContent:'center', backgroundColor:'white'}}>
  
  <View style = {{flex:0.4 }}>
  <Header text = {"Enter verification code "} style = {{alignSelf:"flex-start",marginLeft:30, marginRight:30,marginTop:30}}/>
  <Text style = {{alignSelf:"flex-start",marginLeft:30, marginRight:30,fontWeight:'500', marginTop:10,marginBottom:50}}>Code sent to {globalPhoneNumber}</Text>
  <View style = {{borderBottomWidth:1,marginLeft:30, marginRight:30,marginBottom:30}}>

  </View>
  <View style = {{marginLeft:30,marginRight:30}}>
  <CodeField
                 
          ref={ref}
          {...props}
          value={verificationCode}
          onChangeText={(text) => {setVerificationCode(text), error = false}}
          cellCount={CELL_COUNT}
          rootStyle={styles.codeFieldRoot}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          renderCell={({index, symbol, isFocused}) => (
            <Text
              key={index}
              style={[styles.cell, isFocused && styles.focusCell]}
              onLayout={getCellOnLayoutHandler(index)}>
              {symbol || (isFocused ? <Cursor /> : null)}
            </Text>
          )}
        />
        </View>
        <View style = {{borderBottomWidth:1,marginLeft:30, marginRight:30,marginBottom:30,marginTop:30}}>

  </View>
     {error ? <Text style = {{alignSelf:"center", color:"red", fontSize:14,marginTop:10}}>code didnt match </Text>:null}   
  </View>
  <View style = {{flex:0.6,}}>
  
  {/* <TouchableOpacity onPress = {() => {_handleVerification()}} style = {{height:30, width:200,borderWidth:1,justifyContent:"center", alignItems:"center",backgroundColor:'black'}}>
      <Text style = {{color:'white', fontWeight:'600'}}>Verify Code</Text>
  </TouchableOpacity> */}
  {/* <TouchableOpacity onPress = {() => {_handleVerification()}} style = {{height:30, width:200,borderWidth:1,justifyContent:"center", alignItems:"center",backgroundColor:'black'}}>
      <Text style = {{color:'white', fontWeight:'600'}}>Verify Code</Text>
  </TouchableOpacity> */}
  <Button
  title="Verify"
  type="outline"
  disabled = {verificationCode.length < 6 ? true : false}
  containerStyle = {{backgroundColor:"black",marginLeft:30, marginRight:30}}
  titleStyle = {{color:"white", fontWeight:"700"}}
  disabledStyle = {{backgroundColor:"grey",}}
  loading = {loading}
  // onPress = {() => { navigation.navigate('PhoneSuccess', {page})}}
/>
<TouchableOpacity style = {{marginTop:30,flexDirection:'row',justifyContent:'center', alignItems:'center'}} onPress = {() => navigation.navigate('ResendCode')}>
    <Text> HELP </Text>
    <MaterialIcons name="keyboard-arrow-down" size={24} color="black" />
    

</TouchableOpacity>
  {/* <TouchableOpacity onPress = {() => {_handleResend()}}>
  <Text style = {{marginTop:10,}}>Resend Code</Text>
  </TouchableOpacity> */}
  </View>
  </View>
  )
}
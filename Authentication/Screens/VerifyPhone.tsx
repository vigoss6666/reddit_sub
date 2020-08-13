import  React, {useState,useRef,useEffect} from 'react';
import { View, StyleSheet, Text, TextInput,TouchableOpacity,ScrollView,Image, Button,FlatList,Picker,PanResponder,Animated, TouchableWithoutFeedback, SafeAreaView} from 'react-native';
import { useMutation,useQuery } from '@apollo/react-hooks';
import {Header, Continue } from '../../src/common/Common'; 
import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell,
  } from 'react-native-confirmation-code-field';
import { gql } from 'apollo-boost';
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

  const VERIFY_PHONE_CODE = gql`
   mutation namer($phoneCode:Float! ){
        verifyPhoneCode(phoneCode:$phoneCode)
   }
  `; 
  const RESEND_PHONE = gql`
   mutation {
        resendPhone
   }
  `;
export default function VerifyPhone({navigation}){
    const [verifyPhoneCode, {data}] = useMutation(VERIFY_PHONE_CODE); 
    const [resendPhone] = useMutation(RESEND_PHONE);
    let error = useRef(false).current;   
    if(data){
         if(data.verifyPhoneCode){
              navigation.navigate('PhoneSuccess')
              error = false; 
         }
         else if(data.verifyPhoneCode == false){
            error = true;    
         }
          
    }
     
    const [value, setValue] = useState('');
    const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
      value,
      setValue,
    });
    
   const _handleResend = () => {
        
        resendPhone(); 
   }
   const _handleVerification = () => {
       verifyPhoneCode({variables:{phoneCode:parseInt(value)}})  
    }
  return(
  <View style = {{flex:1, justifyContent:'center', alignItems:'center'}}>
  <View style = {{flex:0.2}}>
  
  </View>
  <View style = {{flex:0.5, }}>
  <Header text = {"Verify Phone"} style = {{alignSelf:"center"}}/>
  <Text>A sms has been sent on the number</Text>
  <Text style = {{alignSelf:"center"}}>Please enter the code here</Text>
  <CodeField
          ref={ref}
          {...props}
          value={value}
          onChangeText={(text) => {setValue(text), error = false}}
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
     {error ? <Text style = {{alignSelf:"center", color:"red", fontSize:14,marginTop:10}}>code didnt match </Text>:null}   
  </View>
  <View style = {{flex:0.3,justifyContent:"center",alignItems:"center"}}>
  
  <TouchableOpacity onPress = {() => {_handleVerification()}} style = {{height:30, width:200,borderWidth:1,justifyContent:"center", alignItems:"center",backgroundColor:'black'}}>
      <Text style = {{color:'white', fontWeight:'600'}}>Verify Code</Text>
  </TouchableOpacity>
  <TouchableOpacity onPress = {() => {_handleResend()}}>
  <Text style = {{marginTop:10,}}>Resend Code</Text>
  </TouchableOpacity>
  </View>
  </View>
  )
}
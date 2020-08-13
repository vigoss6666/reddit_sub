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

  const VERIFY_CODE = gql`
   mutation namer($code:Float! = 866528){
        verifyEmailCode(code:$code)
   }
  `; 
  const RESEND_EMAIL = gql`
   mutation {
        resendMail
   }
  `; 
export default function VerifyEmail({navigation}){
  const [verifyCode, {data}] = useMutation(VERIFY_CODE)
  const [resendEmail] = useMutation(RESEND_EMAIL); 
   
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  let error = false; 
  if(data){
       if(data.verifyEmailCode){
            navigation.navigate('EmailVerified')
       }
       error = true; 
   
       
  }
 const _handleResend = () => {
      resendEmail(); 
 }
 const _handleVerification = () => {
     verifyCode({variables:{code:parseInt(value)}});   
  }
return(
<View style = {{flex:1, justifyContent:'center', alignItems:'center'}}>
<View style = {{flex:0.2}}>

</View>
<View style = {{flex:0.5}}>
<Header text = {"Verify Email Address"}/>
<Text>An email has been sent with a verification code.</Text>
<Text style = {{alignSelf:"center"}}>Please enter the code here</Text>
<CodeField
        ref={ref}
        {...props}
        value={value}
        onChangeText={(text) => {setValue(text)}}
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
      {error ? <Text style = {{alignSelf:'center'}}>Code did not match</Text>:null }
</View>
<View style = {{flex:0.3,justifyContent:"center",alignItems:"center"}}>

<TouchableOpacity onPress = {() => {_handleVerification()}} style = {{height:30, width:200,borderWidth:1,justifyContent:"center", alignItems:"center",backgroundColor:'black'}}>
    <Text style = {{color:'white', fontWeight:'600'}}>Verify</Text>
</TouchableOpacity>
<TouchableOpacity onPress = {() => {_handleResend()}}>
<Text style = {{marginTop:10,}}>Resend Email</Text>
</TouchableOpacity>
</View>
</View>
)
}
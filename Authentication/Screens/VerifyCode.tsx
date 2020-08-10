import  React, {useState,useRef,useEffect} from 'react';
import { Dimensions,View, StyleSheet, Text, TextInput,TouchableOpacity,ScrollView,Image, Button,FlatList,Picker,PanResponder,Animated, TouchableWithoutFeedback, SafeAreaView} from 'react-native';
import { useMutation,useQuery } from '@apollo/react-hooks';
import {Header} from '../../src/common/Common'; 
export default function VerifyCode({navigation}){
return(
<View style = {{flex:1, }}>
<View style = {{flex:0.2}}>

</View>
<View style = {{flex:0.5, marginLeft:30}}>
<Header text = {"My Email is...."} />
<View style = {{borderBottomWidth:0.4, width:Dimensions.get('window').width - 60, marginTop:20}}/> 
<TextInput style = {{fontSize:35,borderBottomWidth:1, borderColor:"black",width:Dimensions.get('window').width -60,  marginTop:40 }} placeholder = {"email"}  autoCorrect = {false} value = {Email}></TextInput>
</View>
<View style = {{flex:0.3,justifyContent:"center", alignItems:"center"}}>
   
</View>
</View>
)
}
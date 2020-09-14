import  React, {useState,useRef,useEffect} from 'react';
import { View, StyleSheet, Text, TextInput,TouchableOpacity,ScrollView,Image, FlatList,Picker,PanResponder,Animated, TouchableWithoutFeedback, SafeAreaView} from 'react-native';
import { useMutation,useQuery } from '@apollo/react-hooks';
import {Button} from 'react-native-elements'; 
import { AntDesign } from '@expo/vector-icons';
import {Header} from '../../src/common/Common'; 
export default function PhoneSuccess({navigation,route}){
const {page} = route.params; 
console.log("Pgae is"+page)

const _handlePage = () => {

   if(page == "AccountSettings"){
      navigation.navigate('AccountSettings')
      return
   }
    navigation.navigate('Name')
}
return(
<View style = {{flex:1, }}>
<View style = {{flex:0.2 }}>

</View>
<View style = {{flex:0.5, justifyContent:"center", alignItems:"center"}}>
<AntDesign name="checkcircleo" size={60} color="black" />
<Text style = {{fontSize:20, }}>Your Number has been Verified </Text>
</View>
<View style = {{flex:0.3, justifyContent:"center", }}>
{/* <TouchableOpacity style = {{borderWidth:1,  borderRadius:25, backgroundColor:"black", width:100, padding:30}}
onPress = {() => {navigation.navigate('Email')}}
>
    <Text style = {{color:"white", fontWeight:"600"}}>Done</Text>
</TouchableOpacity> */}
<Button
  title="Continue"
  type="outline"
  containerStyle = {{backgroundColor:"black",marginLeft:30, marginRight:30}}
  titleStyle = {{color:"white", fontWeight:"700"}}
  disabledStyle = {{backgroundColor:"grey",}}
  onPress = {() => { _handlePage()}}
/>
</View>

</View>
)
}
import  React, {useState,useRef,useEffect,FunctionComponent} from 'react';
import { View, StyleSheet, Text, TextInput,TouchableOpacity,ScrollView,Image, Button,FlatList,Picker,PanResponder,Animated, TouchableWithoutFeedback, SafeAreaView} from 'react-native';
export interface HeaderProps {
text:string,    
style?:any 
}

export const Header:FunctionComponent<HeaderProps>= (props) => {
//     let [fontsLoaded] = useFonts({
//         Roboto_400Regular,
//       });
    
//       if (!fontsLoaded) {
//         return <Text>App is loading</Text>;
//       }
return(
<View style = {[props.style]}>
<Text style = {{fontSize:35, fontWeight:'500', }}>{props.text}</Text>
</View>
)
}

interface ContinueProps {
disabled?:boolean
backgroundColor?:string  
onPress?:any   
text?:any
style?:any
}

export const Continue:FunctionComponent<ContinueProps>  = (props) => {
     const texter = props.text ? props.text : "Continue"
     return (
          <TouchableOpacity
          onPress = {() => props.onPress()}
          style = {[{height:50, width:200, borderRadius:25,borderWidth:1, justifyContent:"center", alignItems:"center",backgroundColor:props.backgroundColor }, props.style]} disabled = {props.disabled} >
           <Text>{texter} </Text>     
          </TouchableOpacity>
     )
}





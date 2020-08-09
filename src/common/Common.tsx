import  React, {useState,useRef,useEffect,FunctionComponent} from 'react';
import { View, StyleSheet, Text, TextInput,TouchableOpacity,ScrollView,Image, Button,FlatList,Picker,PanResponder,Animated, TouchableWithoutFeedback, SafeAreaView} from 'react-native';
import { useFonts, Roboto_400Regular } from '@expo-google-fonts/roboto';
export interface HeaderProps {
text:string,    
style?:any 
}

export const Header:FunctionComponent<HeaderProps>= (props) => {
    let [fontsLoaded] = useFonts({
        Roboto_400Regular,
      });
    
      if (!fontsLoaded) {
        return <Text>App is loading</Text>;
      }
return(
<View style = {[props.style]}>
<Text style = {{fontSize:35, fontWeight:'500', fontFamily: 'Roboto_400Regular',}}>{props.text}</Text>
</View>
)
}

interface ContinueProps {
disabled?:boolean
backgroundColor?:string     
}

export const Continue:FunctionComponent<ContinueProps>  = (props) => {
     return (
          <TouchableOpacity style = {{height:50, width:200, borderRadius:25,borderWidth:1, justifyContent:"center", alignItems:"center",backgroundColor:props.backgroundColor }} disabled = {props.disabled} >
           <Text>Continue</Text>     
          </TouchableOpacity>
     )
}





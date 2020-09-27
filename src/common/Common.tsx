import  React, {useState,useRef,useEffect,FunctionComponent} from 'react';
import { View, StyleSheet, Text, TextInput,TouchableOpacity,ScrollView,Image, FlatList,Picker,PanResponder,Animated, TouchableWithoutFeedback, SafeAreaView} from 'react-native';
import {Button, Icon} from 'react-native-elements'; 
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
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
export const HeaderBar = (props) => {
     const [selected, setSelected] = useState(); 
     return (
          <View style = {{flex:1,flexDirection:"row",marginLeft:10, marginRight:10,marginTop:10, marginBottom:10}}>
          <TouchableOpacity style = {{flex:0.5,  }} >
          <Entypo name="controller-play" size={40} color  = {props.page == "PlayGame" ? 'yellow':'grey'} />    
          </TouchableOpacity>
          <TouchableOpacity style = {{flex:0.5}}>
          <FontAwesome name="trophy" size={40} color="grey" />
          </TouchableOpacity>
          <TouchableOpacity style = {{flex:0.5}} onPress = {() => props.navigation.navigate('ProfilePool')}>
          <Ionicons name="ios-people" size={props.page == "Friends" ? 55:40} color={props.page == "Friends" ? 'yellow':'grey'} />   
          </TouchableOpacity>
          <TouchableOpacity style = {{flex:0.5}}>
          <Entypo name="chat" size={40} color="grey" />  
          </TouchableOpacity>
          <TouchableOpacity style = {{flex:0.5,}} onPress = {() => props.navigation.navigate('SettingsHome')}>
          <MaterialIcons name="account-circle" size={props.page == "SettingsHome" ? 55:40} color={props.page == "SettingsHome" ? 'yellow':'grey'} />          
          </TouchableOpacity>
          </View> 
     ) 
}






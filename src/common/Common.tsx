import  React, {useState,useRef,useEffect,FunctionComponent, } from 'react';
import { View, StyleSheet, Text, TextInput,TouchableOpacity,ScrollView,Image, FlatList,Picker,PanResponder,Animated, TouchableWithoutFeedback, SafeAreaView} from 'react-native';
import {Button, Icon} from 'react-native-elements'; 
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import LottieView from 'lottie-react-native';
import { Audio } from 'expo-av';
import * as Permissions from 'expo-permissions';
import {usePermissions} from '@use-expo/permissions';
import { firebase } from '../../config'; 



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
          <TouchableOpacity style = {{flex:0.5,  }} onPress = {() => props.navigation.navigate('GameHomepage')}>
          <Entypo name="controller-play" size={40} color  = {props.page == "GameHomepage" ? 'yellow':'grey'} />    
          </TouchableOpacity>
          <TouchableOpacity style = {{flex:0.5}} onPress = {() => props.navigation.navigate('Trophy')}>
          <FontAwesome name="trophy" size={40} color={props.page == "trophy" ? 'yellow':'grey'} />
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
export function CustomChatInput({setRecording}) { 
     // const myComponent = useRef();
     // if(myComponent.current){
     //       myComponent.current.play()
     // }

     const [audioDuration, setAudioDuration] = useState(); 
     const [permission, askForPermission] = usePermissions(Permissions.AUDIO_RECORDING, { ask: true });
     const recordingInstance = useRef(new Audio.Recording());
     const [uri, setUri] = useState(); 
     
     useEffect(() => {
          if (!permission || permission.status !== 'granted') {

           askForPermission()
           
           
          }
          async function namer(){
          await recordingInstance.current.setOnRecordingStatusUpdate(onRecordingStatusUpdate)    
          await recordingInstance.current.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
          await recordingInstance.current.startAsync()
          }

          namer()
     }, [])
     const stopRecording = () => {
           recordingInstance.current.pauseAsync(); 
     }     

     
     const sendToServer = async () => {
           recordingInstance.current.stopAndUnloadAsync(); 
           const uri = await recordingInstance.current.getURI()
           const response = await fetch(uri); 
           const blob = await response.blob(); 
           const ref = await firebase.storage().ref().child("audio/"+"namer1"); 
           ref.put(blob).then().catch(error => console.log(error)) 
          }     

     const onRecordingStatusUpdate = (val) => {
          const millisToMinutesAndSeconds = (millis) => {
               var minutes = Math.floor(millis / 60000);
               var seconds = ((millis % 60000) / 1000).toFixed(0);
                //ES6 interpolated literals/template literals 
                  //If seconds is less than 10 put a zero in front.
               return `${minutes}:${(seconds < 10 ? "0" : "")}${seconds}`;
           }
           setAudioDuration(millisToMinutesAndSeconds(val.durationMillis))
     }

     
      
     
     
     

 return (
<View style = {{height:50,borderRadius:25, borderWidth:1, padding:5, marginLeft:20, marginRight:20, backgroundColor:"white"}}>
<View style = {{flexDirection:"row", justifyContent:"space-between", borderRadius:25}}>
<View style = {{flexDirection:"row", alignItems:"center",marginLeft:40,}}>
{/* <LottieView
          ref = {myComponent}
          style={{
            width: 40,
            height: 40,
            backgroundColor: '#eee',
          }}
          source={require('/Users/zaidshaikh/fhfclient/assets/35097-microphone.json')}
          // OR find more Lottie files @ https://lottiefiles.com/featured
          // Just click the one you like, place that file in the 'assets' folder to the left, and replace the above 'require' statement
        /> */}
  <View style = {{flexDirection:"row", marginLeft:20, alignItems:"center", justifyContent:"center"}}>
    <Text>{audioDuration}</Text>      
    
  </View>      
</View> 
<TouchableOpacity style = {{justifyContent:"center", marginLeft:40}} onPress = {() => { stopRecording()}}>
<Text style = {{color:"red", fontWeight:"bold"}}>Cancel</Text>
</TouchableOpacity>
<TouchableOpacity style = {{justifyContent:"center", alignItems:"center", marginRight:30}} onPress = {() => sendToServer()}>
<Ionicons name="ios-send" size={30} color="blue" />
</TouchableOpacity>

</View>    

</View>      
 )                  
} 





import  React, {useState,useRef,useEffect} from 'react';
import { View, StyleSheet, Text, TextInput,TouchableOpacity,ScrollView,Image, Button,FlatList,Picker,PanResponder,Animated, TouchableWithoutFeedback, SafeAreaView, Dimensions} from 'react-native';
import {Header,Continue} from '../../src/common/Common'; 
import { useFonts, Roboto_400Regular } from '@expo-google-fonts/roboto';

export default function Name({navigation}){
   const [firstName, setFirstName] = useState(""); 
   const [lastName, setLastName] = useState("");
   const [openGate, setOpenGate] = useState(true); 
   const [color, setColor] = useState("white")
   console.log(firstName)
   const handleFirstNameChange = async (event) => {
    handleOpenGate()
    const {eventCount, target, text} = event.nativeEvent;
        console.log(text)
        setFirstName(text);  
        
   }
   const handleLastNameChange = async (event) => {
    handleOpenGate()
    const {eventCount, target, text} = event.nativeEvent;
    console.log(text)   
    setLastName(text);
        
}
   const handleOpenGate = async () => {
        if(firstName.length >= 1 && lastName.length >= 1 ){
        await setOpenGate(false);
        await setColor("green")
        return; 
        }
        await setOpenGate(true); 
        await setColor("white");
        
        
   }
   
    let [fontsLoaded] = useFonts({
        Roboto_400Regular,
      });
      
      if (!fontsLoaded) {
        return <Text>App is loading</Text>;
      }    
return(
<View style = {{flex:1,}}>
<View style = {{flex:0.4}}>
</View>
<View style = {{flex:1}}>
<Header text = "My name is...." style = {{justifyContent:"center", alignItems: 'flex-start',marginLeft:30}}/>
<TextInput style = {{borderBottomWidth:0.5,opacity:0.3, borderColor:"grey",width:Dimensions.get('window').width -60, marginLeft:30 }}>

</TextInput>
<Text style = {{alignSelf:"flex-start", marginLeft:30,marginTop:10, fontFamily: 'Roboto_400Regular'}}>This is how it will appear to others</Text>
<TextInput style = {{fontSize:35,borderBottomWidth:1, borderColor:"black",width:Dimensions.get('window').width -60, marginLeft:30, marginTop:40 }} placeholder = {"FirstName"} onChange = {async (text) => {await handleFirstNameChange(text)}} autoCorrect = {false} value = {firstName}>


</TextInput>
<TextInput style = {{fontSize:35, borderBottomWidth:1, borderColor:"black",width:Dimensions.get('window').width -60, marginLeft:30, marginTop:30 }} placeholder = {"LastName"} onChange = {async (text) => {await handleLastNameChange(text)} } autoCorrect = {false} value = {lastName}></TextInput>
<TextInput style = {{borderBottomWidth:0.3, borderColor:"grey",opacity:0.5, width:Dimensions.get('window').width -60, marginLeft:30, marginTop:30 }} ></TextInput>
</View>

<View style = {{flex:1,  justifyContent:"center", alignItems:"center"}}>
 <View>
 <TouchableOpacity style = {{height:50, width:200, borderRadius:25,borderWidth:1, justifyContent:"center", alignItems:"center",backgroundColor:color }} disabled = {openGate} >
           <Text>Continue</Text>     
          </TouchableOpacity>
 </View>
</View>

</View>
)
}
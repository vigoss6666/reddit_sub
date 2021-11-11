import { Entypo, Ionicons, MaterialIcons } from '@expo/vector-icons';
import  React, {useState,useRef,useEffect, useContext} from 'react';
import { Text, View, StyleSheet, TouchableOpacity, TextInput, Keyboard } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AppContext from '../../AppContext'; 
import {updateUser} from '../../networking';
import { useFocusEffect } from '@react-navigation/native';

import {Button} from 'react-native-elements'; 
import Gender from './Gender';
interface GenderDetailProps {}

const GenderDetail = ({navigation,route}) => {
    const myContext = useContext(AppContext); 
    const {userId,setGlobalPhoneGender} = myContext;
    const insets = useSafeAreaInsets();
    const [gender, setGender] = useState(null); 
    const [gate, setGate] = useState(true); 
    const [genderText, setGenderText] = useState(""); 
    const {page} = route.params; 


    useEffect(() => {
      navigation.setOptions({
          headerShown:false
      })  
    }, [])
    useEffect(() => {
      Keyboard.removeAllListeners('keyboardDidShow')
      // return () => Keyboard.addListener('keyboardWillShow', () => {
      //    Keyboard.dismiss()
      // })
    }, [])

    const _sendToServer = () => {
        updateUser(userId, {genderIncludeMe:gender, genderText:genderText,gender:'trans'})
        setGlobalPhoneGender('trans'); 
        if(page == "DetailsSettings"){
    
          navigation.navigate("DetailsSettings")
          return; 
       }
        navigation.navigate('GenderPreference', {page:'something'})
    }    


    useEffect(() => {
        if(gender == null && genderText.length == 0){
             setGate(true); 
              
        }
        if(gender !== null && genderText.length == 0){
             setGate(true); 
             
        }
        if(gender !== null && genderText.length > 0){
            setGate(false)
        }
        
       
        
    }, [gender,genderText])
    console.log(genderText)
  return (
    <TouchableOpacity style={{flex:1,paddingTop:insets.top,backgroundColor:'white'}} onPress = {() => Keyboard.dismiss()}>
      <TouchableOpacity onPress = {() => navigation.navigate('Gender')} style = {{alignItems:'center'}}>
<MaterialIcons name="keyboard-arrow-up" size={40} color="black" />
</TouchableOpacity> 
<View style = {{marginLeft:30, marginRight:30,marginTop:50}}>
<Text style = {{fontSize:25,fontWeight:'bold'}}>
    Gender
</Text>
<View style = {{borderBottomWidth:1, marginTop:5}}/>
<TextInput style = {{fontSize:25,borderBottomWidth:1, borderColor:"black", marginTop:40 }} placeholder = {"Start Typing"} onChangeText = {(text) => {setGenderText(text)}} autoCorrect = {false} autoCapitalize = {'words'}>


</TextInput>
<Text style = {{fontSize:17,fontWeight:'bold',marginTop:150}}>
    Include me in searches for
</Text>
<View style = {{borderBottomWidth:1, marginTop:5}}/>
<View style = {{flexDirection:'row',justifyContent:'space-between',marginTop:20,marginLeft:10, marginRight:10}}>
<Text style = {{fontSize:20,fontWeight:'bold'}}>Men</Text>
<TouchableOpacity onPress = {() => setGender('male')}>
<Ionicons name="ios-man" size={35} color={gender == 'male' ? 'blue':'grey'} />
</TouchableOpacity>

</View>
<View style = {{borderBottomWidth:1, marginTop:5}}/>
<View style = {{flexDirection:'row',justifyContent:'space-between',marginTop:20,marginLeft:10, marginRight:10}}>
<Text style = {{fontSize:20,fontWeight:'bold'}}>Women</Text>
<TouchableOpacity onPress = {() => setGender('female')}>
<Ionicons name="ios-woman" size={35} color={gender == 'female' ? 'pink':'grey'} />
</TouchableOpacity>

</View>
<View style = {{borderBottomWidth:1, marginTop:5}}/>
<View style = {{flexDirection:'row',justifyContent:'space-between',marginTop:20,marginLeft:10, marginRight:10}}>
<Text style = {{fontSize:20,fontWeight:'bold'}}>Everyone</Text>

<TouchableOpacity onPress = {() => setGender('both')} style = {{flexDirection:'row'}}>
<Ionicons name="ios-man" size={35} color={gender == 'both' ? 'blue':'grey'} style = {{marginRight:5}}/>
<Ionicons name="ios-woman" size={35} color={gender == 'both' ? 'pink':'grey'} />
</TouchableOpacity>    


</View>
<View style = {{borderBottomWidth:1, marginTop:5}}/>
</View> 
<Button
  title="Continue"
  type="outline"
  containerStyle = {{backgroundColor:"black",marginLeft:30, marginRight:30,marginTop:100}}
  titleStyle = {{color:"white", fontWeight:"700"}}
  disabledStyle = {{backgroundColor:"grey",}}
  disabled = {gate}
  onPress = {() => { _sendToServer()}}
/>

    </TouchableOpacity>
  );
};

export default GenderDetail;

const styles = StyleSheet.create({
  container: {}
});

import { Entypo, Ionicons, MaterialIcons } from '@expo/vector-icons';
import  React, {useState,useRef,useEffect, useContext} from 'react';
import { Text, View, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AppContext from '../../AppContext'; 
import {updateUser} from '../../networking';

import {Button} from 'react-native-elements'; 
import Gender from './Gender';
interface GenderDetailProps {}

const GenderDetail = ({navigation}) => {
    const myContext = useContext(AppContext); 
    const {userId} = myContext;
    const insets = useSafeAreaInsets();
    const [gender, setGender] = useState(null); 
    const [gate, setGate] = useState(true); 
    const [genderText, setGenderText] = useState(""); 


    useEffect(() => {
      navigation.setOptions({
          headerShown:false
      })  
    }, [])

    const _sendToServer = () => {
        updateUser(userId, {genderIncludeMe:gender, gender:genderText})
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
        if(gender == null && genderText.length > 0){
            setGate(false)
        }
       
        
    }, [gender,genderText])
    console.log(genderText)
  return (
    <View style={{flex:1,paddingTop:insets.top,backgroundColor:'white'}}>
      <TouchableOpacity onPress = {() => navigation.goBack()} style = {{alignItems:'center'}}>
<MaterialIcons name="keyboard-arrow-down" size={40} color="black" />
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

    </View>
  );
};

export default GenderDetail;

const styles = StyleSheet.create({
  container: {}
});

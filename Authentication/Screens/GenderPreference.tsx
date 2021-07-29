import  React, {useState,useRef,useEffect, useContext} from 'react';
import {Keyboard, View, StyleSheet, Text, TextInput,TouchableOpacity,ScrollView,Image, FlatList,Picker,PanResponder,Animated, TouchableWithoutFeedback, SafeAreaView, Dimensions} from 'react-native';
import { useMutation,useQuery } from '@apollo/react-hooks';
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons'; 
import {Header,Continue} from '../../src/common/Common'; 
import {Button} from 'react-native-elements'; 
import { mutateSettings } from '../../networking';

import AppContext from '../../AppContext'; 
import {updateUser} from '../../networking'; 





export default function GenderPreference({navigation,route}){
const myContext = useContext(AppContext); 
const {userId, CustomBackComponent} = myContext; 
const {page} = route.params;     
const [man,setMan] = useState(false);
const [woman, setWoman] = useState(false);
const [both, setBoth] = useState(false); 
const manWidthColor = man ? "yellow":"black"; 
const womanWidthColor = woman ? "yellow":"black"; 
const bothWidthColor = both ? "yellow":"black";  
const gateColor = man || woman || both ? "green" : "white"; 
const gateGuard = man || woman || both ? false: true; 
useEffect(() => {
     Keyboard.dismiss()
     navigation.setOptions({
       headerTitle:false, 
       headerLeft:() => <CustomBackComponent navigation = {navigation}/>
     })
   }, [])  
useEffect(() => {
     
     Keyboard.dismiss() 
     
     
}, [])   

const _handlePage = () => {
     if(page == "AccountSettings"){
          navigation.navigate("AccountSettings")
          return; 
     }
     navigation.navigate('Height',{page:"something"})

}
const _sendToServer = () => {
     if(man){
          updateUser(userId, {genderPreference:"male"})
     }
     else if(woman){
          updateUser(userId, {genderPreference:"female"})     
    
     }
     else if(both){
          updateUser(userId, {genderPreference:"both"})
    
     }
}

return(
<TouchableOpacity style = {{flex:1,backgroundColor:'#ffffff'}} onPress = {Keyboard.dismiss}>
<View style = {{flex:0.1}}> 
     
</View>
<View style = {{flex:0.7}}>
<View style = {{marginLeft:30, marginRight:30}}>
<Header text = {"I'm looking for..."}/>
<Text style = {{fontWeight:"700", marginTop:10, marginBottom:10}}>Who do you want to be matched with?</Text>
</View>
<View style = {{marginLeft:30,  borderBottomWidth:1, marginTop:20, marginRight:30}}/>
<View>
<View style = {{flexDirection:"row", justifyContent:"space-around",marginTop:40 }}>
<View>
<TouchableOpacity 
style = {{width:100, height:100, justifyContent:"center", alignItems:"center", backgroundColor:manWidthColor, borderRadius:50}}
onPress = {() => {setMan(true), setWoman(false), setBoth(false)}}
>
<TouchableOpacity style = {{height:80, width:80, borderRadius:40,  borderWidth:0.3,justifyContent:"center", alignItems:"center",backgroundColor:"black"}}
onPress = {() => {setMan(true), setWoman(false)}}
>
<Ionicons name="ios-man" size={60} color="white" />
</TouchableOpacity>
</TouchableOpacity>
<Text style = {{alignSelf:"center", fontWeight:"700", marginTop:5}}>Man</Text>
</View>
<View>
<TouchableOpacity 
style = {{width:100, height:100, justifyContent:"center", alignItems:"center", backgroundColor:womanWidthColor, borderRadius:"50"}}
onPress = {() => {setWoman(true), setMan(false), setBoth(false)}}
>
<TouchableOpacity style = {{height:80, width:80, borderRadius:40, borderColor:'black', borderWidth:0.3,justifyContent:"center", alignItems:"center",backgroundColor:'black'}}
onPress = {() => {setWoman(true), setMan(false), setBoth(false)}} 
>
<Ionicons name="ios-woman" size={60} color="white" />
</TouchableOpacity>
</TouchableOpacity>
<Text style = {{alignSelf:"center", fontWeight:"700", marginTop:5}}>Woman</Text>
</View>


</View>
<TouchableOpacity style = {{justifyContent:'center', alignItems:'center'}} onPress = {() => {setWoman(true), setMan(false), setBoth(false)}}>
<TouchableOpacity 
style = {{width:100, height:100, justifyContent:"center", alignItems:"center", backgroundColor:bothWidthColor, borderRadius:"50"}}
onPress = {() => {setWoman(false), setMan(false), setBoth(true)}}
>
<TouchableOpacity style = {{height:80, width:80, borderRadius:40, borderColor:'black', borderWidth:0.3,justifyContent:"center", alignItems:"center",backgroundColor:'black'}}
onPress = {() => {setWoman(false), setMan(false), setBoth(true)}} 
>
<Ionicons name="ios-people" size={60} color="white" />
</TouchableOpacity>
</TouchableOpacity>
<Text style = {{marginTop:10, fontWeight:"bold"}}>Everyone</Text>
</TouchableOpacity>
<View style = {{marginLeft:30,  borderBottomWidth:1,marginTop:30,marginRight:30 }}/>
</View>
<View>
</View>
</View>

<View style = {{flex:0.2, }}>

<View style = {{ }}>
{/* <Continue onPress = {() => {navigation.navigate('Height')}} backgroundColor = {gateColor} disabled = {gateGuard}/> */}
<Button
  title="Continue"
  type="outline"
  containerStyle = {{backgroundColor:"black",marginLeft:30, marginRight:30}}
  titleStyle = {{color:"white", fontWeight:"700"}}
  disabledStyle = {{backgroundColor:"grey",}}
  disabled = {gateGuard}
  onPress = {() => {_sendToServer(), _handlePage(), () => Keyboard.removeListener('keyboadDidShow', () => console.log('removed'))}}
/>
</View>
</View>
</TouchableOpacity>
)
}
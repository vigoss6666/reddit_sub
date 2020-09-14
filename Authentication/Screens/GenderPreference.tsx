import  React, {useState,useRef,useEffect} from 'react';
import { View, StyleSheet, Text, TextInput,TouchableOpacity,ScrollView,Image, FlatList,Picker,PanResponder,Animated, TouchableWithoutFeedback, SafeAreaView, Dimensions} from 'react-native';
import { useMutation,useQuery } from '@apollo/react-hooks';
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons'; 
import {Header,Continue} from '../../src/common/Common'; 
import {Button} from 'react-native-elements'; 
import { mutateSettings } from '../../networking';






export default function GenderPreference({navigation,route}){
const {page} = route.params;     
const [man,setMan] = useState(false);
const [woman, setWoman] = useState(false);
const [both, setBoth] = useState(false); 
const manWidthColor = man ? "yellow":"black"; 
const womanWidthColor = woman ? "yellow":"black"; 
const bothWidthColor = both ? "yellow":"black";  
const gateColor = man || woman || both ? "green" : "white"; 
const gateGuard = man || woman || both ? false: true; 

const _handlePage = () => {
     if(page == "AccountSettings"){
          navigation.navigate("AccountSettings")
          return; 
     }
     navigation.navigate('Height')

}
const _sendToServer = () => {
     if(man){
         mutateSettings({genderPreference:"man"}) 
     }
     else if(woman){
         mutateSettings({genderPreference:"woman"})
     }
     else if(both){
         mutateSettings({genderPreference:"everyone"})
     }
}

return(
<View style = {{flex:1,}}>
<View style = {{flex:0.1}}> 
     
</View>
<View style = {{flex:0.7}}>
<View style = {{justifyContent:"center", alignItems:"center"}}>
<Header text = {"Im looking for....."}/>
<Text style = {{fontWeight:"700", marginTop:10, marginBottom:10}}>Who do you want to be matched with?</Text>
</View>
<View style = {{marginLeft:30, width:Dimensions.get('window').width - 60, borderWidth:0.3, marginTop:20}}/>
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
<Text style = {{marginTop:10, fontWeight:"bold"}}>EveryOne</Text>
</TouchableOpacity>
<View style = {{marginLeft:30, width:Dimensions.get('window').width - 60, borderWidth:0.3,marginTop:30 }}/>
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
  onPress = {() => {_sendToServer(), _handlePage()}}
/>
</View>
</View>
</View>
)
}
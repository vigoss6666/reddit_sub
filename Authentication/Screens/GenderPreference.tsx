import  React, {useState,useRef,useEffect} from 'react';
import { View, StyleSheet, Text, TextInput,TouchableOpacity,ScrollView,Image, Button,FlatList,Picker,PanResponder,Animated, TouchableWithoutFeedback, SafeAreaView, Dimensions} from 'react-native';
import { useMutation,useQuery } from '@apollo/react-hooks';
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons'; 
import {Header,Continue} from '../../src/common/Common'; 
export default function GenderPreference({navigation}){
const [man,setMan] = useState(false);
const [woman, setWoman] = useState(false);
const manWidthColor = man ? "yellow":"black"; 
const womanWidthColor = woman ? "yellow":"black";  
const gateColor = man || woman ? "green" : "white"; 
const gateGuard = man || woman ? false: true; 


return(
<View style = {{flex:1,}}>
<View style = {{flex:0.1}}> 
     
</View>
<View style = {{flex:0.5}}>
<View style = {{justifyContent:"center", alignItems:"center"}}>
<Header text = {"Im looking for....."}/>
<Text style = {{fontWeight:"700"}}>Who do you want to be matched with?</Text>
</View>
<View style = {{marginLeft:30, width:Dimensions.get('window').width - 60, borderWidth:0.3, marginTop:20}}/>
<View>
<View style = {{flexDirection:"row", justifyContent:"space-around",marginTop:40 }}>
<TouchableOpacity 
style = {{width:100, height:100, justifyContent:"center", alignItems:"center", backgroundColor:manWidthColor, borderRadius:"50"}}
onPress = {() => {setMan(true), setWoman(false)}}
>
<TouchableOpacity style = {{height:80, width:80, borderRadius:40,  borderWidth:0.3,justifyContent:"center", alignItems:"center",backgroundColor:"black"}}
onPress = {() => {setMan(true), setWoman(false)}}
>
<Ionicons name="ios-man" size={60} color="white" />
</TouchableOpacity>
</TouchableOpacity>
<TouchableOpacity 
style = {{width:100, height:100, justifyContent:"center", alignItems:"center", backgroundColor:womanWidthColor, borderRadius:"50"}}
onPress = {() => {setWoman(true), setMan(false)}}
>
<TouchableOpacity style = {{height:80, width:80, borderRadius:40, borderColor:'black', borderWidth:0.3,justifyContent:"center", alignItems:"center",backgroundColor:"black"}}
onPress = {() => {setWoman(true), setMan(false)}} 
>
<Ionicons name="ios-woman" size={60} color="white" />
</TouchableOpacity>
</TouchableOpacity>
</View>
<TouchableOpacity style = {{alignSelf:"center", height:100, width:100,borderRadius:50,backgroundColor:"black", justifyContent:"center", alignItems:"center" }}>
<Ionicons name="ios-people" size={60} color="white" /> 
</TouchableOpacity>
</View>
<View>
</View>
</View>

<View style = {{flex:0.3}}>
<View style = {{marginLeft:30, width:Dimensions.get('window').width - 60, borderWidth:0.3, marginTop:20}}/>
<View style = {{justifyContent:"center", alignItems:"center", marginTop:30}}>
<Continue />
</View>
</View>
</View>
)
}
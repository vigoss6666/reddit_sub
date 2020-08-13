import  React, {useState,useRef,useEffect} from 'react';
import { View, StyleSheet, Text, TextInput,TouchableOpacity,ScrollView,Image, Button,FlatList,Picker,PanResponder,Animated, TouchableWithoutFeedback, SafeAreaView} from 'react-native';
import { useMutation,useQuery } from '@apollo/react-hooks';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {Header} from '../../src/common/Common'; 
export default function Posted({navigation}){
return(
<View style = {{flex:1, justifyContent:'center', alignItems:'center'}}>
<View style = {{flex:0.2}}>

</View>
<View style = {{flex:0.5, justifyContent:"center", alignItems:"center"}}>
<MaterialCommunityIcons name="chat-processing" size={120} color="black" />
<Header text = {"Keep me posted"}/>
<Text style = {{fontWeight:"600"}}>Find out when you get a match or message</Text>
</View>
<View style = {{flex:0.3}}>
<TouchableOpacity style = {{borderWidth:1,padding:20,backgroundColor:"black"}}
onPress = {() => {navigation.navigate('EnableLocation')}}
>
    <Text style = {{color:"white", fontWeight:"600"}}>I Want to be Notified</Text>
</TouchableOpacity>
<TouchableOpacity 
style = {{padding:20,justifyContent:"center",alignItems:'center'}}
onPress = {() => {navigation.navigate('EnableLocation')}}
>
    <Text style = {{ fontWeight:"600"}}>Not now</Text>
</TouchableOpacity>


</View>
</View>
)
}
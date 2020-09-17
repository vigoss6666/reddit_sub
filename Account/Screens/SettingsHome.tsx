import  React, {useState,useRef,useEffect} from 'react';
import { View, StyleSheet, Text, TextInput,TouchableOpacity,ScrollView,Image, Button,FlatList,Picker,PanResponder,Animated, TouchableWithoutFeedback, SafeAreaView,Navigator} from 'react-native';
import { useMutation,useQuery } from '@apollo/react-hooks';
import {HeaderBar} from '../../src/common/Common'; 
import { Feather } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';


import { AntDesign } from '@expo/vector-icons';
export default function SettingsHome({navigation}){
return(
<View style = {{flex:1, marginLeft:30, marginRight:30 }}>
<View style = {{flex:0.1}}>
<HeaderBar navigation = {navigation} page = {"SettingsHome"}/>
</View>
<View style = {{flex:0.7}}>
<View style = {{alignItems:"center", marginBottom:100}}>
<TouchableOpacity style = {{alignItems:"center"}}>
<MaterialIcons name="account-circle" size={200} color="black" />
</TouchableOpacity>
<Text style = {{fontWeight:"bold", fontSize:30}}>
Zaid Shaikh
</Text>
<Text style = {{fontWeight:"bold", fontSize:15}}>
    27 years old
</Text>
<Text style = {{fontWeight:"bold", fontSize:15}}>
    Mumbai, Maharashtra
</Text>
</View>
<View style = {{flexDirection:"row",justifyContent:"space-around"}}>
<TouchableOpacity style = {{justifyContent:"center", alignItems:"center"}} 
onPress = {() => navigation.navigate('AccountSettings')}
>
<MaterialIcons name="settings" size={50} color="grey" />
<Text style = {{fontSize:20, color:"grey", marginTop:5, fontWeight:"600"}}>SETTINGS</Text> 
</TouchableOpacity>
<TouchableOpacity style = {{justifyContent:"center", alignItems:"center"}}
onPress = {() => navigation.navigate('DetailsSettings')}
>
<Entypo name="edit" size={40} color="grey" />
<Text style = {{fontSize:20, color:"grey",marginTop:5,fontWeight:"600"}}>EDIT INFO</Text> 

</TouchableOpacity>
</View>
<TouchableOpacity style = {{justifyContent:"center", alignItems:"center", marginTop:30}}
onPress = {() => navigation.navigate('AddPhotos', {page:"SettingsHome"})}
>
<View style = {{flexDirection:"row"}}>
<Entypo name="camera" size={50} color="orange" />
<View style = {{alignSelf:"flex-end", marginLeft:-10}}>
<AntDesign name="pluscircle" size={20} color="grey" />
</View>
</View>
<Text style = {{fontSize:20, color:"grey",marginTop:5,fontWeight:"600"}}>ADD PHOTOS</Text> 
</TouchableOpacity>
</View>
<View style = {{flex:0.2,}}>

</View>
</View>
)
}
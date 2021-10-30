import  React, {useState,useRef,useEffect} from 'react';
import { View, StyleSheet, Text, TextInput,TouchableOpacity,ScrollView,Image, FlatList,Picker,PanResponder,Animated, TouchableWithoutFeedback, SafeAreaView, Dimensions} from 'react-native';
import {Button} from 'react-native-elements'; 
import { useMutation,useQuery } from '@apollo/react-hooks';
export default function NoMatch({navigation}){
 
 useEffect(() => {
  navigation.setOptions({
    headerTitle:false, 
    headerLeft:false
  }) 
 }, []) 
 
return(
<View style = {{flex:1, backgroundColor:'black'}}>
<View style = {{flex:0.2 }}>

</View>

<View style = {{flex:0.6, alignItems:"center"}}>
<Text style = {{fontWeight:'900', color:'white', fontSize:40, fontStyle:'italic'}}> No matches.</Text>
<View style = {{borderBottomWidth:3, borderBottomColor:"white", width:Dimensions.get('window').width - 200, marginTop:20}}></View>
<Text style = {{color:"white", marginTop:20, fontStyle:'italic', fontWeight:'900'}}>No matches revealed this round.</Text>
<Text style = {{color:"white", marginTop:20, fontStyle:'italic', fontWeight:'900'}}>Choose One for yourself.</Text>
<View style = {{borderBottomWidth:3, borderBottomColor:"white", width:Dimensions.get('window').width - 200, marginTop:20}}></View>

</View>

<View style = {{flex:0.2, justifyContent:'flex-start', }}>
<Button title = {"Choose from Dating Pool"}
 containerStyle = {{marginBottom:20,marginLeft:30, marginRight:30, }}
  buttonStyle = {{backgroundColor:'yellow', height:40}}
  titleStyle = {{color:'black', fontWeight:'900'}}
  onPress = {() => navigation.navigate('MatchMakeGrand')}
  />
<Button 
title = {"Play Again"} 
containerStyle = {{marginBottom:10,marginLeft:30, marginRight:30}}
 buttonStyle = {{backgroundColor:'grey'}} 
 titleStyle = {{color:'black', fontWeight:'900'}}
 onPress = {() => navigation.pop(4)}
 />
</View>

</View>
)
}
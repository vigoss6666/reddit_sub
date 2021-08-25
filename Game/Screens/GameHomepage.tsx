import  React, {useState,useRef,useEffect, useContext} from 'react';
import { View, StyleSheet, Text, TextInput,TouchableOpacity,ScrollView,Image, Button,FlatList,Picker,PanResponder,Animated, TouchableWithoutFeedback, SafeAreaView, Dimensions} from 'react-native';
import { useMutation,useQuery } from '@apollo/react-hooks';
import { AntDesign } from '@expo/vector-icons';
import {HeaderBar} from '../../src/common/Common'; 
import AppContext from '../../AppContext';
import { Entypo } from '@expo/vector-icons';
export default function GameHomepage({navigation}){
    const myContext = useContext(AppContext); 
    const { userId, setProfilesAuth,computeName, user} = myContext;
const handleGamePage = () => {
    console.log(user.gamePreview)
     if(user.gamePreview == 'false'){
          navigation.navigate('GamePreview');
        //   return 
           
     }
    //  navigation.navigate('PlayGameLatest'); 
}    
return(
<View style = {{flex:1,marginLeft:20, marginRight:20, marginTop:20}}>
<View style = {{flex:0.2}}>
<TouchableOpacity onPress = {() => navigation.navigate('MatchMakeGrand')}>
<Entypo name="game-controller" size={24} color="black" />
</TouchableOpacity>
</View>
<View style = {{flex:0.6, alignItems:"center", }}> 

<Text style = {{fontWeight:"bold", fontSize:40}}>MATCHMAKE</Text>
<TouchableOpacity style = {{marginTop:30}} onPress = {() => {user.gamePreview ? navigation.navigate('PlayGameLatest'):navigation.navigate('GamePreview')}}>
<Image source = {{uri:'https://storage.googleapis.com/nemesis-157710.appspot.com/crossed-arrows.png'}} style = {{height:80, width:80}}/>
</TouchableOpacity>
<Text style = {{fontWeight:"bold", marginTop:30, color:'grey', fontSize:20}}>Suggest Matches</Text>
<View style = {{borderBottomWidth:2, borderBottomColor:"black", width:Dimensions.get('window').width -100, marginTop:30}}>

</View>
<Text style = {{fontWeight:"bold", marginTop:30, fontSize:40}}>DATE </Text>
<TouchableOpacity style = {{marginTop:30}} onPress = {() => navigation.navigate('SelfGame')}>
<AntDesign name="hearto" size={80} color="black" />
</TouchableOpacity>
<Text style = {{fontWeight:"bold", marginTop:30, color:'grey', fontSize:20}}>Find a Date</Text>

</View>
<View style = {{flex:0.2}}>

</View>
</View>
)
}
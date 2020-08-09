import  React, {useState,useRef,useEffect} from 'react';
import { View, StyleSheet, Text, TextInput,TouchableOpacity,ScrollView,Image, Button,FlatList,Picker,PanResponder,Animated, TouchableWithoutFeedback, SafeAreaView} from 'react-native';
import { useMutation,useQuery } from '@apollo/react-hooks';
export default function Inches({navigation}){
    const data = ['0"', '1"', '2"', '3"', '4"', '5"','6"','7"','8"','9"','10"','11"']; 
    const template = data.map((val,index) => {
        return  <TouchableOpacity 
        style = {{height:60,justifyContent:"center", alignItems:"center",borderWidth:0.2}} key = {index}
        onPress = {() => {navigation.navigate('Height', {
             inches:val
        })}}
        >
             <Text style = {{fontSize:50}}>{val}</Text>
         </TouchableOpacity>
    })    
    return(
    <SafeAreaView style = {{flex:1, }}>
  
    <View>
    {template}
    </View>
   
    
    </SafeAreaView>
    )
}
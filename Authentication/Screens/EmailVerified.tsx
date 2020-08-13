import  React, {useState,useRef,useEffect} from 'react';
import { View, StyleSheet, Text, TextInput,TouchableOpacity,ScrollView,Image, Button,FlatList,Picker,PanResponder,Animated, TouchableWithoutFeedback, SafeAreaView} from 'react-native';
import { useMutation,useQuery } from '@apollo/react-hooks';
import { AntDesign } from '@expo/vector-icons';
export default function EmailVerified({navigation}){
    return(
        <View style = {{flex:1, }}>
        <View style = {{flex:0.2 }}>
        </View>
        <View style = {{flex:0.5, justifyContent:"center", alignItems:"center"}}>
        <AntDesign name="checkcircleo" size={60} color="black" />
        <Text style = {{fontSize:20, }}>Your Email has been Verified </Text>
        </View>
        <View style = {{flex:0.3, justifyContent:"center", alignItems:"center"}}>
        <TouchableOpacity style = {{borderWidth:1,  borderRadius:25, backgroundColor:"black", width:100, padding:30}}
        onPress = {() => {navigation.navigate('Birthday')}}
        >
            <Text style = {{color:"white", fontWeight:"600"}}>Done</Text>
        </TouchableOpacity>
        </View>
        </View>
        )
}
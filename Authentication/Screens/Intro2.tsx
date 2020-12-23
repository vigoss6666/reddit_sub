import  React, {useState,useRef,useEffect} from 'react';
import {Dimensions, View, StyleSheet, Text, TextInput,TouchableOpacity,ScrollView,Image, Button,FlatList,Picker,PanResponder,Animated, TouchableWithoutFeedback, SafeAreaView} from 'react-native';
import { useMutation,useQuery } from '@apollo/react-hooks';
import { Continue } from '../../src/common/Common';
export default function Intro2({navigation}){
    const index = 2; 
    return(
        <View style = {{flex:1, justifyContent:'center', alignItems:'center',backgroundColor:'#ffffff'}}>
        <View style = {{flex:0.2}}>
        
        </View>
        <View style = {{flex:0.5}}>
        </View>
        <View style = {{flex:0.3}}>
        <Continue text = {"Next"} onPress = {() => {navigation.navigate('Intro3')}}/>
        </View>
        </View>
        )
}
import  React, {useState,useRef,useEffect} from 'react';
import { Dimensions, View, StyleSheet, Text, TextInput,TouchableOpacity,ScrollView,Image, Button,FlatList,Picker,PanResponder,Animated, TouchableWithoutFeedback, SafeAreaView} from 'react-native';
import { useMutation,useQuery } from '@apollo/react-hooks';
import { Continue } from '../../src/common/Common';
export default function Intro4({navigation}){
    const index = 4; 
    return(
        <View style = {{flex:1, justifyContent:'center', alignItems:'center',backgroundColor:'#ffffff'}}>
        <View style = {{flex:0.2}}>
        
        </View>
        <View style = {{flex:0.5}}>
        <Image style = {{height:300, width:Dimensions.get('window').width, resizeMode:"contain"}} source = {require('/Users/zaidshaikh/fhfclient/assets/slide1.png')}></Image>
        </View>
        <View style = {{flex:0.3}}>
        <Continue text = {"Next"} onPress = {() => {navigation.navigate('Name')}}/>
        </View>
        </View>
        )
}
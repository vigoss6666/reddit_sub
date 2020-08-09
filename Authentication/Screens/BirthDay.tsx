import  React, {useState,useRef,useEffect} from 'react';
import { View, StyleSheet, Text, TextInput,TouchableOpacity,ScrollView,Image, Button,FlatList,Picker,PanResponder,Animated, TouchableWithoutFeedback, SafeAreaView, Dimensions} from 'react-native';
import { useMutation,useQuery } from '@apollo/react-hooks';
import {Header} from '../../src/common/Common'; 
export default function BirthDay({navigation}){
return(
<View style = {{flex:1, }}>
<View style = {{flex:0.2}}>
     
</View>
<View style = {{flex:0.5, marginLeft:30}}>
<Header text = {"My birthday is...."}/>
<View style = {{borderBottomColor:"black", borderBottomWidth:1, width:Dimensions.get('window').width - 60,opacity:0.3,marginTop:10}}/>

</View>
<View style = {{flex:0.3}} >
     
</View>
</View>
)
}
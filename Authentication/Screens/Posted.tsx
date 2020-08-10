import  React, {useState,useRef,useEffect} from 'react';
import { View, StyleSheet, Text, TextInput,TouchableOpacity,ScrollView,Image, Button,FlatList,Picker,PanResponder,Animated, TouchableWithoutFeedback, SafeAreaView} from 'react-native';
import { useMutation,useQuery } from '@apollo/react-hooks';
export default function Posted({navigation}){
return(
<View style = {{flex:1, justifyContent:'center', alignItems:'center'}}>
<Text>Hello world</Text>
</View>
)
}
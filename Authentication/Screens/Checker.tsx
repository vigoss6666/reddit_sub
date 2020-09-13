import  React, {useState,useRef,useEffect} from 'react';
import { View, StyleSheet, Text, TextInput,TouchableOpacity,ScrollView,Image, Button,FlatList,Picker,PanResponder,Animated, TouchableWithoutFeedback, SafeAreaView} from 'react-native';
import { useMutation,useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
//getSettingsMutation: userReturnList!
const GET_DATA = gql`
query {
     getSettingsMutation {
          lastname 
          firstname
     }
}

`


export default function Checker({navigation}){
    const {data, loading, error} = useQuery(GET_DATA); 
    if(data){
         console.log(data); 
    }

return(
<View style = {{flex:1, justifyContent:'center', alignItems:'center'}}>
<Text>Hello world</Text>
</View>
)
}
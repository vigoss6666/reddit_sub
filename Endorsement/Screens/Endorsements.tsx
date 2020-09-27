import  React, {useState,useRef,useEffect} from 'react';
import { View, StyleSheet, Text, TextInput,TouchableOpacity,ScrollView,Image, FlatList,Picker,PanResponder,Animated, TouchableWithoutFeedback, SafeAreaView} from 'react-native';
import { useMutation,useQuery } from '@apollo/react-hooks';
import { MaterialIcons } from '@expo/vector-icons';
import {Button,Icon } from "react-native-elements"; 
import { gql } from 'apollo-boost';

const GENERATE_MATCHES = gql`
 query {
    generateMatches {
        user 
        data 


    }
 }

`



export default function Endorsement({navigation}){
const data1 = [{user:"Amy Guion", matches:["eric hemsworth", "david boctor", "steve"]}]; 
const {data,loading,error} = useQuery(GENERATE_MATCHES); 
const [index,setIndex] = useState(0); 
const setIndexWrapper = () => {
    if(index <= data.generateMatches.data.length){
        setIndex(index + 1); 
    }
}

if(data){
    console.log(data)
    return(
        <View style = {{flex:1,backgroundColor:"black" }}>
        <View style = {{flex:0.2}}>
        
        </View>
        <View style = {{flex:0.6,alignItems:"center"}}>
         <Text style = {{color:"white", fontWeight:"bold", fontSize:35, fontStyle:"italic"}}> It's a Match ! </Text>
         <View style = {{flexDirection:"row",marginTop:50,  }}>
         <View style = {{marginRight:50}}>
         <MaterialIcons name="account-circle" size={100} color="blue" />
         </View>
         <MaterialIcons name="account-circle" size={100} color="red" />
         </View>
         <View style = {{flexDirection:"row"}}>
         <Text style = {{color:"white", fontWeight:"bold", marginRight:100, fontSize:20}}>{data.generateMatches.user} </Text>
         <Text style = {{color:"white", fontWeight:"bold", fontSize:20}}> {data.generateMatches.data[index]}</Text>
        
         </View>
        
        </View>
        <View style = {{flex:0.2}}>
         <Button title = "Endorse this match" buttonStyle = {{backgroundColor:"#f5b507",}} titleStyle = {{color:"white", fontWeight:"bold"}} containerStyle = {{marginLeft:30, marginRight:30}} icon={
            <Icon
              name="star"
              size={15}
              color="white"
            />
            
          }
          onPress = {() => setIndexWrapper()}
          >
         
        </Button>
        <Button title = "Maybe Not" buttonStyle = {{backgroundColor:"#6e6b65",}} titleStyle = {{color:"white", fontWeight:"bold"}} containerStyle = {{marginLeft:30, marginRight:30, marginTop:30}}></Button>
        
        </View>
        </View>
        )
}

if(loading){
    return <View><Text>Loading</Text></View>
}



}
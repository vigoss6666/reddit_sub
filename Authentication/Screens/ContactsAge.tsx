import  React, {useState,useRef,useEffect} from 'react';
import { View, StyleSheet,  TextInput,TouchableOpacity,ScrollView,Image, FlatList,Picker,PanResponder,Animated, TouchableWithoutFeedback, SafeAreaView,} from 'react-native';
import { useMutation,useQuery } from '@apollo/react-hooks';
import {Text,Overlay, Avatar} from 'react-native-elements'; 

import { Icon } from 'react-native-vector-icons/Icon';
import { AntDesign } from '@expo/vector-icons';
import { gql } from 'apollo-boost';
import { Button } from 'react-native-elements';
import DropDownPicker from 'react-native-dropdown-picker';

//addAgeList(userInputList: userInputList1!): Boolean!
const ADD_USER_AGE = gql`
mutation namer($userInputList:userInputList1!){
     addAgeList(userInputList:$userInputList)
}

`
export default function ContactsAge({navigation,route}){
const {profiles} = route.params;     
const data1 = [{ fullname:"zaid",min:15,max:19}, {fullname:"zaheer",min:20,max:24}, {zIndex:400, fullname:"nihal",ageRange:{min:25, max:29}},{fullname:"nihal",ageRange:{min:30, max:34}}]
const [addAge, {data}] = useMutation(ADD_USER_AGE); 
const [selectedValue, setSelectedValue] = useState("java");
const ageRange = [{min:15,max:19},{min:20,max:24},{min:25, max:29}, {min:30, max:34}, {min:35, max:39}, {min:40, max:44}, {min:45, max:49}]
const [visible, setVisible] = useState(false);
const [country,selectCountry] = useState([]); 
const [namer, setNamer] = useState(0); 
const [zIndex, setIndex] = useState(1000); 

const _sendToServer = () => {
     addAge({variables:{userInputList:{data:country}}}); 
     navigation.navigate('ProfilePool'); 
}

const toggleOverlay = () => {
    setVisible(!visible);
  };
console.log(country)  
useEffect(() => {
     
}, [namer])
 const zIndexSetter = (val1, index) => {

     const result = profiles.filter(val => {
          return val1._id == val._id
     })
     result[0].zIndex = zIndex;
     profiles.splice(index, 1, result[0]);  
     setNamer(namer + 1); 
     setIndex(zIndex + 10) 
 } 
  

    return(
        <View style = {{flex:1, }}>
        <View style = {{flex:0.1}}>
        
        </View>
        <View style = {{flex:0.1}}>
        <Text h4 style = {{alignSelf:'center', fontWeight:'600'}}>
            Tell us about your friends
        </Text>
        <Text h4 style = {{alignSelf:'center', fontWeight:'600'}}>
            Confirm the age of each friend
        </Text>
        </View>
        <View style = {{flex:0.6}}>
        <ScrollView>
        {
           profiles.map((val,index) => {
                return <View  onPress = {toggleOverlay} style = {{flexDirection: 'row',borderWidth:1, justifyContent:'space-between',marginRight:20, borderRightWidth:0, borderLeftWidth:0, marginLeft:20, height:100, alignItems:'center', zIndex:val.zIndex}} key = {index.toString()}>
                    <View style = {{flexDirection:'row',alignItems:'center',}}>
                     
                    <Text>{val.name || val.firstname}</Text>
                    </View>
                    <DropDownPicker
    items={[
        
        {label: '15 to 19 years', value: {minAge:15, maxAge:19}},
        {label: '20 to 24 years', value: {minAge:20, maxAge:24}},
        {label: '25 to 29 years', value: {minAge:25, maxAge:29}},
        {label: '30 to 34 years', value: {minAge:30, maxAge:34}},
        {label: '35 to 39 years', value: {minAge:35, maxAge:39}},
        {label: '40 to 44 years', value: {minAge:40, maxAge:44}},
        {label: '45 to 49 years', value: {minAge:45, maxAge:49}},
        {label: '50 to 54 years', value: {minAge:50, maxAge:54}},

      ]}
    onPress = {() => {console.log("pressed")}}
    onOpen = {() => {zIndexSetter(val,index)}}
    containerStyle={{height: 40, width:200, }}
    style={{}}
    itemStyle={{
        
        backgroundColor:"white", 
        fontColor:"white",
        justifyContent: 'flex-start'
    }}
    dropDownStyle={{backgroundColor: '#fafafa', zIndex:100}}
    onChangeItem={item => selectCountry([...country,{...item.value, _id:val._id}])}
    
/>
                    
        
                    

                </View>
           })  
        }
        
        </ScrollView>        
        </View>
        <View style = {{flex:0.2, justifyContent:'center',marginTop:10}}>
         <Button title = "save" containerStyle = {{marginLeft:30, marginRight:30,}} buttonStyle = {{backgroundColor:'black'}} onPress = {() => {_sendToServer()}}></Button>   
        </View>
        </View>
        )    





}
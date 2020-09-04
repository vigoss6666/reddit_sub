import  React, {useState,useRef,useEffect} from 'react';
import { View, StyleSheet,  TextInput,TouchableOpacity,ScrollView,Image, FlatList,Picker,PanResponder,Animated, TouchableWithoutFeedback, SafeAreaView,} from 'react-native';
import { useMutation,useQuery } from '@apollo/react-hooks';
import {Text,Overlay, Avatar} from 'react-native-elements'; 
import DropDownPicker from 'react-native-dropdown-picker';
import { Icon } from 'react-native-vector-icons/Icon';
import { AntDesign } from '@expo/vector-icons';
import { gql } from 'apollo-boost';
import { Button } from 'react-native-elements';









export default function ContactsAge({navigation}){
const data1 = [{ fullname:"zaid",min:15,max:19}, {fullname:"zaheer",min:20,max:24}, {fullname:"nihal",ageRange:{min:25, max:29}},{fullname:"nihal",ageRange:{min:30, max:34}}]
const [selectedValue, setSelectedValue] = useState("java");
const ageRange = [{min:15,max:19},{min:20,max:24},{min:25, max:29}, {min:30, max:34}, {min:35, max:39}, {min:40, max:44}, {min:45, max:49}]
const [visible, setVisible] = useState(false);
const [country,selectCountry] = useState(['15'])
const toggleOverlay = () => {
    setVisible(!visible);
  };
const data = [{name:"zaid", fullname:"shaikh"}]

    return(
        <View style = {{flex:1, }}>
        <View style = {{flex:0.1}}>
        
        </View>
        <View style = {{flex:0.1}}>
        <Text h4 style = {{alignSelf:'center', fontWeight:'600'}}>
            Tell us about your friends
        </Text>
        <Text h5 style = {{alignSelf:'center', fontWeight:'600'}}>
            Confirm the age of each friend
        </Text>
        </View>
        <View style = {{flex:0.6}}>
        <ScrollView>
        {
           data.getDatingPool.data.map(val => {
                return <View  onPress = {toggleOverlay} style = {{flexDirection: 'row',borderWidth:1, justifyContent:'space-between',marginRight:20, borderRightWidth:0, borderLeftWidth:0, marginLeft:20, height:300, alignItems:'center'}}>
                    <View style = {{flexDirection:'row',alignItems:'center',}}>
                    <Avatar rounded icon = {{name:'account-circle', color:'black'}} activeOpacity = {0.9} size = {"medium"} />  
                    <Text>{val.name || val.firstname}</Text>
                    </View>
                    <DropDownPicker
    items={[
        {label: '15 - 19 years', value: {min:15,max:19}, },
        {label: '20 - 24 years', value: {min:20,max:24} },
        {label: '25 - 29 years', value: {min:25,max:29} },
        {label: '30 - 34 years', value: {min:30,max:34} },
        {label: '35 - 39 years', value: {min:35,max:39}, },
        {label: '40 - 44 years', value: {min:40,max:44}, },
        {label: '45 - 49 years', value: {min:45,max:49}, },
    ]}
    placeholder = {"20 - 24 years "}
    containerStyle={{height: 40,zIndex:100, width:150, }}
    style={{backgroundColor: '#fafafa',zIndex:100}}
    itemStyle={{
        justifyContent: 'flex-start', 
        zIndex:100
    }}
    dropDownStyle={{backgroundColor: '#fafafa', zIndex:100}}
    onChangeItem={item => selectCountry(
        item.value
    )}
/>
                    

                </View>
           })  
        }
        
        </ScrollView>        
        </View>
        <View style = {{flex:0.2, justifyContent:'center'}}>
         <Button title = "save" containerStyle = {{marginLeft:30, marginRight:30,}} buttonStyle = {{backgroundColor:'black'}} onPress = {() => {navigation.navigate('NewContact')}}></Button>   
        </View>
        </View>
        )    





}
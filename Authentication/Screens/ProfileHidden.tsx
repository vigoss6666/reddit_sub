import  React, {useState,useRef,useEffect} from 'react';
import { View, StyleSheet, Text, TextInput,TouchableOpacity,ScrollView,Image, Button,FlatList,Picker,PanResponder,Animated, TouchableWithoutFeedback, SafeAreaView} from 'react-native';
import { useMutation,useQuery } from '@apollo/react-hooks';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {Header} from '../../src/common/Common'; 
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function ProfileHidden({navigation}){
    const storeData = async (value:string) => {
        try {
          await AsyncStorage.setItem('basicAuth', value)
        } catch (e) {
          // saving error
        }
      }    
const setValues = async () => {
     storeData('basicAuth', true)
     navigation.navigate('Homer'); 
}    
return(
<View style = {{flex:1, justifyContent:'center', alignItems:'center'}}>
<View style = {{flex:0.1}}>

</View>
<View style = {{flex:0.6, justifyContent:"center", alignItems:"center",}}>
<MaterialCommunityIcons name="account-multiple-minus-outline" size={80} color="black" />
<Header text = {"Your profile is Hidden"}/>
<Text>
Add yourself to the dating pool to meet new
</Text>
<Text>
people. People you have already liked may still
</Text>
<Text>
see your profle and match with you.
</Text>
</View>
<View style = {{flex:0.3}}>
<TouchableOpacity style = {{borderWidth:1,padding:20,backgroundColor:"black"}} 
onPress = {() => setValues()}
>
    <Text style = {{color:"white", fontWeight:"600"}}>Add me to the dating pool</Text>
</TouchableOpacity>
<TouchableOpacity style = {{padding:20,justifyContent:"center",alignItems:'center'}}
onPress = {() => setValues()}
>
    <Text style = {{ fontWeight:"600"}}>MATCHMAKING ONLY</Text>
</TouchableOpacity>


</View>
</View>
)
}
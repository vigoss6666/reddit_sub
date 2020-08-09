import  React, {useState,useRef,useEffect} from 'react';
import { View, StyleSheet, Text, TextInput,TouchableOpacity,ScrollView,Image, Button,FlatList,Picker,PanResponder,Animated, TouchableWithoutFeedback, SafeAreaView} from 'react-native';
import { useMutation,useQuery } from '@apollo/react-hooks';
export default function Feet({navigation}){
const data = ['3', '4', '5', '6', '7']; 
const template = data.map((val,index) => {
    return  <TouchableOpacity style = {{height:60,justifyContent:"center", alignItems:"center",borderWidth:0.2}} key = {index}
     onPress = {() => {navigation.navigate('Height', {feet:val})}}
    >
         <Text style = {{fontSize:50}}>{val}</Text>
     </TouchableOpacity>
})    
return(
<View style = {{flex:1, }}>
<View style = {{flex:0.2}}>

</View>
<View style = {{flex:0.5}}>
{template}
</View>
<View style = {{flex:0.2}}>

</View>

</View>
)
}
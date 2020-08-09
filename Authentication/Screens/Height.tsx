import  React, {useState,useRef,useEffect} from 'react';
import { View, StyleSheet, Text, TextInput,TouchableOpacity,ScrollView,Image, Button,FlatList,Picker,PanResponder,Animated, TouchableWithoutFeedback, SafeAreaView, Dimensions} from 'react-native';
import { useMutation,useQuery } from '@apollo/react-hooks';
import {Header, Continue} from '../../src/common/Common'; 
import { AntDesign } from '@expo/vector-icons';
export default function Height({navigation,route}){

     let feet = 4; 
     let inches = 4; 
 if(route.params){
      if(route.params.feet){
           feet = route.params.feet 
      }
      if(route.params.inches){
           inches = route.params.inches; 
      }
 }     


return(
<View style = {{flex:1, }}>
<View style = {{flex:0.2}}>

</View>
<View style = {{flex:0.5, marginLeft:30}}>
<Header text = {"How tall are you?"}/>
<View style = {{borderBottomWidth:0.4, width:Dimensions.get('window').width - 60, marginTop:20}}/>
<View style = {{flexDirection:"row", marginTop:30}}>
 <TouchableOpacity 
 style = {{flexDirection:"row",justifyContent:"center", alignItems:"center",borderWidth:1, padding:10}}
 onPress = {() => {navigation.navigate("Feet")}}
 >
  <Text style = {{fontSize:24, marginRight:10}}>{feet}</Text>
  <TouchableOpacity style = {{flexDirection:"column",justifyContent:"center", alignItems:"center"}}>
  <AntDesign name="caretup" size={24} color="black" />
  <AntDesign name="caretdown" size={24} color="black" style = {{marginTop:-15}}/>
  </TouchableOpacity>  
 </TouchableOpacity>
 <TouchableOpacity 
 style = {{marginLeft:10,flexDirection:"row",justifyContent:"center", alignItems:"center",borderWidth:1, padding:10}}
 onPress = {() => {navigation.navigate('Inches')}}
 >
  <Text style = {{fontSize:24, marginRight:10}}>{inches}</Text>
  <TouchableOpacity style = {{flexDirection:"column",justifyContent:"center", alignItems:"center"}}>
  <AntDesign name="caretup" size={24} color="black" />
  <AntDesign name="caretdown" size={24} color="black" style = {{marginTop:-15}}/>
  </TouchableOpacity>  
 </TouchableOpacity>


</View>

</View>
<View style = {{flex:0.3,justifyContent:"center", alignItems:"center"}}>
<Continue backgroundColor = {"green"}/>
</View>
</View>
)
}
import  React, {useState,useRef,useEffect} from 'react';
import { View, StyleSheet, Text, TextInput,TouchableOpacity,ScrollView,Image, FlatList,Picker,PanResponder,Animated, TouchableWithoutFeedback, SafeAreaView, Dimensions} from 'react-native';
import { useMutation,useQuery } from '@apollo/react-hooks';
import {Button} from 'react-native-elements'; 
export default function Loader({navigation,route}){
 const {profiles} = route.params;
return(
<View style = {{flex:1,backgroundColor:"white" }}>
<View style = {{flex:0.2}}>

</View>
<View style = {{flex:0.6, marginLeft:10}}>
<Image 
source = {{uri:"https://storage.googleapis.com/nemesis-157710.appspot.com/loaded.png"}}
style = {{height:400, width:Dimensions.get('window').width -40 }}
>
</Image>
</View>
<View style = {{flex:0.2}}>
<Button title = "Start Matchmaking" containerStyle = {{marginLeft:30, marginRight:30, backgroundColor:'black'}} buttonStyle = {{backgroundColor:'black'}} onPress = {() => {navigation.navigate('ContactLoadSuccess', {profiles})}} titleStyle = {{fontWeight:"bold"}}/>
</View>
</View>
)
}
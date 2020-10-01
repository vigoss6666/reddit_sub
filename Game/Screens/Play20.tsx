import  React, {useState,useRef,useEffect} from 'react';
import {Dimensions, View, StyleSheet,  TextInput,TouchableOpacity,ScrollView,Image, FlatList,Picker,PanResponder,Animated, TouchableWithoutFeedback, SafeAreaView} from 'react-native';
import { useMutation,useQuery } from '@apollo/react-hooks';
import {Text, Button,Icon} from 'react-native-elements'; 
export default function Play20({navigation}){
return(
<View style = {{flex:1, backgroundColor:"#ffffff" }}>
<View style = {{flex:0.1}}>

</View>
<View style = {{flex:0.7, }}>

<Image source = {{uri:'https://storage.googleapis.com/nemesis-157710.appspot.com/Screenshot%202020-09-05%20at%202.31.00%20AM.png'}} style = {{height:700, width:Dimensions.get('window').width, }}>

</Image>
</View>
<View style = {{flex:0.2, justifyContent:"center", }}>
<Button 
onPress = {() => navigation.navigate('Playgame')}
title = "Play again" containerStyle = {{marginLeft:30, marginRight:30}} buttonStyle = {{backgroundColor:"black"}} icon={
    <Icon
      name="rowing"
      size={15}
      color="white"
    />
  }>

</Button>
 </View>   
</View>
)
}            
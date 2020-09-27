import  React, {useState,useRef,useEffect} from 'react';
import { View, StyleSheet, Text, TextInput,TouchableOpacity,ScrollView,Image, Button,FlatList,Picker,PanResponder,Animated, TouchableWithoutFeedback, SafeAreaView} from 'react-native';
import { useMutation,useQuery } from '@apollo/react-hooks';
import Slider from '../../src/common/Slider'; 
import Slider2 from '../../src/common/Slider2';

import { MaterialIcons } from '@expo/vector-icons';



const template = <View><Text>Hello world</Text></View>

export default function MatchView({navigation}){
return(
<View style = {{flex:1, marginTop:40}}>
<View style = {{height:200, }}>
 {/* <Slider />
</View>
<View style = {{flex:1, marginTop:-70, }}>
<Slider2 />  */}
</View>

</View>
)
}
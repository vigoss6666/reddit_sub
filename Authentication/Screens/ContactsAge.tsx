import  React, {useState,useRef,useEffect} from 'react';
import { View, StyleSheet,  TextInput,TouchableOpacity,ScrollView,Image, Button,FlatList,Picker,PanResponder,Animated, TouchableWithoutFeedback, SafeAreaView} from 'react-native';
import { useMutation,useQuery } from '@apollo/react-hooks';
import {Text,Overlay} from 'react-native-elements'; 
export default function ContactsAge({navigation}){
const data = [{ fullname:"zaid"}, {fullname:"zaheer"}, {fullname:"nihal", }]
const ageRange = [{min:15,max:19},{min:20,max:24},{min:25, max:29}, {min:30, max:34}, {min:35, max:39}, {min:40, max:44}, {min:45, max:49} ]
const [visible, setVisible] = useState(false);
const toggleOverlay = () => {
    setVisible(!visible);
  };
return(
<View style = {{flex:1, }}>
<View style = {{flex:0.2}}>

</View>
<View style = {{flex:0.2}}>
<Text h4 style = {{alignSelf:'center', fontWeight:'600'}}>
    Tell us about your friends
</Text>
<Text h5 style = {{alignSelf:'center', fontWeight:'600'}}>
    Confirm the age of each friend
</Text>
</View>
<View style = {{flex:0.6}}>
{
   data.map(val => {
        return <TouchableOpacity  onPress = {toggleOverlay}>
            <Text>25-30 Years</Text>
        </TouchableOpacity>
   })  
}
</View>
<Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
        <View>
            {ageRange.map(val => {
                 return <Text>{val.min}</Text>
            })}
        </View>
      </Overlay>
</View>
)
}
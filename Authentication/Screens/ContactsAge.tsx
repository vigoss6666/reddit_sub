import  React, {useState,useRef,useEffect} from 'react';
import { View, StyleSheet,  TextInput,TouchableOpacity,ScrollView,Image, Button,FlatList,Picker,PanResponder,Animated, TouchableWithoutFeedback, SafeAreaView,} from 'react-native';
import { useMutation,useQuery } from '@apollo/react-hooks';
import {Text,Overlay, Avatar} from 'react-native-elements'; 

import { Icon } from 'react-native-vector-icons/Icon';
import { AntDesign } from '@expo/vector-icons';
export default function ContactsAge({navigation}){
const data = [{ fullname:"zaid",min:15,max:19}, {fullname:"zaheer",min:20,max:24}, {fullname:"nihal",ageRange:{min:25, max:29}},{fullname:"nihal",ageRange:{min:30, max:34}}]
const [selectedValue, setSelectedValue] = useState("java");

const ageRange = [{min:15,max:19},{min:20,max:24},{min:25, max:29}, {min:30, max:34}, {min:35, max:39}, {min:40, max:44}, {min:45, max:49}]
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
        return <TouchableOpacity  onPress = {toggleOverlay} style = {{flexDirection: 'row',borderWidth:1, justifyContent:'space-between',marginRight:20, borderRightWidth:0, borderLeftWidth:0, marginLeft:20, height:200}}>
            <View style = {{flexDirection:'row',alignItems:'center',}}>
            <Avatar rounded icon = {{name:'account-circle', color:'black'}} activeOpacity = {0.9} size = {"medium"} />  
            <Text>{val.fullname}</Text>
            </View>
            <Picker
        selectedValue={selectedValue}
        style={{ height: 20, width: 150 }}
        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
        mode = "dialog"
      >
        <Picker.Item label="15 to 19 years" value="java" />
        <Picker.Item label="20 to 24 years" value="js" />
        <Picker.Item label="25 to 29 years" value="java" />
        <Picker.Item label="30 to 34 years" value="js" />
        <Picker.Item label="35 to 39 years" value="java" />
        <Picker.Item label="40 to 44 years" value="js" />
        <Picker.Item label="45 to 49 years" value="js" />
      </Picker>
            {/* <TouchableOpacity style = {{flexDirection:'row',alignItems:'center', }}>
            <Text style = {{borderWidth:1, height:30,alignSelf:'center',padding:5}}>25 to 30 years</Text>
            <View style = {{borderWidth:1, height:30}}> 
            <AntDesign name="caretdown" size={24} color="black" />               
            </View>
            </TouchableOpacity> */}
        </TouchableOpacity>
   })  
}

 
</View>
<Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
        <View >
            <Text>
                15 to 19 years
            </Text>                       
            <Text>
                20 to 24 years
            </Text> 
            <Text>
                25 to 29 years
            </Text>
            <Text>
                29 to 34 years
            </Text>
            <Text>
                35 to 39 years
            </Text>
            <Text>
                40 to 44 years
            </Text>
            <Text>
            45 to 49 years
            </Text>
            

        </View>
      </Overlay>
</View>
)
}
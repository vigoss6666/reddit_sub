import  React, {useState,useRef,useEffect} from 'react';
import { View, StyleSheet, Text, TextInput,TouchableOpacity,ScrollView,Image, Button,FlatList,Picker,PanResponder,Animated, TouchableWithoutFeedback, SafeAreaView} from 'react-native';
import { useMutation,useQuery } from '@apollo/react-hooks';
export default function ContactsMenu({navigation}){

     const contacts = [{fullname:"zaid shaikh", }]
     const friends = [{fullname:"Huraira"}]; 
     const [selected,isSelected] = useState(); 
     const friendsTemplate = friends.map((val,index) => {
         return  <Text key = {index}>{val.fullname}</Text>
     })
     const contactsTemplate = contacts.map((val,index) => {
          return <Text>{val.fullname}</Text>
     })   
return(
<View style = {{flex:1, }}>
<View style = {{flex:0.2}}>

</View>
<View style = {{flex:0.2}}>
<View style = {{flexDirection:'row', marginRight:20, marginLeft:20,justifyContent:'space-around'}}>
<TouchableOpacity style = {{borderWidth:1, height:40,width:100, justifyContent:"center", alignItems:"center" }}
onPress = {() => {isSelected(0)}}
>
<Text>Friends</Text>
</TouchableOpacity>
<TouchableOpacity style = {{borderWidth:1, height:40,width:100, justifyContent:"center", alignItems:"center" }}
onPress = {() => {isSelected(1)}}
>
    <Text>Contacts</Text>
</TouchableOpacity>

</View>
</View>
<View style = {{flex:0.6}}>
{selected == 0 ?friendsTemplate:contactsTemplate}
</View>
</View>
)
}
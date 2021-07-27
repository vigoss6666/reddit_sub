import  React, {useState,useRef,useEffect, useContext} from 'react';
import { View, StyleSheet, Text, TextInput,TouchableOpacity,ScrollView,Image, FlatList,Picker,PanResponder,Animated, TouchableWithoutFeedback, SafeAreaView, Platform} from 'react-native';
import { useMutation,useQuery } from '@apollo/react-hooks';
import Constants from 'expo-constants';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {Header} from '../../src/common/Common'; 
import AppContext from '../../AppContext'; 
import {updateUser} from '../../networking';
import * as Notifications from 'expo-notifications';
import {Button} from 'react-native-elements'; 
async function registerForPushNotificationsAsync() {
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}

export default function Posted({navigation}){
    const myContext = useContext(AppContext); 
    const {userId, CustomBackComponent} = myContext;
    

    const _sendToServer = async () => {
        
        const token  = await registerForPushNotificationsAsync(); 
        if(token){
          updateUser(userId, {posted:true, pushToken:token})
          return; 
        }
        updateUser(userId, {posted:false})

      }    
      useEffect(() => {
        navigation.setOptions({
          headerTitle:false, 
          headerLeft:() => <CustomBackComponent navigation = {navigation}/>
        })
      }, [])
return(
<View style = {{flex:1}}>

<View style = {{flex:0.7, justifyContent:"center", alignItems:"center"}}>
<MaterialCommunityIcons name="chat-processing" size={120} color="black" />
<Header text = {"Keep me posted"}/>
<Text style = {{fontWeight:"600"}}>Find out when you get a match or message</Text>
</View>
<View style = {{flex:0.3}}>
{/* <TouchableOpacity style = {{borderWidth:1,padding:20,backgroundColor:"black"}}
onPress = {() => {_sendToServer(),navigation.navigate('EnableLocation')}}
>
    <Text style = {{color:"white", fontWeight:"600"}}>I Want to be Notified</Text>
</TouchableOpacity> */}
<Button
  title="I Want To Be Notified"
  type="outline"
  containerStyle = {{backgroundColor:"black",marginLeft:30, marginRight:30}}
  titleStyle = {{color:"white", fontWeight:"bold"}}
  disabledStyle = {{backgroundColor:"grey",}}
  onPress = {() => {_sendToServer(),navigation.navigate('AccountType', {page:'Something'})}}
  disabled = {false}
/>
<TouchableOpacity 
style = {{padding:20,justifyContent:"center",alignItems:'center'}}
onPress = {() => {updateUser(userId, {posted:false}),navigation.navigate('AccountType',{page:'something'})}}
>
    <Text style = {{ fontWeight:"600"}}>NOT NOW1</Text>
</TouchableOpacity>


</View>
</View>
)
}
import  React, {useState,useRef,useEffect,useContext} from 'react';
import { View, StyleSheet, Text, TextInput,TouchableOpacity,ScrollView,Image,FlatList,Picker,PanResponder,Animated, TouchableWithoutFeedback, SafeAreaView} from 'react-native';
import { Button } from 'react-native-elements'; 
import { useMutation,useQuery } from '@apollo/react-hooks';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import {Header} from '../../src/common/Common'; 
import AppContext from '../../AppContext'; 
import {updateUser} from '../../networking';
import * as Location from 'expo-location';
export default function Tell({navigation}){
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState("");
    const myContext = useContext(AppContext);
    const {userId, CustomBackComponent} = myContext;
    useEffect(() => {
        navigation.setOptions({
          headerShown:false
          
        })
      }, [])
      const handleLocation = async () => {
        let { status } = await Location.requestPermissionsAsync();   
        if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
          }
          let location = await Location.getCurrentPositionAsync({});
          
            setLocation(location);
            
            updateUser(userId,{ latitude:location.coords.latitude, longitude:location.coords.longitude,state:"california", subLocality:"San Francisco"})
            navigation.navigate('LoadPermission'); 
            
            
             
         
          
    }
return(
<View style = {{flex:1,marginTop:30,backgroundColor:'white'}}>
<View style = {{flex:0.3, marginTop:30}}>
<TouchableOpacity onPress = {() => {navigation.goBack()}} style = {{alignSelf:'center'}}>
<MaterialIcons name="keyboard-arrow-down" size={40} color="black" />
</TouchableOpacity>
</View>
<View style = {{flex:0.5,alignItems:'center'}}>
 <Image source = {require('../../assets/kibla.png')} style = {{height:120, width:120}}/> 
<Header text = {"Meet People Nearby"} style = {{marginTop:10}}/>
<Text style = {{fontWeight:'bold',marginTop:10}}>Your location will be used to increase the quality</Text>
<Text style = {{alignSelf:'center', fontWeight:'bold'}}>  of our match suggestions</Text>

</View>
<View style = {{flex:0.2}}>

<Button 
title = {'Allow Location'}
onPress = {() => {handleLocation()}}
type = {'outline'}
containerStyle = {{backgroundColor:'black',marginLeft:30, marginRight:30}}
titleStyle = {{color:'white'}}
>
    
</Button>
</View>

</View>
)
}
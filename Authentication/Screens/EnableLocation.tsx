import  React, {useState,useRef,useEffect, useContext} from 'react';
import { View, StyleSheet, Text, TextInput,TouchableOpacity,ScrollView,Image, Button,FlatList,Picker,PanResponder,Animated, TouchableWithoutFeedback, SafeAreaView} from 'react-native';
import { useMutation,useQuery } from '@apollo/react-hooks';
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import {Header, Continue} from '../../src/common/Common'; 
import AppContext from '../../AppContext'; 
import {updateUser} from '../../networking';
import * as Location from 'expo-location';
import {firebase} from '../../config'; 
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function EnableLocation({navigation}){
    const myContext = useContext(AppContext); 
    const {userId, CustomBackComponent} = myContext;
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState("");
    useEffect(() => {
        navigation.setOptions({
          headerTitle:false, 
          headerLeft:() => <CustomBackComponent navigation = {navigation}/>
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
        // const lamer = firebase.functions().httpsCallable('batman'); 
        // lamer({lat:location.coords.latitude, lon:location.coords.longitude})
        // .then(result => {
        //       updateUser(userId,{state:"california", subLocality:result.data.sublocality})
               
              

        //      //.then(() =>  navigation.navigate('LoadContacts'))
        //      // put the load contacts page right here, tomorrow, 
             
        // })
        navigation.navigate('ProfileHidden'); 
        
         
     
      
}    
return(
<View style = {{flex:1, justifyContent:'center', alignItems:'center'}}>
<View style = {{flex:0.2, }}>

</View>
<View style = {{flex:0.5}}>
<Entypo name="location-pin" size={200} color="black" style = {{alignSelf:"center"}} />
<Header text = {"Enable Location"}/>
<Text> You will need to enable location in order </Text>
<Text style = {{alignSelf: 'center',}}> to use Friends Help Friends</Text>
</View>
<View style = {{flex:0.3}}>
<TouchableOpacity 
onPress = {() => {handleLocation()}}
style = {{borderWidth:1, padding:20, backgroundColor:'black' }}>
    <Text style = {{color:"white", fontWeight:"bold"}}>Allow location</Text>
    
</TouchableOpacity>
<TouchableOpacity 
style = {{justifyContent:"center", alignItems:"center", marginTop:20, flexDirection:'row'}}
onPress = {() => {navigation.navigate('Tell')}}
>
    <Text>Tell me More</Text>
    <AntDesign name="caretdown" size={10} color="black" />
</TouchableOpacity>
</View>
</View>
)
}
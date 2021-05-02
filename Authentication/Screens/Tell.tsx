import  React, {useState,useRef,useEffect,useContext} from 'react';
import { View, StyleSheet, Text, TextInput,TouchableOpacity,ScrollView,Image, Button,FlatList,Picker,PanResponder,Animated, TouchableWithoutFeedback, SafeAreaView} from 'react-native';
import { useMutation,useQuery } from '@apollo/react-hooks';
import { AntDesign } from '@expo/vector-icons';
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
          headerTitle:false, 
          headerLeft:false,
          
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
            navigation.navigate('ProfileHidden'); 
            
            
             
         
          
    }
return(
<View style = {{flex:1, alignItems:"center"}}>
<View style = {{flex:0.1, marginTop:30}}>
<TouchableOpacity onPress = {() => {navigation.navigate('EnableLocation')}}>
<AntDesign name="caretup" size={24} color="black" />
</TouchableOpacity>
</View>
<View style = {{flex:0.5, alignItems:"center"}}>

<TouchableOpacity 
onPress = {() => {handleLocation()}}
style = {{borderWidth:1, padding:20, backgroundColor:'black' }}>
    <Text style = {{color:"white", fontWeight:"bold"}}>Allow location</Text>
</TouchableOpacity>
</View>
<View style = {{flex:0.4}}>
<Header text = {"Meet People Nearby"}/>
<Text style = {{fontWeight:'bold'}}>Your location will be used to increase the quality</Text>
<Text style = {{alignSelf:'center', fontWeight:'bold'}}>  of our match suggestions</Text>
</View>

</View>
)
}
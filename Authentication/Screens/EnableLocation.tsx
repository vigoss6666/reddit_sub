import  React, {useState,useRef,useEffect} from 'react';
import { View, StyleSheet, Text, TextInput,TouchableOpacity,ScrollView,Image, Button,FlatList,Picker,PanResponder,Animated, TouchableWithoutFeedback, SafeAreaView} from 'react-native';
import { useMutation,useQuery } from '@apollo/react-hooks';
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import {Header, Continue} from '../../src/common/Common'; 
import * as Location from 'expo-location';
import {firebase} from '../../config'; 
export default function EnableLocation({navigation}){
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState("");
const handleLocation = async () => {
    let { status } = await Location.requestPermissionsAsync();   
    if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
      }
      let location = await Location.getCurrentPositionAsync({});
      
      setLocation(location);
      const currentUser = firebase.auth().currentUser; 
        const db = firebase.firestore();
        console.log(currentUser.uid)
        db.collection('user').doc(currentUser.uid).set({ latitude:location.coords.latitude, longitude:location.coords.longitude}, {merge:true}).then(val => console.log)
        navigation.navigate('LoadContacts', {page:"something"})
      
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
onPress = {() => {navigation.navigate('LoadContacts')}}
>
    <Text>Tell me More</Text>
    <AntDesign name="caretdown" size={10} color="black" />
</TouchableOpacity>
</View>
</View>
)
}
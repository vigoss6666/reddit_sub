import  React, {useState,useRef,useEffect, useContext} from 'react';
import { View, StyleSheet, Text, TextInput,TouchableOpacity,ScrollView,Image, Button,FlatList,Picker,PanResponder,Animated, TouchableWithoutFeedback, SafeAreaView, Dimensions} from 'react-native';
import { useMutation,useQuery } from '@apollo/react-hooks';
import MapView, { Callout, Marker } from 'react-native-maps';
import { mutateSettings } from '../../networking';
import { firebase } from '../../config'; 
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import AppContext from '../../AppContext'; 
import {updateUser} from '../../networking';
import { LoadScreen } from '../../src/common/Common';
import { MaterialIcons } from '@expo/vector-icons';
const db = firebase.firestore(); 


export default function MapViewSelfGame({navigation,route}){
  const myContext = useContext(AppContext);
  const {user, userId} = myContext; 
  const [x, setX] = useState({latitude:user.latitude, longitude:user.longitude});
  const [markers, setMarkers] = useState({latlng:{}});  
  const [location, setLocation] = useState({}); 
  const [clientIndex, setClientIndex] = useState(); 
  const {selfMatchView} = route.params; 
  
  
  
  
  useEffect(() => {
      
      setMarkers({latlng:{latitude:user.latitude, longitude:user.longitude}}) 
      
  }, []) 

  
  
  // useEffect(() => {
  //   navigation.setOptions({
  //     headerShown:false, 
      
      
  //   })
  // }, [])
  
  
  
  

  const handleServerLocation = async () => {
    const lamer = firebase.functions().httpsCallable('batman');
     if(Object.keys(markers.latlng) == 0){
      return; 
     }
     const result = await lamer({lat:markers.latlng.latitude, lon:markers.latlng.longitude });       
     
     db.collection('user').doc(userId).set({latitude:markers.latlng.latitude, longitude:markers.latlng.longitude,state:result.data.state, subLocality:result.data.sublocality}, {merge:true})
      .then(() => console.log("location added"))
      .catch(() => console.log("location update failed"))
     
  }
  const computeIndex = (flatListuser) => {
      
    const result = selfMatchView.data.findIndex(val => val.phoneNumber == flatListuser.phoneNumber);
    return result;  
 }

  const window = Dimensions.get('window');
            const { width, height }  = window
            const LATITUD_DELTA = 0.0922
            const LONGITUDE_DELTA = LATITUD_DELTA * (width / height)

    
        const markerTemplate = selfMatchView.data.map(val => {
                return <Marker  coordinate = {{latitude:val.latitude, longitude:val.longitude}}>
                {val.profilePic ? <Image source = {{uri:val.profilePic}} style = {{height:30, width:30, borderRadius:15}}/>:<MaterialIcons name="account-circle" size={30} color="black" />}
                
                <Callout onPress = {() => navigation.navigate('SelfMatchView', {selfMatchView,userIndex:computeIndex(val)})}>
                  <Text style = {{fontWeight:'bold', color:'maroon'}}>{val.dimension}</Text>  
                </Callout>    
            </Marker> 
        })
        return(
            <View style = {{flex:1, marginTop:60}}>
            <View style = {{flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginBottom:40}}>
              <Text>
            
              </Text>
              
              <TouchableOpacity onPress = {() => { navigation.goBack()}}>
                <Text style = {{color:'orange', marginRight:10}}>Done</Text>
              </TouchableOpacity>
              
              </View>  
            
            <MapView
                 style = {{width: Dimensions.get('window').width,
                 height: Dimensions.get('window').height, }} 
                 mapType = "standard"
                 //onPress={(e) => setMarkers({ latlng: e.nativeEvent.coordinate })}
                 region={{
                  latitude: user.latitude,
                  longitude: user.longitude,
                  latitudeDelta: LATITUD_DELTA,
                  longitudeDelta: LONGITUDE_DELTA,
                }}
              >
              
                 
                 <Marker  coordinate = {markers.latlng}></Marker>
                 {markerTemplate}
              
                    
              
              </MapView>
              </View>
              
            
            )

      
      return <LoadScreen />           

}
import  React, {useState,useRef,useEffect, useContext} from 'react';
import { View, StyleSheet, Text, TextInput,TouchableOpacity,ScrollView,Image, Button,FlatList,Picker,PanResponder,Animated, TouchableWithoutFeedback, SafeAreaView, Dimensions} from 'react-native';
import { useMutation,useQuery } from '@apollo/react-hooks';
import MapView, { Marker } from 'react-native-maps';
import { mutateSettings } from '../../networking';
import { firebase } from '../../config'; 
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import AppContext from '../../AppContext'; 
import {updateUser} from '../../networking';
const db = firebase.firestore(); 


export default function NewContactLocation({navigation}){
  useEffect(() => {
    navigation.setOptions({
      headerShown:false, 
      // headerTitle:() => <Text>Select a Location</Text>, 
      // headerLeft:false, 
      // headerRight:() => <TouchableOpacity onPress = {() => {handleServerLocation(), navigation.navigate('AccountSettings')} }>  
      // <Text style = {{alignSelf:"flex-end", marginRight:10, marginTop:10, color:"orange", fontWeight:"bold"}}>Done</Text>  
      // </TouchableOpacity>
      
    })
  }, [])
  const myContext = useContext(AppContext);
  const {user, userId, setContactLocation, 
    contactLocation, 
    xClient, 
    setXClient} = myContext; 
  
  const [markers, setMarkers] = useState({latlng:{}});  
  const [location, setLocation] = useState({}); 
  
  console.log("gamer is")
  

  const handleServerLocation = async () => {
    const lamer = firebase.functions().httpsCallable('batman');
     if(Object.keys(markers.latlng) == 0){
      return; 
     }
     const result = await lamer({lat:markers.latlng.latitude, lon:markers.latlng.longitude });       
     setXClient({latitude:markers.latlng.latitude, longitude:markers.latlng.longitude})
     setContactLocation({state:result.data.state, subLocality:result.data.sublocality})
     navigation.navigate('NewContact')
    //  db.collection('user').doc(userId).set({latitude:markers.latlng.latitude, longitude:markers.latlng.longitude,state:result.data.state, subLocality:result.data.sublocality}, {merge:true})
    //   .then(() => console.log("location added"))
    //   .catch(() => console.log("location update failed"))
     
  }

  useEffect(() => {

  }, [])
  const window = Dimensions.get('window');
            const { width, height }  = window
            const LATITUD_DELTA = 0.0922
            const LONGITUDE_DELTA = LATITUD_DELTA * (width / height)
return(
<View style = {{flex:1, marginTop:60}}>
<View style = {{flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginBottom:40}}>
  <Text>

  </Text>
  <Text>
    Select a Location
  </Text>
  <TouchableOpacity onPress = {() => {handleServerLocation() }}>
    <Text style = {{color:'orange', marginRight:10}}>Done</Text>
  </TouchableOpacity>
  
  </View>  
  
<MapView
     style = {{width: Dimensions.get('window').width,
     height: Dimensions.get('window').height, }} 
     mapType = "standard"
     onPress={(e) => setMarkers({ latlng: e.nativeEvent.coordinate })}
     region={{
      latitude:39.72806655640531 ,
      longitude: -121.83803400265697,
      latitudeDelta: LATITUD_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    }}
  >
  
     
         <Marker  coordinate = {markers.latlng}></Marker>
     
  
        <GooglePlacesAutocomplete
              styles = {{container:{ }}}
              placeholder = {"Type location"}
              fetchDetails = {true} 
              onPress={(data, details = null) => {
                
                setX({latitude:details?.geometry.location.lat, longitude:details?.geometry.location.lng})
                const state = ""; 
                const result = details?.address_components.map(val => {
                   return val.types.map(val1 => {
                      if(val1 == 'administrative_area_level_1'){
                         
                         
                         //setState(val.long_name)
                      }
                      if(val1 == 'administrative_area_level_2'){
                        
                        
                        //setSubLocality(val.long_name)
                     }
                   })
                })
                 
                
              }}
              query={{
                key: 'AIzaSyBxsuj6tm1D5d3hEfG2ASfleUBIRREl15Y',
                language: 'en',
              }}
        />  

  
  </MapView>
  </View>
  

)
}
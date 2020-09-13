import  React, {useState,useRef,useEffect} from 'react';
import { View, StyleSheet, Text, TextInput,TouchableOpacity,ScrollView,Image, Button,FlatList,Picker,PanResponder,Animated, TouchableWithoutFeedback, SafeAreaView, Dimensions} from 'react-native';
import { useMutation,useQuery } from '@apollo/react-hooks';
import MapView, { Marker } from 'react-native-maps';
import { mutateSettings } from '../../networking';


export default function MapViewMainer({navigation}){
  const [x, setX] = useState({latitude:37.768865, longitude:-122.475338});
  const [markers, setMarkers] = useState({latlng:{}});  
  const window = Dimensions.get('window');
            const { width, height }  = window
            const LATITUD_DELTA = 0.0922
            const LONGITUDE_DELTA = LATITUD_DELTA * (width / height)
            console.log(typeof markers.latlng.latitude)
return(
<View>
<TouchableOpacity onPress = {() => {mutateSettings({latPreference:markers.latlng.latitude, lonPreference:markers.latlng.longitude}), navigation.navigate('AccountSettings')} }>  
<Text style = {{alignSelf:"flex-end", marginRight:10, marginTop:10, color:"orange", fontWeight:"bold"}}>Done</Text>  
</TouchableOpacity>
<MapView
     style = {{width: Dimensions.get('window').width,
     height: Dimensions.get('window').height,marginTop:10}} 
     mapType = "standard"
     onPress={(e) => setMarkers({ latlng: e.nativeEvent.coordinate })}
     initialRegion={{
      
      latitude: 37.7749,
      longitude: -122.4194,
      latitudeDelta: LATITUD_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    }}
  >
  
     
        <Marker  coordinate = {markers.latlng}></Marker>
     
  
  

  
  </MapView>
  </View>
  

)
}
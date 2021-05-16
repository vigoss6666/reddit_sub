import  React, {useState,useRef,useEffect, useContext} from 'react';
import { Text, View, StyleSheet,Dimensions, ScrollView, Image } from 'react-native';
import {firebase} from '../../config'; 
import AppContext from '../../AppContext'; 
import {updateUser,getObjectFromDatabase} from '../../networking';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MapView, { Marker } from 'react-native-maps';
// @refresh reset 
import { MaterialIcons } from '@expo/vector-icons';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import {Button} from 'react-native-elements'; 
import { TouchableOpacity } from 'react-native-gesture-handler';
const db = firebase.firestore(); 

interface ContactsLocationLatestProps {}

const SingleContactLocation = ({navigation, route}) => {
  const [sliderState, setSliderState] = useState({ currentPage: 0 });
  const myContext = useContext(AppContext); 
  const {user, userId, singleContact, CustomBackComponent,defaultDataObject,setSingleContact,computeName} = myContext;


  const [flatListChanged, setFlatListChanged] = useState(1)
  const [profiles, setProfiles] = useState([]);  
  const insets = useSafeAreaInsets();
  const [x, setX] = useState({latitude:37.768865, longitude:-122.475338});
  const [markers, setMarkers] = useState([]);  
  const [location, setLocation] = useState({}); 
  const [gate, setGate] = useState(true); 
  console.log(location.address)
  useEffect(() => {
    navigation.setOptions({
        headerTitle:false, 
        headerLeft: () => <CustomBackComponent navigation = {navigation}/>
    })
  }, [])
  const handleServerLocation = async () => {
     const marker1 = Array.from(markers);  
     const lamer = firebase.functions().httpsCallable('batman');
     const batch = db.batch();
     const clientUser = await db.collection('user').doc(singleContact.phoneNumber).get();  
     await Promise.all(marker1.map(async val => {
          const result = await lamer({lat:val.latlng.latitude, lon:val.latlng.longitude });
          //setSingleContact(Object.assign({}, {...clientUser.data()}, {latitude:val.latlng.latitude, longitude:val.latlng.longitude, state:result.data.state, subLocality:result.data.sublocality})); 
          const obj = Object.assign({}, defaultDataObject, clientUser.data(),{latitude:val.latlng.latitude, longitude:val.latlng.longitude,state:result.data.state, subLocality:result.data.sublocality})
          console.log("objecter"); 
          console.log(obj)
          const ref = db.collection('user').doc(val.client); 
          batch.set(ref, {...obj, matchMakers:firebase.firestore.FieldValue.arrayUnion(userId)}); 
     }))
     await batch.commit()
     db.collection('user').doc(userId).update({contactList:firebase.firestore.FieldValue.arrayRemove(singleContact.phoneNumber)});
     db.collection('user').doc(userId).update({datingPoolList:firebase.firestore.FieldValue.arrayUnion(singleContact.phoneNumber)}).then(() => {
       navigation.navigate('Homer');   
     })

     
  }

const updateToServer = async () => {
     const getUser = await db.collection('user').doc(singleContact.phoneNumber).get();  
     const user = Object.assign({},{...defaultDataObject}, {...getUser.data()})
     db.collection('user').doc(singleContact.phoneNumber).set({...user, matchMakers:firebase.firestore.FieldValue.arrayUnion(userId)}, {merge:true}).then(() => {
     db.collection('user').doc(userId).update({contactList:firebase.firestore.FieldValue.arrayRemove(singleContact.phoneNumber)});
     db.collection('user').doc(userId).update({datingPoolList:firebase.firestore.FieldValue.arrayUnion(singleContact.phoneNumber)}).then(() => {
       navigation.navigate('Homer');   
     })
     }) 
  }
  const handleMarker = (marker) => {
      
    const copy = markers.concat(); 
    const index = copy.findIndex(val => val.client == marker.client); 
    if(index !== -1){
      copy[index] = marker; 
      setMarkers(copy); 
      return; 
    } 
    setMarkers([...markers, marker])
    
}


  useEffect(() => {
    if(profiles.length > 0){
    const filter = markers.map(val => val.client); 
    console.log("filter is")
    console.log(filter)
    if(markers.length < 1){
        setGate(true); 
        return; 
    }
    var filtered = profiles.filter(
        function(e) {
          return this.indexOf(e.phoneNumber) < 0;
        },
        filter
    );
    if(filtered.length > 0 ){
         setGate(true); 
         return; 
    }
    setGate(false); 
     } 
    

  }, [markers])

  useEffect(() => {
       
  }, [])
  const window = Dimensions.get('window');
            const { width, height }  = window
            const LATITUD_DELTA = 0.0922
            const LONGITUDE_DELTA = LATITUD_DELTA * (width / height)
            

  
 
  
  
  useEffect(() => {
    async function namer(){
     
     setProfiles([singleContact]); 
 
    }
    namer()
    
 }, [])
 console.log("sliderState current "+sliderState.currentPage)
  const setSliderPage = (event: any) => {
    const { currentPage } = sliderState;
    const { x } = event.nativeEvent.contentOffset;
    const { width, height } = Dimensions.get('window');
    
    
    
    const indexOfNextScreen = Math.floor(x / width);
    if (indexOfNextScreen !== currentPage ) {
      setSliderState({
        ...sliderState,
        currentPage: indexOfNextScreen,
      });
    }
  };
  
  const sliderTemplate = profiles.map(val => (
    <View style={{ width,  height,}} key = {val._id}>
    <View style = {{ alignItems:"center",marginBottom:10}}>
    
    {val.profilePic ? <Image source = {{uri:val.profilePic}} style = {{height:80, width:80, borderRadius:40}}/>:<MaterialIcons name="account-circle" size={75} color="black" />}
    <Text style = {{fontWeight:"bold", marginTop:10}}>{ computeName(val) }'s location</Text>
    
    </View>

  


<MapView
     style = {{width: Dimensions.get('window').width,
     height: Dimensions.get('window').height, }} 
     mapType = "standard"
     onPress={(e) => handleMarker({latlng: e.nativeEvent.coordinate, client:profiles[sliderState.currentPage].phoneNumber })}
     
     region={{
      latitude: x.latitude,
      longitude: x.longitude,
      latitudeDelta: LATITUD_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    }}
  >
  
     
        {/* {markers.length > 0 ?  <Marker  coordinate = {markers[0].latlng}></Marker>:null } */}
        {markers.map(val => <Marker coordinate = {val.latlng}/>)}
     
  
        <GooglePlacesAutocomplete
              styles = {{container:{flex:1 }}}
              placeholder = {"Type location"}
              keyboardShouldPersistTaps = {'always'}
              fetchDetails = {true} 
              onPress={(data, details = null) => {
                console.log(details?.geometry.location)
                setX({latitude:details?.geometry.location.lat, longitude:details?.geometry.location.lng})
                const state = ""; 
                const result = details?.address_components.map(val => {
                   return val.types.map(val1 => {
                      if(val1 == 'administrative_area_level_1'){
                         console.log(val.long_name)
                         setLocation({state: val.long_name, address:data.description})
                      }
                   })
                   setFlatListChanged(flatListChanged+1)
                })
                 
                
              }}
              query={{
                key: 'AIzaSyBxsuj6tm1D5d3hEfG2ASfleUBIRREl15Y',
                language: 'en',
              }}
        />  
    </MapView>
  
    </View>
))
  return (
      <View style = {{flex:1, paddingBottom:insets.bottom}}>
      <ScrollView
      keyboardShouldPersistTaps = {'always'}

style = {{flex:1, paddingTop:insets.top }} 
horizontal = {true}
pagingEnabled = {true}
scrollEventThrottle={8}
onScroll={(event: any) => {
  setSliderPage(event);
}}
>
{sliderTemplate}
</ScrollView>

<View style = {{marginTop:40, marginLeft:30, marginRight:30 }}>
<Button title = {"Done"} disabled = {gate} onPress = {() => handleServerLocation()} />
</View>
</View>

    
  );
};

export default SingleContactLocation;

const styles = StyleSheet.create({
  container: {}
});

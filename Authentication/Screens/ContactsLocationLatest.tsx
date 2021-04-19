import  React, {useState,useRef,useEffect, useContext} from 'react';
import { Text, View, StyleSheet,Dimensions, ScrollView, Image } from 'react-native';
import {firebase} from '../../config'; 
import AppContext from '../../AppContext'; 
import {updateUser} from '../../networking';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MapView, { Marker } from 'react-native-maps';
// @refresh reset 
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import {Button} from 'react-native-elements'; 
const db = firebase.firestore(); 

interface ContactsLocationLatestProps {}

const ContactsLocationLatest = ({navigation, route}) => {
  const [sliderState, setSliderState] = useState({ currentPage: 1 });
  const myContext = useContext(AppContext); 
  const {user, userId} = myContext;

  const [flatListChanged, setFlatListChanged] = useState(1)
  const [profiles, setProfiles] = useState([]);  
  const insets = useSafeAreaInsets();
  const [x, setX] = useState({latitude:37.768865, longitude:-122.475338});
  const [markers, setMarkers] = useState([]);  
  const [location, setLocation] = useState({}); 
  const [gate, setGate] = useState(true); 
  
  const handleServerLocation = () => {
     const marker1 = Array.from(markers);  
     const batch = db.batch(); 
     marker1.map(val => {
          const ref = db.collection('user').doc(val.client); 
          batch.set(ref, {latitude:val.latlng.latitude, longitude:val.latlng.longitude}, {merge:true}); 
     })
     batch.commit().then(console.log("documents have been updated"))
  }


const handleMarker = (marker) => {
    setMarkers([...markers, marker])
    
}


  useEffect(() => {
    if(profiles.length > 0){
    const filter = markers.map(val => val.client); 
    
    
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
     const onResult = await db.collection('user').where(firebase.firestore.FieldPath.documentId(), 'in', user.datingPoolList).get();
     const users = onResult.docs.map(val => val.data()); 
     const profilesWithMatchMaker = users.filter(val => val.matchMaker == userId); 
     const profilesWithoutMatchmaker = users.filter(val => val.matchMaker !== userId); 
     const finalUsers = [...profilesWithoutMatchmaker, ...profilesWithMatchMaker]; 
     const finalTransformed = finalUsers.map((val, index) => ( {...val, zIndex:index}));
     finalTransformed.sort(function(a,b) { return b.zIndex - a.zIndex})
     setProfiles(finalTransformed); 
 
    }
    namer()
    
 }, [])
 
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
  const computeName = (obj) => {
    if(obj.name){
       return obj.name
    }
    if(obj.firstName && obj.lastName){
       return obj.firstName+obj.lastName
    }
    return obj.firstName
 }
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
                
                setX({latitude:details?.geometry.location.lat, longitude:details?.geometry.location.lng})
                const state = ""; 
                const result = details?.address_components.map(val => {
                   return val.types.map(val1 => {
                      if(val1 == 'administrative_area_level_1'){
                         
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
contentOffset = {{x:414, y:0}}
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
<Button title = {"Done"} disabled = {gate} onPress = {() => {handleServerLocation(), navigation.navigate('Homer')}} />
</View>
</View>

    
  );
};

export default ContactsLocationLatest;

const styles = StyleSheet.create({
  container: {}
});

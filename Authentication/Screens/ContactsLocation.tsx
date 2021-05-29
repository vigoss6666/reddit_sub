import  React, {useState,useRef,useEffect, useContext} from 'react';
import {  View, StyleSheet, ScrollView, TouchableOpacity, Image, FlatList} from 'react-native';
import {Button} from 'react-native-elements';
import AppContext from '../../AppContext'; 
import {updateUser} from '../../networking';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import {firebase} from '../../config';
import { MaterialIcons } from '@expo/vector-icons';
import { Input, Text } from 'react-native-elements';
import {Jailer} from '../../src/common/Common'; 

const db = firebase.firestore();  

const Inputter = (props) => (<Input 
placeholder = "Hello world"
/>)


interface ContactsLocationProps {}

const ContactsLocation = ({navigation}) => {
    const [location, setLocation] = useState([]);  
    const myContext = useContext(AppContext); 
    const [flatListChanged, setFlatListChanged] = useState(1)
    const { userId, computeName} = myContext; 
    const [profiles, setProfiles] = useState([]);  
    const [state, setState] = useState(); 
    const [gate, checkGate] = useState(true);
    const [user,setUser] = useState({}); 
    

    useEffect(() => {
      db.collection('user').doc(userId).get().then(onDoc => {
          setUser(onDoc.data())
      })
    }, [])
    
   //  const updateToServer  = () => { 
   //    const batch = db.batch(); 
   //    location.map(val => {
   //       const ref = db.collection('user').doc(val.phoneNumber); 
   //       batch.set(ref, {state:val.state, address:val.address }, {merge:true})
   //    })
   //    batch.commit().then(() => {
   //       navigation.navigate('ContactsPhotos') 
   //    }) 
   //  }
    const updateToServer  = () => { 
      const batch = db.batch(); 
      profiles.map(val => {
         const ref = db.collection('user').doc(val.phoneNumber); 
         batch.set(ref, {state:'california', address:'bay area', latitude:32.735487, longitude:-117.149025 }, {merge:true})
      })
      batch.commit().then(() => {
         navigation.navigate('ContactsPhotos') 
      }) 
    }
    
    
     const renderItem = ({ item }) => (
        <View style = {{flex:1, }}>
               <View style = {{flexDirection:'row', alignItems:'center', flex:0.9, marginBottom:10}}>
                      {item.profilePic ? <Image source = {{uri:item.profilePic}} style = {{height:40, width:40, borderRadius:20}}/>:<MaterialIcons name="account-circle" size={30} color="black" />}
                      <Text style = {{marginLeft:10,maxHeight:50, maxWidth:100}} numberOfLines = {2}>{computeName(item)}</Text>

                      </View>  
              <GooglePlacesAutocomplete
              key = {item.phoneNumber}
              styles = {{container:{ }}}
              placeholder = {"Type location"}
              fetchDetails = {true} 
              onPress={(data, details = null) => {
                const state = ""; 
                const result = details?.address_components.map(val => {
                   return val.types.map(val1 => {
                      if(val1 == 'administrative_area_level_1'){
                         setLocation([...location, { state: val.long_name, address:data.description, phoneNumber:item.phoneNumber }])
                      }
                   })
                })
                 
                setFlatListChanged(flatListChanged+1)
              }}
              query={{
                key: 'AIzaSyBxsuj6tm1D5d3hEfG2ASfleUBIRREl15Y',
                language: 'en',
              }}
        />  
        </View>
      );
    
useEffect(() => {
   async function namer(){
    const onResult = await db.collection('user').where(firebase.firestore.FieldPath.documentId(), 'in', user.datingPoolList).get();
    const users = onResult.docs.map(val => val.data()); 
    const profilesWithMatchMaker = users.filter(val => val.matchMaker == userId); 
    const profilesWithoutMatchmaker = users.filter(val => val.matchMaker !== userId); 
    const finalUsers = [...profilesWithoutMatchmaker, ...profilesWithMatchMaker]; 
    const finalTransformed = profilesWithMatchMaker.map((val, index) => ( {...val, zIndex:index}));
    finalTransformed.sort(function(a,b) { return b.zIndex - a.zIndex})
    setProfiles(finalTransformed); 

   }
   if(Object.keys(user).length){
      namer()
  }
   
   
}, [user])

    const homePlace = {
        description: 'Home',
        geometry: { location: { lat: 48.8152937, lng: 2.4597668 }},
      };
      const workPlace = {
        description: 'Work',
        geometry: { location: { lat: 48.8496818, lng: 2.2940881 } },
      };
  return (
    <View style = {{flex:1,marginLeft:20, marginRight:20 }}>
    <View style = {{flex:0.1, }}>
    
    </View>
    <View style = {{flex:0.1}}>
    <Text h4 style = {{alignSelf:'center', fontWeight:"600"}}>Tell us about your friends</Text>
    <Text h5 style = {{alignSelf:'center', fontWeight:"600"}}>Confirm the location of each friend</Text>
   
    </View>
    <View style = {{flex:0.6}}>
    <FlatList
        data={profiles}
        renderItem={renderItem}
        keyExtractor={item => item.phoneNumber}
        extraData = {flatListChanged}
        keyboardShouldPersistTaps = {true}

        style = {{ }}
        
        contentInset={{ right: 0, top: 0, left: 0, bottom: 100 }}
      />
      
       
       
     
    
    </View>
    <View style = {{flex:0.2, justifyContent:'center',marginTop:10 }}>
    {/* <Button title = "save" containerStyle = {{marginLeft:30, marginRight:30,}} buttonStyle = {{backgroundColor:'black'}} onPress = {() => { updateToServer(), navigation.navigate('ContactsPhotos')}} disabled = {profiles.length !== location.length ? true:false}></Button>    */}
    <Button title = "save" containerStyle = {{marginLeft:30, marginRight:30,}} buttonStyle = {{backgroundColor:'black'}} onPress = {() => { updateToServer()}} ></Button>   

    </View>
    </View>
    
  );
};

export default ContactsLocation;

const styles = StyleSheet.create({
  container: {}
});

import  React, {useState,useRef,useEffect, useContext} from 'react';
import {  View, StyleSheet, ScrollView, TouchableOpacity, Image, FlatList} from 'react-native';
import {Button} from 'react-native-elements';
import AppContext from '../../AppContext'; 
import {updateUser} from '../../networking';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import {firebase} from '../../config';
import { MaterialIcons } from '@expo/vector-icons';
import { Input, Text } from 'react-native-elements';
import {Jailer, LoadScreen} from '../../src/common/Common'; 
import { Entypo } from '@expo/vector-icons';

const db = firebase.firestore();  

const Inputter = (props) => (<Input 
placeholder = "Hello world"
/>)


interface ContactsLocationProps {}

const ContactsLocation = ({navigation}) => {
    const [location, setLocation] = useState([]);  
    const myContext = useContext(AppContext); 
    const [flatListChanged, setFlatListChanged] = useState(1)
    const { userId, computeName,profiles, setProfiles} = myContext; 
    const [loading, setLoading] = useState(false); 
      
    const [state, setState] = useState(); 
    const [gate, setGate] = useState(true);
    const [user,setUser] = useState({}); 


    useEffect(() => {
     profiles.map(val => {
        if(!val.localityName){
           setGate(true)
           return; 
        }
        setGate(false) 
     }) 
    }, [profiles])
    

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
         batch.set(ref, {state:val.state, subLocality:val.subLocality, localityName:val.localityName }, {merge:true})
      })
      batch.commit().then(() => {
         navigation.navigate('SignUpComplete') 
      }) 
    }
    
    
     const renderItem = ({ item }) => (
        <View style = {{flex:1, marginTop:10 }}>
               <View style = {{flexDirection:'row', alignItems:'center', flex:1, marginBottom:10,justifyContent:'space-between'}}>
                      <View style = {{flexDirection:'row',alignItems:'center'}}>
                      {item.profilePicSmall ? <Image source = {{uri:item.profilePicSmall}} style = {{height:40, width:40, borderRadius:20}}/>:<MaterialIcons name="account-circle" size={40} color="black" />}
                      <View>
                      <Text style = {{marginLeft:10,maxHeight:50, maxWidth:100,marginBottom:10}} numberOfLines = {1}>{computeName(item)}</Text>
                      <Text style = {{fontWeight:'bold', fontSize:10,marginLeft:10,fontStyle:'italic',}}>{item.localityName}</Text> 
                      </View>
                      </View>
                      {item.localityName ?<TouchableOpacity onPress = {() => navigation.navigate('ContactsLocationSingular', {item})}><Entypo name="location" size={24} color="black" /></TouchableOpacity> : <TouchableOpacity style = {{justifyContent:'flex-end'}} onPress = {() => navigation.navigate('ContactsLocationSingular', {item})}>
<Text style = {{fontStyle:'italic', fontWeight:'bold', fontSize:12}}> Select Location </Text>
</TouchableOpacity>}
                   

                      </View>  
                      {/* <Text style = {{fontWeight:'bold', fontSize:10,marginLeft:40,marginBottom:10,fontStyle:'italic'}}>{item.localityName}</Text> */}
            
        </View>
      );
    
useEffect(() => {
   async function namer(){
    setLoading(true) 
    const onResult = await db.collection('user').where(firebase.firestore.FieldPath.documentId(), 'in', user.datingPoolList).get();
    const users = onResult.docs.map(val => val.data()); 
    const profilesWithMatchMaker = users.filter(val => val.matchMaker == userId); 
    const profilesWithoutMatchmaker = users.filter(val => val.matchMaker !== userId); 
    const finalUsers = [...profilesWithoutMatchmaker, ...profilesWithMatchMaker]; 
    const finalTransformed = profilesWithMatchMaker.map((val, index) => ( {...val, zIndex:index}));
    finalTransformed.sort(function(a,b) { return b.zIndex - a.zIndex})
    setProfiles(finalTransformed); 
    setLoading(false); 

   }
   if(Object.keys(user).length && !profiles.length){
      namer()
  }
   
   
}, [])


console.log(profiles)

    const homePlace = {
        description: 'Home',
        geometry: { location: { lat: 48.8152937, lng: 2.4597668 }},
      };
      const workPlace = {
        description: 'Work',
        geometry: { location: { lat: 48.8496818, lng: 2.2940881 } },
      };
     if(loading){
        return (
           <LoadScreen />
        )
     } 

  return (
    <View style = {{flex:1, backgroundColor:'white' }}>
    
    <View style = {{flex:0.1,marginTop:20}}>
    <Text h4 style = {{alignSelf:'center', fontWeight:"600"}}>Tell us about your friends</Text>
    <Text h5 style = {{alignSelf:'center', fontWeight:"600"}}>Confirm the location of each friend</Text>
   
    </View>
    <View style = {{flex:0.7,marginLeft:20, marginRight:20,}}>
    <FlatList
        data={profiles}
        renderItem={renderItem}
        keyExtractor={item => item.phoneNumber}
        // extraData = {profiles}
        
        ItemSeparatorComponent = {() => <View style = {{borderBottomWidth:1}}/>}
        

        style = {{ }}
        
        contentInset={{ right: 0, top: 0, left: 0, bottom: 100 }}
      />
      
       
       
     
    
    </View>
    <View style = {{flex:0.2, justifyContent:'center',marginTop:10 }}>
    {/* <Button title = "save" containerStyle = {{marginLeft:30, marginRight:30,}} buttonStyle = {{backgroundColor:'black'}} onPress = {() => { updateToServer(), navigation.navigate('ContactsPhotos')}} disabled = {profiles.length !== location.length ? true:false}></Button>    */}
    <Button title = "I'm Done" containerStyle = {{marginLeft:30, marginRight:30,}} buttonStyle = {{backgroundColor:'black'}} disabled = {gate} onPress = {() => { updateToServer()}} ></Button>   

    </View>
    </View>
    
  );
};

export default ContactsLocation;

const styles = StyleSheet.create({
  container: {}
});

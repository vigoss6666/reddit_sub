import { MaterialIcons } from '@expo/vector-icons';
import  React, {useState,useRef,useEffect, useContext} from 'react';
import { Text, View, StyleSheet,Dimensions, ScrollView, Image } from 'react-native';
import AppContext from '../../AppContext';  
import {Button,Input} from 'react-native-elements'; 
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

interface ContactsLocationSingularProps {}

const ContactsLocationSingular = ({navigation,route}) => {
    const myContext = useContext(AppContext); 
    const { userId,computeName,CustomBackComponent,setUser,defaultDataObject,setProfilesAuth, setId, profiles, setProfiles} = myContext;
    const {item} = route.params; 
    const ref = useRef();

    useEffect(() => {
        console.log(' waid caleld')
        // if(ref.current){
        //      ref.current.clear()
        // }
      }, []);
    

    const setLocation  = async (location) => {
    //     if(ref.current){
    //         ref.current.clear()
    //    }
       const copy = profiles;  
       const index = copy.findIndex(val => val.phoneNumber == item.phoneNumber); 
       console.log("index is"+index)
       copy[index].localityName = location.localityName; 
       copy[index].subLocality = location.subLocality; 
       copy[index].state = location.state; 
       await setProfiles(copy); 
    
    
     
       navigation.navigate('ContactsLocation')
         
    }


    
    useEffect(() => {
        navigation.setOptions({
          headerTitle:false, 
          headerLeft:() => <CustomBackComponent navigation = {navigation}/>
          
        })
      }, [])
  return (
    <View style={styles.container}>
      <View style = {{justifyContent:'center', alignItems:'center',marginTop:20}}>
      {item.profilePicSmall ? <Image source = {{uri:item.profilePicSmall}} style = {{height:80, width:80, borderRadius:40}}/>:<MaterialIcons name="account-circle" size={50} color="black" />}   
        <Text>{computeName(item)}</Text>
      </View>
      <GooglePlacesAutocomplete
              styles = {{container:{ marginTop:30,marginLeft:10, marginRight:20 }}}
              
              ref = {ref}
              placeholder = {"Leon Valley"}
              fetchDetails = {true} 
              textInputProps = {
                {
                  InputComp: Input,
                  
                }
              }
              onPress={(data, details = null) => {
                // console.log(details.name)
                //setJob(details.name)
                //console.log(details)
                
                // navigation.goBack()
                console.log(details?.name)
                const subLocality = details.address_components.filter(val => val.types.includes('administrative_area_level_2')); 
                const state = details.address_components.filter(val => val.types.includes('administrative_area_level_1')); 
                setLocation({
                   localityName:details?.name, 
                   subLocality:subLocality.length ? subLocality[0].long_name:null, 
                   state:state.length ? state[0].long_name:null,

                })


                
                
                
                 
                
              }}
              query={{
                key: 'AIzaSyBxsuj6tm1D5d3hEfG2ASfleUBIRREl15Y',
                language: 'en',
              }}
              
        /> 
    </View>
  );
};

export default ContactsLocationSingular;

const styles = StyleSheet.create({
  container: {flex:1, backgroundColor:'white'}
});

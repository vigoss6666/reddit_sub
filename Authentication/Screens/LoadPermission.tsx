import  React, {useState,useRef,useEffect, useContext} from 'react';
import { Text, View, StyleSheet, Alert } from 'react-native';
import {Button} from 'react-native-elements'; 
import * as Contacts from 'expo-contacts';
import * as IntentLauncher from 'expo-intent-launcher';
import * as Linking from 'expo-linking';

interface LoadPermissionProps {}

const LoadPermission = ({navigation, route}) => {
   const [error, setError] = useState(false);  

   const openSettings = () => {
    Linking.openURL('app-settings:');
   }

   useEffect(() => {
    // Linking.openURL('app-settings:');
    async function namer(){
        const result = await Contacts.getPermissionsAsync()
        console.log(result)
        if(result.status !== 'granted'){
            Alert.alert(
                'Friends Help Friends Would Like to Access Your Contacts',
                'Access is needed to your contacts to make matchmaking easier',
                [
                  { text: 'OK', onPress: () => _getPermission()}
                ],
                { cancelable: false }
              );
              return; 

        }
        navigation.navigate('LoadContacts')
        
        

    }
    namer()
    
    

   }, [])
   const _getPermission = async () => {
    const { status } = await Contacts.requestPermissionsAsync();
    if(status == 'granted'){
        navigation.navigate('LoadContacts')
        return; 
    }
    setError(true)  
    
  }

   

  
  return (
    <View style={{flex:1,justifyContent:'center', alignItems:'center'}}>
       {/* <View style = {{marginLeft:30,marginRight:30}}> 
         <Button title = {'Enable Contacts Permission'}  containerStyle = {{backgroundColor:'black'}} type = {'outline'} titleStyle = {{color:'white'}}></Button>   
         <Text style = {{marginTop:10,fontSize:17, color:'red',fontStyle:'italic'}}>Contacts permission required! </Text>
      </View>  */}
      {error ? <View style = {{marginLeft:30,marginRight:30}}> 
         <Button title = {'Enable Contacts Permission'} onPress = {openSettings} containerStyle = {{backgroundColor:'black'}} type = {'outline'} titleStyle = {{color:'white'}}></Button>   
         <Text style = {{marginTop:10,fontSize:17, color:'red',fontStyle:'italic'}}>Contacts permission required! </Text>
      </View>:null}
    </View>
  );
};

export default LoadPermission;

const styles = StyleSheet.create({
  container: {}
});

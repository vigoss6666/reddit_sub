import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View,Button, AsyncStorage, Settings } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Name from './Authentication/Screens/Name';
import BirthDay from './Authentication/Screens/BirthDay';  
import Gender from './Authentication/Screens/Gender';  
import GenderPreference from './Authentication/Screens/GenderPreference'; 
import Height from './Authentication/Screens/Height';  
import Feet from './Authentication/Screens/Feet'; 
import Inches from './Authentication/Screens/Inches'; 
import EnableLocation from './Authentication/Screens/EnableLocation'; 
import Tell from './Authentication/Screens/Tell'; 
import Email from './Authentication/Screens/Email'; 
import VerifyCode from './Authentication/Screens/VerifyCode';
import Password from './Authentication/Screens/Password';
import Posted from './Authentication/Screens/Posted';
import ProfileHidden from './Authentication/Screens/ProfileHidden';
import Phone from './Authentication/Screens/Phone';
import CountryCodes from './Authentication/Screens/CountryCodes';
import Intro from './Authentication/Screens/Intro';
import Intro2 from './Authentication/Screens/Intro2';
import Intro3 from './Authentication/Screens/Intro3';
import Intro4 from './Authentication/Screens/Intro4'; 
import VerifyEmail from './Authentication/Screens/VerifyEmail'; 
import EmailVerified from './Authentication/Screens/EmailVerified';
import VerifyPhone from './Authentication/Screens/VerifyPhone'; 
import PhoneSuccess from './Authentication/Screens/PhoneSuccess'; 
import LoadContacts from './Authentication/Screens/LoadContacts'; 
import Try from './Authentication/Screens/Try'; 
import Contacts from './Authentication/Screens/Contacts'; 
import ContactsSex from './Authentication/Screens/ContactsSex'; 
import ContactsMenu from './Authentication/Screens/ContactsMenu'; 
import ContactsAge from './Authentication/Screens/ContactsAge'; 
import NewContact from './Authentication/Screens/NewContact'; 
import ContactLoadSuccess from './Authentication/Screens/ContactLoadSuccess';
import Playgame from './Game/Screens/Playgame'; 
import Play20 from './Game/Screens/Play20';
import ProfilePool from './Authentication/Screens/ProfilePool';
import SettingsHome from './Account/Screens/SettingsHome';  
import AccountSettings from './Account/Screens/AccountSettings';
import MapViewMainer from './Account/Screens/MapViewMainer';
import Photos from './Account/Screens/Photos';
import ImageSlider from './Account/Screens/ImageSlider'; 
import DetailsSettings from './Account/Screens/DetailsSettings'; 
import Login from './Authentication/Screens/Login'; 
import Checker from './Authentication/Screens/Checker';
import School from './Authentication/Screens/School'; 
import Job from './Authentication/Screens/Job';
import AddPhoto from './Authentication/Screens/AddPhoto';
import Hometown from './Authentication/Screens/Hometown';


import { useMutation, useQuery, useSubscription } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
const localhost: string = 'http://192.168.43.7:3000/graphql';
const production: string = 'https://zabardast.herokuapp.com/graphql'; 
import { gql } from 'apollo-boost'; 
import { client , mutateSettings}  from './networking'; 
client.writeData({
  data:{
       error:"Nothing", 
       password:"something"
  }
})

// async function getId(){
//    const result = await AsyncStorage.getItem('_id')
//    return result; 
// }

// const client = new ApolloClient({ 
//   uri: production, 
//   request: async (operation) => {
//     operation.setContext({
//       headers: {
//         username: await getId() || "not defined" 
//       }
//     })
//   }
// });
const REGISTER_USER = gql`
 mutation namer {
    registerUser
 }
` 

//getDatingPool: DatingPoolObjectList!
const GET_HELLO = gql`
 query {
   
    getDatingPool {
       data {
          _id 
          firstname 
          name 
       }
    }
 }
`; 


const Stack = createStackNavigator();
function HomeScreen({navigation}){
   return (
   <View style = {{justifyContent:"center", alignItems:"center",flex:1,backgroundColor:"white"}}>
     <Button title = {"Press me"} onPress  = {() => navigation.navigate("Side") }>

     </Button>
   </View>)
}


function SideScreen(){
   return (
      <View>
        <Text>Side screen </Text>
      </View>
   )
}


export default function App() {
  async function namer(){
    const _id = await AsyncStorage.getItem("_id");
    if(_id){
      return; 
    }
    const result =  await client.mutate({mutation:REGISTER_USER})
    console.log(result)   
    AsyncStorage.setItem('_id', result.data.registerUser);
    console.log( await AsyncStorage.getItem('_id')) 
  }
  namer()
   
  
  return (
     <ApolloProvider client={client}>
      <NavigationContainer>
      <Stack.Navigator screenOptions = {{headerShown:true}}>
        <Stack.Screen name="Home" component={DetailsSettings} />
        <Stack.Screen name="Side" component={SideScreen}/>
        <Stack.Screen name="Name" component={Name}/>
        <Stack.Screen name="Birthday" component={BirthDay}/>
        <Stack.Screen name="Gender" component={Gender}/>
        <Stack.Screen name="GenderPreference" component={GenderPreference}/>
        <Stack.Screen name="Height" component={Height}/>
        <Stack.Screen name="Feet" component={Feet}/>
        <Stack.Screen name="Inches" component={Inches}/>
        <Stack.Screen name="EnableLocation" component={EnableLocation}/>
        <Stack.Screen name="Tell" component={Tell}/>
        <Stack.Screen name="Email" component={Email}/>
        <Stack.Screen name="VerifyCode" component={VerifyCode}/>
        <Stack.Screen name="Password" component={Password}/>
        <Stack.Screen name="Posted" component={Posted}/>
        <Stack.Screen name="ProfileHidden" component={ProfileHidden}/>
        <Stack.Screen name="Phone" component={Phone}/>
        <Stack.Screen name="CountryCodes" component={CountryCodes}/>
        <Stack.Screen name="Intro" component={Intro}/>
        <Stack.Screen name="Intro2" component={Intro2}/>
        <Stack.Screen name="Intro3" component={Intro3}/>
        <Stack.Screen name="Intro4" component={Intro4}/>
        <Stack.Screen name="VerifyEmail" component={VerifyEmail}/>
        <Stack.Screen name="EmailVerified" component={EmailVerified}/>
        <Stack.Screen name="VerifyPhone" component={VerifyPhone}/>
        <Stack.Screen name="PhoneSuccess" component={PhoneSuccess}/>
        <Stack.Screen name="LoadContacts" component={LoadContacts}/>
        <Stack.Screen name="ContactsSex" component={ContactsSex}/>
        <Stack.Screen name="ContactsAge" component={ContactsAge}/>
        <Stack.Screen name="Contacts" component={Contacts}/>
        <Stack.Screen name="ContactLoadSuccess" component={ContactLoadSuccess}/>
        <Stack.Screen name="NewContact" component={NewContact}/>
        <Stack.Screen name="Playgame" component={Playgame}/>
        <Stack.Screen name="Play20" component={Play20}/>
        <Stack.Screen name="ProfilePool" component={ProfilePool}/>
        <Stack.Screen name="SettingsHome" component={SettingsHome}/>
        <Stack.Screen name="AccountSettings" component={AccountSettings } header = {false}/>
        <Stack.Screen name="MapVeiw" component={MapViewMainer}/>
        <Stack.Screen name="ImageSlider" component={ImageSlider}/>
        <Stack.Screen name="DetailsSettings" component={DetailsSettings}/>
        <Stack.Screen name="AddPhotos" component={Photos}/>
        <Stack.Screen name="MapViewMainer" component={MapViewMainer}/>
        <Stack.Screen name="Login" component={Login}/>
        <Stack.Screen name="Checker" component={Checker}/>
        <Stack.Screen name="School" component={School}/>
        <Stack.Screen name="Job" component={Job}/>
        <Stack.Screen name="Hometown" component={Hometown}/>
        <Stack.Screen name="AddPhoto" component={AddPhoto}/>
      </Stack.Navigator>
    </NavigationContainer>
     </ApolloProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

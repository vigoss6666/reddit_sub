import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View,Button, AsyncStorage } from 'react-native';
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







import { useMutation, useQuery, useSubscription } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
const localhost: string = 'http://192.168.1.23:3000/graphql';
import { gql } from 'apollo-boost'; 

async function getId(){
   const result = await AsyncStorage.getItem('_id')
   return result; 
}

const client = new ApolloClient({ 
  uri: localhost, 
  request: async (operation) => {
    operation.setContext({
      headers: {
        username: await getId() || "not defined" 
      }
    })
  }
});
const REGISTER_USER = gql`
 mutation namer {
    registerUser
 }
` 



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
    const result =  await client.mutate({mutation:REGISTER_USER})   
    AsyncStorage.setItem('_id', result.data.registerUser); 
    console.log(await AsyncStorage.getItem('_id'))

  }
  namer()
  
  return (
     <ApolloProvider client={client}>
      <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Intro} />
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

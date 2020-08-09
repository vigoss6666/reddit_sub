import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View,Button } from 'react-native';
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
  return (
      <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Tell} />
        <Stack.Screen name="Side" component={SideScreen}/>
        <Stack.Screen name="Name" component={SideScreen}/>
        <Stack.Screen name="Birthday" component={BirthDay}/>
        <Stack.Screen name="Gender" component={Gender}/>
        <Stack.Screen name="GenderPreference" component={GenderPreference}/>
        <Stack.Screen name="Height" component={Height}/>
        <Stack.Screen name="Feet" component={Feet}/>
        <Stack.Screen name="Inches" component={Inches}/>
        <Stack.Screen name="EnableLocation" component={EnableLocation}/>
        <Stack.Screen name="Tell" component={Tell}/>
        

        

        
      </Stack.Navigator>
    </NavigationContainer>
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

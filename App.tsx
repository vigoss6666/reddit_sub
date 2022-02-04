import React, { useState, useEffect,useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList,Image,TouchableOpacity,ActivityIndicator } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { FontAwesome5, Entypo } from '@expo/vector-icons';
import formatDistanceStrict from 'date-fns/formatDistance'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import DropDownPicker from 'react-native-dropdown-picker';
import { SearchBar } from 'react-native-elements';
import { WebView } from 'react-native-webview';
import toDate from 'date-fns/toDate'
import RedditMain from './RedditMain';
import WebViewer from './WebView'; 
import { createStackNavigator } from '@react-navigation/stack'; 
import { NavigationContainer } from '@react-navigation/native';






export default function App(){
  const Stack = createStackNavigator();
  function mainStack(){
    return (
      <SafeAreaProvider>
      <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen name="Home" component={RedditMain} options = {{headerShown:false}}/>
      <Stack.Screen name="WebViewer" component= {WebViewer} /> 
    </Stack.Navigator>
    </NavigationContainer>
    </SafeAreaProvider>
    )
  }
  return (
    mainStack()
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop:100,
    marginRight:10, 
    marginLeft:5
    },
   dateView:{
     width:'40%',
    height:50,
    //backgroundColor:'green',
    alignSelf:'flex-end',
    justifyContent:'center', 
    alignItems:'center'
  }, 
  bottomTextFont:{
    fontSize:14, 
    color:'grey'
  },
  box: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 2,
  },
  titleText:{
  fontSize:15,   
  fontWeight:'500',
  flexWrap:'wrap',
  width:'90%'
},
dateTextStyle:{
  fontSize:12, 
  color:'grey'
}

});

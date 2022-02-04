import React, { useState, useEffect,useRef } from 'react';
import { TouchableOpacity,Text } from 'react-native';
import { WebView } from 'react-native-webview';



export default function WebViewer({route,navigation}){
let {url} = route.params; 
useEffect(() => {
     navigation.setOptions({
        headerTitle:'', 
        headerLeft:() => {
             return <TouchableOpacity onPress = {() => navigation.goBack()} style = {{marginLeft:20}}>
              <Text>
                 Back 
              </Text>      
             </TouchableOpacity>
        }     
     })
})
return (
    <WebView
      source={{
        uri: url
      }}
      
    />
  );

}
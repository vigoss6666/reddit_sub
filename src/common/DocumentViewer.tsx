import  React, {useState,useRef,useEffect} from 'react';
import { View, StyleSheet, Text, TextInput,TouchableOpacity,ScrollView,Image, Button,FlatList,Picker,PanResponder,Animated, TouchableWithoutFeedback, SafeAreaView} from 'react-native';
import { useMutation,useQuery } from '@apollo/react-hooks';
import { WebView } from 'react-native-webview';
export default function DocumentViewer({navigation, route}){
  const {uri} = route.params;    
return(
<WebView source={{ uri: uri }} style={{ marginTop: 20 }} />
)
}
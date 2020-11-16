import  React, {useState,useRef,useEffect} from 'react';
import { View, StyleSheet, Text, TextInput,TouchableOpacity,ScrollView,Image, Button,FlatList,Picker,PanResponder,Animated, TouchableWithoutFeedback, SafeAreaView} from 'react-native';
import { useMutation,useQuery } from '@apollo/react-hooks';
import { Video } from 'expo-av';
import VideoPlayer from 'expo-video-player'




export default function VideoPlayer1({navigation, route}){
   const {uri} =  route.params; 
   console.log(uri)
return(
<View style = {{flex:1, justifyContent:'center', alignItems:'center'}}>
<VideoPlayer
  videoProps={{
    shouldPlay: true,
    resizeMode: Video.RESIZE_MODE_CONTAIN,
    source: {
      uri: uri,
    },
  }}
  inFullscreen={false}
  fadeInDuration = {200}
  showControlsOnLoad = {true}
  disableSlider = {false}
  videoBackground = {"black"}
  thumbImage = {uri}
/>
</View>
)
}
import  React, {useState,useRef,useEffect} from 'react';
import { View, StyleSheet, Text, TextInput,TouchableOpacity,ScrollView,Image, Button,FlatList,Picker,PanResponder,Animated, TouchableWithoutFeedback, SafeAreaView, Platform} from 'react-native';
import { useMutation,useQuery } from '@apollo/react-hooks';
import {firebase} from '../../config'; 
import * as Google from 'expo-google-app-auth';

import * as ImagePicker from 'expo-image-picker';
export default function Tester({navigation}){
    async function signInWithGoogleAsync() {
        console.log("called")
        try {
          const result = await Google.logInAsync({
            
            iosClientId: "1038446780024-fgtna4nqcjk0kius1k47bg45abhk0mrc.apps.googleusercontent.com",
            scopes: ['profile', 'email'],
          });
      
          if (result.type === 'success') {
            console.log(result.accessToken)
            fetch("https://people.googleapis.com")  
            return result.accessToken;
          } else {
            return { cancelled: true };
          }
        } catch (e) {
          return { error: true };
        }
      }
    const [image, setImage] = useState("https://reactnative.dev/img/tiny_logo.png");
    useEffect(() => {
        (async () => {
          if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
            if (status !== 'granted') {
              alert('Sorry, we need camera roll permissions to make this work!');
            }
          }
        })();
      }, []);    
      const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    
        console.log(result);
    
        if (!result.cancelled) {
          const response = await fetch(result.uri); 
          const blob = await response.blob(); 
          const ref = firebase.storage().ref().child("images/"+ "gamer1"); 
          ref.put(blob)
          const result1 = ref.getDownloadURL().then(url => {setImage(url)}); 
          
          
        }
      };


return(
<View style = {{flex:1, justifyContent:'center', alignItems:'center'}}>
<Image source = {{uri:image}} style = {{height:30, width:30}}/>
<Button title = {"Set Image"} onPress = {() => signInWithGoogleAsync()}/>
</View>
)
}
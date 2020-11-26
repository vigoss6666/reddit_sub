import React, { useState, useEffect,useRef } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import * as ImageManipulator from 'expo-image-manipulator';
import { firebase } from '../../config';

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

export default function Camera1({navigation, route}) {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const camera12 = useRef(); 
  const {db, chatID, userId} = route.params; 
  const snap = async () => {
       if(camera12.current){
        let photo = await camera12.current.takePictureAsync();
        console.log(photo)
        const manipResult = await ImageManipulator.manipulateAsync(
            photo.uri,
            [{resize:{width:200, height:200}}],
            { compress: 0.1, format: ImageManipulator.SaveFormat.PNG,}
          );
          const response = await fetch(manipResult.uri); 
            const blob = await response.blob(); 
            const namer = Math.random().toString(36).substring(2);
            const ref = firebase.storage().ref().child("images/"+ namer); 
            await ref.put(blob)
            const result1 = await ref.getDownloadURL(); 
            const serverObject = {
            _id:uuidv4(), 
            createdAt:firebase.firestore.Timestamp.fromDate(new Date()),
            image:result1,
           user:{
           _id:userId
           }   
    }
    db.collection('messages').doc(chatID).collection("messages").add(serverObject);
     navigation.navigate('Chat'); 
    }
       
  }

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={{ flex: 1 }}>
      <Camera style={{ flex: 1 }} type={type} ref = {camera12}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'transparent',
            flexDirection: 'row',
          }}>
          <TouchableOpacity
            style={{
              flex: 0.1,
              alignSelf: 'flex-end',
              alignItems: 'center',
            }}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}>
            <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> Flip </Text>
            
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flex: 0.1,
              alignSelf: 'flex-end',
              alignItems: 'center',
            }}
            onPress={() => {
              snap(); 
            }}>
            <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> click </Text>
            
          </TouchableOpacity>
            
        </View>
      </Camera>
    </View>
  );
}
import  React, {useState,useRef,useEffect, useContext, useLayoutEffect, useCallback, forwardRef, createRef} from 'react';
import { Text, View, StyleSheet } from 'react-native';
import {Button} from 'react-native-elements'; 
import {createChatThread, updateUser} from '../../networking';
import { Video } from 'expo-av';
import AppContext from '../../AppContext';

interface GamePreviewProps {}


const GamePreview = ({navigation}) => {
    useEffect(() => {
      navigation.setOptions({
          headerTitle:false, 
      })  
    }, [])
    
    const myContext = useContext(AppContext);   
    const {user, userId, computeName} = myContext;
    const handleGame = () => {
        updateUser(userId, {gamePreview:true});
        navigation.navigate('PlayGameLatest')
         
      }
  return (
    <View style = {{flex:1}}>
      <Video
        
        style={{flex:0.9}}
        source={require('../../assets/Project%20Name.mp4')}
        shouldPlay
        resizeMode="contain"
        isLooping = {true}
        
        // onPlaybackStatusUpdate={status => setStatus(() => status)}
      />
      <View style = {{flex:0.1, marginTop:20}}> 
      <Button onPress = {handleGame} title = {"Get Started"} containerStyle = {{marginLeft:30, marginRight:30,marginTop:10}}></Button>
      </View> 
     </View>
  );
};

export default GamePreview;

const styles = StyleSheet.create({
  container: {}
});

import  React, {useState,useRef,useEffect,useContext} from 'react';
import { Text, View, StyleSheet,Image } from 'react-native';
import {Button} from 'react-native-elements'; 



const HalfRound  = ({navigation}) => {
    useEffect(() => {
       navigation.setOptions({
        headerShown:false
       }) 
    }, [])
useEffect(() => {
setTimeout(() => navigation.goBack(), 1000)
}, [])    
  return (
    <View style={{flex:1, backgroundColor:'white'}}>
      <View style = {{flex:0.1}}>
      </View>  
      <View style = {{flex:0.7}}>
      <Image source = {require('../../assets/halfround.png')} style = {{width:'100%',height:'100%'}}/>
      </View>  
      <View style = {{flex:0.2}}>
  {/* <Button
  title="Play Again"
  type="outline"
  containerStyle = {{backgroundColor:"black",marginLeft:30, marginRight:30}}
  titleStyle = {{color:"white", fontWeight:"bold"}}
  disabledStyle = {{backgroundColor:"grey",}}
  onPress = {() => navigation.goBack()}
  />
  <Button
  title="Maybe Not"
  type="outline"
  containerStyle = {{backgroundColor:"black",marginLeft:30, marginRight:30, marginTop:30}}
  titleStyle = {{color:"white", fontWeight:"bold"}}
  disabledStyle = {{backgroundColor:"grey",}}
  /> */}

      </View>
      
    </View>
  );
};

export default HalfRound;

const styles = StyleSheet.create({
  container: {flex:1}
});

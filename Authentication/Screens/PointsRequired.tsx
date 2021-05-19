import { FontAwesome } from '@expo/vector-icons';
import  React, {useState,useRef,useEffect, useContext} from 'react';
import {  View, StyleSheet, Image, Dimensions } from 'react-native';
import {Text, Button} from 'react-native-elements'; 
import {Line} from '../../src/common/Common'; 
import AppContext from '../../AppContext';

interface PointsRequiredProps {}

const PointsRequired = ({navigation}) => {
  const myContext = useContext(AppContext);
  const {CustomBackComponent, setTempId,setUser,db} = myContext;
   React.useEffect(() => {
     navigation.setOptions({
       headerTitle:false, 
       headerLeft:() => <CustomBackComponent navigation = {navigation}/>
     })
   })
    const {width, height} = Dimensions.get('window'); 
  return (
    <View style={{flex:1, backgroundColor:'#ffffff'}}>
      <View style = {{flex:0.8, marginLeft:30, marginRight:30}}>
      <Text h2 style = {{alignSelf:'center',marginTop:100,fontWeight:'bold', fontStyle:'italic'}}>Points Required</Text>  
     <Image source = {{uri:'https://firebasestorage.googleapis.com/v0/b/friends-365d0.appspot.com/o/Screenshot%202021-05-19%20at%201.54.55%20PM.png?alt=media&token=8958c674-23aa-4378-bbd2-0a8631177a91'}} style = {{height:100, width:100,alignSelf:'center'}}/>
      
     <Line style = {{marginTop:10}}/>
     
     <View style = {{flexDirection:'row',justifyContent:'center',alignItems:'center',marginTop:30}}>
     <FontAwesome name="trophy" size={50} color="black" />
     <Text h4 style = {{fontWeight:'bold',}}>+100 </Text>

     </View>
     <Text h4 style = {{alignSelf:'center'}}>Matchmaking</Text>
     <Line style = {{marginTop:10}}/>

      </View>
      <View style = {{flex:0.2}}>
      <Button containerStyle = {{marginLeft:30, marginRight:30}} title = {"EARN MORE POINTS"} titleStyle = {{fontWeight:'bold'}} onPress = {() => navigation.navigate('PlayGameLatest')}/>
      </View>
    </View>
  );
};

export default PointsRequired;

const styles = StyleSheet.create({
  container: {}
});

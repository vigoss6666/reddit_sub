import  React, {useState,useRef,useEffect, useContext} from 'react';
import { Text, View, StyleSheet,Share } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import {ClientHeader, ClientDetails, ClientMatchMakers, ClientPhotos, ClientTraits} from '../../src/common/Common'; 
import AppContext from '../../AppContext';
import {Button} from 'react-native-elements'; 
import { HeaderTitle } from '@react-navigation/stack';
interface ClientViewProps {}

const ClientView = ({navigation, route}) => {
const myContext = useContext(AppContext); 
const {user, userId, CustomBackComponent} = myContext;
 useEffect(() => {
  navigation.setOptions({
    headerLeft:() => <CustomBackComponent navigation = {navigation}/>, 
    headerTitle:false
  })
 }, [])
  const {client} = route.params; 
  console.log(client.phoneNumber)
  const share = async () => {
      
         

    await Share.share({message:"https://friends-365d0.web.app/?name="+client.phoneNumber})
  
}
  
  
  return (
    <ScrollView style={{flex:1,}}>
      <View style = {{marginLeft:20, marginRight:20}}>
      <ClientHeader client = {client} style = {{flex:0.3, marginTop:30}}/>
      
      <ClientTraits client = {client}/>
      <ClientDetails client = {client} />
      <ClientPhotos client = {client}/>
      <ClientMatchMakers client = {client}/>
      <Button title = {"SHARE THIS PROFILE"} containerStyle = {{marginLeft:30, marginRight:30, marginTop:100, marginBottom:200,}} buttonStyle = {{backgroundColor:'green',}} onPress = {() => share()}></Button>
      
      </View>
    </ScrollView>
  );
};

export default ClientView;

const styles = StyleSheet.create({
  container: {}
});

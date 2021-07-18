import  React, {useState,useRef,useEffect,useContext} from 'react';
import { Dimensions,View, StyleSheet, Text, TextInput,TouchableOpacity,ScrollView,Image,FlatList,Picker,PanResponder,Animated, TouchableWithoutFeedback, SafeAreaView, KeyboardAvoidingView, Platform} from 'react-native';
import {Button} from 'react-native-elements'; 
import { useMutation,useQuery } from '@apollo/react-hooks';
import { Header } from '../../src/common/Common';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import AppContext from '../../AppContext';
export default function School({navigation}){
  const myContext = useContext(AppContext); 
    const {userId, CustomBackComponent,profilePicLocal} = myContext;
    const [openGate, setOpenGate] = useState(true); 
    const [Email, setEmail] = useState();
    useEffect(() => {
      navigation.setOptions({
        headerTitle:false, 
        headerLeft:() => <CustomBackComponent navigation = {navigation}/>
      })
    }, [])

    useEffect(() => {
      if(profilePicLocal){
        setOpenGate(false); 
      }
      if(!profilePicLocal){
        setOpenGate(true)
      }
    }, [profilePicLocal])

    const _handleEmail = () => {
    const hello = "zaheeryakub@gmail.com";     
   
   navigation.navigate('Password')
   
  }
    return(
      <KeyboardAvoidingView style = {{flex:1}} behavior={Platform.OS == "ios" ? "padding" : "height"}>
      <View style = {{flex:1, }}>   
      <View style = {{flex:0.2}}>
      {/* <TouchableOpacity onPress = {() => { navigation.navigate('School', {page:'something'})}}>
      <Text style = {{marginTop:20, alignSelf:"flex-end", marginRight:30, color:"orange", fontWeight:"bold"}}>Skip</Text>   
      </TouchableOpacity> */}
      </View>
      <View style = {{flex:0.5, marginLeft:30}}>
      <Text style = {{fontWeight:"bold", fontSize:23,  marginLeft:30 }}> Upload your photo</Text>
      <View style = {{borderBottomWidth:1, width:Dimensions.get('window').width - 60, marginTop:10}}/> 
      <View style = {{justifyContent:"center", alignItems:"center", marginTop:60, marginLeft:-30}}>
      {profilePicLocal ? <Image source = {{uri:profilePicLocal}} style = {{height:100, width:100, borderRadius:50}}/>: <MaterialIcons name="account-circle" size={120} color="black" />}
      </View>
      <View style = {{flexDirection:"row", justifyContent:"center"}}>
      <TouchableOpacity onPress = {() => navigation.navigate('AuthPhotos', {page:"AddPhoto"})} style = {{flexDirection:"row", alignItems:"center"}}>
      <Text style = {{ fontWeight:"bold", marginLeft:-30, marginRight:5}}>Change Photo</Text>
      <FontAwesome name="caret-down" size={24} color="black" />
      </TouchableOpacity>
      </View>
        <View style = {{borderBottomWidth:1, width:Dimensions.get('window').width - 60, marginTop:40, borderBottomColor:"grey"}}/> 
      </View>
      <View style = {{flex:0.3,justifyContent:"center", }}>
       {/* <Continue  onPress = {() => {_handleEmail(), mutateSettings({email:Email}) }}/>     */}
       <Button
  title="Continue"
  type="outline"
  containerStyle = {{backgroundColor:"black",marginLeft:30, marginRight:30}}
  titleStyle = {{color:"white", fontWeight:"700"}}
  disabledStyle = {{backgroundColor:"grey",}}
  disabled = {false}
  onPress = {() => { navigation.navigate('School', {page:'something'})}}
/>
      </View>
      </View>
      </KeyboardAvoidingView>
      )
}
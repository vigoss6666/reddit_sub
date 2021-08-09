import  React, {useState,useRef,useEffect, useContext} from 'react';
import { Keyboard,Dimensions,View, StyleSheet, Text, TextInput,TouchableOpacity,ScrollView,Image,FlatList,Picker,PanResponder,Animated, TouchableWithoutFeedback, SafeAreaView, KeyboardAvoidingView, Platform} from 'react-native';
import {Button,Input} from 'react-native-elements'; 
import { useMutation,useQuery } from '@apollo/react-hooks';
import { Header } from '../../src/common/Common';
import AppContext from '../../AppContext'; 
import {updateUser} from '../../networking';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';


export default function Hometown({navigation, route}){
  const myContext = useContext(AppContext); 
  const {userId,CustomBackComponent} = myContext; 
  const [job, setJob] = useState("");
  const [gate, setGate] = useState(true); 
  const page = "something"; 
  useEffect(() => {
    if(job.length < 1){
      setGate(true)
      return
    }
    setGate(false)
  }, [job])
  useEffect(() => {
    navigation.setOptions({
      headerTitle:false, 
      headerLeft:() => <CustomBackComponent navigation = {navigation}/>
    })
  }, [])
    // const {page} = route.params; 
    
    const _sendToServer = () => {
      updateUser(userId, {hometown:job})
    }

    const _handlePage = () => {
       if(page == "DetailsSettings"){
         navigation.navigate("DetailsSettings"); 
         return
       }
       navigation.navigate('EnableLocation')
       
    } 
       
    console.log(job)
    return(
      <KeyboardAvoidingView style = {{flex:1}} behavior={Platform.OS == "ios" ? "padding" : "height"}>
      <View style = {{flex:1, backgroundColor:'#ffffff'}}>   
      <View style = {{flex:0.2}}>
      <TouchableOpacity onPress = {() => _handlePage()}>
      <Text style = {{marginTop:20, alignSelf:"flex-end", marginRight:30, color:"orange", fontWeight:"bold"}}>Skip</Text>   
      </TouchableOpacity>
      </View>
      <View style = {{flex:0.5, marginLeft:30}}>
      <Text style = {{fontWeight:"bold", fontSize:23, }}> Where are you from?</Text>
      <View style = {{borderBottomWidth:1, width:Dimensions.get('window').width - 60, marginTop:10}}/> 
      {/* <TextInput 
      style = {{fontSize:35,borderBottomWidth:1, borderColor:"black",width:Dimensions.get('window').width -60,
        marginTop:40 }}
         placeholder = {"Ex: Leon valley, TX"}  
         autoCorrect = {false}
         autoCapitalize = {"words"}
         value = {job}
         onChangeText = {(text) => { setJob(text)}}
         
        ></TextInput> */}
        <TouchableWithoutFeedback onPress = {Keyboard.dismiss}>
        <GooglePlacesAutocomplete
              styles = {{container:{ marginTop:30,marginLeft:10, marginRight:20 }}}
              placeholder = {"Leon Valley"}
              fetchDetails = {true} 
              textInputProps = {
                {
                  InputComp: Input,
                }
              }
              onPress={(data, details = null) => {
                // console.log(details.name)
                setJob(details.name)
                
                const state = ""; 
                
                 
                
              }}
              query={{
                key: 'AIzaSyBxsuj6tm1D5d3hEfG2ASfleUBIRREl15Y',
                language: 'en',
              }}
              
        />  
  </TouchableWithoutFeedback>
  
      </View>
      <View style = {{flex:0.3, }}>
      <Button
  title="Continue"
  type="outline"
  containerStyle = {{backgroundColor:"black",marginLeft:30, marginRight:30,marginTop:100}}
  titleStyle = {{color:"white", fontWeight:"700"}}
  disabledStyle = {{backgroundColor:"grey",}}
  disabled = {gate}
  onPress = {() => { _sendToServer() , _handlePage()}}
/>
       {/* <Continue  onPress = {() => {_handleEmail(), mutateSettings({email:Email}) }}/>     */}
  
      </View>
      </View>
      </KeyboardAvoidingView>
      )
}
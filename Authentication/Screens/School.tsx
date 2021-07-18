import  React, {useState,useRef,useEffect, useContext} from 'react';
import { Dimensions,View, StyleSheet, Text, TextInput,TouchableOpacity,ScrollView,Image,FlatList,Picker,PanResponder,Animated, TouchableWithoutFeedback, SafeAreaView, KeyboardAvoidingView} from 'react-native';
import {Button} from 'react-native-elements'; 
import { useMutation,useQuery } from '@apollo/react-hooks';
import { Header } from '../../src/common/Common';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

import AppContext from '../../AppContext'; 
import {updateUser} from '../../networking';

export default function School({navigation,route}){
    const [Email, setEmail] = useState("");
    const myContext = useContext(AppContext); 
    const {userId,CustomBackComponent} = myContext;
    const {page} = route.params; 
    const [gate,setGate] = useState(true); 
    const [school, setSchool] = useState(null); 

    useEffect(() => {
      if(Email.length < 1){
        setGate(true)
        return
      }
      setGate(false)
    }, [Email])

    useEffect(() => {
      navigation.setOptions({
        headerTitle:false, 
        headerLeft:() => <CustomBackComponent navigation = {navigation}/>
      })
    }, [])
    const _handlePage = () => {
      if(page == "DetailsSettings"){
         navigation.navigate("DetailsSettings")
         return; 
      }
      navigation.navigate('Job', {page:"something"})
   }
        
       
  const _sendToServer = () => {
    updateUser(userId,{school:Email} )
  }
    return(
      <KeyboardAvoidingView style = {{flex:1}} behavior={Platform.OS == "ios" ? "padding" : "height"}>
      <View style = {{flex:1,backgroundColor:'#ffffaa' }}>   
      <View style = {{flex:0.2}}>
      <TouchableOpacity onPress = {() => { _handlePage()}}>
      <Text style = {{marginTop:20, alignSelf:"flex-end", marginRight:30, color:"orange", fontWeight:"bold"}}>Skip</Text>   
      </TouchableOpacity>
      </View>
      <View style = {{flex:0.5, marginLeft:30}}>
      <Text style = {{fontWeight:"bold", fontSize:23, }}> What school did you attend?</Text>
      <View style = {{borderBottomWidth:1, width:Dimensions.get('window').width - 60, marginTop:10}}/> 
      {/* <TextInput 
      style = {{fontSize:35,borderBottomWidth:1, borderColor:"black",width:Dimensions.get('window').width -60,
        marginTop:40 }}
         placeholder = {"Ex: UC Berkeley"}  
         autoCorrect = {false}
         autoCapitalize = {"none"}
         value = {Email}
         onChangeText = {(text) => { setEmail(text)}}
        ></TextInput> */}
        <GooglePlacesAutocomplete
              styles = {{container:{ marginTop:30,marginLeft:10, marginRight:20 }}}
              placeholder = {"UC Berkley"}
              fetchDetails = {true} 
              onPress={(data, details = null) => {
                console.log(details.name)
                setEmail(details.name)
                
                const state = ""; 
                
                 
                
              }}
              query={{
                key: 'AIzaSyBxsuj6tm1D5d3hEfG2ASfleUBIRREl15Y',
                language: 'en',
              }}
              
        />  
             <Button
  title="Continue"
  type="outline"
  containerStyle = {{backgroundColor:"black",marginLeft:30, marginRight:30,marginTop:100}}
  titleStyle = {{color:"white", fontWeight:"700"}}
  disabledStyle = {{backgroundColor:"grey",}}
  disabled = {gate}
  onPress = {() => { _sendToServer(), _handlePage()}}
/>
        
      </View>
      <View style = {{flex:0.3,justifyContent:"center", }}>
       {/* <Continue  onPress = {() => {_handleEmail(), mutateSettings({email:Email}) }}/>     */}
  
      </View>
      </View>
      </KeyboardAvoidingView>
      )
}
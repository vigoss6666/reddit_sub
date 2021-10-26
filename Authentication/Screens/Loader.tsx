import  React, {useState,useRef,useEffect, useContext} from 'react';
import { View, StyleSheet, Text, TextInput,TouchableOpacity,ScrollView,Image, FlatList,Picker,PanResponder,Animated, TouchableWithoutFeedback, SafeAreaView, Dimensions, Keyboard} from 'react-native';
import { useMutation,useQuery } from '@apollo/react-hooks';
import { MaterialIcons } from '@expo/vector-icons';
import {Button} from 'react-native-elements'; 
import AppContext from '../../AppContext'; 
import {updateUser} from '../../networking'; 

export default function Loader({navigation,route}){
    const myContext = useContext(AppContext); 
    const arr = [0,1,2,3,4,5]; 
    const {userId,registeredUsers, setRegisteredUsers,computeName} = myContext;
    

    useEffect(() => {
     Keyboard.dismiss()
    }, [])

    useEffect(() => {
       Keyboard.addListener('keyboardDidShow', () => {
            console.log('keyboard was shown in loader')
          //    Keyboard.dismiss(); 
       })    

    }, [])

    
    useEffect(() => {
         if(registeredUsers.length == 0){
              navigation.navigate('ContactLoadSuccess'); 
              Keyboard.dismiss()
         }
    },[])
    const others = registeredUsers.length > 5 ? <Text style = {{fontWeight:'bold', fontSize:20, marginTop:30, fontStyle:'italic'}}>...and {registeredUsers.length -5} others </Text>:null
    const imageTemplate = registeredUsers.length > 5 ? arr.map(val => {
         return registeredUsers[val].profilePicSmall ? <View style = {{alignItems:'center',marginRight:-10}} key = {registeredUsers[val].firstName+registeredUsers[val].lastName}>
         <Image source = {{uri:registeredUsers[val].profilePicSmall}} style = {{height:50, width:50, borderRadius:25}}/>
         {/* <Text style = {{fontWeight:'bold', marginTop:5,maxWidth:50,maxHeight:50}}>{computeName(registeredUsers[val])}</Text> */}
         
         </View>:<View style = {{alignItems:'center',marginRight:-10}} key = {registeredUsers[val].firstName+registeredUsers[val].lastName}>
         <MaterialIcons name="account-circle" size={50} color="black" />
         {/* <Text style = {{fontWeight:'bold', marginTop:5, maxWidth:50,maxHeight:50 }}>{computeName(registeredUsers[val])}</Text> */}
         
         </View>
                  
    }):registeredUsers.map(val => {
        return val.profilePicSmall ? <View style = {{alignItems:'center', marginRight:0}} key = {val.firstName+val.lastName}>
        <Image source = {{uri:val.profilePicSmall}} style = {{height:60, width:60, borderRadius:30}}/>
        {/* <Text style = {{fontWeight:'bold', marginTop:5,maxWidth:50, maxHeight:50}}>{computeName(val)}</Text> */}
         
        </View>:<View style = {{alignItems:'center',}} key = {val.firstName+val.lastName}>
        <MaterialIcons name="account-circle" size={60} color="black" />
        {/* <Text style = {{fontWeight:'bold', marginTop:5,maxHeight:50, maxWidth:50}}>{computeName(val)}</Text> */}
         
        </View>
                 
   })
    

return(
<TouchableOpacity style = {{flex:1,backgroundColor:"white" }} onPress = {Keyboard.dismiss}>
<View style = {{flex:0.2}}>

</View>
<View style = {{flex:0.6, marginLeft:10, alignItems:'center'}}>
<Text style = {{fontWeight:'bold', fontSize:40, fontStyle:'italic'}}>Welcome!</Text>
<Text style = {{fontWeight:'bold', fontSize:20, marginTop:30}}>Here's who's already using</Text>
<Text style = {{fontWeight:'bold', fontSize:25, fontStyle:'italic', marginTop:30}}>Friends Help Friends</Text>
<View style = {{flexDirection:'row', marginTop:30, marginLeft:30, marginRight:30}}>
{imageTemplate}
</View>
{others}
</View>
<View style = {{flex:0.2}}>
<Button title = "Start Matchmaking" containerStyle = {{marginLeft:30, marginRight:30, backgroundColor:'black'}} buttonStyle = {{backgroundColor:'black'}} onPress = {() => {navigation.navigate('ContactsLatest')}} titleStyle = {{fontWeight:"bold",fontStyle:'italic'}}/>
<View style = {{justifyContent:'center', alignItems:'center'}}>
{/* <TouchableOpacity style = {{marginTop:30,flexDirection:'row',justifyContent:'center', alignItems:'center'}} onPress = {() => navigation.navigate('ContactLoadSuccess')}>
    <Text style = {{fontWeight:'500'}}> LEARN MORE  </Text>
    <MaterialIcons name="keyboard-arrow-down" size={24} color="black" />
    </TouchableOpacity> */}
</View>

</View>
</TouchableOpacity>
)
}
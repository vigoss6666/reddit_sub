import  React, {useState,useRef,useEffect, useContext} from 'react';
import { View, StyleSheet, Text, TextInput,TouchableOpacity,ScrollView,Image, FlatList,Picker,PanResponder,Animated, TouchableWithoutFeedback, SafeAreaView, Dimensions} from 'react-native';
import { useMutation,useQuery } from '@apollo/react-hooks';
import { MaterialIcons } from '@expo/vector-icons';
import {Button} from 'react-native-elements'; 
import AppContext from '../../AppContext'; 
import {updateUser} from '../../networking'; 

export default function Loader({navigation,route}){
    const myContext = useContext(AppContext); 
    const arr = [0,1,2,3]; 
    const {userId,registeredUsers, setRegisteredUsers,computeName} = myContext;
    console.log(registeredUsers.length)
    useEffect(() => {
         if(registeredUsers.length == 0){
              navigation.navigate('ContactLoadSuccess'); 
         }
    },[])
    const others = registeredUsers.length > 5 ? <Text style = {{fontWeight:'bold', fontSize:20, marginTop:30, fontStyle:'italic'}}>...and {registeredUsers.length -5} others </Text>:null
    const imageTemplate = registeredUsers.length > 5 ? arr.map(val => {
         return registeredUsers[val].profilePic ? <View style = {{alignItems:'center', marginRight:10}} key = {registeredUsers[val].firstName+registeredUsers[val].lastName}>
         <Image source = {{uri:registeredUsers[val].profilePic}} style = {{height:50, width:50, borderRadius:25}}/>
         {/* <Text style = {{fontWeight:'bold', marginTop:5,maxWidth:50,maxHeight:50}}>{computeName(registeredUsers[val])}</Text> */}
         
         </View>:<View style = {{alignItems:'center', marginRight:10}} key = {registeredUsers[val].firstName+registeredUsers[val].lastName}>
         <MaterialIcons name="account-circle" size={50} color="black" />
         {/* <Text style = {{fontWeight:'bold', marginTop:5, maxWidth:50,maxHeight:50 }}>{computeName(registeredUsers[val])}</Text> */}
         
         </View>
                  
    }):registeredUsers.map(val => {
        return val.profilePic ? <View style = {{alignItems:'center', marginRight:0}} key = {val.firstName+val.lastName}>
        <Image source = {{uri:val.profilePic}} style = {{height:60, width:60, borderRadius:30}}/>
        {/* <Text style = {{fontWeight:'bold', marginTop:5,maxWidth:50, maxHeight:50}}>{computeName(val)}</Text> */}
         
        </View>:<View style = {{alignItems:'center', marginRight:0}} key = {val.firstName+val.lastName}>
        <MaterialIcons name="account-circle" size={60} color="black" />
        {/* <Text style = {{fontWeight:'bold', marginTop:5,maxHeight:50, maxWidth:50}}>{computeName(val)}</Text> */}
         
        </View>
                 
   })
    

return(
<View style = {{flex:1,backgroundColor:"white" }}>
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
<Button title = "Start Matchmaking" containerStyle = {{marginLeft:30, marginRight:30, backgroundColor:'black'}} buttonStyle = {{backgroundColor:'black'}} onPress = {() => {navigation.navigate('ContactLoadSuccess')}} titleStyle = {{fontWeight:"bold"}}/>
</View>
</View>
)
}
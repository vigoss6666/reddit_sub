import  React, {useState,useRef,useEffect, useContext} from 'react';
import { View, StyleSheet, Text, TextInput,TouchableOpacity,ScrollView,Image, FlatList,Picker,PanResponder,Animated, TouchableWithoutFeedback, SafeAreaView, Dimensions} from 'react-native';
import { useMutation,useQuery } from '@apollo/react-hooks';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons'; 
import { Button } from 'react-native-elements'; 
import {Header,Continue} from '../../src/common/Common'; 
import { GET_DETAILS } from '../../Account/Screens/DetailsSettings';
import AppContext from '../../AppContext'; 
import {updateUser} from '../../networking'; 


export default function Gender({navigation, route}){
const myContext = useContext(AppContext); 
const {userId, CustomBackComponent} = myContext; 
// const {page} = route.params; 
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
 navigation.navigate('Height', {page:"something"})

}
const _handleServer = () => {
   if(man){
   updateUser(userId, {gender:"male",genderPreference:"female"})  
      
   }
   else if(woman){
      updateUser(userId, {gender:"female", genderPreference:"male"})  
   }
}


const [man,setMan] = useState(false);
const [woman, setWoman] = useState(false);
const manWidthColor = man ? "yellow":"white"; 
const womanWidthColor = woman ? "yellow":"white";  
const gateColor = man || woman ? "green" : "white"; 
const gateGuard = man || woman ? false: true; 



return(
<View style = {{flex:1,backgroundColor:'#ffffff'}}>
<View style = {{flex:0.2}}>
     
</View>
<View style = {{flex:0.5, marginLeft:50, marginRight:50}}>
<Header text = {"I'm looking for..."}/>
<Text style = {{marginTop:5}}>Who do you want to be matched with?</Text>
<View  style = {{borderBottomWidth:0.5, width:Dimensions.get('window').width - 60,marginTop:20}}/>
<View style = {{flexDirection:"row", justifyContent:"space-around",marginTop:40 }}>
<View style = {{alignItems:'center'}}>
<TouchableOpacity 
style = {{width:100, height:100, justifyContent:"center", alignItems:"center", backgroundColor:manWidthColor, borderRadius:50}}
onPress = {() => {setMan(true), setWoman(false)}}
>
<TouchableOpacity style = {{height:80, width:80, borderRadius:40,  borderWidth:0.3,justifyContent:"center", alignItems:"center",backgroundColor:"white"}}
onPress = {() => {setMan(true), setWoman(false)}}
>
{/* <Image source = {require('/Users/zaidshaikh/newGamer/fhf_client/assets/date.png')} style = {{height:80, width:80}}></Image> */}


</TouchableOpacity>

</TouchableOpacity>
<Text style = {{fontWeight:'700'}}>DATE &</Text>
<Text style = {{fontWeight:'700'}}>MATCHMAKE</Text>
</View>  
<View style = {{alignItems:'center'}}>
<TouchableOpacity 
style = {{width:100, height:100, justifyContent:"center", alignItems:"center", backgroundColor:womanWidthColor, borderRadius:50}}
onPress = {() => {setWoman(true), setMan(false)}}
>
<TouchableOpacity style = {{height:80, width:80, borderRadius:40, borderColor:'black', borderWidth:0.3,justifyContent:"center", alignItems:"center",backgroundColor:"white"}}
onPress = {() => {setWoman(true), setMan(false)}} 
>
{/* <Image source = {require('/Users/zaidshaikh/newGamer/fhf_client/assets/matchmake.png')} style = {{height:80, width:80}}></Image> */}
</TouchableOpacity>
</TouchableOpacity>
<Text style = {{fontWeight:'700'}}>MATCHMAKE</Text>
<Text style = {{fontWeight:'700'}}>ONLY</Text>
</View>
</View>
{/* <View style = {{flexDirection:"row", justifyContent:"space-between", marginLeft:60, marginRight:50, marginTop:10}}>
<View>
<Text style = {{fontWeight:"700"}}>DATE &</Text>
<Text style = {{fontWeight:"700"}}>MATCHMAKE</Text>
</View>    
<View>
<Text style = {{fontWeight:"700"}}>MATCHMAKE</Text>
<Text style = {{fontWeight:"700"}}>Only</Text>
</View>
</View> */}
<View  style = {{borderBottomWidth:0.5, width:Dimensions.get('window').width - 60,marginTop:20}}/>
</View>
<View style = {{flex:0.3, justifyContent:"center", }}>
 {/* <Continue disabled = {gateGuard} backgroundColor = {gateColor} onPress = {() => {navigation.navigate('GenderPreference')}}/>     */}
 <Button
  title="Continue"
  type="outline"
  containerStyle = {{backgroundColor:"black",marginLeft:50, marginRight:50}}
  titleStyle = {{color:"white", fontWeight:"700"}}
  disabledStyle = {{backgroundColor:"grey",}}
  disabled = {gateGuard}
  onPress = {() => {_handleServer(),_handlePage()}}
/>
<TouchableOpacity style = {{marginTop:30,flexDirection:'row',justifyContent:'center', alignItems:'center'}} onPress = {() => navigation.navigate('AccountTypeDetail')}>
    <Text style = {{fontWeight:'700'}}> MATCHMAKING ONLY </Text>
    <MaterialIcons name="keyboard-arrow-down" size={24} color="black" />

</TouchableOpacity>
</View>
</View>
)
}
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
import { useSafeAreaInsets } from 'react-native-safe-area-context'; 
import { FontAwesome } from '@expo/vector-icons';


export default function Gender({navigation, route}){
const myContext = useContext(AppContext); 
const insets = useSafeAreaInsets();
const {userId, CustomBackComponent} = myContext; 

useEffect(() => {
   navigation.setOptions({
     headerShown:false
   })
 }, [])  

const _handlePage = () => {
   navigation.navigate('LoadPermission', {page:"something"})
}
const _handleServer = () => {
      updateUser(userId, {dating:false})  
}


const [man,setMan] = useState(false);
const [woman, setWoman] = useState(false);
const manWidthColor = man ? "white":"white"; 
const womanWidthColor = woman ? "white":"white";  
const gateColor = man || woman ? "green" : "white"; 
const gateGuard = man || woman ? false: true; 



return(
<View style = {{flex:1,backgroundColor:'#ffffff',paddingTop:insets.top}}>
<View style = {{flex:0.2,justifyContent:'center', alignItems:'center'}}>
<TouchableOpacity onPress = {() => navigation.navigate('AccountType')} style = {{marginBottom:20}}>
{/* <MaterialIcons name="keyboard-arrow-up" size={40} color="black" /> */}
<FontAwesome name="chevron-up" size={22} color="black" />
</TouchableOpacity>   
<Text style = {{fontStyle:'italic', fontWeight:'bold', fontSize:30}}>Matchmake only</Text>
<Text>Select this option if you do not want to be </Text>
<Text>added to the dating pool.You can change this</Text>
<Text>later.</Text>
</View>
<View style = {{flex:0.5, marginLeft:50, marginRight:50}}>


<View  style = {{borderBottomWidth:0.5, width:Dimensions.get('window').width - 60,marginTop:20}}/>
<View style = {{flexDirection:"row", justifyContent:"space-around",marginTop:40 }}>
<View style = {{alignItems:'center'}}>
<TouchableOpacity 
style = {{width:100, height:100, justifyContent:"center", alignItems:"center", backgroundColor:manWidthColor, borderRadius:50}}
// onPress = {() => {setMan(true), setWoman(false)}}
// disabled = {true}
>
<TouchableOpacity style = {{height:80, width:80, borderRadius:40,  borderWidth:0.3,justifyContent:"center", alignItems:"center",backgroundColor:"white"}}
onPress = {() => {setMan(true), setWoman(false)}}
>
<Image source = {require('../../assets/date.png')} style = {{height:80, width:80}}></Image>


</TouchableOpacity>

</TouchableOpacity>
<Text style = {{fontWeight:'700'}}>DATE &</Text>
<Text style = {{fontWeight:'700'}}>MATCHMAKE</Text>
<View style = {{flexDirection:'row',marginTop:10,justifyContent:'center',alignItems:'center'}}>
<FontAwesome name="check" size={15} color="black" style = {{marginRight:5}}/>
<Text style = {{fontWeight:'700', color:'grey',fontSize:11}}>Suggest Matches</Text>
</View>
<View style = {{flexDirection:'row',marginTop:10,justifyContent:'center',alignItems:'center'}}>
<FontAwesome name="check" size={15} color="black" style = {{marginRight:5}}/>
<Text style = {{fontWeight:'700', color:'grey',fontSize:11}}>Browse Users</Text>
</View>
</View>  
<View style = {{alignItems:'center'}}>
<TouchableOpacity 
style = {{width:100, height:100, justifyContent:"center", alignItems:"center", backgroundColor:womanWidthColor, borderRadius:50}}
// onPress = {() => {setWoman(true), setMan(false)}}
disabled = {true}
>
<TouchableOpacity style = {{height:80, width:80, borderRadius:40, borderColor:'black', borderWidth:0.3,justifyContent:"center", alignItems:"center",backgroundColor:"white"}}
onPress = {() => {setWoman(true), setMan(false)}} 
>
<Image source = {require('../../assets/matchmake.png')} style = {{height:80, width:80}}></Image>
</TouchableOpacity>
</TouchableOpacity>
<Text style = {{fontWeight:'700'}}>MATCHMAKE</Text>
<Text style = {{fontWeight:'700'}}>ONLY</Text>
<View style = {{flexDirection:'row',marginTop:10,justifyContent:'center',alignItems:'center',marginLeft:20}}>
<FontAwesome name="check" size={15} color="black" style = {{marginRight:5}}/>
<Text style = {{fontWeight:'700', color:'grey',fontSize:11}}>Suggest Matches</Text>
</View>
{/* <View style = {{flexDirection:'row',marginTop:10,justifyContent:'center',alignItems:'center'}}>
<FontAwesome name="check" size={15} color="black" style = {{marginRight:5}}/>
<Text style = {{fontWeight:'700', color:'grey',fontSize:11}}>Browse Users</Text>
</View> */}
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
  title="Match Make Only"
  type="outline"
  containerStyle = {{backgroundColor:"black",marginLeft:50, marginRight:50}}
  titleStyle = {{color:"white", fontWeight:"700"}}
  disabledStyle = {{backgroundColor:"grey",}}
  disabled = {false}
  onPress = {() => {_handleServer(),_handlePage()}}
/>

</View>
</View>
)
}
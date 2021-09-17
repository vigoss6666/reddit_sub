import  React, {useState,useRef,useEffect, useContext} from 'react';
import { Keyboard, View, StyleSheet, Text, TextInput,TouchableOpacity,ScrollView,Image, FlatList,Picker,PanResponder,Animated, TouchableWithoutFeedback, SafeAreaView, Dimensions} from 'react-native';

import {Header, Continue} from '../../src/common/Common'; 
import { AntDesign } from '@expo/vector-icons';
import {Button} from 'react-native-elements'; 
import DropDownPicker from 'react-native-dropdown-picker';
 import AppContext from '../../AppContext'; 
import {updateUser} from '../../networking'; 
import { MaterialIcons } from '@expo/vector-icons';

export default function Height({navigation,route}){
    const myContext = useContext(AppContext); 
    const {userId, CustomBackComponent} = myContext;
    let [feet, setFeet] = useState(null); 
     let [inches, setInches] = useState(null); 
    const [gate, setGate] = useState(true); 
    useEffect(() => {
        navigation.setOptions({
          headerTitle:false, 
          headerLeft:() => <CustomBackComponent navigation = {navigation}/>
        })
      }, [])
    useEffect(() => {
       if(feet !== null && inches !== null){
           setGate(false)
           return; 
       } 
       setGate(true); 
    }, [feet, inches])  
    const { page } = route.params;  

     

const _sendToServer = () => {
    const computedInches = feet*12; 
    const finalInches = computedInches + inches; 
    const cms = parseInt(finalInches*2.54); 
    updateUser(userId,{cms:cms, feet, inches})
}     

useEffect(() => {
    const subscribe = Keyboard.addListener('keyboardDidShow', () => {
       Keyboard.dismiss()
    })
    return () => Keyboard.removeAllListeners('keyboardDidHide'); 
    
 }, [])
      
const _handleNavigation = () => {
     if(page == "DetailsSettings"){
          navigation.navigate("DetailsSettings")
          return; 
          
     }
     navigation.navigate('AuthPhotosLatest', {page:"something"})

}

return(
<TouchableOpacity style = {{flex:1,backgroundColor:'#ffffff'}} onPress = {Keyboard.dismiss}>
<View style = {{flex:0.2}}>

</View>
<View style = {{flex:0.5, marginLeft:30}}>
<Header text = {"What's your height?"}/>
<View style = {{borderBottomWidth:2, width:Dimensions.get('window').width - 60, marginTop:20}}/>
<View style = {{flexDirection:"row", marginTop:30, zIndex:3000}}>
 
 <DropDownPicker
                    
                    items={[
                        {label: "3 '", value: 3},
                        {label: "4 '", value: 4,},
                        {label: "5 '", value: 5, },
                        {label: "6 '", value: 6},
                        {label: "7 '", value: 7},
                
                      ]}
                    onPress = {() => {console.log("pressed")}}
                    selectedtLabelStyle={{
                         color: 'blue'
                     }}
                    placeholder = {"5 '"}
                    placeholderStyle={{
                         fontWeight: 'bold',
                         textAlign: 'center', 
                         fontSize:20,
                         color:'grey'
                     }}
                    arrowStyle={{marginRight: 10, size:20}}
                    containerStyle={{height: 70, width:100, justifyContent:"center"}}
                    style={{fontSize:30}}
                    itemStyle={{
                        fontSize:30,
                        backgroundColor:"white", 
                        fontColor:"white",
                        justifyContent: 'flex-start'
                    }}
                    dropDownStyle={{backgroundColor: '#fafafa', zIndex:100}}
                    onChangeItem={item => setFeet(item.value)}
                    selectedLabelStyle={{
                        fontSize:20,
                        backgroundColor:"white", 
                        fontColor:"white",
                        justifyContent: 'flex-start',
                        fontWeight:'bold',
                        
                    }}
                    
                />
 {/* <TouchableOpacity 
 style = {{marginLeft:10,flexDirection:"row",justifyContent:"center", alignItems:"center",borderWidth:1, padding:10}}
 onPress = {() => {navigation.navigate('Inches')}}
 >
  <Text style = {{fontSize:24, marginRight:10}}>{inches}</Text>
  <TouchableOpacity style = {{flexDirection:"column",justifyContent:"center", alignItems:"center"}}>
  <AntDesign name="caretup" size={24} color="black" />
  <AntDesign name="caretdown" size={24} color="black" style = {{marginTop:-15}}/>
  </TouchableOpacity>  
 </TouchableOpacity> */}
 <DropDownPicker
                    
                    items={[
                        {label: '0"', value: 0},
                        {label: '1"', value: 1},
                        {label: '2"', value: 2 },
                        {label: '3"', value: 3},
                        {label: '4"', value: 4},
                        {label: '5"', value: 5},
                        {label: '6"', value: 6},
                        {label: '7"', value: 7 },
                        {label: '8"', value: 8},
                        {label: '9"', value: 9},
                        {label: '10"', value: 10},
                        {label: '11"', value: 11},
                        
                        
                        

                
                      ]}
                    onPress = {() => {console.log("pressed")}}
                    selectedtLabelStyle={{
                         color: 'blue'
                     }}
                    placeholder = {'10 "'}
                    placeholderStyle={{
                         fontWeight: 'bold',
                         textAlign: 'center', 
                         fontSize:20,
                         color:'grey'
                     }}
                    arrowStyle={{marginRight: 10, size:20}}
                    containerStyle={{height: 70, width:100, justifyContent:"center"}}
                    style={{fontSize:40}}
                    itemStyle={{
                        fontSize:20,
                        backgroundColor:"white", 
                        fontColor:"white",
                        justifyContent: 'flex-start'
                    }}
                    activeLabelStyle = {{fontSize:20}}
                    activeItemStyle = {{fontSize:20}}
                    dropDownStyle={{backgroundColor: '#fafafa', zIndex:100}}
                    onChangeItem={item => setInches(item.value)}
                    selectedLabelStyle={{
                        fontSize:20,
                        backgroundColor:"white", 
                        fontColor:"white",
                        justifyContent: 'flex-start',
                        fontWeight:'bold'
                    }}
                    
                    
                />


</View>
<Text style = {{marginBottom:20,marginLeft:17, marginTop:10, color:"grey", fontWeight:"bold"}}>Your height will be verified</Text>
<View style = {{borderBottomWidth:2, width:Dimensions.get('window').width - 60, marginTop:20}}/>
</View>
<View style = {{flex:0.3,justifyContent:"center", }}>
{/* <Continue backgroundColor = {"green"} onPress = {() => {navigation.navigate('Posted')}}/> */}
<Button
  title="Continue"
  type="outline"
  containerStyle = {{backgroundColor:"black",marginLeft:30, marginRight:30}}
  titleStyle = {{color:"white", fontWeight:"bold"}}
  disabledStyle = {{backgroundColor:"grey",}}
  onPress = {() => {_sendToServer(), _handleNavigation() }}
  disabled = {gate}
/>
<View style = {{justifyContent:'center', alignItems:'center'}}>
<TouchableOpacity style = {{marginTop:30,flexDirection:'row',justifyContent:'center', alignItems:'center'}} onPress = {() => navigation.navigate('HeightMetric', {page})}>
    <Text> USE METRIC SYSTEM </Text>
    <MaterialIcons name="keyboard-arrow-down" size={24} color="black" />
    

</TouchableOpacity>
</View>
</View>
</TouchableOpacity>
)
}
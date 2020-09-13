import  React, {useState,useRef,useEffect} from 'react';
import { View, StyleSheet, Text, TextInput,TouchableOpacity,ScrollView,Image, Button,FlatList,Picker,PanResponder,Animated, TouchableWithoutFeedback, SafeAreaView, Dimensions} from 'react-native';
import { useMutation,useQuery } from '@apollo/react-hooks';
import {Header, Continue} from '../../src/common/Common'; 
import { AntDesign } from '@expo/vector-icons';
import DropDownPicker from 'react-native-dropdown-picker';
export default function Height({navigation,route}){
     

     let [feet, setFeet] = useState(); 
     let [inches, setInches] = useState(); 
      


return(
<View style = {{flex:1,}}>
<View style = {{flex:0.2}}>

</View>
<View style = {{flex:0.5, marginLeft:30}}>
<Header text = {"What's your height?"}/>
<View style = {{borderBottomWidth:2, width:Dimensions.get('window').width - 60, marginTop:20}}/>
<View style = {{flexDirection:"row", marginTop:30, zIndex:1000}}>
 {/* <TouchableOpacity 
 style = {{flexDirection:"row",justifyContent:"center", alignItems:"center",borderWidth:1, padding:10}}
 onPress = {() => {navigation.navigate("Feet")}}
 >
  <Text style = {{fontSize:24, marginRight:10}}>{feet}</Text>
  <TouchableOpacity style = {{flexDirection:"column",justifyContent:"center", alignItems:"center"}}>
  <AntDesign name="caretup" size={24} color="black" />
  <AntDesign name="caretdown" size={24} color="black" style = {{marginTop:-15}}/>
  </TouchableOpacity>  
 </TouchableOpacity> */}
 <DropDownPicker
                    
                    items={[
                        {label: "3 '", value: '3'},
                        {label: "4 '", value: '4',},
                        {label: "5 '", value: '5', },
                        {label: "6 '", value: '6'},
                        {label: "7 '", value: '7'},
                
                      ]}
                    onPress = {() => {console.log("pressed")}}
                    selectedtLabelStyle={{
                         color: 'blue'
                     }}
                    placeholder = {"5 '"}
                    placeholderStyle={{
                         fontWeight: 'bold',
                         textAlign: 'center', 
                         fontSize:20
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
                    onChangeItem={item => setFeet(item)}
                    
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
                        {label: '0"', value: '0'},
                        {label: '1"', value: '1',},
                        {label: '2"', value: '2', },
                        {label: '3"', value: '3'},
                        {label: '4"', value: '4'},
                        {label: '5"', value: '5'},
                        {label: '6"', value: '6',},
                        {label: '7"', value: '7', },
                        {label: '8"', value: '8'},
                        {label: '9"', value: '9'},
                        {label: '10"', value: '10'},
                        {label: '11"', value: '11',},
                        
                        
                        

                
                      ]}
                    onPress = {() => {console.log("pressed")}}
                    selectedtLabelStyle={{
                         color: 'blue'
                     }}
                    placeholder = {'10 "'}
                    placeholderStyle={{
                         fontWeight: 'bold',
                         textAlign: 'center', 
                         fontSize:20
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
                    activeLabelStyle = {{fontSize:30}}
                    activeItemStyle = {{fontSize:30}}
                    dropDownStyle={{backgroundColor: '#fafafa', zIndex:100}}
                    onChangeItem={item => setInches(item)}
                    
                />


</View>
<Text style = {{marginBottom:20,marginLeft:17, marginTop:10, color:"grey", fontWeight:"bold"}}>Your height will be verified</Text>
<View style = {{borderBottomWidth:2, width:Dimensions.get('window').width - 60, marginTop:20}}/>
</View>
<View style = {{flex:0.3,justifyContent:"center", alignItems:"center"}}>
<Continue backgroundColor = {"green"} onPress = {() => {navigation.navigate('Posted')}}/>
</View>
</View>
)
}
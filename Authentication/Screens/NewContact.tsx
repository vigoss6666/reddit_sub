import  React, {useState,useRef,useEffect} from 'react';
import { View, StyleSheet,  TextInput,TouchableOpacity,ScrollView,Image, FlatList,Picker,PanResponder,Animated, TouchableWithoutFeedback, SafeAreaView} from 'react-native';
import { useMutation,useQuery } from '@apollo/react-hooks';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import {Text} from "react-native-elements"; 
import { Ionicons } from '@expo/vector-icons';
import DropDownPicker from 'react-native-dropdown-picker';
import SwitchSelector from "react-native-switch-selector";
import {Button} from 'react-native-elements'; 
import { gql } from 'apollo-boost';

// addNewContact(userInput: UserInput1!): Boolean!

const ADD_NEW_CONTACT = gql`
 mutation namer($userInput: UserInput1!){
      addNewContact(userInput:$userInput)
 }
`





export default function NewContact({navigation}){
 const data1 = {name:"zaid shaikh", firstname:"zaid", countryCode:"+1", gender: "male", orientation:"male",minAge:24, maxAge:24,inches:"11", feet:"5", addToDatingPool:'yes', number:"2103888163"}   
 const [addNewContact, {data}] = useMutation(ADD_NEW_CONTACT); 
 const [selectedValue, setSelectedValue] = useState("java");
 const [age,selectAge] = useState()
 const [feet,selectFeet] = useState()
 const [inches,setInches] = useState()
 const options = [
    { label: "yes", value: "yes" },
    { label: "No", value: "no" },
    
  ];
const [firstname,setFirstname] = useState();   
const [lastname,setLastname] = useState();
const [number,setNumber] = useState();
const [gender,setGender] = useState(); 
const [orientation, setOrientation] = useState(); 
const [height, setHeight] = useState(); 
const [addDatingPool, setAddDatingPool] = useState(); 
const [countryCode, setCountryCode] = useState(); 

if(data){
     console.log(data); 
}

console.log(firstname)
console.log(lastname)
console.log(number)
console.log(gender)
console.log(orientation)
console.log(age)
console.log(height)
console.log(addDatingPool)
console.log(feet)
console.log(inches)

const _sendToServer = () => {
 addNewContact({variables:{userInput:data1}});      
}

const _uploadContact = () => {
     const serverData = {firstname, lastname,number,gender, orientation,age,height,addDatingPool}; 

}

return(
 <View style = {{flex:1}}>  
 <View style = {{flex:0.1}}>
 </View> 
<View style = {{flex:0.6}}>    
<ScrollView>    
<View style = {{flex:1, }}>
<View style = {{flex:0.1}}>

</View>
<View style = {{marginLeft:30, marginRight:30}}>
<Text h4 style = {{alignSelf:"center", marginBottom:10}}>New Contact</Text>
<TouchableOpacity style = {{height:80, width:80, borderRadius:40, justifyContent:"center", alignItems:"center", alignSelf:"center",backgroundColor:'grey',marginBottom:10}}>
<MaterialCommunityIcons name="account-plus" size={50} color="pink" />
</TouchableOpacity>
<View style = {{borderBottomWidth:3, marginLeft:30, marginRight:30, marginBottom:30}}/>
<View style = {{flexDirection:'row',justifyContent:'space-around',alignItems:'center',marginBottom:30}}>
<Text style = {{fontWeight:"bold"}}>FIRSTNAME</Text>
<TextInput style = {{borderWidth:3,width:200}} onChangeText = {(text) => setFirstname(text)}></TextInput>

</View>
<View style = {{flexDirection:'row',justifyContent:'space-around',alignItems:'center', marginBottom:30}}>
<Text style = {{fontWeight:"bold"}}>LASTNAME </Text>
<TextInput style = {{borderWidth:3,width:200}} onChangeText = {(text) => setLastname(text)}></TextInput>
</View>
<View style={{
    borderStyle: 'dotted',
    borderWidth: 2,
    borderRadius: 1,
    borderColor:'grey',
     marginBottom:30
  }}>
</View>
<View style = {{flexDirection:"row",alignItems:'center', marginBottom:30 }}>
<Text style = {{marginRight:20,padding:10,fontWeight:'bold'}}>
  Mobile  
</Text>
<TouchableOpacity style = {{flexDirection:'row', marginRight:20, }}>
    <Text style = {{borderWidth:2,padding:10,}}>
        US +1
    </Text>
    <View style = {{borderWidth:2,padding:10}}>
    <FontAwesome5 name="caret-down" size={24} color="black" />
    </View>


</TouchableOpacity>
<TextInput style = {{width:'40%', borderWidth:1, marginRight:20,height:'100%'}} onChangeText = {(text) => setNumber(text)}>

</TextInput>
</View>
<View style = {{borderBottomWidth:3, marginLeft:30, marginRight:30, marginBottom:30}}/>
<View style = {{flexDirection:'row', marginLeft:30,justifyContent:'space-between',marginRight:30,alignItems:'center',marginBottom:30}}>
<Text style = {{flex:0.5,fontWeight:'bold'}}>Sex</Text>
<View style = {{flexDirection:'row',justifyContent:'space-between',flex:0.3,alignItems:'center'}}>
<TouchableOpacity onPress = {() => {setGender('female')}} style = {{borderWidth:gender == 'female' ? 3:0, borderRadius:10,borderColor:'green' }}>
<FontAwesome name="female" size={35} color="black" />
</TouchableOpacity>
<TouchableOpacity onPress = {() => {setGender('male')}} style = {{borderWidth:gender == 'male' ? 3:0, borderRadius:10,borderColor:'green' }}>
<FontAwesome name="male" size={35} color="black" />
</TouchableOpacity>
</View>
</View>
<View style={{
    borderStyle: 'dotted',
    borderWidth: 2,
    borderRadius: 1,
    borderColor:'grey',
     marginBottom:30
  }}>
  
</View>
<View style = {{flexDirection:'row', marginLeft:30,justifyContent:'space-between',marginRight:30,alignItems:'center',marginBottom:30}}>
<Text style = {{flex:0.6,fontWeight:'bold'}}>Orientation</Text>
<View style = {{flexDirection:'row',justifyContent:'space-between',flex:0.4,alignItems:'center'}}>
<TouchableOpacity onPress = {() => {setOrientation('female')}} style = {{borderWidth:orientation == 'female' ? 3:0, borderRadius:10,borderColor:'green' }}>
<FontAwesome name="female" size={35} color="black" />
</TouchableOpacity>
<TouchableOpacity onPress = {() => {setOrientation('male')}} style = {{borderWidth:orientation == 'male' ? 3:0, borderRadius:10,borderColor:'green' }}>
<FontAwesome name="male" size={35} color="black" />
</TouchableOpacity>
<TouchableOpacity onPress = {() => {setOrientation('bisexual')}} style = {{borderWidth:orientation == 'bisexual' ? 3:0, borderRadius:10,borderColor:'green' }}>
<Ionicons name="ios-people" size={35} color="black" />
</TouchableOpacity>
</View>
</View>
<View style={{
    borderStyle: 'dotted',
    borderWidth: 2,
    borderRadius: 1,
    borderColor:'grey',
     marginBottom:30
  }}>
  
</View>
<View style = {{flexDirection:'row', marginLeft:30, justifyContent:'space-between', alignItems:'center',marginBottom:30}}>
<Text style = {{fontWeight:'bold'}}>Age </Text>
<DropDownPicker
    items={[
        {label: '15 - 19 years', value: {minAge:15,maxAge:19}, },
        {label: '20 - 24 years', value: {minAge:20,maxAge:24} },
        {label: '25 - 29 years', value: {minAge:25,maxAge:29} },
        {label: '30 - 34 years', value: {minAge:30,maxAge:34} },
        {label: '35 - 39 years', value: {minAge:35,maxAge:39}, },
        {label: '40 - 44 years', value: {minAge:40,maxAge:44}, },
        {label: '45 - 49 years', value: {minAge:45,maxAge:49}, },
    ]}
    placeholder = {"20 - 24 years "}
    containerStyle={{height: 40,width:200,zIndex:100}}
    style={{backgroundColor: '#fafafa',zIndex:100}}
    itemStyle={{
        justifyContent: 'flex-start', 
        zIndex:100
    }}
    dropDownStyle={{backgroundColor: '#fafafa', zIndex:100}}
    onChangeItem={item => selectAge(
        item.value
    )}
/>
</View>
<View style={{
    borderStyle: 'dotted',
    borderWidth: 2,
    borderRadius: 1,
    borderColor:'grey',
     marginBottom:30
  }}>
  
</View>
<View style = {{flexDirection:'row', marginLeft:30, justifyContent:'space-between', alignItems:'center',marginBottom:30}}>
<Text style = {{fontWeight:'bold'}}>Height (optional) </Text>
<View style = {{flexDirection:'row',}}>
<DropDownPicker
    items={[
        {label: "4'", value: '4', },
        {label: "5'", value: '5', },
        {label: "6'", value: '6', },
        {label: "7'", value: '7', },
        {label: "8'", value: '8', },
    ]}
    placeholder = {"5'"}
    containerStyle={{height: 40,width:75}}
    style={{backgroundColor: '#fafafa'}}
    itemStyle={{
        justifyContent: 'flex-start'
    }}
    dropDownStyle={{backgroundColor: '#fafafa'}}
    onChangeItem={item => selectFeet(
        item.value
    )}
/>
<DropDownPicker
    items={[
        {label: '0"', value: '0', },
        {label: '1"', value: '1', },
        {label: '2"', value: '2', },
        {label: '3"', value: '3', },
        {label: '4"', value: '4', },
        {label: '5"', value: '5', },
        {label: '6"', value: '6', },
        {label: '7"', value: '7', },
        {label: '8"', value: '8', },
        {label: '9"', value: '9', },
        {label: '10"', value: '10', },
        {label: '11"', value: '11', },
        
    ]}
    placeholder = {'0"'}
    containerStyle={{height: 40,width:100}}
    style={{backgroundColor: '#fafafa', zIndex:100}}
    itemStyle={{
        justifyContent: 'flex-start',
        zIndex:100
    }}
    dropDownStyle={{backgroundColor: '#fafafa'}}
    onChangeItem={item => setInches(
        item.value
    )}
/>
</View>
</View>
<View style = {{borderBottomWidth:3, marginLeft:30, marginRight:30, marginBottom:30}} zIndex = {100}/>
<View  style = {{flexDirection:'row', alignItems:'center',justifyContent:'space-between',marginLeft:30, marginRight:30,marginBottom:30,}} zIndex = {1}>
<Text style = {{ fontWeight:'bold'}}>ADD TO DATING POOL </Text>
<SwitchSelector
  options={options}
  initial={0}
  onPress={value => console.log(`Call onPress with value: ${value}`)}
  style = {{width:100}}
/>
</View>
<View style = {{borderBottomWidth:3, marginLeft:30, marginRight:30, marginBottom:30}}/>
</View>
</View>
</ScrollView>
</View>
<View style = {{flex:0.2}}>
 <Button 
 onPress = {() => {_sendToServer()}}
 title = {"save"} containerStyle = {{marginLeft:30, marginRight:30,marginTop:100,backgroundColor:'black'}}>

 </Button>
</View>
</View>
)
}
import  React, {useState,useRef,useEffect, useContext} from 'react';
import { View, StyleSheet,  TextInput,TouchableOpacity,ScrollView,Image, FlatList,Picker,PanResponder,Animated, TouchableWithoutFeedback, SafeAreaView, Modal} from 'react-native';
import { useMutation,useQuery } from '@apollo/react-hooks';
import * as ImagePicker from 'expo-image-picker';
import { MaterialIcons, MaterialCommunityIcons,Entypo } from '@expo/vector-icons';
import { FontAwesome5,AntDesign} from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import {Text} from "react-native-elements"; 
import { Ionicons } from '@expo/vector-icons';
import DropDownPicker from 'react-native-dropdown-picker';
import SwitchSelector from "react-native-switch-selector";
import {Button} from 'react-native-elements'; 
import { gql } from 'apollo-boost';
import { Platform } from 'react-native';
import {GET_DATING_POOL,GET_CONTACT_POOL} from './ProfilePool'; 
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import AppContext from '../../AppContext'; 
import {HeaderBar,ImageView,ModalViewMap} from '../../src/common/Common';
import Tooltip from 'react-native-walkthrough-tooltip';


import {updateUser} from '../../networking';
import {firebase} from '../../config'; 
import { uuidv4} from '../../networking';  
const db = firebase.firestore(); 

// addNewContact(userInput: UserInput1!): Boolean!

const ADD_NEW_CONTACT = gql`
 mutation namer($userInput: UserInput1!){
      addNewContact(userInput:$userInput)
 }
`





export default function NewContact({navigation,route}){
    const myContext = useContext(AppContext); 
    const {user, userId, countryCode, dialCode, defaultDataObject, clientLocation, setContactLocation, 
        contactLocation, 
        xClient, 
        setXClient} = myContext;     
 
 const data1 = {name:"zaid shaikh", firstname:"zaid", countryCode:"+1", gender: "male", orientation:"male",minAge:24, maxAge:24,inches:"11", feet:"5", addToDatingPool:'yes', number:"2103888163"}   
 //const [addNewContact, {data}] = useMutation(ADD_NEW_CONTACT);
 const data = 1; 

 const [selectedValue, setSelectedValue] = useState("java");
 const [age,selectAge] = useState({minAge:null, maxAge:null})
 const [feet,selectFeet] = useState()
 const [inches,setInches] = useState()
 const options = [
    { label: "yes", value: "yes" },
    { label: "No", value: "no" },
    
  ];
const [dial_code, setDialCode] = useState("+1");   
const [firstname,setFirstname] = useState();   
const [lastname,setLastname] = useState();
const [number,setNumber] = useState();
const [digits,setDigits] = useState();
const [gender,setGender] = useState(); 
const [orientation, setOrientation] = useState(); 
const [height, setHeight] = useState(); 
const [addDatingPool, setAddDatingPool] = useState();
const [flatData,setFlatData] = useState([{}]); 
const [image, setImage] = useState(); 
const [visible, setVisible] = useState(false); 




    let openImagePickerAsync = async () => {
    
        let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();
    
        if (permissionResult.granted === false) {
          alert("Permission to access camera roll is required!");
          return;
        }
        
        
    
        let pickerResult = await ImagePicker.launchImageLibraryAsync({mediaTypes:ImagePicker.MediaTypeOptions.Images});
        setImage(pickerResult.uri); 
    }




if(data){
     
}


console.log(dialCode)
console.log(countryCode); 
console.log(digits)
console.log(firstname)
console.log(lastname)
console.log(number)
console.log(gender)
console.log(orientation)
console.log(age.maxAge)
console.log(height)
console.log(addDatingPool)
console.log(feet)
console.log(inches)
console.log(digits); 
async function updateProfilePicToServer(){
    const response = await fetch(image); 
    const blob = await response.blob(); 
    const namer = Math.random().toString(36).substring(2);
    const ref = firebase.storage().ref().child("images/"+ namer); 
    await ref.put(blob).catch(error => console.log(error))
    const result1 = await ref.getDownloadURL().catch(error => console.log(error))
    return result1; 
 }


useEffect(() => {
navigation.setOptions({
    headerTitle:false,
    headerLeft:false, 
    headerRight:() => <TouchableOpacity style = {{marginRight:20}} onPress = {() => {setToDefaults(),navigation.goBack()}}>
        <Text style = {{fontWeight:'bold', color:'orange'}}>Cancel</Text>
    </TouchableOpacity> 
})
}, [])


const _sendToServer = async () => {
 const result = await db.collection('user').doc(dialCode+digits).get(); 
 if(result.exists){
     db.collection('user').doc(userId).update({datingPoolList:firebase.firestore.FieldValue.arrayUnion(dialCode+digits)}) 
     setToDefaults()
     navigation.navigate('Homer') 
     return; 
 }   
 const url = image ? await updateProfilePicToServer():"";    
 const serverObject = {
      
     phoneNumber:dialCode+digits, 
     name:firstname+""+lastname, 
     firstName:firstname,
     lastName:lastname, 
     gender:gender, 
     minAge:age.minAge, 
     maxAge:age.maxAge,
     age:parseInt((age.minAge + age.maxAge)/2), 
     inches:inches ? inches:0, 
     feet:feet ? feet: 5, 
     matchMaker:userId, 
     matchMakers:[userId], 
     profilePic:url, 
     latitude:xClient.latitude, 
     longitude:xClient.longitude, 
     state:contactLocation.state, 
     subLocality:contactLocation.subLocality
    }
   const finalObject = Object.assign({}, {...defaultDataObject}, {...serverObject}); 
   db.collection('user').doc(dialCode+digits).set(finalObject, {merge:true}).then(() => console.log("server object set correctly")); 
   db.collection('user').doc(userId).update({datingPoolList:firebase.firestore.FieldValue.arrayUnion(dialCode+digits)})
   
 
 await setToDefaults()
 navigation.navigate('Homer')
 
//  navigation.goBack();       
}

function setToDefaults(){
    setFirstname(null); 
    setLastname(null); 
    setDigits(null); 
    setGender(null); 
    selectFeet(null); 
    setInches(null); 
    setXClient({latitude:null, longitude:null});
    setImage(null); 
    
    
}

const _uploadContact = () => {
     const serverData = {firstname, lastname,number,gender, orientation,age,height,addDatingPool}; 

}
const _checkDisable = () => {
     if(firstname && lastname && digits && gender && age.maxAge && age.minAge && xClient.latitude && xClient.longitude){
          return false; 
     }
     return true; 
}

const imageTemplate = image ? <View style = {{height:80, width:80, borderRadius:40, justifyContent:"center", alignItems:"center", alignSelf:"center",backgroundColor:'grey',marginBottom:10}}><Image source = {{uri:image}} style = {{height:80, width:80, borderRadius:40}}/></View> :<TouchableOpacity onPress = {() => openImagePickerAsync()} style = {{height:80, width:80, borderRadius:40, justifyContent:"center", alignItems:"center", alignSelf:"center",backgroundColor:'grey',marginBottom:10}}>
<FontAwesome name="plus" size={50} color="pink" />
</TouchableOpacity> 

return (
    <View style = {{flex:1}}>
    
    <FlatList
    data = {flatData}
    key = {"namer"}
    renderItem = {() => 
   <View style = {{flex:1, }}>
      
    <View style = {{flex:0.1}}>
    
    </View>
    <View style = {{marginLeft:30, marginRight:30}}>
    <Text h4 style = {{alignSelf:"center", marginBottom:10}}>New Contact</Text>
    {imageTemplate}
    <View style = {{borderBottomWidth:3, marginLeft:30, marginRight:30, marginBottom:30}}/>
    <View style = {{flexDirection:'row',justifyContent:'space-around',alignItems:'center',marginBottom:30}}>
    <Text style = {{fontWeight:"bold"}}>FIRSTNAME</Text>
    
    <TextInput style = {{borderWidth:3,width:200, padding:10}} onChangeText = {(text) => setFirstname(text)} autoCorrect = {false} autoCapitalize = {'words'} value = {firstname} ></TextInput>
    
    </View>
    <View style = {{flexDirection:'row',justifyContent:'space-around',alignItems:'center', marginBottom:30}}>
    <Text style = {{fontWeight:"bold"}}>LASTNAME </Text>
    <TextInput style = {{borderWidth:3,width:200,padding:10}} onChangeText = {(text) => setLastname(text)} autoCorrect = {false} autoCapitalize = {'words'} value = {lastname}></TextInput>
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
    <TouchableOpacity style = {{flexDirection:'row', marginRight:20,  }} onPress = {() => navigation.navigate('CountryCodes', {page:'NewContact'})}>
        <Text style = {{borderWidth:2,padding:10,}}>
             {countryCode}
               {dialCode}
    
        </Text>
        <View style = {{borderWidth:2,padding:10}}>
        <FontAwesome5 name="caret-down" size={24} color="black" />
        </View>
    
    
    </TouchableOpacity>
    <TextInput style = {{width:'40%', borderWidth:1, marginRight:20,height:'100%',padding:10}} onChangeText = {(text) => setDigits(text)} keyboardType = {"numeric"} value = {digits}>
    
    </TextInput>
    </View>
    <View style = {{borderBottomWidth:3, marginLeft:30, marginRight:30, marginBottom:30}}/>
    <View style = {{  marginBottom:20, marginLeft:30, flexDirection:'row', alignItems:'center'}}>
    <Entypo name="location" size={24} color="black" />
    <TouchableOpacity onPress = {() => navigation.navigate('NewContactLocation')}>
        <Text style = {{fontWeight:'bold', marginLeft:10}}>Add location</Text>
    </TouchableOpacity>
    
    </View>
    <View style = {{borderBottomWidth:3, marginLeft:30, marginRight:30, marginBottom:30}}/>
    <View style = {{flexDirection:'row', marginLeft:30, justifyContent:'space-between', alignItems:'center',marginBottom:30, zIndex:5000}}>
    <Text style = {{fontWeight:'bold'}}>Height (optional) </Text>
    <View style = {{flexDirection:'row',zIndex:5000}}>
    <DropDownPicker
        items={[
            {label: "4'", value: 4, },
            {label: "5'", value: 5, },
            {label: "6'", value: 6, },
            {label: "7'", value: 7, },
            {label: "8'", value: 8, },
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
            {label: '0"', value: 0, },
            {label: '1"', value: 1, },
            {label: '2"', value: 2, },
            {label: '3"', value: 3, },
            {label: '4"', value: 4, },
            {label: '5"', value: 5, },
            {label: '6"', value: 6, },
            {label: '7"', value: 7, },
            {label: '8"', value: 8, },
            {label: '9"', value: 9, },
            {label: '10"', value: 10, },
            {label: '11"', value: 11, },
            
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
    <View style={{
        borderStyle: 'dotted',
        borderWidth: 2,
        borderRadius: 1,
        borderColor:'grey',
         marginBottom:30
      }}>
      
    </View>
    <View style = {{flexDirection:'row', marginLeft:30, justifyContent:'space-between', alignItems:'center',marginBottom:30, zIndex:1000}}>
    <Text style = {{fontWeight:'bold'}}>Age </Text>
    <DropDownPicker
        items={[
            {label: '15 - 20 years', value: {minAge:15,maxAge:20}, },
            {label: '20 - 25 years', value: {minAge:20,maxAge:25} },
            {label: '25 - 30 years', value: {minAge:25,maxAge:30} },
            {label: '30 - 35 years', value: {minAge:30,maxAge:35} },
            {label: '35 - 40 years', value: {minAge:35,maxAge:40}, },
            {label: '40 - 45 years', value: {minAge:40,maxAge:45}, },
            {label: '45 - 50 years', value: {minAge:45,maxAge:50}, },
        ]}
        placeholder = {"20 - 25 years "}
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
    
    {/* <View style = {{flexDirection:'row', marginLeft:30,justifyContent:'space-between',marginRight:30,alignItems:'center',marginBottom:30}}>
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
    </View> */}
    {/* <View style={{
        borderStyle: 'dotted',
        borderWidth: 2,
        borderRadius: 1,
        borderColor:'grey',
         marginBottom:30
      }}> */}
      
    {/* </View> */}
    
    <View style={{
        borderStyle: 'dotted',
        borderWidth: 2,
        borderRadius: 1,
        borderColor:'grey',
         marginBottom:30
      }}>
      
    </View>
    
    <View style = {{borderBottomWidth:3, marginLeft:30, marginRight:30, marginBottom:30}} />
    
    
    </View>
    </View>
}
    
    ListFooterComponentStyle = {{marginBottom:100}}
    ListHeaderComponent = {() => <Text style = {{height:30}}></Text>}
    ListFooterComponent = { <Button 
        onPress = {() => {_sendToServer()}}
        title = {"save"} containerStyle = {{marginLeft:30, marginRight:30,marginTop:100,backgroundColor:'black'}}
        disabled = {_checkDisable() }
        buttonStyle = {{backgroundColor:"black"}}
        >
       
        </Button>} 
    />
    </View>

    
)
}
import  React, {useState,useRef,useEffect, useContext} from 'react';
import { View, StyleSheet,  TextInput,TouchableOpacity,ScrollView,Image, FlatList,Picker,PanResponder,Animated, TouchableWithoutFeedback, SafeAreaView,} from 'react-native';
import { useMutation,useQuery } from '@apollo/react-hooks';
import {Text,Overlay, Avatar} from 'react-native-elements'; 
import {arrayReplace, computeSectionLabel} from '../../networking'; 
import AppContext from '../../AppContext'; 
import {updateUser} from '../../networking';
// @refresh reset

import { AntDesign } from '@expo/vector-icons';
import { gql } from 'apollo-boost';
import { Button } from 'react-native-elements';
import DropDownPicker from 'react-native-dropdown-picker';
import { MaterialIcons } from '@expo/vector-icons';

import { firebase } from '../../config'; 
const db = firebase.firestore(); 


//addAgeList(userInputList: userInputList1!): Boolean!
const ADD_USER_AGE = gql`
mutation namer($userInputList:userInputList1!){
     addAgeList(userInputList:$userInputList)
}

`

export default function ContactsAge({navigation,route}){
    const myContext = useContext(AppContext); 
    const { userId, setProfilesAuth,computeName} = myContext;
    const [user,setUser] = useState({});
useEffect(() => {
  db.collection('user').doc(userId).get().then(onDoc => {
      setUser(onDoc.data())
  })
}, [])
    const [profiles, setProfiles] = useState([
   
        { 
        _id:"3CSsXNrFkrYYCaPs4GWJ", 
        name:"zaid shaikh", 
     
        firstname:"zaid"
       }, 
       
     ])     


     useEffect(() => {
        async function namer(){
         const onResult = await db.collection('user').where(firebase.firestore.FieldPath.documentId(), 'in', user.datingPoolList).get();
         const users = onResult.docs.map(val => val.data()); 
         
         const finalTransformed = users.map((val, index) => ( {...val, zIndex:index}));
         finalTransformed.sort(function(a,b) { return b.zIndex - a.zIndex})
         const filterByApp = finalTransformed.filter(val => !val.appUser );
         const filterBySetter = filterByApp.filter(val => val.latitude == 0);
         setProfilesAuth(filterBySetter) 
         setProfiles(filterBySetter); 
     
        }
        if(Object.keys(user).length){
            namer()
        }
        
        
     }, [user])


const data1 = [{ fullname:"zaid",min:15,max:19}, {fullname:"zaheer",min:20,max:24}, {zIndex:400, fullname:"nihal",ageRange:{min:25, max:29}},{fullname:"nihal",ageRange:{min:30, max:34}}]
//const [addAge, {data}] = useMutation(ADD_USER_AGE); 
const [selectedValue, setSelectedValue] = useState("java");
const ageRange = [{min:15,max:19},{min:20,max:24},{min:25, max:29}, {min:30, max:34}, {min:35, max:39}, {min:40, max:44}, {min:45, max:49}]
const [visible, setVisible] = useState(false);
const [country,selectCountry] = useState([]); 
const [namer, setNamer] = useState(0); 
const [zIndex, setIndex] = useState(1000); 
const [gate, checkGate] = useState(true);




const changeArray = (arr, obj) => {



return arr; 

}



useEffect(() => {
    if(country.length == profiles.length){
        checkGate(false); 
    }    
 }, [profiles, country])
 const updateToServer = () => {
     const batch  = db.batch(); 
     country.map(val => {
          const ref = db.collection('user').doc(val._id); 
          batch.set(ref, {minAge:val.minAge}, {merge:true}); 
          batch.set(ref, {maxAge:val.maxAge}, {merge:true});
          batch.set(ref, {age:parseInt((val.maxAge + val.minAge)/2)}, {merge:true});
     })
     batch.commit().then(() => console.log("documents have been added successfully"))
     
}
const updateCountryWrapper = (obj:any) => {
     
     
     

}



const _sendToServer = () => {
     addAge({variables:{userInputList:{data:country}}}); 
     navigation.navigate('ProfilePool'); 

}

const toggleOverlay = () => {
    setVisible(!visible);
  };
 

useEffect(() => {
     
}, [namer])
 const zIndexSetter = (val1, index) => {
     const result = profiles.filter(val => {
          return val1.phoneNumber == val.phoneNumber
     })
     result[0].zIndex = zIndex;
     profiles.splice(index, 1, result[0]);  
     setNamer(namer + 1); 
     setIndex(zIndex + 10) 
 } 
//  function computeName(obj) {
//         if (obj.name) {
//             return obj.name;
//         }
//         if (obj.firstName && obj.lastName) {
//             return obj.firstName + obj.lastName;
//         }
//         return obj.firstName;
//     }
  

    return(
        <SafeAreaView style = {{flex:1, }}>
        
        <View style = {{flex:0.2}}>
        <Text h4 style = {{alignSelf:'center', fontWeight:'600', marginTop:30}}>
            Tell us about your friends
        </Text>
        <Text h6 style = {{alignSelf:'center', fontWeight:'600'}}>
            Confirm the age of each friend
        </Text>
        </View>
        <View style = {{flex:0.6}}>
        <ScrollView>
        {
           profiles.map((val,index) => {
                return <View style = {{flexDirection: 'row',borderWidth:1, justifyContent:'space-between',marginRight:20, borderRightWidth:0, borderLeftWidth:0, marginLeft:20, height:100, alignItems:'center', zIndex:val.zIndex}} key = {index.toString()}>
                    <View style = {{flexDirection:'row',alignItems:'center',}}>
                    {val.profilePic ? <Image source = {{uri:val.profilePic}} style = {{height:40, width:40, borderRadius:20}}/>:<MaterialIcons name="account-circle" size={30} color="black" />}

                    <Text style = {{marginLeft:10, fontWeight:'bold', maxWidth:100,maxHeight:50}}>{computeName(val)}</Text>
                    </View>
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
                    
    
    onPress = {() => {console.log("pressed")}}
    containerStyle={{height: 40, width:200, }}
    placeholder = {"20 - 25 years"}
    style={{}}
    itemStyle={{
        backgroundColor:"white", 
        fontColor:"white",
        justifyContent: 'flex-start'
    }}
    dropDownStyle={{backgroundColor: '#fafafa', zIndex:100}}
    onChangeItem={item => selectCountry(arrayReplace(country, {...item.value, _id:val.phoneNumber}))}
    
    
/>
                    
        
                    

                </View>
           })  
        }
        
        </ScrollView>        
        </View>
        <View style = {{flex:0.2, justifyContent:'center',marginTop:10}}>
         <Button title = "Save" containerStyle = {{marginLeft:30, marginRight:30,}} buttonStyle = {{backgroundColor:'black'}} onPress = {() => {updateToServer(), navigation.navigate('ContactsSex')}} disabled = {false}></Button>   
        </View>
        </SafeAreaView>
        )    





}
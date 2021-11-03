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
import { LoadScreen } from '../../src/common/Common';
import {preload} from '../../DefaultData'; 
const db = firebase.firestore(); 


//addAgeList(userInputList: userInputList1!): Boolean!
const ADD_USER_AGE = gql`
mutation namer($userInputList:userInputList1!){
     addAgeList(userInputList:$userInputList)
}

`

export default function ContactsAge({navigation,route}){
    const myContext = useContext(AppContext); 
    const { userId, setProfilesAuth,computeName,sortNames} = myContext;
    const [loading, setLoading] = useState(true); 
    const [user,setUser] = useState({});
useEffect(() => {
  db.collection('user').doc(userId).get().then(onDoc => {
      const user = onDoc.data(); 
      setUser(onDoc.data())
      preload(userId)
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
        navigation.setOptions({
         headerShown:false, 
        })
     }, [])


     useEffect(() => {
        async function namer(){
            const checkerResult = await Promise.all(user.datingPoolList.map(async val => {
                return await db.collection('user').doc(val).get().then(onDoc => {
                  if(onDoc.exists){
                    return onDoc.data()
                  }
                  return null; 
                })
                
               }))
           const finalChecker = checkerResult.filter(val => val !== null);   
        //  const onResult = await db.collection('user').where(firebase.firestore.FieldPath.documentId(), 'in', user.datingPoolList).get();
        //  const users = onResult.docs.map(val => val.data()); 
         const gamer = sortNames(finalChecker)
         gamer.sort((a, b) => {
      
            let fa = computeName(a).toLowerCase(),
                fb = computeName(b).toLowerCase();
        
            if (fa < fb) {
                return 1;
            }
            if (fa > fb) {
                return -1;
            }
            return 0;
        });
         
         const finalTransformed = gamer.map((val, index) => ( {...val, zIndex:index }));
         const gamerChecker = sortNames(gamer); 
         
         finalTransformed.sort(function(a,b) { return b.zIndex - a.zIndex})
         const filterByApp = finalTransformed.filter(val => !val.appUser );
         const filterBySetter = filterByApp.filter(val => !val.state );
         setProfilesAuth(filterBySetter) 
         
         setProfiles(filterBySetter);
         setLoading(false) 
     
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
const checkAgeSet = (minAge:number, maxAge:number) => {
     if(minAge >= 15 && maxAge <= 19){
          return 0; 
     }
     if(minAge >= 20 && maxAge <= 24){
        return 1; 
     }
     if(minAge >= 25 && maxAge <= 29){
        return 2; 
     }
     if(minAge >= 30 && maxAge <= 34){
        return 3; 
     }
     if(minAge >= 35 && maxAge <= 39){
        return 4; 
     }
     if(minAge >= 40 && maxAge <= 44){
        return 5; 
     }
     if(minAge >= 45 && maxAge <= 49){
        return 6; 
     }
     if(minAge >= 50 && maxAge <= 54){
        return 7; 
     }
     if(minAge >= 55 && maxAge <= 59){
        return 8; 
     }
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
          batch.set(ref, {ageSet:checkAgeSet(val.minAge, val.maxAge)}, {merge:true});
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
  
    if(loading){
        return <LoadScreen/>
    }    
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
        <ScrollView contentInset = {{bottom:100}}>
        {
           profiles.map((val,index) => {
                return <View style = {{flexDirection: 'row',borderWidth:1, justifyContent:'space-between',marginRight:20, borderRightWidth:0, borderLeftWidth:0, marginLeft:20, height:100, alignItems:'center', zIndex:val.zIndex}} key = {index.toString()}>
                    <View style = {{flexDirection:'row',alignItems:'center',}}>
                    {val.profilePicSmall ? <Image source = {{uri:val.profilePicSmall}} style = {{height:40, width:40, borderRadius:20}}/>:<MaterialIcons name="account-circle" size={30} color="black" />}

                    <Text style = {{marginLeft:10, fontWeight:'bold', maxWidth:100,maxHeight:50}}>{computeName(val)}</Text>
                    </View>
                    <DropDownPicker
                    items={[
                        {label: '15 - 19 years', value: {minAge:15,maxAge:19},},
                        {label: '20 - 24 years', value: {minAge:20,maxAge:24}},
                        {label: '25 - 29 years', value: {minAge:25,maxAge:29}},
                        {label: '30 - 34 years', value: {minAge:30,maxAge:34}},
                        {label: '35 - 39 years', value: {minAge:35,maxAge:39},},
                        {label: '40 - 44 years', value: {minAge:40,maxAge:44},},
                        {label: '45 - 49 years', value: {minAge:45,maxAge:49},},
                        {label: '50 - 54 years', value: {minAge:50,maxAge:54},},
                    ]}
                    
    
    onPress = {() => {console.log("pressed")}}
    containerStyle={{height: 40, width:200, }}
    placeholder = {"Select Age"}
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
        <Text style = {{alignSelf:'center', marginBottom:20, color:'black', fontWeight:"600", marginTop:10,fontStyle:'italic'}}>{profiles.length - country.length} friend remaining</Text>   
         <Button title = "I'm Done" containerStyle = {{marginLeft:30, marginRight:30,}} buttonStyle = {{backgroundColor:'black'}} titleStyle = {{fontWeight:'bold'}} onPress = {() => {updateToServer(), navigation.navigate('ContactsSex')}} disabled = {gate}></Button>   
        </View>
        </SafeAreaView>
        )    





}
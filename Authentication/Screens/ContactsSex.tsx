import  React, {useState,useRef,useEffect, useContext} from 'react';
import { View, StyleSheet,  TextInput,TouchableOpacity,ScrollView,Image, FlatList,Picker,PanResponder,Animated, TouchableWithoutFeedback, SafeAreaView} from 'react-native';
import { useMutation,useQuery } from '@apollo/react-hooks';
import {Text, Avatar, Icon} from 'react-native-elements'; 
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { gql } from 'apollo-boost';
import {Button} from 'react-native-elements'; 
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import {firebase} from '../../config'; 
import AppContext from '../../AppContext'; 
import {updateUser} from '../../networking';
const db = firebase.firestore();    
import { MaterialIcons } from '@expo/vector-icons'; 
// @refresh reset

export default function ContactsSex({navigation,route}){
const myContext = useContext(AppContext); 
const { userId, profileAuth, setProfilesAuth,computeName} = myContext;   
const data1 = [{fullname:"Zaid shaikh", identification:'something',gender:'male', _id:1},{fullname:"ALi reza", identification:'something', _id:2},{fullname:"Huraira", identification:'something', _id:3},{fullname:"Samadh Khan",identification:'something', _id:4},{fullname:"Nihal Modal",identification:'somehting',_id:5},{fullname:"Rafiq modal", identification:'something', _id:6},{fullname:"Baiju Noyan", identification:'something', _id:7},{fullname:"Bilkis baji",identification:'something', _id:8},{fullname:"Bismil",identification:'something', gender:'female', _id:9}]
const [fetchData,setFetchdata] = useState([]); 
const [arr,addArr] = useState([]); 
const [namer, setNamer] = useState(0); 
const [gate, checkGate] = useState(true); 
const [gender,addGender] = useState([]); 
const [profiles, setProfiles] = useState([]); 
const [user,setUser] = useState({}); 
const [, updateState] = React.useState();
const forceUpdate = React.useCallback(() => updateState({}), []);
let checker = useRef([]).current;


useEffect(() => {
   db.collection('user').doc(userId).get().then(onDoc => {
       setUser(onDoc.data())
   })
 }, [])


 function addGenderGamer(obj){
   console.log(obj)
   const index = checker.findIndex(val => val.client == obj.client);
   console.log(index)
   
   if(index !== -1 ){
      
      checker.splice(index, 1);
      checker.push(obj);
      forceUpdate()

      console.log("checker is")
       console.log(checker)
      return; 
   }
   
   checker.push(obj); 
   console.log("checker is")
   console.log(checker)
   forceUpdate() 

 }





// useEffect(() => {
//    async function namer(){
//     const onResult = await db.collection('user').where(firebase.firestore.FieldPath.documentId(), 'in', user.datingPoolList).get();
//     const users = onResult.docs.map(val => val.data()); 
    
//     const finalTransformed = users.map((val, index) => ( {...val, zIndex:index}));
//     finalTransformed.sort(function(a,b) { return b.zIndex - a.zIndex})
//     const filterByApp = finalTransformed.filter(val => val.appUser == false);
//      const filterBySetter = filterByApp.filter(val => val.latitude == 0);
//      setProfiles(filterBySetter); 

//    }
//    if(Object.keys(user).length){
//       namer()
//   }
   
   
// }, [user])

const genderComponent  = () => {
   
}

useEffect(() => {
navigation.setOptions({
  headerShown:false, 
})
}, [])


const updateToServer = () => {
    const db = firebase.firestore(); 
    let batch = db.batch(); 
    db.collection('user')
    profileAuth.map(val => {
      const ref = db.collection('user').doc(val.phoneNumber); 
      batch.set(ref, {gender:val.gender}, {merge:true});   
    })
    batch.commit().then(() => console.log('DOcument updated successfully')); 
}

const addMale = (obj => {
   
const data = profileAuth.concat(); 
const result = data.filter(val => {
    return val.phoneNumber == obj.phoneNumber 
})
result[0].gender = "male"; 
setProfilesAuth(data); 
})
const addFemale = (obj => {
  const data = profileAuth.concat(); 
   
   
const result = data.filter(val => {
    return val.phoneNumber == obj.phoneNumber 
})
result[0].gender = "female"; 
setProfilesAuth(data); 
})

// useEffect(() => {
//    profileAuth !== undefined ? profileAuth.map(val => {
//        if(val.gender == undefined){
//           checkGate(true); 
//           return; 
//       }
//       checkGate(false); 
      
//   }):null    
// }, [profileAuth])

const updateGender = () => {
   checker.map(val => {
      db.collection('user').doc(val.client).set({gender:val.gender}, {merge:true})
   })
}


useEffect(() => {
console.log("gate checker called")  
const gender = checker.map(val => val.gender); 
const genderFilter = gender.filter(val => val.gender !== undefined); 
if(checker.length !== profileAuth.length){
  checkGate(true)
  return; 
}
  

checkGate(false)
}, [checker.length])





const _sendToServer = () => {
 const finaler = profiles.map(val => {
    return {_id:val.phoneNumber, gender:val.gender}
 }) 
 
 updateContactsGender({variables:{userInputList:{data:finaler}}});   
}

const ContactView = ({item, index}) => {
  const [selected, setSelected] = useState()

  return (
    <View key={index} 
    style = {{borderWidth:1, height:50,flexDirection:"row",  justifyContent:'space-between', marginLeft:20, marginRight:20, borderLeftWidth:0, borderRightWidth:0,}}
    // onPress = {() => { addArray(index)}}
    >
        <View style = {{flexDirection:'row', alignItems:'center', flex:0.9}}>
        {item.profilePicSmall ? <Image source = {{uri:item.profilePicSmall}} style = {{height:40, width:40, borderRadius:20}}/>:<MaterialIcons name="account-circle" size={30} color="black" />}
        <Text style = {{marginLeft:10,maxWidth:100,maxHeight:50}} numberOfLines = {2}>{computeName(item)}</Text>

        </View>
        <View style = {{alignItems:'center', justifyContent:'space-between', marginRight:10, flexDirection:'row',flex:0.2}}>
           <TouchableOpacity onPress = {() => {addGenderGamer({client:item.phoneNumber, gender:'male'}), setSelected('male')}} style = {{}}> 
           <FontAwesome name="male" size={40} color={selected == 'male' ? 'blue':'black' || item.gender} />
           </TouchableOpacity>
           <TouchableOpacity onPress = {() => {addGenderGamer({client:item.phoneNumber, gender:'female'}),setSelected('female')}}>
           <FontAwesome5 name="female" size={40} color={selected == 'female' ? 'pink':'black'} />
           </TouchableOpacity>

        </View>
    </View>
  )
}

const renderItem = ({ item, index }) => {
  console.log(" iwas rendered")
  return (
    <ContactView item = {item} index = {index}/>
  ) 
}

const Memo = React.useMemo(() => {
  
return <FlatList
data = {profileAuth}
renderItem = {renderItem}
keyExtractor={item => item.phoneNumber}

/>  
}, [])


   var radio_props = [
      {label: 'param1', value: 0 },
      {label: 'param2', value: 1 }
    ];
   
  return(
    <View style = {{flex:1, }}>
    <View style = {{flex:0.1, }}>
    
    </View>
    <View style = {{flex:0.1,marginTop:20}}>
    <Text h4 style = {{alignSelf:'center', fontWeight:"600"}}>Tell us about your friends</Text>
    <Text h5 style = {{alignSelf:'center', fontWeight:"600"}}>Confirm the gender of each friend</Text>
   
    </View>
    <View style = {{flex:0.6}}>
    {Memo}

    {/* <ScrollView>
              {profileAuth !== undefined ? profileAuth.map((val,index) => {
                return (
                  <View key={index} 
                  style = {{borderWidth:1, height:50,flexDirection:"row",  justifyContent:'space-between', marginLeft:20, marginRight:20, borderLeftWidth:0, borderRightWidth:0,}}
                  onPress = {() => { addArray(index)}}
                  >
                      <View style = {{flexDirection:'row', alignItems:'center', flex:0.9}}>
                      {val.profilePic ? <Image source = {{uri:val.profilePic}} style = {{height:40, width:40, borderRadius:20}}/>:<MaterialIcons name="account-circle" size={30} color="black" />}
                      <Text style = {{marginLeft:10,maxWidth:100,maxHeight:50}} numberOfLines = {2}>{computeName(val)}</Text>

                      </View>
                      <View style = {{alignItems:'center', justifyContent:'space-between', marginRight:10, flexDirection:'row',flex:0.2}}>
                         <TouchableOpacity onPress = {() => {addMale(val)}} style = {{}}> 
                         <FontAwesome name="male" size={34} color={val.gender == 'male' ? 'green':'black' || val.gender} />
                         </TouchableOpacity>
                         <TouchableOpacity onPress = {() => {addFemale(val)}}>
                         <FontAwesome5 name="female" size={34} color={val.gender == 'female' ? 'green':'black'} />
                         </TouchableOpacity>
    
                      </View>
                  </View>
                )
              }):null}
            </ScrollView>  */}
    </View>
    <View style = {{flex:0.2, justifyContent:'center',marginTop:10 }}>
    <Text style = {{alignSelf:'center', marginBottom:20, color:'black', fontWeight:"600", marginTop:10,fontStyle:'italic'}}>{profileAuth.length - checker.length } friend remaining </Text>
    <Button title = "I'm Done" containerStyle = {{marginLeft:30, marginRight:30,}} buttonStyle = {{backgroundColor:'black'}} onPress = {() => { updateGender(), navigation.navigate('ContactsLocationLatest')}} disabled = {gate}></Button>   

    </View>
    </View>
    ) 
}
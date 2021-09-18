import  React, {useState,useRef,useEffect, useContext, useCallback, useMemo, memo} from 'react';

import { View, StyleSheet,  TextInput,TouchableOpacity,ScrollView,Image, FlatList,Picker,PanResponder,Animated, TouchableWithoutFeedback, SafeAreaView, KeyboardAvoidingView, Keyboard} from 'react-native';
import { Divider,Header,Text, SearchBar,Avatar,Icon,Button,CheckBox} from 'react-native-elements';
import { createFilter } from 'react-native-search-filter';
import { firebase } from '../../config'; 
import AppContext from '../../AppContext'; 
import {updateUser,filterGamer} from '../../networking';  
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { filter } from 'underscore';
import { LoadScreen } from '../../src/common/Common';
import {preload} from '../../DefaultData'; 
//@refresh reset


function MainGun({length}){
  return <Text>{length}</Text>
  }




function Contacts({navigation,route}){
   
const myContext = useContext(AppContext); 
const { userId,defaultDataObject,setUser,computeName, setId,contactsL,sortNames} = myContext;

const db = firebase.firestore(); 
// const [indexer,setIndexer] = useState([]); 
const [indexer, setIndexer] = useState([]) 
let checker = useRef([]).current; 

const [isSelected, setSelection] = useState(false);
const KEYS_TO_FILTERS = ['name', 'firstName', 'lastName'];
const [loading, setLoading] = useState(true); 
const [search, setSearch] = useState('');
const [selectAll, setSelectAll] = useState(true);
const [serverData, addServerData] = useState([]); 
const [profiles, setProfiles] = useState([]); 
const [name, setName] = useState("zaid")
const [user,setUser1] = useState({});
const arr = Array.from(new Array(10000), (x,index) => index + 1)
const namer = arr.map(val => {
 return {
  phoneNumber:val, 
  name:"Kate bell"
 }
})
namer[4].name = "zaid"; 
namer[4].phoneNumber = 10 
useEffect(() => {
  db.collection('user').doc(userId).get().then(onDoc => {
      setUser1(onDoc.data())
  })
}, [])


useEffect(() => {
navigation.setOptions({
  headerShown:false
})
}, [])

// const WrapperComponent = () => {
//  return <FlatList
//  data = {filteredEmails}
//  renderItem = {renderItem}
//  keyExtractor = {(item => item.phoneNumber )}
//  />  
// }
// function moviePropsAreEqual(prevMovie, nextMovie) {
//   return true
// }
const [, updateState] = React.useState();
const forceUpdate = React.useCallback(() => updateState({}), []);
const [once, setOnce] = useState(1); 

useEffect(() => {
Keyboard.dismiss()
Keyboard.removeAllListeners('keyboardDidShow'); 
}, [])


 useEffect(() => {
  Keyboard.dismiss(); 
  
 }, [checker])

useEffect(() => {
   async function namer(){
     setLoading(true);
     const checkerResult = await db.collection('user').get().then(onResult => {
      const users =  onResult.docs.map(val => val.data());
      console.log("user length is"+users.length) 
      const result = users.filter(person => user.contactList.includes(person.phoneNumber))
      return result; 
   }) 
    // const checkerResult = await Promise.all(user.contactList.map(async val => {
    //   return await db.collection('user').doc(val).get().then(onDoc => {
    //     if(onDoc.exists){
    //       return onDoc.data()
    //     }
    //     return null; 
    //   })
      
    //  }))
  //   const checkerResult = await db.collection('user').get().then(onResult => {
  //     const users =  onResult.docs.map(val => val.data());
  //     console.log("user length is"+users.length) 
  //     const result = users.filter(person => contactList.includes(person.phoneNumber))
  //     return result; 
  //  })
     const finalChecker = checkerResult.filter(val => val !== null);
    //const onResult = await db.collection('user').where(firebase.firestore.FieldPath.documentId(), 'in', user.contactList).get();
    // const users = onResult.docs.map(val => val.data()); 
    // const users = finalChecker;
    
    const users = finalChecker;  
    const regUsers = users.filter(val => val.latitude);
    const nonReg = users.filter(val => !val.latitude); 
    const profilesWithMatchMaker = users.filter(val => val.matchMaker == userId); 
    const profilesWithoutMatchmaker = users.filter(val => val.matchMaker !== userId); 
    const withMatchPics = await Promise.all(profilesWithoutMatchmaker.map(async val => {
      if(val.matchMaker){
        return await db.collection('user').doc(val.matchMaker).get().then(onDoc => {
          return {...val, matchMakerPic:onDoc.data().profilePic}
        })
      }
      return {...val, matchMakerPic:null}
    }))
    const finalUsers = [...regUsers, ...nonReg];
    const gamer = sortNames(finalUsers); 

    setProfiles(gamer);
    Keyboard.dismiss()
    setLoading(false);  

   }
   if(Object.keys(user).length){
    namer()
   }
   
   
}, [user])
const sendToServer = async () => {
    
  const checkerResult = await Promise.all(checker.map(async val => {
    return await db.collection('user').doc(val).get().then(onDoc => {
      if(onDoc.exists){
        return onDoc.data()
      }
      return null; 
    })
    
   }))
   const finalChecker = checkerResult.filter(val => val !== null); 
   const filterByApp = finalChecker.filter(val => !val.appUser);
   const filterBySetter = filterByApp.filter(val => !val.latitude);
  //  if(filterBySetter.length < 1){
  //   const userInit = Object.assign({}, {...defaultDataObject},{phoneNumber:userId},{...user}, {appUser:true}) 
  //   db.collection('user').doc(userId).set(userInit, {merge:true});

  //   var filteredIntros = user.contactList.filter(
  //     function(e) {
  
  //       return this.indexOf(e) < 0;
  //     },
  //    checker
  // );
  
  
        
  // updateUser(userId, {contactList:filteredIntros})
  // await db.collection('user').doc(userId).set({datingPoolList:checker}, {merge:true}); 
  // // await AsyncStorage.setItem('user', userId);  
  // // setId(userId)
  // AsyncStorage.setItem('user', userId)
  // setId(userId)
  // navigation.reset({index:0, routes:[{name:"Homer"}]})
  // return;    
  // }
  var filteredIntros = user.contactList.filter(
    function(e) {

      return this.indexOf(e) < 0;
    },
   checker
);
   
   updateUser(userId, {contactList:filteredIntros})
   await db.collection('user').doc(userId).set({datingPoolList:checker}, {merge:true}); 
   navigation.navigate('ContactsAge')

   
  //  db.collection('user').where(firebase.firestore.FieldPath.documentId(), 'in', indexer).get().then(async onResult => {
  //    const result = onResult.docs.map(val => val.data());
  //    const filterByApp = result.filter(val => !val.appUser);
  //    const filterBySetter = filterByApp.filter(val => !val.latitude);
  //    if(filterBySetter.length < 1){
  //     const userInit = Object.assign({}, {...defaultDataObject},{...user}) 
  //     db.collection('user').doc(userId).set(userInit, {merge:true});

  //     var filteredIntros = user.contactList.filter(
  //       function(e) {
    
  //         return this.indexOf(e) < 0;
  //       },
  //      indexer
  //   );
    
          
  //   updateUser(userId, {contactList:filteredIntros})
  //   await db.collection('user').doc(userId).set({datingPoolList:indexer}, {merge:true}); 
  //   await AsyncStorage.setItem('user', userId);  
  //   setId(userId);
    
    
  //    return;    
  //    }
  //    var filteredIntros = user.contactList.filter(
  //     function(e) {
  
  //       return this.indexOf(e) < 0;
  //     },
  //    indexer
  // );
     
  //    updateUser(userId, {contactList:filteredIntros})
  //    await db.collection('user').doc(userId).set({datingPoolList:indexer}, {merge:true}); 
  //    navigation.navigate('ContactsAge') 

  //  })
   
}



// const addArray = (phoneNumber:string) => {
  
//      if(indexer.includes(phoneNumber)){
//         const copyIndex = indexer.concat()  
//         const index = indexer.indexOf(phoneNumber);
//              const result = indexer.splice(index, 1);
//             // copyIndex[index] = phoneNumber
//             //setIndexer(copyIndex); 
//             return; 
//      }
//      setIndexer([...indexer, phoneNumber]);
// }
const addArray = (phoneNumber:string) => {
  console.log(" iwas called")
  
  if(checker.includes(phoneNumber)){
     const index = checker.findIndex(val => val == phoneNumber);
          const result = checker.splice(index, 1);
         
         console.log(checker)
         forceUpdate()
         
         return; 
  }
  checker.push(phoneNumber)
  
  forceUpdate()
  
  console.log(checker)
}
const [, setForceUpdate] = useState(Date.now());

const BottomTemplate = ({mainer}) => {
  console.log(" i m mainer "); 
  console.log(mainer.length)
  return <Text>{mainer.length}</Text>
}
function checkerProps(prev, next){
  if(prev.mainer ===  next.mainer){
    return true; 
  }
}
const BottomTemplate2 = memo(BottomTemplate, checkerProps)




// const gamerBoy = useCallback((phoneNumber:string) => {
// addArray(phoneNumber)
// }, [indexer])

// const addArray = (phoneNumber:string) => {
  
//     if(indexer.includes(phoneNumber)){
//       const copyIndex = indexer.concat();  
//       const index = copyIndex.indexOf(phoneNumber);
//           const result = copyIndex.splice(index, 1);
//           indexer = result;  
//           console.log(indexer)
//           return; 
//    }
   
//    indexer = [...indexer, phoneNumber]

  
//   console.log(indexer)
// }



const ContactView = ({item,adder}) => {
  const [isClicked, setIsClicked] = useState(false);  
  return (
    <TouchableOpacity  
    style = {{borderWidth:1, flexDirection:"row",  justifyContent:'space-between', marginLeft:20, marginRight:20, borderLeftWidth:0, borderRightWidth:0,}}
    onPress = {() => { setIsClicked(!isClicked), adder(item.phoneNumber)}}
    >
      
        <View style = {{flexDirection:'row', alignItems:'center', marginTop:5, marginBottom:5}}>
        {item.profilePicSmall ? <Image source = {{uri:item.profilePicSmall}} style = {{height:60, width:60, borderRadius:30, }}/>:<MaterialIcons name="account-circle" size={60} color="black" />}  
        <Text style = {{marginLeft:10, fontSize:17,maxWidth:100,maxHeight:100}}>{computeName(item)}</Text>
        <Text style = {{marginLeft:20}}>{item.latitude ? <Text style = {{fontWeight:'bold', fontSize:25}}> R </Text>:null}</Text>
        
        </View>
        <View style = {{alignItems:'center', justifyContent:'center', marginRight:10}}>
           <Icon name = {"check"} iconStyle = {{opacity:isClicked ? 1:0}}/> 
        </View>
    </TouchableOpacity>
  )
}

console.log(indexer)


const searchAction = () => {
  setSearch(''); 
  
}



const renderItem = ({ item }) => {
  console.log(" iwas rendered")
  return (
    <ContactView item = {item} adder = {addArray}/>
  ) 
}
 
  const result = useMemo(() => {
    console.log("Memo called")
  }, [checker])

    
   const filteredEmails = profiles.filter(createFilter(search, KEYS_TO_FILTERS))
   const Memo = React.useMemo(() => {
    console.log("i was called")
  return <FlatList
  data = {filteredEmails}
  renderItem = {renderItem}
  keyExtractor={item => item.phoneNumber}
  extraData = {filteredEmails}
  />  
  }, [profiles, filteredEmails.length])
   
   if(loading){
     return <LoadScreen />
   }
   return(
     
        <TouchableOpacity style = {{flex:1,backgroundColor:'white',marginBottom:35 }} onPress = {Keyboard.dismiss}>
        <View style = {{flex:0.1}}>
                        
        </View>
        <View style = {{flex:0.2}}>
        <Text h4 style = {{alignSelf:'center',fontWeight:'bold'}}> FRIENDS LIST</Text>
        <Text h6 style = {{alignSelf:'center',fontWeight:'600', marginTop:10,marginBottom:20}}> Select the friends you want to match</Text>
        <SearchBar
          lightTheme
          round
          containerStyle = {{marginLeft:15, marginRight:15}}
          searchIcon={{ size: 24 }}
          onChangeText={text => setSearch(text)}
          placeholder="search"
          value={search}
        />
        </View>
          <View style = {{marginTop:10,flex:0.6, marginTop:40}}>
          
          {Memo}  
          {/* <FlatList
  data = {filteredEmails}
  renderItem = {renderItem}
  keyExtractor={item => item.phoneNumber}
  extraData = {filteredEmails}
  /> */}
          {/* <ScrollView>
          {filteredEmails.map((val,index) => {
            return (
              <TouchableOpacity key={index} 
              style = {{borderWidth:1, flexDirection:"row",  justifyContent:'space-between', marginLeft:20, marginRight:20, borderLeftWidth:0, borderRightWidth:0,}}
              onPress = {() => { addArray(val.phoneNumber)}}
              >
                
                  <View style = {{flexDirection:'row', alignItems:'center', marginTop:5, marginBottom:5}}>
                  {val.profilePic ? <Image source = {{uri:val.profilePic}} style = {{height:60, width:60, borderRadius:30, }}/>:<MaterialIcons name="account-circle" size={60} color="black" />}  
                  <Text style = {{marginLeft:10, fontSize:17,maxWidth:100,maxHeight:100}}>{computeName(val)}</Text>
                  <Text style = {{marginLeft:20}}>{val.latitude ? <Text style = {{fontWeight:'bold', fontSize:25}}> R </Text>:null}</Text>
                  
                  </View>
                  <View style = {{alignItems:'center', justifyContent:'center', marginRight:10}}>
                     <Icon name = {"check"} iconStyle = {{opacity:indexer.includes(val.phoneNumber) ? 1:0}}/> 
                  </View>
              </TouchableOpacity>
            )
          })}
        </ScrollView>         */}
       


        
        </View>
        <View style = {{flex:0.1,marginTop:20}}>
          
            <Text style = {{alignSelf:'center', marginBottom:20, color:'black', fontWeight:"600", marginTop:10}}>{checker.length} Friends selected</Text>
            <Button buttonStyle = {{backgroundColor:'black'}} title = {"I'm Done"} containerStyle = {{marginLeft:20, marginRight:20}} disabledStyle = {{backgroundColor:'grey', }} titleStyle = {{fontWeight:'bold'}} disabled = {checker.length > 0 ? false:true} onPress = {() => {sendToServer()}}>
                
            </Button>
               
        </View>
        </TouchableOpacity>
        
        )

}


 const Memed = React.memo(Contacts)
 export default Memed; 


const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    checkboxContainer: {
      flexDirection: "row",
      marginBottom: 20,
    },
    checkbox: {
      alignSelf: "center",
    },
    label: {
      margin: 8,
    },
  });
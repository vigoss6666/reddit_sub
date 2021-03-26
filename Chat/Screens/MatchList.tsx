import  React, {useState,useRef,useEffect, useContext} from 'react';
import { StatusBar,View, StyleSheet, Text, TextInput,TouchableOpacity,ScrollView,Image, Button,FlatList,Picker,PanResponder,Animated, TouchableWithoutFeedback, SafeAreaView, Dimensions} from 'react-native';
import { useMutation,useQuery } from '@apollo/react-hooks';
import { MaterialIcons } from '@expo/vector-icons';
import {Line, HeaderBar } from '../../src/common/Common'; 
import {merge} from '../../src/common/helper'; 
import { firebase } from '../../config';
import AppContext from '../../AppContext'; 
import {updateUser} from '../../networking';
// @refresh reset
export default function MatchList({navigation}){
const [image, setImage] = useState(false);
const [matches, setMatches] = useState([]); 
const [chatList, setChatList] = useState([]); 
const myContext = useContext(AppContext); 
const {user, userId, setChatNotification,setChatterNotification} = myContext;
console.log(user.seenMatches)
 
console.log(danny)

const db = firebase.firestore();
// useEffect(() => { 
//    console.log("the component was rendered")
//    const unsubscribe = db.collection("matches").doc("UJ4u7q4oHqlj3n6nrBv9").collection("users").onSnapshot(snap => {
//      const data1 = snap.docs.map(doc => doc.data())
     
//      const result = data1.map(val => {
//        return val._id; 
//      })
//     const users = db.collection("user").where('_id','in', result).where('isNew', '==', true).onSnapshot(snap => {
//         const data = snap.docs.map(doc => doc.data())
//         const result = data.map(val => {
//             return val; 
//         })
        
//         setMatches(merge(result,data1)); 
//     }) 
     
//    });
//   return () => {return unsubscribe()}
// }, []);
const createChatThread = (userID:string, user2ID:string) => {
  if(userID > user2ID){
     return userID+user2ID.toString()
  }
  if(userID < user2ID){
   return user2ID+userID.toString()
  }
}
console.log(chatList)
const danny = createChatThread(userId, "+15554787672");
console.log(danny)

useEffect(() => {
 async function namer(){
  
  db.collection('matches').where('client1', '==', user.phoneNumber ).get().then(async onResultClient1 => {
     const client1 = onResultClient1.docs.map(val => Object.assign({}, val.data(), {_id:val.id}));
     const client1Users = client1.filter(val => val.client2);  
     const transformedWithUsers1 =  await Promise.all(client1.map(async val => {
      return await db.collection('user').doc(val.client2).get().then(result => Object.assign({}, val, {clientUser:result.data()})) 
   }))
   const seen1 = []; 
   var filtered1 = transformedWithUsers1.filter(
    function(e) {
      return this.indexOf(e._id) < 0;
    },
    user.seenMatches
);
const seenTransformed1 = filtered1.map(val => {
  return {...val, new:true } 
  })
  const otherFilter1 = seenTransformed1.map(val => val._id);
  const otherFilteredObjects1 = transformedWithUsers1.filter(
    function(e) {
      return this.indexOf(e._id) < 0;
    },
    otherFilter1
);
  const finalArray1 = [...seenTransformed1, ...otherFilteredObjects1];
  
  

     
     db.collection('matches').where('client2', '==', user.phoneNumber).get().then(async onResultClient2 => {
        let client2 = onResultClient2.docs.map(val => Object.assign({}, val.data(), {_id:val.id})); 
        const transformed = client2.map(val => {
           let a = val.client1; 
           let b = val.client2; 
           let temp; 
           temp = a;
           a = b;
           b = temp;
           return {...val, client1:a, client2:b}
        })
        
        const transformedWithUsers =  await Promise.all(transformed.map(async val => {
           return await db.collection('user').doc(val.client2).get().then(result => Object.assign({}, val, {clientUser:result.data()})) 
        }))
        const seen = ['0846c5b1-584b-4ae7-920b-6d895e59d38e']; 
        
        var filtered = transformedWithUsers.filter(
          function(e) {
            return this.indexOf(e._id) < 0;
          },
          user.seenMatches
      );
      const seenTransformed = filtered.map(val => {
        return {...val, new:true } 
        })
      const otherFilter = seenTransformed.map(val => val._id);
      const otherFilteredObjects = transformedWithUsers.filter(
        function(e) {
          return this.indexOf(e._id) < 0;
        },
        otherFilter
    );
    const finalArray = [...seenTransformed, ...otherFilteredObjects];
    const grangArray = [...finalArray1, ...finalArray]; 
    const newUsers = grangArray.filter(val => val.new == true); 
    const seenUsers = grangArray.filter(val => !val.new); 
    const grandestArray = [...newUsers, ...seenUsers]; 
     
    const filterByChatted = grandestArray.filter(
      function(e) {
        return this.indexOf(e._id) < 0;
      },
      user.chatted
  ); 
    if(user.seenMatches.length < filterByChatted.length){
       setChatNotification(true); 
    }
    if(user.seenMatches.length >= filterByChatted.length){
       setChatNotification(false); 
    }  
    setMatches(filterByChatted)

        
     })
     
     
 
  })
 } 
namer(); 
}, [user.seenMatches])


useEffect(() => {
  async function namer(){
    db.collection('matches').where(firebase.firestore.FieldPath.documentId(), 'in', user.chatted).get().then(async onResult => {
      const data = onResult.docs.map(val => val.data()); 
      const result = data.map(val => {
 
        if(val.client2 == userId){
                 let a = val.client1; 
                 let b = val.client2; 
                 let temp; 
                 temp = a;
                 a = b;
                 b = temp;
                 return {...val, client1:a, client2:b}; 
        }
        return val; 
      })
      
    //   const transformedWithUsers =  await Promise.all(result.map(async val => {
    //     return await db.collection('user').doc(val.client2).get().then(result => Object.assign({}, val, {clientUser:result.data()})) 
    //  }))
     const transformedWithUsers =  await Promise.all(result.map(async val => {
      return await db.collection('user').doc(val.client2).get().then(async result => {
         return await db.collection('messages').doc(createChatThread(userId, result.data().phoneNumber)).collection('messages').orderBy('createdAt', 'desc').limit(1).get().then(onChatResult => {
            return  Object.assign({}, val, {clientUser:result.data(), lastMessage:onChatResult.docs.map(val => val.data())})
         })
      }) 
   }))
     
     setChatList(transformedWithUsers); 
     transformedWithUsers.map(val => {
        if(!val.lastMessage[0].seen){
           setChatterNotification(true)
        }
     }) 
    
    })
    // const chatThread = createChatThread(userId, '+15555648583'); 
    // db.collection('messages').doc(chatThread).collection('messages').orderBy('createdAt', "desc").limit(1).get().then(onResult => {
    //    const finalData = onResult.docs.map(val => val.data()); 
    //    console.log(finalData[0])
    // })

  }
  namer()
  
}, [])





interface chatInstance  {
    isNew:boolean, 
    profilePic?:string, 
    _id:string, 
    lastChat:string, 
    fullname:string 
}

const DATA1 = [
    {
    isNew:true, 
    profilePic:'something', 
    _id:"something", 
    lastChat:"Something", 
    fullname:"Amy Buckthiorpe"   
   }, 
   {
      isNew:true, 
      profilePic:'something', 
      _id:"something",   
      lastChat:"Something", 
      fullname:"Stacey smith"
   },
   {
    isNew:true, 
    profilePic:'something', 
    _id:"something",   
    lastChat:"Something", 
    fullname:"Eric backman"    
   },
   {
    isNew:true, 
    profilePic:'something', 
    _id:"something",   
    lastChat:"Something", 
    fullname:"Borat sachdev"
     }, 
     {
        isNew:true, 
      profilePic:'something', 
      _id:"something",   
      lastChat:"Something", 
      fullname:"Akiba rubstein"   
     },
     {
        isNew:true, 
      profilePic:'something', 
      _id:"something",   
      lastChat:"Something", 
      fullname:"Katy perry"   
     },
     {
        isNew:true, 
        profilePic:'something', 
        _id:"something",   
        lastChat:"Something", 
        fullname:"Kate Hudson"   
     }, 
     {
        isNew:true, 
      profilePic:'something', 
      _id:"something",   
      lastChat:"Something", 
      fullname:"Lindsay"   
     },
     {
        isNew:true, 
      profilePic:'something', 
      _id:"something",   
      lastChat:"Something", 
      fullname:"Sophie adams"   
     },
  
  
  
  ]



const Item = ({ title }) => {
    console.log(title)
   return horizontalIcon(title)
};
const Item1 = (obj:chatInstance) => {

if(obj.title.profilePic){
    return verticalIconWithImage(obj.title)
}   
return verticalIcon    
}
 
;  

  const renderItem = ({ item }) => (
    <Item title={item.profile_pic} />
  );  
  const computeName = (obj) => {
    if(obj.name){
       return obj.name
    }
    if(obj.firstName && obj.lastName){
       return obj.firstName+obj.lastName
    }
    return obj.firstName
 }
  const renderItem1 = ({ item }) => (
    <Item1 title={item} />
  );

  const renderHorizontalList = ({item}) => {
    
   
   if(item.clientUser.profilePic && !item.new ){
       return horizontalIconWithImageSeen(item);  
   }
   if(!item.clientUser.profilePic && !item.new){
      return horizontalIconWithSeen(item); 
   }  
   if(!item.clientUser.profilePic && item.new == true ){
      return horizontalIcon(item); 
   }
   if(item.clientUser.profilePic && item.new == true ){
      return horizontalIconWithImage(item);  
   }
}
  const renderVerticalList = ({item}) => {
    if(item.lastMessage[0].seen == true && item.clientUser.profilePic){
        return verticalIconWithImageSeen(item)
    }  
    if(!item.lastMessage[0].seen && item.clientUser.profilePic){
      return verticalIconWithImage(item)
    }
  }


const setChatSeen = (doc) => {
   console.log("set seen called")
   const docRef = db.collection("matches").doc("UJ4u7q4oHqlj3n6nrBv9").collection("users"); 
   const unsubscribe = docRef.where("_id", "==", doc._id).onSnapshot(snap => {
     const data1 = snap.docs.map(doc => {
        docRef.doc(doc.data()._id).update({chatSeen:true}).then(() => console.log("updated successfully")).catch(() => console.log("update failed")) 
     })
  })
}
useEffect(() => {
 console.log("chats component was rendered")
}, [])
const handleChatPressed = (doc) => {
    setChatSeen(doc); 
    navigation.navigate('ChatLatest', {title:doc.fullName, backPage:'chatList', _id:doc._id}); 
}

const handleMatchPressed = (doc) => {
    db.collection('user').doc(user.phoneNumber).update({seenMatches:firebase.firestore.FieldValue.arrayUnion(doc._id)}); 
    navigation.navigate('ChatLatest', {title:"something", backPage:'match', _id:doc._id});  
}



const horizontalIcon = (obj) => <TouchableOpacity 
style = {{height:50, width:50, borderRadius:25, borderWidth:1,justifyContent:"flex-end", alignItems:"center", marginLeft:10}}
onPress = {() => handleMatchPressed(obj)}
>
<MaterialIcons name="account-circle" size={50} color="black" />
<View style = {{height:15,width:15, position:'absolute', left:-5, backgroundColor:'red', borderRadius:7.5, top:13}}/>
</TouchableOpacity>; 

const horizontalIconWithImage = (obj) => <TouchableOpacity onPress = {() => handleMatchPressed(obj)}><View style = {{height:15,width:15, position:'absolute', left:5, backgroundColor:'red', borderRadius:7.5, top:13, zIndex:200}}/><Image source = {{uri:obj.clientUser.profilePic}} style = {{height:50, width:50, borderRadius:25, marginLeft:10, marginRight:10, zIndex:100}}/></TouchableOpacity>; 

const horizontalIconWithSeen = (obj) => <TouchableOpacity 
style = {{height:50, width:50, borderRadius:25, borderWidth:1,justifyContent:"flex-end", alignItems:"center", marginLeft:10}}
onPress = {() => handleMatchPressed(obj)}
>
<MaterialIcons name="account-circle" size={50} color="black" />
</TouchableOpacity>; 

const horizontalIconWithImageSeen = (obj) => <TouchableOpacity onPress = {() => handleMatchPressed(obj)}><Image source = {{uri:obj.clientUser .profilePic}} style = {{height:50, width:50, borderRadius:25, marginLeft:10, marginRight:10}}/></TouchableOpacity>;  

const verticalIcon = (obj:chatInstance) => <TouchableOpacity style = {{flexDirection:"row", marginTop:10}}>
<TouchableOpacity style = {{height:50, width:50, borderRadius:25, borderWidth:1,justifyContent:"flex-end", alignItems:"center", marginLeft:10}}>
<View style = {{height:15,width:15, position:'absolute', left:-5, backgroundColor:'red', borderRadius:7.5, top:13}}/>
<MaterialIcons name="account-circle" size={50} color="black" />
</TouchableOpacity>
<View style = {{marginLeft:10, justifyContent:'center',}}>
    <Text  textBreakStrategy = {"highQuality"} style = {{fontWeight:'bold'}} >{obj.fullname}</Text>
    <Text style = {{maxWidth:Dimensions.get('window').width - 100}} numberOfLines = {1}>{obj.lastMessage.text}</Text>
</View>
</TouchableOpacity>


const verticalIconSeen = (obj:chatInstance) => <TouchableOpacity style = {{flexDirection:"row", marginTop:10}}>
<TouchableOpacity style = {{height:50, width:50, borderRadius:25, borderWidth:1,justifyContent:"flex-end", alignItems:"center", marginLeft:10}}>
<View style = {{height:15,width:15, position:'absolute', left:-5, backgroundColor:'red', borderRadius:7.5, top:13}}/>
<MaterialIcons name="account-circle" size={50} color="black" />
<View style = {{height:15,width:15, position:'absolute', left:-5, backgroundColor:'red', borderRadius:7.5, top:13,zIndex:100}}/>
</TouchableOpacity>
<View style = {{marginLeft:10, justifyContent:'center',}}>
    <Text  textBreakStrategy = {"highQuality"} style = {{fontWeight:'bold'}} >{obj.fullname}</Text>
    <Text style = {{maxWidth:Dimensions.get('window').width - 100}} numberOfLines = {1}>{obj.Message.text}</Text>
</View>
</TouchableOpacity> 

const verticalIconWithImage =  (obj:chatInstance) => <TouchableOpacity 
style = {{flexDirection:"row", marginTop:10, marginLeft:10}}
onPress = {() => handleChatPressed(obj)}
>
<Image source = {{uri:obj.clientUser.profilePic}} style = {{height:50, width:50, borderRadius:25,}}/>
<View style = {{marginLeft:10, justifyContent:'center',}}>
    <Text style = {{fontWeight:'bold'}} >{computeName(obj.clientUser)}</Text>
    <Text style = {{maxWidth:Dimensions.get('window').width - 100}} numberOfLines = {1}>{obj.lastMessage[0].user._id !== userId ? obj.lastMessage[0].text: `You: ${obj.lastMessage[0].text}`}</Text>
</View>
</TouchableOpacity>

const verticalIconWithImageSeen = (obj:chatInstance) => <TouchableOpacity 
style = {{flexDirection:"row", marginTop:10, marginLeft:10}}
onPress = {() => handleChatPressed(obj)}
>
<View style = {{height:15,width:15, position:'absolute', left:-5, backgroundColor:'red', borderRadius:7.5, top:13, zIndex:100}}/>
<Image source = {{uri:obj.profile_pic}} style = {{height:50, width:50, borderRadius:25,}}/>
<View style = {{marginLeft:10, justifyContent:'center',}}>
    <Text  textBreakStrategy = {"highQuality"} style = {{fontWeight:'bold'}} >{obj.fullName}</Text>
    <Text style = {{maxWidth:Dimensions.get('window').width - 100}} numberOfLines = {1}>{obj.lastMessage.text}</Text>
</View>
</TouchableOpacity>
 
  

return(
<SafeAreaView style = {{flex:1, marginTop:20}}>
{/* 
Matches template
*/}
<StatusBar />
<View>

<Line />
<View style = {{justifyContent:"center", alignItems:"center"}}>
<Text style = {{alignSelf:"center", fontWeight:"bold", fontSize:15, marginTop:10, marginBottom:10}}>Matches</Text>
</View>
<Line />
</View>
{/* 
Horizontal flatlist 
*/}

<View>
<FlatList
        data={matches}
        renderItem={renderHorizontalList}
        keyExtractor={item => item._id}
        horizontal = {true}
        showsHorizontalScrollIndicator = {false}
        style = {{marginTop:20, marginBottom:20, marginLeft:20, marginRight:20}}
      />
<Line  />      
</View>
{/* 
Vertical flatlist
*/}
<View>
 <FlatList
        data={chatList}
        renderItem={renderVerticalList}
        keyExtractor={item => item.id}
        
        showsHorizontalScrollIndicator = {false}
        style = {{marginTop:20, marginBottom:20}}
      /> 
      
</View>
</SafeAreaView>
)
}
import  React, {useState,useRef,useEffect} from 'react';
import { StatusBar,View, StyleSheet, Text, TextInput,TouchableOpacity,ScrollView,Image, Button,FlatList,Picker,PanResponder,Animated, TouchableWithoutFeedback, SafeAreaView, Dimensions} from 'react-native';
import { useMutation,useQuery } from '@apollo/react-hooks';
import { MaterialIcons } from '@expo/vector-icons';
import {Line, HeaderBar } from '../../src/common/Common'; 
import {merge} from '../../src/common/helper'; 
import { firebase } from '../../config';

export default function MatchList({navigation}){
const [image, setImage] = useState(false);
const [matches, setMatches] = useState(); 
const [chatList, setChatList] = useState(); 
const db = firebase.firestore();
useEffect(() => { 
   console.log("the component was rendered")
   const unsubscribe = db.collection("matches").doc("UJ4u7q4oHqlj3n6nrBv9").collection("users").onSnapshot(snap => {
     const data1 = snap.docs.map(doc => doc.data())
     
     const result = data1.map(val => {
       return val._id; 
     })
    const users = db.collection("user").where('_id','in', result).where('isNew', '==', true).onSnapshot(snap => {
        const data = snap.docs.map(doc => doc.data())
        const result = data.map(val => {
            return val; 
        })
        
        setMatches(merge(result,data1)); 
    }) 
     
   });
  return () => {return unsubscribe()}
}, []);
console.log(matches)





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
  const renderItem1 = ({ item }) => (
    <Item1 title={item} />
  );

  const renderHorizontalList = ({item}) => {
   
   if(item.profile_pic && item.seen == false && item.chatted == false){
       return horizontalIconWithImage(item);  
   }
   if(!item.profile_pic && item.seen == false && item.chatted == false){
      return horizontalIcon(item); 
   }  
   if(!item.profile_pic && item.seen == true && item.chatted == false){
      return horizontalIconWithSeen(item); 
   }
   if(item.profile_pic && item.seen == true && item.chatted == false){
      return horizontalIconWithImageSeen(item);  
   }
}
  const renderVerticalList = ({item}) => {
    if(item.chatted == true && item.profile_pic && item.chatSeen && item.lastMessage){
        return verticalIconWithImageSeen(item)
    }  
    if(item.chatted == true && item.profile_pic && item.chatSeen == true && item.lastMessage){
      return verticalIconWithImage(item)
    }
  }

const setSeen = (doc) => {
 console.log("set seen called")
 const docRef = db.collection("matches").doc("UJ4u7q4oHqlj3n6nrBv9").collection("users"); 
 const unsubscribe = docRef.where("_id", "==", doc._id).onSnapshot(snap => {
   const data1 = snap.docs.map(doc => {
      docRef.doc(doc.data()._id).update({seen:true}).then(() => console.log("updated successfully")).catch(() => console.log("update failed")) 
   })
})
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

const handleChatPressed = (doc) => {
    setChatSeen(doc); 
    navigation.navigate('Chat', {title:doc.fullName, backPage:'chatList', _id:doc._id}); 
}

const handleMatchPressed = (doc) => {
    setSeen(doc);
    navigation.navigate('Chat', {title:"something", backPage:'match', _id:doc._id});  
}



const horizontalIcon = (obj) => <TouchableOpacity 
style = {{height:50, width:50, borderRadius:25, borderWidth:1,justifyContent:"flex-end", alignItems:"center", marginLeft:10}}
onPress = {() => handleMatchPressed(obj)}
>
<MaterialIcons name="account-circle" size={50} color="black" />
<View style = {{height:15,width:15, position:'absolute', left:-5, backgroundColor:'red', borderRadius:7.5, top:13}}/>
</TouchableOpacity>; 

const horizontalIconWithImage = (obj) => <TouchableOpacity onPress = {() => handleMatchPressed(obj)}><View style = {{height:15,width:15, position:'absolute', left:5, backgroundColor:'red', borderRadius:7.5, top:13, zIndex:200}}/><Image source = {{uri:obj.profile_pic}} style = {{height:50, width:50, borderRadius:25, marginLeft:10, marginRight:10, zIndex:100}}/></TouchableOpacity>; 

const horizontalIconWithSeen = (obj) => <TouchableOpacity 
style = {{height:50, width:50, borderRadius:25, borderWidth:1,justifyContent:"flex-end", alignItems:"center", marginLeft:10}}
onPress = {() => handleMatchPressed(obj)}
>
<MaterialIcons name="account-circle" size={50} color="black" />
</TouchableOpacity>; 

const horizontalIconWithImageSeen = (obj) => <TouchableOpacity onPress = {() => handleMatchPressed(obj)}><Image source = {{uri:obj.profile_pic}} style = {{height:50, width:50, borderRadius:25, marginLeft:10, marginRight:10}}/></TouchableOpacity>;  

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
<Image source = {{uri:obj.profile_pic}} style = {{height:50, width:50, borderRadius:25,}}/>
<View style = {{marginLeft:10, justifyContent:'center',}}>
    <Text  textBreakStrategy = {"highQuality"} style = {{fontWeight:'bold'}} >{obj.fullName}</Text>
    <Text style = {{maxWidth:Dimensions.get('window').width - 100}} numberOfLines = {1}>{obj.lastMessage.text}</Text>
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
        keyExtractor={item => item.id}
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
        data={matches}
        renderItem={renderVerticalList}
        keyExtractor={item => item.id}
        
        showsHorizontalScrollIndicator = {false}
        style = {{marginTop:20, marginBottom:20}}
      /> 
      
</View>
</SafeAreaView>
)
}
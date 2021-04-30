import  React, {useState,useRef,useEffect, useContext, useCallback} from 'react';
import { Text, View, StyleSheet, TouchableOpacity,Image, ActionSheetIOS } from 'react-native';
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { GiftedChat, Bubble, Time } from 'react-native-gifted-chat'
import { format, formatDistance, formatRelative, subDays } from 'date-fns'
import {firebase} from '../../config'; 
const db = firebase.firestore(); 

const computeName = (obj) => {
  if(obj.name){
     return obj.name
  }
  if(obj.firstName && obj.lastName){
     return obj.firstName+obj.lastName
  }
  return obj.firstName
}

interface ChatLatestProps {}

const ChatLatest = ({navigation, route}) => {
const [matchMaker, setMatchMaker] = useState({});   
const insets = useSafeAreaInsets();
const [messages, setMessages] = useState([]); 
let clientObj = useRef().current;   
let chatID = useRef().current; 
const createChatThread = (userID:string, user2ID:string) => {
  if(userID > user2ID){
     return userID+user2ID.toString()
  }
  if(userID < user2ID){
   return user2ID+userID.toString()
  }
}
useEffect(() => {
  if(clientObj.discoveredBy){
     db.collection('user').doc(clientObj.discoveredBy).get().then(doc => {
        setMatchMaker(doc.data()); 
     })
  } 
}, [])
const [result, setResult] = useState('🔮');
  if(route.params){
     clientObj = route.params.mainer; 
     chatID = createChatThread(clientObj.client1, clientObj.client2); 
  } 
  useEffect(() => { 
    if(chatID){
      const unsubscribe = db.collection("messages").doc(chatID).collection("messages").orderBy('createdAt', 'desc').onSnapshot(snap => {
        const data = snap.docs.map(doc => doc.data())
        const result = data.map(val => {
           val.createdAt = val.createdAt.toDate(); 
           return val; 
        })
        setMessages(result)
      });
      return () => { unsubscribe()}
    }
    
   
}, []);
  

  useEffect(() => {
    navigation.setOptions({
      headerLeft:() => {
        return <TouchableOpacity onPress = {() => onPress()}>
        <FontAwesome5 name="font-awesome-flag" size={24} color="red" style = {{marginLeft:10}}/>
        </TouchableOpacity>
      }, 
      headerTitle:() => {
        return <View style = {{marginTop:10, marginBottom:10, justifyContent:'center', alignItems:'center'}}>
        <TouchableOpacity onPress = {() => navigation.navigate('ChatClientView', {client:clientObj.clientUser.phoneNumber})}>{clientObj.clientUser.profilePic ? <Image source = {{uri:clientObj.clientUser.profilePic}} style = {{height:40, width:40, borderRadius:20}}></Image>:<MaterialIcons name="account-circle" size={50} color="black" />}</TouchableOpacity>  
        <Text style = {{fontWeight:'bold', marginTop:5, marginBottom:5}}>{computeName(clientObj.clientUser)}</Text>
        </View>
      }, 
      headerStyle:{height:120}, 
      headerRight:() => {
        return <TouchableOpacity onPress = {() => navigation.goBack()}>
          <Text style = {{fontWeight:'bold', color:'orange',}}>Done</Text>
        </TouchableOpacity>
      },
      headerRightContainerStyle:{ paddingRight:10}

      
      
      
    })
  })
 const renderTime = (props) => {
    return <Time {...props} timeTextStyle = {{left:{color:'black', fontWeight:'bold'}, right:{color:'black', fontWeight:'bold'}}}/>
 } 
 const renderAvatar = () => {
    return (
       clientObj.clientUser.profilePic ? <Image style = {{height:40, width:40, borderRadius:20}} source = {{uri:clientObj.clientUser.profilePic}}/>:<MaterialIcons name="account-circle" size={50} color="black" /> 
    )
    
 }
 const renderBubble = (props) => {
    return <Bubble {...props} wrapperStyle = {{left:{backgroundColor:'#78807a',}, right:{backgroundColor:'orange'}}} textStyle = {{left:{color:'black', fontWeight:'bold'}, right:{color:'black', fontWeight:'bold'}}}/>
 }

  const onPress = () =>
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ['UNMATCH', `REPORT ${computeName(clientObj.clientUser)}`, ],
        destructiveButtonIndex: 2,
        cancelButtonIndex: 0,
      },
      buttonIndex => {
        if(buttonIndex == 0){
           console.log("unmatch")
        }
        else if(buttonIndex == 1){
           console.log("reporting")
        }
      }
    );
    const renderChatEmpty = () => {
      const dater = formatDistance(subDays(new Date(clientObj.createdAt.toDate()), 3), new Date(), { addSuffix: true })
      return <View style = {{flex:1, justifyContent:"center", alignItems:"center", transform: [ { scaleY: -1 } ]}}>
        <Text style = {{marginBottom:10, fontWeight:'bold'}}>You matched with {computeName(clientObj.clientUser)} </Text>
        <Text style = {{marginBottom:10, fontWeight:'bold'}}> {dater} </Text>
        <Image source = {{uri:clientObj.clientUser.profilePic}} style = {{height:100, width:100, borderRadius:50}}/>
        {Object.keys(matchMaker).length ? <Text style = {{marginTop:30, fontWeight:'bold'}}> Matched by {computeName(matchMaker)}</Text>:null }
      </View>
   }

    const onSend = useCallback((messages = []) => {
      
      db.collection('matches').doc(clientObj._id).update({chatted:true});
      db.collection('user').doc(clientObj.client1).update({lastMessage:firebase.firestore.FieldValue.arrayUnion(messages[0])}) 
      db.collection('user').doc(clientObj.client2).update({lastMessage:firebase.firestore.FieldValue.arrayUnion(messages[0])}) 

      db.collection('messages').doc(chatID).collection("messages").add(messages[0])
    }, [])





  return (
    
        <GiftedChat
      renderChatEmpty = {renderChatEmpty}  
      showAvatarForEveryMessage = {false}
      renderAvatar = {renderAvatar}
      renderBubble = {renderBubble}
      renderTime = {renderTime}
      renderAvatarOnTop
      scrollToBottom = {true}
      messages={messages}
      onSend={messages => onSend(messages)}
      user={{
        _id: clientObj.client1,
      }}
    />
    
  );
};

export default ChatLatest;

const styles = StyleSheet.create({
  container: {}
});

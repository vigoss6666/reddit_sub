import  React, {useState,useRef,useEffect,useCallback} from 'react';
import { View, StyleSheet, Text, TextInput,TouchableOpacity,ScrollView,Image, Button,FlatList,Picker,PanResponder,Animated, TouchableWithoutFeedback, SafeAreaView} from 'react-native';
import { useMutation,useQuery, } from '@apollo/react-hooks';
import { GiftedChat, Bubble } from 'react-native-gifted-chat'
import { firebase } from './config'; 
import { Video } from 'expo-av';




 

  
  
  
export default function Chat({navigation}){
    const [messages, setMessages] = useState([]);
    const didMountRef = useRef(false)
    const currentUser = firebase.auth().currentUser;
    const [limit, setLimit] = useState(5); 
    const user = "Pk7jX3qNPAG8acQzMmAB"; 
    const user1 = "UJ4u7q4oHqlj3n6nrBv9";
    console.log("limit "+limit)
    
    const renderLoadEarlier = () => {
       return  <TouchableOpacity 
       style = {{justifyContent:"center", alignItems:"center", marginTop:10}}
       onPress = {() => setLimit(10)}
       >
         <Text style = {{color:"blue", fontWeight:"500"}}>Load Earlier</Text>
       </TouchableOpacity> 
    }
    const renderBubble = props => {
      //console.log(props.currentMessage.image)
      if(props.currentMessage.image){
         return (
            
            <Image source = {{uri:props.currentMessage.image}} style = {{height:100, width:100}}/>
         )
      }
      if(props.currentMessage.video){
        return (
          <Video
          source={{ uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4' }}
          rate={1.0}
          volume={1.0}
          isMuted={false}
          resizeMode="cover"
          shouldPlay
          isLooping
          style={{ width: 200, height: 200 }}
        />
        )
     }
      return (
        <Bubble
          {...props}
          wrapperStyle={{
            left: {
              backgroundColor: '#f0f0f0',
            },
          }}
        />
      )
        }

    const createChatThread = (userID:string, user2ID:string) => {
       if(userID > user2ID){
          return userID+user2ID.toString()
       }
       if(userID < user2ID){
        return user2ID+userID.toString()
       }
    }
    const chatID = createChatThread(user, user1); 
    console.log(typeof chatID)

    const db = firebase.firestore();
    useEffect(() => { 
      
      const unsubscribe = db.collection("messages").doc(chatID).collection("messages").limit(limit).orderBy('createdAt', 'desc').onSnapshot(snap => {
        const data = snap.docs.map(doc => doc.data())
        const result = data.map(val => {
           val.createdAt = val.createdAt.toDate(); 
           return val; 
        })
        setMessages(result)
      });
     return () => {return unsubscribe()}
}, []);
        

    
    const onSend = useCallback(async (messages = []) => {
        messages[0].createdAt = firebase.firestore.Timestamp.fromDate(new Date()),
        //messages[0].video = 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
         
        messages[0].pending = true;
        db.collection('messages').doc(chatID).collection("messages").add(messages[0])
        
        
      }, [])
return(

 <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      renderImage = {() => 'https://placeimg.com/140/140/any'}
      renderMessageImage = {() => 'https://placeimg.com/140/140/any'}
      user={{
        _id: 5,
      }}
      renderBubble = {renderBubble}
      renderLoadEarlier = {renderLoadEarlier}
      isLoadingEarlier = {true}
      loadEarlier = {true}
      
    /> 
    

)
}
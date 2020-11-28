import  React, {useState,useRef,useEffect,useCallback} from 'react';
import { View, StyleSheet, Text, TextInput,TouchableOpacity,ScrollView,Image, Button,FlatList,Picker,PanResponder,Animated, TouchableWithoutFeedback, SafeAreaView, ImageBackground, Clipboard, Dimensions} from 'react-native';
import { useMutation,useQuery, } from '@apollo/react-hooks';
import { GiftedChat, Bubble, InputToolbar,Send,Day, MessageImage, MessageAudioProps, MessageImageProps, Time, MessageVideoProps, MessageText } from 'react-native-gifted-chat'
import { firebase } from '../../config'; 
import { Video } from 'expo-av';
import MapView, {Marker} from 'react-native-maps';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import * as Animatable from 'react-native-animatable';
import { FontAwesome } from '@expo/vector-icons';
import LottieView from 'lottie-react-native';
//import {CustomChatInput} from '../../src/common/Common';
import { UniqueDirectiveNamesRule } from 'graphql';
import * as ImageManipulator from 'expo-image-manipulator';
import * as FileSystem from 'expo-file-system';
import {Tester1,AudioGetter,VideoMessage,DocumentGetter,ServerHeart, AudioSetter} from '../../src/common/Common'; 
import * as Linking from 'expo-linking';
import { Platform } from '@unimodules/core';






 

  
  
  
export default function Chat({navigation, route}){
    const [messages, setMessages] = useState([]);
    const didMountRef = useRef(false)
    const dir = useRef(FileSystem.documentDirectory + 'lobby52342/').current;
    const [pressed, setPressed] = useState({image:null}); 
    const currentUser = firebase.auth().currentUser;
    const [limit, setLimit] = useState(3); 
    const user = "Pk7jX3qNPAG8acQzMmAB"; 
    const user1 = "UJ4u7q4oHqlj3n6nrBv9";
    const [namer,setNamer] = useState("zaid"); 
    const [selectedImage, setSelectedImage] = React.useState(null);
    const [toolBar, selectToolbar] = useState(false);
    const [giphy,setGiphy] = useState(false);  
    const [gifs, setGifs] = useState([]);
    const [reply, setReply] = useState(false); 
    const [sender, setSender] = useState(false); 
    const [report, setReport] = useState(false); 
    const [recording, setRecording] = useState(false); 
    const myComponent = useRef();
    const [imageUri, setImageUri] = useState(); 
    const [forward,setForward] = useState(); 
    const gifDir =  FileSystem.documentDirectory + '/imageehrjew/';
    const gifFileUri = (gifId: string) => gifDir + `${gifId}`;
    const userId = useRef(5).current; 
    const davidTyping = useRef("UJ4u7q4oHqlj3n6nrBv9").current;
    const zaidTyping = useRef("Pk7jX3qNPAG8acQzMmAB").current; 
    const [isTyping, setIsTyping] = useState(false); 
    const token = useRef("ExponentPushToken[C3nLnqLQLcFX_p6mNTuC09]").current; 
    const selfColor = "#c3f7d1"; 
    const otherColor = "#f0f7f7";
    const {title} = route.params;   
    
    function urlToFilename(str:string){
      var part = str.substring(
          str.lastIndexOf("%") + 1, 
          str.lastIndexOf("?")
      );
      
  }
  function dateFromTimestamp(timestamp:any){
    const date = firebase.firestore.Timestamp.fromDate(timestamp) 
      const time = date.toMillis()
      const d = new Date(time); 
      const minutes = d.getMinutes();
      const minString = minutes.toString();  
      if(minString.length < 2){
        return `${d.getHours()}:0${d.getMinutes()}` 
      }
      return `${d.getHours()}:${d.getMinutes()}`
    }

  const checkIsUser = (user) => user === userId;   
  async function tester(url:string){
    const {exists} = await FileSystem.getInfoAsync(dir) 
    if(!exists){
     await FileSystem.makeDirectoryAsync(dir)  
     console.log("Directory created")
    }
    const fileUri = dir + urlToFilename(url);
    const checker = await FileSystem.getInfoAsync(fileUri)
    if(!checker.exists){
     await FileSystem.downloadAsync(url, fileUri);   
     return fileUri;  
    }
     
     return fileUri; 
   }
   const setReceived = () => {
      
   }
   const renderMessageImage = (props:any) => {
    const result =  tester(props.currentMessage.image);
      if(typeof result === 'string'){
        props.currentMessage.image = result; 
      } 
      if(props.currentMessage.user._id !== 7){
        return (
          <View style = {{flexDirection:"row", justifyContent:"center", alignItems:"center"}}>
                
                <MessageImage {...props} style = {{height:200, width:200}}>
              
              </MessageImage>
          <AntDesign name="hearto" size={24} color="black" />
          </View> 
       )  
      }
      return (
               
              <MessageImage {...props} style = {{height:200, width:200}}>
              
              </MessageImage>
          )
   }
   const renderMessageVideo = (props:any) => {
    const result =  tester(props.currentMessage.video);
    console.log(result)
  if(typeof result === 'string'){
    console.log("result is"+result)
    props.currentMessage.video = result; 
  }
     const t = firebase.firestore.Timestamp.fromDate(props.currentMessage.createdAt); 
     const d = t.toDate().toDateString()
     console.log(d)
     
    return (
     <VideoMessage video = {props.currentMessage.video} time = {d} navigation = {navigation}/>
    )
   }
   const renderMessageText = (props:any) => {
    const  {...messageTextProps} = props; 
    console.log(typeof messageTextProps.currentMessage.user._id)
    console.log(checkIsUser(messageTextProps.currentMessage.user._id))
    if(messageTextProps.currentMessage.user._id !== userId){
      var jobskill_query = db.collection('messages').doc(chatID).collection("messages").where('_id','==',messageTextProps.currentMessage._id);
    jobskill_query.get().then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        console.log(doc.data())
        doc.ref.update({received:true});
      });
    });
    }
    
      
      if(messageTextProps.currentMessage.reply){
        return (
          <View>
          <View style = {{backgroundColor:"green", height:30, justifyContent:"center", maxWidth:50}}>
          <Text>{messageTextProps.currentMessage.reply.text}</Text> 
          </View>  
          <MessageText {...messageTextProps} />
          </View> 
       )  
      }
      if(messageTextProps.currentMessage.user._id !== userId){
        return (
          <View style = {{flexDirection:"row", justifyContent:"center", alignItems:"center"}}>
                
          <MessageText {...messageTextProps} />
          <ServerHeart db = {db} messageObject = {messageTextProps.currentMessage} chatID = {chatID}/>
          </View> 
       )  
      }
      return (
         <View style = {{flexDirection:"row", alignItems:"center"}}>
         {messageTextProps.currentMessage.like ? <AntDesign name="heart" size={24} color="red" />:null}       
         <MessageText {...messageTextProps} />
         </View> 
      )
   }
   
   const renderMessageAudio = (props) => {
    return (
      <View>
      
       <AudioGetter audio = {props.currentMessage.audio} />
       </View>
       
    )
 }
  const onLongPress = (context, message) => {
     context.actionSheet().showActionSheetWithOptions(
      {
        options: ['Cancel', 'Reply', 'Report', 'Delete'],
        destructiveButtonIndex: 2,
        cancelButtonIndex: 0,
      },
      buttonIndex => {
        if (buttonIndex === 0) {
          // cancel action
        } else if (buttonIndex === 1) {
          setPressed(message); 
          setReply(true); 
        } else if (buttonIndex === 2) {
          context.actionSheet().showActionSheetWithOptions(
            {
              options: ['Made me uncomfortable', 'Abusive or threatening', 'Inappropriate content', 'Spam or scam', 'Cancel'],
              
              cancelButtonIndex: 4,
            },
            buttonIndex => {
               if(buttonIndex === 0){
                  _handleReport(message._id,'Made me uncomfortable' )
               }
               if(buttonIndex === 1){
                _handleReport(message._id,'Abusive or threatening')
             }
             if(buttonIndex === 2){
              _handleReport(message._id, 'Inappropriate content')
             }
             if(buttonIndex === 2){
              _handleReport(message._id, 'Spam or Scam')
             }
           
            }       
          )      
        }
        else if (buttonIndex === 3) {
          deleteMessage(message._id); 
        }

      }
     )

  }
    
    
    
    
    
    async function ensureDirExists() {
      const dirInfo = await FileSystem.getInfoAsync(gifDir);
      if (!dirInfo.exists) {
        console.log("Gif directory doesn't exist, creating...");
        await FileSystem.makeDirectoryAsync(gifDir, { intermediates: true });
      }
    }

     

    
     
    
    async function fetchGifs() {
      try {
        const API_KEY = 'ZXj9CoxD99LW4ULTMZ423W0TmQ3EG44e';
        const BASE_URL = 'http://api.giphy.com/v1/gifs/search';
        const resJson = await fetch(`https://api.giphy.com/v1/gifs/trending?api_key=ZXj9CoxD99LW4ULTMZ423W0TmQ3EG44e&limit=25&rating=g`);
        const res = await resJson.json();
        setGifs(res.data);
      } catch (error) {
        console.warn(error);
      }
    }
    useEffect(() => {
      fetchGifs()
 
   },[])

    const renderComposer = (props) => {
       return <InputToolbar
       {...props}
       value = {namer}      
       containerStyle={{
         justifyContent:"space-around",
         width:'75%',
         borderTopColor: "#E8E8E8",
         borderTopWidth: 1,
       }}
       placeholder = "Start typing"
     >
     
     </InputToolbar>
    }
    
    console.log("limit "+limit)

    

    const openLocation = async () => {
      let { status } = await Location.requestPermissionsAsync();

      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
      }

      let location = await Location.getCurrentPositionAsync({});
      console.log(location)
      const serverObject = {
         _id:uuidv4(), 
         location:{latitude:location.coords.latitude, longitude:location.coords.longitude},
         createdAt:firebase.firestore.Timestamp.fromDate(new Date()),
         user:{
          _id:userId
         }
      }
      db.collection('messages').doc(chatID).collection("messages").add(serverObject);

    }

    const customInputToolbar = props => {
      if(recording){
        return (
        <AudioSetter setRecording = {setRecording}/>
        ) 
      }
      return (
        <InputToolbar
          {...props}
          
          
          
        >
        
        </InputToolbar>
        
      );
    };

    const pickDocument = async () => {
       
       const result = await DocumentPicker.getDocumentAsync({
          type:"application/pdf", 
          multiple:true
       })
       console.log(result)
       const response = await fetch(result.uri); 
          const blob = await response.blob(); 
          const namer = Math.random().toString(36).substring(2);
          const ref = firebase.storage().ref().child("images/"+ namer); 
          await ref.put(blob)
          const result1 = await ref.getDownloadURL(); 
          const serverObject = {
          _id:uuidv4(), 
          createdAt:firebase.firestore.Timestamp.fromDate(new Date()),
          document:result1,
          name:result.name, 
          size:result.size, 
         user:{
         _id:userId
         }   
  }
  db.collection('messages').doc(chatID).collection("messages").add(serverObject); 
    }

   let cameraPickerAsync = async () => {
      
   } 
    
    let openImagePickerAsync = async () => {
      let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();
  
      if (permissionResult.granted === false) {
        alert("Permission to access camera roll is required!");
        return;
      }
  
      let pickerResult = await ImagePicker.launchImageLibraryAsync({mediaTypes:ImagePicker.MediaTypeOptions.All});
      console.log(pickerResult.type)
      if(pickerResult.type == 'image'){
        const manipResult = await ImageManipulator.manipulateAsync(
          pickerResult.uri,
          [{resize:{width:200, height:200}}],
          { compress: 0.1, format: ImageManipulator.SaveFormat.PNG,}
        );
        const response = await fetch(manipResult.uri); 
          const blob = await response.blob(); 
          const namer = Math.random().toString(36).substring(2);
          const ref = firebase.storage().ref().child("images/"+ namer); 
          await ref.put(blob)
          const result1 = await ref.getDownloadURL(); 
          const serverObject = {
          _id:uuidv4(), 
          createdAt:firebase.firestore.Timestamp.fromDate(new Date()),
          image:result1,
         user:{
         _id:userId
         }   
  }
  db.collection('messages').doc(chatID).collection("messages").add(serverObject); 
      }
      if(pickerResult.type == 'video'){
        const response = await fetch(pickerResult.uri); 
          const blob = await response.blob(); 
          const namer = Math.random().toString(36).substring(2);
          const ref = firebase.storage().ref().child("images/"+ namer); 
          
          await ref.put(blob)
          const result1 = await ref.getDownloadURL(); 
          const serverObject = {
          _id:uuidv4(), 
          createdAt:firebase.firestore.Timestamp.fromDate(new Date()),
          video:result1,
         user:{
         _id:userId
         }   
  }
  db.collection('messages').doc(chatID).collection("messages").add(serverObject); 
      }
      
      
      
    }
    
    const renderLoadEarlier = () => {
       return  <TouchableOpacity 
       style = {{justifyContent:"center", alignItems:"center", marginTop:10}}
       onPress = {() => setLimit(limit + 3)}
       >
         <Text style = {{color:"blue", fontWeight:"500"}}>Load Earlier</Text>
       </TouchableOpacity> 
    }
    const handleLinking = (location) => {
          console.log("called")  
          Linking.openURL(`http://maps.apple.com/?ll=${location.latitude},${location.longitude}&spn=100`)
       
    }


    const renderFooter = () => {
      

      if(toolBar){
        return <View style = {{height:200, backgroundColor:"#f7f5f5", marginLeft:10,marginRight:10, marginBottom:10, borderRadius:10, }}>
        <TouchableOpacity style = {{alignItems:"flex-end"}} onPress = {() => selectToolbar(false)}>
        <Entypo name="circle-with-cross" size={24} color="black" /> 
        </TouchableOpacity>
        <View style = {{flexDirection:'row', justifyContent:"space-around"}}>
        <View style =  {{alignItems:"center", marginTop:10}}>
       
          <TouchableOpacity 
          style = {{borderRadius:25, height:50, width:50, backgroundColor:"#3b4487", justifyContent:"center", alignItems:"center",}}
          onPress = {() => pickDocument()}
          >
       
          <Ionicons name="ios-document" size={24} color="white" />

          </TouchableOpacity>
          
          <Text style = {{marginTop:5}}>
            Document
          </Text>
        </View>
        <View style =  {{alignItems:"center", marginTop:10}}>
          <TouchableOpacity 
          style = {{borderRadius:25, height:50, width:50, backgroundColor:"#875452", justifyContent:"center", alignItems:"center"}}
          onPress = {() => openImagePickerAsync()}
          >
          <AntDesign name="camera" size={24} color="white" />

          </TouchableOpacity>
          <Text style = {{marginTop:5}}>
            Gallery
          </Text>
        </View>
        
        </View>
        <View style = {{flexDirection:'row', justifyContent:"space-around", marginLeft:10, marginTop:10}}>
        <View style =  {{alignItems:"center", marginTop:10}}>
       
          <TouchableOpacity style = {{borderRadius:25, height:50, width:50, backgroundColor:"#b08a64", justifyContent:"center", alignItems:"center",}}>
       
          <Feather name="music" size={24} color="white" />

          </TouchableOpacity>
          
          <Text style = {{marginTop:5}}>
            Audio
          </Text>
        </View>
        <View style =  {{alignItems:"center", marginTop:10}}>
          <TouchableOpacity 
          style = {{borderRadius:25, height:50, width:50, backgroundColor:"#506e50", justifyContent:"center", alignItems:"center"}}
          onPress = {() => openLocation()}
          >
          <Entypo name="location-pin" size={24} color="white" />

          </TouchableOpacity>
          <Text style = {{marginTop:5}}>
            Location
          </Text>
        </View>
        
        </View>
      </View>

      }
      if(giphy){
        return <View style = {{height:250, marginLeft:10}}>
       <TouchableOpacity style = {{alignItems:"flex-end"}} onPress = {() => setGiphy(false)}>
        <Entypo name="circle-with-cross" size={24} color="black" /> 
        </TouchableOpacity> 
        <Tester1 navigation = {navigation} db = {db} chatID = {chatID} userId = {userId}/>
        </View> 
      }
    if(reply){
     return <View style = {{ flexDirection:'row', justifyContent:"space-between", alignItems:"center",}}>
       <View style = {{flex:0.3}}>
       </View>
       <View style = {{flexDirection:"row", flex:0.7,backgroundColor:"grey", justifyContent:"space-between", marginRight:10, borderLeftWidth:5, borderLeftColor:"yellow"}}>
       
       <Text numberOfLines = {1} style = {{fontSize:20, maxWidth:200}}>{pressed.text}</Text>
       
       <TouchableOpacity onPress = {() => {setReply(false), setPressed("")}} style = {{marginLeft:30,backgroundColor:"grey"}}>
       <Entypo name="circle-with-cross" size={24} color="black" />
       </TouchableOpacity>
       </View> 
     </View>
    } 
    if(report){
       return (
          
          <View style = {{backgroundColor:"white"}}>
          <TouchableOpacity style = {{alignItems:"flex-end"}} onPress = {() => _handleReport()}>
          
          </TouchableOpacity>
          <TouchableOpacity style = {{padding:20}} onPress = {() => _handleReport("Made me uncomfortable")}>
            <Text style = {{color:"red"}}>Made me uncomfortable</Text>
          </TouchableOpacity >
          <TouchableOpacity style = {{padding:20}} onPress = {() => _handleReport("Abusive or threatening")}>
            <Text style = {{color:"red"}}>Abusive or threatening</Text>
          </TouchableOpacity>
          <TouchableOpacity style = {{padding:20}} onPress = {() => _handleReport("Inappropriate content")}>
            <Text style = {{color:"red"}}>Inappropriate content</Text>
          </TouchableOpacity>
          <TouchableOpacity style = {{padding:20}} onPress = {() => _handleReport("Spam or scam")}>
            <Text style = {{color:"red"}}>Spam or scam</Text>
          </TouchableOpacity>
          </View>  
       )
    }
     
      
   }

   const _handleReport = (_id:string, message:string) => {
    var jobskill_query = db.collection('messages').doc(chatID).collection("messages").where('_id','==',_id);
jobskill_query.get().then(function(querySnapshot) {
  querySnapshot.forEach(function(doc) {
    console.log(doc.data())
    doc.ref.update({report:message});
  });
});
  setReport(false);
  }
    async function saveFile(uri:string){
      await ensureDirExists();
      const fileUri = gifFileUri(uri);
      const fileInfo = await FileSystem.getInfoAsync(fileUri);
      if (!fileInfo.exists) {
        console.log("Gif isn't cached locally. Downloading...");
        const result = await FileSystem.downloadAsync(uri, fileUri);
        return result; 
      }
    }  
   
   const renderLocation = (location) => {
    return (
      <TouchableOpacity>
        <MapView  style = {{height:200, width:200}} 
        region = {{latitude:pressed.location.latitude, longitude:pressed.location.longitude, latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,}} annotation = {[{latitude:pressed.location.latitude, longitude:pressed.location.longitude}]} scrollEnabled = {false} zoomEnabled = {false}>
          <Marker coordinate = {{latitude:pressed.location.latitude, longitude:pressed.location.longitude}}/>
        </MapView>
        </TouchableOpacity>
     )
   }
    const renderBubble =  (props) => {
      if(props.currentMessage.text){
        if(props.currentMessage.user._id !== userId){
          var jobskill_query = db.collection('messages').doc(chatID).collection("messages").where('_id','==',props.currentMessage._id);
        jobskill_query.get().then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
            console.log(doc.data())
            doc.ref.update({received:true});
          });
        });
        }
        if(props.currentMessage.reply){
          if(props.currentMessage.user._id !== userId){
            return (
              <View>
              <View style = {{backgroundColor:"green", height:30,}}>
              <Text>{props.currentMessage.reply.text}</Text>
              </View> 
              <View style = {{backgroundColor:"blue", height:30,}}>
              <Text style = {{color:"white"}}>{props.currentMessage.text}</Text>
              <Text style = {{position:'absolute', bottom:1, color:"white", right:10, fontSize:10,fontWeight:'bold'}}>{dateFromTimestamp(props.currentMessage.createdAt)}</Text>
              </View> 
              </View> 
           )   
          }
          return (
            <View>
            <View style = {{backgroundColor:"green", height:30,padding:5}}>
            <Text >{props.currentMessage.reply.text}</Text>
            </View> 
            <View style = {{backgroundColor:"#8191e6", height:50,justifyContent:"center", alignItems:"center"}}>
            <Text style = {{color:"white"}}>{props.currentMessage.text}</Text>
            <Text style = {{position:'absolute', bottom:1, color:"white", right:10, fontSize:10,fontWeight:'bold'}}>{dateFromTimestamp(props.currentMessage.createdAt)}</Text>
            </View> 
            </View> 
         )  
        }
        if(props.currentMessage.user._id !== userId){
          if(props.currentMessage.reply){
            return (
              <View>
              <View style = {{backgroundColor:"green", height:30,}}>
              <Text>{props.currentMessage.reply.text}</Text>
              </View> 
              <View style = {{backgroundColor:"blue", height:50,}}>
              <Text style = {{color:"white"}}>{props.currentMessage.text}</Text>
              <Text style = {{position:'absolute', bottom:1, color:"white", right:10, fontSize:10,fontWeight:'bold'}}>{dateFromTimestamp(props.currentMessage.createdAt)}</Text>
              </View> 
              </View> 
           )   
             
          }
          return (
            <View style = {{flexDirection:"row", justifyContent:"center", alignItems:"center"}}>
                  
            <Bubble {...props} />
            <ServerHeart db = {db} messageObject = {props.currentMessage} chatID = {chatID}/>
            </View> 
         )  
        }
        return (
          <View style = {{flexDirection:"row", alignItems:"center"}}>
          {props.currentMessage.like ? <AntDesign name="heart" size={24} color="red" />:null}       
          <Bubble {...props} />
          
          </View> 
       )     
      }
      if(props.currentMessage.audio){
      
       return <View>
        <AudioGetter audio = {props.currentMessage.audio} /> 
       
       </View>
      
       
      }
      if(props.currentMessage.giphy){
         return (
            <View style = {{backgroundColor:'#c3f7d1', elevation:10, shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.5,
            shadowRadius: 2,
            marginTop:5, 
            marginBottom:5, width:160, height:160}}>
              <Image source = {{uri:props.currentMessage.giphy}} style = {{height:150, width:150, position:'absolute', left:5, top:5}} />
              <Text style = {{position:'absolute', bottom:10, color:"white", right:10, fontSize:10,fontWeight:'bold'}}>{dateFromTimestamp(props.currentMessage.createdAt)}</Text>
            </View>
         )
      } 
      if(props.currentMessage.document){
        console.log(props.currentMessage.document); 
        return (
           <View>
             <DocumentGetter uri = {props.currentMessage.document} name = {props.currentMessage.name} size = {props.currentMessage.size} navigation = {navigation} time = {dateFromTimestamp(props.currentMessage.createdAt)}/>
           </View>
        )
     }
  if(props.currentMessage.video){
  const result =  tester(props.currentMessage.video);
  console.log(result)
  if(typeof result === 'string'){
    console.log("result is"+result)
    props.currentMessage.video = result; 
  }
     const t = firebase.firestore.Timestamp.fromDate(props.currentMessage.createdAt); 
     const d = dateFromTimestamp(props.currentMessage.createdAt); 
     console.log(d)
     if(props.currentMessage.user._id !== userId){
      return (
        <View style = {{flexDirection:"row", justifyContent:"center", alignItems:"center",backgroundColor:otherColor,marginTop:10}}>
               
               <VideoMessage video = {props.currentMessage.video} time = {d} navigation = {navigation}/> 
               <View style = {{marginLeft:10, marginRight:5}}>
              <ServerHeart db = {db} messageObject = {props.currentMessage} chatID = {chatID}/>
              </View>
          </View> 
      
      ) 
     }   
    return (
     <VideoMessage video = {props.currentMessage.video} time = {d} navigation = {navigation}/>
    )  
   }
     if(props.currentMessage.image){
      const result =  tester(props.currentMessage.image);
      if(typeof result === 'string'){
        props.currentMessage.image = result; 
      } 
      if(props.currentMessage.user._id !== userId){
        return (
          <View style = {{flexDirection:"row", justifyContent:"center", alignItems:"center",height:120,backgroundColor:otherColor,marginTop:10}}>
               <Text style = {{position:'absolute', bottom:2, right:2, fontSize:10, color:'black'}}>{dateFromTimestamp(props.currentMessage.createdAt)}</Text> 
                <MessageImage {...props} style = {{height:200, width:200}}> 



              
              </MessageImage>
              <ServerHeart db = {db} messageObject = {props.currentMessage} chatID = {chatID}/>
          </View> 
       )  
      }
      return (
              <View style = {{height:120,backgroundColor:selfColor,marginTop:10}}>       
                <Text style = {{position:'absolute', bottom:2, right:2, fontSize:10, color:'black'}}>{dateFromTimestamp(props.currentMessage.createdAt)}</Text>
              <MessageImage {...props} style = {{height:200, width:200}}>
              
              </MessageImage>
              </View>
          ) 
     } 
       
     if(props.currentMessage.location){
      
         if(props.currentMessage.user._id == userId){
          return (
            <TouchableOpacity 
            style = {{height:225, width:210, backgroundColor:'#c3f7d1', marginTop:5}}
            onPress = {() => {  handleLinking(props.currentMessage.location)}}>
              <Text style = {{position:'absolute', bottom:2, right:2, fontSize:10, color:'black'}}>{dateFromTimestamp(props.currentMessage.createdAt)}</Text>
              <MapView  
              onPress = {() => {  handleLinking(props.currentMessage.location)}}
              style = {{height:200, width:200, position:'absolute', top:5, left:5}} 
              region = {{latitude:props.currentMessage.location.latitude, longitude:props.currentMessage.location.longitude, latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,}} annotation = {[{latitude:props.currentMessage.location.latitude, longitude:props.currentMessage.location.longitude}]} scrollEnabled = {false} zoomEnabled = {false}>
                <Marker coordinate = {{latitude:props.currentMessage.location.latitude, longitude:props.currentMessage.location.longitude}}/>
              </MapView>
              </TouchableOpacity>
           )
         }
         if(props.currentMessage.user._id !== userId){
          return (
            <TouchableOpacity 
            
            style = {{height:225, width:210, backgroundColor:'grey', marginTop:5}}
            >
              <Text style = {{position:'absolute', bottom:2, right:4, fontSize:10, color:'white'}}>{dateFromTimestamp(props.currentMessage.createdAt)}</Text>
              <MapView  
              onPress = {() => {  handleLinking(props.currentMessage.location)}}
              style = {{height:200, width:200, position:'absolute', top:5, left:5}} 
              region = {{latitude:props.currentMessage.location.latitude, longitude:props.currentMessage.location.longitude, latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,}} annotation = {[{latitude:props.currentMessage.location.latitude, longitude:props.currentMessage.location.longitude}]} scrollEnabled = {false} zoomEnabled = {false}>
                <Marker coordinate = {{latitude:props.currentMessage.location.latitude, longitude:props.currentMessage.location.longitude}}/>
              </MapView>
              </TouchableOpacity>
           )

         }  
         
         
      }
      //   return (
      //   <Bubble
      //     {...props}
      //     wrapperStyle={{
      //       left: {
      //         backgroundColor: 'green',
      //       },
      //     }}
      //   />
        
      // )
      }
      function deleteMessage(_id:string){
        const message = db.collection('messages').doc(chatID).collection("messages").where("_id", "==", _id); 
        message.get().then(querySnapshot => {
           querySnapshot.forEach(doc => {
              doc.ref.delete()
           })
        })
         
      }
      function renderSend(props) {
        return (
            <Send
                {...props}
            >
                <View style={{marginRight: 10, marginBottom: 5, justifyContent:"center", alignItems:"center", height:'100%'}}>
                <MaterialCommunityIcons name="send-circle" size={30} color="blue" />
                </View>
            </Send>
        );
    }
    
      const renderAction = () => {
         return <View style = {{justifyContent:"center", alignItems:"center",  height:'100%', marginLeft:10, flexDirection:"row"}}>
         <TouchableOpacity onPress = {() => setRecording(true)}>
           <FontAwesome name="microphone" size={24} color="black" />
           </TouchableOpacity>
           <TouchableOpacity style = {{marginLeft:10}} onPress = {() => setGiphy("true")}>
           <AntDesign name="smileo" size={18} color="black" />
           </TouchableOpacity> 
           <TouchableOpacity onPress = {() => navigation.navigate('Camera', {db, userId, chatID})}>
           <AntDesign name="camera" size={24} color="black" style = {{marginLeft:10}}/>
           </TouchableOpacity>
           <TouchableOpacity
           onPress = {() => selectToolbar(true)}
           >
           <MaterialIcons name="open-with" size={24} color="black" style = {{marginLeft:10}} />
           </TouchableOpacity>
         </View>
      }

      const quickReply = () => {
         return <View style = {{height:100, width:100, backgroundColor:"blue"}}><Text>Hello world</Text></View>
      }

      const renderDay = (props) => {
         return <Day {...props} textStyle = {{color:"black"}} wrapperStyle = {{backgroundColor:"#d7f9fc", padding:5, opacity:0.8}}>
          
         </Day>
         
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
    console.log(chatID)

    const db = firebase.firestore();
    useEffect(() => { 
      console.log("the component was rendered")
      const unsubscribe = db.collection("messages").doc(chatID).collection("messages").orderBy('createdAt', 'desc').onSnapshot(snap => {
        const data = snap.docs.map(doc => doc.data())
        const result = data.map(val => {
           val.createdAt = val.createdAt.toDate(); 
           return val; 
        })
        setMessages(result)
      });
     return () => {return unsubscribe()}
}, [limit]);

useEffect(() => {
const unsubscribe = db.collection("user").doc(davidTyping).onSnapshot(doc => {
   const result = doc.data(); 
   setIsTyping(result.isTyping) 
   
}) 
return () => {return unsubscribe()} 
},[])



 const renderAccessory = () => {
    if(pressed){
      return <View style = {{backgroundColor:"grey"}}>

      <Text style = {{fontSize:50, }}>Report</Text>
      <Text style = {{fontSize:100, }}>Report</Text>
      <Text style = {{fontSize:100, }}>Report</Text>
    </View>  
    }
    
 }
 const onInputTextChanged = (val) => {
    if(val.length == 0){
      var washingtonRef = db.collection("user").doc(zaidTyping);

// Set the "capital" field of the city 'DC'
return washingtonRef.update({
    isTyping: false
})
.then(function() {
    console.log("Document successfully updated!");
})
.catch(function(error) {
    // The document probably doesn't exist.
    console.error("Error updating document: ", error);
});
     return;   
    }
    if(val.length > 0){
      var washingtonRef = db.collection("user").doc("Pk7jX3qNPAG8acQzMmAB");
      return washingtonRef.update({
        isTyping: true
    })
    .then(function() {
        console.log("Document successfully updated!");
    })
    .catch(function(error) {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
    });   
       return; 
    }
 }
 

 const topHeader = () => {
    if(reply){
       return <View style = {{height:35, backgroundColor:"#7f966f", flexDirection:"row", }}>
          <View style = {{flex:0.3, justifyContent:"center", alignItems:"center"}}>
          <TouchableOpacity onPress = {() => {setReply(false), setPressed(null)}}>
          <AntDesign name="back" size={24} color="white" />
          </TouchableOpacity> 
          </View>
          <View style = {{flex:0.7, justifyContent:"space-between", flexDirection:"row", alignItems:"center", marginRight:20}}>
          <TouchableOpacity onPress = {() => setForward(true)}>
          <Entypo name="reply" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity onPress = {() => setReport(true)}>
          <Feather name="flag" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity onPress = {() => deleteMessage()}>
          <AntDesign name="delete" size={24} color="white" />
          </TouchableOpacity>
          
          </View>  
       </View>

    }
 }


 const renderTime = (props) => (
  <Time {...props}/>  
 )
 function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

 const renderAvatar = (props) => {
    return (
      <Image
      style={styles.tinyLogo}
      source={{
        uri: 'https://reactnative.dev/img/tiny_logo.png',
      }}
    />
    )
 } 
const renderChatEmpty = () => {
   return <View style = {{flex:1, justifyContent:"center", alignItems:"center", transform: [ { scaleY: -1 } ]}}>
     <Text style = {{marginBottom:10, fontWeight:'bold'}}>You matched with Julia </Text>
     <Text style = {{marginBottom:10}}>1 year ago </Text>
     <Image source = {{uri:'https://i.ytimg.com/vi/qBB_QOZNEdc/maxresdefault.jpg'}} style = {{height:100, width:100, borderRadius:50}}/>
   </View>
}
 const onImageSend = useCallback(async () => {
  // const response = await fetch(imageUri); 
  // const blob = response.blob()
  // const ref = firebase.storage().ref().child("image"/ "namer"); 
  // const result =  ref.put(blob).then(val => {console.log(val)}).catch(err => console.log(err)); 
  

  
  }, [])

   
       
   
    const onSend =  (messages = []) => {
      if(reply){
        console.log("forward from send"+forward)
        messages[0].reply = pressed;   
     }
        console.log("forward not called")
        messages[0].createdAt = firebase.firestore.Timestamp.fromDate(new Date()),
        messages[0].sent = true; 
         
        
         
        
        
        db.collection('messages').doc(chatID).collection("messages").add(messages[0])
        
        
      }
return(
   <SafeAreaView style = {{flex:1}}>
   
   
   
      
  
 <GiftedChat
 
      messages={messages}
      onSend={messages => onSend(messages)}
      renderTime = {renderTime}
      //renderMessageImage = {renderMessageImage}
      renderMessageVideo = {renderMessageVideo}
      user={{
        _id: userId,
      }}
      onInputTextChanged = {onInputTextChanged}
      
      renderChatFooter = {renderFooter}
      renderMessageAudio = {renderMessageAudio}
      renderBubble = {renderBubble}
      renderMessageText = {renderMessageText}
      listViewProps = {{backgroundImage:"https://storage.googleapis.com/nemesis-157710.appspot.com/wallpaper.jpg"}}
      onLoadEarlier = {() => setLimit(limit + 5)}
      
      
      // renderActions = {() => renderAction()}
      // renderAccessory = {() => <View><Text>Hello world</Text></View>}
      renderDay = {renderDay}
      onLongPress = {onLongPress}
      showAvatarForEveryMessage = {true}
      

      renderAvatar = {renderAvatar}
      isTyping = {isTyping}
      textInputStyle = {{fontWeight:"bold", fontStyle: 'italic',}}
      renderQuickReplies = {quickReply}
      renderActions = {renderAction}
      renderSend = {(props) => renderSend(props)}
      //renderCustomView = {renderCustomView}
      renderChatEmpty = {renderChatEmpty}
      scrollToBottom = {true} 
      extraData = {{pressed}}
      renderInputToolbar = {customInputToolbar}
      shouldUpdateMessage = {(props, nextProps) => {
        return props.extraData.pressed !== nextProps.extraData.pressed
   }}
      
      
      
      infiniteScroll = {true}
   /> 
  
  </SafeAreaView>
    

)
}
const styles = StyleSheet.create({
  view: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'darkblue'
  },
  textInput: {
    width: 300,
    height: 50,
    color: 'white'
  },
  image: {
    
    width:200,
    height: 100,
    borderWidth: 3,
    marginBottom: 5
  },
  logo: {
    width: 66,
    height: 58,
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
});
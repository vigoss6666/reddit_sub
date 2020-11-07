import  React, {useState,useRef,useEffect,useCallback} from 'react';
import { View, StyleSheet, Text, TextInput,TouchableOpacity,ScrollView,Image, Button,FlatList,Picker,PanResponder,Animated, TouchableWithoutFeedback, SafeAreaView, ImageBackground, Clipboard, Dimensions} from 'react-native';
import { useMutation,useQuery, } from '@apollo/react-hooks';
import { GiftedChat, Bubble, InputToolbar,Send,Day, MessageImage, MessageAudioProps, MessageImageProps, Time } from 'react-native-gifted-chat'
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








 

  
  
  
export default function Chat({navigation}){
    const [messages, setMessages] = useState([{_id:"osmething", text:"something", createdAt:new Date(), user:{_id:1}}]);
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
    const [reply, setReply] = useState({image:null, }); 
    const [sender, setSender] = useState(false); 
    const [report, setReport] = useState(false); 
    const [recording, setRecording] = useState(false); 
    const myComponent = useRef();
    const [imageUri, setImageUri] = useState(); 
    const [forward,setForward] = useState(); 
    function urlToFilename(str:string){
      var part = str.substring(
          str.lastIndexOf("%") + 1, 
          str.lastIndexOf("?")
      );
      
  }
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
    
    
    
    const gifDir =  FileSystem.documentDirectory + '/imageehrjew/';
    const gifFileUri = (gifId: string) => gifDir + `${gifId}`;
    
    
    async function ensureDirExists() {
      const dirInfo = await FileSystem.getInfoAsync(gifDir);
      if (!dirInfo.exists) {
        console.log("Gif directory doesn't exist, creating...");
        await FileSystem.makeDirectoryAsync(gifDir, { intermediates: true });
      }
    }
     

    console.log("pressed is"+pressed); 
    console.log("forward is"+forward); 
    
     
    
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
         _id:"something", 
         location:{latitude:location.coords.latitude, longitude:location.coords.longitude},
         createdAt:firebase.firestore.Timestamp.fromDate(new Date()),
         user:{
          _id:5
         }
      }
      db.collection('messages').doc(chatID).collection("messages").add(serverObject);

    }

    const customInputToolbar = props => {
      if(recording){
        return (
        <CustomChatInput setRecording = {setRecording}/>
        ) 
      }
      return (
        <InputToolbar
          {...props}
          
          
          
        >
        
        </InputToolbar>
        
      );
    };

    const pickDocument = () => {
       
       DocumentPicker.getDocumentAsync({
          type:"*/*", 
          multiple:true
       })
    }


    
    let openImagePickerAsync = async () => {
      let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();
  
      if (permissionResult.granted === false) {
        alert("Permission to access camera roll is required!");
        return;
      }
  
      let pickerResult = await ImagePicker.launchImageLibraryAsync();
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
         _id:5
         }   
  }
  db.collection('messages').doc(chatID).collection("messages").add(serverObject); 
      }
      if(pickerResult.type !== 'image'){
        const response = await fetch(pickerResult.uri); 
          const blob = await response.blob(); 
          const ref = firebase.storage().ref().child("images/"+ "shabbir"); 
          await ref.put(blob)
          const result1 = await ref.getDownloadURL(); 
          const serverObject = {
          _id:uuidv4(), 
          createdAt:firebase.firestore.Timestamp.fromDate(new Date()),
          video:result1,
         user:{
         _id:5
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
    const renderFooter = (props) => {
      if(forward){
         return <View style = {{marginLeft:100}}>
           <TouchableOpacity style = {{alignItems:"flex-end"}} onPress = {() => setForward(false)}>
        <Entypo name="circle-with-cross" size={24} color="black" /> 
        </TouchableOpacity>
        <View style = {{backgroundColor:"blue",}}>
        <Text style = {{ color:"white", fontSize:30, marginLeft:30}}>
          {pressed.text}
        </Text>
        </View>
         </View>
      }

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
        return <View style = {{height:300,}}>
         <TouchableOpacity style = {{alignItems:"flex-end"}} onPress = {() => setGiphy(false)}>
         <Entypo name="circle-with-cross" size={24} color="white" />
         </TouchableOpacity> 
         <FlatList
        data={gifs}
        numColumns = {2}
        renderItem={({item}) => (
          <Image
            resizeMode='cover'
            style={styles.image}
            source={{uri: item.images.original.url}}
          />
        )}
      />
        </View> 
      }
     if(reply){
      if(pressed.image){
        return (
           
           <TouchableOpacity>
           <Image source = {{uri:pressed.image}} style = {{height:100, width:100}}/>
           </TouchableOpacity>
           )
     }
     if(0 == 1){
       return (
         <View style = {{  borderWidth:1, padding:5, marginLeft:100 }}>
         {/* <Bubble
         {...props}
         wrapperStyle={{
           backgroundColor:"red",  
           right: {
             // Here is the color change
             backgroundColor:pressed == pressed.currentMessage.text ? '#f5e3da':'blue',
             marginTop:20
             
           }
         }}
         textStyle={{
           right: {
           }
         }}
       
       />   */}
       <Text>{pressed.text}</Text>
       </View>
       
         
       )
    }
    
     
     if(pressed.location){
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
     if(pressed.video){
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

   const _handleReport = (message:string) => {
    var jobskill_query = db.collection('messages').doc(chatID).collection("messages").where('_id','==',pressed._id);
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
   const renderCustomView = () => {
      return <View>
        <Text>Hello world</Text>
      </View>
   }

    const renderBubble =  (props) => {
      //console.log(props.currentMessage.image)
      if(props.currentMessage.image){
      const result =  tester(props.currentMessage.image);
      if(typeof result === 'string'){
        props.currentMessage.image = result; 
      } 
         
      
                 
         return (
               
              <MessageImage {...props} style = {{height:200, width:200}}>
              
              </MessageImage>
          )
      }
      if(props.currentMessage.text){
        if(props.currentMessage.reply){
          return <View style = {{ flex:1, }}>
          <View style = {{ }}>
          <View style = {{alignItems:"flex-end", marginTop:20, borderRadius:100,marginBottom:1,}}>
          <Text style = {{fontSize:24, borderRadius:20, backgroundColor:'orange', color:"grey"}}> {props.currentMessage.reply.text}</Text>
          </View>
          <Bubble
          {...props}
          wrapperStyle={{
            backgroundColor:"red",  
            right: {
              // Here is the color change
              backgroundColor:pressed == props.currentMessage.text ? '#f5e3da':'blue',
              
              
            }
          }}
          textStyle={{
            right: {
            }
          }}
          onLongPress = {(e) => {setPressed(props.currentMessage), setReply(true)}}
        />
          </View>
            
        </View>
        }
        
        
        return (
          <View style = {{ flex:1, }}>
          <Bubble
          {...props}
          wrapperStyle={{
            backgroundColor:"red",  
            right: {
              // Here is the color change
              backgroundColor:pressed == props.currentMessage.text ? '#f5e3da':'blue',
              marginTop:20
              
            }
          }}
          textStyle={{
            right: {
            }
          }}
          onLongPress = {(e) => {setPressed(props.currentMessage), setReply(true)}}
        />  
        </View>
        
          
        )
     }
     
      
      if(props.currentMessage.location){
         return (
          <TouchableOpacity onLongPress = {() => {setPressed(props.currentMessage), setReply(true)}}>
            <MapView  style = {{height:200, width:200}} 
            region = {{latitude:props.currentMessage.location.latitude, longitude:props.currentMessage.location.longitude, latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,}} annotation = {[{latitude:props.currentMessage.location.latitude, longitude:props.currentMessage.location.longitude}]} scrollEnabled = {false} zoomEnabled = {false}>
              <Marker coordinate = {{latitude:props.currentMessage.location.latitude, longitude:props.currentMessage.location.longitude}}/>
            </MapView>
            </TouchableOpacity>
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
      function deleteMessage(){
        const message = db.collection('messages').doc(chatID).collection("messages").where("_id", "==", pressed._id); 
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
           <TouchableOpacity>
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
         <Day {...props}>

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
    console.log(typeof chatID)

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

 const renderAccessory = () => {
    if(pressed){
      return <View style = {{backgroundColor:"grey"}}>

      <Text style = {{fontSize:50, }}>Report</Text>
      <Text style = {{fontSize:100, }}>Report</Text>
      <Text style = {{fontSize:100, }}>Report</Text>
    </View>  
    }
    
 }

 const topHeader = () => {
    if(reply){
       return <View style = {{height:35, backgroundColor:"#7f966f", flexDirection:"row"}}>
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
        
 const onImageSend = useCallback(async () => {
  // const response = await fetch(imageUri); 
  // const blob = response.blob()
  // const ref = firebase.storage().ref().child("image"/ "namer"); 
  // const result =  ref.put(blob).then(val => {console.log(val)}).catch(err => console.log(err)); 
  

  
  }, [])

   const renderImage = (props) => {
    async function namer(){
    //  await ensureDirExists();
    // const fileUri = await gifFileUri(props.currentMessage.image);
    // const fileInfo = await FileSystem.getInfoAsync(fileUri);
    // if (!fileInfo.exists) {
    //   console.log("Gif isn't cached locally. Downloading...");
    //   await FileSystem.downloadAsync(props.currentMessage.image, fileUri);
    // }
    return <Image source = {{uri:props.currentMessage.image}} style = {{height:100, width:100}}/>
    }
      if(props.currentMessage.image){
        console.log(props.currentMessage.image)
        
       namer()  
        
      }

      return <View>
         <Text>Hello world</Text> 
      </View>
   }
       
    const onSend =  (messages = []) => {
      if(forward){
        console.log("forward from send"+forward)
        messages[0].reply = pressed;   
     }
        console.log("forward not called")
        messages[0].createdAt = firebase.firestore.Timestamp.fromDate(new Date()),
         
        
        
        db.collection('messages').doc(chatID).collection("messages").add(messages[0])
        
        
      }
return(
   <SafeAreaView style = {{flex:1}}>
   {topHeader()}
   
   <ImageBackground source={{uri:"https://storage.googleapis.com/nemesis-157710.appspot.com/wallpaper.jpg"}} style={{width: '100%', height: '100%'}}>
      
  
 <GiftedChat
 
      messages={messages}
      onSend={messages => onSend(messages)}
      renderTime = {renderTime}
      renderMessageImage = {() => 'https://placeimg.com/140/140/any'}
      user={{
        _id: 5,
      }}
      
      
      renderBubble = {renderBubble}
      listViewProps = {{backgroundImage:"https://storage.googleapis.com/nemesis-157710.appspot.com/wallpaper.jpg"}}
      onLoadEarlier = {() => setLimit(limit + 5)}
      loadEarlier = {true}
      // renderActions = {() => renderAction()}
      // renderAccessory = {() => <View><Text>Hello world</Text></View>}
      
      textInputStyle = {{fontWeight:"bold", fontStyle: 'italic',}}
      renderQuickReplies = {quickReply}
      renderActions = {renderAction}
      renderSend = {(props) => renderSend(props)}
      renderCustomView = {renderCustomView}
      
      extraData = {{pressed}}
      renderInputToolbar = {customInputToolbar}
      shouldUpdateMessage = {(props, nextProps) => {
        return props.extraData.pressed !== nextProps.extraData.pressed
   }}
      
      
      
      infiniteScroll = {true}
      
      
      
      
  /> 
  </ImageBackground>
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
});
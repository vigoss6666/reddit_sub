import  React, {useState,useRef,useEffect,FunctionComponent, } from 'react';
import { View, StyleSheet, Text, TextInput,TouchableOpacity,ScrollView,Image, FlatList,Picker,PanResponder,Animated, TouchableWithoutFeedback, SafeAreaView, AsyncStorage} from 'react-native';
import {Button, Icon} from 'react-native-elements'; 
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import LottieView from 'lottie-react-native';
import { Audio, Video } from 'expo-av';
import * as Permissions from 'expo-permissions';
import {usePermissions} from '@use-expo/permissions';
import { firebase } from '../../config'; 
import * as FileSystem from 'expo-file-system';
import Slider from '@react-native-community/slider';
import { Feather } from '@expo/vector-icons';
import * as VideoThumbnails from 'expo-video-thumbnails';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';

function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}
const db = firebase.firestore();





export interface HeaderProps {
text:string,    
style?:any 
}

export const Header:FunctionComponent<HeaderProps>= (props) => {
//     let [fontsLoaded] = useFonts({
//         Roboto_400Regular,
//       });
    
//       if (!fontsLoaded) {
//         return <Text>App is loading</Text>;
//       }
return(
<View style = {[props.style]}>
<Text style = {{fontSize:35, fontWeight:'500', }}>{props.text}</Text>
</View>
)
}

interface ContinueProps {
disabled?:boolean
backgroundColor?:string  
onPress?:any   
text?:any
style?:any
}

export const Continue:FunctionComponent<ContinueProps>  = (props) => {
     const texter = props.text ? props.text : "Continue"
     return (
          <TouchableOpacity
          onPress = {() => props.onPress()}
          style = {[{height:50, width:200, borderRadius:25,borderWidth:1, justifyContent:"center", alignItems:"center",backgroundColor:props.backgroundColor }, props.style]} disabled = {props.disabled} >
           <Text>{texter} </Text>     
          </TouchableOpacity>
     )
}
export const HeaderBar = (props) => {
     const [selected, setSelected] = useState(); 
     return (
          <SafeAreaView style = {{flexDirection:"row",marginLeft:10, marginRight:10,marginTop:10, marginBottom:10}}>
          <TouchableOpacity style = {{flex:0.5,  }} onPress = {() => props.navigation.navigate('GameHomepage')}>
          <Entypo name="controller-play" size={40} color  = {props.page == "GameHomepage" ? 'yellow':'grey'} />    
          </TouchableOpacity>
          <TouchableOpacity style = {{flex:0.5}} onPress = {() => props.navigation.navigate('Trophy')}>
          <FontAwesome name="trophy" size={40} color={props.page == "trophy" ? 'yellow':'grey'} />
          </TouchableOpacity>
          <TouchableOpacity style = {{flex:0.5}} onPress = {() => props.navigation.navigate('ProfilePool')}>
          <Ionicons name="ios-people" size={props.page == "Friends" ? 55:40} color={props.page == "Friends" ? 'yellow':'grey'} />   
          </TouchableOpacity>
          <TouchableOpacity style = {{flex:0.5}}>
          <Entypo name="chat" size={40} color="grey" />  
          </TouchableOpacity>
          <TouchableOpacity style = {{flex:0.5,}} onPress = {() => props.navigation.navigate('SettingsHome')}>
          <MaterialIcons name="account-circle" size={props.page == "SettingsHome" ? 55:40} color={props.page == "SettingsHome" ? 'yellow':'grey'} />          
          </TouchableOpacity>
          </SafeAreaView> 
     ) 
    
}
export function AudioSetter({setRecording}) { 
     

     const [audioDuration, setAudioDuration] = useState(); 
     const [permission, askForPermission] = usePermissions(Permissions.AUDIO_RECORDING, { ask: true });
     const recordingInstance = useRef(new Audio.Recording());
     const [uri, setUri] = useState(); 
     
     useEffect(() => {
          if (!permission || permission.status !== 'granted') {

           askForPermission()
           
           
          }
          async function namer(){
          await recordingInstance.current.setOnRecordingStatusUpdate(onRecordingStatusUpdate)    
          await recordingInstance.current.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
          await recordingInstance.current.startAsync()
          }

          namer()
     }, [])
     const stopRecording = () => {
           recordingInstance.current.pauseAsync(); 
     }     

     
     const sendToServer = async () => {
           recordingInstance.current.stopAndUnloadAsync(); 
           const uri = await recordingInstance.current.getURI()
           const response = await fetch(uri); 
           const blob = await response.blob(); 
           const ref = await firebase.storage().ref().child("audio/"+"namer1"); 
           await ref.put(blob).then((url) => console.log("fileSuccessfully uploaded to the server"+url)).catch(error => console.log(error)) 
           const result = await ref.getDownloadURL(); 
           const serverObject = {
              _id:uuidv4(), 
              createdAt:firebase.firestore.Timestamp.fromDate(new Date()), 
              user:{
                _id:5
              }, 
              audio:result
           }
           db.collection('messages').doc("UJ4u7q4oHqlj3n6nrBv9Pk7jX3qNPAG8acQzMmAB").collection("messages").add(serverObject)
           
          }     

     const onRecordingStatusUpdate = (val) => {
          const millisToMinutesAndSeconds = (millis) => {
               var minutes = Math.floor(millis / 60000);
               var seconds = ((millis % 60000) / 1000).toFixed(0);
                //ES6 interpolated literals/template literals 
                  //If seconds is less than 10 put a zero in front.
               return `${minutes}:${(seconds < 10 ? "0" : "")}${seconds}`;
           }
           setAudioDuration(millisToMinutesAndSeconds(val.durationMillis))
     }

     
      
     
     
     

 return (
<View style = {{height:50,borderRadius:25, borderWidth:1, padding:5, marginLeft:20, marginRight:20, backgroundColor:"white"}}>
<View style = {{flexDirection:"row", justifyContent:"space-between", borderRadius:25}}>
<View style = {{flexDirection:"row", alignItems:"center",marginLeft:40,}}>
{/* <LottieView
          ref = {myComponent}
          style={{
            width: 40,
            height: 40,
            backgroundColor: '#eee',
          }}
          source={require('/Users/zaidshaikh/fhfclient/assets/35097-microphone.json')}
          // OR find more Lottie files @ https://lottiefiles.com/featured
          // Just click the one you like, place that file in the 'assets' folder to the left, and replace the above 'require' statement
        /> */}
  <View style = {{flexDirection:"row", marginLeft:20, alignItems:"center", justifyContent:"center"}}>
    <Text>{audioDuration}</Text>      
    
  </View>      
</View> 
<TouchableOpacity style = {{justifyContent:"center", marginLeft:40}} onPress = {() => { stopRecording(), setRecording(false)}}>
<Text style = {{color:"red", fontWeight:"bold"}}>Cancel</Text>
</TouchableOpacity>
<TouchableOpacity style = {{justifyContent:"center", alignItems:"center", marginRight:30}} onPress = {() => {sendToServer(),stopRecording(), setRecording(false) }}>
<Ionicons name="ios-send" size={30} color="blue" />
</TouchableOpacity>

</View>    

</View>      
 )                  
} 
export function Tester1({navigation,db,chatID,userId}){
     const gifDir = FileSystem.cacheDirectory + 'giphy/';
     const url = "https://firebasestorage.googleapis.com/v0/b/friends-365d0.appspot.com/o/images%2FAdd%20a%20little%20bit%20of%20body%20text%20(1)_pages-to-jpg-0001.jpg?alt=media&token=847ba2d4-72df-4656-9d88-16435c98bc53";      
     const gifFileUri = (gifId: string) => gifDir + gifId+".gif";
      
     
         const [gifs, setGifs] = useState(); 
         function urlToFilename(str:string){
             var part = str.substring(
                 str.lastIndexOf("media") + 6, 
                 str.lastIndexOf("/")
             );
     
             return part; 
              
     }
     function uuidv4() {
         return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
           var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
           return v.toString(16);
         });
       }
     const _sendToServer = (uri:string) => {
      const serverObject = {
          _id:uuidv4(), 
          createdAt:firebase.firestore.Timestamp.fromDate(new Date()), 
          user:{
             _id:userId
          },
          giphy:uri
      }
      db.collection('messages').doc(chatID).collection("messages").add(serverObject)    
     }
     async function ensureDirExists() {
         const dirInfo = await FileSystem.getInfoAsync(gifDir);
         if (!dirInfo.exists) {
           console.log("Gif directory doesn't exist, creating...");
           await FileSystem.makeDirectoryAsync(gifDir, { intermediates: true });
         }
       }
        async function addMultipleGifs(gifUrls: string[]) {
         try {
           await ensureDirExists();
       
           console.log('Downloading', gifUrls.length, 'gif files...');
           Promise.all(gifUrls.map(url => FileSystem.downloadAsync(url, gifFileUri(urlToFilename(url))))).then(async (result) => AsyncStorage.setItem('gif', 'set')); 
            
         } catch (e) {
           console.error("Couldn't download gif files:", e);
         }
       }
         async function fetchGifs() {
             
             try {
               const API_KEY = 'ZXj9CoxD99LW4ULTMZ423W0TmQ3EG44e';
               const BASE_URL = 'http://api.giphy.com/v1/gifs/search';
               const resJson = await fetch(`https://api.giphy.com/v1/gifs/trending?api_key=ZXj9CoxD99LW4ULTMZ423W0TmQ3EG44e&limit=5&rating=g`);
               const res = await resJson.json();
               const urls = res.data.map(val => ({url:val.images.original.url}));
               console.log(urls)
               setGifs(urls);  
                
               
               
              
               
             } catch (error) {
               console.warn(error);
             }
           }
     
     
     useEffect(() => {
         // AsyncStorage.setItem('gif', ""); 
         // FileSystem.deleteAsync(gifDir)
         async function namer(){
             await fetchGifs(); 
         }
         namer()
          
         
         
     }, [])
     
     return(
         
         <FlatList
         
         data={gifs}
         numColumns = {2}
         keyExtractor={item => item.url}
         renderItem={({item}) => (
           <TouchableOpacity onPress = {() => _sendToServer(item.url)}>
           <Image
             resizeMode='cover'
             style={styles.image}
             source={{uri: item.url}}
           />
           </TouchableOpacity>  
         )}
       />
     )
     }
    export function AudioGetter({audio}){
          console.log(audio)
          const [isPlaying, setIsPlaying] = useState(false);      
          const recordingInstance = useRef(new Audio.Sound());
          const [loading, setLoading] = useState(0); 
          const [totalDuration, setTotalDuration] = useState(0); 
          const [currentPosition, setCurrentPosition] = useState(0); 
          useEffect(() => {
               async function namer(){
                await recordingInstance.current.loadAsync({uri:"https://firebasestorage.googleapis.com/v0/b/friends-365d0.appspot.com/o/audio%2Fnamer1?alt=media&token=0551ba16-db5c-4374-8e25-817dfd2025cd"})
                await recordingInstance.current.setOnPlaybackStatusUpdate(runner); 
                setLoading(1); 
               }
               namer()
               
               
               
               //return () => recordingInstance.current.unloadAsync()
          }, [])
          const runner = (status) => {
             setTotalDuration(status.durationMillis);
             setCurrentPosition(status.positionMillis);  
          }
          const playSound = () => {
             recordingInstance.current.playAsync()
          }
          const pauseSound = () => {
             recordingInstance.current.pauseAsync()
          }
          return ( 
               <View style = {{flexDirection:"row", borderWidth:1, }}>
               <View style = {{justifyContent:"center", padding:5}}>
                 {isPlaying ? 
                 <TouchableOpacity onPress = {() => {pauseSound(), setIsPlaying(!isPlaying)}}><AntDesign name="pausecircle" size={24} color="black" /></TouchableOpacity>:<TouchableOpacity onPress = {() => {playSound(), setIsPlaying(!isPlaying)}}><AntDesign name="caretright" size={24} color="black" /></TouchableOpacity>}   
               </View>
               <Slider
    style={{width: 200, height: 40}}
    minimumValue={0}
    maximumValue={totalDuration}
    minimumTrackTintColor="#FFFFFF"
    maximumTrackTintColor="#000000"
    value = {currentPosition}
    onValueChange = {(val) => {setCurrentPosition(val),recordingInstance.current.setPositionAsync(val)}}
  />
                                                                 
               </View> 
              
          )
    }
    
    export function VideoMessage({navigation,video, time}){

       const videoObject = useRef(); 
       const  [duration, setDuration] = useState(0); 
       const millisToMinutesAndSeconds = (millis) => {
        var minutes = Math.floor(millis / 60000);
        var seconds = ((millis % 60000) / 1000).toFixed(0);
         //ES6 interpolated literals/template literals 
           //If seconds is less than 10 put a zero in front.
        return `${minutes}:${(seconds < 10 ? "0" : "")}${seconds}`;
    }
       console.log(); 
       useEffect(() => {
        videoObject.current.setOnPlaybackStatusUpdate(mainer)
       })

       const mainer = (val) => {
         setDuration(millisToMinutesAndSeconds(val.durationMillis))
       }
       async function namer(url:string){
        const { uri } = await VideoThumbnails.getThumbnailAsync(
          'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
          {
            time: 15000,
          }
        );
        return uri;   
       }
        
      
       return (
          <View>
            <TouchableOpacity 
            onPress = {() => navigation.navigate('VideoPlayer', {uri:video})}
            style = {{marginTop:5, marginBottom:5}}
            
            >
             <View style = {{position:'absolute', top:80, left:85, zIndex:100}}>
            <AntDesign name="caretright" size={40} color="white" />
            </View> 
            <View style = {{position:'absolute', bottom:5, left:10, zIndex:100, flexDirection:"row", alignItems:"center"}}>
            <View style = {{justifyContent:"center", alignItems:"center", marginRight:10}}>
            <Feather name="video" size={24} color="white" />
            </View>

            <Text style = {{color:"white"}}>{duration}</Text>
            </View>
            <View style = {{position:'absolute', bottom:10, right:10, zIndex:100, justifyContent:'center', alignItems:'center'}}>
              <Text style = {{color:'white'}}>{time}</Text>
            </View>
            <Video
          source={{ uri: video }}
          rate={1.0}
          volume={1.0}
          isMuted={false}
          resizeMode="cover"
          shouldPlay = {false}
          isLooping = {false}
          style={{ width: 200, height: 200, borderRadius:10 }}
          ref = {videoObject}

          />
        </TouchableOpacity>
         
          </View>
       )
    }    

    export function DocumentGetter({navigation,uri, name, size, time}){
      function formatBytes(bytes, decimals = 2) {
        if (bytes === 0) return '0 Bytes';
    
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    
        const i = Math.floor(Math.log(bytes) / Math.log(k));
    
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }
      return (
         <TouchableOpacity 
         style = {{height:75,maxWidth:200, backgroundColor:'#c3f7d1', elevation:10, shadowColor: '#000',
         shadowOffset: { width: 0, height: 2 },
         shadowOpacity: 0.5,
         shadowRadius: 2,
         marginTop:5, 
         marginBottom:5
          }}
         onPress = {() => navigation.navigate('DocumentViewer', {uri})}
         >
           <View style = {{flexDirection:"row", justifyContent:"center", alignItems:"center", marginLeft:10, marginRight:10}}>
           <View style = {{marginTop:10}}>
           <MaterialCommunityIcons name="pdf-box" size={24} color="red" />
           </View>
           <Text numberOfLines = {1}>{name}</Text>
           
           </View>
           <View style = {{flexDirection:"row", marginRight:10, marginLeft:10, marginTop:10, justifyContent:"space-between" }}>
            <Text style = {{marginRight:10}}>{formatBytes(size)} </Text>
            <Text>{time}</Text>
           </View>
         </TouchableOpacity>
      )       
    }
    
    export function ServerHeart({messageObject,db,chatID}){
       const [heartPressed, setHeartPressed] = useState(messageObject.like); 
       
       
       const sendToServer = (likeStatus:boolean) => {
        var jobskill_query = db.collection('messages').doc(chatID).collection("messages").where('_id','==',messageObject._id);
        jobskill_query.get().then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
            console.log(doc.data())
            doc.ref.update({like:likeStatus});
          });
        });
          
       }
       const _handleLike = () => {
         setHeartPressed(true);  
         sendToServer(true); 

       }
       const _handleDislike = () => {
        setHeartPressed(false)  
        sendToServer(false); 
       }
       const component = heartPressed ? <TouchableOpacity onPress = {() => _handleDislike()}><AntDesign name="heart" size={24} color="red" /></TouchableOpacity>:<TouchableOpacity onPress = {() => _handleLike()}><AntDesign name="hearto" size={24} color="black" /></TouchableOpacity>
       return (
        <View>{component}</View>
       )
    }

    export function Line({leftMargin,rightMargin}){
       const leftMarginT = leftMargin ? leftMargin : 30; 
       const rightMarginT = rightMargin ? rightMargin : 30; 
       return (
          <View style = {{marginLeft:leftMarginT, marginRight:rightMarginT, borderColor:'black', borderWidth:2}}/>
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
       

export function iconFactory(dimension:string, iconSize:number){
   if(dimension == 'creativity'){
    return <Foundation name="lightbulb" size={iconSize} color="black" />
   }
   if(dimension == 'charisma'){
    return <Ionicons name="magnet-outline" size={iconSize} color="black" />
   }
  
   if(dimension == 'honest'){
    return <Ionicons name="magnet-outline" size={iconSize} color="black" />
   }
   if(dimension == 'looks'){
    return <FontAwesome name="eye" size={iconSize} color="black" />
   }
   if(dimension == 'empathetic'){
    return <FontAwesome5 name="hand-holding-heart" size={iconSize} color="black" />
   }
   if(dimension == 'humor'){
    return <FontAwesome5 name="laugh-beam" size={iconSize} color="black" />
   }
   if(dimension == 'status'){
    return <Ionicons name="ios-airplane-sharp" size={iconSize} color="black" />
   }
   if(dimension == 'wealthy'){
    return <Foundation name="dollar" size={iconSize} color="black" />
   }
   if(dimension == 'narcissism'){
    return <Foundation name="dollar" size={iconSize} color="black" />
   }
}
        




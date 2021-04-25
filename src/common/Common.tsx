import  React, {useState,useRef,useEffect,FunctionComponent, useContext } from 'react';
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
import { formatDistanceToNow } from "date-fns";
import * as VideoThumbnails from 'expo-video-thumbnails';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';
import * as Print from 'expo-print';
import {Input} from 'react-native-elements'; 
import {transformCreativity} from '../../networking';
import AppContext from '../../AppContext'; 
// @refresh reset
export function getBaseLog(x, y) {
  const result = Math.log(y) / Math.log(x);
  if (result == -Infinity) {
    return 0;
  }
  return result;
}

function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}
const db = firebase.firestore();


export function logTen(arr: serverData[] | serverData): serverDataWithDimension[] | serverDataWithDimension {
  if (Array.isArray(arr)) {
    const result = arr.map(val => ({
      ...val,
      charisma: parseFloat(getBaseLog(5, val.charisma).toFixed(1)),
      dimension: parseFloat(getBaseLog(5, val.charisma + val.creativity + val.empathetic + val.honest + val.humor + val.looks + val.status + val.wealthy).toFixed(1)),
      creativity: parseFloat(getBaseLog(5, val.creativity).toFixed(1)),
      honest: parseFloat(getBaseLog(5, val.honest).toFixed(1)),
      looks: parseFloat(getBaseLog(5, val.looks).toFixed(1)),
      empathetic: parseFloat(getBaseLog(5, val.empathetic).toFixed(1)),
      status: parseFloat(getBaseLog(5, val.status).toFixed(1)),
      wealthy: parseFloat(getBaseLog(5, val.wealthy).toFixed(1)),
      humor: parseFloat(getBaseLog(5, val.humor).toFixed(1)),
      narcissistic: parseFloat(getBaseLog(5, val.narcissistic).toFixed(1)),
    }

    ));
    return result;
  }
  return {
    ...arr,
    dimension: parseFloat(getBaseLog(5, arr.charisma + arr.creativity + arr.empathetic + arr.honest + arr.humor + arr.looks + arr.status + arr.wealthy).toFixed(1)),
    charisma: parseFloat(getBaseLog(5, arr.charisma).toFixed(1)),
    creativity: parseFloat(getBaseLog(5, arr.creativity).toFixed(1)),
    honest: parseFloat(getBaseLog(5, arr.honest).toFixed(1)),
    looks: parseFloat(getBaseLog(5, arr.looks).toFixed(1)),
    empathetic: parseFloat(getBaseLog(5, arr.empathetic).toFixed(1)),
    status: parseFloat(getBaseLog(5, arr.status).toFixed(1)),
    wealthy: parseFloat(getBaseLog(5, arr.wealthy).toFixed(1)),
    humor: parseFloat(getBaseLog(5, arr.humor).toFixed(1)),
    narcissistic: parseFloat(getBaseLog(5, arr.narcissistic).toFixed(1)),
  };

}


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
// export function AudioSetter({setRecording}) { 
  
     

//      const [audioDuration, setAudioDuration] = useState(); 
//      const [permission, askForPermission] = usePermissions(Permissions.AUDIO_RECORDING, { ask: true });
//      const recordingInstance = useRef(new Audio.Recording());
//      const [uri, setUri] = useState(); 
     
//      useEffect(() => {
//           if (!permission || permission.status !== 'granted') {

//            askForPermission()
           
           
//           }
//           async function namer(){
//           await recordingInstance.current.setOnRecordingStatusUpdate(onRecordingStatusUpdate)    
//           await recordingInstance.current.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
//           await recordingInstance.current.startAsync()
//           }

//           namer()
//      }, [])
//      const stopRecording = () => {
//            recordingInstance.current.pauseAsync(); 
//      }     

     
//      const sendToServer = async () => {
//            recordingInstance.current.stopAndUnloadAsync(); 
//            const uri = await recordingInstance.current.getURI()
//            const response = await fetch(uri); 
//            const blob = await response.blob(); 
//            const ref = await firebase.storage().ref().child("audio/"+"namer1"); 
//            await ref.put(blob).then((url) => console.log("fileSuccessfully uploaded to the server"+url)).catch(error => console.log(error)) 
//            const result = await ref.getDownloadURL(); 
//            const serverObject = {
//               _id:uuidv4(), 
//               createdAt:firebase.firestore.Timestamp.fromDate(new Date()), 
//               user:{
//                 _id:5
//               }, 
//               audio:result
//            }
//            db.collection('messages').doc("UJ4u7q4oHqlj3n6nrBv9Pk7jX3qNPAG8acQzMmAB").collection("messages").add(serverObject)
           
//           }     

//      const onRecordingStatusUpdate = (val) => {
//           const millisToMinutesAndSeconds = (millis) => {
//                var minutes = Math.floor(millis / 60000);
//                var seconds = ((millis % 60000) / 1000).toFixed(0);
//                 //ES6 interpolated literals/template literals 
//                   //If seconds is less than 10 put a zero in front.
//                return `${minutes}:${(seconds < 10 ? "0" : "")}${seconds}`;
//            }
//            setAudioDuration(millisToMinutesAndSeconds(val.durationMillis))
//      }

     
      
     
     
     

//  return (
// <View style = {{height:50,borderRadius:25, borderWidth:1, padding:5, marginLeft:20, marginRight:20, backgroundColor:"white"}}>
// <View style = {{flexDirection:"row", justifyContent:"space-between", borderRadius:25}}>
// <View style = {{flexDirection:"row", alignItems:"center",marginLeft:40,}}>
// {/* <LottieView
//           ref = {myComponent}
//           style={{
//             width: 40,
//             height: 40,
//             backgroundColor: '#eee',
//           }}
//           source={require('/Users/zaidshaikh/fhfclient/assets/35097-microphone.json')}
//           // OR find more Lottie files @ https://lottiefiles.com/featured
//           // Just click the one you like, place that file in the 'assets' folder to the left, and replace the above 'require' statement
//         /> */}
//   <View style = {{flexDirection:"row", marginLeft:20, alignItems:"center", justifyContent:"center"}}>
//     <Text>{audioDuration}</Text>      
    
//   </View>      
// </View> 
// <TouchableOpacity style = {{justifyContent:"center", marginLeft:40}} onPress = {() => { stopRecording(), setRecording(false)}}>
// <Text style = {{color:"red", fontWeight:"bold"}}>Cancel</Text>
// </TouchableOpacity>
// <TouchableOpacity style = {{justifyContent:"center", alignItems:"center", marginRight:30}} onPress = {() => {sendToServer(),stopRecording(), setRecording(false) }}>
// <Ionicons name="ios-send" size={30} color="blue" />
// </TouchableOpacity>

// </View>    

// </View>      
//  )                  
// } 
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
  //   export function AudioGetter({audio}){
  //         console.log(audio)
  //         const [isPlaying, setIsPlaying] = useState(false);      
  //         const recordingInstance = useRef(new Audio.Sound());
  //         const [loading, setLoading] = useState(0); 
  //         const [totalDuration, setTotalDuration] = useState(0); 
  //         const [currentPosition, setCurrentPosition] = useState(0); 
  //         useEffect(() => {
  //              async function namer(){
  //               await recordingInstance.current.loadAsync({uri:"https://firebasestorage.googleapis.com/v0/b/friends-365d0.appspot.com/o/audio%2Fnamer1?alt=media&token=0551ba16-db5c-4374-8e25-817dfd2025cd"})
  //               await recordingInstance.current.setOnPlaybackStatusUpdate(runner); 
  //               setLoading(1); 
  //              }
  //              namer()
               
               
               
  //              //return () => recordingInstance.current.unloadAsync()
  //         }, [])
  //         const runner = (status) => {
  //            setTotalDuration(status.durationMillis);
  //            setCurrentPosition(status.positionMillis);  
  //         }
  //         const playSound = () => {
  //            recordingInstance.current.playAsync()
  //         }
  //         const pauseSound = () => {
  //            recordingInstance.current.pauseAsync()
  //         }
  //         return ( 
  //              <View style = {{flexDirection:"row", borderWidth:1, }}>
  //              <View style = {{justifyContent:"center", padding:5}}>
  //                {isPlaying ? 
  //                <TouchableOpacity onPress = {() => {pauseSound(), setIsPlaying(!isPlaying)}}><AntDesign name="pausecircle" size={24} color="black" /></TouchableOpacity>:<TouchableOpacity onPress = {() => {playSound(), setIsPlaying(!isPlaying)}}><AntDesign name="caretright" size={24} color="black" /></TouchableOpacity>}   
  //              </View>
  //              <Slider
  //   style={{width: 200, height: 40}}
  //   minimumValue={0}
  //   maximumValue={totalDuration}
  //   minimumTrackTintColor="#FFFFFF"
  //   maximumTrackTintColor="#000000"
  //   value = {currentPosition}
  //   onValueChange = {(val) => {setCurrentPosition(val),recordingInstance.current.setPositionAsync(val)}}
  // />
                                                                 
  //              </View> 
              
  //         )

  //   }
    
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

    export function Line(){
       
       return (
          <View style = {{ borderColor:'black', borderWidth:1}}/>
       ) 
    }

 
     const styles = StyleSheet.create({
      textStyle:{fontWeight:'500', fontSize:30}, 
      line:{borderBottomWidth:3,}, 
      iconNames:{marginLeft:10, fontSize:17, fontWeight:'500'}, 
      dotted:{borderStyle:'dotted', borderWidth:2, borderRadius:10, marginTop:10 },
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
    return <Foundation name="lightbulb" size={iconSize} color="blue" />
   }
   if(dimension == 'charisma'){
    return <MaterialCommunityIcons name="magnet" size={iconSize} color="orange" />
   }
  
   if(dimension == 'honest'){
    return <FontAwesome name="balance-scale" size={iconSize} color="blue" />
   }
   if(dimension == 'looks'){
    return <FontAwesome name="eye" size={iconSize} color="yellow" />
   }
   if(dimension == 'empathetic'){
    return <FontAwesome5 name="hand-holding-heart" size={iconSize} color="green" />
   }
   if(dimension == 'humor'){
    return <FontAwesome5 name="laugh-beam" size={iconSize} color="blue" />
   }
   if(dimension == 'status'){
    return <FontAwesome name="money" size={iconSize} color="black" />
   }
   if(dimension == 'wealthy'){
    return <Foundation name="dollar" size={iconSize} color="orange" />
   }
   if(dimension == 'narcissism'){
    return <Entypo name="warning" size={iconSize} color="red" />
   }
}

export function useTraits(){
   
}


export function TraitsTemplate(client) {
 const [traits, setTraits] = useState([]); 

const setArrow = (obj) => {
  
const result = traits.map(val => {
      if(val.trait == obj.trait){
          val.selected = true; 
           
    }
    return val; 
   
})

setTraits(traits => result)
}
const setArrowFalse = (obj) => {
 const result = traits.map(val => {
      if(val.trait == obj.trait){
          val.selected = false; 
           
    }
    return val; 
   
})
setTraits(traits => result)
}



   useEffect(() => {
      db.collection('user')
      .where('gender', '==',  client.gender)
      .where('state', '==', client.state)
      .get()
      .then(onResult => {
         const users = onResult.docs.map(val => val.data()); 

         const transformed = transformCreativity(client, users); 
         
         setTraits(transformed); 
      })
   },[])
   const traitsTemplate = traits.map((val, index) => {
      
    return (
       <View style = {{ borderBottomWidth:3, justifyContent:'center', alignItems:'center', }}>
       
       <View style = {{flexDirection:'row', alignItems:'center', marginTop:30, }}>
       <View style = {{flex:0.3}}>
       {iconFactory(val.trait, 40)}
       </View>    
      <Text style = {{flex:0.4, fontWeight:'bold', fontSize:20}}>{val.trait.toUpperCase()}</Text>
       <View style = {{justifyContent:'flex-end',  flex:0.3, alignItems:'center'}}>
       <Text style = {{fontSize:20, fontWeight:'bold' }}> {val.votes}</Text>
       <Text style = {{fontSize:20, marginBottom:10}}> votes</Text>
       
       </View>
       
       
       </View>
     
     {val.selected ? <TouchableOpacity onPress = {() => setArrowFalse(val)}><MaterialIcons name="keyboard-arrow-up" size={24} color="grey" /></TouchableOpacity>:<TouchableOpacity onPress = {() => setArrow(val)}><MaterialIcons name="keyboard-arrow-down" size={24} color="black" /></TouchableOpacity>}
     {val.selected ? <View style = {{ width:'100%'}}>
         <View style = {{borderRadius:2, borderWidth:2, borderStyle:'dotted', }}/>
         <View style = {{flexDirection:'row'}}> 
         
          {client.gender == 'female' ? <View style = {{flexDirection:'row', marginTop:20, marginBottom:20 , flex:0.7, }}>
          <FontAwesome5 name="female" size={35} color="red" />
         <FontAwesome5 name="female" size={35} color="red" />
         <FontAwesome5 name="female" size={35} color="red" />
         <FontAwesome5 name="female" size={35} color="red" />
         <FontAwesome5 name="female" size={35} color="red" />
         <FontAwesome5 name="female" size={45} color="red" />
         <FontAwesome5 name="female" size={35} color="red" />
         <FontAwesome5 name="female" size={35} color="red" />
         <FontAwesome5 name="female" size={35} color="red" />
         <FontAwesome5 name="female" size={35} color="red" /></View>: <View style = {{flexDirection:'row', marginTop:20, marginBottom:20 , flex:0.7, }}>
          <FontAwesome5 name="male" size={35} color="red" />
         <FontAwesome5 name="male" size={35} color="red" />
         <FontAwesome5 name="male" size={35} color="red" />
         <FontAwesome5 name="male" size={35} color="red" />
         <FontAwesome5 name="male" size={35} color="red" />
         <FontAwesome5 name="male" size={45} color="red" />
         <FontAwesome5 name="male" size={35} color="red" />
         <FontAwesome5 name="male" size={35} color="red" />
         <FontAwesome5 name="male" size={35} color="red" />
         <FontAwesome5 name="male" size={35} color="red" /></View>} 
         
         
         <View style = {{flex:0.3, marginTop:20, marginBottom:15}}>
            <Text style = {{alignSelf:'center', fontWeight:'bold'}}>AHEAD OF </Text> 
            <Text style = {{alignSelf:'center', color:'red', fontWeight:'bold', fontSize:20}}>{val.aheadOf}%</Text>
            <Text style = {{alignSelf:'center', fontWeight:'bold'}}>of males</Text>
         </View>    
         </View>    


             
         
     </View>:null}  
     
           
   </View> 
    )
})
   return (
      <View>
      {traitsTemplate}
      </View>
   )
}
const computeName = (obj) => {
  if(obj.name){
     return obj.name
  }
  if(obj.firstName && obj.lastName){
     return obj.firstName+obj.lastName
  }
  return obj.firstName
}        
export function ClientHeader({client, style}) {
  const {creativity, charisma, humor, honest, looks, empathetic, status, wealthy} = client; 
   const newObject = {status}; 
   Object.keys(newObject).forEach(key => {
    if (!newObject[key]) delete newObject[key];
  });
  
  let keysSorted = Object.keys(newObject).sort(function(a,b){return newObject[b]-newObject[a]}); 
  const adjectives = keysSorted.map(val => {
     if(val == 'charisma'){
        return 'Charismatic'
     }
     if(val == 'humor'){
       return 'funny'
     }
     if(val == 'creativity'){
        return 'creative'
     }
     if(val == 'status'){
       return 'brand concious'
     }
     return val; 
  })
   if(keysSorted.length >= 3){
    return (
      <View style = {style}>
      <View style = {{ justifyContent:'center', alignItems:'center', marginTop:30}}>
      <Text style = {{fontWeight:'bold',fontSize:30}}> {client.matchMakers.length} people said  </Text>
      <Text style = {{fontWeight:'bold', fontSize:40, fontStyle:'italic'}}>{computeName(client)}</Text>
      <Text style = {{fontSize:25, fontStyle:'italic', marginLeft:30, marginRight:30}}> is {adjectives[0].toUpperCase()}, {adjectives[1].toUpperCase()} </Text>
      <Text style = {{fontSize:25, fontStyle:'italic', marginLeft:30, marginRight:30}}> and {adjectives[2].toUpperCase()}</Text>
       </View>
       </View>
    )
   }
   if(keysSorted.length == 2) {
    return <View style = {style}>
    <View style = {{ justifyContent:'center', alignItems:'center', marginTop:30}}>
      <Text style = {styles.textStyle}> {client.matchMakers.length} people said  </Text>
      <Text style = {[styles.textStyle, {fontWeight:'bold', fontSize:40, fontStyle:'italic'}]}>{computeName(client)}</Text>
      <Text style = {[styles.textStyle, {fontSize:25, fontStyle:'italic', marginLeft:30, marginRight:30}]}> is {adjectives[0].toUpperCase()}</Text>
      <Text style = {[styles.textStyle, {fontSize:25, fontStyle:'italic', marginLeft:30, marginRight:30}]}>and {adjectives[1]}</Text>
       </View>
       </View> 
   }
   if(keysSorted.length == 1) {
    return <View style = {style}> 
    <View style = {{ justifyContent:'center', alignItems:'center', marginTop:30}}>
      <Text style = {styles.textStyle}> {client.matchMakers.length} people said  </Text>
      <Text style = {[styles.textStyle, {fontWeight:'bold', fontSize:40, fontStyle:'italic'}]}>{computeName(client)}</Text>
      <Text style = {[styles.textStyle, {fontSize:25, fontStyle:'italic', marginLeft:30, marginRight:30}]}> is {adjectives[0].toUpperCase()}</Text>
       </View> 
       </View> 
   }
   if(keysSorted.length == 0) {
    return <View style = {style}> 
    <View style = {{ justifyContent:'center', alignItems:'center', marginTop:30}}>
      
      <Text style = {[styles.textStyle, {fontWeight:'bold', fontSize:40, fontStyle:'italic'}]}>{computeName(client)}</Text>
      
       </View> 
       </View> 
   }
   return null; 
 }

 export function ClientDetails({client}){
  const myContext = useContext(AppContext); 
  const {user, userId} = myContext;
  const age = client.age ? <View style = {{flexDirection:'row',marginTop:15, alignItems:'center'}}>
  <FontAwesome name="birthday-cake" size={24} color="black" />
  <Text style = {styles.iconNames}>{client.age} years old</Text>

  </View>:<View style = {{flexDirection:'row',marginTop:15, alignItems:'center'}}>
  <FontAwesome name="birthday-cake" size={24} color="black" />
  <Text style = {styles.iconNames}>{client.minAge} - {client.maxAge} years old</Text>
  </View>; 
  const job = client.job ? <View style = {{flexDirection:'row',marginTop:15, alignItems:'center'}}>
  <FontAwesome name="suitcase" size={24} color="black" />
  <Text style = {styles.iconNames}>{client.job}</Text>

  </View>:null; 
  const location = client.subLocality ? <View style = {{flexDirection:'row',marginTop:15, alignItems:'center'}}>
  <FontAwesome5 name="house-damage" size={24} color="black" />
  <Text style = {styles.iconNames}>Lives in {client.subLocality}</Text>

  </View>:null; 
  const distanceTemplate = client.phoneNumber == user.phoneNumber ? null: <View style = {{flexDirection:'row',marginTop:15, alignItems:'center'}}>
  <Entypo name="location-pin" size={24} color="black" />
  <Text style = {styles.iconNames}> {client.distance} miles away</Text>
  </View>
  return <View style = {{marginLeft:20, marginRight:20}}>
  <View style = {[styles.line, {marginTop:40}]}/>
                  
  <Text style = {[styles.textStyle, {alignSelf:'center', fontSize:25}]}>{client.firstName}'s details</Text>

  <View style = {styles.line}></View>
  {age}
  {job}
  {location}
  
  
  {distanceTemplate}
  
  <View style = {styles.dotted}/>
  </View>

 }

 export function ClientPhotos({client}){
  const photosMainer = [null, null, null, null, null, null];
  const photos = photosMainer.slice(2)
  let template; 
  
   const checkNull = photos.filter(val => val !== null); 
   
   if(client.profilePic){
     checkNull.unshift(client.profilePic)
   }
   
   if(checkNull.length == 0){
      template = <MaterialIcons name="account-circle" size={50} color="black" />
   }
   if(checkNull.length > 0){
      template = checkNull.map(val => {
         return <Image source = {{uri:val}} style = {{height:80, width:80, marginRight:10}}/>
      })
   }
   
   return <View>
   <View style = {{flexDirection:'row',marginTop:20, alignItems:'center',marginBottom:10}}>
   <AntDesign name="instagram" size={24} color="black" />
   <Text style = {[styles.iconNames, {fontWeight:'bold'}] }> Photos</Text>
   </View>
   <View style = {{flexDirection:'row', alignItems:'center'}}>
   {template}
   </View>
   </View>
    
 }

 export function ClientMatchMakers({client}){
    
    
    let template; 
    if(client.matchMakers.length > 5){
       const result = client.matchMakers.slice(5); 
       let icons = client.matchMakers.map(val => {
        return <MaterialIcons name="account-circle" size={50} color="black" />
     })
     template = <View>
          <View style = {{flexDirection:'row'}}>
          {icons}
          </View>
          <Text>{client.matchMaker} and 1 others</Text>
       </View>

    }
    if(client.matchMakers.length == 1){
       template = <View style = {{justifyContent:'center', alignItems:'center', marginTop:20}}>
        <MaterialIcons name="account-circle" size={50} color="black" />
        <Text style = {{marginTop:10, fontWeight:'bold', fontSize:20}}>{client.matchMaker}</Text> 
       </View>
    }
    if(client.matchMakers.length > 1 && client.matchMakers.length < 5){
       let icons = client.matchMakers.map(val => {
          return <MaterialIcons name="account-circle" size={50} color="black" />
       })
       template = <View>
          <View style = {{flexDirection:'row'}}>
          {icons}
          </View>
          <Text>{client.matchMaker} and 1 others</Text>
       </View>
    }
    if(client.matchMakers.length == 0){
       template = <View style = {{justifyContent:'center', alignItems:'center', marginTop:20}}>
         <Entypo name="emoji-sad" size={50} color="black" />
         <Text style = {[styles.textStyle, {alignSelf:'center', fontSize:25}]}>No MatchMakers </Text>
         </View>
    }
    return <View>
    <View style = {[styles.line, {marginTop:40}]}/>
    <Text style = {[styles.textStyle, {alignSelf:'center', fontSize:25}]}>{computeName(client).toUpperCase()}'s MATCHMAKERS</Text>
    <View style = {styles.line}></View>
    {template}
    </View>
 }


 export function ClientTraits({client}){
    const [namer, setNamer] = useState(1); 
    const [traits, setTraits] = useState<[traits] | []>([]);
    const [gender, setGender] = useState<string>(''); 
    
    useEffect(() => {
          db.collection('user')
          .where('gender', '==', client.gender)
          .where('state', '==', client.state)
          .onSnapshot(result => {
                const users = result.docs.map(val => val.data());
                const finaler = transformCreativity(client, users); 
                setTraits(finaler); 
                setGender(gender)
             })
          
             
    },[client])
    
    
       interface traits  {
          trait:string, 
          aheadOf:number, 
          selected?: boolean;   
          votes:number; 
        }
        
              
    
    const setArrow = (obj) => {
        console.log("called"); 
     const result = traits.map(val => {
            if(val.trait == obj.trait){
                val.selected = true; 
                 
          }
          return val; 
         
     })
     
     setTraits(traits => result)
    }
    const setArrowFalse = (obj) => {
         
     const result = traits.map(val => {
            if(val.trait == obj.trait){
                val.selected = false; 
                 
          }
          return val; 
         
     })
     
     setTraits(traits => result)
    }
    const traitsTemplate = traits.map((val, index) => {
          
         return (
            <View style = {{ borderBottomWidth:3, justifyContent:'center', alignItems:'center', }}>
            
            <View style = {{flexDirection:'row', alignItems:'center', marginTop:30, }}>
            <View style = {{flex:0.3}}>
            {iconFactory(val.trait, 40)}
            </View>    
           <Text style = {{flex:0.4, fontWeight:'bold', fontSize:20}}>{val.trait.toUpperCase()}</Text>
            <View style = {{justifyContent:'flex-end',  flex:0.3, alignItems:'center'}}>
            <Text style = {{fontSize:20, fontWeight:'bold' }}> {val.votes}</Text>
            <Text style = {{fontSize:20, marginBottom:10}}> votes</Text>
            
            </View>
            
            
            </View>
          
          {val.selected ? <TouchableOpacity onPress = {() => setArrowFalse(val)}><MaterialIcons name="keyboard-arrow-up" size={24} color="grey" /></TouchableOpacity>:<TouchableOpacity onPress = {() => setArrow(val)}><MaterialIcons name="keyboard-arrow-down" size={24} color="black" /></TouchableOpacity>}
          {val.selected ? <View style = {{ width:'100%'}}>
              <View style = {{borderRadius:2, borderWidth:2, borderStyle:'dotted', }}/>
              <View style = {{flexDirection:'row'}}> 
              
               {gender == 'female' ? <View style = {{flexDirection:'row', marginTop:20, marginBottom:20 , flex:0.7, }}>
               <FontAwesome5 name="female" size={35} color="red" />
              <FontAwesome5 name="female" size={35} color="red" />
              <FontAwesome5 name="female" size={35} color="red" />
              <FontAwesome5 name="female" size={35} color="red" />
              <FontAwesome5 name="female" size={35} color="red" />
              <FontAwesome5 name="female" size={45} color="red" />
              <FontAwesome5 name="female" size={35} color="red" />
              <FontAwesome5 name="female" size={35} color="red" />
              <FontAwesome5 name="female" size={35} color="red" />
              <FontAwesome5 name="female" size={35} color="red" /></View>: <View style = {{flexDirection:'row', marginTop:20, marginBottom:20 , flex:0.7, }}>
               <FontAwesome5 name="male" size={35} color="red" />
              <FontAwesome5 name="male" size={35} color="red" />
              <FontAwesome5 name="male" size={35} color="red" />
              <FontAwesome5 name="male" size={35} color="red" />
              <FontAwesome5 name="male" size={35} color="red" />
              <FontAwesome5 name="male" size={45} color="red" />
              <FontAwesome5 name="male" size={35} color="red" />
              <FontAwesome5 name="male" size={35} color="red" />
              <FontAwesome5 name="male" size={35} color="red" />
              <FontAwesome5 name="male" size={35} color="red" /></View>} 
              
              
              <View style = {{flex:0.3, marginTop:20, marginBottom:15}}>
                 <Text style = {{alignSelf:'center', fontWeight:'bold'}}>AHEAD OF </Text> 
                 <Text style = {{alignSelf:'center', color:'red', fontWeight:'bold', fontSize:20}}>{val.aheadOf}%</Text>
                 <Text style = {{alignSelf:'center', fontWeight:'bold'}}>of males</Text>
              </View>    
              </View>    
    
    
                  
              
          </View>:null}  
          
                
        </View> 
         )
    })
    
        return (
            <View style = {{flex:1}}>
            <View style = {[styles.line, {marginTop:40}]}/>
                          
                          <Text style = {[styles.textStyle, {alignSelf:'center', fontSize:25}]}>TOP TRAITS </Text>
                          
                          <View style = {styles.line}></View>
                          {traitsTemplate}
            </View>
        )
  
 }

 export function ClientVotes({client}){
  interface votes {
      question:string; 
      answeredBy:string; 
      createdAt:any; 
      dimension:string; 
  } 
 const [votes, setVotes] = useState([]);  
 
 useEffect(() => {
  async function gamer(){
    const finaler = Promise.all(client.votes.map(async val => {
      const result = await db.collection('user').doc(val.answeredBy).get(); 
      return {...val, answeredBy:result.data()}
    })); 
    
   finaler.then(result => setVotes(result))
   } 
  gamer(); 
  }, [client])   
 

 
 
 
 const reversed = votes.reverse(); 
 const votesTemplate = reversed.length > 0 ? reversed.map(val => {
     return (
         <View style = {{ borderBottomWidth:3, justifyContent:'center', alignItems:'center', }}>
             <Text style = {{alignSelf:'flex-end',  marginTop:3, fontSize:12}}>
                 {formatDistanceToNow(val.createdAt.toDate())} ago
             </Text>
             <View style = {{flexDirection:'row', alignItems:'center', marginTop:30, }}>
             <View style = {{flex:0.3, flexDirection:'row', alignItems:'center'}}>
             {iconFactory(val.dimension, 50)}
             <Text style = {{marginLeft:10, fontSize:20, fontWeight:'900' }}>+1</Text>
 
             </View>    
             <Text style = {{maxWidth:250, fontWeight:'bold', flex:0.7}}>{computeName(client)} {val.question}</Text>
             
             </View>
             <Text style = {{alignSelf:'flex-end', fontWeight:'bold', marginBottom:5}}>- {computeName(val.answeredBy)}</Text>
                 
         </View>
     ) 
  }):<View>
    <Text>Loading</Text>
  </View>
 
 
 return (
     <View style = {{flex:1}}>
     <View style = {[styles.line, {marginTop:40}]}/>
 
                       <Text style = {[styles.textStyle, {alignSelf:'center', fontSize:25}]}> RECENT VOTES </Text>
                   
                   <View style = {[styles.line]}></View>
                   
                   {votesTemplate}
                   
         
                 
 
     </View>

 )     
 }

 export function LoadScreen(){
   return (
     <View style = {{flex:1,  justifyContent:'center', alignItems:'center'}}>
     <Image source = {{uri:'https://media.giphy.com/media/YpqWbjNDq8y4DVu4BO/giphy.gif'}} style = {{height:200, width:200}}/>  
     </View>
   )
 }


 




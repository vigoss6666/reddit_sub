import  React, {useState,useRef,useEffect} from 'react';
import { View, StyleSheet, Text, TextInput,TouchableOpacity,ScrollView,Image, Button,FlatList,Picker,PanResponder,Animated, TouchableWithoutFeedback, SafeAreaView, Platform, AsyncStorage,} from 'react-native';
import { WebView } from 'react-native-webview';
import { useMutation,useQuery } from '@apollo/react-hooks';
import {firebase} from '../../config'; 
import * as Google from 'expo-google-app-auth';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { Slider } from 'react-native-elements';
import { Audio } from 'expo-av';
import { valueToObjectRepresentation } from 'apollo-utilities';
import {CustomChatInput} from '../../src/common/Common'; 
import * as FileSystem from 'expo-file-system';
import * as Linking from 'expo-linking';
 
export default function Tester({navigation}){
  const [gifs, setGifs] = useState([]);
  const [term, updateTerm] = useState('');
  const [giphy, setGiphy] = useState(false); 
  const [music,setMusic] = useState(false);
  const [duration, setDuration] = useState(0); 
  const [maxValue, setMaxValue] = useState(0)
  const [paused, setPaused] = useState(false); 
  const soundObject = new Audio.Sound(); 
  const dir = useRef(FileSystem.documentDirectory + 'lobby52342/').current; 

  const [imager, setImager] = useState(); 
  function urlToFilename(str:string){
    var part = str.substring(
        str.lastIndexOf("%") + 1, 
        str.lastIndexOf("?")
    );
}

  const photo1FileUri = FileSystem.documentDirectory + "sdasdasda23212";
  const url = "https://firebasestorage.googleapis.com/v0/b/friends-365d0.appspot.com/o/images%2FAdd%20a%20little%20bit%20of%20body%20text%20(1)_pages-to-jpg-0001.jpg?alt=media&token=847ba2d4-72df-4656-9d88-16435c98bc53"; 

  
  
   
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
  async function namer(){
    await soundObject.loadAsync(({uri:'https://storage.googleapis.com/friends-365d0.appspot.com/Linkin%20Park%20-%20In%20The%20End%20(Mellen%20Gi%20%26%20Tommee%20Profitt%20Remix).mp3'})); 
    soundObject.setOnPlaybackStatusUpdate(_onPlaybackStatusUpdate);
  }

  },[])
  
    async function signInWithGoogleAsync() {
        
        try {
          const result = await Google.logInAsync({
            
            iosClientId: "1038446780024-fgtna4nqcjk0kius1k47bg45abhk0mrc.apps.googleusercontent.com",
            scopes: ['profile', 'email'],
          });
      
          if (result.type === 'success') {
            
            fetch("https://people.googleapis.com")  
            return result.accessToken;
          } else {
            return { cancelled: true };
          }
        } catch (e) {
          return { error: true };
        }
      }


    const [image, setImage] = useState("https://reactnative.dev/img/tiny_logo.png");
    useEffect(() => {
        (async () => {
          if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
            if (status !== 'granted') {
              alert('Sorry, we need camera roll permissions to make this work!');
            }
          }
        })();
      }, []);    
      const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    
        
    
        if (!result.cancelled) {
          const response = await fetch(result.uri); 
          const blob = await response.blob(); 
          const ref = firebase.storage().ref().child("images/"+ "gamer1"); 
          ref.put(blob)
          const result1 = ref.getDownloadURL().then(url => {setImage(url)}); 
          
          
        }
      };
      const _onPlaybackStatusUpdate = (playbackStatus:any) => {
        if (!playbackStatus.isLoaded) {
          // Update your UI for the unloaded state
          if (playbackStatus.error) {
            
            // Send Expo team the error on Slack or the forums so we can help you debug!
          }
        } else {
          // Update your UI for the loaded state
      
          if (playbackStatus.isPlaying) {
            // Update your UI for the playing state
            
            setDuration(playbackStatus.positionMillis)
            setMaxValue(playbackStatus.durationMillis)
          } else {
            // Update your UI for the paused state
          }
      
          if (playbackStatus.isBuffering) {
            // Update your UI for the buffering state
          }
      
          if (playbackStatus.didJustFinish && !playbackStatus.isLooping) {
            // The player has just finished playing and will stop. Maybe you want to play something else?
          }
      
          
        }
      };
      
     const playSound = async () => {
       
      
      try {
         
        //setDuration(playBackInstance.positionMillis)
          
          await soundObject.playAsync();
          
        
        
      } catch (error) {
        // An error occurred!
      }
     } 
     const donwloadFile = async () => {
       
      
      
      const fileUri = FileSystem.documentDirectory + "sdasdasda";
      const url = "https://homepages.cae.wisc.edu/~ece533/images/airplane.png";
    
      let downloadObject = FileSystem.createDownloadResumable(
        url,
        fileUri
      );
      let response = await downloadObject.downloadAsync();
      await AsyncStorage.setItem('dad', response.uri); 
      setImager(response.uri)
       
    }
     const fileDir = FileSystem.documentDirectory + "images/";
     
     
     async function getSingleGif(gifId: string) {
      await ensureDirExists(fileDir);
      const gifFileUri = (id: string) => fileDir + id;
      const fileUri = gifFileUri(gifId); 
      const fileInfo = await FileSystem.getInfoAsync(fileUri);
      if (!fileInfo.exists) {
        
        FileSystem.downloadAsync(gifId, fileUri);
      }
       //setImager(gifFileUri);
       return gifFileUri; 
    }
    async function ensureDirExists(dir:string) {
      const dirInfo = await FileSystem.getInfoAsync(dir);
      if (!dirInfo.exists) {
        
        await FileSystem.makeDirectoryAsync(dir, { intermediates: true });
      }
    }

    
    async function tester(url:string){
       const {exists} = await FileSystem.getInfoAsync(dir) 
       if(!exists){
        await FileSystem.makeDirectoryAsync(dir)  
        
       }
       const fileUri = dir + urlToFilename(url);
       const checker = await FileSystem.getInfoAsync(fileUri)
       if(!checker.exists){
        await FileSystem.downloadAsync(url, fileUri);   
        return fileUri;  
       }
        
        return fileUri; 
      }
       
    //   //  const dirInfo = await FileSystem.getInfoAsync(dir); 
    //   //  if (!dirInfo.exists) {
    //   //   console.log("Gif directory doesn't exist, creating...");
    //   //   await FileSystem.makeDirectoryAsync(dir);
    //   // }
    //   //  const fileUri = dir + "something"; 
    //   //  await FileSystem.downloadAsync( url, fileUri); 
    //   //  setImager(fileUri); 
    // }
    
     
    
  
  
     
     


return(
<View style = {{flex:1, }}>
{/* <View style = {{width:'75%', borderWidth:1,height:50, marginLeft:10, flexDirection:"row" }}>
<TouchableOpacity style = {{justifyContent:"center", alignItems:"center"}}>
{music ? <TouchableOpacity onPress = {() => {soundObject.pauseAsync(), setMusic(!music)}}><FontAwesome5 name="pause" size={24} color="black" /></TouchableOpacity>:<TouchableOpacity onPress = {() => {playSound(), setMusic(!music)}}><AntDesign name="caretright" size={24} color="black" /></TouchableOpacity>}
</TouchableOpacity>
<TouchableOpacity style = {[{ marginLeft:10}, styles.container]} onPress = {() => setMusic(!music)}>
  
  <Slider
    value={duration}
    maximumValue = {maxValue}
    minimumValue = {0}
    onValueChange = {(val) => setDuration(val)}
  />  

</TouchableOpacity>

</View>  */}

{/* <CustomChatInput /> */}


 {/* <Button onPress = {() => tester(url)} title = "Press me"/> */}
 <Image source = {{uri:tester(url) || url }} style = {{height:200, width:200}}> 

 </Image>  
</View>
)
}

const styles = StyleSheet.create({
  container: {
    flex:1, 
    marginLeft: 10,
    marginRight: 10,
    alignItems: "stretch",
    justifyContent:"center"
     
    
    
  }
});
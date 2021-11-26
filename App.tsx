import { StatusBar } from 'expo-status-bar';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { Ionicons, SimpleLineIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import React, { useState, useEffect, useRef, createContext, useContext, } from 'react';
import { AntDesign, Entypo } from '@expo/vector-icons';
import { StyleSheet, Text, View,Button, Settings, Platform,  Image, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {LoadScreen} from './src/common/Common'; 
import { CardStyleInterpolators } from '@react-navigation/stack';
import TT  from './TT'; 
import { NavigationContainer, BaseRouter } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Name from './Authentication/Screens/Name';
import BulkInvite from './Authentication/Screens/BulkInvite';
import FirstName from './Authentication/Screens/FirstName';
import LastName from './Authentication/Screens/LastName';
import BirthDay from './Authentication/Screens/BirthDay';  
import Gender from './Authentication/Screens/Gender';  
import SignUpComplete from './Authentication/Screens/SignUpComplete'; 
import GenderDetail from './Authentication/Screens/GenderDetail'; 
import GenderPreference from './Authentication/Screens/GenderPreference'; 
import Height from './Authentication/Screens/Height';  
import HeightMetric from './Authentication/Screens/HeightMetric';
import Feet from './Authentication/Screens/Feet'; 
import AccountType from './Authentication/Screens/AccountType';
import AccountTypeDetail from './Authentication/Screens/AccountTypeDetail';
import Inches from './Authentication/Screens/Inches'; 
import EnableLocation from './Authentication/Screens/EnableLocation'; 
import Tell from './Authentication/Screens/Tell'; 
import Email from './Authentication/Screens/Email'; 
import VerifyCode from './Authentication/Screens/VerifyCode';
import ResendCode from './Authentication/Screens/ResendCode'; 
import Password from './Authentication/Screens/Password';
import Posted from './Authentication/Screens/Posted';
import ProfileHidden from './Authentication/Screens/ProfileHidden';
import LoadPermission from './Authentication/Screens/LoadPermission';
import Phone from './Authentication/Screens/Phone';
import CountryCodes from './Authentication/Screens/CountryCodes';
import Intro from './Authentication/Screens/Intro';
import Intro2 from './Authentication/Screens/Intro2';
import Intro3 from './Authentication/Screens/Intro3';
import Intro4 from './Authentication/Screens/Intro4'; 
import VerifyEmail from './Authentication/Screens/VerifyEmail'; 
import ChangeNumber from './Account/Screens/ChangeNumber'; 
import EmailVerified from './Authentication/Screens/EmailVerified';
import VerifyPhone from './Authentication/Screens/VerifyPhone'; 
import PhoneSuccess from './Authentication/Screens/PhoneSuccess'; 
import LoadContacts from './Authentication/Screens/LoadContacts'; 
import Try from './Authentication/Screens/Try'; 
import Contacts from './Authentication/Screens/Contacts'; 
import ContactsLatest from './Authentication/Screens/ContactsLatest';
import AuthPhotosLatest from './Authentication/Screens/AuthPhotosLatest'; 
import AuthPhotos from './Authentication/Screens/AuthPhotos';
import ContactsSex from './Authentication/Screens/ContactsSex'; 
import ContactsMenu from './Authentication/Screens/ContactsMenu'; 
import ContactsPhotos from './Authentication/Screens/ContactsPhotos';
import ContactsAge from './Authentication/Screens/ContactsAge'; 
import ContactsLocation from './Authentication/Screens/ContactsLocation';
import ContactsLocationLatest from './Authentication/Screens/ContactsLocationLatest';
import ContactsLocationSingular from './Authentication/Screens/ContactsLocationSingular';

import NewContact from './Authentication/Screens/NewContact'; 
import NewContactLocation from './Authentication/Screens/NewContactLocation';
import ContactLoadSuccess from './Authentication/Screens/ContactLoadSuccess';
import Playgame from './Game/Screens/Playgame'; 
import GamePreview from './Game/Screens/GamePreview'; 

import PlayGameLatest from './Game/Screens/PlayGameLatest';
import Test from './Game/Screens/Test';

import PlayGameLatest10 from './Game/Screens/PlayGameLatest10';
import HalfRound from './Game/Screens/HalfRound';
import MapViewClientGame from './Game/Screens/MapViewClientGame';
import MapViewSelfGame from './Game/Screens/MapViewSelfGame';
import Play20 from './Game/Screens/Play20';
import ProfilePool from './Authentication/Screens/ProfilePool';
import ProfileClientView from './Authentication/Screens/ProfileClientView';
import SingleContactPhoto from './Authentication/Screens/SingleContactPhoto';  
import SingleContactLocation from './Authentication/Screens/SingleContactLocation';  
import SingleContactGender from './Authentication/Screens/SingleContactGender';
import SingleContactAge from './Authentication/Screens/SingleContactAge';
import PointsRequired from './Authentication/Screens/PointsRequired';
import SettingsHome from './Account/Screens/SettingsHome';  
import AccountSettings from './Account/Screens/AccountSettings';
import MapViewMainer from './Account/Screens/MapViewMainer';
import Photos from './Account/Screens/Photos';
import PhotosLatest from './Account/Screens/PhotosLatest';
import ImageSlider from './Account/Screens/ImageSlider'; 
import DetailsSettings from './Account/Screens/DetailsSettings'; 
import Tester from './Account/Screens/Tester';
import Tester1 from './Account/Screens/Tester1';
import Login from './Authentication/Screens/Login'; 
import Checker from './Authentication/Screens/Checker';
import School from './Authentication/Screens/School'; 
import Job from './Authentication/Screens/Job';
import FriendsLocation from './Authentication/Screens/FriendsLocation';
import Invitetoplay from './Authentication/Screens/Invitetoplay';
import AddPhoto from './Authentication/Screens/AddPhoto';
import Hometown from './Authentication/Screens/Hometown';
import SignIn from './Authentication/Screens/SignIn';
import Loader from './Authentication/Screens/Loader';
import Trophy from './Trophy/Screens/Trophy'; 
import GameHomepage from './Game/Screens/GameHomepage'; 
import Matchmake from './Game/Screens/Matchmake';
import MatchMakeFinal from './Game/Screens/MatchMakeFinal';
import MatchMakeGrand from './Game/Screens/MatchMakeGrand';
//@refresh reset
import MatchView from './Game/Screens/MatchView'; 
//import MatchView from './Game/MatchView/src/screens/MatchView';
import CustomSlider from './Game/Screens/CustomSlider';
import Endorsement from './Endorsement/Screens/Endorsements'; 
import NoMatch from './Game/Screens/NoMatch'; 
import Chat from './Chat/Screens/Chat'; 
import ChatLatest from './Chat/Screens/ChatLatest';
import ChatClientView from './Chat/Screens/ChatClientView';
import MatchScreen from './Chat/Screens/MatchList'; 
import Camera from './Chat/Screens/Camera'; 
import ContextProvider from './src/provider'; 
import VideoPlayer from './src/common/VideoPlayer'; 
import { Feather } from '@expo/vector-icons';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import FrontPage from './Authentication/Screens/Frontpage'; 
import ClientView from './ClientViews/Screens/ClientView'; 
import RequestIntro from './ClientViews/Screens/RequestIntro';
import Matchee from './ClientViews/Screens/Matchee'; 
import SelfView from './ClientViews/Screens/SelfView'; 
import MatchViewLatest from './Game/Screens/MatchViewLatest';
import BrowseMatchSettings from './Game/Screens/BrowseMatchSettings';  
import Webber from './Game/Screens/Webber'; 
import SplashScreen from './SplashScreen'; 
import EndorsementClient from './Trophy/Screens/EndorsementClient'; 
import { useMutation, useQuery, useSubscription } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
const localhost: string = 'http://192.168.43.7:3000/graphql';
const production: string = 'https://zabardast.herokuapp.com/graphql'; 
import { gql } from 'apollo-boost'; 
import { computePoints, filterGamer}  from './networking'; 
import {firebase} from './config'; 
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications'; 
import * as Permissions from 'expo-permissions';
import DocumentViewer from './src/common/DocumentViewer';
import MatchList from './Chat/Screens/MatchList';
import { FontAwesome } from '@expo/vector-icons';
import Frontpage from './Authentication/Screens/Frontpage';
import { uploadImage, createChatThread } from './networking';
import Sort from './Game/Screens/Sort'; 
import SelfSort from './Game/Screens/SelfSort'; 
import Filter from './Game/Screens/Filter'; 
import BrowseSettings from './Game/Screens/BrowseSettings';
import AttributeFilter from './Game/Screens/AttributeFilter'; 
import AttributeFilterClient from './Game/Screens/AttributeFilterClient';
import SelfGame from './Game/Screens/SelfGame'; 
import SelfMatchView from './Game/Screens/SelfMatchView';
import MatchEndorsed from './MatchEvents/Screens/MatchEndorsed'; 
import Gamer from './Game/Screens/Try'; 
import MatchMakeLatest from './Game/Screens/MatchMakeLatest'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppContext from './AppContext'; 
import GameEngine from './GameEngine'; 
import {defaultDataObject, defaultUsers, preload, dimensionQuestions10} from './DefaultData'; 
import SignUp from './SignUp'; 
import {cacheImages} from './networking'; 
import * as FileSystem from 'expo-file-system';
import { Asset } from 'expo-asset';
//CEXLNJVBAWAKRBMH



const db = firebase.firestore();

const Stack = createStackNavigator();
const computeName = (obj) => {
  if(obj.name){
     return obj.name.length > 18 ?  obj.name.substring(0,18):obj.name
  }
  if(obj.firstName && obj.lastName){
     return (obj.firstName+obj.lastName).length > 18 ? (obj.firstName+obj.lastName).substring(0,18):obj.firstName+obj.lastName
  }
  return obj.firstName
}
const sortNames = (finalUsers) => {
  const checkNull = finalUsers.filter(val => computeName(val) !== null);  
    const gamer = checkNull.filter(val => computeName(val).length > 0); 
    gamer.sort((a, b) => {
      
      let fa = computeName(a).toLowerCase(),
          fb = computeName(b).toLowerCase();
  
      if (fa < fb) {
          return -1;
      }
      if (fa > fb) {
          return 1;
      }
      return 0;
  });
  return gamer; 

}
const sortNamesReverse = (finalUsers) => {

}
const _generateList = (userId:string) => {
  return db.collection('user').where('matchMakers', 'array-contains-any', [userId]).get().then(onResult => {
     const data = onResult.docs.map(val => val.data()); 
     return data; 
  })
}

export default function App() {

  
  
  const [profileAuth, setProfilesAuth] = useState([{name:"zaid shaikh", phoneNumber:'+917208110384'}]); 
  const [xClient, setXClient] = useState({latitude:null, longitude:null});
  const [datingFlatList, setDatingFlatlist] = useState(1); 
  const [contactLocation, setContactLocation] = useState({state:null, subLocality:null})
  const [expoPushToken, setExpoPushToken] = useState('');
  const [currentUser, setCurrentUser] = useState(''); 
  const [contactList, setContactList] = useState([]); 
  const [countryCode, setCountryCode] = useState("US");
  const [dialCode, setDialCode] = useState("+1"); 
  const [introNotification, setIntroNotification] = useState(); 
  const [chatNotification, setChatNotification] = useState(true);  
  const [chatterNotification, setChatterNotification] = useState(false);
  const [initialRouteName, setInitialRouteName] = useState('Game');  
  const [singleContact, setSingleContact] = useState();  
  const [notification, setNotification] = useState(false);
  const [sentFromBrowse, setSentFromBrowse] = useState(null); 
  const [tempId, setTempId] = useState('+16505551234'); 
  const responseListener = useRef();
  const notificationListener = useRef();
  const [profilePicLocal, setProfilePicLocal] = useState(null); 
  const [inviteToPlay, setInvitetoplay] = useState(null); 
  const [inviteToPlayContacts, setInvitetoplayContacts] = useState(null); 
  const [loader, setLoader] = useState(true); 
  const [changedClient, setChangedClient] = useState(null);  
  const [generatedMatch, setGeneratedMatch] = useState([]);
  const [generatedMatchSelf, setGeneratedMatchSelf] = useState([]); 
  const [mainId, setMainId] = useState()
  const [globalPhoneNumber, setGlobalPhoneNumber] = useState(null); 
  const [vID, setVID] = useState(null);
  const [contactsL, setContactsL] = useState([]); 
  const [appRestart, setAppRestart] = useState(1); 
  const [profiler, setProfiler] = useState([]);
  const [demo, setDemo] = useState([]); 
  const [questions20, setQuestions20] = useState([]); 
  const [questions10, setQuestions10] = useState([]); 
  const [gameLoader, setGameLoader] = useState(true); 
  const [suggestedClient, setSuggestedClient] = useState([]); 
  const [globalGender, setGlobalPhoneGender] = useState([]); 
  
   


  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });
 
useEffect(() => {
 
//  dimensionQuestions10()
}, [])






  
  
  function CustomBackComponent({navigation}){
    return <TouchableOpacity style = {{marginLeft:10}} onPress = {() => navigation.goBack()}>
    {/* <Text style = {{fontWeight:'bold', color:'blue', fontSize:17}}>
      Back
    </Text> */}
    <MaterialIcons name="keyboard-arrow-left" size={24} color="black" />
    </TouchableOpacity>   
  }
  const [selfFilter, setSelfFilter] = useState({
    sortOrder:['creativity', 'charisma', 'honest', 'empathetic', 'looks', 'humor', 'status', 'wealthy'],    
    charisma:0, 
    creativity:0, 
    honest:0, 
    looks:0, 
    empathetic:0, 
    status:0, 
    humor:0, 
    wealthy:0, 
    narcissism:10,
    minAgePreference:15, 
    maxAgePreference:60,
    dimension:0, 
    distancePreference:10, 
    appUsers:false, 
    matchMakerContact:true
  })
  const [clientFilter, setClientFilter] = useState([]); 
  useEffect(() => {
    // AsyncStorage.removeItem('user')
  }, [])
  // const [clientFilter, setClientFilter] = useState([]); 

  const [basicAuth, setBasicAuth] = useState(null); 
  
  const [registeredUsers, setRegisteredUsers] = useState([]); 
  const [user, setUser] = useState({}); 
  const [_id, setId] = useState(); 
useEffect(() => {
async function namer(){
  const userGamer = await AsyncStorage.getItem('user'); 
  const user1 = "+917208110384"; 
  const user2 = "+919930815474";
  
  setId(userGamer); 
}

if(!Object.keys(user).length){
  Asset.loadAsync(require('./assets/addedPhoto.png'))
  Asset.loadAsync(require('./assets/addPhoto.png'))
  Asset.loadAsync(require('./assets/date.png'))
  Asset.loadAsync(require('./assets/matchmake.png'))
  Asset.loadAsync(require('./assets/location.png'))
  Asset.loadAsync(require('./assets/kibla.png'))
  

  namer()
}

},[])

useEffect(() => {
  
}, [])

  // useEffect(() => {
    
  useEffect(() => {
    // setLoader(!loader)
  }, [_id])
 
  function cacheImages(images) {
    return images.map(image => {
      if (typeof image === 'string') {
        return Image.prefetch(image);
      } else {
        return Asset.fromModule(image).downloadAsync();
      }
    });
  }

  useEffect(() => {
    const imageAssets = cacheImages([
     
      require('./assets/halfround.png'),
    ]); 
    Promise.all([...imageAssets]); 
  }, [])
 
  async function ensureDirExists(location) {
    const dirInfo = await FileSystem.getInfoAsync(location);
    if (!dirInfo.exists) {
      
      await FileSystem.makeDirectoryAsync(location, { intermediates: true });
    }
  }
  useEffect(() => {
    async function namer(){

      console.log("gianter called")
   
      //  const checkerResult = await db.collection('user').get().then(onResult => {
      //    const users =  onResult.docs.map(val => val.data());
         
      //    const result = users.filter(person => user.datingPoolList.includes(person.phoneNumber))
      //    return result; 
      // }) 
       const checkerResult = await _generateList(user.phoneNumber)
        const finalChecker = checkerResult.filter(val => val !== null);
        finalChecker.map(val => Image.prefetch(val.profilePicSmall))
        Image.prefetch('https://media1.giphy.com/media/jIRyzncqRWzM3GYaQm/200w.webp?cid=ecf05e4794i8r2y4pn7rz4q07079kp70edvf3074yzak89dd&rid=200w.webp&ct=g')
        setDemo(finalChecker);
        if(suggestedClient.length == 0){
          setSuggestedClient(finalChecker)          
        } 
        
        setGameLoader(false); 
         
      }
      if(Object.keys(user).length && !demo.length){
        namer()
      } 
      
   }, [user])


  //  useEffect(() => {
  //    db.collection('user').doc('+15303217868').get().then(onResult => {
  //       const result = onResult.data(); 
  //       db.collection('user').where('phoneNumber', 'in', result.datingPoolList).get().then(onResult1 => {
  //          const result1 = onResult1.docs.map(val => val.data()); 
           
  //       })
  //    }) 
  //  }, [])
   
   
   useEffect(() => {
     console.log("Dimensions questions called")
    function namer(){
      db.collection('dimensionQuestions').doc("0").get().then(onResult => {
        if(onResult.exists){
          
          const data = parseInt(user.userSet); 
          const increment = data + 1; 
          const finalIncremnent = increment.toString(); 
          //db.collection('user').doc(userId).set({userSet:finalIncremnent},{merge:true})
          const result = onResult.data(); 
          
          setQuestions10(result.questions); 
          return; 
        }
        // const int = parseInt(user.userSet);
        // const finalInt = int - 1; 
        // const finalString = finalInt.toString();   
        // db.collection('dimensionQuestions10').doc(finalString).get().then(onResult1 => {
        //   const result1 = onResult1.data();
          
        //   setQuestions20(result1.questions); 
        //   db.collection('user').doc(userId).set({userSet:"0"},{merge:true}) 
        // })
        
   })
      db.collection('dimensionQuestions10').doc("0").get().then(onResult => {
        if(onResult.exists){
          
          const data = parseInt(user.userSet); 
          const increment = data + 1; 
          const finalIncremnent = increment.toString(); 
          //db.collection('user').doc(userId).set({userSet:finalIncremnent},{merge:true})
          const result = onResult.data(); 
          
          setQuestions20(result.questions); 
          console.log("questions20 app")
          console.log(questions20)
          return; 
        }
        // const int = parseInt(user.userSet);
        // const finalInt = int - 1; 
        // const finalString = finalInt.toString();   
        // db.collection('dimensionQuestions10').doc(finalString).get().then(onResult1 => {
        //   const result1 = onResult1.data();
          
        //   setQuestions20(result1.questions); 
        //   db.collection('user').doc(userId).set({userSet:"0"},{merge:true}) 
        // })
        
   })
    }
    if(!questions10.length  && !questions20.length){
      namer()
    }
   
  // db.collection('questions').get().then(onResult => {
  //        const result = onResult.docs.map(val => val.data()); 
  //        //setQuestions(result); 
  //        console.log(result)
  //        db.collection('dimensionQuestions').doc('0').set({questions:result})
  //   }) 
  }, [])
  
  useEffect(() => {
     
      const subscribe = _id  ?  db.collection('user').doc(_id).onSnapshot(doc => {
        if(doc.exists){
          
          const user = doc.data();
          //preload(user)
          if(user.gamePreview == false){
            Asset.loadAsync(require('./assets/Project%20Name.mp4'))
          }
          
          
         
         
          
           setUser(user)
           
          // Image.prefetch(user.profilePic) 
           
          Asset.loadAsync(require('./assets/addedPhoto.png'))
          Asset.loadAsync(require('./assets/addPhoto.png'))
           
           
           setLoader(false)
           
        } 
     }):() => setLoader(false)
     //setLoader(false)
       
    return () => subscribe();  
    
    
 },[_id])


useEffect(() => {
   Notifications.addNotificationReceivedListener(response => {
     
   })
   Notifications.addNotificationsDroppedListener(response => {
    
      
   })
   Notifications.addNotificationResponseReceivedListener(response => {
    
   
  });

  
}, [])

var special = ['zeroth','first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh', 'eighth', 'ninth', 'tenth', 'eleventh', 'twelfth', 'thirteenth', 'fourteenth', 'fifteenth', 'sixteenth', 'seventeenth', 'eighteenth', 'nineteenth'];
var deca = ['twent', 'thirt', 'fort', 'fift', 'sixt', 'sevent', 'eight', 'ninet'];

function stringifyNumber(n) {
  if (n < 20) return special[n];
  if (n%10 === 0) return deca[Math.floor(n/10)-2] + 'ieth';
  return deca[Math.floor(n/10)-2] + 'y-' + special[n%10];
}


  const tempObject = {
    globalGender,
    setGlobalPhoneGender, 
    profiler, 
    setProfiler, 
    globalPhoneNumber, 
    setGlobalPhoneNumber, 
    vID, 
    setVID,
    contactsL, 
    setContactsL,
    _id,
    setId,
    profileAuth, 
    setProfilesAuth,
    userId:tempId, 
    setTempId, 
    CustomBackComponent,
    profilePicLocal,
    setProfilePicLocal,
    setRegisteredUsers,
    registeredUsers,
    computeName,
    sortNames, 
    db,
    setCurrentUser,
    setUser,
    defaultDataObject,
    firebase,
    countryCode, 
    dialCode,
    setDialCode, 
    setCountryCode

  }
  
  const globalObject = {
    _generateList, 
    globalGender, 
    setGlobalPhoneGender, 
    suggestedClient,
    setSuggestedClient, 
    questions10, 
    questions20, 
    demo, 
    setAppRestart, 
    setId,
    setUser, 
    generatedMatchSelf, 
    setGeneratedMatchSelf, 
    generatedMatch, 
    changedClient, 
    setChangedClient, 
    inviteToPlayContacts, 
    setInvitetoplayContacts, 
    inviteToPlay, 
    setInvitetoplay,
    datingFlatList, 
    setDatingFlatlist,  
    setContactLocation, 
    contactLocation, 
    xClient, 
    setXClient, 
    computePoints,
    defaultDataObject, 
    sentFromBrowse, 
    setSentFromBrowse, 
    initialRouteName, 
    setInitialRouteName, 
    stringifyNumber,
    computeName,
    createChatThread,
    db,
    firebase, 
    CustomBackComponent, 
    singleContact, 
    setSingleContact,
    clientFilter, 
    setClientFilter,
    introNotification, 
    setIntroNotification, 
    selfFilter, 
    setSelfFilter, 
    chatterNotification, 
    setChatterNotification,
    chatNotification, 
    setChatNotification, 
    userId:user.phoneNumber, 
    user, 
    registeredUsers, 
    setRegisteredUsers, 
    contactList, 
    setContactList, 
    countryCode, 
    setCountryCode, 
    dialCode, 
    setDialCode
    
    
  }
  useEffect(() => {
    
  }, []) 
  
  const getUserData = async (value) => {
    try {
      const value = await AsyncStorage.getItem(value)
      if(value !== null) {
        return value; 
      }
    } catch(e) {
      
    }
  }

  const config = {
    animation: 'spring',
    config: {
      stiffness: 1000,
      damping: 500,
      mass: 3,
      overshootClamping: true,
      restDisplacementThreshold: 0.01,
      restSpeedThreshold: 0.01,
    },
  };
  const forFade = ({ current }) => ({
    cardStyle: {
      opacity: current.progress,
    },
  });
  
  const [chatNotify,setChatNotify] = useState(true); 
  // useEffect(() => {
  //   const unsubscribe = db.collection("matches").doc("UJ4u7q4oHqlj3n6nrBv9").collection("users").onSnapshot(snap => {
  //     const data1 = snap.docs.map(doc => doc.data())
      
  //     const result = data1.map(val => {
        
  //       if(val.seen == false){
  //          setChatNotify(false); 
  //       }
       
  //     })
  //   });

  // },[])




 const checkHome = () => {

   if(currentUser){
     return <Home /> 
    }
    return <Intro />


}




const customHeader = () => {
   const insets = useSafeAreaInsets();
   return ( 
     <View style = {{paddingTop:insets.top, paddingBottom:insets.bottom}}>

     </View>
   )
}

  

const mainHome = () => {
  if(Object.keys(user).length){
    return (
      <AppContext.Provider value={globalObject}>
        <SafeAreaProvider>
        <NavigationContainer>
         
        <Stack.Navigator>
        
          <Stack.Screen name="Home" component={Home} options = {{headerShown:false}}/>  
          <Stack.Screen name="Name" component={Name}/>
          <Stack.Screen name="BulkInvite" component={BulkInvite} options = {{cardStyleInterpolator: CardStyleInterpolators.forModalPresentationIOS, headerShown:false }}/>
          <Stack.Screen name="MatchMakeGrand" component={MatchMakeGrand}/>
          
          <Stack.Screen name="PointsRequired" component={PointsRequired}/>
          <Stack.Screen name="Sort" component={Sort} options = {{cardStyleInterpolator: CardStyleInterpolators.forModalPresentationIOS, headerShown:false }}/>
          <Stack.Screen name="SelfSort" component={SelfSort} options = {{cardStyleInterpolator: CardStyleInterpolators.forModalPresentationIOS ,headerShown:false}}/>
          <Stack.Screen name="Birthday" component={BirthDay}/>
          <Stack.Screen name="AuthPhotosLatest" component={AuthPhotosLatest}/>
          <Stack.Screen name="NewContactLocation" component={NewContactLocation}/>
          <Stack.Screen name="Gender" component={Gender}/>
          <Stack.Screen name="GenderPreference" component={GenderPreference}/>
          <Stack.Screen name="Height" component={Height}/>
          <Stack.Screen name="Feet" component={Feet}/>
          <Stack.Screen name="Inches" component={Inches}/>
          <Stack.Screen name="FriendsLocation" component={FriendsLocation} options = {{cardStyleInterpolator: CardStyleInterpolators.forModalPresentationIOS, headerShown:false }}/>
          <Stack.Screen name="EnableLocation" component={EnableLocation}/>
          <Stack.Screen name="Tell" component={Tell}/>
          <Stack.Screen name="Email" component={Email}/>
          <Stack.Screen name="VerifyCode" component={VerifyCode}/>
          <Stack.Screen name="Password" component={Password}/>
          <Stack.Screen name="Posted" component={Posted}/>
          <Stack.Screen name="ProfileHidden" component={ProfileHidden}/>
          <Stack.Screen name="Phone" component={Phone}/>
          <Stack.Screen name="CountryCodes" component={CountryCodes}/>
          <Stack.Screen name="Intro" component={Intro} options = {{headerShown:false}}/>
          <Stack.Screen name="Intro2" component={Intro2}/>
          <Stack.Screen name="Intro3" component={Intro3}/>
          <Stack.Screen name="Intro4" component={Intro4}/>
          <Stack.Screen name="VerifyEmail" component={VerifyEmail}/>
          <Stack.Screen name="EmailVerified" component={EmailVerified}/>
          <Stack.Screen name="VerifyPhone" component={VerifyPhone}/>
          <Stack.Screen name="PhoneSuccess" component={PhoneSuccess}/>
          <Stack.Screen name="LoadContacts" component={LoadContacts}/>
          <Stack.Screen name="ContactsSex" component={ContactsSex} options = {{headerTitle:false, headerLeft:false}}/>
          <Stack.Screen name="ContactsAge" component={ContactsAge} options = {{headerTitle:false, headerLeft:false}}/>
          <Stack.Screen name="ContactsLocation" component={ContactsLocation} />
          {/* <Stack.Screen name="ContactsPhotos" component={ContactsPhotos} options = {{headerTitle:false, headerLeft:false}}/> */}
          <Stack.Screen name="Contacts" component={Contacts} options = {{headerTitle:false, headerLeft:false}}/>
          <Stack.Screen name="ContactLoadSuccess" component={ContactLoadSuccess} options = {{headerTitle:false, headerLeft:false}}/>
          <Stack.Screen name="NewContact" component={NewContact} options = {{cardStyleInterpolator: CardStyleInterpolators.forModalPresentationIOS ,}}/>
          <Stack.Screen name="Invitetoplay" component={Invitetoplay}/>
          <Stack.Screen name="Playgame" component={Playgame} options={{
          animationEnabled: false,
        }}/>
        <Stack.Screen name="PlayGameLatest" component={PlayGameLatest} options={{
          animationEnabled: false,
        }}/>
        <Stack.Screen name="PlayGameLatest10" component={PlayGameLatest10} options={{
          animationEnabled: false,
        }}/>
          <Stack.Screen name="MatchEndorsed" component={MatchEndorsed}/>
          <Stack.Screen name="HalfRound" component={HalfRound}/>
          <Stack.Screen name="GamePreview" component={GamePreview}/>
          <Stack.Screen name="Play20" component={Play20} options = {{cardStyleInterpolator: CardStyleInterpolators.forModalPresentationIOS, headerShown:false }}/>
          <Stack.Screen name="MapViewClientGame" component={MapViewClientGame}/>
          <Stack.Screen name="MapViewSelfGame" component={MapViewSelfGame} options = {{cardStyleInterpolator: CardStyleInterpolators.forModalPresentationIOS ,headerShown:false}}/>
          <Stack.Screen name="ProfilePool" component={ProfilePool} options = {{headerTitle:false, headerLeft:false}}/>
          <Stack.Screen name="SettingsHome" component={SettingsHome} options = {{headerTitle:false}} />
          <Stack.Screen name="AccountSettings" component={AccountSettings  }  />
          <Stack.Screen name="MapVeiw" component={MapViewMainer}/>
          <Stack.Screen name="ImageSlider" component={ImageSlider}/>
          <Stack.Screen name="DetailsSettings" component={DetailsSettings} options = {{headerShown:false}} />
          <Stack.Screen name="AddPhotos" component={Photos} options = {{headerTitle:false, headerLeft:null, headerRightContainerStyle:{marginRight:10}}}/>
          <Stack.Screen name="MapViewMainer" component={MapViewMainer}/>
          <Stack.Screen name="Login" component={Login}/>
          <Stack.Screen name="Checker" component={Checker}/>
          <Stack.Screen name="ChangeNumber" component={ChangeNumber}/>
          <Stack.Screen name="School" component={School}/>
          <Stack.Screen name="Job" component={Job}/>
          <Stack.Screen name="Hometown" component={Hometown}/>
          <Stack.Screen name="PhotosLatest" component={PhotosLatest}/>
          <Stack.Screen name="AddPhoto" component={AddPhoto}/>
          <Stack.Screen name="Loader" component={Loader} options = {{headerTitle:false, headerLeft:false}}/>
          <Stack.Screen name="Trophy" component={Trophy}/>
          <Stack.Screen name="GameHomepage" component={GameHomepage}/>
          <Stack.Screen name="HeightMetric" component={HeightMetric} options = {{cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS ,}}/>
          <Stack.Screen name="GenderDetail" component={GenderDetail} options = {{cardStyleInterpolator: CardStyleInterpolators.forModalPresentationIOS ,}}/> 
          <Stack.Screen name="MatchView" component={MatchView}/>
          <Stack.Screen name="Endorsement" component={Endorsement}/>
          <Stack.Screen name="NoMatch" component={NoMatch}/>
          <Stack.Screen name="Tester1" component={Tester1}/>
          <Stack.Screen name="VideoPlayer" component={VideoPlayer}/>
          <Stack.Screen name="DocumentViewer" component={DocumentViewer}/>
          <Stack.Screen name="Camera" component={Camera}/>
          {/* <Stack.Screen name="Chat" component={Chat} options = {({route}) => ({headerTitle:route.params.title,   headerRight:() => <Feather name="flag" size={20} color="red" style = {{marginRight:10}}/>})} /> */}
          <Stack.Screen name="MatchList" component={MatchList} options = {{headerShown:false}}/>
          <Stack.Screen name="AttributeFilter" component={AttributeFilter}/>
          <Stack.Screen name="AttributeFilterClient" component={AttributeFilterClient}/>
          <Stack.Screen name="BrowseSettings" component={BrowseSettings}/>
          <Stack.Screen name="SelfMatchView" component={SelfMatchView} options = {{headerTitle:false}}/>
          <Stack.Screen name="SelfGame" component={SelfGame} />
          <Stack.Screen name="SelfView" component={SelfView} />
          <Stack.Screen name="BrowseMatchSettings" component={BrowseMatchSettings}/>
          <Stack.Screen name="MatchMakeLatest" component={MatchMakeLatest}/>
          <Stack.Screen name="MatchViewLatest" component={MatchViewLatest}/>
          <Stack.Screen name="MatchMakeFinal" component={MatchMakeFinal} options = {{headerShown:false}}/>
          <Stack.Screen name="Webber" component={Webber}/>
          <Stack.Screen name="SingleContactPhoto" component={SingleContactPhoto}/>
          <Stack.Screen name="SingleContactLocation" component={SingleContactLocation}/> 
          <Stack.Screen name="SingleContactGender" component={SingleContactGender}/>
          <Stack.Screen name="SingleContactAge" component={SingleContactAge}/>
          <Stack.Screen name="Homer" component={Home} options = {{headerShown:false}}/>
          <Stack.Screen name="ClientView" component={ClientView} />
          <Stack.Screen name="RequestIntro" component={RequestIntro} />
          <Stack.Screen name="ChatLatest" component={ChatLatest} options = {{headerShown:true, }}/>
          <Stack.Screen name="EndorsementClient" component={EndorsementClient} options = {{headerShown:true, }}/>
          <Stack.Screen name="ChatClientView" component={ChatClientView} options = {{headerShown:true, }}/>
          <Stack.Screen name="ProfileClientView" component={ProfileClientView} options = {{headerShown:true, }}/>
          
          
          
          
        </Stack.Navigator>
        
      </NavigationContainer>
      </SafeAreaProvider>
      </AppContext.Provider>
      
      
       
    );
    }
    return (
      <LoadScreen />
    )
}
const basicAuthStack = <AppContext.Provider value={tempObject}>
<SafeAreaProvider>
<NavigationContainer>
 <Stack.Navigator> 
<Stack.Screen name="Home" component={Intro} options = {{headerShown:false}}/>
<Stack.Screen name="Phone" component={Phone}/>
<Stack.Screen name="Test" component={MatchEndorsed}/>

<Stack.Screen name="SignUpComplete" component={SignUpComplete}/>
<Stack.Screen name="ResendCode" component={ResendCode} options = {{cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS}}/>
<Stack.Screen name="AccountType" component={AccountType}/>
<Stack.Screen name="VerifyPhone" component={VerifyPhone}/>
<Stack.Screen name="LoadPermission" component={LoadPermission}/>
<Stack.Screen name="AccountTypeDetail" component={AccountTypeDetail} options = {{cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS}}/>
<Stack.Screen name="FirstName" component={FirstName}/>
<Stack.Screen name="LastName" component={LastName}/>
<Stack.Screen name="SignIn" component={SignIn}/>
<Stack.Screen name="Name" component={Name}/>
<Stack.Screen name="ContactsLatest" component={ContactsLatest}/>
<Stack.Screen name="AuthPhotosLatest" component={AuthPhotosLatest}/>
<Stack.Screen name="Birthday" component={BirthDay}/>
<Stack.Screen name="CountryCodes" component={CountryCodes} options = {{headerTitle:false}}/> 
<Stack.Screen name="Gender" component={Gender}/>
<Stack.Screen name="GenderDetail" component={GenderDetail} options = {{cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS ,}}/>
<Stack.Screen name="ContactsLocationLatest" component={ContactsLocationLatest}/>
<Stack.Screen name="ContactsLocationSingular" component={ContactsLocationSingular} options = {{cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS }}/>
<Stack.Screen name="GenderPreference" component={GenderPreference}/>
<Stack.Screen name="Height" component={Height}/>
<Stack.Screen name="HeightMetric" component={HeightMetric} options = {{cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS ,}}/>
<Stack.Screen name="AddPhoto" component={AddPhoto}/>
<Stack.Screen name="AuthPhotos" component={AuthPhotos}/>
<Stack.Screen name="School" component={School}/>
<Stack.Screen name="Job" component={Job}/>
<Stack.Screen name="Hometown" component={Hometown}/>
<Stack.Screen name="Posted" component={Posted}/>
<Stack.Screen name="EnableLocation" component={EnableLocation}/>
<Stack.Screen name="LoadContacts" component={LoadContacts}/>
<Stack.Screen name="Tell" component={Tell} options = {{cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS }}/>
<Stack.Screen name="ProfileHidden" component={ProfileHidden}/>
<Stack.Screen name="Loader" component={Loader} options = {{headerTitle:false, headerLeft:false}}/>
<Stack.Screen name="ContactLoadSuccess" component={ContactLoadSuccess}  options = {{cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS }}/>
<Stack.Screen name="Contacts" component={Contacts} options = {{headerTitle:false, headerLeft:false}}/>
<Stack.Screen name="ContactsAge" component={ContactsAge} options = {{headerTitle:false, headerLeft:false}}/>
<Stack.Screen name="ContactsSex" component={ContactsSex} options = {{headerTitle:false, headerLeft:false}}/>
<Stack.Screen name="ContactsLocation" component={ContactsLocation} options = {{headerTitle:false, headerLeft:false}} />
<Stack.Screen name="ContactsPhotos" component={ContactsPhotos} options = {{headerTitle:false, }}/>
<Stack.Screen name="Homer" component={mainHome}/>




</Stack.Navigator>
</NavigationContainer>
</SafeAreaProvider>
</AppContext.Provider>
if(loader){
  return <LoadScreen />
}
return Object.keys(user).length  ?  mainHome():basicAuthStack
 
}
  

const Tab = createMaterialTopTabNavigator();
function MyTabs() {
  return (
    <SafeAreaView>
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Settings" component={Name} />
    </Tab.Navigator>
    </SafeAreaView>
  );
}

const HeaderLeft = () => (
   <View style = {{flex:1,flexDirection:"row",justifyContent:'space-between', alignItems:"stretch"}}>
    <FontAwesome name="trophy" size={24} color="black" style = {{marginRight:10}}/>
    <FontAwesome name="trophy" size={24} color="black" />
   </View>
)
function Home({navigation}){
  const myContext = useContext(AppContext); 
  const {user, userId, countryCode, dialCode, chatNotification, chatterNotification, initialRouteName} = myContext;
  const insets = useSafeAreaInsets();
  async function _loadAssetsAsync(imageArray){
    const imageAssets = cacheImages(imageArray);

    

    await Promise.all([...imageAssets]);
  }
  useEffect(() => {
  // if(user.dating && user.gamePreview){
  //   navigation.navigate('PlayGameLatest')    
  //   return; 
  // }
  // navigation.navigate('GamePreview')  
  
  }, [])
  useEffect(() => {
   _loadAssetsAsync(user.photos) 
  }, [])
  
  return (
    <SafeAreaProvider>
    <Tab.Navigator 
      style = {{paddingTop:insets.top, paddingRight:insets.right, paddingLeft:insets.left}} 
      animationEnableb = {false}
      initialRouteName = {initialRouteName}
      tabBarOptions={{
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
    }}
    screenOptions={({ route }) => ({
      
      
      title: ({ focused, color, size }) => {
        if(route.name === 'MatchList'){
          if(!focused){
            if(chatNotification == true){
              
                return (
                  <View>
                 <View style = {{height:10,width:10, position:'absolute', left:-5, backgroundColor:'red', borderRadius:5,zIndex:100}}/>
                 <AntDesign name="wechat" size={24} color="black" />
                 </View> 
                 );
              
           }
           if(chatNotification == false){
            
              return (
                <View>
               <AntDesign name="wechat" size={24} color="black" />
               </View> 
               );
            
         }
        } 
          if(focused) {
            if(chatNotification == true){
              
                return (
                  <View>
                 <View style = {{height:10,width:10, position:'absolute', left:-5, backgroundColor:'red', borderRadius:5,zIndex:100}}/>
                 <AntDesign name="wechat" size={24} color="black" />
                 </View> 
                 );
              
           }
           if(chatNotification == false){
            
              return (
                <View>
               
               <AntDesign name="wechat" size={24} color="black" />
             
               </View> 
               );
            
         }
        }
       }      
        if(route.name === 'ProfilePool'){
          if(focused) {
            return <SimpleLineIcons name="people" size={24} color="orange" />;   
          } 
          return <SimpleLineIcons name="people" size={24} color="black" />;
        }
        if(route.name === 'Game'){
          if(focused) {
            return <AntDesign name="play" size={24} color="orange" />   
          } 
          return <AntDesign name="play" size={24} color="black" />;
        }
        if(route.name === 'Trophy'){
          if(focused) {
            return <FontAwesome name="trophy" size={24} color="orange" />   
          } 
          return <FontAwesome name="trophy" size={24} color="black" />;
        }
        if(route.name === 'Settings'){
          if(focused) {
            return <MaterialCommunityIcons name="account-circle" size={26} color="orange" />   
          } 
          return <MaterialCommunityIcons name="account-circle" size={24} color="black" />;
        }
        // if(route.name === 'SelfView'){
        //   if(focused) {
        //     return user.profilePic ? <Image source = {{uri:user.profilePic}} style = {{height:30, width:30, borderRadius:15}}/>:<MaterialCommunityIcons name="account-circle" size={26} color="orange" />; 
        //   } 
        //   return user.profilePic ? <Image source = {{uri:user.profilePic}} style = {{height:30, width:30, borderRadius:15}}/>:<MaterialCommunityIcons name="account-circle" size={26} color="orange" />
        // }
        
        
      },
      
       
    })}
    
    >
        
      {/* <Tab.Screen name="SelfView" component={SelfView} />  */}
     
      <Tab.Screen name="Game" component={ !user.gamePreview ? GamePreview :user.dating ? GameHomepage:PlayGameLatest}/>
      <Tab.Screen name="Trophy" component={Trophy} />
      <Tab.Screen name="ProfilePool" component={ProfilePool}  />
      <Tab.Screen name="MatchList" component={MatchList}  /> 
      <Tab.Screen name="Settings" component={SettingsHome} />
        
    </Tab.Navigator>
    </SafeAreaProvider>
    
  );

   
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

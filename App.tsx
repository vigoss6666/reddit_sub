import { StatusBar } from 'expo-status-bar';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { Ionicons, SimpleLineIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import React, { useState, useEffect, useRef, createContext, useContext, } from 'react';
import { AntDesign } from '@expo/vector-icons';
import { StyleSheet, Text, View,Button, Settings, Platform,  Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { NavigationContainer, BaseRouter } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Name from './Authentication/Screens/Name';
import BirthDay from './Authentication/Screens/BirthDay';  
import Gender from './Authentication/Screens/Gender';  
import GenderPreference from './Authentication/Screens/GenderPreference'; 
import Height from './Authentication/Screens/Height';  
import Feet from './Authentication/Screens/Feet'; 
import Inches from './Authentication/Screens/Inches'; 
import EnableLocation from './Authentication/Screens/EnableLocation'; 
import Tell from './Authentication/Screens/Tell'; 
import Email from './Authentication/Screens/Email'; 
import VerifyCode from './Authentication/Screens/VerifyCode';
import Password from './Authentication/Screens/Password';
import Posted from './Authentication/Screens/Posted';
import ProfileHidden from './Authentication/Screens/ProfileHidden';
import Phone from './Authentication/Screens/Phone';
import CountryCodes from './Authentication/Screens/CountryCodes';
import Intro from './Authentication/Screens/Intro';
import Intro2 from './Authentication/Screens/Intro2';
import Intro3 from './Authentication/Screens/Intro3';
import Intro4 from './Authentication/Screens/Intro4'; 
import VerifyEmail from './Authentication/Screens/VerifyEmail'; 
import EmailVerified from './Authentication/Screens/EmailVerified';
import VerifyPhone from './Authentication/Screens/VerifyPhone'; 
import PhoneSuccess from './Authentication/Screens/PhoneSuccess'; 
import LoadContacts from './Authentication/Screens/LoadContacts'; 
import Try from './Authentication/Screens/Try'; 
import Contacts from './Authentication/Screens/Contacts'; 
import ContactsSex from './Authentication/Screens/ContactsSex'; 
import ContactsMenu from './Authentication/Screens/ContactsMenu'; 
import ContactsPhotos from './Authentication/Screens/ContactsPhotos';
import ContactsAge from './Authentication/Screens/ContactsAge'; 
import ContactsLocation from './Authentication/Screens/ContactsLocation';
import NewContact from './Authentication/Screens/NewContact'; 
import ContactLoadSuccess from './Authentication/Screens/ContactLoadSuccess';
import Playgame from './Game/Screens/Playgame'; 
import Play20 from './Game/Screens/Play20';
import ProfilePool from './Authentication/Screens/ProfilePool';
import SettingsHome from './Account/Screens/SettingsHome';  
import AccountSettings from './Account/Screens/AccountSettings';
import MapViewMainer from './Account/Screens/MapViewMainer';
import Photos from './Account/Screens/Photos';
import ImageSlider from './Account/Screens/ImageSlider'; 
import DetailsSettings from './Account/Screens/DetailsSettings'; 
import Tester from './Account/Screens/Tester';
import Tester1 from './Account/Screens/Tester1';
import Login from './Authentication/Screens/Login'; 
import Checker from './Authentication/Screens/Checker';
import School from './Authentication/Screens/School'; 
import Job from './Authentication/Screens/Job';
import AddPhoto from './Authentication/Screens/AddPhoto';
import Hometown from './Authentication/Screens/Hometown';
import Loader from './Authentication/Screens/Loader';
import Trophy from './Trophy/Screens/Trophy'; 
import GameHomepage from './Game/Screens/GameHomepage'; 
import Matchmake from './Game/Screens/Matchmake'; 
import MatchView from './Game/Screens/MatchView'; 
//import MatchView from './Game/MatchView/src/screens/MatchView';
import CustomSlider from './Game/Screens/CustomSlider';
import Endorsement from './Endorsement/Screens/Endorsements'; 
import NoMatch from './Game/Screens/NoMatch'; 
import Chat from './Chat/Screens/Chat'; 
import MatchScreen from './Chat/Screens/MatchList'; 
import Camera from './Chat/Screens/Camera'; 
import ContextProvider from './src/provider'; 
import VideoPlayer from './src/common/VideoPlayer'; 
import { Feather } from '@expo/vector-icons';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import FrontPage from './Authentication/Screens/Frontpage'; 
import ClientView from './ClientViews/Screens/ClientView'; 
import Matchee from './ClientViews/Screens/Matchee'; 
import SelfView from './ClientViews/Screens/SelfView'; 
import MatchViewLatest from './Game/Screens/MatchViewLatest';
import BrowseMatchSettings from './Game/Screens/BrowseMatchSettings';  
import Webber from './Game/Screens/Webber'; 
import SplashScreen from './SplashScreen'; 
import { useMutation, useQuery, useSubscription } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
const localhost: string = 'http://192.168.43.7:3000/graphql';
const production: string = 'https://zabardast.herokuapp.com/graphql'; 
import { gql } from 'apollo-boost'; 
//import { client , mutateSettings}  from './networking'; 
import {firebase} from './config'; 
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import DocumentViewer from './src/common/DocumentViewer';
import MatchList from './Chat/Screens/MatchList';
import { FontAwesome } from '@expo/vector-icons';
import Frontpage from './Authentication/Screens/Frontpage';
import { uploadImage } from 'networking';
import Sort from './Game/Screens/Sort'; 
import Filter from './Game/Screens/Filter'; 
import BrowseSettings from './Game/Screens/BrowseSettings';
import AttributeFilter from './Game/Screens/AttributeFilter'; 
import SelfGame from './Game/Screens/SelfGame'; 
import SelfMatchView from './Game/Screens/SelfMatchView';
import Gamer from './Game/Screens/Try'; 
import MatchMakeLatest from './Game/Screens/MatchMakeLatest'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppContext from './AppContext'; 
const db = firebase.firestore();

const Stack = createStackNavigator();
export default function App() {

  console.disableYellowBox = true;

  const [expoPushToken, setExpoPushToken] = useState('');
  const [currentUser, setCurrentUser] = useState('+917208110384'); 
  const [contactList, setContactList] = useState([]); 
  const [countryCode, setCountryCode] = useState("US");
  const [dialCode, setDialCode] = useState("+1");  

  const [basicAuth, setBasicAuth] = useState(null); 
  const [registeredUsers, setRegisteredUsers] = useState([]); 
  const [user, setUser] = useState({}); 


  useEffect(() => {
     const subscribe = db.collection('user').doc('+917208110384').onSnapshot(doc => {
        if(doc.exists){
           setUser(doc.data())
        } 
     })
     return () => subscribe(); 
  }, [])
//   useEffect(() => {
//     async function namer(){
//        const user = await AsyncStorage.getItem('user');  
//        setCurrentUser(user); 
       
//        const basicAuth = await AsyncStorage.getItem('basicAuth')
       
//        setBasicAuth(basicAuth);  
//     }
//     namer()
//  },[])





  
  
  const globalObject = {
    userId:currentUser, 
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
  
  
  const getUserData = async (value) => {
    try {
      const value = await AsyncStorage.getItem(value)
      if(value !== null) {
        return value; 
      }
    } catch(e) {
      
    }
  }

   
   console.log(currentUser)
  
  const [chatNotify,setChatNotify] = useState(true); 
  useEffect(() => {
    const unsubscribe = db.collection("matches").doc("UJ4u7q4oHqlj3n6nrBv9").collection("users").onSnapshot(snap => {
      const data1 = snap.docs.map(doc => doc.data())
      
      const result = data1.map(val => {
        
        if(val.seen == false){
           setChatNotify(false); 
        }
       
      })
    });

  },[])




 const checkHome = () => {
 if(currentUser && !basicAuth){
    return Name; 
 }
 if(currentUser && basicAuth){
    return Home; 
 }
 if(!currentUser && !basicAuth){
    return Intro; 
 }
 
}

const customHeader = () => {
   const insets = useSafeAreaInsets();
   return ( 
     <View style = {{paddingTop:insets.top, paddingBottom:insets.bottom}}>

     </View>
   )
}

 if(Object.keys(user).length > 1){
  return (
    <AppContext.Provider value={globalObject}>
      <SafeAreaProvider>
      <NavigationContainer>
       
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} options = {{headerShown:false}}/>
        <Stack.Screen name="Name" component={Name}/>
        <Stack.Screen name="Birthday" component={BirthDay}/>
        <Stack.Screen name="Gender" component={Gender}/>
        <Stack.Screen name="GenderPreference" component={GenderPreference}/>
        <Stack.Screen name="Height" component={Height}/>
        <Stack.Screen name="Feet" component={Feet}/>
        <Stack.Screen name="Inches" component={Inches}/>
        <Stack.Screen name="EnableLocation" component={EnableLocation}/>
        <Stack.Screen name="Tell" component={Tell}/>
        <Stack.Screen name="Email" component={Email}/>
        <Stack.Screen name="VerifyCode" component={VerifyCode}/>
        <Stack.Screen name="Password" component={Password}/>
        <Stack.Screen name="Posted" component={Posted}/>
        <Stack.Screen name="ProfileHidden" component={ProfileHidden}/>
        <Stack.Screen name="Phone" component={Phone}/>
        <Stack.Screen name="CountryCodes" component={CountryCodes}/>
        <Stack.Screen name="Intro" component={Intro}/>
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
        <Stack.Screen name="ContactsLocation" component={ContactsLocation} options = {{headerTitle:false, headerLeft:false}}/>
        <Stack.Screen name="ContactsPhotos" component={ContactsPhotos} options = {{headerTitle:false, headerLeft:false}}/>
        <Stack.Screen name="Contacts" component={Contacts} options = {{headerTitle:false, headerLeft:false}}/>
        <Stack.Screen name="ContactLoadSuccess" component={ContactLoadSuccess} options = {{headerTitle:false, headerLeft:false}}/>
        <Stack.Screen name="NewContact" component={NewContact}/>
        <Stack.Screen name="Playgame" component={Playgame} options={{
        animationEnabled: false,
      }}/>
        <Stack.Screen name="Play20" component={Play20}/>
        <Stack.Screen name="ProfilePool" component={ProfilePool} options = {{headerTitle:false, headerLeft:false}}/>
        <Stack.Screen name="SettingsHome" component={SettingsHome} options = {{headerTitle:false}} />
        <Stack.Screen name="AccountSettings" component={AccountSettings  } options = {{headerShown:false, headerTitle:"SOmething", headerRight:() => <Button title = {"Press me"} onPress = {() => alert('Hello woeld')}>Hello world</Button>}}   />
        <Stack.Screen name="MapVeiw" component={MapViewMainer}/>
        <Stack.Screen name="ImageSlider" component={ImageSlider}/>
        <Stack.Screen name="DetailsSettings" component={DetailsSettings} options = {{headerShown:false}} />
        <Stack.Screen name="AddPhotos" component={Photos} options = {{headerTitle:false, headerLeft:null, headerRightContainerStyle:{marginRight:10}}}/>
        <Stack.Screen name="MapViewMainer" component={MapViewMainer}/>
        <Stack.Screen name="Login" component={Login}/>
        <Stack.Screen name="Checker" component={Checker}/>
        <Stack.Screen name="School" component={School}/>
        <Stack.Screen name="Job" component={Job}/>
        <Stack.Screen name="Hometown" component={Hometown}/>
        <Stack.Screen name="AddPhoto" component={AddPhoto}/>
        <Stack.Screen name="Loader" component={Loader} options = {{headerTitle:false, headerLeft:false}}/>
        <Stack.Screen name="Trophy" component={Trophy}/>
        <Stack.Screen name="GameHomepage" component={GameHomepage}/>
        <Stack.Screen name="Matchmake" component={Matchmake}/>
        <Stack.Screen name="MatchView" component={MatchView}/>
        <Stack.Screen name="Endorsement" component={Endorsement}/>
        <Stack.Screen name="NoMatch" component={NoMatch}/>
        <Stack.Screen name="Tester1" component={Tester1}/>
        <Stack.Screen name="VideoPlayer" component={VideoPlayer}/>
        <Stack.Screen name="DocumentViewer" component={DocumentViewer}/>
        <Stack.Screen name="Camera" component={Camera}/>
        <Stack.Screen name="Chat" component={Chat} options = {({route}) => ({headerTitle:route.params.title,   headerRight:() => <Feather name="flag" size={20} color="red" style = {{marginRight:10}}/>})} />
        <Stack.Screen name="MatchList" component={MatchList} options = {{headerShown:false}}/>
        <Stack.Screen name="AttributeFilter" component={AttributeFilter}/>
        <Stack.Screen name="BrowseSettings" component={BrowseSettings}/>
        <Stack.Screen name="SelfMatchView" component={SelfMatchView}/>
        <Stack.Screen name="SelfGame" component={SelfGame}/>
        <Stack.Screen name="BrowseMatchSettings" component={BrowseMatchSettings}/>
        <Stack.Screen name="MatchMakeLatest" component={MatchMakeLatest}/>
        <Stack.Screen name="MatchViewLatest" component={MatchViewLatest}/>
        <Stack.Screen name="Webber" component={Webber}/>
        <Stack.Screen name="Homer" component={Home} options = {{headerShown:false}}/>
        <Stack.Screen name="ClientView" component={ClientView} options = {{headerShown:false}}/>
        
        
        
      </Stack.Navigator>
      
    </NavigationContainer>
    </SafeAreaProvider>
    </AppContext.Provider>
    
    
     
  );
  }
  return (
    <SplashScreen />
  )
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
function Home(props){
  const myContext = useContext(AppContext); 
  const {user, userId, countryCode, dialCode} = myContext;
  const insets = useSafeAreaInsets();
  return (
    <SafeAreaProvider>
    <Tab.Navigator 
      style = {{paddingTop:insets.top, paddingRight:insets.right, paddingLeft:insets.left}} 
      initialRouteName = {"ProfilePool"}
      tabBarOptions={{
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
    }}
    screenOptions={({ route }) => ({
      
      
      title: ({ focused, color, size }) => {
        if(route.name === 'Matchlist'){
          console.log(route.params); 
          if(focused) {
            if(props.chatter == false){
              return (
                <View>
               <View style = {{height:10,width:10, position:'absolute', left:-5, backgroundColor:'red', borderRadius:5,zIndex:100}}/>
               <AntDesign name="wechat" size={24} color="black" />
               </View> 
               );
            }
              return (
              <View>
              <AntDesign name="wechat" size={24} color="black" />
             </View> 
             );     
               
          }
          if(props.chatter == false){
            return (
              <View>
             <View style = {{height:10,width:10, position:'absolute', left:-5, backgroundColor:'red', borderRadius:5,zIndex:100}}/>
             <AntDesign name="wechat" size={24} color="black" />
             </View> 
             );
          }
            return (
            <View>
            <AntDesign name="wechat" size={24} color="black" />
           </View> 
           ); 
          
          
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
        if(route.name === 'SelfView'){
          if(focused) {
            return user.profilePic ? <Image source = {{uri:user.profilePic}} style = {{height:30, width:30, borderRadius:15}}/>:<MaterialCommunityIcons name="account-circle" size={26} color="orange" />; 
          } 
          return user.profilePic ? <Image source = {{uri:user.profilePic}} style = {{height:30, width:30, borderRadius:15}}/>:<MaterialCommunityIcons name="account-circle" size={26} color="orange" />
        }
        
      },
      initialRouteName:"ProfilePool", 
    })}
    
    >
        
       <Tab.Screen name="SelfView" component={SelfView} /> 
      <Tab.Screen name="Game" component={GameHomepage} />
      <Tab.Screen name="Trophy" component={Trophy} />
      <Tab.Screen name="ProfilePool" component={ProfilePool}  />
      <Tab.Screen name="Matchlist" component={MatchList}  /> 
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

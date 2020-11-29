import { StatusBar } from 'expo-status-bar';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import React, { useState, useEffect, useRef } from 'react';
import { AntDesign } from '@expo/vector-icons';
import { StyleSheet, Text, View,Button, AsyncStorage, Settings, Platform, SafeAreaView } from 'react-native';
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
import ContactsAge from './Authentication/Screens/ContactsAge'; 
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
 
const currentUser = firebase.auth().currentUser; 
    const db = firebase.firestore(); 
    const userRef = db.collection('gamer');







// async function getId(){
//    const result = await AsyncStorage.getItem('_id')
//    return result; 
// }

// const client = new ApolloClient({ 
//   uri: production, 
//   request: async (operation) => {
//     operation.setContext({
//       headers: {
//         username: await getId() || "not defined" 
//       }
//     })
//   }
// });
const REGISTER_USER = gql`
 mutation namer {
    registerUser
 }
` 

//getDatingPool: DatingPoolObjectList!
const GET_HELLO = gql`
 query {
   
    getDatingPool {
       data {
          _id 
          firstname 
          name 
       }
    }
 }
`; 


const Stack = createStackNavigator();

function HomeScreen({navigation}){
   return (
   <View style = {{justifyContent:"center", alignItems:"center",flex:1,backgroundColor:"white"}}>
     <Button title = {"Press me"} onPress  = {() => navigation.navigate("Side") }>

     </Button>
   </View>)
}


function SideScreen(){
   return (
      <View>
        <Text>Side screen </Text>
      </View>
   )
}

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});
export default function App() {
  const [expoPushToken, setExpoPushToken] = useState('');
  const db = firebase.firestore();
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

  console.log(expoPushToken);
  const [notification, setNotification] = useState(false);
  console.log(notification);
  const notificationListener = useRef();
  const responseListener = useRef();
  // useEffect(() => {
  //   registerForPushNotificationsAsync().then(token => setExpoPushToken(token));
    

  //   // This listener is fired whenever a notification is received while the app is foregrounded
  //   notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
  //     setNotification(notification);
  //   });

  //   // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
  //   responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
  //     console.log(response);
  //   });

  //   return () => {
  //     Notifications.removeNotificationSubscription(notificationListener);
  //     Notifications.removeNotificationSubscription(responseListener);
  //   };
  // }, []);  
  // async function sendPushNotification(expoPushToken) {
  //   const message = {
  //     to: expoPushToken,
  //     sound: 'default',
  //     title: 'Original Title',
  //     body: 'And here is the body!',
  //     data: { data: 'goes here' },
  //   };
  
  //   await fetch('https://exp.host/--/api/v2/push/send', {
  //     method: 'POST',
  //     headers: {
  //       Accept: 'application/json',
  //       'Accept-encoding': 'gzip, deflate',
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(message),
  //   });
  // }
  // async function registerForPushNotificationsAsync() {
  //   let token;
  //   if (Constants.isDevice) {
  //     const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
  //     let finalStatus = existingStatus;
  //     if (existingStatus !== 'granted') {
  //       const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
  //       finalStatus = status;
  //     }
  //     if (finalStatus !== 'granted') {
  //       alert('Failed to get push token for push notification!');
  //       return;
  //     }
  //     token = (await Notifications.getExpoPushTokenAsync()).data;
      
  //   } else {
  //     alert('Must use physical device for Push Notifications');
  //   }
  
  //   if (Platform.OS === 'android') {
  //     Notifications.setNotificationChannelAsync('default', {
  //       name: 'default',
  //       importance: Notifications.AndroidImportance.MAX,
  //       vibrationPattern: [0, 250, 250, 250],
  //       lightColor: '#FF231F7C',
  //     });
  //   }
  
  //   return token;
  // }
  // async function namer(){
  //   const _id = await AsyncStorage.getItem("_id");
  //   if(_id){
  //     return; 
  //   }
  //   const result =  await client.mutate({mutation:REGISTER_USER})
  //   console.log(result)   
  //   AsyncStorage.setItem('_id', result.data.registerUser);
  //   console.log( await AsyncStorage.getItem('_id')) 
  // }
  //namer()
   
  
  return (
     
     
      <NavigationContainer>
      <Stack.Navigator screenOptions = {{headerShown:true}} name = {"zaid"}>
        <Stack.Screen name="Home" children={() => <Home chatter = {chatNotify}/>}  options = {{headerTitle:false}}/>

        <Stack.Screen name="Side" component={SideScreen}/>
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
        <Stack.Screen name="ContactsSex" component={ContactsSex}/>
        <Stack.Screen name="ContactsAge" component={ContactsAge}/>
        <Stack.Screen name="Contacts" component={Contacts}/>
        <Stack.Screen name="ContactLoadSuccess" component={ContactLoadSuccess}/>
        <Stack.Screen name="NewContact" component={NewContact}/>
        <Stack.Screen name="Playgame" component={Playgame}/>
        <Stack.Screen name="Play20" component={Play20}/>
        <Stack.Screen name="ProfilePool" component={ProfilePool}/>
        <Stack.Screen name="SettingsHome" component={SettingsHome} options = {{headerTitle:"Gamer"}} />
        <Stack.Screen name="AccountSettings" component={AccountSettings  } options = {{headerShown:true, headerTitle:"SOmething", headerRight:() => <Button title = {"Press me"} onPress = {() => alert('Hello woeld')}>Hello world</Button>}}   />
        <Stack.Screen name="MapVeiw" component={MapViewMainer}/>
        <Stack.Screen name="ImageSlider" component={ImageSlider}/>
        <Stack.Screen name="DetailsSettings" component={DetailsSettings} options = {{headerShown:false}} />
        <Stack.Screen name="AddPhotos" component={Photos} options = {{headerShown:false}}/>
        <Stack.Screen name="MapViewMainer" component={MapViewMainer}/>
        <Stack.Screen name="Login" component={Login}/>
        <Stack.Screen name="Checker" component={Checker}/>
        <Stack.Screen name="School" component={School}/>
        <Stack.Screen name="Job" component={Job}/>
        <Stack.Screen name="Hometown" component={Hometown}/>
        <Stack.Screen name="AddPhoto" component={AddPhoto}/>
        <Stack.Screen name="Loader" component={Loader}/>
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
        
      </Stack.Navigator>
    </NavigationContainer>
    
     
  );
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
  console.log("chatty is "+props.chatter)
  return (
    
    <Tab.Navigator options = {{headerShown:"none"}}
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
        if(route.name === 'Feed'){
          if(focused) {
            return <AntDesign name="stepbackward" size={24} color="yellow" />;   
          } 
          return <AntDesign name="stepbackward" size={24} color="black" />;
        }
        
      },
    })}
    
    >
      <Tab.Screen name="Feed" component={MatchList}  />
      <Tab.Screen name="Messages" component={MatchList} />
      <Tab.Screen name="Feed1" component={Name} />
      <Tab.Screen name="Matchlist" component={MatchList}  /> 
      <Tab.Screen name="Settings" component={SettingsHome} />
    </Tab.Navigator>
    
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

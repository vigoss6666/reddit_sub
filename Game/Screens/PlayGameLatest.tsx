import  React, {useState,useRef,useEffect, useContext, useLayoutEffect, useCallback, forwardRef, createRef} from 'react';
import { Text, View, StyleSheet,Dimensions, Animated, Image } from 'react-native';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import AppContext from '../../AppContext'; 
import {createChatThread, updateUser} from '../../networking';
import { firebase } from '../../config'; 
import Draggable from 'react-native-draggable';
import { MaterialIcons, MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as Progress from 'react-native-progress';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { assertValidExecutionArguments } from 'graphql/execution/execute';
import { logTen } from './logTen';
import { filter } from 'underscore';
import GamePreview from './GamePreview'; 
import {filterGamer, getDistanceFromLatLonInKm} from '../../networking'; 

import {LoadScreen} from '../../src/common/Common'; 
const db = firebase.firestore(); 
//@refresh reset
interface PlayGameLatestProps {}





const PlayGameLatest = ({navigation}) => {
  const [bar, setBar] = useState(0);
  const [client, setClient] = useState(); 
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const fadeOpac = useRef(new Animated.Value(0)).current;
  const [questionsIndex, setQuestionsIndex] = useState(0); 
  const insets = useSafeAreaInsets();
  const {width, height} = Dimensions.get('window');   
  const [mainWidth, setMainWidth] = useState()
  const [mainHeight, setMainHeight] = useState()
  const [mainX, setMainX] = useState()
  const [mainY, setMainY] = useState()
  const mailer = useRef(); 
  const [containerHeight, setContainerHeight] = useState(0); 
  const [index, setIndex] = useState(0); 
  const [profiles,setProfiles] = useState([])
  const myContext = useContext(AppContext); 
  const [pageFocused, setPageFocused] = useState(false); 
  
  
  const [questions, setQuestions] = useState([]); 
  const element = createRef();
  const [matchFound, setMatchFound] = useState(false); 


  useEffect(() => {
    navigation.setOptions({
      didFocus:() => console.log("I was chaddi"), 
      headerTitle:false, 
      headerLeft:() => { 
         return  <TouchableOpacity onPress = {() => {resetGame(),navigation.goBack()}} style = {{marginLeft:15}}>
             <Text style = {{fontWeight:'bold', fontSize:17, color:'blue'}}>Back</Text>  
             </TouchableOpacity>
      }, 
      headerRight:() => <TouchableOpacity style = {{marginRight:20}} onPress = {onRefresh}>
        <FontAwesome name="refresh" size={24} color="black" />
      </TouchableOpacity>     
    })
},[]) 
  
   
const resetGame = () => {
  setBar(0); 
  setQuestionsIndex(0); 
}
    
    
   

   useEffect(() => {
    
    db.collection('questions').get().then(onResult => {
         const result = onResult.docs.map(val => val.data()); 
         setQuestions(result); 
    })
  }, [])
  useEffect(() => {
    console.log("i was called")
    setQuestionsIndex(0)
  }, [])

 useEffect(() => {
  if(questionsIndex == 19){
    db.collection('user').doc(userId).update({
      points:firebase.firestore.FieldValue.arrayUnion({
        pointFor:'roundCompleted', 
        point:20, 
        createdAt:new Date()
      })
    })
    resetGame(); 
    navigation.navigate('Play20', {matchFound:matchFound})
  }  

 }, [questionsIndex])  

  



useEffect(() => {
const namer =  [
     {
      "dimension": "wealthy",
      "question": "Would ask for a loan in bad times?",
    },
     {
      "dimension": "empathetic",
      "question": "Will listen to your breakup stories?",
    },
     
  ]
  
}, [])

  
  

  const fadeOp = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    
    Animated.sequence([
      Animated.timing(fadeOpac, {
        toValue: 0,
        useNativeDriver:false,
        duration: 1
      }),
      Animated.timing(fadeOpac, {
        useNativeDriver:false,
        toValue: 1,
        duration: 300
      }),
      Animated.timing(fadeOpac, {
        useNativeDriver:false,
        toValue: 0,
        duration: 300
      })
    ]).start()
  };
  const fadeIn = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 0,
        useNativeDriver:false,
        duration: 1
      }),
      Animated.timing(fadeAnim, {
        useNativeDriver:false,
        toValue: 1,
        duration: 100
      }),
      Animated.timing(fadeAnim, {
        useNativeDriver:false,
        toValue: 0,
        duration: 100
      })
    ]).start()
  };

  
   
  
  const [namer, setNamer] = useState(); 
  const mainView = useRef(); 
  const {user, userId, computeName} = myContext;
  const [demo, setDemo] = useState([])  
  const measure = () => {
      
 }
  const filteredMatched = (arr) => {
    var filtered = arr.filter(
        function(e) {
          return this.indexOf(e.phoneNumber) < 0;
        },
        user.suggestedMatches
    );
    return filtered;  
  }
  useEffect(() => {
    if(user.datingPoolList.length >= 2){
      db.collection('user').where(firebase.firestore.FieldPath.documentId(), 'in', user.datingPoolList).get().then(onResult => {
        const result = onResult.docs.map(val => val.data())
        setDemo(result); 
   })
    }
          
  }, [])
  
  useLayoutEffect(() => {
    if(mailer.current){
        mailer.current.measure((x,y, height, width, px, py) => {
        setContainerHeight(height);
        })
    }
    if(mainView.current){
            mainView.current.measure((x,y, height, width, px, py) => {
            setMainX(px); 
            setMainWidth(width); 
            setMainY(py); 
            setMainHeight(height);
            })
    }
  }, [mainHeight, mainX, mainY, mainWidth, ])

  const addPoints = () => {
      if(client == 'first'){
           
           db.collection('user').doc(demo[index].phoneNumber).update({[questions[questionsIndex].dimension]:firebase.firestore.FieldValue.increment(1),
            votes:firebase.firestore.FieldValue.arrayUnion({
              answeredBy:userId, 
              createdAt:new Date(), 
              dimension:questions[questionsIndex].dimension, 
              question:questions[questionsIndex].question
            })
           })
           return; 
      }
      if(client == 'second'){
        
        db.collection('user').doc(demo[index + 1].phoneNumber).update({[questions[questionsIndex].dimension]:firebase.firestore.FieldValue.increment(1),
          votes:firebase.firestore.FieldValue.arrayUnion({
            answeredBy:userId, 
            createdAt:new Date(), 
            dimension:questions[questionsIndex].dimension, 
            question:questions[questionsIndex].question
          })
         })
        return; 
   }
  }

 
  async function introChecker(client1, client2){
    
    const id = createChatThread(client1, client2); 
    
    const result = await db.collection('introductions').doc(id).get(); 
    if(result.exists){
      return false; 
    }
    return true; 

  }

  
  
  const suggestMatches = () => {
   console.log("hello world")  
    
    if(client == 'first'){
        
        
        const client = demo[index]; 
        db.collection('user').where('state', '==', demo[index].state).get().then(async onResult => {
          const users = onResult.docs.map(val =>val.data()); 
          const usersLogged = logTen(users); 
          const clientLogged = logTen(client)
          
          let matchObject; 
          
          const filterBySuggestions = filterGamer(usersLogged, 'phoneNumber', user.suggestedMatches, null, null);
          const filterBySelf = filterGamer(filterBySuggestions.excludedObjects, 'phoneNumber', [client.phoneNumber], null, null);
          let counter = 0; 
          filterBySelf.excludedObjects.some(async val => {
               

               
               const gender = val.gender; 
               const distance = getDistanceFromLatLonInKm(val.latitude, val.longitude, client.latitude, client.longitude);
               const genderChecker = client.gender == 'male' ? 'female':'male';  
              //  if( distance < client.distancePreference && val.gender == genderChecker && (client.minAgePreference <= val.age && client.maxAgePreference >= val.age ) && (val.charisma == client.charisma || val.creativity == client.creativity || val.empathetic == client.empathetic 
              //   || val.honest == client.honest || val.humor == client.humor || val.looks == client.looks || val.status || val.wealthy == client.wealthy)
              //  ) {
               if( val.gender == genderChecker && (val.charisma == client.charisma || val.creativity == client.creativity || val.empathetic == client.empathetic 
                 || val.honest == client.honest || val.humor == client.humor || val.looks == client.looks || val.status || val.wealthy == client.wealthy)
                ) {
                
                 const _id = createChatThread(client.phoneNumber, val.phoneNumber); 
                 return db.collection('introductions').doc(_id).get().then(onDoc => {
                  
                   if(onDoc.exists == false){
                    setMatchFound(true);  
                    db.collection('user').doc(userId).set({suggestedMatches:firebase.firestore.FieldValue.arrayUnion(val.phoneNumber)}, {merge:true})
                    navigation.navigate('Endorsement', {client:clientLogged,user:val })
                    return true;      
                   }
                 })
               }
              
          })

        // for(let x = 0;  x < filterBySelf.excludedObjects.length; x++ ){
        //   const gender = filterBySelf.excludedObjects[x].gender; 
        //        const distance = getDistanceFromLatLonInKm(val.latitude, val.longitude, client.latitude, client.longitude);
        //        const genderChecker = client.gender == 'male' ? 'female':'male';  
        //       //  if( distance < client.distancePreference && val.gender == genderChecker && (client.minAgePreference <= val.age && client.maxAgePreference >= val.age ) && (val.charisma == client.charisma || val.creativity == client.creativity || val.empathetic == client.empathetic 
        //       //   || val.honest == client.honest || val.humor == client.humor || val.looks == client.looks || val.status || val.wealthy == client.wealthy)
        //       //  ) {
                
        //        if( filterBySelf.excludedObjects[x].gender == genderChecker && (filterBySelf.excludedObjects[x].charisma == client.charisma || filterBySelf.excludedObjects[x].creativity == client.creativity || filterBySelf.excludedObjects[x].empathetic == client.empathetic 
        //          || filterBySelf.excludedObjects[x].honest == client.honest || filterBySelf.excludedObjects[x].humor == client.humor || filterBySelf.excludedObjects[x].looks == client.looks || filterBySelf.excludedObjects[x].status == client.status || filterBySelf.excludedObjects[x].wealthy == client.wealthy)
        //         ) {
                
        //          const _id = createChatThread(client.phoneNumber, val.phoneNumber); 
        //          db.collection('introductions').doc(_id).get().then(onDoc => {
                  
        //            if(onDoc.exists == false){
        //             setMatchFound(true);  
        //             db.collection('user').doc(userId).set({suggestedMatches:firebase.firestore.FieldValue.arrayUnion(val.phoneNumber)}, {merge:true})
                    
        //             navigation.navigate('Endorsement', {client:clientLogged,user:val })
                    
                    
        //            }
        //          })
        //        }

        // }
          
           
        })
        
   }
   if(client == 'second'){
    const client = demo[index + 1]; 
    db.collection('user').where('state', '==', demo[index + 1].state).get().then(async onResult => {
      const users = onResult.docs.map(val =>val.data()); 
      const usersLogged = logTen(users); 
      const clientLogged = logTen(client)
      
      let matchObject; 
      
      const filterBySuggestions = filterGamer(usersLogged, 'phoneNumber', user.suggestedMatches, null, null);
      const filterBySelf = filterGamer(filterBySuggestions.excludedObjects, 'phoneNumber', [client.phoneNumber], null, null);
      
      filterBySelf.excludedObjects.some(async val => {
           const gender = val.gender; 
           const distance = getDistanceFromLatLonInKm(val.latitude, val.longitude, client.latitude, client.longitude);
           const genderChecker = client.gender == 'male' ? 'female':'male';  
          //  if( distance < client.distancePreference && val.gender == genderChecker && (client.minAgePreference <= val.age && client.maxAgePreference >= val.age ) && (val.charisma == client.charisma || val.creativity == client.creativity || val.empathetic == client.empathetic 
          //    || val.honest == client.honest || val.humor == client.humor || val.looks == client.looks || val.status || val.wealthy == client.wealthy)
          //   ) {
            if( val.gender == genderChecker && (val.charisma == client.charisma || val.creativity == client.creativity || val.empathetic == client.empathetic 
              || val.honest == client.honest || val.humor == client.humor || val.looks == client.looks || val.status || val.wealthy == client.wealthy)
             ) {
              
             const _id = createChatThread(client.phoneNumber, val.phoneNumber); 
             return db.collection('introductions').doc(_id).get().then(onDoc => {
              
               if(onDoc.exists == false){
                db.collection('user').doc(userId).set({suggestedMatches:firebase.firestore.FieldValue.arrayUnion(val.phoneNumber)}, {merge:true})
                navigation.navigate('Endorsement', {client:clientLogged,user:val })   
                return true; 
               }
             })
           }
      })
      
       
    })  
    
     
     
      
} 
}
const onRefresh = () => {
db.collection('user').doc(userId).set({suggestedMatches:[]}, {merge:true}) 
}
 
 


  const valer = fadeAnim.interpolate({
    inputRange:[0,1],
    outputRange:['white','green'], 
 })

  function measureMain(gesture){
    
    if(gesture.nativeEvent.pageY > mainY && gesture.nativeEvent.pageY < mainY + mainHeight && gesture.nativeEvent.pageX > mainX && gesture.nativeEvent.pageX < mainX + mainWidth){
      return true;   
    }      
    return false; 
  }

  

  const firstTemplate = () => {
       if(demo.length){
         return <View>
         
           {demo[index].profilePic ? <Image source = {{uri:demo[index].profilePic}} style = {{height:80, width:80, borderRadius:40}}/>:<MaterialIcons name="account-circle" size={80} color="black" />} 
         
         <Text style = {{alignSelf:'center', fontWeight:'bold', fontSize:11, marginTop:5, marginLeft:-10}}>{computeName(demo[index])}</Text>
         
         </View>
       }
  }
  const secondTemplate = () => {
       if(demo.length){
        return <View>
         
        {demo[index + 1].profilePic ? <Image source = {{uri:demo[index + 1].profilePic}} style = {{height:80, width:80, borderRadius:40}}/>:<MaterialIcons name="person" size={80} color="black" />} 
      
      <Text style = {{alignSelf:'center', fontWeight:'bold', fontSize:11, marginTop:5, }}>{computeName(demo[index + 1])}</Text>
      
      </View>
       }
  }
  const incrementIndex = () => {
    
    if(index + 1 < demo.length -1 ) {
        setIndex(index + 1)
   }
    if(index + 1 == demo.length -1){
      setIndex(0)
    }
  }
  const questionsIndexIncrement = () => {
      if(questionsIndex < questions.length - 1){
           setQuestionsIndex(questionsIndex + 1); 
      } 
  }

  const onDragRelease = (gesture) => {
    
    const measured = measureMain(gesture); 
    if(measured){
       fadeOp()
       addPoints()
       suggestMatches() 
       fadeIn()
       incrementIndex();   
       questionsIndexIncrement(); 
       
       setBar(bar + 0.05)
       
    }
    
  }
  if(questions.length){
  }
  
   
  
   if(user.datingPoolList.length < 2){
     return <View style = {{flex:1, backgroundColor:'black', justifyContent:'center', alignItems:'center', marginLeft:30, marginRight:30 }}>
       <Text style = {{color:'white', fontSize:40, fontWeight:'bold'}}>Not enough contacts</Text>
       <Text style = {{color:'white', fontStyle:'italic'}}>Please add some contacts in your dating pool list to play the game</Text>
     </View>
    
   }
    return (
        <View style={{flex:1, paddingBottom:insets.bottom}}>
                <View style = {{flex:0.3,}}>
                <View style = {{marginTop:10, marginLeft:30, marginRight:30}}>
                <Text style = {{alignSelf:'flex-end', marginBottom:10}}> {questionsIndex}/{questions.length -1}</Text>    
                <Progress.Bar progress={bar} width={Dimensions.get('window').width -60   } height = {20} />
                <Text style = {{marginTop:30,  marginBottom:10,fontSize:15, fontWeight:'bold',}} numberOfLines = {3} textBreakStrategy = {'highQuality'}> {questions.length ? questions[questionsIndex].question:null} </Text>
                </View>    
                
                </View>
                <View style = {{flex:0.3, }}>
                <Animated.View ref = {mainView}  style = {{position:'absolute', left:width - 300, backgroundColor:valer, height:200, width:200, borderRadius:100, justifyContent: 'center',alignItems:'center'}}>
                <MaterialIcons name="person" size={180} color="black" />
                </Animated.View>    
                <Animated.View style = {{opacity:fadeOpac, position:'absolute', top:5, right:50}}>
                <View style = {{flexDirection:"row", alignItems:'center'}}>
               <Text style = {{fontWeight:"bold"}}>+1</Text> 
               <MaterialCommunityIcons name="lightbulb-on" size={24} color="black" />
               </View>
               <Text>{ questions.length && questionsIndex > 0 ? questions[questionsIndex - 1].dimension:null }</Text>   
                </Animated.View>
                </View>
                
                <View style = {{flex:0.4, }} ref = {mailer}>
               <Draggable x={30} y={containerHeight - 250} isCircle  onDragRelease = {(gesture) => onDragRelease( gesture)} shouldReverse = {true} onPressIn = {() => setClient('first')}>
                   {firstTemplate()}
               </Draggable>    
               
               <Draggable x={width - 130} y={containerHeight - 250}  isCircle  onDragRelease = {( gesture) => {onDragRelease( gesture)}} onPressIn = {() => setClient('second')} shouldReverse>
                   {secondTemplate()}
               </Draggable>    
               </View> 
              
              
              
        </View>
      )
  
  
  
}

export default PlayGameLatest;

const styles = StyleSheet.create({
  container: {flex:1}
});

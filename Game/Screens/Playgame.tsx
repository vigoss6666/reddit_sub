import  React, {useState,useLayoutEffect,useRef, useEffect, forwardRef, useCallback, useContext} from 'react';
import { View, StyleSheet,  TextInput,TouchableOpacity,ScrollView,Image, Button,FlatList,Picker,PanResponder,Animated, TouchableWithoutFeedback, SafeAreaView, Dimensions, TouchableHighlightBase,UIManager, findNodeHandle,InteractionManager} from 'react-native';
import { useMutation,useQuery } from '@apollo/react-hooks';
import {Text} from 'react-native-elements'; 
import * as Progress from 'react-native-progress';
import { MaterialIcons } from '@expo/vector-icons';
import Draggable from 'react-native-draggable';
import { forScaleFromCenterAndroid } from '@react-navigation/stack/lib/typescript/src/TransitionConfigs/CardStyleInterpolators';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {HeaderBar} from '../../src/common/Common';
import { gql } from 'apollo-boost';
import {firebase} from '../../config'; 
import { random } from 'underscore';
import { firestore } from 'firebase';
import AppContext from '../../AppContext'; 
import {updateUser} from '../../networking';
function create_UUID(){
  var dt = new Date().getTime();
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = (dt + Math.random()*16)%16 | 0;
      dt = Math.floor(dt/16);
      return (c=='x' ? r :(r&0x3|0x8)).toString(16);
  });
  return uuid;
}



const db = firebase.firestore(); 
export default function Playgame({navigation}) {
  
  const myContext = useContext(AppContext); 
    const {user, userId} = myContext;
  let users = useRef([]).current; 

  let dragText1 = useRef().current; 
  let dragText2 = useRef().current;
  let firstTextTemplate = useRef().current; 
  let secondTextTemplate = useRef().current;
  const [movedElement, setMovedElement] = useState(''); 
  const [dimension, setDimension] = useState(); 
 const [gamer, updateState] = React.useState();
 const forceUpdate = React.useCallback(() => updateState({}), []);
 const [loadme, setLoadme] = useState(); 
 const mainServerUsers = useRef([]).current; 
 let firstImage = useRef().current;
 let secondImage = useRef().current; 
 
 
 let [secondDragX, setsecondDragX] = useState(300); 
 let [secondDragY, setSecondDragY] = useState(100); 
 

 const suggestMatches = () => {
   //console.log(mainServerUsers)
   let simAttributes = []; 
   const matches = []; 
   //const mainer = mainServerUsers[Math.floor(Math.random() * mainServerUsers.length)];
   if(mainServerUsers){
   const random = Math.floor(Math.random() * mainServerUsers.length);
   const mainer = mainServerUsers.filter(val => val.name = "said"); 
   const randomElement = mainer[0];  
   console.log(randomElement)
   //console.log(randomElement)
   for(let x = 0; x < demoDatabase.length; x ++ ){
      // if( Math.log2(demoDatabase[x].Emphatatic) == Math.log2(randomElement.Emphatatic)){
      //    simAttributes.push('Emphatatic'); 
      // }
     if( Math.log2(demoDatabase[x].Humor) == Math.log2(randomElement.Humor)){
        simAttributes.push({trait:'Humor', match:demoDatabase[x].name, element:randomElement.name}); 
     }
     if( Math.log2(demoDatabase[x].charisma) == Math.log2(randomElement.charisma)){
      simAttributes.push({trait:'charisma', match:demoDatabase[x].name, element:randomElement.name}); 
     }
     if( Math.log2(demoDatabase[x].creativity) == Math.log2(randomElement.creativity)){
       
      simAttributes.push({trait:'creativity', match:demoDatabase[x].name, element:randomElement.name}); 
     }
     if( Math.log2(demoDatabase[x].honest) == Math.log2(randomElement.honest)){
       
      simAttributes.push({trait:'honest', match:demoDatabase[x].name, element:randomElement.name}); 
      
     }
     if( Math.log2(demoDatabase[x].looks) == Math.log2(randomElement.looks)){
       
      simAttributes.push({trait:'looks', match:demoDatabase[x].name, element:randomElement.name}); 
      
     }
     if( Math.log2(demoDatabase[x].status) == Math.log2(randomElement.status)){
       
      simAttributes.push({trait:'status', match:demoDatabase[x].name, element:randomElement.name}); 
      
     }
     if( Math.log2(demoDatabase[x].wealthy) == Math.log2(randomElement.wealthy)){
      
      simAttributes.push({trait:'wealthy', match:demoDatabase[x].name, element:randomElement.name }); 
     }
     if(simAttributes.length  <= 3 ){
      console.log("No 3 attributes match");  
      simAttributes = []; 
     }
     if(simAttributes.length >= 3){
      matches.push(demoDatabase[x]);
      console.log("mainServer users"+mainServerUsers[0]._id); 
      break;   
    }
   }
   //console.log(simAttributes)
   console.log("matches is"+matches.length)
   console.log(simAttributes)
   if(matches.length > 0){
      const d = new Date(); 
      console.log("match is"+ matches[0])
      console.log(randomElement._id)
      const matchId = create_UUID(); 
      db.collection('user').doc(randomElement._id).update({matches:firebase.firestore.FieldValue.arrayUnion({match:matches[0]._id, matchmaker:'trialUser', createdAt: d.getTime(), matchId})}); 
      //db.collection('user').doc(matches[0]._id).update({matches:firebase.firestore.FieldValue.arrayUnion({match:randomElement._id, matchmaker:'trialUser', createdAt: d.getTime(), matchId})}); 
      db.collection('matches').doc(matchId).set({client1: randomElement._id, client2: matches[0]._id, discoveredBy:'trialUser', createdAt: d.getTime()})
      db.collection('user').doc('trial_user').update({matches:firebase.firestore.FieldValue.arrayUnion(matchId), matchDiscovered:{num:firebase.firestore.FieldValue.increment(1), matchId}}); 
      return {user:matches[0], client:randomElement, matchId}

   }
   else {

      return false; 
   }
   }

   
}
 
  
 
  const randomNess = () => {
     
     const arr = [0,1,1];
     const randomElement = arr[Math.floor(Math.random() * arr.length)]; 
     console.log("randomElelment is "+randomElement);
     if(randomElement == 0){
        navigation.navigate('Endorsement')
        return; 
     }
     navigation.navigate('Endorsement')
     console.log("go to the Endorsement page"); 
  }
  


  const [interaction, setInteraction] = useState(); 
  useEffect(() => {
    InteractionManager.runAfterInteractions(() => {
      setInteraction(true);
      if(mailer.current){
        //  mailer.current.measureInWindow((x,y) => {
           
        //     setX(x); 
        //     setY(y); 

        //  }) 
      } 
    });
    
    
    return () => {
      setQuestion(0) 
    }
  }, [])
  function randomNoRepeats(arr,) {
    var copy = arr.slice(0);
    return function() {
      if (copy.length < 1) { copy = arr.slice(0); }
      var index = Math.floor(Math.random() * copy.length);
      var item = copy[index];
      copy.splice(index, 1);
      return item;
    };
  }
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

  const fadeOut = () => {
    // Will change fadeAnim value to 0 in 5 seconds
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 1000, 
      useNativeDriver:false, 
    }).start();
  };
  useEffect(() => {
    navigation.setOptions({
      headerTitle:false
    })
  },[])
 useEffect(() => {
    const result = db.collection('user').doc(userId).onSnapshot((doc) => {
        const result =  db.collection('user').where(firebase.firestore.FieldPath.documentId(), 'in', doc.data().datingPoolList).get().then(result1 => {
             result1.docs.map(val => users.push(val.data().name));
             result1.docs.map(val => mainServerUsers.push(Object.assign({},val.data(), {_id:val.id})));
             
             
             setLoadme(1); 
             //setUsers(['aijax', 'airband'])
        })  
    })
 },[users, mainServerUsers])   

 

  const setFirstText = () => {
    const chooser = randomNoRepeats(users);
    const firstText = chooser();
    firstTextTemplate = firstText; 
    const firstImager = mainServerUsers.filter(val => val.name == firstText); 
    if(firstImager.length > 0 ){
       firstImage = firstImager[0].profilePic; 
    }
    else {
       firstImage = ""; 
    }
     

    // if(data){
    //   const result =  data.getDatingPoolList.data.filter(val => val.firstname == firstText);
    //   dragText1 = result[0] || {}; 
    // }
    return firstText; 
  }
  const setSecondText = () => {
    const chooser = randomNoRepeats(users);
    
    const secondText = chooser(); 
    // if(data){
    //   const result =  data.getDatingPoolList.data.filter(val => val.firstname == secondText);
    //   dragText2 = result[0] || {};  
    // }
    if(secondText == firstTextTemplate){
       const finaler = chooser(); 
       secondTextTemplate = finaler; 
       const firstImager = mainServerUsers.filter(val => val.name == finaler); 
    if(firstImager.length > 0){
       secondImage = firstImager[0].profilePic; 
    }
    else {
       secondImage = ""; 
    }
       return finaler; 
    }
    secondTextTemplate = secondText; 
    const firstImager = mainServerUsers.filter(val => val.name == secondText); 
    if(firstImager.length > 0 ){
       secondImage = firstImager[0].profilePic; 
    }
    else {
       secondImage = ""; 
    }
    return secondText; 
  }
  
const _sendToServer = () => {
   if(movedElement == "first"){
    //setPoints({variables:{setPoints:{user:dragText1._id, dimension:questions[question].dimension}}})
    db.collection('user').where('name','==',firstTextTemplate).get().then((result) => {
       const finaler = result.docs.map(val => val.id); 
       db.collection('user').doc(finaler[0]).update({[questions[question].dimension]:firebase.firestore.FieldValue.increment(1)}); 
       
    })
  }
   else if (movedElement == "second"){
    //db.collection('user').doc().where('name', '==', 'zaid').set({[questions[question].dimension]:1})
    //setPoints({variables:{setPoints:{user:dragText2._id, dimension:questions[question].dimension}}})
    db.collection('user').where('name','==',secondTextTemplate).get().then((result) => {
      const finaler = result.docs.map(val => val.id); 
      db.collection('user').doc(finaler[0]).update({[questions[question].dimension]:firebase.firestore.FieldValue.increment(1)}); 
      
   })
  }
}
   
  

  const questions = [
    {dimension:'creativity', question:'Most likely to make a guitar out of office supplies'}, 
    {dimension:'charisma', question:`Would influence others by developing mutual liking
    and respect`},
    {dimension:'looks', question:'Who is better Looking'},
    {dimension:'narcissicstic', question:'Will look in the mirror ten times a day?'},
    {dimension:'sociopath', question:'Will stock your facebook profile?'},
    {dimension:'wealthy', question:'Would ask for a loan in bad times?'}, 
    {dimension:'status', question:'Most likely to travel by a private placne?'},
    {dimension:'honest', question:'Will keep his word no matter what?'},
    {dimension:'psychopath', question:'Will poison you in your sleep?'},
    {dimension:'Humor', question:'Will make you laugh in your tough times?'},
    {dimension:'Emphatatic', question:'Will listen to your breakup stories?'}, 
    {dimension:'status', question:'Takes his status too seriously?'},
    {dimension:'honest', question:'Will keep his word no matter what?'},
    {dimension:'narcissicstic', question:'Takes a selfie every 5 mins?'},
    {dimension:'sociopath', question:'Will stock your social Accounts?'},
    {dimension:'creativity', question:'Most likely to make a guitar out of office supplies'}, 
    {dimension:'status', question:'Most like would travel by a private plane?'},
    {dimension:'honest', question:'Will keep his word no matter what?'},
    {dimension:'narcissicstic', question:'Will look in the mirror ten times a day?'},
    {dimension:'Humor', question:'Will make you laugh on a bad day?'},
  ]
 
  const [bar, setBar] = useState(0);  
  const [question,setQuestion] = useState(0);  
  const [width,setWidth] = useState();
  const [x,setX] = useState(0); 
  const [y,setY] = useState(0); 
  const [updated, setUpdated] = useState(false); 
  const [height, setHeight] = useState();  
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const fadeOpac = useRef(new Animated.Value(0)).current;
  
  let mailer = useRef(); 
  const [loader, setLoader] = useState(); 

  // useEffect(() => {
  //   setLoader(1) 
  // }, [loader])

  
  // console.log("value of new y"+ y)  
  // console.log("value of new x"+x)
   
   
//   console.log(dragText1)
//   console.log(dragText2)
//   console.log(updated)
  
  
//   navigation.addListener('didFocus', () => setUpdated(true))
  const valer = fadeAnim.interpolate({
     inputRange:[0,1],
     outputRange:['white','green'], 
  })
  useLayoutEffect(() => {
      
      if(mailer.current){
       mailer.current.measure((x,y, height, width, px, py) => {
       
       
       setX(px); 
       setWidth(width); 
       setY(py); 
       setHeight(height);
       //updateState(gamer + 1)
         })
      }
      
   
    
  }, [x,y, width, height])
  
   
//   console.log("value of y is :" +y); 
//   console.log("value of x is :" +x);
setFirstText()
setSecondText();


  
  
const templated =  <View style = {{height:100, width:100, borderRadius:50, justifyContent:"center", alignItems:'center'}}>
  
  {secondImage == "" ? <MaterialIcons name="account-circle" size={70} color="black" /> : <Image source = {{uri:secondImage  }} style = {{ height:80,width:80,resizeMode:'cover', borderRadius:40}}/>}
  <Text style = {{marginTop:5, fontWeight:'bold', marginBottom:3}}>{secondTextTemplate}</Text>
</View>

const firstTemplated = <View style = {{height:100, width:100, borderRadius:50, justifyContent:"center", alignItems:'center'}}>
  
{firstImage == "" ? <MaterialIcons name="account-circle" size={70} color="black" /> : <Image source = {{uri:firstImage}} style = {{ height:80,width:80,resizeMode:'cover', borderRadius:40}}/>}
<Text style = {{marginTop:5, fontWeight:'bold', marginBottom:3}}>{firstTextTemplate}</Text>
</View> 
  
  
  
  
  
  
  function measure(gesture){
    
    const isMatch = suggestMatches(); 
    console.log("isMatcch"+isMatch)
    if(isMatch){
       
       navigation.navigate('Endorsement', {isMatch})
    }
     
    //console.log(gesture)
    
    //Marker.measure((x))

     
   if(gesture.nativeEvent.pageY > y && gesture.nativeEvent.pageY < y + height && gesture.nativeEvent.pageX > x && gesture.nativeEvent.pageX < x + width){
      //setPoints({variables:{setPoints:{user:"zaid", dimension:"creativity"}}});
      _sendToServer()
      setSecondDragY(425)
      console.log("In drag area")
      if(question == questions.length -1){
        setQuestion(0)
        setBar(0)
        //navigation.navigate('Play20'); 
        
        randomNess()
        
        return;  
      }
      setQuestion(question + 1)
      setBar(bar + 0.05)
      fadeIn()
      fadeOp()
   }
  };
      
        return(
          <View style = {{flex:1,}} >
          <View style = {{flex:0.1}}>
          
          </View>
          <View 
          
          style = {{flex:0.6, marginLeft:30, marginRight:30}}
          onLayout={(event) => {
            var {x, y, width, height,} = event.nativeEvent.layout;
            
            
          }} 
          > 
          
          <Text style = {{alignSelf:'flex-end',marginBottom:10}}> {question}/{questions.length}</Text>
          <Progress.Bar progress={bar} width={Dimensions.get('window').width -60   } height = {20} />
          
          <Text style = {{marginTop:30, alignSelf:"center", marginBottom:20,fontSize:15}}> {questions[question].question} </Text>
          <View style = {{borderBottomWidth:1, borderBottomColor:'black', marginTop:30,}} 
          
          />
          <View style = {{justifyContent:'center', alignItems:'center', flexDirection:'row'}}>
          <Animated.View
          style = {[{justifyContent:'center', alignItems:'center',marginTop:20, borderRadius:100, borderWidth:10, marginBottom:20,height:200, width:200,flexDirection:'row', backgroundColor:valer}]}
          ref = {mailer}  
          onLayout = {(e) => {
            let {x,y, height, width} = e.nativeEvent.layout; 
            
         }}
          >
          <MaterialIcons name="person" size={100} color="black" />
          
          </Animated.View>
          <Animated.View style = {{alignSelf:"flex-start",marginLeft:-20, marginTop:20,alignItems:"center",opacity:fadeOpac}}>
           <View style = {{flexDirection:"row"}}>
           <Text style = {{fontWeight:"bold"}}>+1</Text> 
           <MaterialCommunityIcons name="lightbulb-on" size={24} color="black" />
           </View>
           <Text>{question > 0 ? questions[question - 1].dimension: "creativity" }</Text>
          </Animated.View>
          </View> 
          <View style = {{borderBottomWidth:1, borderBottomColor:'black'}}/>
          
          
          </View>
          <View style = {{flex:0.2, flexDirection:'row'}}>
          <Draggable 
          x={75} 
          y={100} 
          renderSize={100} 
          children = {firstTemplated}
          renderText={firstTextTemplate} 
          isCircle 
          shouldReverse
          onShortPressRelease={()=>alert('touched!!')} 
          onDragRelease = {(gesture) => measure(gesture)} 
          onPressIn = {() => setMovedElement("first")}/>
          <Draggable 
          
          x={300} 
          y={100} 
          shouldReverse 
          renderSize={120} 
          onDrag =  {(event, gesture) => console.log(event)}
          renderText={secondTextTemplate} 
          children = {templated}
          isCircle 
          onRelease = {(event) => console.log(event)}
          onShortPressRelease={()=>alert('touched!!')} 
          onDragRelease = {(gesture) => measure(gesture)} 
          onPressIn = {() => setMovedElement("second")}/>
          </View>
          <View style = {{flex:0.1}}>
            
          </View>
          </View>
          )
      
      
      
}
import  React, {useState,useLayoutEffect,useRef, useEffect, forwardRef, useCallback} from 'react';
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
 

const SET_EVENT = gql`
 mutation namer($event:event1! = {type:"roundCompleted"}){
   setEvent(event:$event)
 }

`
//setPoints(setPoints: setPoints1!): Boolean!
const SET_POINTS = gql`
mutation namer($setPoints:setPoints1!){
  setPoints(setPoints:$setPoints)
}
`
//getDatingPoolList: userReturnList!
const GET_DATING_POOL = gql`
 query {
    getDatingPoolList {
       data {
          firstname
          _id
       }
    }
 }
`
const demoDatabase = [{
  "Emphatatic": 1,
  "Humor": 1,
  "_id": "_id3",
  "charisma": 1,
  "creativity": 1,
  "honest": 1,
  "looks": 1,
  "name": "Seema",
  "narcissicstic": 7,
  "profilePic": "https://i.pinimg.com/originals/bc/cc/3a/bccc3a73573a69385ae9e9dce82a952f.jpg",
  "psychopath": 2,
  "sociopath": 6,
  "status": 1,
  "wealthy": 1,
  "gender": "female", 
  "state": "california"
}, 
{
  "Emphatatic": 1,
    "Humor": 1,
    "_id": "_id3",
    "charisma": 1,
    "creativity": 1,
    "honest": 1,
    "looks": 1,
    "name": "Samantha",
    "narcissicstic": 7,
    "profilePic": "https://i.pinimg.com/originals/bc/cc/3a/bccc3a73573a69385ae9e9dce82a952f.jpg",
    "psychopath": 2,
    "sociopath": 6,
    "status": 1,
    "wealthy": 1,
    "gender":"female", 
    "state":"california"
}, 
{
    "Emphatatic": 3,
    "Humor": 1,
    "_id": "_id3",
    "charisma": 9,
    "creativity": 26,
    "honest": 4,
    "looks": 9,
    "name": "katherine",
    "narcissicstic": 7,
    "profilePic": "https://i.pinimg.com/originals/bc/cc/3a/bccc3a73573a69385ae9e9dce82a952f.jpg",
    "psychopath": 2,
    "sociopath": 6,
    "status": 7,
    "wealthy": 5,
    "gender":"female", 
    "state":"california"
}
]




// const data = [
//     {
//     _id:"1234", 
//     name:"Huraira lakdawala", 
//     firstname:"Huraira", 
//     image:""
//     },
//     {
//         _id:"1235", 
//         name:"nihal modal", 
//         firstname:"nihal", 
//         image:""
//     },
//        {
//         _id:"1236", 
//         name:"hafsa shaikh", 
//         firstname:"hafsa", 
//         image:""
//         },
//         {
//             _id:"1237", 
//             name:"zaheer shaikh", 
//             firstname:"zaheer", 
//             image:""
//            },
//          {
//                 _id:"1238", 
//                 name:"yasir shaikh", 
//                 firstname:"yasir", 
//                 image:""
//         }, 

// ]


export default function Playgame({navigation}) {
  //let [users, setUsers] = useState(['zaid', 'zaheer']);   
  let users = useRef([]).current; 
//   useEffect(() => {
//     demoDatabase.map(val => {
//        db.collection('user').doc().set(val).then(() => console.log("added")).catch(() => console.log("didnt run the transaction"))
//     })
//  },[])
  
//   //const [setEvent] = useMutation(SET_EVENT);
  let dragText1 = useRef().current; 
  let dragText2 = useRef().current;
  let firstTextTemplate = useRef().current; 
  let secondTextTemplate = useRef().current;
  const [movedElement, setMovedElement] = useState(''); 
//   //const [setPoints, ] = useMutation(SET_POINTS); 
//   //const {data,loading,error} = useQuery(GET_DATING_POOL); 

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
     //setEvent()
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
  

//   if(data){
//     const result = data.getDatingPoolList.data.map(val => val.firstname); 
//     users = result; 
//   }

  const [interaction, setInteraction] = useState(); 
  
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
    const result = db.collection('user').doc('+917208110384').onSnapshot((doc) => {
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
    {dimension:'humor', question:'Will make you laugh in your tough times?'},
    {dimension:'honest', question:'Will keep his word no matter what?'},
    {dimension:'wealthy', question:'Would ask for a loan in bad times?'}, 
    {dimension:'status', question:'Most likely to travel by a private placne?'},
    {dimension:'empathetic', question:'Will listen to your breakup stories?'}, 
    {dimension:'narcissism', question:'Will look in the mirror ten times a day?'},
   ]

   
   useEffect(() => {
      
   }, [])
 
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
          //imageSource = {{uri:"data:image/jpeg;base64,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"}}
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
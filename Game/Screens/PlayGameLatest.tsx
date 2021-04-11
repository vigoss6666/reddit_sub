import  React, {useState,useRef,useEffect, useContext, useLayoutEffect, useCallback, forwardRef, createRef} from 'react';
import { Text, View, StyleSheet,Dimensions, Animated, Image } from 'react-native';
import AppContext from '../../AppContext'; 
import {updateUser} from '../../networking';
import { firebase } from '../../config'; 
import Draggable from 'react-native-draggable';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as Progress from 'react-native-progress';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { assertValidExecutionArguments } from 'graphql/execution/execute';
import { logTen } from './logTen';
import { filter } from 'underscore';
const db = firebase.firestore(); 
//@refresh reset
interface PlayGameLatestProps {}
const computeName = (obj) => {
    if(obj.name){
       return obj.name
    }
    if(obj.firstName && obj.lastName){
       return obj.firstName+obj.lastName
    }
    return obj.firstName
}

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
  const [questions, setQuestions] = useState([]); 
  const element = createRef();
  const [matchFound, setMatchFound] = useState(false); 


 console.log(questions.length)
  

   useEffect(() => {
    console.log("i was called")  
    db.collection('questions').get().then(onResult => {
         const result = onResult.docs.map(val => val.data()); 
         setQuestions(result); 
    })
  }, [])

 useEffect(() => {
  if(questionsIndex == 19){
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
  const {user, userId} = myContext;
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
    db.collection('user').where(firebase.firestore.FieldPath.documentId(), 'in', user.datingPoolList).get().then(onResult => {
         const result = onResult.docs.map(val => val.data())
         setDemo(result); 
    })      
  }, [])
  console.log("compinent was rendered")
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
           
           db.collection('user').doc(demo[index].phoneNumber).update({[questions[questionsIndex].dimension]:firebase.firestore.FieldValue.increment(1)})
           return; 
      }
      if(client == 'second'){
        
        db.collection('user').doc(demo[index + 1].phoneNumber).update({[questions[questionsIndex].dimension]:firebase.firestore.FieldValue.increment(1)})
        return; 
   }
  }
  const suggestMatches = () => {
    if(client == 'first'){
        console.log("updating this client")
        console.log("updating this dimension"+ questions[questionsIndex].dimension)
        console.log(demo[index])
        const client = demo[index]; 
        db.collection('user').where('state', '==', demo[index].state).get().then(onResult => {
          const users = onResult.docs.map(val =>val.data()); 
          const usersLogged = logTen(users); 
          const clientLogged = logTen(client)
          
          let matchObject; 
          const filtered = filteredMatched(usersLogged); 
           filtered.map(val => {
               if(val.charisma == client.charisma || val.creativity == client.creativity || val.empathetic == client.empathetic 
                 || val.honest == client.honest || val.humor == client.humor || val.looks == client.looks || val.status || val.wealthy == client.wealthy
                ) {
                matchObject = val;     
               }
          })
          if(Object.keys(matchObject).length){
               console.log("match found"); 
               db.collection('user').doc(userId).set({suggestedMatches:firebase.firestore.FieldValue.arrayUnion(matchObject.phoneNumber)}, {merge:true})
               navigation.navigate('Endorsement', {client:clientLogged,user:matchObject })
          }  
        })
        return; 
   }
   if(client == 'second'){
     console.log("updating this client")
     console.log("updating this dimension"+ questions[questionsIndex].dimension)
     console.log(demo[index + 1])
     
     return; 
} 
}

 useEffect(() => {
     navigation.setOptions({
       headerTitle:false, 
       headerLeft:() => { 
          return  <TouchableOpacity onPress = {() => navigation.goBack()} style = {{marginLeft:15}}>
              <Text style = {{fontWeight:'bold', fontSize:17, color:'blue'}}>Back</Text>  
              </TouchableOpacity>
       }     
     })
 },[])
 


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
         
         <Text style = {{alignSelf:'center', fontWeight:'bold', fontSize:17, marginTop:5, marginLeft:-10}}>{demo[index].name}</Text>
         
         </View>
       }
  }
  const secondTemplate = () => {
       if(demo.length){
        return <View>
         
        {demo[index + 1].profilePic ? <Image source = {{uri:demo[index + 1].profilePic}} style = {{height:80, width:80, borderRadius:40}}/>:<MaterialIcons name="person" size={80} color="black" />} 
      
      <Text style = {{alignSelf:'center', fontWeight:'bold', fontSize:17, marginTop:5, }}>{demo[index + 1].name}</Text>
      
      </View>
       }
  }
  const incrementIndex = () => {
    if(index + 1 < demo.length -1 ) {
        setIndex(index + 1)
   }
  }
  const questionsIndexIncrement = () => {
      if(questionsIndex < questions.length - 1){
           setQuestionsIndex(questionsIndex + 1); 
      } 
  }

  const onDragRelease = (gesture) => {
    console.log("ref is")  
    console.log(element.current)  
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
    console.log(questions[0].question)
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
      );
  
  return <View>
      <Text>Loading</Text>
  </View>
  
};

export default PlayGameLatest;

const styles = StyleSheet.create({
  container: {flex:1}
});

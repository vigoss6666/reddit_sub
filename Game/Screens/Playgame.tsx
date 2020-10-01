import  React, {useState,useLayoutEffect,useRef, useEffect} from 'react';
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




const data = [
    {
    _id:"1234", 
    name:"Huraira lakdawala", 
    firstname:"Huraira", 
    image:""
    },
    {
        _id:"1235", 
        name:"nihal modal", 
        firstname:"nihal", 
        image:""
    },
       {
        _id:"1236", 
        name:"hafsa shaikh", 
        firstname:"hafsa", 
        image:""
        },
        {
            _id:"1237", 
            name:"zaheer shaikh", 
            firstname:"zaheer", 
            image:""
           },
         {
                _id:"1238", 
                name:"yasir shaikh", 
                firstname:"yasir", 
                image:""
        }, 

]


export default function Playgame({navigation}) {
  let users = ['David', 'Amy', 'Arthur', 'Mark', 'Kevin', 'Eric'];
  const [setPoints, ] = useMutation(SET_POINTS); 
  const {data,loading,error} = useQuery(GET_DATING_POOL); 
  if(data){
    const result = data.getDatingPoolList.data.map(val => val.firstname); 
    users = result; 
  }
  const [interaction, setInteraction] = useState(); 
  useEffect(() => {
    InteractionManager.runAfterInteractions(() => {
      setInteraction(true); 
    });
    return () => {
      setQuestion(0) 
    }
    
  }, [])
  function randomNoRepeats(arr) {
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
  const chooser = randomNoRepeats(users); 
  

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
  const [x,setX] = useState(); 
  const [y,setY] = useState(); 
  const [height, setHeight] = useState();  
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const fadeOpac = useRef(new Animated.Value(0)).current;
  console.log(x); 
  console.log(y); 
  console.log(width); 
  console.log(height)

  const valer = fadeAnim.interpolate({
     inputRange:[0,1],
     outputRange:['white','green'], 
  })
  useEffect(() => {
    UIManager.measureInWindow(findNodeHandle(Marker), (x,y,width,height) => {
      setX(x); 
      setWidth(width); 
      setY(y); 
      setHeight(height); 
   }) 
    return () => {
          
    };
  }, [x,y,width,height])
  
  console.log(question)  
   
  function measure(gesture){
    console.log("called")

   if(gesture.nativeEvent.pageY > y && gesture.nativeEvent.pageY < y + height && gesture.nativeEvent.pageX > x && gesture.nativeEvent.pageX < x + width){
      setPoints({variables:{setPoints:{user:"zaid", dimension:"creativity"}}});
      console.log("In drag area")
      if(question == questions.length -1){
        setQuestion(0)
        setBar(0)
        navigation.navigate('Play20'); 
        return;  
      }
      setQuestion(question + 1)
      setBar(bar + 0.05)
      fadeIn()
      fadeOp()
      
   }
  };
      
        return(
          <View style = {{flex:1,}}>
          <View style = {{flex:0.1}}>
          
          </View>
          <View 
          style = {{flex:0.6, marginLeft:30, marginRight:30}}
          onLayout={(event) => {
            var {x, y, width, height,} = event.nativeEvent.layout;
            
            console.log('parenty'+y); 
          }} 
          > 
          
          <Text style = {{alignSelf:'flex-end',marginBottom:10}}> {question}/{questions.length}</Text>
          <Progress.Bar progress={bar} width={Dimensions.get('window').width -60   } height = {20} />
          
          <Text style = {{marginTop:30, alignSelf:"center", marginBottom:20,fontSize:15}}> {questions[question].question} </Text>
          <View style = {{borderBottomWidth:1, borderBottomColor:'black', marginTop:30,}} />
          <View style = {{justifyContent:'center', alignItems:'center', flexDirection:'row'}}>
          <Animated.View
          style = {[{justifyContent:'center', alignItems:'center',marginTop:20, borderRadius:100, borderWidth:10, marginBottom:20,height:200, width:200,flexDirection:'row', backgroundColor:valer}]}
          ref = {gamer => Marker = gamer}  
          onLayout={(event) => {
            var {x, y, width, height,} = event.nativeEvent.layout;
            setX(x); 
            setWidth(width); 
            setY(y); 
            setHeight(height);
            
            console.log('parenty'+y); 
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
          <Draggable x={75} y={100} renderSize={70} renderColor='black' renderText={chooser(users)} isCircle shouldReverse onShortPressRelease={()=>alert('touched!!')} onDragRelease = {(gesture) => measure(gesture)}/>
          <Draggable x={300} y={100} renderSize={70} renderColor='black' renderText={chooser(users)} isCircle shouldReverse onShortPressRelease={()=>alert('touched!!')} onDragRelease = {(gesture) => measure(gesture)}/>
          </View>
          <View style = {{flex:0.1}}>
            
          </View>
          </View>
          )
      
      
      
    
    

}
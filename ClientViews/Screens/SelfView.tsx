import React, { useState, useEffect, useRef } from 'react';
import { Text, View, StyleSheet, Image,ScrollView, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import {Button} from 'react-native-elements';
import Moment from 'react-moment';
import {transformCreativity} from '../../networking'; 


import { format } from "date-fns";
import { firebase } from '../../config'; 
import { Octicons } from '@expo/vector-icons';

const db = firebase.firestore(); 

interface SelfViewProps {}



function useTraits(){ 
    const [namer, setNamer] = useState(1); 
    const [gender,setGender] = useState([]); 


useEffect(() => {
    console.log("called")
 db.collection('user').doc('trial_user').get().then(doc => {
      const gender = doc.data().gender; 
      const state = doc.data().state; 
      db.collection('user')
      .where('gender', '==', gender)
      .where('state', '==', state )
      .get()
      .then(result => {
            const valer = []; 
            result.docs.map(val => valer.push(val.data()))
            



      })
      
 })        
},[])



    
          
    const [traits, setTraits] = useState([
        {
        votes:75,     
        trait:'charisma',  
        aheadOf:64,  
        selected:true
        }, 
       {
        votes:68, 
        trait:'creativity', 
        aheadOf:64,  
       },
       {
        votes:68, 
        trait:'honest', 
        aheadOf:64,  
       },
       {
        votes:68, 
        trait:'looks', 
        aheadOf:64,  
       },
       {
        votes:68, 
        trait:'emphatatic', 
        aheadOf:64,  
       },
       {
        votes:68, 
        trait:'humor', 
        aheadOf:64,  
       },
       {
        votes:68, 
        trait:'status', 
        aheadOf:64,  
       },
       {
        votes:68, 
        trait:'wealthy', 
        aheadOf:64,  
       },
       

]);


const setArrow = (obj) => {
    console.log("called"); 
 const result = traits.map(val => {
        if(val.trait == obj.trait){
            val.selected = true; 
             
      }
      return val; 
     
 })
 console.log(result)
 setTraits(traits => result)
}
const setArrowFalse = (obj) => {
    console.log("called"); 
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
        <Octicons name="smiley" size={40} color="black" style = {{marginRight:20, }}/>
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
          <View style = {{flexDirection:'row', marginTop:15, marginBottom:15 , flex:0.7, }}>

          <FontAwesome5 name="female" size={35} color="red" />
          <FontAwesome5 name="female" size={35} color="red" />
          <FontAwesome5 name="female" size={35} color="red" />
          <FontAwesome5 name="female" size={35} color="red" />
          <FontAwesome5 name="female" size={35} color="red" />
          <FontAwesome5 name="female" size={45} color="red" />
          <FontAwesome5 name="female" size={35} color="red" />
          <FontAwesome5 name="female" size={35} color="red" />
          <FontAwesome5 name="female" size={35} color="red" />
          <FontAwesome5 name="female" size={35} color="red" />
          </View>
          <View style = {{flex:0.3, marginTop:15}}>
             <Text style = {{alignSelf:'center', fontWeight:'bold'}}>AHEAD OF </Text> 
             <Text style = {{alignSelf:'center', color:'red', fontWeight:'bold', fontSize:20}}>{val.aheadOf}%</Text>
             <Text style = {{alignSelf:'center', fontWeight:'bold'}}>of females</Text>
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
                      {/* {traitsTemplate} */}
                      
                
                      
                      
            
        </View>
    )
}

function useVotes(){
const data = [{
     question:'Likely to tell a funny story most likely to give a creative solution most likely to give a creative solution', 
     answeredBy:'David Boctor', 
     createdAt:''
}];     
const [votes, setVotes] = useState([
    {
    question:'most likely to give a creative solution most likely to give a creative solution most likely to give a creative solution most likely to give a creative solution most likely to give a creative solution most likely to give a creative solution  ', 
    answeredBy:'David Boctor', 
    createdAt:firebase.firestore.Timestamp.fromDate(new Date()), 
    dimension:'creative' 
},
{
    question:'most likely to give a creative solution', 
    answeredBy:'David Boctor', 
    createdAt:firebase.firestore.Timestamp.fromDate(new Date()), 
    dimension:'creative' 
},
{
    question:'most likely to give a creative solution', 
    answeredBy:'David Boctor', 
    createdAt:firebase.firestore.Timestamp.fromDate(new Date()), 
    dimension:'creative' 
},
{
    question:'most likely to give a creative solution', 
    answeredBy:'David Boctor', 
    createdAt:firebase.firestore.Timestamp.fromDate(new Date()), 
    dimension:'creative' 
},
{
    question:'most likely to give a creative solution', 
    answeredBy:'David Boctor', 
    createdAt:firebase.firestore.Timestamp.fromDate(new Date()), 
    dimension:'creative' 
},
{
    question:'most likely to give a creative solution', 
    answeredBy:'David Boctor', 
    createdAt:firebase.firestore.Timestamp.fromDate(new Date()), 
    dimension:'creative' 
},
{
    question:'most likely to give a creative solution most likely to give a creative solution', 
    answeredBy:'David Boctor', 
    createdAt:firebase.firestore.Timestamp.fromDate(new Date()), 
    dimension:'creative' 
},


]); 

// useEffect(() => {
//     console.log("namer")
//     const subscribe = db.collection('user').doc('7b4CXge62EcpfnjUJosv').collection('traits').get().then(result => {
//         const finaler = result.docs.map(val => val.data()); 
//         setVotes(votes => finaler); 


//     }); 
    
    
// }, [])
const votesTemplate = votes.map(val => {
    //const time = val.createdAt.toDate(); 
    return (
        <View style = {{ borderBottomWidth:3, justifyContent:'center', alignItems:'center', }}>
            <Text style = {{alignSelf:'flex-end',  marginTop:3, fontSize:12}}>
                2 seconds ago
            </Text>
            <View style = {{flexDirection:'row', alignItems:'center', marginTop:30, }}>
            <View style = {{flex:0.3}}>
            <Octicons name="smiley" size={40} color="black" style = {{marginRight:20, }}/>
            </View>    
            <Text style = {{maxWidth:250, fontWeight:'bold', flex:0.7}}>{val.question}</Text>
            
            </View>
            <Text style = {{alignSelf:'flex-end', fontWeight:'bold', marginBottom:5}}>- David Boctor</Text>
                
        </View>
    ) 
 })


return (
    <View style = {{flex:1}}>
    <View style = {[styles.line, {marginTop:40}]}/>

                      <Text style = {[styles.textStyle, {alignSelf:'center', fontSize:25}]}> RECENT VOTES </Text>
                  
                  <View style = {[styles.line]}></View>
                  
                  {votesTemplate}
                  
        
                

    </View>
)     
}


const SelfView = (props: ClientViewProps) => {
    const [selected, setSelected] = useState('traits');
    const traits = useTraits(); 
    const votes = useVotes(); 
     
     

     



    const data = { 
        fullName:"Amy Guion", 
        firstName:"Amy", 
        matchMaker:['jandjsnjfk', 'jhadfjbfjs', 'jfbsbfjds'], 
        creativity:5.5, 
        charisma:7.7, 
        looks:3.3, 
        honest:4.4,
        age:'32', 
        job:'influencer', 
        state:'california', 
        subLocality:'westwood', 
        lattitude:'something', 
        longitude:'something', 
        distance:2, 
        photos:[], 
        appUser:false, 
        profilePhoto:"https://i.pinimg.com/originals/f0/a6/4e/f0a64e32194d341befecc80458707565.jpg", 
      
     }
     
    const imageTemplate = data.appUser ? data.photos.map(val => {
         return val.photo ? <TouchableOpacity onPress = {() => console.log("hell oworld")}><Image source = {{uri:val.photo}} style = {{height:75, width:75}}/></TouchableOpacity>:<Feather name="image" size={40} color="black" />
    }):data.profilePhoto ? <Image source = {{uri:data.profilePhoto}} style = {{height:75, width:75}}/>:<Feather name="image" size={40} color="black" /> 
  
  
  
    const matchMaker = [{
         fullName:"David boctor",
         firstName:"David",  
      }];
       
     if(data){
      return (
          <View style={styles.container}>
          <ScrollView>
          <View style = {{flex:0.3, justifyContent:'center', alignItems:'center', marginTop:30}}>
           <Text style = {styles.textStyle}> {data.matchMaker.length} people said  </Text>
           <Text style = {[styles.textStyle, {fontWeight:'bold', fontSize:40, fontStyle:'italic'}]}>{data.fullName || data.firstName}</Text>
  
           <Text style = {[styles.textStyle, {fontSize:25, fontStyle:'italic', marginLeft:30, marginRight:30}]}> is INTELLIGENT, GOOD HEARTED and CREATIVE </Text>
            </View>
            <View style = {{flex:0.7, marginLeft:30, marginRight:30}}>
                   <View style = {{flexDirection:'row', justifyContent:'space-evenly', borderWidth:2, marginTop:40}}>

                       <TouchableOpacity style = {{borderRightWidth:1, justifyContent:'center',backgroundColor:selected == 'traits' ? '#75a4f0':'white', flex:1}} onPress = {() => setSelected('traits')}>
                           <Text style = {{alignSelf:'center', fontSize:20,  fontWeight:'bold', marginTop:6, marginBottom:6}}>Traits</Text>

                       </TouchableOpacity> 
                       <TouchableOpacity onPress = {() => setSelected('votes')} style = {{backgroundColor:selected == 'votes' ? '#75a4f0':'white', flex:1}}>
                        <Text style = {{alignSelf:'center', fontSize:20,  fontWeight:'bold', marginTop:6, marginBottom:6}}>Votes</Text>
                       </TouchableOpacity>
                   </View> 
                   {selected == 'traits' ? traits:votes}
                  <View style = {[styles.line, {marginTop:40}]}/>
                  
                  <Text style = {[styles.textStyle, {alignSelf:'center', fontSize:25}]}>{data.firstName}'s details</Text>

                  <View style = {styles.line}></View>
                  <View style = {{flexDirection:'row',marginTop:15, alignItems:'center'}}>
                  <FontAwesome name="birthday-cake" size={24} color="black" />
                  <Text style = {styles.iconNames}>{data.age} years old</Text>
  
                  </View>
                  <View style = {{flexDirection:'row',marginTop:15, alignItems:'center'}}>
                  <FontAwesome name="suitcase" size={24} color="black" />
                  <Text style = {styles.iconNames}>{data.job}</Text>
  
                  </View>
                  <View style = {{flexDirection:'row',marginTop:15, alignItems:'center'}}>
                  <FontAwesome5 name="house-damage" size={24} color="black" />
                  <Text style = {styles.iconNames}>Lives in {data.subLocality}</Text>
  
                  </View>
                  <View style = {{flexDirection:'row',marginTop:15, alignItems:'center'}}>
                  <Entypo name="location-pin" size={24} color="black" />
                  <Text style = {styles.iconNames}> {data.distance} miles away</Text>
  
                  </View>
                  <View style = {styles.dotted}/>
                  <View style = {{flexDirection:'row',marginTop:20, alignItems:'center',marginBottom:10}}>
                  <AntDesign name="instagram" size={24} color="black" />
                  <Text style = {[styles.iconNames, ] }> Photos</Text>
                  </View>
                  {imageTemplate}
                  <View style = {[styles.line, {marginTop:40}]}/>
                  <Text style = {[styles.textStyle, {alignSelf:'center', fontSize:25}]}>{data.firstName.toUpperCase()}'s MATCHMAKERS</Text>
                  <View style = {styles.line}></View>
                  <View style = {{flexDirection:'row', justifyContent:'center', marginTop:30}}>
                  <MaterialIcons name="account-circle" size={40} color="black" />
                  <MaterialIcons name="account-circle" size={40} color="black" />
                  <MaterialIcons name="account-circle" size={40} color="black" />
                  <MaterialIcons name="account-circle" size={40} color="black" />
                  <MaterialIcons name="account-circle" size={40} color="black" />
                  </View>
                  <Text style = {[styles.textStyle, {alignSelf:'center', fontSize:20, fontStyle:'italic', marginTop:10}]}>David Boctor and {matchMaker.length} others</Text>
                  <Button title = {"SHARE THIS PROFILE"} containerStyle = {{marginLeft:30, marginRight:30, marginTop:100, marginBottom:200,}} buttonStyle = {{backgroundColor:'green',}}>
  
                  </Button>
  
  
                  
                  
  
                  
            </View>
            </ScrollView>    
            
          </View>
        );    
     }
     return (
          <View style = {{flex:1, justifyContent:'center', alignItems:'center'}}>
              <Text>Loading</Text>
          </View>
     ) 
    
  };

export default SelfView;

const styles = StyleSheet.create({
    container: {flex:1}, 
    textStyle:{fontWeight:'500', fontSize:30}, 
    line:{borderBottomWidth:3,}, 
    iconNames:{marginLeft:10, fontSize:17, fontWeight:'500'}, 
    dotted:{borderStyle:'dotted', borderWidth:2, borderRadius:10, marginTop:10 }
  
  });

import  React, {useState,useRef,useEffect} from 'react';
import { View, StyleSheet, Text, TextInput,TouchableOpacity,ScrollView,Image, FlatList,Picker,PanResponder,Animated, TouchableWithoutFeedback, SafeAreaView} from 'react-native';
import { useMutation,useQuery } from '@apollo/react-hooks';
import { MaterialIcons } from '@expo/vector-icons';
import {Button,Icon } from "react-native-elements"; 
import { gql } from 'apollo-boost';

const GENERATE_MATCHES = gql`
 query {
    generateMatches {
        user 
        data 
    }
 }

`
const SET_EVENT = gql`
 mutation namer($event:event1! = {type:"matchEndorsed"}){
   setEvent(event:$event)
 }

`
//getDatingPoolfake: datingPoolFake!




const GET_FAKE_DATING = gql`
 query {
     getDatingPoolfake {
          data {
               firstname
               profilePic
               gender
               
          }
     }
 }
`



export default function Endorsement({navigation}){
const data1 = [{user:"Amy Guion", matches:["eric hemsworth", "david boctor", "steve"]}]; 
//const {data,loading,error} = useQuery(GENERATE_MATCHES); 
const [setEvent] = useMutation(SET_EVENT);


const {data, loading, error} = useQuery(GET_FAKE_DATING, ); 

let mainUser = useRef({}); 
let fakeUser = useRef({}); 

const fakeUsers = [
    { firstname: "John", gender:"male", profilePic:"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSPzbCgtqoefcJWfTBPoCzhSDxyUVZwbu_PJA&usqp=CAU"}, 
    { firstname: "Alex",gender:"male", profilePic:"https://english.cdn.zeenews.com/sites/default/files/2017/11/17/639329-indian-men.jpg" },
    { firstname: "Sam",gender:"male", profilePic:"https://cdn.accentuate.io/147364165/34562429445/guidetomen-(2).jpg?360x480"},
    { firstname: "Smith",gender:"male", profilePic:"https://www.lorealparisusa.com/~/media/images/lop/home/beauty-library/articles-2/how-to-style-long-hair-men/loreal-paris-article-22-long-hairstyles-for-men-to-try-now-m.jpg?thn=0"},
    { firstname: "Tommy",gender:"male", profilePic:"https://www.ft.com/__origami/service/image/v2/images/raw/http%3A%2F%2Fcom.ft.imagepublish.upp-prod-us.s3.amazonaws.com%2F83afb31c-38fc-11e9-9988-28303f70fcff?fit=scale-down&source=next&width=700"},
    { firstname:"Amy", gender:"female", profilePic:"data:image/jpeg;base64,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"},
    {firstname:"Alexa", gender:"female", profilePic:"https://content.linkedin.com/content/dam/business/talent-solutions/global/en_us/blog/2019/03/mike-pence-rule.jpg"},
    {firstname:"Kylie", gender:"female", profilePic:"https://specials-images.forbesimg.com/imageserve/5f3f2b8d8a1a17a277d7abc5/960x0.jpg?fit=scale"},
    {firstname:"Amelie", gender:"female", profilePic:"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcS_Y_weN6z-xHdK1n9hC7LQmjCrWpg21MGPpA&usqp=CAU"},
    {firstname:"Alisha", gender:"female", profilePic:"https://www.international.gc.ca/world-monde/assets/images/issues_development-enjeux_developpement/gender_equality-egalite_des_genres/jacqueline_oneill.jpg"},
]; 





    //  if(val < 5){
    //     return {
    //         firstname:faker.name.firstname('male') 
    //     }
    //  }
    //  return {
    //       firstname:faker.name.firstname('female')
    //  }
     
    



const [index,setIndex] = useState(0); 
// const setIndexWrapper = () => {
//     if(index <= data.generateMatches.data.length){
//         setIndex(index + 1); 
//     }
// }

function generateValues(){
    
}
fakeUser = fakeUsers.filter(val => val.gender !== mainUser.gender)    
const user = fakeUser[Math.floor(Math.random() * fakeUser.length)]
if(data){
    mainUser = data.getDatingPoolfake.data[Math.floor(Math.random() * data.getDatingPoolfake.data.length)];
    console.log(mainUser.profilePic)
    
    
    return(
        <View style = {{flex:1,backgroundColor:"black" }}>
        <View style = {{flex:0.2}}>
        
        </View>
        <View style = {{flex:0.6,alignItems:"center"}}>
         <Text style = {{color:"white", fontWeight:"bold", fontSize:35, fontStyle:"italic"}}> It's a Match ! </Text>
         <View style = {{flexDirection:"row",marginTop:50,  }}>
         <View style = {{marginRight:50,alignItems:"center", justifyContent:"center"}}>
         {mainUser.profilePic ? <Image source = {{uri:mainUser.profilePic}} style = {{height:100, width:100, borderRadius:50}}/>:
         <MaterialIcons name="account-circle" size={100} color="blue" />}
         <Text style = {{color:"white", fontWeight:"bold",fontSize:20, marginTop:10}}>{mainUser.firstname} </Text>
         </View>
         <View style = {{marginRight:50,alignItems:"center", justifyContent:"center"}}>
         <Image source = {{uri:user.profilePic}} style = {{height:100, width:100, borderRadius:50}} resizeMode = "cover"/>
         <Text style = {{color:"white", fontWeight:"bold",fontSize:20, marginTop:10}}>{user.firstname} </Text>
         </View>
         {/* <MaterialIcons name="account-circle" size={100} color="red" /> */}
         
         </View>
         <View style = {{flexDirection:"row"}}>
         
         {/* <Text style = {{color:"white", fontWeight:"bold", fontSize:20}}> {data.generateMatches.data[index]}</Text> */}
        
         </View>
        
        </View>
        <View style = {{flex:0.2}}>
         <Button title = "Endorse this match" buttonStyle = {{backgroundColor:"#f5b507",}} titleStyle = {{color:"white", fontWeight:"bold"}} containerStyle = {{marginLeft:30, marginRight:30}} icon={
            <Icon
              name="star"
              size={15}
              color="white"
            />
            
          }
        //   onPress = {() => setIndexWrapper()}
        onPress = {() => {setEvent(), navigation.navigate('GameHomepage')}}
          >
         
        </Button>
        <Button title = "Maybe Not" buttonStyle = {{backgroundColor:"#6e6b65",}} titleStyle = {{color:"white", fontWeight:"bold"}} containerStyle = {{marginLeft:30, marginRight:30, marginTop:30}}
        onPress = {() => navigation.navigate('Matchmake')}
        >
        </Button>
        
        </View>
        </View>
        )
}

if(loading){
    return <View><Text>Loading</Text></View>
}



}
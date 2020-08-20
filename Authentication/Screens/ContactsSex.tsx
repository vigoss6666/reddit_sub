import  React, {useState,useRef,useEffect} from 'react';
import { View, StyleSheet,  TextInput,TouchableOpacity,ScrollView,Image, Button,FlatList,Picker,PanResponder,Animated, TouchableWithoutFeedback, SafeAreaView} from 'react-native';
import { useMutation,useQuery } from '@apollo/react-hooks';
import {Text, Avatar, Icon} from 'react-native-elements'; 
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { gql } from 'apollo-boost';

// getDatingPool: Boolean!

const GET_DATING_POOL = gql`
query {
   getDatingPool
}

`; 




export default function ContactsSex({navigation}){
const data1 = [{fullname:"Zaid shaikh", identification:'something',gender:'male'},{fullname:"ALi reza", identification:'something'},{fullname:"Huraira", identification:'something'},{fullname:"Samadh Khan",identification:'something'},{fullname:"Nihal Modal",identification:'somehting'},{fullname:"Rafiq modal", identification:'something'},{fullname:"Baiju Noyan", identification:'something'},{fullname:"Bilkis baji",identification:'something'},{fullname:"Bismil",identification:'something', gender:'female'}]
const [arr,addArr] = useState([]); 
const [index,setIndex] = useState([]); 
const {data, loading, error} = useQuery(GET_DATING_POOL); 
if(data){
  console.log(data); 
}

const addMale = async (val,index) => {
 const data = {identification:val.identification,gender:'male', orientation:'straight',index:index }
 addArr([...arr,data]);  
 console.log(arr); 
}
const addFemale = (val,index) => {
  const data = {identification:val.identification, gender:'female', orientation:'straight',index:index} 
  addArr([...arr,data]); 
  console.log(arr)
}


return(
<View style = {{flex:1, }}>
<View style = {{flex:0.2, }}>

</View>
<View style = {{flex:0.2}}>
<Text h4 style = {{alignSelf:'center', fontWeight:"600"}}>Tell us about your friends</Text>
<Text h5 style = {{alignSelf:'center', fontWeight:"600"}}>Confirm the sex and age of each friend</Text>
</View>
<View style = {{flex:0.6}}>
<ScrollView>
          {data1.map((val,index) => {
            return (
              <TouchableOpacity key={index} 
              style = {{borderWidth:1, height:50,flexDirection:"row",  justifyContent:'space-between', marginLeft:20, marginRight:20, borderLeftWidth:0, borderRightWidth:0,}}
              onPress = {() => { addArray(index)  }}
              >
                  <View style = {{flexDirection:'row', alignItems:'center', flex:0.9}}>
                  <Avatar rounded icon = {{name:'account-circle', color:'black'}} activeOpacity = {0.8} size = {"medium"} />  
                  <Text>{val.fullname}</Text>
                  </View>
                  <View style = {{alignItems:'center', justifyContent:'space-between', marginRight:10, flexDirection:'row',flex:0.2}}>
                     <TouchableOpacity onPress = {() => {addArr([...arr, {identification:val.identification, gender:'male', index:index}]), setIndex([...index, index])}}> 
                     <FontAwesome name="male" size={34} color={val.gender == 'male' ? 'green':'black' || val.gender} />
                     </TouchableOpacity>
                     <TouchableOpacity onPress = {() => {addArr([...arr, {identification:val.identification, gender:'female', index:index}])}}>
                     <FontAwesome5 name="female" size={34} color={val.gender == 'female' ? 'green':'black'} />
                     </TouchableOpacity>

                  </View>
              </TouchableOpacity>
            )
          })}
        </ScrollView> 
</View>
</View>
)
}
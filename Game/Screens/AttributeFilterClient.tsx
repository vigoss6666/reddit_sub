import React, { useState, useEffect, useRef, useCallback, useContext } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { iconFactory } from '../../src/common/Common';
import DropDownPicker from 'react-native-dropdown-picker';
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
import {Button} from 'react-native-elements'; 
import {firebase} from '../../config'; 
import { getBaseLog} from './getBaseLog'; 
import { transformCreativity} from '../../networking'; 
import AppContext from '../../AppContext'; 
import {updateUser} from '../../networking';
const db = firebase.firestore();

// @refresh reset
             
function logTen(arr:serverData[]|serverData):serverDataWithDimension[] | serverDataWithDimension {
  if(Array.isArray(arr)){
      const result =  arr.map(val => ({
          ...val, 
          charisma:parseFloat(getBaseLog(5, val.charisma).toFixed(1)), 
          dimension:parseFloat(getBaseLog(5, val.charisma+val.creativity+val.empathetic+val.honest+val.humor+val.looks+val.status+val.wealthy).toFixed(1)), 
          creativity:parseFloat(getBaseLog(5, val.creativity).toFixed(1)),
          honest:parseFloat(getBaseLog(5, val.honest).toFixed(1)),
          looks:parseFloat(getBaseLog(5, val.looks).toFixed(1)),
          empathetic:parseFloat(getBaseLog(5, val.empathetic).toFixed(1)),
          status:parseFloat(getBaseLog(5, val.status).toFixed(1)),
          wealthy:parseFloat(getBaseLog(5, val.wealthy).toFixed(1)),
          humor:parseFloat(getBaseLog(5, val.humor).toFixed(1)),
          narcissistic:parseFloat(getBaseLog(5, val.narcissistic).toFixed(1)),
          
          
        }
        
     )) 
     return result; 
  }
return {
          ...arr,     
          dimension:parseFloat(getBaseLog(5, arr.charisma+arr.creativity+arr.empathetic+arr.honest+arr.humor+arr.looks+arr.status+arr.wealthy).toFixed(1)), 
          charisma:parseFloat(getBaseLog(5, arr.charisma).toFixed(1)), 
          creativity:parseFloat(getBaseLog(5, arr.creativity).toFixed(1)),
          honest:parseFloat(getBaseLog(5, arr.honest).toFixed(1)),
          looks:parseFloat(getBaseLog(5, arr.looks).toFixed(1)),
          empathetic:parseFloat(getBaseLog(5, arr.empathetic).toFixed(1)),
          status:parseFloat(getBaseLog(5, arr.status).toFixed(1)),
          wealthy:parseFloat(getBaseLog(5, arr.wealthy).toFixed(1)),
          humor:parseFloat(getBaseLog(5, arr.humor).toFixed(1)), 
          narcissistic:parseFloat(getBaseLog(5, arr.narcissistic).toFixed(1)),
}    
  
}

interface AttributeFilterProps {}
function jsUcfirst(str) 
{
    return str.charAt(0).toUpperCase() + str.slice(1);
}



const AttributeFilterCLient = ({navigation, route}) => {
  
   const [attribute, setAttribute] = useState(''); 
   const myContext = useContext(AppContext);
   const {user, userId, selfFilter, setSelfFilter} = myContext;
   const [maleMatches, setMaleMatches] = useState(0); 
   const [femaleMatches, setFemaleMatches] = useState(0); 
   const [femaleAhead, setFemaleAhead] = useState(0); 
   const [maleAhead, setMaleAhead] = useState(0); 
   const [potentialMatches, setPotentialMatches] = useState(0);
   const [attValue, setAttValue]  = useState();
   const {client} = route.params; 
    
   const attriText = [
     {
      dimension:'creativity', 
      text:'A creative person has the ability to invent and develop original ideas, especially in the arts. Creative activities involve the inventing and making of new kinds of things. If you use something in a creative way, you use it in a new way that produces interesting and unusual results.', 
    }, 
    {
      dimension:'honest', 
      text:'If you describe someone as honest, you mean that they always tell the truth, and do not try to deceive people or break the law.If you are honest in a particular situation, you tell the complete truth or give your sincere opinion, even if this is not very pleasant.'
    },
    {
      dimension:'charisma', 
      text:'You say that someone has charisma when they can attract, influence, and inspire people by their personal qualities.A charismatic person attracts, influences, and inspires people by their personal qualities.'
    },
    {
      dimension:'humor', 
      text:'If someone or something is humorous, they are amusing, especially in a clever or witty way.If you describe something as funny, you think it is strange, surprising, or puzzling.'
    },
    {
      dimension:'looks', 
      text:'Someone who is good-looking has an attractive face.Pleasing in appearance; beautiful or handsome.'
    },
    {
      dimension:'empathetic', 
      text:"Someone who is empathetic has the ability to share another person's feelings or emotions as if they were their own."
    },
    {
      dimension:'status', 
      text:"Your status is your social or professional position.Status is the importance and respect that someone has among the public or a particular group."
    },
    {
      dimension:'wealthy', 
      text:"Someone who is wealthy has a large amount of money, property, or valuable possessions."
    },
    {
      dimension:'narcissism', 
      text:"Narcissism is a personality trait that is generally defined as excessive self-love. Friends Help Friends uses an interactive version of the Narcissistic Personality Inventory (NPI) exam to measure its users for relative measures of the presence or absence of the personality trait based on the definition of narcissistic personality disorder found in the DSM-III. Filtering and sorting your search results using the NPI score can be useful to help find better matches if you are especially sensitive to narcissistic personalities. However, the NPI is not a diagnostic tool for Narcissistic Personality Disorder. A user's narcissism score measures subclinical or normal expressions of narcissism. So, even someone who gets the highest possible score on the NPI does not necessarily have NPD."
    },

    
   
    

  
  ]
   console.log("Attribute google started")
   console.log(route.params.attribute)
   
   useEffect(() => {
    navigation.setOptions({
       headerTitle:false, 
       headerRight:() => <TouchableOpacity onPress = {() => navigation.navigate('BrowseMatchSettings')} style = {{marginRight:10}}>
       <Text style = {{fontSize:20, color:'orange', fontWeight:'bold'}}> Cancel</Text>
       </TouchableOpacity>,
       headerLeft:false,  
      })
   },[])
   useEffect(() => {
      route.params ? setAttribute(route.params.attribute):null;
      route.params ? setAttValue(computeDefaultValue()):null; 
   },[])     


useEffect(() => {
if(attribute){
  db.collection('user')
  .where('state', '==', client.state)
  .where('gender', '==', 'male')
  .get()
  .then(onResult => {
     if(onResult.empty){
        setMaleAhead('100')
        return; 
     }
     const users = onResult.docs.map(val => val.data()); 
     const listWithoutUser = users.filter(val => val.phoneNumber !== userId);
     if(listWithoutUser.length < 1) {
       setMaleAhead('100'); 
       return; 
     } 
     
     const userLogged = logTen(user); 
     const result = transformCreativity(client, usersLogged); 
     const getAttribute = result.filter(val => val.trait == attribute); 
     setMaleAhead(getAttribute[0].aheadOf); 
     
  })
}  
}, [attribute])


useEffect(() => {
  if(attribute){
    db.collection('user')
  .where('state', '==', client.state)
  .where('gender', '==', 'female')
  .get()
  .then(onResult => {
     if(onResult.empty){
        setFemaleAhead(100)
        return; 
     }
    const users = onResult.docs.map(val => val.data());
    const listWithoutUser = users.filter(val => val.phoneNumber !== userId); 
     console.log(listWithoutUser) 
     if(listWithoutUser.length < 1){
       setFemaleAhead(100)
       return; 
     }
     const usersLogged = logTen(users); 
      
     
     
   const result = transformCreativity(client, usersLogged); 
   const getAttribute = result.filter(val => val.trait == attribute); 
   console.log("the attribute is")
   console.log(getAttribute[0])
   setFemaleAhead(getAttribute[0].aheadOf); 
  })
  }
  
  }, [attribute])

useEffect(() => {
  if(attValue){
  console.log("att value is")
  console.log(attValue)
  db.collection('user')
  .where('gender', '==', 'female')
  .where('state', '==', user.state)
  .where(attribute, ">", Math.pow(5, attValue)) 
  .get()
  .then(onResult => {
     const finalResult = onResult.docs.map(val => val.data());
     const listWithoutUser = finalResult.filter(val => val.phoneNumber !== userId); 
     setFemaleMatches(listWithoutUser.length) 
 })
  }
  
}, [attValue])

useEffect(() => {
  if(attValue){
    db.collection('user')
  .where('gender', '==', 'male')
  .where('state', '==', user.state)
  .where(attribute, ">", Math.pow(5, attValue)) 
  .get()
  .then(onResult => {
     const finalResult = onResult.docs.map(val => val.data()); 
     const listWithoutUser = finalResult.filter(val => val.phoneNumber !== userId);  
     setMaleMatches(listWithoutUser.length)
 })
 }
  
}, [attValue])


const computeDefaultValue = () => {
  if(route.params.attribute == "creativity"){
     return selfFilter.creativity; 
  }
  if(route.params.attribute == "empathetic"){
    return selfFilter.empathetic; 
 }
  if(route.params.attribute == "charisma"){
    return selfFilter.charisma; 
 }
 if(route.params.attribute == "honest"){
  return selfFilter.honest; 
}
if(route.params.attribute == "looks"){
return selfFilter.looks; 
}
if(route.params.attribute == "humor"){
return selfFilter.humor; 
}
if(route.params.attribute == "status"){
return selfFilter.status; 
}
if(route.params.attribute == "wealthy"){
return selfFilter.wealthy; 
}
if(route.params.attribute == "narcissism"){
return selfFilter.narcissism; 
}
}


 

  const text = attriText.map(val => {
    if(val.dimension == attribute){
       return <Text>
         {val.text}
       </Text>
    }
  })
  return (
    <SafeAreaView >
        <ScrollView>
           <View style = {{marginLeft:30, marginRight:30}}>
        
      <View style = {{justifyContent:'center', alignItems:'center', marginTop:30}}>
          {iconFactory(attribute, 60)}

      </View>
      <View style = {{borderBottomWidth:2, marginTop:10}}/>
      <Text style = {{alignSelf:'center', fontSize:'30', fontWeight:'bold', marginTop:10}}>{attribute.toUpperCase()}</Text>
      <View style = {{borderBottomWidth:2, marginTop:10}}/>
      <Text style = {{fontWeight:'bold', fontSize:15, marginTop:10}}>
       {/*make the ttritex here  */}
       {text}

      </Text>
      <View style = {{borderBottomWidth:2, marginTop:10}}/>
      <Text style = {{marginTop:10, fontWeight:'bold', color:'grey', fontSize:17}}>FILTER BY</Text>
      <View style = {{borderBottomWidth:2, marginTop:10}}/>
      <View style = {{flexDirection:'row', marginTop:10, justifyContent:'space-between', alignItems:'center', zIndex:100}}>
      <Text style = {{marginTop:10, fontWeight:'bold', fontSize:17}}>{attribute.toUpperCase()}</Text> 
      <DropDownPicker
                        labelStyle = {{fontSize:20, fontWeight:'bold'}}
                        items={[
                        {label: "0", value: 0},
                        {label: "0.1", value: 0.1},
                        {label: "0.2", value: 0.2},
                        {label: "0.3", value: 0.3},
                        {label: "0.4", value: 0.4},
                        {label: "0.5", value: 0.5},
                        {label: "0.6", value: 0.6},
                        {label: "0.7", value: 0.7},
                        {label: "0.8", value: 0.8},
                        {label: "0.9", value: 0.9},
                        {label: "1.0", value: 1},
                        {label: "1.1", value: 1.1},
                        {label: "1.2", value: 1.2},
                        {label: "1.3", value: 1.3},
                        {label: "1.4", value: 1.4},
                        {label: "1.5", value: 1.5},
                        {label: "1.6", value: 1.6},
                        {label: "1.7", value: 1.7},
                        {label: "1.8", value: 1.8},
                        {label: "1.9", value: 1.9},
                        {label: "2.0", value: 2},
                        {label: "2.1", value: 2.1},
                        {label: "2.2", value: 2.2},
                        {label: "2.3", value: 2.3},
                        {label: "2.4", value: 2.4},
                        {label: "2.5", value: 2.5},
                        {label: "2.6", value: 2.6},
                        {label: "2.7", value: 2.7},
                        {label: "2.8", value: 2.8},
                        {label: "2.9", value: 2.9},
                        {label: "3.0", value: 3},
                        {label: "3.1", value: 3.1},
                        {label: "3.2", value: 3.2},
                        {label: "3.3", value: 3.3},
                        {label: "3.4", value: 3.4},
                        {label: "3.5", value: 3.5},
                        {label: "3.6", value: 3.6},
                        {label: "3.7", value: 3.7},
                        {label: "3.8", value: 3.8},
                        {label: "3.9", value: 3.9},
                        {label: "4.0", value: 4},
                        {label: "4.1", value: 4.1},
                        {label: "4.2", value: 4.2},
                        {label: "4.3", value: 4.3},
                        {label: "4.4", value: 4.4},
                        {label: "4.5", value: 4.5},
                        {label: "4.6", value: 4.6},
                        {label: "4.7", value: 4.7},
                        {label: "4.8", value: 4.8},
                        {label: "4.9", value: 4.9},
                        {label: "5.0", value: 5},
                        {label: "5.1", value: 5.1},
                        {label: "5.2", value: 5.2},
                        {label: "5.3", value: 5.3},
                        {label: "5.4", value: 5.4},
                        {label: "5.5", value: 5.5},
                        {label: "5.6", value: 5.6},
                        {label: "5.7", value: 5.7},
                        {label: "5.8", value: 5.8},
                        {label: "5.9", value: 5.9},
                        {label: "6.0", value: 6},
                        {label: "6.1", value: 6.1},
                        {label: "6.2", value: 6.2},
                        {label: "6.3", value: 6.3},
                        {label: "6.4", value: 6.4},
                        {label: "6.5", value: 6.5},
                        {label: "6.6", value: 6.6},
                        {label: "6.7", value: 6.7},
                        {label: "6.8", value: 6.8},
                        {label: "6.9", value: 6.9},
                        {label: "7.0", value: 7},
                        {label: "7.1", value: 7.1},
                        {label: "7.2", value: 7.2},
                        {label: "7.3", value: 7.3},
                        {label: "7.4", value: 7.4},
                        {label: "7.5", value: 7.5},
                        {label: "7.6", value: 7.6},
                        {label: "7.7", value: 7.7},
                        {label: "7.8", value: 7.8},
                        {label: "7.9", value: 7.9},
                        {label: "8.0", value: 8},
                        {label: "8.1", value: 8.1},
                        {label: "8.2", value: 8.2},
                        {label: "8.3", value: 8.3},
                        {label: "8.4", value: 8.4},
                        {label: "8.5", value: 8.5},
                        {label: "8.6", value: 8.6},
                        {label: "8.7", value: 8.7},
                        {label: "8.8", value: 8.8},
                        {label: "8.9", value: 8.9},
                        {label: "9.0", value: 9},
                        {label: "9.1", value: 9.1},
                        {label: "9.2", value: 9.2},
                        {label: "9.3", value: 9.3},
                        {label: "9.4", value: 9.4},
                        {label: "9.5", value: 9.5},
                        {label: "9.6", value: 9.6},
                        {label: "9.7", value: 9.7},
                        {label: "9.8", value: 9.8},
                        {label: "9.9", value: 9.9},
                        {label: "10", value: 10},
                        
                        
                        
                        
                        
                        
                        
                        
                        
                        
                        
                        
                        
                
                      ]}
                    
                    defaultValue = {attValue}
                    
                    
                    arrowStyle={{marginRight: 10, size:20}}
                    containerStyle={{height: 70, width:100, justifyContent:"center"}}
                    style={{fontSize:30}}
                    itemStyle={{
                        fontSize:30,
                        backgroundColor:"white", 
                        fontColor:"white",
                        justifyContent: 'flex-start'
                    }}
                    dropDownStyle={{backgroundColor: '#fafafa', zIndex:100}}
                    onChangeItem={item => setAttValue(item.value)}
                    
                />
      
      </View>
      <View style={{
    borderStyle: 'dotted',
    borderWidth: 1,
    borderRadius: 1,
    marginTop:10
  }}>
      
</View>
<View style = {{flexDirection:'row', marginTop:10, justifyContent:'space-between', alignItems:'center'}}>
       <Text style = {{fontSize:20 , fontWeight:'bold'}}>
           Potential Matches
       </Text>
       <View>
           <View style = {{flexDirection:'row',alignItems:'center' }}>
               <Text style = {{marginRight:10, fontSize:18, fontWeight:'bold'}}>{femaleMatches}</Text>
               <FontAwesome name="female" size={30} color="red" />
               

           </View>
           <View style = {{flexDirection:'row',alignItems:'center', marginTop:10 }}>
               <Text style = {{marginRight:10, fontSize:18, fontWeight:'bold'}}>{maleMatches}</Text>
               <FontAwesome name="male" size={30} color="blue" />
               

           </View>
       </View>
   </View>
   <View style={{
    borderStyle: 'dotted',
    borderWidth: 1,
    borderRadius: 1,
    marginTop:20
  }}>
      
</View>
<View style = {{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
<View style = {{flexDirection:'row', marginTop:20, marginBottom:20 ,  }}>
           
          <FontAwesome5 name="female" size={35} color="red" />
          <FontAwesome5 name="female" size={35} color="red" />
          <FontAwesome5 name="female" size={35} color="red" />
          <FontAwesome5 name="female" size={35} color="red" />
          <FontAwesome5 name="female" size={45} color="red" />
          <FontAwesome5 name="female" size={35} color="red" />
          <FontAwesome5 name="female" size={35} color="red" />
          
          <FontAwesome5 name="female" size={35} color="red" /></View>
          <View>
              <Text style = {{fontWeight:'bold'}}>AHEAD OF</Text>
              <Text style = {{fontWeight:'bold', color:'red'}}>{femaleAhead} %</Text>
              <Text style = {{fontWeight:'bold'}} >Females</Text>
          </View>
          </View>
          <View style={{
    borderStyle: 'dotted',
    borderWidth: 1,
    borderRadius: 1,
    marginTop:20
  }}></View> 
          <View style = {{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
          <View style = {{flexDirection:'row', marginTop:20, marginBottom:20 ,  }}>
           
          <FontAwesome5 name="male" size={35} color="blue" />
          <FontAwesome5 name="male" size={35} color="blue" />
          <FontAwesome5 name="male" size={35} color="blue" />
          <FontAwesome5 name="male" size={35} color="blue" />
          <FontAwesome5 name="male" size={45} color="blue" />
          <FontAwesome5 name="male" size={35} color="blue" />
          <FontAwesome5 name="male" size={35} color="blue" />
          
          <FontAwesome5 name="male" size={35} color="blue" /></View>
          <View>
              <Text style = {{fontWeight:'bold'}}>AHEAD OF</Text>
              <Text style = {{fontWeight:'bold', color:'blue'}}>{maleAhead} %</Text>
              <Text style = {{fontWeight:'bold'}} >Males</Text>
          </View>
          </View>
          <Button title = {'Save'} containerStyle = {{marginTop:20, marginBottom:30,marginLeft:20, marginRight:20}} buttonStyle = {{backgroundColor:'black'}} onPress = {() => {setSelfFilter({...selfFilter, [attribute]:attValue}),navigation.navigate('BrowseSettings')}}/>
          </View> 
    </ScrollView>
    </SafeAreaView>
  );
};

export default AttributeFilterCLient;

const styles = StyleSheet.create({
  container: {flex:1, marginLeft:30, marginRight:30}
});

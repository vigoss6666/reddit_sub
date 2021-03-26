import React, { useState, useEffect, useRef, useCallback, useContext } from 'react';
import { Text, View, StyleSheet, Dimensions, SafeAreaView, TouchableOpacity } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import Slider from '@react-native-community/slider';
import { iconFactory } from '../../src/common/Common';
import { ScrollView } from 'react-native-gesture-handler';
import SwitchSelector from "react-native-switch-selector";
import {firebase} from '../../config'; 
import AppContext from '../../AppContext'; 
import {updateUser} from '../../networking';
const db = firebase.firestore(); 


// @refresh reset

interface BrowseSettingsProps {}

const BrowseSettings = ({navigation, route}) => {
const [selected, setSelected] = useState('filter'); 
const myContext = useContext(AppContext); 
const {user, userId, selfFilter, setSelfFilter} = myContext;
const [potentialMatches, setPotentialMatches] = useState(0); 
const [minAgePref, selectminAgePref] = useState(15); 
const [maxAgePref, selectmaxAgePref] = useState(20);
const [inches, setInches] = useState("11"); 
const [feet, setFeet ] = useState("5"); 

const [matchmaking, setMatchmaking] = useState();
const [compatibility, setCompatibility] = useState(1);
const [distance, setDistance] = useState(); 
const [creativity, setCreativity] = useState(0.1); 
const [charisma, setCharisma] = useState(selfFilter.charisma);
const [honest, setHonest] = useState(0.1);
const [humor, setHumor] = useState(0.1);
const [empathetic, setEmpathetic] = useState(0.1);
const [looks, setLooks] = useState(0.1);
const [wealthy, setWealthy] = useState(0.1);
const [status, setStatus] = useState(0.1);
console.log(selfFilter)
useEffect(() => {
   navigation.setOptions({
      headerLeft:false, 
      headerTitle:false, 
      headerRight:() => <TouchableOpacity onPress = {() => sendBack()} style = {{marginRight:10}}>
      <Text style = {{color:'orange', fontWeight:'bold'}}>Done</Text>
  </TouchableOpacity>
   })
}, [])

//   if(route.params){

//     if(route.params.attribute == 'creativity'){
//        if(creativity !== route.params.attribute){
//         setCreativity(route.params.value); 
//        }
       
//     }
//     if(route.params.attribute == 'charisma'){
//      setCharisma(route.params.value); 
//     }
//  }






const sendBack = () => {
   const finalObject = {
      creativity, 
      charisma, 
      honest, 
      looks, 
      empathetic, 
      humor, 
      status, 
      wealthy
   }
   navigation.navigate('SelfGame', {finalObject}); 
}



useEffect(() => {
  if(route.params){
     if(route.params.attribute == 'charisma'){
        setCharisma(route.params.value); 
     }
  }
},[])

const initialValue = matchmaking == true ? 0:1; 
    const options = [
        { label: "yes", value: true },
        { label: "No", value: false },
        
      ];
      const changeValue = (value) => {
        const changed = parseInt(value); 
        setCompatibility(changed); 
   }
   const handleSwitch = () => {
    if(matchmaking == "yes"){
        
     
  
    }
    else if(matchmaking == "No"){
  
    } 
    
  }
   const changeValue1 = (value) => {
    const changed = parseInt(value); 
    setDistance(changed); 
}

const [traits, setTraits] = useState([
    {
     trait:'charisma', 
     value:selfFilter.charisma
    }, 
    {
        trait:'creativity', 
        value:selfFilter.creativity
    },
    
    {
        trait:'honest', 
        value:selfFilter.honest
    },
    {
        trait:'looks', 
        value:selfFilter.looks
    },
    {
        trait:'empathetic', 
        value:selfFilter.empathetic
    },
    {
        trait:'status', 
        value:selfFilter.status
    },
    {
        trait:'wealthy', 
        value:selfFilter.wealthy
    },
    {
        trait:'narcissism', 
        value:selfFilter.narcissism
    },

]) 
function jsUcfirst(str) 
{
    return str.charAt(0).toUpperCase() + str.slice(1);
}


const finalObject = {
     minAgePref, 
     maxAgePref, 
     inches, 
     feet,
     distance, 
     traits
     
     

}


  return (
    <SafeAreaView style={{flex:1}}>
        

        <ScrollView style = {{flex:0.9, marginBottom:20 }}>
        <View style = {{marginLeft:10, marginRight:15, marginBottom:20}}>
         

         <Text style = {{fontSize:20, marginTop:30, fontWeight:'bold'}}>
            FILTER BY 
         </Text>
         <View style = {{borderBottomWidth:3, marginTop:5}}/>

         <Text style = {{marginTop:20, fontWeight:'bold', fontSize:20}}>Compatibility (Min.)</Text>

         <Text style = {{marginTop:10, fontWeight:'bold', fontSize:20}}>{compatibility}</Text>
         <Slider
    style={{ height: 40}}
    minimumValue={1}
    maximumValue={10}
    minimumTrackTintColor="#FFFFFF"
    maximumTrackTintColor="#000000" 
    onValueChange = {changeValue}
      
    // onSlidingComplete = {onSlidingComplete}
    

  />
<View style={{
    borderStyle: 'dotted',
    borderWidth: 2,
    borderRadius: 2,
    marginTop:20, 
    borderColor:'grey', 
    marginBottom:20
  }}>
</View>

{
     traits.map(val => (
         <View style = {{flexDirection:'row', justifyContent:'space-between', marginBottom:10, marginLeft:20}}>
           <View style = {{flexDirection:'row', justifyContent:'center', alignItems:'center' }}>  
           {iconFactory(val.trait, 20)}
          <Text style = {{fontSize:20, fontWeight:'bold', marginLeft:15}}>{jsUcfirst(val.trait)}: {val.value} (Min)</Text>
          </View>
          <TouchableOpacity onPress = {() => navigation.navigate('AttributeFilter', {attribute:val.trait, value:val.value})}>
              <Text style = {{color:'orange', fontSize:20}}>Edit</Text>
          </TouchableOpacity>
          </View>
     ))
}
<View style={{
    borderStyle: 'dotted',
    borderWidth: 2,
    borderRadius: 2,
    marginTop:20, 
    borderColor:'grey', 
    marginBottom:20
  }}></View>
    <Text style = {{fontWeight:"bold", marginBottom:10, marginTop:10, fontSize:15}}>AGE RANGE</Text> 
 <View style = {{flexDirection:"row", alignItems:"center", zIndex:20000}}>
    
 <Text style = {{fontWeight:"600", marginRight:20}}>MIN</Text>

 <DropDownPicker
    defaultValue = {minAgePref}                
    items={[
        
        {label: '15', value: 15, selected:true},
        {label: '16', value: 16},
        {label: '17', value: 17},
        {label: '18', value: 18},
        {label: '19', value: 19},
        {label: '20', value: 20},
        {label: '21', value: 21},
        {label: '22', value: 22},
        {label: '23', value: 23},
        {label: '24', value:24},
        {label: '25', value:25},
        {label: '26', value:26},
        {label: '27', value:27},
        {label: '28', value:28},
        {label: '29', value:29},
        {label: '30', value:30},
        {label: '31', value:31},
        {label: '32', value:32},
        {label: '33', value:33},
        {label: '34', value:34},
        {label: '35', value:35},
        {label: '36', value:36},
        {label: '37', value:37},
        {label: '38', value:38},
        {label: '39', value:39},
        {label: '40', value:40},
        {label: '41', value:41},
        {label: '42', value:42},
        {label: '43', value:43},
        {label: '44', value:44},
        {label: '45', value:45},
        {label: '46', value:46},
        {label: '47', value:47},
        {label: '48', value:48},
        {label: '49', value:49},
        {label: '50', value:50},
        {label: '51', value:51},
        {label: '52', value:53},
        {label: '53', value:53},
        {label: '54', value:54},
        {label: '55', value:55},
        {label: '56', value:56},
        {label: '57', value:57},
        {label: '58', value:58},
        {label: '59', value:59},
        {label: '60', value:60},

        

      ]}
    labelStyle = {{fontSize:20, fontWeight:'bold'}}
    onPress = {() => {console.log("pressed")}}
    containerStyle={{height: 40, width:100, }}
    style={{}}
    itemStyle={{
        
        backgroundColor:"white", 
        fontColor:"white",
        justifyContent: 'flex-start'
    }}
    dropDownStyle={{backgroundColor: '#fafafa', zIndex:100}}
    onChangeItem={item => selectminAgePref(item.value)}
    
/>

<Text style = {{fontWeight:"600", marginRight:20, marginLeft:20}}>MAX</Text>
<DropDownPicker
    labelStyle = {{fontSize:20, fontWeight:'bold'}}
    defaultValue = {maxAgePref}                
    items={[
        
        {label: '15', value: 15, selected:true},
        {label: '16', value: 16},
        {label: '17', value: 17},
        {label: '18', value: 18},
        {label: '19', value: 19},
        {label: '20', value: 20},
        {label: '21', value: 21},
        {label: '22', value: 22},
        {label: '23', value: 23},
        {label: '24', value:24},
        {label: '25', value:25},
        {label: '26', value:26},
        {label: '27', value:27},
        {label: '28', value:28},
        {label: '29', value:29},
        {label: '30', value:30},
        {label: '31', value:31},
        {label: '32', value:32},
        {label: '33', value:33},
        {label: '34', value:34},
        {label: '35', value:35},
        {label: '36', value:36},
        {label: '37', value:37},
        {label: '38', value:38},
        {label: '39', value:39},
        {label: '40', value:40},
        {label: '41', value:41},
        {label: '42', value:42},
        {label: '43', value:43},
        {label: '44', value:44},
        {label: '45', value:45},
        {label: '46', value:46},
        {label: '47', value:47},
        {label: '48', value:48},
        {label: '49', value:49},
        {label: '50', value:50},
        {label: '51', value:51},
        {label: '52', value:53},
        {label: '53', value:53},
        {label: '54', value:54},
        {label: '55', value:55},
        {label: '56', value:56},
        {label: '57', value:57},
        {label: '58', value:58},
        {label: '59', value:59},
        {label: '60', value:60},

        

      ]}
    onPress = {() => {console.log("pressed")}}
    containerStyle={{height: 40, width:100, }}
    style={{}}
    itemStyle={{
        
        backgroundColor:"white", 
        fontColor:"white",
        justifyContent: 'flex-start',
        fontWeight: '600',
    }}
    dropDownStyle={{backgroundColor: '#fafafa', zIndex:100}}
    onChangeItem={item => selectmaxAgePref(item.value)}
    
/>

 </View>

 <Text style = {{marginTop:20, fontSize:18, fontWeight:'bold', marginLeft:10, }}>Height</Text>
 <View style = {{flexDirection:"row", marginTop:15, zIndex:1000}}>
 
 <DropDownPicker
                        labelStyle = {{fontSize:20, fontWeight:'bold'}}

                        items={[
                        {label: "3 '", value: '3'},
                        {label: "4 '", value: '4',},
                        {label: "5 '", value: '5', },
                        {label: "6 '", value: '6'},
                        {label: "7 '", value: '7'},
                
                      ]}
                    
                    defaultValue = {feet}
                    
                    
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
                    onChangeItem={item => setFeet(item.value)}
                    
                />
 
 <DropDownPicker
                    
                    items={[
                        {label: '0"', value: '0'},
                        {label: '1"', value: '1',},
                        {label: '2"', value: '2', },

                        {label: '3"', value: '3'},
                        {label: '4"', value: '4'},
                        {label: '5"', value: '5'},
                        {label: '6"', value: '6',},
                        {label: '7"', value: '7', },
                        {label: '8"', value: '8'},
                        {label: '9"', value: '9'},
                        {label: '10"', value: '10'},
                        {label: '11"', value: '11',},
                        
                        
                        

                
                      ]}
                    labelStyle = {{fontSize:20, fontWeight:'bold'}}
                    onPress = {() => {console.log("pressed")}}
                    selectedtLabelStyle={{
                         color: 'blue'
                     }}
                    defaultValue = {inches}
                    // placeholder = {'10 "'}
                    // placeholderStyle={{
                    //      fontWeight: 'bold',
                    //      textAlign: 'center', 
                    //      fontSize:20
                    //  }}
                    arrowStyle={{marginRight: 10, size:20}}
                    containerStyle={{height: 70, width:100, justifyContent:"center"}}
                    style={{fontSize:30}}
                    
                    itemStyle={{
                        fontSize:30,
                        backgroundColor:"white", 
                        fontColor:"white",
                        justifyContent: 'flex-start'
                    }}
                    activeLabelStyle = {{fontSize:30}}
                    activeItemStyle = {{fontSize:30}}
                    dropDownStyle={{backgroundColor: '#fafafa', zIndex:100}}
                    onChangeItem={item => setInches(item.value)}
                    
                />

                    


</View>    

         <View style = {{flexDirection:'row',marginTop:20,justifyContent:'space-between'}}>
         <Text style = {{ fontWeight:'bold', fontSize:20}}>Maximum distance</Text>
         <Text style = {{ fontWeight:'bold', fontSize:20}}> >{distance} mi </Text>
         </View>           

         <Slider
    style={{ height: 40}}
    minimumValue={1}
    maximumValue={40}
    minimumTrackTintColor="#FFFFFF"
    maximumTrackTintColor="#000000" 
    onValueChange = {changeValue1}
    // value = {value} 
    // onSlidingComplete = {onSlidingComplete}
    

  />
<View style={{
    borderStyle: 'dotted',
    borderWidth: 2,
    borderRadius: 2,
    marginTop:20, 
    borderColor:'grey', 
    marginBottom:20
  }}>
</View>
<View style = {{flexDirection:"row", alignItems:"center", justifyContent:"space-between", marginBottom:10}}>
 <Text style = {{fontWeight:'600'}}>Display MatchMakers contacts</Text>
 <SwitchSelector
  options={options}
  initial={initialValue}
  onPress={value => {setMatchmaking(value)}}
  style = {{width:100}}
/>
 </View>
 <Text style = {{fontWeight:"600", marginTop:10}}>
 While turned on, the contacts of your matchmakers will be displayed as well. Contacts are individuals who your matchmaker knows personally but are have not downloaded Friends Help Friends. They may or may not be responsive to a request for an introduction.
 </Text> 

 </View>    
 </ScrollView>
        
      
      

                            
    </SafeAreaView>
  );
};

export default BrowseSettings;

const styles = StyleSheet.create({
  container: {flex:1}
});

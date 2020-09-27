import  React, {useState,useRef,useEffect} from 'react';
import { View, StyleSheet, Text, TextInput,TouchableOpacity,ScrollView,Image, Button,FlatList,Picker,PanResponder,Animated, TouchableWithoutFeedback, SafeAreaView} from 'react-native';
import { useMutation,useQuery } from '@apollo/react-hooks';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';



export default function ListTemplate({navigation, list}){
    const [creative, setCreative] = useState(true); 
    const ten = list.filter(val => (
        val.compatibilityScore == 10
   ))
   const tenTemplate = ten.map((val,index) => (
         <View style = {{flexDirection:'row', flexWrap:'wrap', marginLeft:10,}} key = {val.name+index}>         
         <TouchableOpacity style = {{width:80, height:80}} onPress = {() => navigation.navigate('MatchView')}>
         <MaterialIcons name="account-circle" size={80} color="black" />
         <View style = {{position:'absolute', left:20, }}>
         {creative ? <AntDesign name="heart" size={20} color="red" />:null}
         </View>
         <View style = {{position:'absolute', top:50, left:5}}>
         {creative ? <Entypo name="funnel" size={20} color="green" />:null}
         </View>
         
         <View style = {{position:'absolute', top:20,backgroundColor:'grey', borderRadius:25,padding:2}}>
         <Entypo name="trophy" size={15} color="yellow" />   
         </View>
         <View style = {{position:'absolute', right:10,backgroundColor:'grey', borderRadius:25,padding:2,top:1}}>
         <Entypo name="warning" size={15} color="maroon" />   
         </View>
         <View style = {{position:'absolute', right:1,backgroundColor:'grey', borderRadius:25,padding:2,top:30}}>
         <Entypo name="warning" size={15} color="maroon" />   
         </View>
         <View style = {{position:'absolute', right:10,backgroundColor:'grey', borderRadius:25,padding:2,top:50}}>
         <Entypo name="warning" size={15} color="maroon" />   
         </View>
         </TouchableOpacity>
         </View>
         ))
         const ninePointNine = list.filter(val => (
             val.compatibilityScore == 9.2
  ))
  const ninePointNineTemplate = ninePointNine.map((val,index) => (
              <View style = {{flexDirection:'row', flexWrap:'wrap'}} key = {val.name+index}>         
              <MaterialIcons name="account-circle" size={60} color="black" />
             </View>
      ))		
      const ninePointEight = list.filter(val => (
         val.compatibilityScore == 9.8
 ))
 const ninePointEightTemplate = ninePointEight.map((val,index) => (
          <View style = {{flexDirection:'row', flexWrap:'wrap'}} key = {val.name+index}>         
          <MaterialIcons name="account-circle" size={60} color="black" />
         </View>
  ))
  const ninePointSeven = list.filter(val => (
     val.compatibilityScore == 9.7
 ))
 const ninePointSevenTemplate = ninePointSeven.map((val,index) => (
      <View style = {{flexDirection:'row', flexWrap:'wrap'}} key = {val.name+index}>         
      <MaterialIcons name="account-circle" size={60} color="black" />
     </View>
 ))

return(
<View style = {{flex:1,}}>
<ScrollView style = {{flex:1, marginLeft:30, marginRight:30}}>
 <View style = {{flexDirection:"row", alignItems:'center'}}>
 <Text style = {styles.textHeading}>10</Text>
 <View style = {{borderBottomWidth:3, width:300, borderBottomStyle:"dotted", borderRadius:10, marginLeft:10}}/>
 </View>
 {tenTemplate}
 <View style = {{flexDirection:"row", alignItems:'center'}}>
 <Text style = {styles.textHeading}>9.9</Text>
 <View style = {{borderBottomWidth:3, width:300, borderBottomStyle:"dotted", borderRadius:10, marginLeft:10}}/>
 </View>
 {tenTemplate}
 <View style = {{flexDirection:"row", alignItems:'center'}}>
 <Text style = {styles.textHeading}>9.8</Text>
 <View style = {{borderBottomWidth:3, width:300, borderBottomStyle:"dotted", borderRadius:10, marginLeft:10}}/>
 </View>
 {tenTemplate}
 <View style = {{flexDirection:"row", alignItems:'center'}}>
 <Text style = {styles.textHeading}>9.7</Text>
 <View style = {{borderBottomWidth:3, width:300, borderBottomStyle:"dotted", borderRadius:10, marginLeft:10}}/>
 </View>
 {tenTemplate}
 <View style = {{flexDirection:"row", alignItems:'center'}}>
 <Text style = {styles.textHeading}>9.8</Text>
 <View style = {{borderBottomWidth:3, width:300, borderBottomStyle:"dotted", borderRadius:10, marginLeft:10}}/>
 </View>
 {tenTemplate}
 <View style = {{flexDirection:"row", alignItems:'center'}}>
 <Text style = {styles.textHeading}>9.7</Text>
 <View style = {{borderBottomWidth:3, width:300, borderBottomStyle:"dotted", borderRadius:10, marginLeft:10}}/>
 </View>
 {tenTemplate}
 <View style = {{flexDirection:"row", alignItems:'center'}}>
 <Text style = {styles.textHeading}>9.6</Text>
 <View style = {{borderBottomWidth:3, width:300, borderBottomStyle:"dotted", borderRadius:10, marginLeft:10}}/>
 </View>
 {tenTemplate}
 <View style = {{flexDirection:"row", alignItems:'center'}}>
 <Text style = {styles.textHeading}>9.5</Text>
 <View style = {{borderBottomWidth:3, width:300, borderBottomStyle:"dotted", borderRadius:10, marginLeft:10}}/>
 </View>
 {tenTemplate}
 <View style = {{flexDirection:"row", alignItems:'center'}}>
 <Text style = {styles.textHeading}>9.4</Text>
 <View style = {{borderBottomWidth:3, width:300, borderBottomStyle:"dotted", borderRadius:10, marginLeft:10}}/>
 </View>
 {tenTemplate}
 <View style = {{flexDirection:"row", alignItems:'center'}}>
 <Text style = {styles.textHeading}>9.3</Text>
 <View style = {{borderBottomWidth:3, width:300, borderBottomStyle:"dotted", borderRadius:10, marginLeft:10}}/>
 </View>
 {tenTemplate}
 <View style = {{flexDirection:"row", alignItems:'center'}}>
 <Text style = {styles.textHeading}>9.2</Text>
 <View style = {{borderBottomWidth:3, width:300, borderBottomStyle:"dotted", borderRadius:10, marginLeft:10}}/>
 </View>
 {tenTemplate}
 <View style = {{flexDirection:"row", alignItems:'center'}}>
 <Text style = {styles.textHeading}>9.1</Text>
 <View style = {{borderBottomWidth:3, width:300, borderBottomStyle:"dotted", borderRadius:10, marginLeft:10}}/>
 </View>
 {tenTemplate}
 <View style = {{flexDirection:"row", alignItems:'center'}}>
 <Text style = {styles.textHeading}>9</Text>
 <View style = {{borderBottomWidth:3, width:300, borderBottomStyle:"dotted", borderRadius:10, marginLeft:10}}/>
 </View>
 {tenTemplate}
 <View style = {{flexDirection:"row", alignItems:'center'}}>
 <Text style = {styles.textHeading}>8.9</Text>
 <View style = {{borderBottomWidth:3, width:300, borderBottomStyle:"dotted", borderRadius:10, marginLeft:10}}/>
 </View>
 {tenTemplate}
 <View style = {{flexDirection:"row", alignItems:'center'}}>
 <Text style = {styles.textHeading}>8.7</Text>
 <View style = {{borderBottomWidth:3, width:300, borderBottomStyle:"dotted", borderRadius:10, marginLeft:10}}/>
 </View>
 {tenTemplate}
 <View style = {{flexDirection:"row", alignItems:'center'}}>
 <Text style = {styles.textHeading}>8.6</Text>
 <View style = {{borderBottomWidth:3, width:300, borderBottomStyle:"dotted", borderRadius:10, marginLeft:10}}/>
 </View>
 {tenTemplate}
 <View style = {{flexDirection:"row", alignItems:'center'}}>
 <Text style = {styles.textHeading}>8.5</Text>
 <View style = {{borderBottomWidth:3, width:300, borderBottomStyle:"dotted", borderRadius:10, marginLeft:10}}/>
 </View>
 {tenTemplate}
 <View style = {{flexDirection:"row", alignItems:'center'}}>
 <Text style = {styles.textHeading}>8.4</Text>
 <View style = {{borderBottomWidth:3, width:300, borderBottomStyle:"dotted", borderRadius:10, marginLeft:10}}/>
 </View>
 {tenTemplate}
 <View style = {{flexDirection:"row", alignItems:'center'}}>
 <Text style = {styles.textHeading}>8.3</Text>
 <View style = {{borderBottomWidth:3, width:300, borderBottomStyle:"dotted", borderRadius:10, marginLeft:10}}/>
 </View>
 {tenTemplate}
 <View style = {{flexDirection:"row", alignItems:'center'}}>
 <Text style = {styles.textHeading}>8.2</Text>
 <View style = {{borderBottomWidth:3, width:300, borderBottomStyle:"dotted", borderRadius:10, marginLeft:10}}/>
 </View>
 {tenTemplate}
 <View style = {{flexDirection:"row", alignItems:'center'}}>
 <Text style = {styles.textHeading}>8.1</Text>
 <View style = {{borderBottomWidth:3, width:300, borderBottomStyle:"dotted", borderRadius:10, marginLeft:10}}/>
 </View>
 {tenTemplate}
 <View style = {{flexDirection:"row", alignItems:'center'}}>
 <Text style = {styles.textHeading}>8</Text>
 <View style = {{borderBottomWidth:3, width:300, borderBottomStyle:"dotted", borderRadius:10, marginLeft:10}}/>
 </View>
 {tenTemplate}
 <View style = {{flexDirection:"row", alignItems:'center'}}>
 <Text style = {styles.textHeading}>7.9</Text>
 <View style = {{borderBottomWidth:3, width:300, borderBottomStyle:"dotted", borderRadius:10, marginLeft:10}}/>
 </View>
 {tenTemplate}
 <View style = {{flexDirection:"row", alignItems:'center'}}>
 <Text style = {styles.textHeading}>7.8</Text>
 <View style = {{borderBottomWidth:3, width:300, borderBottomStyle:"dotted", borderRadius:10, marginLeft:10}}/>
 </View>
 {tenTemplate}
 <View style = {{flexDirection:"row", alignItems:'center'}}>
 <Text style = {styles.textHeading}>7.7</Text>
 <View style = {{borderBottomWidth:3, width:300, borderBottomStyle:"dotted", borderRadius:10, marginLeft:10}}/>
 </View>
 {tenTemplate}
 <View style = {{flexDirection:"row", alignItems:'center'}}>
 <Text style = {styles.textHeading}>7.6</Text>
 <View style = {{borderBottomWidth:3, width:300, borderBottomStyle:"dotted", borderRadius:10, marginLeft:10}}/>
 </View>
 {tenTemplate}
 <View style = {{flexDirection:"row", alignItems:'center'}}>
 <Text style = {styles.textHeading}>7.5</Text>
 <View style = {{borderBottomWidth:3, width:300, borderBottomStyle:"dotted", borderRadius:10, marginLeft:10}}/>
 </View>
 {tenTemplate}
 <View style = {{flexDirection:"row", alignItems:'center'}}>
 <Text style = {styles.textHeading}>7.4</Text>
 <View style = {{borderBottomWidth:3, width:300, borderBottomStyle:"dotted", borderRadius:10, marginLeft:10}}/>
 </View>
 {tenTemplate}
 <View style = {{flexDirection:"row", alignItems:'center'}}>
 <Text style = {styles.textHeading}>7.3</Text>
 <View style = {{borderBottomWidth:3, width:300, borderBottomStyle:"dotted", borderRadius:10, marginLeft:10}}/>
 </View>
 {tenTemplate}
 <View style = {{flexDirection:"row", alignItems:'center'}}>
 <Text style = {styles.textHeading}>7.2</Text>
 <View style = {{borderBottomWidth:3, width:300, borderBottomStyle:"dotted", borderRadius:10, marginLeft:10}}/>
 </View>
 {tenTemplate}
 <View style = {{flexDirection:"row", alignItems:'center'}}>
 <Text style = {styles.textHeading}>7.1</Text>
 <View style = {{borderBottomWidth:3, width:300, borderBottomStyle:"dotted", borderRadius:10, marginLeft:10}}/>
 </View>
 {tenTemplate}
 <View style = {{flexDirection:"row", alignItems:'center'}}>
 <Text style = {styles.textHeading}>7</Text>
 <View style = {{borderBottomWidth:3, width:300, borderBottomStyle:"dotted", borderRadius:10, marginLeft:10}}/>
 </View>
 {tenTemplate}
 <View style = {{flexDirection:"row", alignItems:'center'}}>
 <Text style = {styles.textHeading}>6.9</Text>
 <View style = {{borderBottomWidth:3, width:300, borderBottomStyle:"dotted", borderRadius:10, marginLeft:10}}/>
 </View>
 {tenTemplate}
 <View style = {{flexDirection:"row", alignItems:'center'}}>
 <Text style = {styles.textHeading}>6.8</Text>
 <View style = {{borderBottomWidth:3, width:300, borderBottomStyle:"dotted", borderRadius:10, marginLeft:10}}/>
 </View>
 {tenTemplate}
 <View style = {{flexDirection:"row", alignItems:'center'}}>
 <Text style = {styles.textHeading}>6.7</Text>
 <View style = {{borderBottomWidth:3, width:300, borderBottomStyle:"dotted", borderRadius:10, marginLeft:10}}/>
 </View>
 {tenTemplate}
 <View style = {{flexDirection:"row", alignItems:'center'}}>
 <Text style = {styles.textHeading}>6.5</Text>
 <View style = {{borderBottomWidth:3, width:300, borderBottomStyle:"dotted", borderRadius:10, marginLeft:10}}/>
 </View>
 {tenTemplate}
 <View style = {{flexDirection:"row", alignItems:'center'}}>
 <Text style = {styles.textHeading}>6.4</Text>
 <View style = {{borderBottomWidth:3, width:300, borderBottomStyle:"dotted", borderRadius:10, marginLeft:10}}/>
 </View>
 {tenTemplate}
 <View style = {{flexDirection:"row", alignItems:'center'}}>
 <Text style = {styles.textHeading}>6.3</Text>
 <View style = {{borderBottomWidth:3, width:300, borderBottomStyle:"dotted", borderRadius:10, marginLeft:10}}/>
 </View>
 {tenTemplate}
 <View style = {{flexDirection:"row", alignItems:'center'}}>
 <Text style = {styles.textHeading}>6.2</Text>
 <View style = {{borderBottomWidth:3, width:300, borderBottomStyle:"dotted", borderRadius:10, marginLeft:10}}/>
 </View>
 {tenTemplate}
 <View style = {{flexDirection:"row", alignItems:'center'}}>
 <Text style = {styles.textHeading}>6.1</Text>
 <View style = {{borderBottomWidth:3, width:300, borderBottomStyle:"dotted", borderRadius:10, marginLeft:10}}/>
 </View>
 {tenTemplate}
 <View style = {{flexDirection:"row", alignItems:'center'}}>
 <Text style = {styles.textHeading}>6</Text>
 <View style = {{borderBottomWidth:3, width:300, borderBottomStyle:"dotted", borderRadius:10, marginLeft:10}}/>
 </View>
 {tenTemplate}
 <View style = {{flexDirection:"row", alignItems:'center'}}>
 <Text style = {styles.textHeading}>5.9</Text>
 <View style = {{borderBottomWidth:3, width:300, borderBottomStyle:"dotted", borderRadius:10, marginLeft:10}}/>
 </View>
 {tenTemplate}
 <View style = {{flexDirection:"row", alignItems:'center'}}>
 <Text style = {styles.textHeading}>5.8</Text>
 <View style = {{borderBottomWidth:3, width:300, borderBottomStyle:"dotted", borderRadius:10, marginLeft:10}}/>
 </View>
 {tenTemplate}
 <View style = {{flexDirection:"row", alignItems:'center'}}>
 <Text style = {styles.textHeading}>5.7</Text>
 <View style = {{borderBottomWidth:3, width:300, borderBottomStyle:"dotted", borderRadius:10, marginLeft:10}}/>
 </View>
 {tenTemplate}
 <View style = {{flexDirection:"row", alignItems:'center'}}>
 <Text style = {styles.textHeading}>5.6</Text>
 <View style = {{borderBottomWidth:3, width:300, borderBottomStyle:"dotted", borderRadius:10, marginLeft:10}}/>
 </View>
 {tenTemplate}
 <View style = {{flexDirection:"row", alignItems:'center'}}>
 <Text style = {styles.textHeading}>5.5</Text>
 <View style = {{borderBottomWidth:3, width:300, borderBottomStyle:"dotted", borderRadius:10, marginLeft:10}}/>
 </View>
 {tenTemplate}
 <View style = {{flexDirection:"row", alignItems:'center'}}>
 <Text style = {styles.textHeading}>5.4</Text>
 <View style = {{borderBottomWidth:3, width:300, borderBottomStyle:"dotted", borderRadius:10, marginLeft:10}}/>
 </View>
 {tenTemplate}
 <View style = {{flexDirection:"row", alignItems:'center'}}>
 <Text style = {styles.textHeading}>5.3</Text>
 <View style = {{borderBottomWidth:3, width:300, borderBottomStyle:"dotted", borderRadius:10, marginLeft:10}}/>
 </View>
 {tenTemplate}
 <View style = {{flexDirection:"row", alignItems:'center'}}>
 <Text style = {styles.textHeading}>5.2</Text>
 <View style = {{borderBottomWidth:3, width:300, borderBottomStyle:"dotted", borderRadius:10, marginLeft:10}}/>
 </View>
 {tenTemplate}
 <View style = {{flexDirection:"row", alignItems:'center'}}>
 <Text style = {styles.textHeading}>5.1</Text>
 <View style = {{borderBottomWidth:3, width:300, borderBottomStyle:"dotted", borderRadius:10, marginLeft:10}}/>
 </View>
 {tenTemplate}
 <View style = {{flexDirection:"row", alignItems:'center'}}>
 <Text style = {styles.textHeading}>5</Text>
 <View style = {{borderBottomWidth:3, width:300, borderBottomStyle:"dotted", borderRadius:10, marginLeft:10}}/>
 </View>
 {tenTemplate}
 <View style = {{flexDirection:"row", alignItems:'center'}}>
 <Text style = {styles.textHeading}>4.9</Text>
 <View style = {{borderBottomWidth:3, width:300, borderBottomStyle:"dotted", borderRadius:10, marginLeft:10}}/>
 </View>
 {tenTemplate}
 <View style = {{flexDirection:"row", alignItems:'center'}}>
 <Text style = {styles.textHeading}>4.8</Text>
 <View style = {{borderBottomWidth:3, width:300, borderBottomStyle:"dotted", borderRadius:10, marginLeft:10}}/>
 </View>
 {tenTemplate}
 <View style = {{flexDirection:"row", alignItems:'center'}}>
 <Text style = {styles.textHeading}>4.7</Text>
 <View style = {{borderBottomWidth:3, width:300, borderBottomStyle:"dotted", borderRadius:10, marginLeft:10}}/>
 </View>
 {tenTemplate}
 <View style = {{flexDirection:"row", alignItems:'center'}}>
 <Text style = {styles.textHeading}>4.6</Text>
 <View style = {{borderBottomWidth:3, width:300, borderBottomStyle:"dotted", borderRadius:10, marginLeft:10}}/>
 </View>
 {tenTemplate}
 <View style = {{flexDirection:"row", alignItems:'center'}}>
 <Text style = {styles.textHeading}>4.5</Text>
 <View style = {{borderBottomWidth:3, width:300, borderBottomStyle:"dotted", borderRadius:10, marginLeft:10}}/>
 </View>
 {tenTemplate}
 <View style = {{flexDirection:"row", alignItems:'center'}}>
 <Text style = {styles.textHeading}>4.4</Text>
 <View style = {{borderBottomWidth:3, width:300, borderBottomStyle:"dotted", borderRadius:10, marginLeft:10}}/>
 </View>
 {tenTemplate}
 <View style = {{flexDirection:"row", alignItems:'center'}}>
 <Text style = {styles.textHeading}>4.3</Text>
 <View style = {{borderBottomWidth:3, width:300, borderBottomStyle:"dotted", borderRadius:10, marginLeft:10}}/>
 </View>
 {tenTemplate}
 <View style = {{flexDirection:"row", alignItems:'center'}}>
 <Text style = {styles.textHeading}>4.2</Text>
 <View style = {{borderBottomWidth:3, width:300, borderBottomStyle:"dotted", borderRadius:10, marginLeft:10}}/>
 </View>
 {tenTemplate}
 <View style = {{flexDirection:"row", alignItems:'center'}}>
 <Text style = {styles.textHeading}>4.1</Text>
 <View style = {{borderBottomWidth:3, width:300, borderBottomStyle:"dotted", borderRadius:10, marginLeft:10}}/>
 </View>
 {tenTemplate}
 <View style = {{flexDirection:"row", alignItems:'center'}}>
 <Text style = {styles.textHeading}>4</Text>
 <View style = {{borderBottomWidth:3, width:300, borderBottomStyle:"dotted", borderRadius:10, marginLeft:10}}/>
 </View>
 {tenTemplate}
 <View style = {{flexDirection:"row", alignItems:'center'}}>
 <Text style = {styles.textHeading}>3.9</Text>
 <View style = {{borderBottomWidth:3, width:300, borderBottomStyle:"dotted", borderRadius:10, marginLeft:10}}/>
 </View>
 {tenTemplate}
 <View style = {{flexDirection:"row", alignItems:'center'}}>
 <Text style = {styles.textHeading}>3.8</Text>
 <View style = {{borderBottomWidth:3, width:300, borderBottomStyle:"dotted", borderRadius:10, marginLeft:10}}/>
 </View>
 {tenTemplate}
 <View style = {{flexDirection:"row", alignItems:'center'}}>
 <Text style = {styles.textHeading}>3.7</Text>
 <View style = {{borderBottomWidth:3, width:300, borderBottomStyle:"dotted", borderRadius:10, marginLeft:10}}/>
 </View>
 {tenTemplate}
 <View style = {{flexDirection:"row", alignItems:'center'}}>
 <Text style = {styles.textHeading}>3.6</Text>
 <View style = {{borderBottomWidth:3, width:300, borderBottomStyle:"dotted", borderRadius:10, marginLeft:10}}/>
 </View>
 {tenTemplate}
 <View style = {{flexDirection:"row", alignItems:'center'}}>
 <Text style = {styles.textHeading}>3.5</Text>
 <View style = {{borderBottomWidth:3, width:300, borderBottomStyle:"dotted", borderRadius:10, marginLeft:10}}/>
 </View>
 {tenTemplate}
 <View style = {{flexDirection:"row", alignItems:'center'}}>
 <Text style = {styles.textHeading}>3.4</Text>
 <View style = {{borderBottomWidth:3, width:300, borderBottomStyle:"dotted", borderRadius:10, marginLeft:10}}/>
 </View>
 {tenTemplate}
 <View style = {{flexDirection:"row", alignItems:'center'}}>
 <Text style = {styles.textHeading}>3.3</Text>
 <View style = {{borderBottomWidth:3, width:300, borderBottomStyle:"dotted", borderRadius:10, marginLeft:10}}/>
 </View>
 {tenTemplate}
 <View style = {{flexDirection:"row", alignItems:'center'}}>
 <Text style = {styles.textHeading}>3.2</Text>
 <View style = {{borderBottomWidth:3, width:300, borderBottomStyle:"dotted", borderRadius:10, marginLeft:10}}/>
 </View>
 {tenTemplate}
 <View style = {{flexDirection:"row", alignItems:'center'}}>
 <Text style = {styles.textHeading}>3.1</Text>
 <View style = {{borderBottomWidth:3, width:300, borderBottomStyle:"dotted", borderRadius:10, marginLeft:10}}/>
 </View>
 {tenTemplate}
 <View style = {{flexDirection:"row", alignItems:'center'}}>
 <Text style = {styles.textHeading}>3</Text>
 <View style = {{borderBottomWidth:3, width:300, borderBottomStyle:"dotted", borderRadius:10, marginLeft:10}}/>
 </View>
 {tenTemplate}
 <View style = {{flexDirection:"row", alignItems:'center'}}>
 <Text style = {styles.textHeading}>2.9</Text>
 <View style = {{borderBottomWidth:3, width:300, borderBottomStyle:"dotted", borderRadius:10, marginLeft:10}}/>
 </View>
 {tenTemplate}
 <View style = {{flexDirection:"row", alignItems:'center'}}>
 <Text style = {styles.textHeading}>2.8</Text>
 <View style = {{borderBottomWidth:3, width:300, borderBottomStyle:"dotted", borderRadius:10, marginLeft:10}}/>
 </View>
 {tenTemplate}
 <View style = {{flexDirection:"row", alignItems:'center'}}>
 <Text style = {styles.textHeading}>2.7</Text>
 <View style = {{borderBottomWidth:3, width:300, borderBottomStyle:"dotted", borderRadius:10, marginLeft:10}}/>
 </View>
 {tenTemplate}
 <View style = {{flexDirection:"row", alignItems:'center'}}>
 <Text style = {styles.textHeading}>2.6</Text>
 <View style = {{borderBottomWidth:3, width:300, borderBottomStyle:"dotted", borderRadius:10, marginLeft:10}}/>
 </View>
 {tenTemplate}
 <View style = {{flexDirection:"row", alignItems:'center'}}>
 <Text style = {styles.textHeading}>2.5</Text>
 <View style = {{borderBottomWidth:3, width:300, borderBottomStyle:"dotted", borderRadius:10, marginLeft:10}}/>
 </View>
 {tenTemplate}
 <View style = {{flexDirection:"row", alignItems:'center'}}>
 <Text style = {styles.textHeading}>2.4</Text>
 <View style = {{borderBottomWidth:3, width:300, borderBottomStyle:"dotted", borderRadius:10, marginLeft:10}}/>
 </View>
 {tenTemplate}
 <View style = {{flexDirection:"row", alignItems:'center'}}>
 <Text style = {styles.textHeading}>2.3</Text>
 <View style = {{borderBottomWidth:3, width:300, borderBottomStyle:"dotted", borderRadius:10, marginLeft:10}}/>
 </View>
 {tenTemplate}
 <View style = {{flexDirection:"row", alignItems:'center'}}>
 <Text style = {styles.textHeading}>2.2</Text>
 <View style = {{borderBottomWidth:3, width:300, borderBottomStyle:"dotted", borderRadius:10, marginLeft:10}}/>
 </View>
 {tenTemplate}
 <View style = {{flexDirection:"row", alignItems:'center'}}>
 <Text style = {styles.textHeading}>2.1</Text>
 <View style = {{borderBottomWidth:3, width:300, borderBottomStyle:"dotted", borderRadius:10, marginLeft:10}}/>
 </View>
 {tenTemplate}
 <View style = {{flexDirection:"row", alignItems:'center'}}>
 <Text style = {styles.textHeading}>2</Text>
 <View style = {{borderBottomWidth:3, width:300, borderBottomStyle:"dotted", borderRadius:10, marginLeft:10}}/>
 </View>
 {tenTemplate}
 <View style = {{flexDirection:"row", alignItems:'center'}}>
 <Text style = {styles.textHeading}>1.9</Text>
 <View style = {{borderBottomWidth:3, width:300, borderBottomStyle:"dotted", borderRadius:10, marginLeft:10}}/>
 </View>
 {tenTemplate}
 <View style = {{flexDirection:"row", alignItems:'center'}}>
 <Text style = {styles.textHeading}>1.8</Text>
 <View style = {{borderBottomWidth:3, width:300, borderBottomStyle:"dotted", borderRadius:10, marginLeft:10}}/>
 </View>
 {tenTemplate}
 <View style = {{flexDirection:"row", alignItems:'center'}}>
 <Text style = {styles.textHeading}>1.7</Text>
 <View style = {{borderBottomWidth:3, width:300, borderBottomStyle:"dotted", borderRadius:10, marginLeft:10}}/>
 </View>
 {tenTemplate}
 <View style = {{flexDirection:"row", alignItems:'center'}}>
 <Text style = {styles.textHeading}>1.6</Text>
 <View style = {{borderBottomWidth:3, width:300, borderBottomStyle:"dotted", borderRadius:10, marginLeft:10}}/>
 </View>
 {tenTemplate}
 <View style = {{flexDirection:"row", alignItems:'center'}}>
 <Text style = {styles.textHeading}>1.5</Text>
 <View style = {{borderBottomWidth:3, width:300, borderBottomStyle:"dotted", borderRadius:10, marginLeft:10}}/>
 </View>
 {tenTemplate}
 <View style = {{flexDirection:"row", alignItems:'center'}}>
 <Text style = {styles.textHeading}>1.4</Text>
 <View style = {{borderBottomWidth:3, width:300, borderBottomStyle:"dotted", borderRadius:10, marginLeft:10}}/>
 </View>
 {tenTemplate}
 <View style = {{flexDirection:"row", alignItems:'center'}}>
 <Text style = {styles.textHeading}>1.3</Text>
 <View style = {{borderBottomWidth:3, width:300, borderBottomStyle:"dotted", borderRadius:10, marginLeft:10}}/>
 </View>
 {tenTemplate}
 <View style = {{flexDirection:"row", alignItems:'center'}}>
 <Text style = {styles.textHeading}>1.2</Text>
 <View style = {{borderBottomWidth:3, width:300, borderBottomStyle:"dotted", borderRadius:10, marginLeft:10}}/>
 </View>
 {tenTemplate}
 <View style = {{flexDirection:"row", alignItems:'center'}}>
 <Text style = {styles.textHeading}>1.1</Text>
 <View style = {{borderBottomWidth:3, width:300, borderBottomStyle:"dotted", borderRadius:10, marginLeft:10}}/>
 </View>
 {tenTemplate}
 <View style = {{flexDirection:"row", alignItems:'center'}}>
 <Text style = {styles.textHeading}>1</Text>
 <View style = {{borderBottomWidth:3, width:300, borderBottomStyle:"dotted", borderRadius:10, marginLeft:10}}/>
 </View>
 {tenTemplate}
 
</ScrollView>
</View>    
)
}


const styles = StyleSheet.create({
    textHeading:{

        fontWeight:"bold", 
        fontSize:20, 
        
        marginBottom:10,
        marginTop:10
    }
})
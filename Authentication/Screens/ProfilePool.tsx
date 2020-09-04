import  React, {useState,useRef,useEffect} from 'react';
import { View, StyleSheet,  TextInput,TouchableOpacity,ScrollView,Image,FlatList,Picker,PanResponder,Animated, TouchableWithoutFeedback, SafeAreaView, Dimensions} from 'react-native';
import { useMutation,useQuery } from '@apollo/react-hooks';
import {Button, SearchBar,Text,Avatar} from 'react-native-elements'; 
import { createFilter } from 'react-native-search-filter';
 
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
const contactList = [{name:"zaid shaikh", firstname:"zaid", _id:'123'},{name:"david", firstname:"zaid", _id:'1234'}];
const friendsList = [{}];

export default function ProfilePool({navigation}){

    const KEYS_TO_FILTERS = ['name'];
    const [search, setSearch] = useState('');
    const [caret, setCaret] = useState([{caret:false, _id:123}]); 
    const filteredEmails = contactList.filter(createFilter(search, KEYS_TO_FILTERS))
    const [namer, setNamer] = useState(1)
    
    const _checkCaret = (val) => {
         const result = caret.filter(val1 => (
              val._id == val1._id
         ))
         return result[0].caret; 
    }
    const setCaretTrue = (val) => {
         const result = filteredEmails.filter(val1 => (
              val._id == val1._id
         ))
         result[0].caret = true; 
         setNamer(namer + 1)
    }
    const setCaretFalse = (val) => {
        const result = filteredEmails.filter(val1 => (
             val._id == val1._id
        ))
        result[0].caret = false; 
        setNamer(namer + 1)
   }



    const contactsTemplate =
     <View> 
    <Text h4 style = {{alignSelf:'center',  marginTop:30, fontWeight:'bold', marginBottom:20 }}>
        Click to View a Contact
    </Text>
    <SearchBar
    lightTheme
    round
    containerStyle = {{marginLeft:15, marginRight:15}}
    searchIcon={{ size: 24 }}
    onChangeText={text => setSearch(text)}
    placeholder="search"
    value={search}
  />
  <Text h5 style = {{alignSelf:"center",marginTop:30,fontWeight:"bold",marginBottom:30}}> Select the contacts you want to help</Text>
      {filteredEmails.map((val,index) => (
        <View key = {index.toString()} style = {{ marginLeft:30, marginRight:30}}>
        <View style = {{borderBottomWidth:1, borderBottomColor:"black", width:Dimensions.get('window').width - 60,marginBottom:10}}/>
        
        <View style = {{flexDirection:"row", justifyContent:'space-between'}}>
        <View style = {{flexDirection:"row", alignItems:"center"}}>
        <Avatar rounded icon={{ name: 'home', color:'black',size:30 }} />
        <Text style = {{marginLeft:10}}>{val.name || val.firstname}</Text>
        </View>
        {   
             val.caret ? 
        <TouchableOpacity onPress = {() => setCaretFalse(val)}><AntDesign name="caretup" size={24} color="black" /></TouchableOpacity>:<TouchableOpacity onPress = {() => setCaretTrue(val)}><AntDesign name="caretdown" size={24} color="black" /></TouchableOpacity>}
        </View>
        { val.caret ? 
        <View>
        <View style = {{flexDirection:'row', justifyContent:'space-between', alignItems:'center', marginTop:10,marginBottom:15}}>
         <Text style = {{fontWeight:'bold'}}> ADD TO DATING POOL </Text>
         <TouchableOpacity>
         <Entypo name="plus" size={24} color="black" />
         </TouchableOpacity>

        </View>
        <View style={{
            borderStyle: 'dotted',
            borderWidth: 2,
            borderRadius: 1,
            borderColor:'grey',
             marginBottom:10,
             marginTop: 10,
          }}/>
          <View style = {{flexDirection:'row',alignItems:'center', justifyContent:'space-between',marginBottom:20}}>
          <Text style = {{fontWeight:'bold',}}>INVITE TO PLAY</Text>
          <TouchableOpacity>
          <Entypo name="mail" size={24} color="black" />
          </TouchableOpacity>
          </View>
          </View>
          :null}    
        </View>
   ))}
  </View>

return(
<View style = {{flex:1,}}>
<View style = {{flex:0.1}}>

</View>
<View style = {{flex:0.8}}>
<View style = {{flexDirection:"row",marginLeft:20,justifyContent:'center'}}>
<Button title = "Contacts"  type = {"outline"} raised = {true} containerStyle = {{width:150}}>
    
</Button>
<Button title = "Friends" type = {"outline"} raised = {true} containerStyle = {{width:150}}>

</Button>

</View>
{contactsTemplate}
</View>
<View style = {{flex:0.1}}>

</View>
</View>
)
}
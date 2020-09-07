import  React, {useState,useRef,useEffect} from 'react';
import { View, StyleSheet,  TextInput,TouchableOpacity,ScrollView,Image,FlatList,Picker,PanResponder,Animated, TouchableWithoutFeedback, SafeAreaView, Dimensions} from 'react-native';
import { useMutation,useQuery } from '@apollo/react-hooks';
import {Button, SearchBar,Text,Avatar} from 'react-native-elements'; 
import { createFilter } from 'react-native-search-filter';
import { MaterialIcons } from '@expo/vector-icons';
 
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { gql } from 'apollo-boost';
const contactList = [{name:"zaid shaikh", firstname:"zaid", _id:'123'},{name:"david", firstname:"zaid", _id:'1234'}];
const friendsList = [{}];


const GET_CONTACT_POOL = gql`
query {
      getContactPoolList {
            data {
                  name 
                  firstname 
                  _id 
            }
      }
}
`
const GET_DATING_POOL = gql`
query {
      getDatingPoolList {
            data {
                  name 
                  firstname 
                  _id 
                  minAge
                  maxAge
                  gender
            }
      }
}
`
// addSingleDatingPool(userInput: UserInput1!): Boolean!
const ADD_DATING = gql`
 mutation namer($userInput:UserInput1!){
       addSingleDatingPool(userInput:$userInput)
 }
`


const useFetchContactPool = () => {
     const [addDating] = useMutation(ADD_DATING); 
     const {data, loading, error} = useQuery(GET_CONTACT_POOL); 
     const KEYS_TO_FILTERS = ['name'];
     const [search, setSearch] = useState('');
     const [caret, setCaret] = useState([{caret:false, _id:123}]); 
     const [namer, setNamer] = useState(1); 
     const _sendToServer = (val) => {
           const serverObject = { _id:val._id}; 
           addDating({variables:{userInput:serverObject}, refetchQueries:[{query:GET_DATING_POOL}]}, ); 
     }
 
     if(data){
          const filteredEmails = data.getContactPoolList.data.filter(createFilter(search, KEYS_TO_FILTERS))
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
           console.log(data)
           return (
               <View style = {{flex:1}}>
           <View style = {{flex:0.4}}>          
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
       </View>
            <View style = {{flex:0.5}}>   
            <ScrollView style = {{marginBottom:30}}>    
           {filteredEmails.map((val,index) => (
             <View key = {index.toString()} style = {{ marginLeft:30, marginRight:30}}>
             <View style = {{borderBottomWidth:1, borderBottomColor:"black", width:Dimensions.get('window').width - 60,marginBottom:10}}/>
             
             <View style = {{flexDirection:"row", justifyContent:'space-between'}}>
             <View style = {{flexDirection:"row", alignItems:"center"}}>
             <MaterialIcons name="account-circle" size={24} color="black" />
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
              <TouchableOpacity onPress = {() => {_sendToServer(val)}}>
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
       </ScrollView> 
       </View>
       <View style = {{flex:0.1}}>

       </View>
       </View>
       
     )
     }      
     
     
 

     
}

const useFetchDatingPool = () => {
     const {data,loading,error} = useQuery(GET_DATING_POOL); 
     
     const KEYS_TO_FILTERS = ['name'];
     const [search, setSearch] = useState('');
     const [caret, setCaret] = useState([{caret:false, _id:123}]); 
     
     const [namer, setNamer] = useState(1)
     if(data){
          const filteredEmails = data.getDatingPoolList.data.filter(createFilter(search, KEYS_TO_FILTERS))
          console.log(data)
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
          
               return (
                    <View> 
              <Text h4 style = {{alignSelf:'center',  marginTop:30, fontWeight:'bold', marginBottom:20 }}>
                  Click to View a friends Profile
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
            </View>)
        }
        if(loading){
              return <View style = {{flex:1, justifyContent:"center", alignItems:"center"}}>
                   <Text>Loading</Text> 
              </View>
        }
     
}




export default function ProfilePool({navigation}){
const [selected, setSelected] = useState(); 
const dating = useFetchDatingPool(); 
const contact = useFetchContactPool();


return(
<View style = {{flex:1,}}>
<View style = {{flex:0.1}}>

</View>
<View style = {{flex:0.90}}>
<View style = {{flexDirection:"row",marginLeft:20,justifyContent:'center'}}>
<Button title = "Contacts"  type = {"outline"} raised = {true} containerStyle = {{width:150}}
onPress = {() => setSelected('contacts')}
>
    
</Button>
<Button title = "Friends" type = {"outline"} raised = {true} containerStyle = {{width:150}}
onPress = {() => setSelected("friends")}
>

</Button>

</View>
{selected == 'contacts'?  contact : dating}
</View>
<View style = {{flex:0.10}}>

</View>
</View>
)
}
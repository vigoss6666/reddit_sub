import  React, {useState,useRef,useEffect} from 'react';
import { View, StyleSheet,  TextInput,TouchableOpacity,ScrollView,Image,FlatList,Picker,PanResponder,Animated, TouchableWithoutFeedback, SafeAreaView, Dimensions} from 'react-native';
import { useMutation,useQuery } from '@apollo/react-hooks';
import {Button, SearchBar,Text,Avatar} from 'react-native-elements'; 
import { createFilter } from 'react-native-search-filter';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

 
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { gql } from 'apollo-boost';
import DropDownPicker from 'react-native-dropdown-picker';
import {HeaderBar} from '../../src/common/Common';
const contactList = [{name:"zaid shaikh", firstname:"zaid", _id:'123'},{name:"david", firstname:"zaid", _id:'1234'}];
const friendsList = [{}];


export const GET_CONTACT_POOL = gql`
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
export const GET_DATING_POOL = gql`
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
const REMOVE_FROM_DATING = gql`
mutation namer($userInput:UserInput1!){
      removeDatingPool(userInput:$userInput)
}

`


//removeDatingPool(userInput: UserInput1!): Boolean!
// addSingleDatingPool(userInput: UserInput1!): Boolean!
const ADD_DATING = gql`
 mutation namer($userInput:UserInput1!){
       addSingleDatingPool(userInput:$userInput)
 }
`


const useFetchContactPool = (navigation) => {
     const [addDating,] = useMutation(ADD_DATING); 
     const {data, loading, error,refetch} = useQuery(GET_CONTACT_POOL); 
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
          <View style = {{flexDirection:"row",alignItems:"center", justifyContent:"center"}}>         
         <Text  style = {{alignSelf:'center',  marginTop:30, fontWeight:'bold', marginBottom:20, fontSize:17 }}>
             Click to View a Contact
         </Text>
         <TouchableOpacity style = {{alignItems:"center", marginLeft:20,justifyContent:'center'}} onPress = {() => navigation.navigate('NewContact', {refetch})}>
         <AntDesign name="pluscircle" size={25} color="black" />
         </TouchableOpacity>
         </View>
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
             <Text style = {{marginLeft:10, marginBottom:5, fontWeight:"bold"}}>{val.name || val.firstname}</Text>
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
     const [removeDating] = useMutation(REMOVE_FROM_DATING); 
     const [country,selectCountry] = useState(['25 to 30']); 
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
          const addMale = (obj => {
               const data1 = data.getDatingPoolList.data.concat(); 
                  
                  
               const result = data1.filter(val => {
                   return val._id == obj._id 
               })
               
               result[0].gender = "male"; 
               data1.splice(0,1,result[0]); 
               setNamer(namer + 1);
                
               })
               const addFemale = (obj => {
                    const data1 = data.getDatingPoolList.data.concat(); 
                     
                     
                  const result = data1.filter(val => {
                      return val._id == obj._id 
                  })
                  
                  result[0].gender = "female"; 
                  data1.splice(0,1,result[0]); 
                  setNamer(namer + 1);  
                  })    
          
               return (
                    <View style = {{flex:1}}>
                    <View style = {{flex:0.4}}>      
              <Text style = {{alignSelf:'center',  marginTop:30, fontWeight:'bold', marginBottom:20, fontSize:17 }}>
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
            <Text h5 style = {{alignSelf:"center",marginTop:30,fontWeight:"bold",marginBottom:30}}> {data.getDatingPoolList.data.length} friends in your friends list </Text>
            </View>
            <View style = {{flex:0.5}}>
            <ScrollView style = {{marginBottom:30}}>    
                {filteredEmails.map((val,index) => (
                  <View key = {index.toString()} style = {{ marginLeft:30, marginRight:30}}>
                  <View style = {{borderBottomWidth:1, borderBottomColor:"black", width:Dimensions.get('window').width - 60,marginBottom:10}}/>
                  
                  <View style = {{flexDirection:"row", justifyContent:'space-between'}}>
                  <View style = {{flexDirection:"row", alignItems:"center"}}>
                  <MaterialIcons name="account-circle" size={24} color="black" />
                  <Text style = {{marginLeft:10,marginBottom:10,fontWeight:"bold"}}>{val.name || val.firstname}{"\n"} 0 votes by 0 friends</Text>
                  </View>
                  {   
                       val.caret ? 
                  <TouchableOpacity onPress = {() => setCaretFalse(val)}><AntDesign name="caretup" size={24} color="black" /></TouchableOpacity>:<TouchableOpacity onPress = {() => setCaretTrue(val)}><AntDesign name="caretdown" size={24} color="black" /></TouchableOpacity>}
                  </View>
                  { val.caret ? 
                  <View>
                  <View style = {{flexDirection:'row', justifyContent:'space-between', alignItems:'center', marginTop:10,marginBottom:15}}>
                   <Text style = {{fontWeight:'bold'}}> View Profile </Text>
                   <TouchableOpacity>
                   <AntDesign name="eye" size={24} color="black" />
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
                    <Text style = {{fontWeight:'bold',}}>Remove from Dating Pool</Text>
                    <TouchableOpacity onPress = {() => {removeDating({variables:{userInput:{_id:val._id}}, refetchQueries:[{query:GET_DATING_POOL}]})}}>
                    <FontAwesome name="trash" size={24} color="black" />
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
                    <Text style = {{fontWeight:'bold',}}>{val.name || val.firstname}'s sex</Text>
                    <View style = {{flexDirection:"row",justifyContent:"space-around"}}>
                    <TouchableOpacity style = {{marginRight:20}} onPress = {() => {addMale(val)}}>
                    <FontAwesome name="male" size={30} color={val.gender == 'male' ? 'green':'black'} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress = {() => {addFemale(val)}}>  
                    <FontAwesome name="female" size={30} color={val.gender == 'female' ? 'green':'black'}  />
                    </TouchableOpacity>
                    </View>
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
                    <Text style = {{fontWeight:'bold',}}>{val.name || val.firstname}'s Orientation</Text>
                    <View style = {{flexDirection:"row",justifyContent:"space-around"}}>
                    <TouchableOpacity style = {{marginRight:20}}>
                    <FontAwesome name="male" size={30} color="green" />
                    </TouchableOpacity>
                    <TouchableOpacity style = {{marginRight:20}}>
                    <FontAwesome name="female" size={30} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity>
                    <Ionicons name="ios-people" size={30} color="black" />
                    </TouchableOpacity>
                    </View>
                    </View>
                    <View style={{
                      borderStyle: 'dotted',
                      borderWidth: 2,
                      borderRadius: 1,
                      borderColor:'grey',
                       marginBottom:10,
                       marginTop: 10,
                    }}/>
                    <View style = {{flexDirection:'row',alignItems:'center', justifyContent:'space-between',marginBottom:20, zIndex:1000}}>
                    <Text style = {{fontWeight:'bold',}}>{val.name || val.firstname}'s Age</Text>
                    <TouchableOpacity>
                    <DropDownPicker
    items={[
        
        {label: '15 to 19 years', value: {minAge:15, maxAge:19}},
        {label: '20 to 24 years', value: {minAge:20, maxAge:24}},
        {label: '25 to 29 years', value: {minAge:25, maxAge:29}},
        {label: '30 to 34 years', value: {minAge:30, maxAge:34}},
        {label: '35 to 39 years', value: {minAge:35, maxAge:39}},
        {label: '40 to 44 years', value: {minAge:40, maxAge:44}},
        {label: '45 to 49 years', value: {minAge:45, maxAge:49}},
        {label: '50 to 54 years', value: {minAge:50, maxAge:54}},

      ]}
    onPress = {() => {console.log("pressed")}}
    
    containerStyle={{height: 40, width:200, }}
    style={{}}
    itemStyle={{
        
        backgroundColor:"white", 
        fontColor:"white",
        justifyContent: 'flex-start'
    }}
    dropDownStyle={{backgroundColor: '#fafafa', zIndex:100}}
    onChangeItem={item => selectCountry([...country,{...item.value, _id:val._id}])}
    
/>
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
                    </View>
                    :null}    
                  </View>
             ))}
             </ScrollView>
             </View>
             <View style = {{flex:0.1}}>

             </View>
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
const contact = useFetchContactPool(navigation);


return(
<View style = {{flex:1,}}>
<View style = {{flex:0.1}}>
<HeaderBar page = {"Friends"} navigation = {navigation}/> 
</View>
<View style = {{flex:0.90}}>
<View style = {{flexDirection:"row",marginLeft:20,justifyContent:'center'}}>
<Button title = "Contacts"  type = {"outline"} raised = {true} containerStyle = {{width:150, backgroundColor:"blue"}}
onPress = {() => setSelected('contacts')}
buttonStyle = {{backgroundColor:selected == "contacts" ? "#a8b8e3":"white", color:"white"}}
titleStyle = {{color:selected == "contacts" ? "white":"black", fontWeight:"bold"}}
>
    
</Button>
<Button title = "Friends" type = {"outline"} raised = {true} containerStyle = {{width:150}}
onPress = {() => setSelected("friends")}
buttonStyle = {{backgroundColor:selected == "friends" ? "#a8b8e3":"white", color:"white"}}
titleStyle = {{color:selected == "friends" ? "white":"black", fontWeight:"bold"}}
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
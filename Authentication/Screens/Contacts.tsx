import  React, {useState,useRef,useEffect} from 'react';
import { View, StyleSheet,  TextInput,TouchableOpacity,ScrollView,Image, FlatList,Picker,PanResponder,Animated, TouchableWithoutFeedback, SafeAreaView, KeyboardAvoidingView} from 'react-native';
import { useMutation,useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { Divider,Header,Text, SearchBar,Avatar,Icon,Button,CheckBox} from 'react-native-elements';
import { createFilter } from 'react-native-search-filter';

// addDatingPool(datingPoolList: DatingPoolObjectList1!): Boolean!

const ADD_DATING = gql`
mutation namer($datingPoolList:DatingPoolObjectList1!){
 addDatingPool(datingPoolList:$datingPoolList){
    data {
       name 
       firstname
       _id 
       gender
    }
 }
}
`



 


export default function Contacts({navigation,route}){

const [addDating, {data}] = useMutation(ADD_DATING); 
const [indexer,setIndexer] = useState([]); 
const [isSelected, setSelection] = useState(false);
const KEYS_TO_FILTERS = ['name'];
const [search, setSearch] = useState('');
const [selectAll, setSelectAll] = useState(true);
const [serverData, addServerData] = useState([]); 
const {profiles} = route.params; 
console.log(serverData)
if(data){
   navigation.navigate('ContactsSex', {profiles:data.addDatingPool.data}); 
}
const addServerDataWrapper = (text) => {
  
  const result = serverData.filter(val => val.name === text.name) 
  if(result.length > 0){
         const finaler = serverData.filter(val => val.name !== text.name);  
         addServerData(finaler); 
         console.log(serverData);
         return; 
  }
  console.log(serverData); 
}



const sendToServer = () => {
   const result = serverData.map(val => (
      {_id:val._id}
   ))
   addDating({variables:{datingPoolList:{data:result}}}); 
}



const addArray = (text) => {
    //  addDating();  
     if(indexer.includes(text)){
        
        const copyIndex = indexer.concat();  
        const index = copyIndex.indexOf(text);
            const result = copyIndex.splice(index, 1);
            setIndexer(copyIndex); 
            return; 
     }
     setIndexer([...indexer, text]);
}
const deleteArray = () => {
    setIndexer([]); 
    addServerData([]); 
}




    
    const filteredEmails = profiles.filter(createFilter(search, KEYS_TO_FILTERS))
    const addAll = () => {
     const result = filteredEmails.map(val => {
          return val.name
     })
     setIndexer(result);
     const newServerData = filteredEmails.map(val1 => {
        return {_id:val1._id}; 
     })
     addServerData(newServerData); 

    }
    const selectAllTemplate = selectAll ? <TouchableOpacity style = {{marginRight:20, marginLeft:10,marginBottom:10}} onPress = {() => {addAll(), setSelectAll(false)}}>
<Text style = {{alignSelf:'flex-end', fontWeight:"600"}}>Select all</Text>
</TouchableOpacity>:<TouchableOpacity style = {{marginRight:20, marginLeft:10,marginBottom:10}} onPress = {() => {deleteArray(), setSelectAll(true)}}>
              <Text style = {{alignSelf:'flex-end', fontWeight:"600"}}>Deselect all</Text>
          </TouchableOpacity>
    
    
    
    return(
      <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      style={{flex:1}}
    >
        <View style = {{flex:1, }}>
        <View style = {{flex:0.2}}>
                        
        </View>
        <View style = {{flex:0.2}}>
        <Text h2 style = {{alignSelf:'center'}}> Dating Pool</Text>
        <Text h6 style = {{alignSelf:'center',fontWeight:'600', marginTop:10,marginBottom:20}}> Select the friends you want to match</Text>
        <SearchBar
          lightTheme
          round
          containerStyle = {{marginLeft:15, marginRight:15}}
          searchIcon={{ size: 24 }}
          onChangeText={text => setSearch(text)}
          placeholder="search"
          value={search}
        />
        </View>
          <View style = {{marginTop:10,flex:0.4, marginTop:40}}>
          {selectAllTemplate}
          <ScrollView>
          {filteredEmails.map((val,index) => {
            return (
              <TouchableOpacity key={index} 
              style = {{borderWidth:1, height:50,flexDirection:"row",  justifyContent:'space-between', marginLeft:20, marginRight:20, borderLeftWidth:0, borderRightWidth:0,}}
              onPress = {() => { addArray(val.name), addServerData([val,...serverData, ]), addServerDataWrapper(val)  }}
              >
                
                  <View style = {{flexDirection:'row', alignItems:'center'}}>
                  <Avatar rounded icon = {{name:'account-circle', color:'black'}} activeOpacity = {0.9} size = {"medium"} />  
                  <Text>{val.name || val.firstname}</Text>
                  </View>
                  <View style = {{alignItems:'center', justifyContent:'center', marginRight:10}}>
                     <Icon name = {"check"} iconStyle = {{opacity:indexer.includes(val.name) ? 1:0}}/> 
                  </View>
              </TouchableOpacity>
            )
          })}
        </ScrollView>        
        </View>
        <View style = {{flex:0.2,marginTop:20}}>
            <Text style = {{alignSelf:'center', marginBottom:20, color:'black', fontWeight:"600", marginTop:10}}>{indexer.length} Friends selected</Text>
            <Button buttonStyle = {{backgroundColor:'black'}} title = {"Done"} containerStyle = {{marginLeft:20, marginRight:20}} disabledStyle = {{backgroundColor:'grey', }} disabled = {indexer.length > 0 ? false:true} onPress = {() => {sendToServer()}}>
                
            </Button>
               
        </View>
        </View>
        </KeyboardAvoidingView>
        )

}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    checkboxContainer: {
      flexDirection: "row",
      marginBottom: 20,
    },
    checkbox: {
      alignSelf: "center",
    },
    label: {
      margin: 8,
    },
  });
import  React, {useState,useRef,useEffect} from 'react';
import { View, StyleSheet, Text, TextInput,TouchableOpacity,ScrollView,Image, Button,FlatList,Picker,PanResponder,Animated, TouchableWithoutFeedback, SafeAreaView, Dimensions} from 'react-native';
import { useMutation,useQuery } from '@apollo/react-hooks';
import { MaterialIcons } from '@expo/vector-icons';
import {Line } from '../../src/common/Common'; 
export default function MatchList({navigation}){
const [image, setImage] = useState(false);
const DATA = [
  {
  isNew:true, 
  profilePic:'something', 
  _id:"something"   
 }, 
 {
    isNew:true, 
    profilePic:'something', 
    _id:"something"   
 },
 {
    isNew:true, 
    profilePic:'something', 
    _id:"something"   
 },
 {
    isNew:true, 
    profilePic:'something', 
    _id:"something"   
   }, 
   {
      isNew:true, 
      profilePic:'something', 
      _id:"something"   
   },
   {
      isNew:true, 
      profilePic:'something', 
      _id:"something"   
   },
   {
    isNew:true, 
    profilePic:'something', 
    _id:"something"   
   }, 
   {
      isNew:true, 
      profilePic:'something', 
      _id:"something"   
   },
   {
      isNew:true, 
      profilePic:'https://i.ytimg.com/vi/qBB_QOZNEdc/maxresdefault.jpg', 
      _id:"something"   
   },



]

interface chatInstance  {
    isNew:boolean, 
    profilePic?:string, 
    _id:string, 
    lastChat:string, 
    fullname:string 
}

const DATA1 = [
    {
    isNew:true, 
    profilePic:'something', 
    _id:"something", 
    lastChat:"Something", 
    fullname:"Amy Buckthiorpe"   
   }, 
   {
      isNew:true, 
      profilePic:'something', 
      _id:"something",   
      lastChat:"Something", 
      fullname:"Stacey smith"
   },
   {
    isNew:true, 
    profilePic:'something', 
    _id:"something",   
    lastChat:"Something", 
    fullname:"Eric backman"    
   },
   {
    isNew:true, 
    profilePic:'something', 
    _id:"something",   
    lastChat:"Something", 
    fullname:"Borat sachdev"
     }, 
     {
        isNew:true, 
      profilePic:'something', 
      _id:"something",   
      lastChat:"Something", 
      fullname:"Akiba rubstein"   
     },
     {
        isNew:true, 
      profilePic:'something', 
      _id:"something",   
      lastChat:"Something", 
      fullname:"Katy perry"   
     },
     {
        isNew:true, 
        profilePic:'something', 
        _id:"something",   
        lastChat:"Something", 
        fullname:"Kate Hudson"   
     }, 
     {
        isNew:true, 
      profilePic:'something', 
      _id:"something",   
      lastChat:"Something", 
      fullname:"Lindsay"   
     },
     {
        isNew:true, 
      profilePic:'something', 
      _id:"something",   
      lastChat:"Something", 
      fullname:"Sophie adams"   
     },
  
  
  
  ]



const Item = ({ title }) => (
    <View>
      {horizontalIcon}
    </View>
  );
const Item1 = (obj:chatInstance) => {
console.log(obj) 
if(obj.title.profilePic){
    return verticalIconWithImage(obj.title)
}   
return verticalIcon    
}
 
;  

  const renderItem = ({ item }) => (
    <Item title={item.title} />
  );  
  const renderItem1 = ({ item }) => (
    <Item1 title={item} />
  );



const horizontalIcon = image ? <Image source = {{uri:image}} style = {{height:50, width:50, borderRadius:25}}/>
:<TouchableOpacity style = {{height:50, width:50, borderRadius:25, borderWidth:1,justifyContent:"flex-end", alignItems:"center", marginLeft:10}}>
<MaterialIcons name="account-circle" size={50} color="black" />
<View style = {{height:15,width:15, position:'absolute', left:-5, backgroundColor:'red', borderRadius:7.5, top:13}}/>
</TouchableOpacity>; 

const verticalIcon = (obj:chatInstance) => <TouchableOpacity style = {{flexDirection:"row", marginTop:10}}>
<TouchableOpacity style = {{height:50, width:50, borderRadius:25, borderWidth:1,justifyContent:"flex-end", alignItems:"center", marginLeft:10}}>
<MaterialIcons name="account-circle" size={50} color="black" />
<View style = {{height:15,width:15, position:'absolute', left:-5, backgroundColor:'red', borderRadius:7.5, top:13}}/>
</TouchableOpacity>
<View style = {{marginLeft:10, justifyContent:'center',}}>
    <Text  textBreakStrategy = {"highQuality"} style = {{fontWeight:'bold'}} >{obj.fullname}</Text>
    <Text style = {{maxWidth:Dimensions.get('window').width - 100}} numberOfLines = {1}>Is that a wad of cash or are you doiung something else</Text>
</View>
</TouchableOpacity>

const verticalIconWithImage =  (obj:chatInstance) => <TouchableOpacity style = {{flexDirection:"row", marginTop:10, marginLeft:10}}>
<Image source = {{uri:'https://i.ytimg.com/vi/qBB_QOZNEdc/maxresdefault.jpg'}} style = {{height:50, width:50, borderRadius:25,}}/>

<View style = {{marginLeft:10, justifyContent:'center',}}>
    <Text  textBreakStrategy = {"highQuality"} style = {{fontWeight:'bold'}} >{obj.fullname}</Text>
    <Text style = {{maxWidth:Dimensions.get('window').width - 100}} numberOfLines = {1}>Is that a wad of cash or are you doiung something else</Text>
</View>
</TouchableOpacity>

  

return(
<View style = {{flex:1}}>
{/* 
Matches template
*/}
<View>
<Line />
<View style = {{justifyContent:"center", alignItems:"center"}}>
<Text style = {{alignSelf:"center", fontWeight:"bold", fontSize:15, marginTop:10, marginBottom:10}}>Matches</Text>
</View>
<Line />
</View>
{/* 
Horizontal flatlist 
*/}

<View>
<FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        horizontal = {true}
        showsHorizontalScrollIndicator = {false}
        style = {{marginTop:20, marginBottom:20, marginLeft:20, marginRight:20}}
      />
<Line  />      
</View>
{/* 
Vertical flatlist
*/}
<View>
 <FlatList
        data={DATA1}
        renderItem={renderItem1}
        keyExtractor={item => item.id}
        
        showsHorizontalScrollIndicator = {false}
        style = {{marginTop:20, marginBottom:20}}
      /> 
      
</View>
</View>
)
}
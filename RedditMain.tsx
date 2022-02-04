import React, { useState, useEffect,useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList,Image,TouchableOpacity,ActivityIndicator } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { FontAwesome5, Entypo } from '@expo/vector-icons';
import formatDistanceStrict from 'date-fns/formatDistance'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import DropDownPicker from 'react-native-dropdown-picker';
import { SearchBar } from 'react-native-elements';
import { WebView } from 'react-native-webview';
import toDate from 'date-fns/toDate'
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";



interface RedditMainProps {}

const RedditMain = ({navigation}) => {
  
  const [flatListHotData, setFlatListHotData] = useState([]); 
  const [flatListTopData, setFlatListTopData] = useState([]); 
  const [flatListNewData, setFlatListNewData] = useState([]);
  const searchRef = useRef(); 
  let [hotAfter,setHotAfter] = useState(); 
  let [newAfter,setNewAfter] = useState();
  let [topAfter,setTopAfter] = useState();
  let [activity, setActivity] = useState(true); 
  
  
  const [search, setSearch] = useState(""); 
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('hot');
  const [items, setItems] = useState([
    {label: 'HOT POSTS', value: 'hot'},
    {label: 'NEW POSTS', value: 'new'},
    {label: 'TOP POSTS', value: 'top'}
  ]);


  
  
  useEffect(() => {
  async function namer(){
  let hot = await fetch('https://api.reddit.com/r/programming/hot.json?limit=25');
  let hotResult = await hot.json();  
  
  
  setHotAfter(hotResult.data.after)
  let hotArray = hotResult.data.children.map(val => {
     
     return {
       author:val.data.author,
       title:val.data.title, 
       comments:val.data.num_comments,
       date:formatDistanceToNow(toDate(val.data.created_utc*1000), {includeSeconds:true}),
       score:val.data.score,
       thumbnail:val.data.thumbnail, 
       url:val.data.url
      }
  })
  setFlatListHotData(hotArray)
  let newer = await fetch('https://api.reddit.com/r/programming/new.json');
  let newResult = await newer.json();
  setNewAfter(newResult.data.after)
   
  let newMainArray = newResult.data.children.map(val => {
     
     return {
       author:val.data.author,
       title:val.data.title, 
       comments:val.data.num_comments,
       date:formatDistanceToNow(toDate(val.data.created_utc*1000), {includeSeconds:true}),
       score:val.data.score,
       thumbnail:val.data.thumbnail, 
       url:val.data.url
      }
  })
  setFlatListNewData(newMainArray)
  let top = await fetch('https://api.reddit.com/r/programming/top.json');
  let topResult = await top.json();  
  
  setTopAfter(topResult.data.after)
  let topMainArray = topResult.data.children.map(val => {
     
     return {
       author:val.data.author,
       title:val.data.title, 
       comments:val.data.num_comments,
       date:formatDistanceToNow(toDate(val.data.created_utc*1000), {includeSeconds:true}),
       score:val.data.score,
       thumbnail:val.data.thumbnail, 
       url:val.data.url
      }
  })
  setFlatListTopData(topMainArray)

    
  }
  namer()  
  
 
  
  }, [])
  
  useEffect(() => {
    if(search.length){
       setActivity(false)
       return; 
    }
    setActivity(true) 
  },[search])

  useEffect(() => {
   if(searchRef.current){
      searchRef.current.clear()
   }  
  }, [value])
  let fetchMore = async () => {
    
    if(value == 'hot'){
      let hot = await fetch(`https://api.reddit.com/r/programming/hot.json?after=${hotAfter}&limit=25`);
      let hotResult = await hot.json();
      if(hotAfter == hotResult.data.after){
        return; 
      }  
        
      setHotAfter(hotResult.data.after)
      let hotArray = hotResult.data.children.map(val => {
         
         return {
           author:val.data.author,
           title:val.data.title, 
           comments:val.data.num_comments,
           date:formatDistanceToNow(toDate(val.data.created_utc*1000), {includeSeconds:true}),
           score:val.data.score,
           thumbnail:val.data.thumbnail, 
           url:val.data.url
          }
      })
      setFlatListHotData([...flatListHotData,...hotArray])

    } 
    if(value == 'new'){
      let newer = await fetch(`https://api.reddit.com/r/programming/new.json?after=${newAfter}&limit=25`);
      let newResult = await newer.json();
      
      setNewAfter(newResult.data.after)
      let newMainArray = newResult.data.children.map(val => {
         
         return {
           author:val.data.author,
           title:val.data.title, 
           comments:val.data.num_comments,
           date:formatDistanceToNow(toDate(val.data.created_utc*1000), {includeSeconds:true}),
           score:val.data.score,
           thumbnail:val.data.thumbnail, 
           url:val.data.url
          }
      })
      setFlatListNewData([...flatListNewData,...newMainArray])
  }

  if(value == 'top'){
    let top = await fetch(`https://api.reddit.com/r/programming/top.json?after=${topAfter}&limit=25`);
    let topResult = await top.json();
    
    setTopAfter(topResult.data.after)
    let topMainArray = topResult.data.children.map(val => {
       
       return {
         author:val.data.author,
         title:val.data.title, 
         comments:val.data.num_comments,
         date:formatDistanceToNow(toDate(val.data.created_utc*1000), {includeSeconds:true}),
         score:val.data.score,
         thumbnail:val.data.thumbnail, 
         url:val.data.url
        }
    })
    setFlatListTopData([...flatListTopData,...topMainArray])
}
}
  

  
  
  const ItemDivider = () => {
    return (
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "#607D8B",
        }}
      />
    );
  }
  let searchFilterFunction = text => {
    let lister = value == 'hot' ? flatListHotData:value == 'new' ? flatListNewData:value == 'top'?flatListTopData:null
    const newData = lister.filter(item => {      
      const itemData = `${item.title.toUpperCase()}`;
      
       const textData = text.toUpperCase();
        
       return itemData.indexOf(textData) > -1;    
    });
    
    return newData; 
  };
    
  

  const Item = ({title,author,score,comments,date,thumbnail,url}) => {
    const computedFlex = thumbnail ? 0.7:1; 
    return <TouchableOpacity style={{ marginLeft:5, marginRight:5}} onPress = {() => navigation.navigate('WebViewer', {url})}>
    <View style = {{flexDirection:'row',}}>
      {thumbnail ? <View style = {{flex:0.3, justifyContent:'center', alignItems:'center'}}>

        <Image style = {[{height:100, width:100}]} source = {{uri:thumbnail}}/>

      </View>:null}
      <View style = {{flex:computedFlex, flexDirection:'column'}}>
      <View style = {styles.dateView}>
      <Text style = {styles.dateTextStyle}>{date}</Text>
      </View>
      <View style = {{marginLeft:5,marginRight:5}}>
      <Text style = {styles.titleText} numberOfLines = {3}>{title}</Text>
      </View>
      <View style = {{flexDirection:'row',height:50}}>
      <View style = {{flex:0.5, justifyContent:'center', alignItems:'center'}}>
      <Text numberOfLines = {1} style = {styles.bottomTextFont}>{author}</Text>
      </View>
      <View style = {{flex:0.3, flexDirection:'row',  justifyContent:'center',alignItems:'center'}}>
      <Entypo name="arrow-bold-up" size={16} color="grey" /> 
      <Text style = {styles.bottomTextFont}>{score}</Text>
      <Entypo name="arrow-bold-down" size={16} color="grey" /> 
      </View>
      <View style = {{flex:0.2, justifyContent:'center', alignItems:'center',flexDirection:'row',marginRight:3,marginLeft:3}}>
      <FontAwesome5 name="comment-alt" size={14} color="black" style = {{marginRight:3}}/>
      <Text style = {styles.bottomTextFont}>{comments} </Text>
      </View>
      </View>
      </View>
    </View>  
    
  </TouchableOpacity>
  }
    
  
  const renderItem = ({item}) => (
     <Item title = {item.title} author = {item.author} score = {item.score} comments = {item.comments} date = {item.date} thumbnail = {item.thumbnail} url = {item.url}/>
  )
  return (
    <SafeAreaProvider>
    <View style={[styles.container]}>
      
     <SearchBar 
     value = {search}
     ref = {searchRef}
     onChangeText = {(text) => {setSearch(text),searchFilterFunction(text)}}
     containerStyle = {{marginBottom:10}}
     /> 
      

    <DropDownPicker
      containerStyle = {{marginBottom:10, marginRight:10}}
      
      open={open}
      value={value}
      items={items}
      setOpen={setOpen}
      setValue={setValue}
      setItems={setItems}
    />
    
      <FlatList
        data={value == 'hot' ? searchFilterFunction(search):value == 'new' ? searchFilterFunction(search):value == 'top'?searchFilterFunction(search):null}
        renderItem={renderItem}
        keyExtractor={(item,index) => item.author + item.score + item.comments + index}
        onEndReached = {() => fetchMore()}
        ItemSeparatorComponent = {ItemDivider}
        extraData = {value}
        onEndReachedThreshold = {0.5}
        initialNumToRender = {7}
        ListFooterComponent = {() => <ActivityIndicator animating = {activity}/>}
        style = {{backgroundColor: '#ffffff',}}

      />
    </View>
    </SafeAreaProvider>
  );
};

export default RedditMain;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#ffffff',
      paddingTop:100,
      marginRight:10, 
      marginLeft:5
      },
     dateView:{
       width:'40%',
      height:50,
      marginRight:5,
      alignSelf:'flex-end',
      justifyContent:'center', 
      alignItems:'flex-end'
    }, 
    bottomTextFont:{
      fontSize:RFValue(12), 
      fontWeight:'400', 
    },
    box: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.5,
      shadowRadius: 2,
      elevation: 2,
    },
    titleText:{
    fontSize:RFValue(16),   
    fontWeight:'500',
    flexWrap:'wrap',
    width:'90%'
  },
  dateTextStyle:{
    fontSize:RFValue(12), 
    
  }
  
  });
  

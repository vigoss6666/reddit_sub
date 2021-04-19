import  React, {useState,useRef,useEffect, useContext} from 'react';
import { Text, View, StyleSheet, Dimensions, ScrollView, Image, SafeAreaView, SectionList, FlatList, TouchableOpacity } from 'react-native';
import { MaterialIcons, Foundation, Feather, Entypo } from '@expo/vector-icons';
import {firebase } from '../../config'; 
import {transformCreativity, computeSimDimension, computeSectionLabel} from '../../networking'; 
import { iconFactory} from '../../src/common/Common'; 
import { logTen } from './logTen';
import AppContext from '../../AppContext'; 
import {updateUser} from '../../networking';
import { FontAwesome } from '@expo/vector-icons';
// @refresh reset
const db = firebase.firestore(); 

interface SelfGameProps {}
export interface serverData {
     charisma:number, 
     creativity:number, 
     honest:number, 
     looks:number, 
     empathetic:number, 
     status:number, 
     wealthy:number, 
     humor:number
}

interface filter extends serverData {
   narcissistic:number,  
   minAge:number, 
   maxAge:number, 
   dimension:number, 
   inches:number, 
   feet:number, 
   distance:number
   matchMakerContact:boolean,
   
   
  }


interface serverDataObjectDimension {
    charisma:number, 
    creativity:number, 
    honest:number, 
    looks:number, 
    empathetic:number, 
    status:number, 
    wealthy:number, 
    humor:number, 
    dimension:number, 
    _id:number,
    minAge:number, 
    maxAge:number
    
}
export interface serverDataWithDimension extends serverData {
    dimension:number, 
}
function pipe(...fns) {
    return (arg) => fns.reduce((prev, fn) => fn(prev), arg);
}
function applyFilters(filter:filter, arr:serverDataObjectDimension[]):serverDataObjectDimension[]{
 
 const finalObject:any = []; 

 
 arr.map(val => {
      if(val.creativity >= filter.creativity 
        && val.charisma >= filter.charisma 
        && val.humor >= filter.humor
        && val.honest >= filter.honest
        && val.looks >= filter.looks
        && val.empathetic >= filter.empathetic
        && val.status >= filter.status
        && val.wealthy >= filter.wealthy
        && val.minAge >= filter.minAge
        && val.maxAge <= filter.maxAge
        && val.dimension >= filter.dimension
         
        
        ){
           finalObject.push(val); 
      }
 }) 
 return finalObject;  
}

const SelfGame = ({navigation, route}) => {
  const myContext = useContext(AppContext); 
  const {user, userId, selfFilter, setSelfFilter,computeName} = myContext;
    const [filter, setFilter] = useState(route.params ? route.params.finalObject:{});
    const [sliderState, setSliderState] = useState({ currentPage: 0 });
    const [selfMatchView, setSelfMatchView] = useState();     
    const [filters, setFilters] = useState({
        state:'california'
    })
    
    
    useEffect(() => {
        
           db.collection('user').doc(userId).get().then(doc => {
          
           db.collection('user')
           .where('state', '==', user.state)
           .where('gender', '==', user.gender == 'male'?'female':'male')
           .get()
           .then(result => {
               
                 const serverObjectWithId = result.docs.map(val => val.data()) 
                 var filtered = serverObjectWithId.filter(
                  function(e) {
                    return this.indexOf(e.phoneNumber) < 0;
                  },
                  user.introRequest
              );
              
                 
                 const logData = logTen(filtered);
                 const userLogged = logTen(user);
                 setSelfMatchView({
                   user:userLogged, 
                   data:logData
                 })

                 const simD = computeSimDimension(userLogged, logData);
                 
                 const filters = applyFilters(selfFilter, simD);  
                 
                 

                 
                 const sectionData = computeSectionLabel(filters);
                 setSectionData(sectionData);  
           })
      })
    }, [selfFilter])

 

 
    const [serverData, setServerData] = useState<[serverData]>([{
        charisma:1000, 
        creativity:1200, 
        honest:500, 
        looks:600, 
        empathetic:300, 
        status:400, 
        wealthy:300, 
        humor:500, 
        
   }]);
  
   const [sectionData, setSectionData] = useState(); 
    const [userList, setUserList] = useState()
    const { width, height } = Dimensions.get('window'); 
    const demoTemplate = [
        {
        title:9.8, 
        data:[{name:"zaid shaikh"}, {name:"huraira"}, {name:"javed"}]  
       }, 
       {
        title:9.7, 
        data:[{name:"faiz"}]  
       },

 ]; 


    
    const headerTemplate = user.profilePic ? <View>
    <Image source = {{uri:user.profilePic}} style = {{height:80, width:80, borderRadius:40}}/>
    <Text style = {{fontWeight:'bold', marginTop:5}}>{computeName(user)}</Text>
    </View>:<View>
    <MaterialIcons name="account-circle" size={24} color="black" />
    <Text style = {{fontWeight:'bold', marginTop:5}}>{computeName(user)}</Text>
    </View>
    

    const renderFlatlist = ({item}) => {
        
        
         return <View key = {item.phoneNumber} style = {{flexDirection:'row'}}>
             <TouchableOpacity onPress = {() => navigation.navigate('SelfMatchView', {selfMatchView})}>

               <MaterialIcons name="account-circle" size={70} color="black" /></TouchableOpacity>

             {item.simDimension ? <View style = {{position:'absolute', top:13, right:2, zIndex:100, backgroundColor:'#393a3b', borderRadius:15, height:30, width:30, justifyContent:'center', alignItems:'center'}}>
               {iconFactory(item.simDimension, 22)}
             </View>:null}

             </View>  
         
    }
    useEffect(() => {
      navigation.setOptions({
         headerTitle:false, 
         headerLeft:() => <TouchableOpacity onPress = {() => navigation.goBack()}>
         <Entypo name="controller-play" size={35} style = {{marginLeft:20}} />                    
         </TouchableOpacity>, 
         headerStyle:{backgroundColor:'grey'}, 
         headerRight:() => <View style = {{flexDirection:'row', alignItems:'center',}}>
         <TouchableOpacity onPress = {() => setDefaultFilter()} style = {{marginRight:10}}>
         <FontAwesome name="refresh" size={30} color="black" />
         </TouchableOpacity>
         <TouchableOpacity onPress = {() =>navigation.navigate('BrowseSettings')}>
         <Feather name="settings" size={30} color="black" style = {{marginRight:20, marginBottom:5, marginTop:5}}/>
         </TouchableOpacity>
         
         </View> 
      })
    }, [])


    const setDefaultFilter = () => {
    setSelfFilter({
      charisma:0, 
      creativity:0, 
      honest:0, 
      looks:0, 
      empathetic:0, 
      status:0, 
      humor:0, 
      wealthy:0, 
      narcissism:0,
      minAge:15, 
      maxAge:60,
      dimension:0,
    })   
    }

    const renderSectionItem = ({section, index}) => {
        
        
        if (index !== 0) return null;

         return <FlatList
        data={section.data}
        extraData = {filter}
        renderItem={renderFlatlist}
        keyExtractor={item => item.phoneNumber}
        numColumns = {5}
      />

          
    }
    
  return (
    <SafeAreaView style = {styles.container}>
        
        <View style = {{justifyContent:'center', alignItems:'center', marginTop:20}}>
        {headerTemplate}        
        </View>
        <SectionList
      style = {{marginTop:10, marginRight:15, marginLeft:15}}
      sections={sectionData}
      extraData = {filter}
      keyExtractor={(item, index) => item.phoneNumber}
      renderItem={renderSectionItem}
      renderSectionHeader={({ section: { title } }) => (
        <View style = {{ }}><Text style = {[styles.header, {paddingLeft:20}]}>{title}</Text></View>
      )}
    />
    </SafeAreaView>
    
  );
};

export default SelfGame;

const styles = StyleSheet.create({
  container: {flex:1, }, 
  header: {
    fontSize: 32,
          backgroundColor: "#fff", 
          marginTop:10,
          marginBottom:10, 
          fontWeight:'bold'
          
          
  },
});

import  React, {useState,useRef,useEffect, useContext} from 'react';
import { Text, View, StyleSheet, Dimensions, ScrollView, Image, SafeAreaView, SectionList, FlatList, TouchableOpacity } from 'react-native';
import { MaterialIcons, Foundation, Feather, Entypo, FontAwesome5 } from '@expo/vector-icons';
import {firebase } from '../../config'; 
import {transformCreativity, computeSimDimension, computeSectionLabel, getDistanceFromLatLonInKm} from '../../networking'; 
import { iconFactory, LoadScreen} from '../../src/common/Common'; 
import { logTen } from './logTen';
import AppContext from '../../AppContext'; 
import {updateUser, filterGamer, clientSort} from '../../networking';
import { FontAwesome } from '@expo/vector-icons';
//@refresh reset

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
     humor:number, 
     narcissism:number
}

interface filter extends serverData {
   narcissism:number,  
   minAgePreference:number, 
   maxAgePreference:number, 
   dimension:number, 
   inches:number, 
   feet:number, 
   distancePreference:number
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
    maxAge:number, 
    narcissism:number, 
    age:number
    
}
export interface serverDataWithDimension extends serverData {
    dimension:number, 
}
function pipe(...fns) {
    return (arg) => fns.reduce((prev, fn) => fn(prev), arg);
}
async function applyFilters(filter:filter, arr:serverDataObjectDimension[], client, createChatThread):serverDataObjectDimension[]{
 
 const finalObject:any = []; 

 
 arr.map(async val => {
          
      const distance = getDistanceFromLatLonInKm(val.latitude, val.longitude, client.latitude, client.longitude); 
      if(val.creativity >= filter.creativity 
        && val.charisma >= filter.charisma 
        && val.humor >= filter.humor
        && val.honest >= filter.honest
        && val.looks >= filter.looks
        && val.empathetic >= filter.empathetic
        && val.status >= filter.status
        && val.wealthy >= filter.wealthy
        // && val.age >= filter.minAgePreference
        // && val.age <= filter.maxAgePreference
        && val.dimension >= filter.dimension
        // && val.narcissism <= filter.narcissism
        // && distance < filter.distancePreference 
        // && filter.appUsers ? val.appUser ? true: false:true 
        // && filter.matchMakerContact ? true: val.matchMaker == client.matchMaker ? false:true 
        
         
         
        
        ){
           finalObject.push(val); 
      }
 })

 return finalObject

// const gamer = await Promise.all(finalObject.map(async val => {
//   const id = createChatThread(val.phoneNumber, client.phoneNumber); 
  
//   return await db.collection('introductions').doc(id).get().then(onDoc => {
//      if(onDoc.exists == false){
//        return val; 
//      }
//   })
// }))
// const later = gamer.filter(val => val !== undefined); 

  
//  return later;  
}

const SelfGame = ({navigation, route}) => {
  const myContext = useContext(AppContext); 
  const {user, userId, selfFilter, setSelfFilter,computeName, createChatThread, generatedMatchSelf, setGeneratedMatchSelf} = myContext;
    const [filter, setFilter] = useState(route.params ? route.params.finalObject:{});
    const [sliderState, setSliderState] = useState({ currentPage: 0 });
    const [selfMatchView, setSelfMatchView] = useState();  
    const [sectionData, setSectionData] = useState(null); 
    const [userList, setUserList] = useState()
    const { width, height } = Dimensions.get('window'); 
    const [isLoading, setIsLoading] = useState(false);    
    const [forFilters, setForFilters] = useState([]); 
    const [filters, setFilters] = useState({
        state:'california'
    })

    console.log(generatedMatchSelf.length)



    useEffect(() => {
     async function namer(){
      let copy = JSON.parse(JSON.stringify(forFilters));
      let copyFilters = JSON.parse(JSON.stringify(selfFilter))
      const filtered = await applyFilters(copyFilters, copy, user, createChatThread);
      copy = filtered; 
      const filterBySort = await clientSort(copy, copyFilters.sortOrder); 
      copy = filterBySort; 
      if(generatedMatchSelf.length){
         const result = filterGamer(copy, 'phoneNumber', generatedMatchSelf, null, null); 
         copy = result.excludedObjects; 
      }
      
      
      const sectionData = computeSectionLabel(copy);
      setSectionData(sectionData);  
     } 
     namer()
     


    }, [generatedMatchSelf, selfFilter])
    
    
    useEffect(() => {
          
           console.log("mainer called");
          setIsLoading(true);      
           db.collection('user').doc(userId).get({source:'server'}).then(doc => {
          
           db.collection('user')
           .where('state', '==', user.state)
           .where('gender', '==', user.gender == 'male'?'female':'male')
           .get({source:'server'})
           .then(async result => {
               
                 const serverObjectWithId = result.docs.map(val => val.data())

                
              
                 
                 const logData = logTen(serverObjectWithId);
                 const userLogged = logTen(user);
                 setSelfMatchView({
                   user:userLogged, 
                   data:logData
                 })

                 const simD = computeSimDimension(userLogged, logData);
                 
                 const filterBySim = simD.filter(val => val.simDimension) 

                 const filterBySort = await clientSort(filterBySim, selfFilter.sortOrder)
                 
                 //const filters = await applyFilters(selfFilter, filterBySim, user, createChatThread);
                 const filterByIntros = await Promise.all(filterBySort.map(async val => {
                  
                     const _id = createChatThread(user.phoneNumber, val.phoneNumber);
                      
                     return db.collection('introductions').doc(_id).get().then(onDoc => {
                       if(!onDoc.exists){
                          return val; 
                       }
                     })
                  
                  
          
                }))
                const removeUndefined = filterByIntros.filter(val => val !== undefined);
                setForFilters(removeUndefined);  
                 

                 
                 const sectionData = computeSectionLabel(removeUndefined);
                 setSectionData(sectionData);  
           })
      })
      
      setIsLoading(false)
    }, [])

 

 
    
  
   
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
    const computeIndex = (flatListuser) => {
      
      const result = selfMatchView.data.findIndex(val => val.phoneNumber == flatListuser.phoneNumber);
      return result;  
   }
    

    const renderFlatlist = ({item}) => {
        
        
         return <View key = {item.phoneNumber} style = {{flexDirection:'row'}}>
             <TouchableOpacity onPress = {() => navigation.navigate('SelfMatchView', {selfMatchView, userIndex:computeIndex(item)})}>

               <MaterialIcons name="account-circle" size={70} color="black" /></TouchableOpacity>

             {item.simDimension ? <View style = {{position:'absolute', top:13, right:2, zIndex:100, backgroundColor:'#393a3b', borderRadius:15, height:30, width:30, justifyContent:'center', alignItems:'center'}}>
               {iconFactory(item.simDimension, 22)}
             </View>:null}

             </View>  
         
    }
    useEffect(() => {
      navigation.setOptions({
         headerShown:false, 
         
         
      })
    }, [])

    
    const setDefaultFilter = () => {
    
    setSelfFilter({
    sortOrder:['creativity', 'charisma', 'honest', 'empathetic', 'looks', 'humor', 'status', 'wealthy'],      
    charisma:0, 
    creativity:0, 
    honest:0, 
    looks:0, 
    empathetic:0, 
    status:0, 
    humor:0, 
    wealthy:0, 
    narcissism:10,
    minAgePreference:15, 
    maxAgePreference:60,
    dimension:0, 
    distancePreference:10
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
        <View style = {{flexDirection:'row', justifyContent:'space-between', backgroundColor:'grey', alignItems:'center'}}>
        <TouchableOpacity onPress = {() => navigation.goBack()}>
         <Entypo name="controller-play" size={35} style = {{marginLeft:20}} />                    
         </TouchableOpacity>
          <Text></Text>
          <View style = {{flexDirection:'row', alignItems:'center',}}>
           <TouchableOpacity onPress = {() => navigation.navigate('MapViewSelfGame',{selfMatchView})} style = {{marginRight:15}}>
            <Foundation name="map" size={24} color="black" />
            </TouchableOpacity>
         <TouchableOpacity onPress = {() => setDefaultFilter()} style = {{marginRight:10}}>
         <FontAwesome name="refresh" size={30} color="black" />
         </TouchableOpacity>
         <TouchableOpacity onPress = {() => navigation.navigate('SelfSort')} style = {{marginRight:15}}>
            <FontAwesome5 name="sort-numeric-down" size={24} color="black" />
            </TouchableOpacity>
         <TouchableOpacity onPress = {() =>navigation.navigate('BrowseSettings')}>
         <Feather name="settings" size={30} color="black" style = {{marginRight:20, marginBottom:5, marginTop:5}}/>
         </TouchableOpacity>
         
         </View> 


        </View>
          
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

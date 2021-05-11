//@refresh reset
import React, { useState, useEffect, useRef, createContext, useContext, useCallback  } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { Text, View, StyleSheet,TouchableOpacity, Dimensions, Image,ScrollView,SectionList, FlatList } from 'react-native';
import {Entypo, Feather, MaterialIcons} from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {firebase} from '../../config'; 
import AppContext from '../../AppContext'; 
import { logTen } from './logTen';
import { iconFactory, LoadScreen} from '../../src/common/Common';

import {transformCreativity, computeSimDimension, computeSectionLabel, filterGamer, getDistanceFromLatLonInKm} from '../../networking'; 
import { filter } from 'underscore';
const db = firebase.firestore(); 
interface MatchMakeFinalProps {}

async function applyFilters(filter:any,arr:any,client, createChatThread):serverDataObjectDimension[]{

    
    const finalObject:any = [];     
      arr.map(val => {
        
        const distance = getDistanceFromLatLonInKm(val.latitude, val.longitude, client.latitude, client.longitude); 
                
        if(val.creativity >= filter.creativity 
          && val.charisma >= filter.charisma 
          && val.narcissism <= filter.narcissism 
          && val.humor >= filter.humor
          && val.honest >= filter.honest
          && val.looks >= filter.looks
          && val.empathetic >= filter.empathetic
          && val.status >= filter.status
          && val.wealthy >= filter.wealthy
          && filter.appUsers ? val.appUser == true:true
          && filter.matchMakerProfiles ? true: val.matchMaker == client.matchMaker ? false:true
          
          && val.dimension >= filter.dimension
          && distance < filter.distancePreference
          && val.age >= filter.minAgePreference
          && val.age <= filter.maxAgePreference
           
          
          ){
             
             finalObject.push(val); 
        }
   })
  
   
   return finalObject;  
   }

const MatchMakeFinal = ({navigation, route}) => {
    const myContext = useContext(AppContext); 
    const {user, userId, clientFilter, setClientFilter,sentFromBrowse, computeName, createChatThread} = myContext;
    const [sliderState, setSliderState] = useState({ currentPage:0  });
    const insets = useSafeAreaInsets();
    const [sectionData,setSectionData] = useState([]); 
    const {width, height} = Dimensions.get('window'); 
    const [userDisplay, setUserDisplay] = useState([]); 
    const [clienter, setClienter] = useState(null); 
    
    const [flat, setFlat] = useState(null)


    
    
    useEffect(() => {
      if(route.params){
        const {clientFrom} = route.params;     
        setClienter(clientFrom)
      }
    }, [])
    // useEffect(() => {
      
      
      
    // }, [clienter, sliderState.currentPage])
    
  async function getDatingPool(){
    
      const result = await db.collection('user').where(firebase.firestore.FieldPath.documentId(), 'in', user.datingPoolList).get({source:'server'}); 
      const client = await result.docs.map(val => val.data());
      return client; 
  }    
    

  
    async function setFilter(datingPoolList){
      console.log("jumper called")
      const copy = clientFilter.concat();           
      const clientNumber = copy.map(val1 => val1.client); 
      let freshCopy = []
      const result = filterGamer(datingPoolList,'phoneNumber', clientNumber, null, null)
      const finalGamer = result.excludedObjects.map(val2 => {
        
        return {client:val2.phoneNumber, 
        filter:{
               charisma:0, 
               creativity:0, 
               honest:0, 
               looks:0, 
               empathetic:0, 
               status:0, 
               humor:0, 
               wealthy:0, 
               narcissism:10,
               minAgePreference:val2.minAgePreference == 15 ? 15: val2.minAgePreference, 
               maxAgePreference:val2.maxAgePreference == 60 ? 60:val2.maxAgePreference,
               dimension:0,
               distancePreference:val2.distancePreference == 40 ? 40: val2.distancePreference, 
               matchMakerProfiles:false, 
               appUsers:true, 
       
             }}
        
       })
       console.log("clientFirlter is"); 
       console.log(clientFilter)
       
       //setClientFilter(clientFilter => [finalGamer])
       setClientFilter(clientFilter => [...clientFilter, ...finalGamer]);
       
   }

   async function setPage(datingPoolList){
    
      if(clienter){
        const index = datingPoolList.findIndex(val => val.phoneNumber == clienter.phoneNumber);
        setSliderState({
          ...sliderState,
          currentPage: index,
      }); 
      }

       


      const finalResult = await Promise.all(datingPoolList.map(async val => {
           const gender = val.gender; 
           return await db.collection('user').where('gender', '==', gender == 'male'? 'female':'male')
           .where('state', '==', val.state)
           .get({source:'server'})
           .then(onResult => {
                return {client:val, users:onResult.docs.map(val => val.data())}
           })
      }))
      
      const transformedpointstoscores = await Promise.all(finalResult.map(async val => {
          const clientLogged = await logTen(val.client); 
          const userLogged = await logTen(val.users);
          return {
               client:clientLogged, 
               users:userLogged
          } 
      }))
      
      const simDimensionTransform = await Promise.all(transformedpointstoscores.map(async val => {
          const simDimension =  await computeSimDimension(val.client, val.users);
          const filterBySim = await simDimension.filter(val => val.simDimension)
          
          //console.log(simDimension)
          
          
          if(clientFilter.length){
              if(clientFilter.filter(gamer => gamer.client == val.client.phoneNumber).length){
                  const index = clientFilter.findIndex(val1 => val1.client == val.client.phoneNumber); 
                  
                  
                  
                   const filters = await applyFilters(clientFilter[index].filter, filterBySim,val.client, createChatThread);
                   return {client:val.client, users:filters};
              }
          }
          return {client:val.client, users:filterBySim}
                  
      }))
      
      

      const forNextPage = simDimensionTransform.map(val => {
           return {
               client:val.client, 
               data:val.users
           }
      })
      
      setUserDisplay(forNextPage)

      const sectionDataTransform = simDimensionTransform.map(val => {
           return {
             client:val.client, 
             sectionData:computeSectionLabel(val.users)
           }
      }) 
      
      setSectionData(sectionDataTransform); 

     
   }
   
    
   useEffect(() => {
    async function namer(){
     const datingPool = await getDatingPool();  
     await setFilter(datingPool)
     await setPage(datingPool)
    } 
    namer() 
      
      
  }, [])
    
    
        
    

    const [clients, setClients] = useState([]); 
    const sliderTemplate =  sectionData.map((val,index) => {
        return <View style={{ width}} id = {val.client.phoneNumber}>
        <View style = {{ alignItems:"center", marginTop:20}}>
        {val.client.profilePic ?<Image source = {{uri:val.client.profilePic}} style = {{height:60, width:60, borderRadius:30}}/> :<MaterialIcons name="account-circle" size={75} color="black" />}
        <Text style = {{fontWeight:"bold", marginTop:10}}>{ computeName(val.client) }</Text>
        </View>
        </View>
       })
    


    
    useEffect(() => {
       
        
        
        
    }, [clienter, clientFilter,flat])
    
    const setSliderPage = (event: any) => {
        const { currentPage } = sliderState;
        const { x } = event.nativeEvent.contentOffset;
        
        const indexOfNextScreen = Math.floor(x / width);
        if (indexOfNextScreen !== currentPage && indexOfNextScreen >= 0) {
            setSliderState({
                ...sliderState,
                currentPage: indexOfNextScreen,
            });
        }
    };

    const computeIndex = (flatListuser) => {
       const result = userDisplay[sliderState.currentPage].data.findIndex(val => val.phoneNumber == flatListuser.phoneNumber);
       return result;  
    }
    const renderSectionItem = ({section, index}) => {
        
        console.log('called')
        if (index !== 0) return null;

         return <FlatList
        data={section.data}
        
        renderItem={renderFlatlist}
        keyExtractor={item => item.phoneNumber}
        numColumns = {5}
      />

          
    }
    const renderFlatlist = ({item, index}) => {
        
        
         return <View key = {item.phoneNumber} style = {{flexDirection:'row'}}>
             <TouchableOpacity onPress = {() => navigation.navigate('MatchViewLatest', {pageData:userDisplay, clientIndex:sliderState.currentPage, userIndex:computeIndex(item)})}>

               <MaterialIcons name="account-circle" size={70} color="black" /></TouchableOpacity>

             {item.simDimension ? <View style = {{position:'absolute', top:13, right:2, zIndex:100, backgroundColor:'#393a3b', borderRadius:15, height:30, width:30, justifyContent:'center', alignItems:'center'}}>
               {iconFactory(item.simDimension, 22)}
             </View>:null}

             </View>  
         
    }

 if(sectionData.length){
    return (
        <View style={{flex:1, paddingTop:insets.top}}>
          <View style = {{flexDirection:'row', justifyContent:'space-between',alignItems:'center', backgroundColor:'grey',flex:'6%'}}>
             <TouchableOpacity onPress = {() => {setClientFilter([{client:'something', filter:{}}]), navigation.navigate('Homer') }} >
            <Entypo name="controller-play" size={35} style = {{marginLeft:20}} />                    
            </TouchableOpacity>   
            <TouchableOpacity onPress = {() => navigation.navigate('BrowseMatchSettings', {client:userDisplay[sliderState.currentPage].client})}>
            <Feather name="settings" size={30} color="black" style = {{marginRight:20, marginBottom:5, marginTop:5}}/>
            </TouchableOpacity>
            </View>
            <View style = {{flex:'16%'}}>
            <ScrollView
            contentOffset = {{x:414*sliderState.currentPage, y:0}}
           style = {{ }} 
           
    horizontal = {true}
    pagingEnabled = {true}
    showsHorizontalScrollIndicator={false}
    scrollEventThrottle={8}
    onScroll={(event: any) => {
        setSliderPage(event);
    }}
    >
    {sliderTemplate}
    
    
    </ScrollView>
    </View>
    <View style = {{flex:'78%'}}>
    <SectionList
          style = {{marginTop:10, marginRight:15, marginLeft:15, flex:0.9}}
          sections={sectionData[sliderState.currentPage].sectionData}
          keyExtractor={(item, index) => item.phoneNumber}
          renderItem={renderSectionItem}
          renderSectionHeader={({ section: { title } }) => (
            <View style = {{ }}><Text style = {[styles.header, {paddingLeft:20}]}>{title}</Text></View>
          )}
        />
        </View>
        </View>
      );
 }
 return <LoadScreen />
 
  
};

export default MatchMakeFinal;
const styles = StyleSheet.create({
    
    header: {
      fontSize: 32,
            backgroundColor: "#fff", 
            marginTop:10,
            marginBottom:10, 
            fontWeight:'bold'
            
            
    },
  });
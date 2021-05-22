//@refresh reset
import React, { useState, useEffect, useRef, createContext, useContext, useCallback  } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { Text, View, StyleSheet,TouchableOpacity, Dimensions, Image,ScrollView,SectionList, FlatList } from 'react-native';
import {Entypo, Feather, FontAwesome, FontAwesome5, Foundation, MaterialIcons} from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {firebase} from '../../config'; 
import AppContext from '../../AppContext'; 
import { logTen } from './logTen';
import { iconFactory, LoadScreen} from '../../src/common/Common';


import {transformCreativity, computeSimDimension, computeSectionLabel, filterGamer, getDistanceFromLatLonInKm, clientSort} from '../../networking'; 
import { filter } from 'underscore';
const db = firebase.firestore(); 
interface MatchMakeFinalProps {}

async function applyFilters(filter:any,arr:any,client, createChatThread):serverDataObjectDimension[]{
    //  console.log(client.name) 
    //  console.log(filter) 
    
    const finalObject:any = [];     
      arr.map(val => {
        
        //const distance = getDistanceFromLatLonInKm(val.latitude, val.longitude, client.latitude, client.longitude); 
                
        if(
          val.creativity >= filter.creativity 
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
          //1 ==1 
          && val.dimension >= filter.dimension
          // && distance < filter.distancePreference
          // && val.age >= filter.minAgePreference
          // && val.age <= filter.maxAgePreference
           
          
          ){
             
             finalObject.push(val); 
        }
   })
  
   
   return finalObject;  
   }

const MatchMakeFinal = ({navigation, route}) => {
    const myContext = useContext(AppContext); 
    const {setChangedClient,changedClient,CustomBackComponent,user, userId, clientFilter, setClientFilter,sentFromBrowse, computeName, createChatThread} = myContext;
    const [sliderState, setSliderState] = useState({ currentPage:0  });
    const insets = useSafeAreaInsets();
    const [sectionData,setSectionData] = useState([]); 
    const {width, height} = Dimensions.get('window'); 
    const [userDisplay, setUserDisplay] = useState([]); 
    const [clienter, setClienter] = useState(null); 
    const [loader, setLoader] = useState(true); 
    const [forFilters, setForFilters] = useState([])
    //let forFilters = useRef([]).current; 
    const [profiles, setProfiles] = useState([]); 
    const [tempCopy, setTempCopy] = useState([]); 
    
    const [flat, setFlat] = useState(null)
    


    useEffect(() => {
      console.log("SOmething changed forFilters")
    }, [forFilters])
  
    
    useEffect(() => {
      async function namer(){
        
          // console.log("apply Filter called")
          // console.log("checking the forFilters values after returning from settings page")
          // console.log("for filters"); 
          // forFilters.map(val => console.log("length is"+val.users.length))
          const plane = []
          const copy = JSON.parse(JSON.stringify(forFilters)); 
          // const filterCopy = clientFilter.concat(); 
          //const mainArrayIndex = copy.findIndex(val => val.client.phoneNumber == changedClient.phoneNumber); 
          // const filterIndex = filterCopy.findIndex(val => val.client == changedClient.phoneNumber);
          // console.log("checking filters")
          // console.log(clientFilter[filterIndex].client)
          //  console.log(clientFilter[filterIndex].filter)
          // console.log("checking the CLientName for the filter");
          // console.log(changedClient.name) 
          // console.log("checking the filter snapshot value"); 
          // console.log(filterCopy[filterIndex].filter) 
          await Promise.all(clientFilter.map(async val => {
            const checkMainIndex = copy.findIndex(val1 => val1.client.phoneNumber == val.client); 
            
            const filters = await applyFilters(val.filter, copy[checkMainIndex].users,copy[checkMainIndex].client, createChatThread); 
            copy[checkMainIndex].users = filters; 
            console.log("length checker"); 
            
            
            
            const result = await clientSort(copy[checkMainIndex].users, val.sortOrder); 
            
            copy[checkMainIndex].users = result; 
            
            //copy[0].users = gamer; 

          }))
          
          // const filters =  await applyFilters(filterCopy[filterIndex].filter, copy[mainArrayIndex].users,changedClient, createChatThread);
          // console.log("checking array sent to filters"); 
          // copy[mainArrayIndex].users.map(val => console.log(val.name))

          // console.log("checking returned filter value"); 
          // filters.map(val => console.log(val.name))


          
          //copy[mainArrayIndex].users = filters; 
          const sectionDataTransform = await Promise.all(copy.map(val => {
            return {
              client:val.client, 
              sectionData:computeSectionLabel(val.users)
            }
       })) 
       
      
       setSectionData(sectionDataTransform)
       setChangedClient(null)
  
         
        
      }
      namer()

    }, [clientFilter])


    async function refreshFilter(){
     const copy = clientFilter.concat();
     const currentCLient = profiles[sliderState.currentPage]; 
     
      const index = copy.findIndex(val => val.client == currentCLient.phoneNumber);
      
     copy[index].filter = {
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
      distancePreference:40,
      appUsers:false, 
      matchMakerProfiles:true
      }
      setClientFilter(copy);  
      //console.log(clientFilter)

      
    }

  //  console.log("chnaged client is"); 
  //  console.log(sectionData[0])
    
    
    // useEffect(() => {
    //   if(route.params){
    //     const {clientFrom} = route.params;     
    //     setClienter(clientFrom)
    //   }
    // }, [])
    // useEffect(() => {
      
      
      
    // }, [clienter, sliderState.currentPage])
    // userDisplay.length ? userDisplay.map(val => console.log(val.client.name)):null
    console.log(sliderState.currentPage)
    profiles.length ? console.log(profiles[sliderState.currentPage].name):null
    
  async function getDatingPool(){
    
      const result = await db.collection('user').where(firebase.firestore.FieldPath.documentId(), 'in', user.datingPoolList).get(); 
      const client = await result.docs.map(val => val.data());
      setProfiles(client)
      console.log("clientVIew")
      client.map(val => console.log(val.name))
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
        sortOrder:['creativity', 'charisma', 'honest', 'empathetic', 'looks', 'humor', 'status', 'wealthy'],    
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
               matchMakerProfiles:true, 
               appUsers:true, 
       
             }}
        
       })
       
       
       //setClientFilter(clientFilter => [finalGamer])
       setClientFilter(clientFilter => [...clientFilter, ...finalGamer]);
       
   }

   async function setPage(datingPoolList){
     console.log("mainer fired")     

      // if(clienter){
      //   const index = datingPoolList.findIndex(val => val.phoneNumber == clienter.phoneNumber);
      //   setSliderState({
      //     ...sliderState,
      //     currentPage: index,
      // }); 
      // }

       

      setLoader(true)
      const finalResult = await Promise.all(datingPoolList.map(async val => {
           const gender = val.gender; 
           return await db.collection('user').where('gender', '==', gender == 'male'? 'female':'male')
           .where('state', '==', val.state)
           .get()
           .then(onResult => {
                return {client:val, users:onResult.docs.map(val => val.data())}
           })
      }))
      console.log("finalResult"); 
      finalResult.map(val => console.log(val.client.name))
      
      const transformedpointstoscores = await Promise.all(finalResult.map(async val => {
          const clientLogged = await logTen(val.client); 
          const userLogged = await logTen(val.users);
          return {
               client:clientLogged, 
               users:userLogged
          } 
      }))
      console.log("PointsTranform"); 
      transformedpointstoscores.map(val => console.log(val.client.name))
      
      const simDimensionTransform = await Promise.all(transformedpointstoscores.map(async val => {
          const simDimension =  await computeSimDimension(val.client, val.users);
          const filterBySim = await simDimension.filter(val => val.simDimension)
          
          //console.log(simDimension)
          
          
          // if(clientFilter.length){
          //     if(clientFilter.filter(gamer => gamer.client == val.client.phoneNumber).length){
          //         const index = clientFilter.findIndex(val1 => val1.client == val.client.phoneNumber); 
                  
                  
                  
          //          const filters = await applyFilters(clientFilter[index].filter, filterBySim,val.client, createChatThread);
          //          return {client:val.client, users:filters};
          //     }
          // }
          return {client:val.client, users:filterBySim}
                  
      }))
      
      
      //setForFilters(simDimensionTransform); 
       
      setForFilters(simDimensionTransform)


      const forNextPage = simDimensionTransform.map(val => {
           return {
               client:val.client, 
               data:val.users
           }
      })
      const forNextPageFilter = forNextPage.filter(val => val.data.length !== 0); 
      
      setUserDisplay(forNextPageFilter)

      const sectionDataTransform = simDimensionTransform.map(val => {
           return {
             client:val.client, 
             sectionData:computeSectionLabel(val.users)
           }
      })
      console.log("sectionChecker"); 
      sectionDataTransform.map(val => console.log(val.client.name)) 
      setLoader(false)
      setSectionData(sectionDataTransform); 

     
   }
   
    
   useEffect(() => {
    async function namer(){
     console.log("i was Mainer boy") 
     const datingPool = await getDatingPool();  
     await setFilter(datingPool)
     await setPage(datingPool)
    } 
    namer() 
      
      
  }, [])
    
    
        
    

    const [clients, setClients] = useState([]); 
    const sliderTemplate =  profiles.map((val,index) => {
        return <View style={{ width}} id = {val.phoneNumber}>
        <View style = {{ alignItems:"center", marginTop:20}}>
        {val.profilePic ?<Image source = {{uri:val.profilePic}} style = {{height:60, width:60, borderRadius:30}}/> :<MaterialIcons name="account-circle" size={75} color="black" />}
        <Text style = {{fontWeight:"bold", marginTop:10}}>{ computeName(val) }</Text>
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
        extraData = {sectionData} 
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

 if(loader == false && sectionData.length){
     
      return (
        <View style={{flex:1, paddingTop:insets.top}}>
          <View style = {{flexDirection:'row', justifyContent:'space-between',alignItems:'center', backgroundColor:'grey',flex:'6%'}}>
             <TouchableOpacity onPress = {() => { navigation.navigate('Homer')}}>
            <Entypo name="controller-play" size={35} style = {{marginLeft:20}} />                    
            </TouchableOpacity>
            <View style = {{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
            <TouchableOpacity onPress = {() => navigation.navigate('MapViewClientGame',{client:profiles[sliderState.currentPage], pageData:userDisplay})} style = {{marginRight:15}}>
            <Foundation name="map" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity onPress = {() => navigation.navigate('Sort',{client:profiles[sliderState.currentPage]})} style = {{marginRight:15}}>
            <FontAwesome5 name="sort-numeric-down" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity onPress = {() => refreshFilter()} style = {{marginRight:10}}>
            <FontAwesome name="refresh" size={30} color="black" />
            </TouchableOpacity>
               
            <TouchableOpacity onPress = {() => navigation.navigate('BrowseMatchSettings', {client:profiles[sliderState.currentPage]})}>
            <Feather name="settings" size={30} color="black" style = {{marginRight:20, marginBottom:5, marginTop:5}}/>
            </TouchableOpacity>
            </View>   
            </View>
            <View style = {{flex:'16%'}}>
            <ScrollView
            //contentOffset = {{x:414*sliderState.currentPage, y:0}}
           style = {{ }} 
           
    horizontal = {true}
    pagingEnabled = {true}
    showsHorizontalScrollIndicator={false}
    scrollEventThrottle={16}
    onScroll={(event: any) => {
        setSliderPage(event);
    }}
    >
    {sliderTemplate}
    
    
    </ScrollView>
    </View>
    <View style = {{flex:'78%'}}>
    <SectionList
          extraData = {clientFilter}
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
 if(loader == false && !sectionData.length){
  return <View style = {{flex:1,justifyContent:'center', alignItems:'center', backgroundColor:'black'}}>

<Text style = {{color:'white', fontSize:20, fontWeight:'bold', fontStyle:'italic'}}>Your friends currently have no matches</Text>
<View style = {{flexDirection:'row', justifyContent:'space-between', marginTop:50}}>

 <CustomBackComponent navigation = {navigation}/>
 <Text>

 </Text>
 <Text></Text>
</View>
</View>
  
}
if(loader == true){
  return <LoadScreen />
}
 
 
  
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
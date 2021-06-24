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


import {transformCreativity, computeSimDimension, computeSectionLabel, filterGamer, getDistanceFromLatLonInKm, clientSort, computeSimDimensionShuffle} from '../../networking'; 
import { filter } from 'underscore';
const db = firebase.firestore(); 
interface MatchMakeFinalProps {}

async function applyFilters(filter:any,arr:any,client, createChatThread):serverDataObjectDimension[]{
  //  console.log(filter)
  
    
    if(arr.length == 0){
      return []; 
    }
    console.log("client outside")
   console.log(client.phoneNumber)
    
    const finalObject:any = [];     
      await Promise.all(arr.map(async val => {
        
        //const distance = getDistanceFromLatLonInKm(val.latitude, val.longitude, client.latitude, client.longitude); 
        //console.log(filter)
        console.log("dimension condtion checker");  
        console.log(val.dimension >= filter.dimension)        
        console.log("app condition checker");  
        console.log(filter.appUsers ? val.appUser == true:true)

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
          && val.dimension >= filter.dimension
          
          
          
          // && distance < filter.distancePreference
          // && val.age >= filter.minAgePreference
          // && val.age <= filter.maxAgePreference
           
          
          ){
            console.log("i was called")
            //  console.log("clientPhonenumber")
            //  console.log(client.phoneNumber)
            //  console.log("dimension result")
            //  console.log("for this client"+val.phoneNumber)
            //  console.log(val.dimension >= filter.dimension)
             finalObject.push(val); 
        }
         
   }))

   const filterByAppUsers = finalObject.length ? finalObject.filter(val => filter.appUsers ? val.appUser == true:true ):[]; 
   const filterByMatchMaker = filterByAppUsers.length ? filterByAppUsers.filter(val => filter.matchMakerProfiles ? true: val.matchMaker == client.matchMaker ? false:true):[]; 
   
   
  
  
   
   return filterByMatchMaker;  
   }

const MatchMakeFinal = ({navigation, route}) => {
    const myContext = useContext(AppContext); 
    const {setChangedClient,changedClient,CustomBackComponent,user, userId, clientFilter, setClientFilter,sentFromBrowse, computeName, createChatThread, generatedMatch, setGeneratedMatch} = myContext;
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
      navigation.setOptions({
        headerShown:false
      })
    }, [])
    


    useEffect(() => {
      console.log("SOmething changed forFilters")
    }, [forFilters])
  
    
    useEffect(() => {
      async function namer(){
        
        
      //     // const plane = []
          const copy = JSON.parse(JSON.stringify(forFilters)); 
          
          
          
          await Promise.all(clientFilter.map(async val => {
            //console.log(clientFilter)
            // console.log("Insider promise cchker"); 
            // console.log(val.client); 
            
            const checkMainIndex = copy.findIndex(val1 => val1.client.phoneNumber == val.client);
            
            
            const filters = await applyFilters(val.filter, copy[checkMainIndex].users,copy[checkMainIndex].client, createChatThread); 
            
            copy[checkMainIndex].users = filters; 
            
            const result =  await clientSort(copy[checkMainIndex].users, val.sortOrder); 
            
            copy[checkMainIndex].users = result; 
            
            
            
          }))
          
          if(generatedMatch.length){
            
            await Promise.all(generatedMatch.map(val => {
               const  mainerIndex = copy.findIndex(copyValue => copyValue.client.phoneNumber == val.client.phoneNumber); 
               
               const result1 =  copy[mainerIndex].users.filter(copyUser => copyUser.phoneNumber !== val.user.phoneNumber)  
               
               copy[mainerIndex].users = result1; 

            })) 
          }
          
          
          

        
          
          const sectionDataTransform = await Promise.all(copy.map(val => {
            return {
              client:val.client, 
              sectionData:computeSectionLabel(val.users)
            }
       })) 
       
      
       setSectionData(sectionDataTransform)
       
  
         
        
      }
      namer()

    }, [generatedMatch,clientFilter])


    async function refreshFilter(){
     const copy = JSON.parse(JSON.stringify(clientFilter));
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
    
    
    
  async function getDatingPool(){
    const checkerResult = await Promise.all(user.datingPoolList.map(async val => {
      return await db.collection('user').doc(val).get().then(onDoc => {
        if(onDoc.exists){
          return onDoc.data()
        }
        return null; 
      })
      
     }))
     const finalChecker = checkerResult.filter(val => val !== null);
    
      // const result = await db.collection('user').where(firebase.firestore.FieldPath.documentId(), 'in', user.datingPoolList).get(); 
      // const client = await result.docs.map(val => val.data());
      setProfiles(finalChecker)
      
      // client.map(val => console.log(val.name))
      return finalChecker; 
  }    
    

  
    async function setFilter(datingPoolList){
      const finalGamer = datingPoolList.map(val => {
        return {
          client:val.phoneNumber, 
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
               minAgePreference:val.minAgePreference == 15 ? 15: val.minAgePreference, 
               maxAgePreference:val.maxAgePreference == 60 ? 60:val.maxAgePreference,
               dimension:0,
               distancePreference:val.distancePreference == 40 ? 40: val.distancePreference, 
               matchMakerProfiles:true, 
               appUsers:false, 
       
             }
        }
      })
      setClientFilter(finalGamer); 
      // console.log("jumper called")
      // const copy = clientFilter.concat();           
      // const clientNumber = copy.map(val1 => val1.client); 
      // let freshCopy = []
      // const result = filterGamer(datingPoolList,'phoneNumber', clientNumber, null, null)
      // const finalGamer = result.excludedObjects.map(val2 => {
        
      //   return {client:val2.phoneNumber,
      //   sortOrder:['creativity', 'charisma', 'honest', 'empathetic', 'looks', 'humor', 'status', 'wealthy'],    
      //   filter:{
      //          charisma:0, 
      //          creativity:0, 
      //          honest:0, 
      //          looks:0, 
      //          empathetic:0, 
      //          status:0, 
      //          humor:0, 
      //          wealthy:0, 
      //          narcissism:10,
      //          minAgePreference:val2.minAgePreference == 15 ? 15: val2.minAgePreference, 
      //          maxAgePreference:val2.maxAgePreference == 60 ? 60:val2.maxAgePreference,
      //          dimension:0,
      //          distancePreference:val2.distancePreference == 40 ? 40: val2.distancePreference, 
      //          matchMakerProfiles:true, 
      //          appUsers:true, 
       
      //        }}
        
      //  })
       
       
      //  //setClientFilter(clientFilter => [finalGamer])
      //  setClientFilter(clientFilter => [...clientFilter, ...finalGamer]);
       
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
      
      
      const transformedpointstoscores = await Promise.all(finalResult.map(async val => {
          const clientLogged = await logTen(val.client); 
          const userLogged = await logTen(val.users);
          return {
               client:clientLogged, 
               users:userLogged
          } 
      }))
      
      
      const simDimensionTransform = await Promise.all(transformedpointstoscores.map(async val => {
          const simDimension =  await computeSimDimensionShuffle(val.client, val.users);
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

      
      
      const filterByIntros = await Promise.all(simDimensionTransform.map(async val => {
        const filteredUsers = await Promise.all(val.users.map(val1 => {
           const _id = createChatThread(val.client.phoneNumber, val1.phoneNumber);
            
           return db.collection('introductions').doc(_id).get().then(onDoc => {
             if(!onDoc.exists){
                return val1; 
             }
           })
        }))
        const finalFilter = filteredUsers.filter(val => val !== undefined); 
        return {client:val.client, users:finalFilter}

      }))
       
      const filterBySort = await Promise.all(filterByIntros.map(async val => {
        return {
          client:val.client, 
          users:await clientSort(val.users, ['creativity', 'charisma', 'honest', 'empathetic', 'looks', 'humor', 'status', 'wealthy'])
        }
   }))
      

      
       
      setForFilters(filterBySort)


      const forNextPage = filterBySort.map(val => {
           return {
               client:val.client, 
               data:val.users
           }
      })
      const forNextPageFilter = forNextPage.filter(val => val.data.length !== 0); 
      
      setUserDisplay(forNextPageFilter)

      const sectionDataTransform = filterBySort.map(val => {
           return {
             client:val.client, 
             sectionData:computeSectionLabel(val.users)
           }
      })
      
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
      //  const result = userDisplay[sliderState.currentPage].data.findIndex(val => val.phoneNumber == flatListuser.phoneNumber);
      //  return result;
      return 0;   
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
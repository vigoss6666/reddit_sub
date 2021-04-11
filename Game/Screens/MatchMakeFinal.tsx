import React, { useState, useEffect, useRef, createContext, useContext, } from 'react';
import { Text, View, StyleSheet,TouchableOpacity, Dimensions, Image,ScrollView,SectionList, FlatList } from 'react-native';
import {Entypo, Feather, MaterialIcons} from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {firebase} from '../../config'; 
import AppContext from '../../AppContext'; 
import { logTen } from './logTen';
import { iconFactory} from '../../src/common/Common';
import {transformCreativity, computeSimDimension, computeSectionLabel} from '../../networking'; 
const db = firebase.firestore(); 
interface MatchMakeFinalProps {}
const computeName = (obj) => {
    if(obj.name){
       return obj.name
    }
    if(obj.firstName && obj.lastName){
       return obj.firstName+obj.lastName
    }
    return obj.firstName
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

const MatchMakeFinal = ({navigation}) => {
    const myContext = useContext(AppContext); 
    const {user, userId, clientFilter, setClientFilter } = myContext;
    const [sliderState, setSliderState] = useState({ currentPage: 0 });
    const insets = useSafeAreaInsets();
    const [sectionData,setSectionData] = useState([]); 
    const {width, height} = Dimensions.get('window'); 
    const [userDisplay, setUserDisplay] = useState([]); 
    
    

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
        async function namer(){
          const result = await db.collection('user').where(firebase.firestore.FieldPath.documentId(), 'in', user.datingPoolList).get(); 
          const client = await result.docs.map(val => val.data()); 
          const defaultSetter = client.map(val => {
              return Object.assign({}, {client:val.phoneNumber, filter:{
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
              }})
          })
           setClientFilter(defaultSetter); 

          const finalResult = Promise.all(client.map(async val => {
               const gender = val.gender; 
               return await db.collection('user').where('gender', '==', gender == 'male'? 'female':'male')
               .where('state', '==', val.state)
               .get()
               .then(onResult => {
                    return {client:val, users:onResult.docs.map(val => val.data())}
               })
          }))
          const firstData = await finalResult; 
          const transformedpointstoscores = firstData.map(val => {
              const clientLogged = logTen(val.client); 
              const userLogged = logTen(val.users);
              return {
                   client:clientLogged, 
                   users:userLogged
              } 
          })
          const simDimensionTransform = transformedpointstoscores.map(val => {
              const simDimension = computeSimDimension(val.client, val.users);
              if(clientFilter.length){
                  if(clientFilter.filter(gamer => gamer.client == val.client.phoneNumber).length){
                      const index = clientFilter.findIndex(val1 => val1.client == val.client.phoneNumber); 
                      const filters = applyFilters(clientFilter[index].filter, simDimension);
                      return {client:val.client, users:filters};
                  }
              }
              return {client:val.client, users:simDimension}
                      
          })
          
          

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
        namer()
    }, [])
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
        console.log(item.simDimension)
        
         return <View key = {item.phoneNumber} style = {{flexDirection:'row'}}>
             <TouchableOpacity onPress = {() => navigation.navigate('MatchViewLatest', {pageData:userDisplay, clientIndex:sliderState.currentPage, userIndex:index})}>

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
             <TouchableOpacity>
            <Entypo name="controller-play" size={35} style = {{marginLeft:20}} />                    
            </TouchableOpacity>   
            <TouchableOpacity onPress = {() => navigation.navigate('BrowseMatchSettings', {client:userDisplay[sliderState.currentPage].client})}>
            <Feather name="settings" size={30} color="black" style = {{marginRight:20, marginBottom:5, marginTop:5}}/>
            </TouchableOpacity>
            </View>
            <View style = {{flex:'16%'}}>
            <ScrollView
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
 return <View>
     <Text>Loading</Text>
 </View>
  
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
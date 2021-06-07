import  React, {useState,useRef,useEffect, useContext} from 'react';
import { Text, View, StyleSheet, Image, ScrollView } from 'react-native';
import { MaterialIcons, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import AppContext from '../../AppContext'; 
import isPast from 'date-fns/isPast'
import sub from 'date-fns/sub'
import isAfter from 'date-fns/isAfter'
import { filter } from 'underscore';
import { filterGamer } from '../../networking';
import {Line, LoadScreen } from '../../src/common/Common';
import {getObjectFromDatabase} from '../../networking';  
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useFocusEffect } from '@react-navigation/native';
//@refresh reset


interface MatchProps {}







function MatchFactory({match, computeName, handleTouch}){
    const bottomTextCompute = (matchInstance) => {
         if(matchInstance.endorsementFlag && matchInstance.endorsements.length > 1){
             return <Text style = {{fontWeight:'bold', marginLeft:10}}>Endorsed by you & {matchInstance.endorsements.length -1} others</Text>
         }
         if(matchInstance.endorsementFlag && matchInstance.endorsements.length == 1){
            return <Text style = {{fontWeight:'bold', marginLeft:10}}>Endorsed by you </Text>
        }
         if(!matchInstance.endorsementFlag && matchInstance.endorsements.length == 0){
          <Text style = {{fontWeight:'bold', marginLeft:10}}> Discovered by {computeName(matchInstance.discoveredClient)}</Text>

            
         }
         if(!matchInstance.endorsementFlag && matchInstance.endorsements.length == 1){
            return <Text style = {{fontWeight:'bold', marginLeft:10}}> Endorsed by {computeName(matchInstance.endorsementClients[0])} </Text>
        }
        if(!matchInstance.endorsementFlag && matchInstance.endorsements.length > 1){
            return <Text style = {{fontWeight:'bold', marginLeft:10}}> Endorsed by {matchInstance.endorsements.length} People </Text>
        }
        if(matchInstance.endorsements.length == 0){
             return <Text style = {{fontWeight:'bold', marginLeft:10}}> Discovered by {computeName(matchInstance.discoveredClient)}</Text>
            
        }
    } 
    if(match.endorsementFlag){
        return (
       <View>
       <Line />
      <View style = {{flexDirection:'row', alignItems:'center'}}>
     <View style = {{flexDirection:'row', marginTop:12, marginBottom:12}} onPress = {() => console.log("seen")}>
     <AntDesign name="star" size={24} color="orange" style = {{position:'absolute', left:33, top:12, zIndex:100}}/>
     <MaterialCommunityIcons name="account-circle-outline" size={50} color="black" />
  
     <MaterialCommunityIcons name="account-circle-outline" size={50} color="black" style = {{marginLeft:-10}}/>
     </View>
     <View style = {{ alignItems:'center'}}>
     <Text style = {{fontWeight:'bold', fontSize:14}}> {computeName(match.client1User)} & {computeName(match.client2User)}</Text>
     {bottomTextCompute(match)}
     </View>
     
     </View>   
     <Line />  
     </View>
        ) 
        
     }
    
    if(match.seen == true){
       return (
      <View>
      <Line />
     <View style = {{flexDirection:'row', alignItems:'center'}}>
     
    <TouchableOpacity style = {{flexDirection:'row', marginTop:12, marginBottom:12}} onPress = {() => handleTouch(match)}>
    <MaterialCommunityIcons name="account-circle-outline" size={50} color="black" />
 
    <MaterialCommunityIcons name="account-circle-outline" size={50} color="black" style = {{marginLeft:-10}}/>
    </TouchableOpacity>
    <View style = {{justifyContent:'center', alignItems:'center'}}>
    <Text style = {{fontWeight:'bold', fontSize:14}}> {computeName(match.client1User)} & {computeName(match.client2User)}</Text>
    {bottomTextCompute(match)}
    </View>
    
    </View>   
    <Line />  
    </View>
       ) 
       
    }
    
    return <View>
      <Line />
     <View style = {{flexDirection:'row', alignItems:'center'}}>
    <TouchableOpacity style = {{flexDirection:'row', marginTop:12, marginBottom:12}} onPress = {() => handleTouch(match)}>
    <View style = {{height:15,width:15, position:'absolute', left:0, backgroundColor:'red', borderRadius:7.5, top:20, zIndex:200}}/>
    <MaterialCommunityIcons name="account-circle-outline" size={50} color="black" />
 
    <MaterialCommunityIcons name="account-circle-outline" size={50} color="black" style = {{marginLeft:-10}}/>
    </TouchableOpacity>
    <View style = {{justifyContent:'center', alignItems:'center'}}>
    <Text style = {{fontWeight:'bold', fontSize:14}}> {computeName(match.client1User)} & {computeName(match.client2User)}</Text>
    {bottomTextCompute(match)}
    </View>
    
    </View>   
    <Line />  
    </View>
      

}

const Match = ({navigation}) => {
  const myContext = useContext(AppContext); 
  const [client1Template, setClient1Template] = useState([]); 
  const [client2Template, setClient2Template] = useState([]); 
  const [matches,setMatches] = useState([]); 
  const [loading, setLoading] = useState(false); 
  const { user,userId, selfFilter, setSelfFilter,computeName,db, firebase, stringifyNumber, } = myContext;

  const handleTouch = (matchInstance) => {
    db.collection('user').doc(userId).set({seenClientMatches:firebase.firestore.FieldValue.arrayUnion(matchInstance._id)}, {merge:true}); 
    navigation.navigate('EndorsementClient', {matchInstance})
  }
  
  useFocusEffect(
    React.useCallback(() => {
      console.log("i was called")   
      
      namer()
    }, [])
  );

  
    async function namer(){
      
      setLoading(true)
      const client1Array = []; 
      const client2Array = []; 
       await Promise.all(user.datingPoolList.map(async val => {
        return await db.collection('matches').where('client1', '==', val).get().then(onDoc => {
             
            if(onDoc.docs.length){
               onDoc.docs.map(val => client1Array.push(Object.assign({}, val.data(), {_id:val.id})))
            }
          
        })
        
       }))
       await Promise.all(user.datingPoolList.map(async val => {
        return await db.collection('matches').where('client2', '==', val).get().then(onDoc => {
             
            if(onDoc.docs.length){
               onDoc.docs.map(val => client2Array.push(Object.assign({}, val.data(), {_id:val.id})))
            }
          
        })
        
       }))
        const transformed = client2Array.map(val => {
        let a = val.client1;
        let b = val.client2;
        let temp;
        temp = a;
        a = b;
        b = temp;
        return { ...val, client1: a, client2: b };
      });
      const mainArray = [...client1Array, ...transformed]; 
      if(mainArray.length == 0){
        setLoading(false)
      }
       
      const filterByReported = mainArray.filter(val => val.reported !== true); 
      const filterByUnmatched = filterByReported.filter(val => val.unMatched !== true); 
       const transformedWithUsers1 = await Promise.all(filterByUnmatched.map(async (val) => {
        return await db.collection('user').doc(val.client2).get().then(result => Object.assign({}, val, { client2User: result.data() }));
      }));
       const transformedWithUsers2 = await Promise.all(transformedWithUsers1.map(async (val) => {
        return await db.collection('user').doc(val.client1).get().then(result => Object.assign({}, val, { client1User: result.data() }));
      }));
      
      const getDiscoveredBy = await Promise.all( transformedWithUsers2.map(async val => {
        return Object.assign({}, val, {discoveredClient:await getObjectFromDatabase(val.discoveredBy, db)})
     }))
    //  console.log("checking user"); 
    //  console.log(getDiscoveredBy[0].client1User.phoneNumber)
     
        const getEndorsements = await Promise.all(getDiscoveredBy.map(async val => {
       if(val.endorsements.length){
         const endorsementArray = []
        await Promise.all(val.endorsements.map(async val1 => {
          return await db.collection('user').where(firebase.firestore.FieldPath.documentId(), '==', val1).get().then(onDoc => {
               
              if(onDoc.docs.length){
                 onDoc.docs.map(val2 => endorsementArray.push(Object.assign({}, val2.data())))
              }
            
          })
          
          
         }))
         return Object.assign({}, val, {endorsementClients:endorsementArray})
        

        // return db.collection('user').where(firebase.firestore.FieldPath.documentId(), 'in', val.endorsements).get().then(onResult => {
        //   return Object.assign({}, val, {endorsementClients:onResult.docs.map(val => val.data())})
        //  })
       }
       return Object.assign({}, val, {endorsementClients:[]})
        
     }))
     console.log(getEndorsements[1].endorsementClients.length)
           function applyToIncluded(val){
          return {...val, seen:true}  
        }
      const filteredBySeen = filterGamer(getEndorsements, '_id', user.seenClientMatches,null, applyToIncluded);       
      const grandestArray = [...filteredBySeen.excludedObjects, ...filteredBySeen.includedObjects];
        const endorsementAdder = grandestArray.map(val => {
        let endorsementFlag = false; 
        if(val.endorsements.length){
            val.endorsements.map(val1 => {
                if(val1 == userId){
                    endorsementFlag = true; 
                }
           })
        }
        
        return {...val, endorsementFlag}
    });
        setMatches(endorsementAdder);
        setLoading(false); 
       
       


       
    }
    

  // useEffect(() => {
  //   const unsubscribe1 = db.collection('matches').where('client1', 'in', user.datingPoolList).onSnapshot(async (onResultClient1) => {
  //     const diffClient = await db.collection('matches').where('client2', 'in', user.datingPoolList).get(); 
  //     const diffClientUsers = diffClient.docs.map(val => Object.assign({}, val.data(),{_id:val.id} )); 
  //      const transformed = diffClientUsers.map(val => {
  //       let a = val.client1;
  //       let b = val.client2;
  //       let temp;
  //       temp = a;
  //       a = b;
  //       b = temp;
  //       return { ...val, client1: a, client2: b };
  //     });

  //     const clientObjects = onResultClient1.docs.map(val => Object.assign({}, val.data(), { _id: val.id }));
  //     const collective = [...transformed, ...clientObjects]; 
      
  //     const filterByReported = collective.filter(val => val.reported !== true); 
  //     const filterByUnmatched = filterByReported.filter(val => val.unMatched !== true);
  //     const transformedWithUsers1 = await Promise.all(filterByUnmatched.map(async (val) => {
  //       return await db.collection('user').doc(val.client2).get().then(result => Object.assign({}, val, { client2User: result.data() }));
  //     }));
  //      const transformedWithUsers2 = await Promise.all(transformedWithUsers1.map(async (val) => {
  //       return await db.collection('user').doc(val.client1).get().then(result => Object.assign({}, val, { client1User: result.data() }));
  //     }));
  //     const getDiscoveredBy = await Promise.all( transformedWithUsers2.map(async val => {
  //       return Object.assign({}, val, {discoveredClient:await getObjectFromDatabase(val.discoveredBy, db)})
  //    }))
  //    const getEndorsements = await Promise.all(getDiscoveredBy.map(async val => {
  //      if(val.endorsements.length){
  //       return db.collection('user').where(firebase.firestore.FieldPath.documentId(), 'in', val.endorsements).get().then(onResult => {
  //         return Object.assign({}, val, {endorsementClients:onResult.docs.map(val => val.data())})
  //        })
  //      }
  //      return Object.assign({}, val, {endorsementClients:[]})
        
  //    })) 
     

      
      

  //       function applyToIncluded(val){
  //         return {...val, seen:true}  
  //       }
  //     const filteredBySeen = filterGamer(getEndorsements, '_id', user.seenClientMatches,null, applyToIncluded);       
  //     const grandestArray = [...filteredBySeen.excludedObjects, ...filteredBySeen.includedObjects];
  //     const endorsementAdder = grandestArray.map(val => {
  //       let endorsementFlag = false; 
  //       if(val.endorsements.length){
  //           val.endorsements.map(val1 => {
  //               if(val1 == userId){
  //                   endorsementFlag = true; 
  //               }
  //          })
  //       }
        
  //       return {...val, endorsementFlag}
  //   });
      
      
  //     setMatches(endorsementAdder);
  //   });
     
    
  //   return () => { unsubscribe1()};
  // }, [user.seenClientMatches]);

  
  


  // useEffect(() => {
  
  //   const unsubscribe = db.collection('matches').where('client1', 'in', user.datingPoolList).onSnapshot(async onResult => {
  //       const result = onResult.docs.map(val => Object.assign({}, val.data(), {_id:val.id}));
  //       const finalResult = await Promise.all( result.map( async val1 => {
  //          return db.collection('user').doc(val1.client1).get().then(onDoc => {
  //               return db.collection('user').doc(val1.client2).get().then(onDoc2 => {
  //                    return {
  //                      ...val1, 
  //                      client1User:onDoc.data(), 
  //                      client2User:onDoc2.data()   
  //                    }
  //               }) 
  //          })  
  //       }))
  //       const getDiscoveredBy = await Promise.all( finalResult.map(async val => {
  //          return  Object.assign({}, val, {discoveredClient:await getObjectFromDatabase("+917208110384", db)})
  //       }))
  //       const getEndorsements = await Promise.all(getDiscoveredBy.map(async val => {
  //         return db.collection('user').where(firebase.firestore.FieldPath.documentId(), 'in', val.endorsements).get().then(onResult => {
  //             return Object.assign({}, val, {endorsementClients:onResult.docs.map(val => val.data())})
  //         })
  //       }))
        

        
        

  //       function applyToIncluded(val){
  //           return Object.assign({}, val, {seen:true}); 
  //       }
  //       const filterBySeen = filterGamer(getEndorsements, '_id', user.seenClientMatches, null, applyToIncluded);
  //       const combinedArray = [...filterBySeen.excludedObjects, ...filterBySeen.includedObjects];
        
        
  //       const endorsementAdder = combinedArray.map(val => {
  //           let endorsementFlag = false; 
  //           if(val.endorsements){
  //               val.endorsements.map(val1 => {
  //                   if(val1 == userId){
  //                       endorsementFlag = true; 
  //                   }
  //              })
  //           }
            
  //           return {...val, endorsementFlag}
  //       }); 
  //       const checker = endorsementAdder.map(val => val.seen); 
        
       
  //       setClient1Template(endorsementAdder); 
    
  //     })
       
      
  
  
  // return () => unsubscribe(); 
  // }, [user.seenClientMatches])

  

  // useEffect(() => {
  //    const unsubscribe = db.collection('matches').where('client2', 'in', user.datingPoolList).onSnapshot(onResult => {
  //       const result = onResult.docs.map(val => val.data()); 
        
  //     })
  //     return () => unsubscribe(); 

  // }, [])

  const template = matches.map(val => {
      
      return <MatchFactory match = {val} key = {val._id} computeName = {computeName} handleTouch = {handleTouch}/>
  })
  if(loading){
    return <LoadScreen />
  }
  return (
    <ScrollView style={{flex:1,}}>
      <View style = {{marginLeft:20, marginRight:10}}>
      {template}
      </View>  
    </ScrollView>
  );
};

export default Match;

const styles = StyleSheet.create({
  container: {}
});

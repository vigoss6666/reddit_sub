import React, { useState, useEffect, useContext } from 'react';
import { View, FlatList,Text } from 'react-native';
import { firebase } from '../../config';
import AppContext from '../../AppContext';
import { UserFactory, db } from './MatchList';
import {filterGamer} from '../../networking'; 

//@refresh reset

export function MatchChats({navigation, setChatNotification}) {
  const myContext = useContext(AppContext);
  const { user, userId, firebase, createChatThread, computeName } = myContext;
  const [chatList, setChatList] = useState([]);
  const handleChatPressed = (doc) => {
    
    db.collection('user').doc(userId).update({seenChats:firebase.firestore.FieldValue.arrayUnion(doc.lastMessage._id)})
    navigation.navigate('ChatLatest', {mainer:doc}); 
}
  const renderVerticalList = ({ item }) => {
    const messageText = item.lastMessage.user._id == userId ? <Text numberOfLines = {1} style = {{maxWidth:200}}> You: {item.lastMessage.text}</Text>:<Text numberOfLines = {1} style = {{maxWidth:200}}> {item.lastMessage.text}</Text>
    return <View>
      
    <View style = {{flexDirection:'row', alignItems:'center', marginTop:20}}>
        
     <UserFactory user={item} onPress={handleChatPressed} />
     <View style = {{marginLeft:10}}>
     <Text style = {{fontWeight:'bold',maxWidth:100, maxHeight:50}} numberOfLines = {1}>{computeName(item.clientUser)}</Text>    
     {messageText}
     </View>
    </View>
    </View>
  };
  // useEffect(() => {
  //   if (user.chatted.length) {
  //     db.collection('matches').where('chatted', '==', true).onSnapshot(async (onResult) => {
  //       const data = onResult.docs.map(val => Object.assign({}, val.data(), { _id: val.id }));
  //       const result = data.map(val => {

  //         if (val.client2 == userId) {
  //           let a = val.client1;
  //           let b = val.client2;
  //           let temp;
  //           temp = a;
  //           a = b;
  //           b = temp;
  //           return { ...val, client1: a, client2: b };
  //         }
  //         return val;
  //       });

  //       //   const transformedWithUsers =  await Promise.all(result.map(async val => {
  //       //     return await db.collection('user').doc(val.client2).get().then(result => Object.assign({}, val, {clientUser:result.data()})) 
  //       //  }))
  //       const transformedWithUsers = await Promise.all(result.map(async (val) => {
  //         return await db.collection('user').doc(val.client2).get().then(async (result) => {
  //           return await db.collection('messages').doc(createChatThread(userId, result.data().phoneNumber)).collection('messages').orderBy('createdAt', 'desc').limit(1).get().then(onChatResult => {
  //             const lastNamer = onChatResult.docs.map(val => val.data());
  //             return Object.assign({}, val, { clientUser: result.data(), lastMessage: lastNamer[0] });
  //           });
  //         });
  //       }));
  //       //console.log(transformedWithUsers); 
  //        var filteredIntros = transformedWithUsers.filter(
  //           function(e) {
        
  //             return this.indexOf(e.lastMessage._id) < 0;
  //           },
  //          user.lastMessage
  //       );
  //       // console.log("filteredIntros")
  //       // console.log(filteredIntros)
  //       const resulter = transformedWithUsers.map(val => {
  //           if(val.lastMessage.user._id == userId){
  //               return {
  //                   ...val, seen:true 
  //               }
  //           }
  //           return {...val}
  //       })

  //       var filteredIntros = resulter.filter(
  //           function(e) {
        
  //             return this.indexOf(e.lastMessage._id) < 0;
  //           },
  //          user.lastMessage
  //       );
        
  //       const dataUsers = [];
        
  //         setChatList(resulter);
        

  //     });
  //   }

  // }, [user.lastMessage, user.chatted]);

  useEffect(() => {
    const unsubscribe1 = db.collection('matches').where('client1', '==', userId).where('chatted', '==', true).onSnapshot(async (onResultClient1) => {
      const diffClient = await db.collection('matches').where('client2', '==', userId).where('chatted', '==', true).get(); 
      const diffClientUsers = diffClient.docs.map(val => Object.assign({}, val.data(),{_id:val.id} )); 
       const transformed = diffClientUsers.map(val => {
        let a = val.client1;
        let b = val.client2;
        let temp;
        temp = a;
        a = b;
        b = temp;
        return { ...val, client1: a, client2: b };
      });

      const clientObjects = onResultClient1.docs.map(val => Object.assign({}, val.data(), { _id: val.id }));
      const collective = [...transformed, ...clientObjects]; 
      // const finalCollective = collective.filter(val => val.discoveredBy !== userId); 
      const filterByReported = collective.filter(val => val.reported !== true); 
      const filterByUnmatched = filterByReported.filter(val => val.unMatched !== true);
      const transformedWithUsers = await Promise.all(filterByUnmatched.map(async (val) => {
          return await db.collection('user').doc(val.client2).get().then(async (result) => {
            console.log("result is")
            console.log(result.data())
            return await db.collection('messages').doc(createChatThread(userId, result.data().phoneNumber)).collection('messages').orderBy('createdAt', 'desc').limit(1).get().then(onChatResult => {
              const lastNamer = onChatResult.docs.map(val => val.data());
              return Object.assign({}, val, { clientUser: result.data(), lastMessage: lastNamer[0] });
            });
          });
        }));
         
        let filteredSeenChats = transformedWithUsers.filter(
                    function(e) {
                
                      return this.indexOf(e.lastMessage._id) < 0;
                    },
                   user.seenChats
          );
        

        let keys = filteredSeenChats.map(val => val.lastMessage._id); 
        const included =  transformedWithUsers.filter(
          function(e) {
            return this.indexOf(e.lastMessage._id) < 0;
          },
          keys
      );
      function applyToIncluded(val){
        return {...val, seen:true}  
      }

      const includedTransform = included.map(val => applyToIncluded(val)); 
      const finalGamer = [...filteredSeenChats, ...includedTransform]; 

        
        
        
        const resulter = finalGamer.map(val => {
            if(val.lastMessage.user._id == userId){
                return {
                    ...val, seen:true 
                }
            }
            return {...val}
        })

        const checker = resulter.filter(val => val.seen !== true); 
        checker.length ? setChatNotification(true):setChatNotification(false); 
      

        
      
      setChatList(resulter);
    });
     
    const unsubscribe = db.collection('matches').where('client2', '==', userId).where('chatted', '==', true).onSnapshot(async (onResultClient1) => {
      const clientObjects = onResultClient1.docs.map(val => Object.assign({}, val.data(), { _id: val.id }));
      const transformed = clientObjects.map(val => {
        let a = val.client1;
        let b = val.client2;
        let temp;
        temp = a;
        a = b;
        b = temp;
        return { ...val, client1: a, client2: b };
      });
      const diffClient = await db.collection('matches').where('client1', '==', userId).where('chatted', '==', true).get(); 
      const diffClientUsers = diffClient.docs.map(val => Object.assign({}, val.data(),{_id:val.id} )); 
      const collective = [...diffClientUsers, ...transformed]; 
      // const finalCollective = collective.filter(val => val.discoveredBy !== userId); 
      const filterByReported = collective.filter(val => val.reported !== true); 
      const filterByUnmatched = filterByReported.filter(val => val.unMatched !== true);
      const transformedWithUsers = await Promise.all(filterByUnmatched.map(async (val) => {
        return await db.collection('user').doc(val.client2).get().then(async (result) => {
          return await db.collection('messages').doc(createChatThread(userId, result.data().phoneNumber)).collection('messages').orderBy('createdAt', 'desc').limit(1).get().then(onChatResult => {
            const lastNamer = onChatResult.docs.map(val => val.data());
            return Object.assign({}, val, { clientUser: result.data(), lastMessage: lastNamer[0] });
          });
        });
      }));
      let filteredSeenChats = transformedWithUsers.filter(
        function(e) {
    
          return this.indexOf(e.lastMessage._id) < 0;
        },
       user.seenChats
);

let keys = filteredSeenChats.map(val => val.lastMessage._id); 
const included =  transformedWithUsers.filter(
function(e) {
return this.indexOf(e.lastMessage._id) < 0;
},
keys
);
function applyToIncluded(val){
return {...val, seen:true}  
}

const includedTransform = included.map(val => applyToIncluded(val)); 
const finalGamer = [...filteredSeenChats, ...includedTransform]; 
      const resulter = finalGamer.map(val => {
        if(val.lastMessage.user._id == userId){
            return {
                ...val, seen:true 
            }
        }
        return {...val}
    })
    const checker = resulter.filter(val => val.seen !== true); 
    checker.length ? setChatNotification(true):setChatNotification(false); 
  
      setChatList(resulter);
    });
    return () => { unsubscribe1(), unsubscribe()};
  }, [user.lastMessage, user.unMatched, user.reported]);

  return (
    <View>
      <FlatList
        data={chatList}
        renderItem={renderVerticalList}
        keyExtractor={item => item.id}

        showsHorizontalScrollIndicator={false}
        style={{ marginTop: 20, marginBottom: 20 }} />
    </View>
  );
}

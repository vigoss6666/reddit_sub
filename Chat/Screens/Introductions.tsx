import React, { useState, useEffect, useContext } from 'react';
import { View, Text, FlatList } from 'react-native';
import { Line } from '../../src/common/Common';
import { firebase } from '../../config';
import AppContext from '../../AppContext';
import { filterGamer } from '../../networking';
import { db, UserFactory } from './MatchList';

export function Introductions({ navigation, }) {
  const myContext = useContext(AppContext);
  const { user, userId, setChatNotification, setChatterNotification } = myContext;
  const [intros, setIntros] = useState([]); 

  useEffect(() => {
    const unsubscribe1 = db.collection('introductions').where('client1', '==', userId).onSnapshot(async (onResultClient1) => {
      const diffClient = await db.collection('introductions').where('client2', '==', userId).get(); 
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
      const finalCollective = collective.filter(val => val.discoveredBy !== userId); 
      const transformedWithUsers1 = await Promise.all(finalCollective.map(async (val) => {
        return await db.collection('user').doc(val.client2).get().then(result => Object.assign({}, val, { clientUser: result.data() }));
      }));
      const filterByintroMatches = transformedWithUsers1.filter(
        function (e) {
          return this.indexOf(e._id) < 0;
        },
        user.introMatches
      );

      function namer(val) {
        return { ...val, seen: true };
      }
      const seenIntrosChecker = user.seenIntros !== undefined && user.seenIntros.length ? user.seenIntros : [];
      const filtered = filterGamer(filterByintroMatches, '_id', seenIntrosChecker, null, namer);

      setIntros([...filtered.excludedObjects, ...filtered.includedObjects,]);
    });
     
    const unsubscribe = db.collection('introductions').where('client2', '==', userId).onSnapshot(async (onResultClient1) => {
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
      const diffClient = await db.collection('introductions').where('client1', '==', userId).get(); 
      const diffClientUsers = diffClient.docs.map(val => Object.assign({}, val.data(),{_id:val.id} )); 
      const collective = [...diffClientUsers, ...transformed]; 
      const finalCollective = collective.filter(val => val.discoveredBy !== userId); 


      
      const transformedWithUsers1 = await Promise.all(finalCollective.map(async (val) => {
        return await db.collection('user').doc(val.client2).get().then(result => Object.assign({}, val, { clientUser: result.data() }));
      }));
      const filterByintroMatches = transformedWithUsers1.filter(
        function (e) {
          return this.indexOf(e._id) < 0;
        },
        user.introMatches
      );

      function namer(val) {
        return { ...val, seen: true };
      }
      const seenIntrosChecker = user.seenIntros !== undefined && user.seenIntros.length ? user.seenIntros : [];
      const filtered = filterGamer(filterByintroMatches, '_id', seenIntrosChecker, null, namer);

      setIntros([...filtered.excludedObjects, ...filtered.includedObjects, ]);
    });
    return () => { unsubscribe1(), unsubscribe()};
  }, [user.seenIntros]);
  
  
  
  
  const handleClick = (intro) => {

    db.collection('user').doc(userId).set({ seenIntros: firebase.firestore.FieldValue.arrayUnion(intro._id) }, { merge: true }).then(() => console.log("clientUser updated"));
    navigation.navigate('RequestIntro', { intro });
  };

  const renderIntroList = ({ item }) => {
    return <UserFactory user={item} onPress={handleClick} />;
  };
  return (
    <View>
      <Line />
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Text style={{ alignSelf: "center", fontWeight: "bold", fontSize: 15, marginTop: 10, marginBottom: 10 }}>Introductions</Text>
      </View>
      <Line />
      {intros.length ?  <FlatList
        data={intros}
        renderItem={renderIntroList}
        keyExtractor={item => item._id}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={{ marginTop: 20, marginBottom: 20,  }} />: <Text style = {{alignSelf:'center', fontSize:20, fontStyle:'italic', fontWeight:'bold', marginTop:10, marginBottom:10}}>No New introductions</Text>}
    </View>
  );

}

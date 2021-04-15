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
  const [intros, setIntros] = useState([{ client1: '+15554787672', client2: '+917208110384', createdAt: new Date(), _id: 'something', clientUser: { profilePic: 'https://firebasestorage.googleapis.com/v0/b/friends-365d0.appspot.com/o/images%2Ff36jh47t3dr?alt=media&token=a5b14492-468f-4fb2-becc-2425e7b471c9', name: 'zaid shaikh' } }]);

  useEffect(() => {
    const unsubscribe = db.collection('introductions').where('client2', '==', userId).onSnapshot(async (onResultClient1) => {
      const clientObjects = onResultClient1.docs.map(val => Object.assign({}, val.data(), { _id: val.id }));
      const client1Users = clientObjects.filter(val => val.client1);
      const transformedWithUsers1 = await Promise.all(client1Users.map(async (val) => {
        return await db.collection('user').doc(val.client1).get().then(result => Object.assign({}, val, { clientUser: result.data() }));
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

      setIntros([...filtered.excludedObjects, ...filtered.includedObjects]);
    });
    return () => unsubscribe();
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
      <FlatList
        data={intros}
        renderItem={renderIntroList}
        keyExtractor={item => item._id}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={{ marginTop: 20, marginBottom: 20, marginLeft: 20, marginRight: 20 }} />
    </View>
  );

}

import  React, {useState,useRef,useEffect, useContext} from 'react';
import { Text, View, StyleSheet,TouchableOpacity } from 'react-native';
import AppContext from '../../AppContext'; 

interface TestProps {}

const Test = (props: TestProps) => {
  const myContext = useContext(AppContext); 
  const { user,userId, selfFilter, setSelfFilter,computeName,db, firebase, stringifyNumber, } = myContext;
  const _generateList = (userId:string) => {
     return db.collection('user').where('matchmakers', 'array-contains-any', [userId]).get().then(onResult => {
        const data = onResult.docs.map(val => val.data()); 
        return data; 
     })
  }
  const namer = async (userId) => {
    const result =  await _generateList(userId); 
    console.log(result)
  }
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress = {() => namer(userId)}>
      <Text>Trigger function</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Test;

const styles = StyleSheet.create({
  container: {flex:1, justifyContent:'center', alignItems:'center'}
});

import  React, {useState,useRef,useEffect} from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import {firebase} from '../../config'; 
interface TryProps {}
const db = firebase.firestore(); 





const Try = ({navigation, routes}) => {
const [name, setName] = useState(); 
const [surname, setSurname] = useState(); 
 useEffect(() => {
   const subscribe = db.collection('user').doc('trial_user').onSnapshot(doc => {
       
    const name = doc.data().name; 
        const surname = doc.data().surname; 
        setName(name); 
        setSurname(surname); 
   })


   return () => subscribe(); 
        
    
 }, [name, surname])

 const changeNames = () => {
      db.collection('user').doc('trial_user').set({name:'huraira', surname:'lakdawala'}, {merge:true}).then(() => console.log('docs updated')); 
 }





  return (
    <View style={[styles.container, {}]}>
       <View style = {{flex:0.2}}>
       </View> 
       <View style = {{flex:0.6}}>
            <View style = {{alignItems:'center'}}>
                <Text style = {{fontWeight:'bold', fontSize:22,}}>{name}</Text>
                <TouchableOpacity onPress = {() => changeNames()}>
                <FontAwesome5 name="skull-crossbones" size={40} color="black" style = {{marginTop:20}}/>
                </TouchableOpacity>
                <Text style = {{fontWeight:'bold', fontSize:18,color:'grey', marginTop:10}}>{surname}</Text>

            </View>
       </View>
       <View style = {{flex:0.2}}>

       </View>
    </View>
  );
};

export default Try;

const styles = StyleSheet.create({
  container: { flex:1,backgroundColor:'red'}
});

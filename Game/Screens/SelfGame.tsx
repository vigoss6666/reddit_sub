import  React, {useState,useRef,useEffect} from 'react';
import { Text, View, StyleSheet, Dimensions, ScrollView, Image, SafeAreaView, SectionList, FlatList } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import {firebase } from '../../config'; 
// @ refresh reset
const db = firebase.firestore(); 

interface SelfGameProps {}
interface serverData {
     charisma:number, 
     creativity:number, 
     honest:number, 
     looks:number, 
     empathetic:number, 
     status:number, 
     wealthy:number, 
     humor:number
     
}
interface serverDataWithDimension {
    dimension:number, 
    charisma:number, 
    creativity:number, 
    honest:number, 
    looks:number, 
    empathetic:number, 
    status:number, 
    wealthy:number, 
    humor:number
    
}

function getBaseLog(x, y) {
    return Math.log(y) / Math.log(x);
  }

function logTen(arr:serverData[]):serverDataWithDimension[] {

  const result =  arr.map(val => ({
        dimension:parseFloat(getBaseLog(5, val.charisma+val.creativity+val.empathetic+val.honest+val.humor+val.looks+val.status+val.wealthy).toFixed(1)), 
        charisma:parseFloat(getBaseLog(5, val.charisma).toFixed(1)), 
        creativity:parseFloat(getBaseLog(5, val.creativity).toFixed(1)),
        honest:parseFloat(getBaseLog(5, val.honest).toFixed(1)),
        looks:parseFloat(getBaseLog(5, val.looks).toFixed(1)),
        empathetic:parseFloat(getBaseLog(5, val.empathetic).toFixed(1)),
        status:parseFloat(getBaseLog(5, val.status).toFixed(1)),
        wealthy:parseFloat(getBaseLog(5, val.wealthy).toFixed(1)),
        humor:parseFloat(getBaseLog(5, val.humor).toFixed(1)),
      }
      
   )) 
   return result; 
}

const SelfGame = (props: SelfGameProps) => {
    const [user, setUser] = useState({name:"zaid shaikh", firstName:"zaid", profilePic:"https://i.pinimg.com/originals/f0/a6/4e/f0a64e32194d341befecc80458707565.jpg"})
    const [serverData, setServerData] = useState<[serverData]>([{
        charisma:1000, 
        creativity:1200, 
        honest:500, 
        looks:600, 
        empathetic:300, 
        status:400, 
        wealthy:300, 
        humor:500
   }]);
   const logger = logTen(serverData); 
   console.log(logger) 
    const [userList, setUserList] = useState()
    const { width, height } = Dimensions.get('window'); 
    const demoTemplate = [
        {
        title:9.8, 
        data:[{name:"zaid shaikh"}, {name:"huraira"}, {name:"javed"}]  
       }, 
       {
        title:9.7, 
        data:[{name:"faiz"}]  
       },

 ]; 


    
    
    useEffect(() => {
       db.collection('user').doc('trial_user').get().then(doc => {
             
       }) 
    }, [])
     
    const headerTemplate = user.profilePic ? <Image source = {{uri:user.profilePic}} style = {{height:80, width:80, borderRadius:40}}/>:<MaterialIcons name="account-circle" size={24} color="black" />
    

    const renderFlatlist = ({item}) => {
        
         return <View key = {item.name} style = {{flexDirection:'row'}}>
             <Text>{item.name}</Text>
             </View>  
         
    }

    const renderSectionItem = ({section, index}) => {
        
        console.log('called')
        if (index !== 0) return null;

         return <FlatList
        data={section.data}
        renderItem={renderFlatlist}
        keyExtractor={item => item}
        numColumns = {5}
      />

          
    }
    
  return (
    <SafeAreaView style = {styles.container}>
        <View style = {{justifyContent:'center', alignItems:'center', marginTop:20}}>
        {headerTemplate}        
     

        </View>
        <SectionList
      style = {{marginTop:10, marginRight:15, marginLeft:15}}
      sections={demoTemplate}
      keyExtractor={(item, index) => item + index}
      renderItem={renderSectionItem}
      renderSectionHeader={({ section: { title } }) => (
        <View style = {{ }}><Text style = {styles.header}>{title}</Text></View>
      )}
    />
    </SafeAreaView>
    
  );
};

export default SelfGame;

const styles = StyleSheet.create({
  container: {flex:1, }, 
  header: {
    fontSize: 32,
          backgroundColor: "#fff", 
          marginTop:10,
          marginBottom:10, 
          fontWeight:'bold'
          
          
  },
});

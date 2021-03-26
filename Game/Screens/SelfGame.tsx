import  React, {useState,useRef,useEffect, useContext} from 'react';
import { Text, View, StyleSheet, Dimensions, ScrollView, Image, SafeAreaView, SectionList, FlatList, TouchableOpacity } from 'react-native';
import { MaterialIcons, Foundation, Feather, Entypo } from '@expo/vector-icons';
import {firebase } from '../../config'; 
import {transformCreativity, computeSimDimension, computeSectionLabel} from '../../networking'; 
import { iconFactory} from '../../src/common/Common'; 
import { logTen } from './logTen';
import AppContext from '../../AppContext'; 
import {updateUser} from '../../networking';
// @refresh reset
const db = firebase.firestore(); 

interface SelfGameProps {}
export interface serverData {
     charisma:number, 
     creativity:number, 
     honest:number, 
     looks:number, 
     empathetic:number, 
     status:number, 
     wealthy:number, 
     humor:number
}

interface filter extends serverData {
   narcissistic:number,  
   minAge:number, 
   maxAge:number, 
   dimension:number, 
   inches:number, 
   feet:number, 
   distance:number
   matchMakerContact:boolean
  }


interface serverDataObjectDimension {
    charisma:number, 
    creativity:number, 
    honest:number, 
    looks:number, 
    empathetic:number, 
    status:number, 
    wealthy:number, 
    humor:number, 
    dimension:number, 
    _id:number
    
}
export interface serverDataWithDimension extends serverData {
    dimension:number, 
}
function pipe(...fns) {
    return (arg) => fns.reduce((prev, fn) => fn(prev), arg);
}
function applyFilters(filter:filter , arr:serverDataObjectDimension[]):serverDataObjectDimension[]{
 console.log("function filter")   
 console.log(filter)
 console.log(arr)   
 const finalObject:any = []; 
 const creativity = filter.creativity == undefined || filter.creativity == 0? -1:filter.creativity;  
 const charisma = filter.charisma == undefined || filter.charisma == 0? -1:filter.charisma;
 const humor = filter.humor == undefined || filter.humor == 0? -1:filter.humor;  
 const honest = filter.honest == undefined || filter.honest == 0 ? -1:filter.honest;
 const empathetic = filter.empathetic == undefined ? -1:filter.empathetic;  
 const looks = filter.looks == undefined || filter.looks == 0 ? -1:filter.looks;
 const status = filter.status == undefined || filter.status == 0? -1 :filter.status;  
 const wealthy = filter.wealthy == undefined || filter.wealthy == 0? -1:filter.wealthy;
 const narcissistic = filter.narcissistic == undefined || filter.narcissistic == 0? -1:filter.narcissistic;  

 
 arr.map(val => {
      if(val.creativity > creativity 
        && val.charisma > charisma 
        && val.humor > humor
        && val.honest > honest
        && val.looks > looks
        && val.empathetic > empathetic
        && val.status > status
        && val.wealthy > wealthy
        
        ){
           finalObject.push(val); 
      }
 }) 
 return finalObject;  
 
}

const SelfGame = ({navigation, route}) => {
  const myContext = useContext(AppContext); 
  const {user, userId, selfFilter, setSelfFilter} = myContext;
    const [filter, setFilter] = useState(route.params ? route.params.finalObject:{});
    const [sliderState, setSliderState] = useState({ currentPage: 0 });
    const [selfMatchView, setSelfMatchView] = useState();     
    const [filters, setFilters] = useState({
        state:'california'
    })
    

    useEffect(() => {
        console.log("called")
      db.collection('user').doc('+917208110384').get().then(doc => {
          
           db.collection('user')
           .where('state', '==', 'New york')
           .where('gender', '==', 'female')
           .get()
           .then(result => {
                 const serverObjectWithId = result.docs.map(val => val.data()) 
                 const logData = logTen(serverObjectWithId);
                 const userLogged = logTen(user);
                 setSelfMatchView({
                   user:userLogged, 
                   data:logData
                 })

                 const simD = computeSimDimension(userLogged, logData);
                 
                 const filters = applyFilters(filter, simD);  
                 

                 
                 const sectionData = computeSectionLabel(filters);
                 setSectionData(sectionData);  
           })
      })
    }, [])




    const transformedServer = [
        {
        name:"joker",
        firstName:"zaid",
        profilePic:"https://i.pinimg.com/originals/f0/a6/4e/f0a64e32194d341befecc80458707565.jpg",
        charisma:100, 
        creativity:90, 
        honest:400, 
        looks:400, 
        empathetic:400, 
        status:350, 
        wealthy:350, 
        humor:350,  
        _id:"something"
    },
    {
        name:"joker",
        firstName:"zaid",
        profilePic:"https://i.pinimg.com/originals/f0/a6/4e/f0a64e32194d341befecc80458707565.jpg",
        charisma:100, 
        creativity:90, 
        honest:4000, 
        looks:400, 
        empathetic:400, 
        status:350, 
        wealthy:350, 
        humor:350,  
        _id:"something"
    },
    {
        name:"zaid shaikh",
        firstName:"zaid",
        profilePic:"https://i.pinimg.com/originals/f0/a6/4e/f0a64e32194d341befecc80458707565.jpg",
        charisma:1000, 
        creativity:9002, 
        honest:400, 
        looks:400, 
        empathetic:400, 
        status:350, 
        wealthy:350, 
        humor:350,  
        _id:"something"
    }
]
    const [serverData, setServerData] = useState<[serverData]>([{
        charisma:1000, 
        creativity:1200, 
        honest:500, 
        looks:600, 
        empathetic:300, 
        status:400, 
        wealthy:300, 
        humor:500, 
        
   }]);
  
   const [sectionData, setSectionData] = useState(); 
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
        console.log(item.simDimension)
        
         return <View key = {item.name} style = {{flexDirection:'row'}}>
             <TouchableOpacity onPress = {() => navigation.navigate('SelfMatchView', {selfMatchView})}>
               <MaterialIcons name="account-circle" size={70} color="black" /></TouchableOpacity>

             {item.simDimension ? <View style = {{position:'absolute', top:13, right:2, zIndex:100, backgroundColor:'#393a3b', borderRadius:15, height:30, width:30, justifyContent:'center', alignItems:'center'}}>
               {iconFactory(item.simDimension, 22)}
             </View>:null}

             </View>  
         
    }
    useEffect(() => {
      navigation.setOptions({
         headerTitle:false, 
         headerLeft:() => <TouchableOpacity onPress = {() => navigation.navigate('GameHomepage')}>
         <Entypo name="controller-play" size={35} style = {{marginLeft:20}} />                    
         </TouchableOpacity>, 
         headerStyle:{backgroundColor:'grey'}, 
         headerRight:() => <TouchableOpacity onPress = {() =>navigation.navigate('BrowseSettings')}>
         <Feather name="settings" size={30} color="black" style = {{marginRight:20, marginBottom:5, marginTop:5}}/>
         </TouchableOpacity> 
      })
    }, [])

    const renderSectionItem = ({section, index}) => {
        
        console.log('called')
        if (index !== 0) return null;

         return <FlatList
        data={section.data}
        extraData = {filter}
        renderItem={renderFlatlist}
        // keyExtractor={item => item}
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
      sections={sectionData}
      extraData = {filter}
    //   keyExtractor={(item, index) => item + index}
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

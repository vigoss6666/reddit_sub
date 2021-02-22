import  React, {useState,useRef,useEffect} from 'react';
import { Text, View, StyleSheet, Dimensions, ScrollView, Image, SafeAreaView, SectionList, FlatList, TouchableOpacity } from 'react-native';
import { MaterialIcons, Foundation, Feather, Entypo } from '@expo/vector-icons';
import {firebase } from '../../config'; 
import {transformCreativity, computeSimDimension, computeSectionLabel} from '../../networking'; 
import { iconFactory} from '../../src/common/Common'; 
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

interface filter extends serverData {
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
interface serverDataWithDimension extends serverData {
    dimension:number, 
}
function pipe(...fns) {
    return (arg) => fns.reduce((prev, fn) => fn(prev), arg);
}
function getBaseLog(x, y) {
    const result =  Math.log(y) / Math.log(x);
    if(result == -Infinity){
         return 0; 
    }
    return result; 
  }


function applyFilters(filter:filter = {}, arr:serverDataObjectDimension[]):serverDataObjectDimension[]{
 return arr.filter((val) => {
     if(val.creativity > filter.creativity 
        && val.charisma > filter.charisma  
        && val.honest > filter.honest
        && val.looks > filter.looks
        && val.empathetic > filter.empathetic
        && val.humor > filter.humor
        && val.status > filter.status
        && val.wealthy > filter.wealthy            
        ){
             return val; 
        } 
    
   return val; 
 })    
}

function logTen(arr:serverData[]|serverData):serverDataWithDimension[] | serverDataWithDimension {
        if(Array.isArray(arr)){
            const result =  arr.map(val => ({
                ...val, 
                charisma:parseFloat(getBaseLog(5, val.charisma).toFixed(1)), 
                dimension:parseFloat(getBaseLog(5, val.charisma+val.creativity+val.empathetic+val.honest+val.humor+val.looks+val.status+val.wealthy).toFixed(1)), 
                creativity:parseFloat(getBaseLog(5, val.creativity).toFixed(1)),
                honest:parseFloat(getBaseLog(5, val.honest).toFixed(1)),
                looks:parseFloat(getBaseLog(5, val.looks).toFixed(1)),
                empathetic:parseFloat(getBaseLog(5, val.empathetic).toFixed(1)),
                status:parseFloat(getBaseLog(5, val.status).toFixed(1)),
                wealthy:parseFloat(getBaseLog(5, val.wealthy).toFixed(1)),
                humor:parseFloat(getBaseLog(5, val.humor).toFixed(1)),
                narcissistic:parseFloat(getBaseLog(5, val.narcissistic).toFixed(1)),
                
                
              }
              
           )) 
           return result; 
        }
    return {
                ...arr,     
                dimension:parseFloat(getBaseLog(5, arr.charisma+arr.creativity+arr.empathetic+arr.honest+arr.humor+arr.looks+arr.status+arr.wealthy).toFixed(1)), 
                charisma:parseFloat(getBaseLog(5, arr.charisma).toFixed(1)), 
                creativity:parseFloat(getBaseLog(5, arr.creativity).toFixed(1)),
                honest:parseFloat(getBaseLog(5, arr.honest).toFixed(1)),
                looks:parseFloat(getBaseLog(5, arr.looks).toFixed(1)),
                empathetic:parseFloat(getBaseLog(5, arr.empathetic).toFixed(1)),
                status:parseFloat(getBaseLog(5, arr.status).toFixed(1)),
                wealthy:parseFloat(getBaseLog(5, arr.wealthy).toFixed(1)),
                humor:parseFloat(getBaseLog(5, arr.humor).toFixed(1)), 
                narcissistic:parseFloat(getBaseLog(5, arr.narcissistic).toFixed(1)),
    }    
        
}



const SelfGame = (props: SelfGameProps) => {


    const [filters, setFilters] = useState({
        state:'california'
    })

    const [user, setUser] = useState({
        name:"zaid shaikh",
        firstName:"zaid",
        profilePic:"https://i.pinimg.com/originals/f0/a6/4e/f0a64e32194d341befecc80458707565.jpg",
        charisma:1000, 
        creativity:900, 
        honest:400, 
        looks:400, 
        empathetic:400, 
        status:350, 
        wealthy:350, 
        humor:350, 
        _id:'gamer'
        
    })

    useEffect(() => {
        console.log("called")
      db.collection('user').doc('trial_user').get().then(doc => {
          const user = Object.assign({}, doc.data(), {_id:doc.id})
           db.collection('user')
           .where('state', '==', filters.state)
           .where('gender', '==', 'female')
           .get()
           .then(result => {
                 const serverObjectWithId = result.docs.map(doc => Object.assign({}, doc.data(), {_id:doc.id})); 
                 const logData = logTen(serverObjectWithId);
                 const userLogged = logTen(user);
                 const simD = computeSimDimension(userLogged, logData);
                 const filters = applyFilters({creativity:8}, simD); 
                 console.log(filters.length); 
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
             <TouchableOpacity><MaterialIcons name="account-circle" size={70} color="black" /></TouchableOpacity>

             {item.simDimension ? <View style = {{position:'absolute', top:13, right:2, zIndex:100, backgroundColor:'#393a3b', borderRadius:15, height:30, width:30, justifyContent:'center', alignItems:'center'}}>
               {iconFactory(item.simDimension, 22)}
             </View>:null}

             </View>  
         
    }

    const renderSectionItem = ({section, index}) => {
        
        console.log('called')
        if (index !== 0) return null;

         return <FlatList
        data={section.data}
        renderItem={renderFlatlist}
        // keyExtractor={item => item}
        numColumns = {5}
      />

          
    }
    
  return (
    <SafeAreaView style = {styles.container}>
        <View style = {{flexDirection:'row', justifyContent:'space-between',alignItems:'center', backgroundColor:'grey'}}>
         <TouchableOpacity>
        <Entypo name="controller-play" size={35} style = {{marginLeft:20}} />                    
        </TouchableOpacity>   
        <TouchableOpacity onPress = {() => props.navigation.navigate('BrowseSettings')}>
        <Feather name="settings" size={30} color="black" style = {{marginRight:20, marginBottom:5, marginTop:5}}/>
        </TouchableOpacity>
        </View>
        <View style = {{justifyContent:'center', alignItems:'center', marginTop:20}}>
        {headerTemplate}        
     

        </View>
        <SectionList
      style = {{marginTop:10, marginRight:15, marginLeft:15}}
      sections={sectionData}
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

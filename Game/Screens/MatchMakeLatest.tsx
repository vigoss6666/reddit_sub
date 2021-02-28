import  React, {useState,useRef,useEffect} from 'react';
import { Text, View, StyleSheet, Dimensions,Image,ScrollView, TouchableOpacity, FlatList, SectionList } from 'react-native';
import { firebase } from '../../config'; 
import {MaterialIcons} from '@expo/vector-icons'; 
import {logTen} from './logTen'; 
import { iconFactory } from '../../src/common/Common';
import {transformCreativity, computeSimDimension, computeSectionLabel} from '../../networking'; 
// @refresh reset
const db = firebase.firestore(); 

interface MatchMakeLatestProps {}

interface user {
        charisma:number, 
        creativity:number, 
        honest:number, 
        looks:number, 
        empathetic:number, 
        status:number, 
        wealthy:number, 
        humor:number
}

interface userWithId extends user {
    _id:string;  
}
interface userWithIds {
     data:userWithId[]
}
interface userWithDimension extends userWithId {
     dimension:number; 
}
interface userWithDimensions {
   data:userWithDimension[]
}

interface pageDataObject {
   user:userWithDimension, 
   data:userWithDimension[] 
}
interface finalObject {
     data:pageDataObject[]
}


function applyFilters(filter:filter , arr:serverDataObjectDimension[]):serverDataObjectDimension[]{
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


const MatchMakeLatest = ({navigation, route}) => {
const user = {
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
}
const [pageData, setPageData] = useState([]);
const {width, height} = Dimensions.get('window'); 
const [sliderState, setSliderState] = useState({ currentPage: 0 });
const [filter, setFilter] = useState(route.params ? route.params.finalObject:{});
const sectionData = pageData.length > 0 ? computeSectionLabel(pageData[sliderState.currentPage].data):[]


const renderFlatlist = ({item}) => {
   return <View key = {item.name} style = {{flexDirection:'row'}}>
       <TouchableOpacity onPress = {() => navigation.navigate('MatchView')}>
         <MaterialIcons name="account-circle" size={70} color="black" /></TouchableOpacity>

       {item.simDimension ? <View style = {{position:'absolute', top:13, right:2, zIndex:100, backgroundColor:'#393a3b', borderRadius:15, height:30, width:30, justifyContent:'center', alignItems:'center'}}>
         {iconFactory(item.simDimension, 22)}
       </View>:null}
       </View>  
   
}

const renderSectionItem = ({section, index}) => {
  if (index !== 0) return null;
   return <FlatList
  data={section.data}
  extraData = {filter}
  renderItem={renderFlatlist}
  // keyExtractor={item => item}
  numColumns = {5}
/>

    
}

 useEffect(() => {
 console.log("called")  
 const inList = [];  
db.collection('user').doc('trial_user').get().then(onResult => {
  const userWithId = Object.assign({},onResult.data(), {_id:onResult.id}); 
  
   
   db.collection('user').where(firebase.firestore.FieldPath.documentId(), 'in', onResult.data().datingPoolList).get().then(onDocs => {
    onDocs.docs.map(val => {
      const userWithId = Object.assign({},val.data(), {_id:val.id});
      const inList = []; 
      db.collection('user')
      .where('gender', '==', 'female')
      .where('state', '==', 'california')
      .get()
      .then(result => {
       const serverObjectWithId = result.docs.map(doc => Object.assign({}, doc.data(), {_id:doc.id}));  
       const logData = logTen(serverObjectWithId);
       const userLogged = logTen(userWithId);
       const simD = computeSimDimension(userLogged, logData);
       const filters = applyFilters(filter, simD); 
       setPageData(pageData => [...pageData, {client:userWithId, data:filters}])
      })
    })

   })
})
 },[])   


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
const sliderTemplate =  pageData.map((val,index) => {
 return <View style={{ width,height}} id = {val.client.id}>
 <View style = {{ alignItems:"center", marginTop:20}}>
 {val.client.profilePic ?<Image source = {{uri:val.client.profilePic}} style = {{height:60, width:60, borderRadius:30}}/> :<MaterialIcons name="account-circle" size={75} color="black" />}
 <Text style = {{fontWeight:"bold", marginTop:10}}>{ val.client.name }</Text>
 </View>
 </View>
})
  return (
    <View style={{flex:1}}>
      <View style = {{flex:0.2}}>
      <ScrollView
horizontal = {true}
pagingEnabled = {true}
showsHorizontalScrollIndicator={false}
scrollEventThrottle={16}
style = {{flex:0.2}}
onScroll={(event: any) => {
	setSliderPage(event);
}}
>
{sliderTemplate}


</ScrollView>
</View>
<View style = {{flex:0.8}}>
<SectionList
      style = {{marginTop:10, marginRight:15, marginLeft:15,flex:0.8 }}
      sections={sectionData}
      extraData = {filter}
      keyExtractor={(item, index) => item._id + index}
      renderItem={renderSectionItem}
      renderSectionHeader={({ section: { title } }) => (
        <View style = {{ }}><Text style = {styles.header}>{title}</Text></View>
      )}
    />
    </View>
    </View>
  );
};

export default MatchMakeLatest;

const styles = StyleSheet.create({
  container: {flex:1},
  header: {
    fontSize: 32,
          backgroundColor: "#fff", 
          marginTop:10,
          marginBottom:10, 
          fontWeight:'bold'
          
          
  },
});

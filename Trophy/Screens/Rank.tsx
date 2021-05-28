import  React, {useState,useRef,useEffect, useContext} from 'react';
import { Text, View, StyleSheet, Image, ScrollView } from 'react-native';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import AppContext from '../../AppContext'; 
import isPast from 'date-fns/isPast'
import sub from 'date-fns/sub'
import isAfter from 'date-fns/isAfter'
import { filter } from 'underscore';
import {SingleImageView} from '../../src/common/Common';



interface RankProps {}

const Rank = (props: RankProps) => {
  const myContext = useContext(AppContext); 
  const { user,userId, selfFilter, setSelfFilter,computeName,db, firebase, stringifyNumber, } = myContext;
    const [allTime, setAllTime] = useState(0); 
    const [monthly, setMonthly] = useState(0);
    const [templater, setTemplate] = useState([]); 

    

 useEffect(() => {
        console.log("Points called")
        const unsubscribe = db.collection('user').where('state', '==', user.state).limit(30).get().then(onResult => {
          const result = onResult.docs.map(val => val.data()); 
          const transfromWithPoints = result.map(val => {
               let aggregatePoint = 0; 
                val.points.map(val1 => {
                     
                    aggregatePoint += val1.point; 
                    
               })
               return {...val, aggregatePoint}
          })
          const transfromWithMonth = transfromWithPoints.map(val => {
              let monthlyPoints = 0; 
              const date =  sub(new Date(), {
                
                months: 1,
                
              })
              const filtered = val.points.filter(val1 => val1.createdAt.toDate() > date); 
              
              return {...val, points:filtered}; 
          })
          const monthAdder = transfromWithMonth.map(val => {
            let monthAggregatePoint = 0; 
            val.points.map(val1 => {
                 
                monthAggregatePoint += val1.point; 
                
           })
           return {...val, monthAggregatePoint} 
          })
          

          

          const arrangedDescending =  monthAdder.sort((a, b) => {
            return b.aggregatePoint - a.aggregatePoint;
          });
          setTemplate(arrangedDescending); 
          const index = arrangedDescending.findIndex(val => val.phoneNumber == userId); 
          
          setAllTime(index + 1); 
          const monthSort = monthAdder.sort((a, b) => {
            return b.monthAggregatePoint - a.monthAggregatePoint;
          }); 
          const index1 = arrangedDescending.findIndex(val => val.phoneNumber == userId);
          setMonthly(index1 + 1) 

          
          }) 
    
             
    
 },[user.points])    
    

    const data = [
     {
       _id:"user",
       name:'Amy B', 
       monthlyPoints:1000, 
       profilePic:null, 
    },
    {
       _id:"list",   
       name:'Sam G', 
       monthlyPoints:1400, 
       profilePic:"https://homepages.cae.wisc.edu/~ece533/images/airplane.png", 
    }
   ]
   //const user = data.filter((val,index) => val._id == "user"); 
    const template = templater.map((val,index) => {
         return <View style = {{flexDirection:"row", alignItems:'center', borderBottomWidth:2, marginTop:15, justifyContent:'space-between',marginLeft:30, marginRight:30}}>
           <View style = {{flexDirection:'row', alignItems:'center'}}>
           {val.profilePic ? <SingleImageView image = {val.profilePic} style = {{height:40, width:40, borderRadius:20}}/> : <MaterialIcons name="account-circle" size={40} color="black" />}
           <View style = {{flexDirection:'row'}}>
           <Text style = {{marginLeft:20, fontSize:17, fontWeight:'bold'}}>{index + 1}.</Text>
           <Text style = {{marginLeft:5, fontSize:17, fontWeight:'bold',maxWidth:100,maxHeight:50}} numberOfLines = {2}>{computeName(val)}.</Text>
           </View>
           </View>
           <View style = {{ justifyContent:"center", alignItems:"center"}}>
           <Text style = {{ fontSize:24, fontWeight:'bold', }}>{val.monthAggregatePoint}</Text>
           <Text style = {{ fontSize:18, fontWeight:'bold', marginBottom:10 }}>Points</Text>
           </View>
           </View>
    })
    return <View >
    <View style = {{justifyContent:"space-between", flexDirection:'row', marginLeft:30, marginRight:30}}>
    <View style = {{flexDirection:"row",  padding:10, alignItems:'center',marginBottom:20, }}>
                    <FontAwesome5 name="trophy" size={24} color="black" />
                    <View style = {{marginLeft:10}}>   
                    <Text style = {{fontWeight:"bold", }}>{stringifyNumber(allTime).toUpperCase()}</Text>
                    <Text style = {{fontWeight:"bold", }}>ALL TIME</Text>
                    </View>
                </View>
                <View style = {{flexDirection:"row",  padding:10, alignItems:'center',marginBottom:20, }}>
                    <FontAwesome5 name="trophy" size={24} color="black" />
                    <View style = {{marginLeft:10}}>   
                    <Text style = {{fontWeight:"bold", }}>{stringifyNumber(monthly).toUpperCase()}</Text>
                    <Text style = {{fontWeight:"bold", }}>MONTHLY</Text>
                    </View>
                </View>
    </View>
   
     <View style = {{borderTopWidth:2, borderBottomWidth:2, flexDirection:'row', justifyContent:'space-between', marginLeft:10, marginRight:10}}> 
      <Text style = {{fontSize:20, fontWeight:'bold', padding:10}}>ALL TIME</Text> 
      <Text style = {{fontSize:20, fontWeight:'bold', padding:10}}>MONTHLY</Text>
     </View>   
    <ScrollView>{template}
    </ScrollView>      
    </View>

};

export default Rank;

const styles = StyleSheet.create({
  container: {}
});

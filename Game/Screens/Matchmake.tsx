import  React, {useState,useRef,useEffect} from 'react';
import { View, StyleSheet, Text, TextInput,TouchableOpacity,ScrollView,Image, Button,FlatList,Picker,PanResponder,Animated, TouchableWithoutFeedback, SafeAreaView, Dimensions, SectionList, AsyncStorage, } from 'react-native';
import { useMutation,useQuery } from '@apollo/react-hooks';
import Constants from "expo-constants";
import { MaterialIcons, FontAwesome, Octicons, MaterialCommunityIcons } from '@expo/vector-icons';
import _, { map } from 'underscore';
import Slider from '../../src/common/Slider'; 
import ListTemplate from '../../src/common/ListTemplate';
import { gql } from 'apollo-boost';
import { Foundation } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import {firebase} from '../../config'; 
// @refresh reset
const db = firebase.firestore(); 
//getListUsers: Boolean!
//getListUsers: getListUsersFinal!
const GET_LIST = gql`
 query namer($user:String! = "5f6a31b2152dd8290d641dad"){
	  getListUsers(user:$user) {
			 data {
				  name
					data {
						 _id
						 compatibilityScore
						 simDimension
						 profilePic
						 firstname
						 
					}
			 } 
		}
 }
`




export default function Matchmake({navigation}){
//const lists = useQuery(GET_LIST,);
// const [lists, setLists] = useState({
// 	 data:{
// 		  getListUsers:{
// 			   data:[
// 				{
// 					name:"asim", 
// 					data:[
// 						{
// 							 compatibilityScore:9.9, 
// 						}
// 					]		
// 				}
// 			   ]
// 		  }
// 	 }
// });

const [lists,setLists] = useState({

	data:{
		getListUsers:{
			 data:[
					 
			 ]
		}
	}

});  




useEffect(() => {
    const result = db.collection('user').doc('trial_user').onSnapshot((doc) => {

        const result =  db.collection('user').where(firebase.firestore.FieldPath.documentId(), 'in', doc.data().datingPoolList).get().then(result1 => {

			 //result1.docs.map(val => console.log(val.data().name))
			 //result1.docs.map(val => lister.push(Object.assign({}, val.data(), {_id:val.id}))); 
			 //result1.docs.map(val => tree.data.getListUsers.data.push({name:val.data().name}))
			//  lists.data.getListUsers.data[0].data.push(
			// 	 {
			// 	  name:'asim', 
			// 	  data:[{
			// 		   compatibilityScore:9.7
			// 	  }]
			//     }, 
			// 	{
			// 		name:'said', 
			// 		data:[{
			// 			 compatibilityScore:9.7
			// 		}]
			// 	  },
			
			//  )

			
			 

			 result1.docs.map(val => {
				 //tree.data.getListUsers.data.push({name:val.data().name});
				let inLists = {
					data:{
						getListUsers:{
							 data:[]
						}
					}
				};   
				  const gender = val.data().gender; 

				  let arr = []; 
				  if(gender == 'male'){
					   db.collection('user')
					  .where('gender', '==', 'female')
					  .where('age', '<=', val.data().age)
					  .get()
					  .then((result) => {
						  result.docs.map(val => {
							  
							arr.push(val.data()); 
						})
					
					    })
						
						
					  
					  .catch((error) => console.log(error));
					  lists.data.getListUsers.data.push({
						name:val.data().name, 
						data:arr
				   })
				   
					   
					   
				  }
				  else if(gender == 'female'){
					   db.collection('user')
					   .where('gender', '==', 'male')
					   .get()
					   .then((result) => { 
						   //result.docs.map(val => console.log(val.data().name)) 
					   })
					   .catch((error) => console.log(error)); 
				  }
			 })
			 			 
			 setLoadme(1); 
        })  
    })
	//console.log(tree)
 },[]) 


console.log(lists.data.getListUsers.data.length)

 
 



// const lists = {
// 	data:{
// 		getListUsers:{
// 			data:[
// 			{
// 			 name:"said", 
// 			 data:[{
// 				compatibilityScore:9.9, 
// 				creativity:9.9, 
// 				simDimension:'creative'
// 			 }, 
// 			 {
// 				 compatibilityScore:9.9, 
// 				 creativity:9.9
// 			 }, 
// 			 {
// 				 compatibilityScore:9.8
// 			 },
// 			 {
// 				compatibilityScore:9.8
// 			 },
// 			]
// 			},
// 			{
// 				name:"asim", 
// 				data:[{
// 				   compatibilityScore:9.5, 
// 				   creativity:9.5
// 				}, 
// 				{
// 					compatibilityScore:9.5, 
// 					creativity:9.9
// 				}, 
// 				{
// 					compatibilityScore:9.8
// 				},
// 				{
// 				   compatibilityScore:9.8
// 				},
// 			   ]
// 			   }
// 			]
// 		   }
// 	}
	
// 	}
	function computeSim(mainList, mainer) {
  
		for(let x = 0; x < mainList.length; x++){
		 for(let y = 0; y < mainer.data.getListUsers.data.length; y++) {
		   if(mainer.data.getListUsers.data[y].name == mainList[x].name) {
			for(let z = 0; z < mainer.data.getListUsers.data[y].data.length; z++){
			 if(mainList[x].emphatatic == mainer.data.getListUsers.data[y].data[z].emphatatic){
			  mainer.data.getListUsers.data[y].data[z].simDimension = 'emphatatic'; 
			 }
			  if(mainList[x].humor == mainer.data.getListUsers.data[y].data[z].humor){
			  mainer.data.getListUsers.data[y].data[z].simDimension = 'humor'; 
			 }
			  if(mainList[x].charisma == mainer.data.getListUsers.data[y].data[z].charisma){
			  mainer.data.getListUsers.data[y].data[z].simDimension = 'charisma'; 
			 }
			  if(mainList[x].creativity == mainer.data.getListUsers.data[y].data[z].creativity){
			  mainer.data.getListUsers.data[y].data[z].simDimension = 'creativity'; 
			 }
			  if(mainList[x].honest == mainer.data.getListUsers.data[y].data[z].honest){
			  mainer.data.getListUsers.data[y].data[z].simDimension = 'honest'; 
			 }
			  if(mainList[x].looks == mainer.data.getListUsers.data[y].data[z].looks){
			  mainer.data.getListUsers.data[y].data[z].simDimension = 'looks'; 
			 }
			  if(mainList[x].status == mainer.data.getListUsers.data[y].data[z].status){
			  mainer.data.getListUsers.data[y].data[z].simDimension = 'status'; 
			 }
			  if(mainList[x].wealthy == mainer.data.getListUsers.data[y].data[z].wealthy){
			  mainer.data.getListUsers.data[y].data[z].simDimension = 'wealthy'; 
			 }
			}
		   }
		 }
		}
	  }
	  
	  
const [lister, setLister] = useState([]); 


const [loadMe, setLoadme] = useState(); 

//const [lists, setLists] = useState([]); 

// useEffect(() => {
//     const result = db.collection('user').doc('trial_user').onSnapshot((doc) => {
//         const result =  db.collection('user').where(firebase.firestore.FieldPath.documentId(), 'in', doc.data().datingPoolList).get().then(result1 => {
             
             
             
             
//              //setUsers(['aijax', 'airband'])
//         })  
//     })
//  },[lister])

let addToList = () => {
	 
}  
useEffect(() => {
    const result = db.collection('user').doc('trial_user').onSnapshot((doc) => {
		 console.log("called")
        const result =  db.collection('user').where(firebase.firestore.FieldPath.documentId(), 'in', doc.data().datingPoolList).get().then(result1 => {
			 //result1.docs.map(val => console.log(val.data().name))
			 const gamer = []; 
			 result1.docs.map(val => gamer.push(Object.assign({}, val.data(), {_id:val.id}))); 
			 
			 setLister(gamer); 
			 //setLoadme(1); 
        })  
    })
	return function cleanUp(){
		 setLister([])
	}
	

},[])
 
const calculateSim = ({},[] ) => {
	 
}

// const lists = {
// 	 data:{
// 		  getListUsers:{
// 			   name:"zaid",
// 			   data: [{
// 				    name:"zubair", 
// 					compatibilityScore:9.9
// 			   }, 
// 			   {
// 				 name:"zaid", 
// 				 compatibilityScore:9.9   
// 			   }
			
// 			]
// 		  }
// 	 }
// } 
const [currentIndex, setCurrentIndex] = useState(0);
const [sliderState, setSliderState] = useState({ currentPage: 0 });
console.log(sliderState.currentPage)
const { width, height } = Dimensions.get('window');
let users = [];  
//console.log(sliderState.currentPage)

const sliderStateWrapper = () => {
	 
}

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
 
const sliderTemplate =  lister.map(val => {

	 console.log(val._id)
	return <View style={{ width,  height, }} key = {val._id}>
	<View style = {{ alignItems:"center", marginTop:20}} key = {val._id}>
	<MaterialIcons name="account-circle" size={75} color="black" />
	<Text style = {{fontWeight:"bold"}}>{ val.name }</Text>
	</View>
	</View>
})
const { currentPage: pageIndex } = sliderState;


if(lists.data){
	
	//users =  lists.data.getListUsers.data[sliderState.currentPage].data 
	// console.log(lists.data.getListUsers.data[0].data[10].compatibilityScore); 
	// console.log(lists.data.getListUsers.data[1].data[10].compatibilityScore)
	
	}
 


useEffect(() => {
	 async function gamer(){
		  
	 }
	 gamer()
})
const data = [{
	 name:"Zaid shaikh", 
	 _id:"something", 
	 data:[

	{
		"creativity": "7.2",
		"name": "Richard",
		"_id": "9FD36909-F364-70DB-BBC0-FA0B1A5AF867",
		"antiSocial": "6.9",
		"narcissistic": "2.7",
		"charismatic": "3.1",
		"goodLooking": "6.8",
		"wealthy": "3.5",
		"funny": "3.6",
		"goodHearted": "2.1",
		"intelligent": "4.5",
		"firstname": "August",
		"compatibilityScore": "10"
	},
	{
		"creativity": "2.5",
		"name": "Thor",
		"_id": "8FFBEB83-7101-D1EE-A37C-37217CF997DF",
		"antiSocial": "5.9",
		"narcissistic": "1.5",
		"charismatic": "9.1",
		"goodLooking": "6.6",
		"wealthy": "3.4",
		"funny": "7.9",
		"goodHearted": "1.3",
		"intelligent": "8.0",
		"firstname": "Uriel",
		"compatibilityScore": "10"
	},
	{
		"creativity": "1.4",
		"name": "Herman",
		"_id": "101ACF5E-F3F2-4A49-1B74-5B04C470F91A",
		"antiSocial": "5.5",
		"narcissistic": "6.7",
		"charismatic": "5.9",
		"goodLooking": "8.4",
		"wealthy": "1.4",
		"funny": "7.6",
		"goodHearted": "3.7",
		"intelligent": "7.6",
		"firstname": "Quamar",
		"compatibilityScore": "7.0"
	},
	{
		"creativity": "2.6",
		"name": "Francis",
		"_id": "9262CADC-8B27-91BA-E9D7-94EAF20404B8",
		"antiSocial": "9.1",
		"narcissistic": "1.3",
		"charismatic": "3.2",
		"goodLooking": "3.3",
		"wealthy": "7.1",
		"funny": "9.1",
		"goodHearted": "1.7",
		"intelligent": "5.7",
		"firstname": "Gareth",
		"compatibilityScore": "1.1"
	},
	{
		"creativity": "9.6",
		"name": "Castor",
		"_id": "C7BD43F8-AA07-CEF6-3746-8B1A1D971EB9",
		"antiSocial": "7.9",
		"narcissistic": "4.6",
		"charismatic": "2.0",
		"goodLooking": "6.1",
		"wealthy": "4.4",
		"funny": "9.8",
		"goodHearted": "7.8",
		"intelligent": "3.6",
		"firstname": "Paul",
		"compatibilityScore": "5.0"
	},
	{
		"creativity": "4.8",
		"name": "Axel",
		"_id": "56EDE1EA-50AA-8EE5-6159-03C8A2A78C18",
		"antiSocial": "5.2",
		"narcissistic": "9.4",
		"charismatic": "9.3",
		"goodLooking": "2.9",
		"wealthy": "5.4",
		"funny": "2.6",
		"goodHearted": "2.4",
		"intelligent": "7.4",
		"firstname": "Hunter",
		"compatibilityScore": "2.7"
	},
	{
		"creativity": "3.2",
		"name": "Shad",
		"_id": "8FFE751C-A039-89E6-137E-5062A3609757",
		"antiSocial": "6.5",
		"narcissistic": "5.7",
		"charismatic": "5.4",
		"goodLooking": "3.1",
		"wealthy": "3.2",
		"funny": "1.5",
		"goodHearted": "5.2",
		"intelligent": "9.8",
		"firstname": "Murphy",
		"compatibilityScore": "2.2"
	},
	{
		"creativity": "4.8",
		"name": "Ignatius",
		"_id": "2135503B-CC67-0EAE-37D8-E8E36E1ED6EC",
		"antiSocial": "7.1",
		"narcissistic": "1.8",
		"charismatic": "1.8",
		"goodLooking": "7.4",
		"wealthy": "5.7",
		"funny": "4.7",
		"goodHearted": "5.1",
		"intelligent": "1.1",
		"firstname": "Merrill",
		"compatibilityScore": "4.7"
	},
	{
		"creativity": "3.7",
		"name": "Armand",
		"_id": "7695ABDD-1DCD-E813-7763-78E76C6462E2",
		"antiSocial": "6.4",
		"narcissistic": "7.3",
		"charismatic": "9.0",
		"goodLooking": "7.3",
		"wealthy": "2.7",
		"funny": "4.2",
		"goodHearted": "9.8",
		"intelligent": "3.2",
		"firstname": "Xanthus",
		"compatibilityScore": "7.3"
	},
	{
		"creativity": "4.7",
		"name": "Tanek",
		"_id": "F9C4243A-2015-3B40-D2F2-4E11D7F9585B",
		"antiSocial": "4.0",
		"narcissistic": "4.2",
		"charismatic": "1.9",
		"goodLooking": "7.9",
		"wealthy": "9.4",
		"funny": "2.4",
		"goodHearted": "9.9",
		"intelligent": "8.3",
		"firstname": "Plato",
		"compatibilityScore": "6.1"
	},
	{
		"creativity": "1.5",
		"name": "Jonah",
		"_id": "DF90F9F3-BF27-63EE-03D6-3AC4222ABE89",
		"antiSocial": "2.2",
		"narcissistic": "1.7",
		"charismatic": "8.5",
		"goodLooking": "6.8",
		"wealthy": "9.6",
		"funny": "8.8",
		"goodHearted": "3.6",
		"intelligent": "2.9",
		"firstname": "Erich",
		"compatibilityScore": "5.0"
	},
	{
		"creativity": "8.4",
		"name": "Ciaran",
		"_id": "200ED9A6-B06B-190C-F496-019AB57C4E42",
		"antiSocial": "6.6",
		"narcissistic": "1.7",
		"charismatic": "3.1",
		"goodLooking": "1.8",
		"wealthy": "6.7",
		"funny": "5.0",
		"goodHearted": "5.5",
		"intelligent": "8.6",
		"firstname": "Honorato",
		"compatibilityScore": "6.2"
	},
	{
		"creativity": "6.5",
		"name": "Rudyard",
		"_id": "104F68D5-C686-3ED5-B2D9-06B9F8F39AC1",
		"antiSocial": "1.5",
		"narcissistic": "9.5",
		"charismatic": "2.5",
		"goodLooking": "1.4",
		"wealthy": "3.9",
		"funny": "4.7",
		"goodHearted": "2.1",
		"intelligent": "2.3",
		"firstname": "Declan",
		"compatibilityScore": "4.6"
	},
	{
		"creativity": "5.3",
		"name": "Silas",
		"_id": "8850E9A1-DEAB-9D24-9A75-8E589755571F",
		"antiSocial": "6.2",
		"narcissistic": "7.4",
		"charismatic": "1.9",
		"goodLooking": "8.1",
		"wealthy": "3.6",
		"funny": "5.2",
		"goodHearted": "8.5",
		"intelligent": "3.1",
		"firstname": "Cullen",
		"compatibilityScore": "6.8"
	},
	{
		"creativity": "2.1",
		"name": "Murphy",
		"_id": "4F4036B2-366F-F23E-A9DF-A89E605F19B3",
		"antiSocial": "3.4",
		"narcissistic": "3.1",
		"charismatic": "4.9",
		"goodLooking": "2.2",
		"wealthy": "7.8",
		"funny": "9.2",
		"goodHearted": "2.1",
		"intelligent": "5.9",
		"firstname": "Thomas",
		"compatibilityScore": "4.8"
	},
	{
		"creativity": "4.3",
		"name": "Keane",
		"_id": "B9BF92AC-40AD-90F3-3509-4895383DD502",
		"antiSocial": "3.2",
		"narcissistic": "9.3",
		"charismatic": "3.8",
		"goodLooking": "5.3",
		"wealthy": "9.5",
		"funny": "4.0",
		"goodHearted": "3.2",
		"intelligent": "2.2",
		"firstname": "Jeremy",
		"compatibilityScore": "7.3"
	},
	{
		"creativity": "9.6",
		"name": "Wang",
		"_id": "418ADBE8-E0BF-0197-C26C-67B44EF33923",
		"antiSocial": "2.8",
		"narcissistic": "7.9",
		"charismatic": "9.0",
		"goodLooking": "2.5",
		"wealthy": "4.6",
		"funny": "6.1",
		"goodHearted": "8.3",
		"intelligent": "1.4",
		"firstname": "Walter",
		"compatibilityScore": "8.4"
	},
	{
		"creativity": "5.0",
		"name": "Brett",
		"_id": "5FF54E07-67F1-63E8-F2ED-B68167F90AF3",
		"antiSocial": "10",
		"narcissistic": "7.1",
		"charismatic": "5.2",
		"goodLooking": "9.5",
		"wealthy": "3.9",
		"funny": "3.8",
		"goodHearted": "3.3",
		"intelligent": "7.4",
		"firstname": "Kevin",
		"compatibilityScore": "9.6"
	},
	{
		"creativity": "8.7",
		"name": "Blaze",
		"_id": "9FE15288-1180-CB04-12FF-0F3EE945B9E4",
		"antiSocial": "9.2",
		"narcissistic": "2.6",
		"charismatic": "3.0",
		"goodLooking": "7.2",
		"wealthy": "4.6",
		"funny": "3.0",
		"goodHearted": "2.8",
		"intelligent": "1.3",
		"firstname": "Alvin",
		"compatibilityScore": "9.1"
	},
	{
		"creativity": "5.9",
		"name": "Hop",
		"_id": "DA436FCA-CE0C-7830-73DA-E5779F73DCA0",
		"antiSocial": "4.6",
		"narcissistic": "6.7",
		"charismatic": "7.2",
		"goodLooking": "4.7",
		"wealthy": "5.7",
		"funny": "1.3",
		"goodHearted": "9.9",
		"intelligent": "8.7",
		"firstname": "Ivor",
		"compatibilityScore": "7.5"
	},
	{
		"creativity": "8.5",
		"name": "Axel",
		"_id": "C1704E62-E80E-53AD-E521-DF363DC59056",
		"antiSocial": "2.1",
		"narcissistic": "9.3",
		"charismatic": "4.9",
		"goodLooking": "8.4",
		"wealthy": "9.1",
		"funny": "9.7",
		"goodHearted": "7.4",
		"intelligent": "6.9",
		"firstname": "Christian",
		"compatibilityScore": "9.1"
	},
	{
		"creativity": "8.8",
		"name": "Barry",
		"_id": "684DF04A-940D-6D3D-DE6E-773B38D49C8B",
		"antiSocial": "8.1",
		"narcissistic": "1.7",
		"charismatic": "1.1",
		"goodLooking": "1.1",
		"wealthy": "7.8",
		"funny": "2.4",
		"goodHearted": "4.8",
		"intelligent": "3.0",
		"firstname": "Uriah",
		"compatibilityScore": "7.4"
	},
	{
		"creativity": "7.1",
		"name": "Perry",
		"_id": "71760BD0-528E-8900-4721-0A7AEAC3893B",
		"antiSocial": "7.8",
		"narcissistic": "6.9",
		"charismatic": "9.5",
		"goodLooking": "2.9",
		"wealthy": "7.0",
		"funny": "3.0",
		"goodHearted": "8.8",
		"intelligent": "8.3",
		"firstname": "Brian",
		"compatibilityScore": "7.8"
	},
	{
		"creativity": "5.1",
		"name": "Kyle",
		"_id": "F7DFBA82-3298-D912-45C1-ED9660CE11F4",
		"antiSocial": "7.4",
		"narcissistic": "7.0",
		"charismatic": "1.4",
		"goodLooking": "9.3",
		"wealthy": "8.7",
		"funny": "7.9",
		"goodHearted": "9.7",
		"intelligent": "9.1",
		"firstname": "Emmanuel",
		"compatibilityScore": "6.6"
	},
	{
		"creativity": "9.3",
		"name": "Zane",
		"_id": "9339626E-9978-D3FB-6F11-82DD31F64ACE",
		"antiSocial": "9.5",
		"narcissistic": "9.0",
		"charismatic": "9.4",
		"goodLooking": "3.3",
		"wealthy": "2.3",
		"funny": "5.0",
		"goodHearted": "9.1",
		"intelligent": "6.5",
		"firstname": "Kasper",
		"compatibilityScore": "1.0"
	},
	{
		"creativity": "7.4",
		"name": "Stewart",
		"_id": "7D8BC613-26BE-2F1E-53F4-DFBF4F141160",
		"antiSocial": "3.5",
		"narcissistic": "6.6",
		"charismatic": "8.0",
		"goodLooking": "10",
		"wealthy": "6.6",
		"funny": "2.3",
		"goodHearted": "7.0",
		"intelligent": "5.2",
		"firstname": "George",
		"compatibilityScore": "3.0"
	},
	{
		"creativity": "2.1",
		"name": "Dean",
		"_id": "43275631-437C-FC6D-AEAD-7CAAA9707B8C",
		"antiSocial": "9.0",
		"narcissistic": "2.9",
		"charismatic": "7.5",
		"goodLooking": "6.2",
		"wealthy": "6.3",
		"funny": "3.6",
		"goodHearted": "8.2",
		"intelligent": "2.1",
		"firstname": "Levi",
		"compatibilityScore": "2.4"
	},
	{
		"creativity": "4.0",
		"name": "Lester",
		"_id": "9F5C6E14-D102-BE9E-60AA-CDB4B5057969",
		"antiSocial": "9.5",
		"narcissistic": "2.4",
		"charismatic": "2.7",
		"goodLooking": "2.9",
		"wealthy": "7.1",
		"funny": "8.3",
		"goodHearted": "2.0",
		"intelligent": "7.9",
		"firstname": "Ian",
		"compatibilityScore": "5.8"
	},
	{
		"creativity": "4.0",
		"name": "Thaddeus",
		"_id": "29348FB7-1C32-90E6-4EF5-9FB3CCEBD83F",
		"antiSocial": "1.7",
		"narcissistic": "3.7",
		"charismatic": "8.0",
		"goodLooking": "2.5",
		"wealthy": "8.7",
		"funny": "2.7",
		"goodHearted": "8.6",
		"intelligent": "2.9",
		"firstname": "Blaze",
		"compatibilityScore": "9.2"
	},
	{
		"creativity": "3.2",
		"name": "Brett",
		"_id": "59DB2573-0D1D-FCC0-4603-EB296CF115D8",
		"antiSocial": "1.8",
		"narcissistic": "9.9",
		"charismatic": "7.2",
		"goodLooking": "1.6",
		"wealthy": "5.1",
		"funny": "7.6",
		"goodHearted": "5.0",
		"intelligent": "5.1",
		"firstname": "Aristotle",
		"compatibilityScore": "9.3"
	},
	{
		"creativity": "6.4",
		"name": "Burke",
		"_id": "B47F6CAB-CF15-D5A4-2E09-860528E4A1B1",
		"antiSocial": "4.9",
		"narcissistic": "6.9",
		"charismatic": "1.2",
		"goodLooking": "9.1",
		"wealthy": "7.8",
		"funny": "6.7",
		"goodHearted": "4.1",
		"intelligent": "2.4",
		"firstname": "Dane",
		"compatibilityScore": "5.2"
	},
	{
		"creativity": "6.4",
		"name": "Fulton",
		"_id": "08578E29-E3AC-B76D-FD38-2D51FFAB8232",
		"antiSocial": "3.4",
		"narcissistic": "1.8",
		"charismatic": "9.5",
		"goodLooking": "1.2",
		"wealthy": "1.6",
		"funny": "3.5",
		"goodHearted": "2.6",
		"intelligent": "3.2",
		"firstname": "Vance",
		"compatibilityScore": "9.1"
	},
	{
		"creativity": "4.1",
		"name": "Jameson",
		"_id": "50CB2CAF-32BA-2C90-3A8C-E24492F21A5B",
		"antiSocial": "2.6",
		"narcissistic": "9.0",
		"charismatic": "4.8",
		"goodLooking": "7.0",
		"wealthy": "4.7",
		"funny": "3.1",
		"goodHearted": "8.2",
		"intelligent": "1.9",
		"firstname": "Tarik",
		"compatibilityScore": "4.2"
	},
	{
		"creativity": "8.0",
		"name": "Basil",
		"_id": "7C52BD5B-E123-D673-0143-8BF7160DB873",
		"antiSocial": "8.3",
		"narcissistic": "8.3",
		"charismatic": "1.1",
		"goodLooking": "2.8",
		"wealthy": "9.5",
		"funny": "4.6",
		"goodHearted": "4.7",
		"intelligent": "7.9",
		"firstname": "Hu",
		"compatibilityScore": "7.2"
	},
	{
		"creativity": "7.8",
		"name": "Jeremy",
		"_id": "8DB3B607-7D93-C593-88B5-0CBD86992C2C",
		"antiSocial": "2.2",
		"narcissistic": "5.1",
		"charismatic": "6.4",
		"goodLooking": "3.8",
		"wealthy": "10",
		"funny": "4.2",
		"goodHearted": "2.9",
		"intelligent": "1.2",
		"firstname": "Slade",
		"compatibilityScore": "8.1"
	},
	{
		"creativity": "4.0",
		"name": "Rahim",
		"_id": "30DA0529-0B33-D650-2FF0-D0368082E85A",
		"antiSocial": "5.4",
		"narcissistic": "8.6",
		"charismatic": "4.8",
		"goodLooking": "7.8",
		"wealthy": "9.8",
		"funny": "1.8",
		"goodHearted": "3.3",
		"intelligent": "6.1",
		"firstname": "Damon",
		"compatibilityScore": "9.2"
	},
	{
		"creativity": "7.4",
		"name": "Amal",
		"_id": "44353358-E159-C42B-EDC2-4898E0238E11",
		"antiSocial": "7.6",
		"narcissistic": "7.7",
		"charismatic": "1.3",
		"goodLooking": "6.7",
		"wealthy": "7.3",
		"funny": "2.6",
		"goodHearted": "9.8",
		"intelligent": "9.9",
		"firstname": "Tyrone",
		"compatibilityScore": "5.8"
	},
	{
		"creativity": "1.7",
		"name": "Devin",
		"_id": "A01EEA5E-EF69-2ECA-6AAD-4E9D0E8633E2",
		"antiSocial": "7.6",
		"narcissistic": "8.5",
		"charismatic": "7.6",
		"goodLooking": "5.7",
		"wealthy": "5.4",
		"funny": "8.4",
		"goodHearted": "1.8",
		"intelligent": "1.1",
		"firstname": "Wade",
		"compatibilityScore": "2.5"
	},
	{
		"creativity": "2.6",
		"name": "Luke",
		"_id": "8AECAAE2-275C-D011-DBE2-41643FDA7E7E",
		"antiSocial": "1.2",
		"narcissistic": "4.3",
		"charismatic": "7.0",
		"goodLooking": "7.0",
		"wealthy": "2.4",
		"funny": "9.1",
		"goodHearted": "6.8",
		"intelligent": "3.0",
		"firstname": "Lance",
		"compatibilityScore": "3.1"
	},
	{
		"creativity": "5.1",
		"name": "Vladimir",
		"_id": "AD64ECD0-8C50-F644-D7A7-BC091396191F",
		"antiSocial": "3.6",
		"narcissistic": "5.5",
		"charismatic": "3.0",
		"goodLooking": "5.0",
		"wealthy": "6.2",
		"funny": "6.2",
		"goodHearted": "2.4",
		"intelligent": "8.2",
		"firstname": "Ivor",
		"compatibilityScore": "1.1"
	},
	{
		"creativity": "6.9",
		"name": "Mason",
		"_id": "B9FA84D7-C38D-71AB-E165-6728B76D17DE",
		"antiSocial": "1.7",
		"narcissistic": "2.0",
		"charismatic": "7.7",
		"goodLooking": "2.8",
		"wealthy": "8.2",
		"funny": "3.3",
		"goodHearted": "5.6",
		"intelligent": "4.1",
		"firstname": "Dale",
		"compatibilityScore": "2.8"
	},
	{
		"creativity": "10",
		"name": "Yoshio",
		"_id": "5402412B-534C-3A26-BB18-B17B92001CA4",
		"antiSocial": "2.3",
		"narcissistic": "4.9",
		"charismatic": "4.1",
		"goodLooking": "8.3",
		"wealthy": "7.7",
		"funny": "6.5",
		"goodHearted": "10",
		"intelligent": "2.6",
		"firstname": "Rafael",
		"compatibilityScore": "3.5"
	},
	{
		"creativity": "7.1",
		"name": "Ira",
		"_id": "331C60FC-2D34-9C4D-6A40-7BDFE15FC83E",
		"antiSocial": "3.0",
		"narcissistic": "5.5",
		"charismatic": "3.5",
		"goodLooking": "2.1",
		"wealthy": "8.1",
		"funny": "7.9",
		"goodHearted": "3.6",
		"intelligent": "6.3",
		"firstname": "Zane",
		"compatibilityScore": "8.0"
	},
	{
		"creativity": "7.1",
		"name": "Hoyt",
		"_id": "7E2B8D46-3D69-1E4B-0A1E-87289EE4CFF5",
		"antiSocial": "2.0",
		"narcissistic": "4.4",
		"charismatic": "7.1",
		"goodLooking": "8.6",
		"wealthy": "2.1",
		"funny": "5.4",
		"goodHearted": "4.5",
		"intelligent": "3.0",
		"firstname": "Dylan",
		"compatibilityScore": "7.9"
	},
	{
		"creativity": "1.1",
		"name": "Ignatius",
		"_id": "12C1F5E1-DE18-AB60-FB30-9BB76833E4AC",
		"antiSocial": "4.5",
		"narcissistic": "6.0",
		"charismatic": "3.6",
		"goodLooking": "9.2",
		"wealthy": "5.9",
		"funny": "6.4",
		"goodHearted": "4.9",
		"intelligent": "8.6",
		"firstname": "Hayes",
		"compatibilityScore": "2.9"
	},
	{
		"creativity": "1.9",
		"name": "Kuame",
		"_id": "0EF42165-C9E3-BBB8-E489-9F9D8210A06F",
		"antiSocial": "3.7",
		"narcissistic": "9.4",
		"charismatic": "6.8",
		"goodLooking": "9.4",
		"wealthy": "5.9",
		"funny": "9.6",
		"goodHearted": "7.8",
		"intelligent": "1.0",
		"firstname": "Sebastian",
		"compatibilityScore": "6.0"
	},
	{
		"creativity": "2.7",
		"name": "Xenos",
		"_id": "E77202B5-8561-83E1-CEBF-6C36FFFD2980",
		"antiSocial": "5.2",
		"narcissistic": "6.4",
		"charismatic": "6.4",
		"goodLooking": "3.5",
		"wealthy": "6.9",
		"funny": "6.4",
		"goodHearted": "4.3",
		"intelligent": "6.6",
		"firstname": "Malik",
		"compatibilityScore": "6.8"
	},
	{
		"creativity": "9.7",
		"name": "Demetrius",
		"_id": "F1BEB79B-A216-556B-A3C1-1477F8676915",
		"antiSocial": "4.8",
		"narcissistic": "2.3",
		"charismatic": "2.6",
		"goodLooking": "6.5",
		"wealthy": "9.6",
		"funny": "2.2",
		"goodHearted": "1.8",
		"intelligent": "9.5",
		"firstname": "Wang",
		"compatibilityScore": "9.5"
	},
	{
		"creativity": "4.8",
		"name": "Reese",
		"_id": "1A1D4E46-3C7B-9ED0-39F6-612AF3F62573",
		"antiSocial": "8.2",
		"narcissistic": "6.8",
		"charismatic": "4.5",
		"goodLooking": "6.9",
		"wealthy": "7.3",
		"funny": "1.4",
		"goodHearted": "3.7",
		"intelligent": "3.4",
		"firstname": "Castor",
		"compatibilityScore": "1.8"
	},
	{
		"creativity": "8.7",
		"name": "Brent",
		"_id": "BCEFC04C-42D3-7FC9-034C-C9E9A2C42EB4",
		"antiSocial": "4.4",
		"narcissistic": "1.2",
		"charismatic": "6.0",
		"goodLooking": "1.6",
		"wealthy": "5.2",
		"funny": "2.5",
		"goodHearted": "2.1",
		"intelligent": "7.7",
		"firstname": "Isaac",
		"compatibilityScore": "8.6"
	},
	{
		"creativity": "1.0",
		"name": "Calvin",
		"_id": "45D8DB25-10A8-A1D9-B840-230CB5E75B22",
		"antiSocial": "1.1",
		"narcissistic": "2.0",
		"charismatic": "5.8",
		"goodLooking": "7.3",
		"wealthy": "7.0",
		"funny": "3.0",
		"goodHearted": "4.3",
		"intelligent": "8.9",
		"firstname": "Deacon",
		"compatibilityScore": "4.4"
	},
	{
		"creativity": "6.5",
		"name": "Avram",
		"_id": "6FF0E55B-3FF6-F3D4-EAA9-72E104EF5BA9",
		"antiSocial": "8.9",
		"narcissistic": "5.2",
		"charismatic": "9.6",
		"goodLooking": "10",
		"wealthy": "4.8",
		"funny": "4.6",
		"goodHearted": "4.3",
		"intelligent": "4.0",
		"firstname": "Judah",
		"compatibilityScore": "7.6"
	},
	{
		"creativity": "6.6",
		"name": "Ryder",
		"_id": "E7D67148-C3B5-EA5C-4B55-45DDEBF64D9F",
		"antiSocial": "9.4",
		"narcissistic": "8.0",
		"charismatic": "2.1",
		"goodLooking": "6.4",
		"wealthy": "4.9",
		"funny": "4.3",
		"goodHearted": "2.4",
		"intelligent": "3.8",
		"firstname": "Harper",
		"compatibilityScore": "6.3"
	},
	{
		"creativity": "1.5",
		"name": "Ahmed",
		"_id": "F7E8FE75-60C1-FF7A-096C-7CA49A81EC37",
		"antiSocial": "7.3",
		"narcissistic": "4.6",
		"charismatic": "8.4",
		"goodLooking": "5.9",
		"wealthy": "6.4",
		"funny": "3.4",
		"goodHearted": "1.2",
		"intelligent": "6.0",
		"firstname": "Vance",
		"compatibilityScore": "7.0"
	},
	{
		"creativity": "1.4",
		"name": "Patrick",
		"_id": "288646FB-DC64-01A9-1C50-E04D09830AEA",
		"antiSocial": "5.4",
		"narcissistic": "7.1",
		"charismatic": "5.8",
		"goodLooking": "9.9",
		"wealthy": "10",
		"funny": "5.6",
		"goodHearted": "5.2",
		"intelligent": "4.9",
		"firstname": "Jesse",
		"compatibilityScore": "9.8"
	},
	{
		"creativity": "2.3",
		"name": "Abbot",
		"_id": "A3713B8E-5640-36A1-81FB-72A45C1A6146",
		"antiSocial": "2.3",
		"narcissistic": "2.3",
		"charismatic": "2.7",
		"goodLooking": "8.5",
		"wealthy": "7.2",
		"funny": "6.2",
		"goodHearted": "3.9",
		"intelligent": "8.0",
		"firstname": "George",
		"compatibilityScore": "4.6"
	},
	{
		"creativity": "3.7",
		"name": "Dean",
		"_id": "95C8F376-68ED-F6E9-9260-09B4E38E672F",
		"antiSocial": "5.3",
		"narcissistic": "2.6",
		"charismatic": "9.5",
		"goodLooking": "3.2",
		"wealthy": "1.3",
		"funny": "4.5",
		"goodHearted": "5.1",
		"intelligent": "3.9",
		"firstname": "Tyler",
		"compatibilityScore": "9.1"
	},
	{
		"creativity": "5.6",
		"name": "Lyle",
		"_id": "F0FD22AF-F723-7968-5562-ED73A1ACAC83",
		"antiSocial": "8.7",
		"narcissistic": "7.8",
		"charismatic": "6.2",
		"goodLooking": "7.1",
		"wealthy": "6.9",
		"funny": "7.9",
		"goodHearted": "8.9",
		"intelligent": "6.2",
		"firstname": "Brendan",
		"compatibilityScore": "9.0"
	},
	{
		"creativity": "5.7",
		"name": "Preston",
		"_id": "CF10BD11-004D-0FE9-2759-72DEB74DA253",
		"antiSocial": "5.4",
		"narcissistic": "2.5",
		"charismatic": "2.5",
		"goodLooking": "4.3",
		"wealthy": "10",
		"funny": "2.1",
		"goodHearted": "9.9",
		"intelligent": "2.1",
		"firstname": "Brody",
		"compatibilityScore": "10"
	},
	{
		"creativity": "8.4",
		"name": "Mannix",
		"_id": "8DCAD606-A580-9F36-AB15-EC5EAF491670",
		"antiSocial": "5.4",
		"narcissistic": "2.6",
		"charismatic": "7.6",
		"goodLooking": "9.3",
		"wealthy": "9.9",
		"funny": "2.0",
		"goodHearted": "6.8",
		"intelligent": "2.4",
		"firstname": "Moses",
		"compatibilityScore": "5.8"
	},
	{
		"creativity": "6.0",
		"name": "Kenyon",
		"_id": "CE2244C0-7DF2-B4AD-52B2-444D3530AB8F",
		"antiSocial": "1.5",
		"narcissistic": "2.0",
		"charismatic": "3.3",
		"goodLooking": "3.4",
		"wealthy": "5.3",
		"funny": "5.8",
		"goodHearted": "7.5",
		"intelligent": "5.8",
		"firstname": "Palmer",
		"compatibilityScore": "3.6"
	},
	{
		"creativity": "9.6",
		"name": "Benedict",
		"_id": "9BA2964B-962D-916B-8F42-D618F6BB5D96",
		"antiSocial": "6.5",
		"narcissistic": "9.9",
		"charismatic": "8.8",
		"goodLooking": "4.8",
		"wealthy": "6.9",
		"funny": "7.3",
		"goodHearted": "3.6",
		"intelligent": "3.6",
		"firstname": "Mason",
		"compatibilityScore": "2.4"
	},
	{
		"creativity": "2.6",
		"name": "Ronan",
		"_id": "405E7D60-251F-9768-6522-D79EC7026BBE",
		"antiSocial": "7.4",
		"narcissistic": "5.4",
		"charismatic": "3.3",
		"goodLooking": "2.7",
		"wealthy": "6.1",
		"funny": "2.6",
		"goodHearted": "2.4",
		"intelligent": "9.5",
		"firstname": "Devin",
		"compatibilityScore": "1.2"
	},
	{
		"creativity": "8.7",
		"name": "Jack",
		"_id": "26424527-43CE-8DB9-2CCD-9F0D550D8384",
		"antiSocial": "5.8",
		"narcissistic": "8.4",
		"charismatic": "4.0",
		"goodLooking": "6.0",
		"wealthy": "8.6",
		"funny": "7.6",
		"goodHearted": "7.1",
		"intelligent": "6.6",
		"firstname": "Gareth",
		"compatibilityScore": "7.8"
	},
	{
		"creativity": "10",
		"name": "Reece",
		"_id": "23607060-975A-6EB8-1496-B6DD526D5B16",
		"antiSocial": "9.3",
		"narcissistic": "3.1",
		"charismatic": "5.4",
		"goodLooking": "2.6",
		"wealthy": "9.7",
		"funny": "8.3",
		"goodHearted": "4.6",
		"intelligent": "3.3",
		"firstname": "Harper",
		"compatibilityScore": "3.1"
	},
	{
		"creativity": "8.3",
		"name": "Adam",
		"_id": "B906102D-5E7D-A53F-244E-14F045EE94E2",
		"antiSocial": "8.7",
		"narcissistic": "8.0",
		"charismatic": "8.0",
		"goodLooking": "1.1",
		"wealthy": "8.0",
		"funny": "7.8",
		"goodHearted": "8.3",
		"intelligent": "8.4",
		"firstname": "Alvin",
		"compatibilityScore": "7.0"
	},
	{
		"creativity": "5.1",
		"name": "Callum",
		"_id": "E8AD4FA3-4E4F-B106-7084-06544F0C5C70",
		"antiSocial": "2.1",
		"narcissistic": "1.7",
		"charismatic": "1.4",
		"goodLooking": "8.2",
		"wealthy": "8.1",
		"funny": "3.5",
		"goodHearted": "1.2",
		"intelligent": "6.4",
		"firstname": "Alden",
		"compatibilityScore": "4.9"
	},
	{
		"creativity": "4.8",
		"name": "Chancellor",
		"_id": "3D656D9B-729F-1EE6-2E6B-A50E221C632B",
		"antiSocial": "5.5",
		"narcissistic": "7.9",
		"charismatic": "2.0",
		"goodLooking": "4.5",
		"wealthy": "4.5",
		"funny": "8.4",
		"goodHearted": "2.3",
		"intelligent": "1.2",
		"firstname": "Adam",
		"compatibilityScore": "3.3"
	},
	{
		"creativity": "8.9",
		"name": "Nash",
		"_id": "1B90F19B-6AD7-5270-A310-C55A2F2EBB41",
		"antiSocial": "7.9",
		"narcissistic": "9.2",
		"charismatic": "6.4",
		"goodLooking": "3.3",
		"wealthy": "5.9",
		"funny": "9.7",
		"goodHearted": "2.1",
		"intelligent": "5.9",
		"firstname": "Alexander",
		"compatibilityScore": "7.2"
	},
	{
		"creativity": "1.9",
		"name": "Troy",
		"_id": "DA65AD7C-8613-FFB0-885D-4F0A83F86E0D",
		"antiSocial": "1.1",
		"narcissistic": "4.7",
		"charismatic": "2.6",
		"goodLooking": "6.2",
		"wealthy": "8.9",
		"funny": "6.9",
		"goodHearted": "1.9",
		"intelligent": "8.1",
		"firstname": "Colton",
		"compatibilityScore": "5.5"
	},
	{
		"creativity": "8.6",
		"name": "Tanek",
		"_id": "486A7022-E165-577E-65EE-F76CA1A4A12B",
		"antiSocial": "3.6",
		"narcissistic": "8.6",
		"charismatic": "1.1",
		"goodLooking": "3.6",
		"wealthy": "9.6",
		"funny": "2.8",
		"goodHearted": "1.9",
		"intelligent": "2.4",
		"firstname": "Hoyt",
		"compatibilityScore": "7.8"
	},
	{
		"creativity": "4.6",
		"name": "Igor",
		"_id": "ADA2F7B0-027B-103E-4067-83932E00EA08",
		"antiSocial": "6.5",
		"narcissistic": "4.5",
		"charismatic": "1.2",
		"goodLooking": "1.5",
		"wealthy": "9.0",
		"funny": "3.2",
		"goodHearted": "2.4",
		"intelligent": "4.4",
		"firstname": "Tyrone",
		"compatibilityScore": "8.1"
	},
	{
		"creativity": "6.2",
		"name": "Tad",
		"_id": "705DFEDD-C61C-3CB4-0B79-8A2E709DA954",
		"antiSocial": "9.3",
		"narcissistic": "4.3",
		"charismatic": "2.0",
		"goodLooking": "2.4",
		"wealthy": "1.8",
		"funny": "4.3",
		"goodHearted": "6.5",
		"intelligent": "9.4",
		"firstname": "Colin",
		"compatibilityScore": "1.4"
	},
	{
		"creativity": "5.5",
		"name": "Brendan",
		"_id": "C9633A04-C84C-8ABC-5445-E7BC6F8CFB1D",
		"antiSocial": "6.2",
		"narcissistic": "5.0",
		"charismatic": "7.1",
		"goodLooking": "3.2",
		"wealthy": "2.8",
		"funny": "4.7",
		"goodHearted": "5.8",
		"intelligent": "2.4",
		"firstname": "Yuli",
		"compatibilityScore": "1.8"
	},
	{
		"creativity": "9.9",
		"name": "Trevor",
		"_id": "0A2E3437-13B6-7C20-C25E-26B0F72E000E",
		"antiSocial": "8.5",
		"narcissistic": "9.9",
		"charismatic": "7.7",
		"goodLooking": "7.1",
		"wealthy": "2.3",
		"funny": "5.1",
		"goodHearted": "9.0",
		"intelligent": "1.4",
		"firstname": "Ferdinand",
		"compatibilityScore": "7.0"
	},
	{
		"creativity": "9.4",
		"name": "Theodore",
		"_id": "E1321C4C-AE07-4CA6-71D8-C959A8FF54BC",
		"antiSocial": "5.5",
		"narcissistic": "7.2",
		"charismatic": "1.0",
		"goodLooking": "6.2",
		"wealthy": "7.0",
		"funny": "9.4",
		"goodHearted": "7.8",
		"intelligent": "3.7",
		"firstname": "Tobias",
		"compatibilityScore": "10"
	},
	{
		"creativity": "8.4",
		"name": "Jordan",
		"_id": "B66B32CE-F40E-F461-6BA6-8F0049056AF3",
		"antiSocial": "8.9",
		"narcissistic": "8.0",
		"charismatic": "5.7",
		"goodLooking": "3.6",
		"wealthy": "3.6",
		"funny": "8.5",
		"goodHearted": "4.1",
		"intelligent": "4.0",
		"firstname": "Eric",
		"compatibilityScore": "1.9"
	},
	{
		"creativity": "5.3",
		"name": "Vincent",
		"_id": "73F9A45D-2753-0107-ECDD-5C0B333C98CA",
		"antiSocial": "6.9",
		"narcissistic": "8.6",
		"charismatic": "5.0",
		"goodLooking": "8.5",
		"wealthy": "3.7",
		"funny": "8.2",
		"goodHearted": "7.9",
		"intelligent": "2.2",
		"firstname": "Nasim",
		"compatibilityScore": "1.8"
	},
	{
		"creativity": "5.8",
		"name": "Troy",
		"_id": "7D1C0737-47DE-0B50-F0B3-6E54460D7404",
		"antiSocial": "6.0",
		"narcissistic": "4.3",
		"charismatic": "7.3",
		"goodLooking": "1.7",
		"wealthy": "4.5",
		"funny": "9.8",
		"goodHearted": "1.2",
		"intelligent": "6.7",
		"firstname": "Austin",
		"compatibilityScore": "3.9"
	},
	{
		"creativity": "8.0",
		"name": "Warren",
		"_id": "63EDCCB2-09CA-AA7E-B1C2-CFAF7CB6BB2B",
		"antiSocial": "9.7",
		"narcissistic": "1.9",
		"charismatic": "7.6",
		"goodLooking": "1.2",
		"wealthy": "1.5",
		"funny": "5.0",
		"goodHearted": "2.5",
		"intelligent": "2.7",
		"firstname": "Rudyard",
		"compatibilityScore": "1.6"
	},
	{
		"creativity": "1.6",
		"name": "Theodore",
		"_id": "1FA91DED-FE28-C7A8-4D4E-560F6661FF4C",
		"antiSocial": "4.0",
		"narcissistic": "5.7",
		"charismatic": "1.7",
		"goodLooking": "7.5",
		"wealthy": "4.1",
		"funny": "5.4",
		"goodHearted": "4.5",
		"intelligent": "8.5",
		"firstname": "Brock",
		"compatibilityScore": "9.6"
	},
	{
		"creativity": "8.0",
		"name": "Cedric",
		"_id": "83849D59-144F-7880-3CA9-72E260437268",
		"antiSocial": "2.6",
		"narcissistic": "8.6",
		"charismatic": "6.2",
		"goodLooking": "9.5",
		"wealthy": "8.6",
		"funny": "7.7",
		"goodHearted": "2.7",
		"intelligent": "2.9",
		"firstname": "Lyle",
		"compatibilityScore": "7.3"
	},
	{
		"creativity": "3.6",
		"name": "Leonard",
		"_id": "559B6CE5-5C0F-B7CF-19FC-B28701686193",
		"antiSocial": "7.6",
		"narcissistic": "7.2",
		"charismatic": "7.8",
		"goodLooking": "4.8",
		"wealthy": "8.2",
		"funny": "6.8",
		"goodHearted": "4.3",
		"intelligent": "9.3",
		"firstname": "Ryan",
		"compatibilityScore": "6.4"
	},
	{
		"creativity": "4.8",
		"name": "Knox",
		"_id": "BD09CF19-1E82-A331-0CDA-AA5B4281B982",
		"antiSocial": "6.9",
		"narcissistic": "4.8",
		"charismatic": "3.6",
		"goodLooking": "4.8",
		"wealthy": "8.1",
		"funny": "1.0",
		"goodHearted": "3.9",
		"intelligent": "1.9",
		"firstname": "Tarik",
		"compatibilityScore": "9.8"
	},
	{
		"creativity": "7.9",
		"name": "George",
		"_id": "00F654F2-8231-539E-EA6C-E1C238CF74C1",
		"antiSocial": "8.3",
		"narcissistic": "9.3",
		"charismatic": "5.3",
		"goodLooking": "4.0",
		"wealthy": "2.6",
		"funny": "3.4",
		"goodHearted": "2.1",
		"intelligent": "7.4",
		"firstname": "Jermaine",
		"compatibilityScore": "2.3"
	},
	{
		"creativity": "9.9",
		"name": "Driscoll",
		"_id": "3A315720-B2CF-C624-6B73-0FD3E51A574D",
		"antiSocial": "4.7",
		"narcissistic": "1.9",
		"charismatic": "9.7",
		"goodLooking": "4.8",
		"wealthy": "3.8",
		"funny": "5.2",
		"goodHearted": "6.1",
		"intelligent": "7.7",
		"firstname": "Asher",
		"compatibilityScore": "7.2"
	},
	{
		"creativity": "5.2",
		"name": "Noble",
		"_id": "B35DCFD7-32C7-5AF9-DA8E-49162E8D368B",
		"antiSocial": "7.3",
		"narcissistic": "7.7",
		"charismatic": "4.8",
		"goodLooking": "5.4",
		"wealthy": "5.7",
		"funny": "6.1",
		"goodHearted": "9.6",
		"intelligent": "10",
		"firstname": "Ivor",
		"compatibilityScore": "8.9"
	},
	{
		"creativity": "4.4",
		"name": "Maxwell",
		"_id": "7EF1C0A1-8B15-5B87-F25C-1DE0739CA4B3",
		"antiSocial": "10",
		"narcissistic": "4.8",
		"charismatic": "1.4",
		"goodLooking": "5.3",
		"wealthy": "1.2",
		"funny": "1.9",
		"goodHearted": "6.4",
		"intelligent": "4.5",
		"firstname": "Mannix",
		"compatibilityScore": "9.1"
	},
	{
		"creativity": "2.7",
		"name": "Trevor",
		"_id": "3CAA9B95-5D8E-B3FF-A2C3-3FFEC3423876",
		"antiSocial": "7.6",
		"narcissistic": "1.5",
		"charismatic": "1.4",
		"goodLooking": "6.4",
		"wealthy": "5.2",
		"funny": "4.2",
		"goodHearted": "7.9",
		"intelligent": "1.3",
		"firstname": "Judah",
		"compatibilityScore": "7.5"
	},
	{
		"creativity": "5.0",
		"name": "Armand",
		"_id": "CBAA9F22-8322-740D-D65B-27012656469A",
		"antiSocial": "2.2",
		"narcissistic": "4.8",
		"charismatic": "3.2",
		"goodLooking": "7.7",
		"wealthy": "6.5",
		"funny": "3.3",
		"goodHearted": "3.4",
		"intelligent": "3.0",
		"firstname": "Cedric",
		"compatibilityScore": "7.3"
	},
	{
		"creativity": "8.8",
		"name": "Eric",
		"_id": "C6A67C06-8083-CFFF-51A2-67205F539D7A",
		"antiSocial": "5.8",
		"narcissistic": "8.8",
		"charismatic": "4.8",
		"goodLooking": "9.7",
		"wealthy": "2.7",
		"funny": "8.2",
		"goodHearted": "8.0",
		"intelligent": "2.8",
		"firstname": "Kenneth",
		"compatibilityScore": "3.6"
	},
	{
		"creativity": "5.9",
		"name": "Ronan",
		"_id": "A7EE2B18-A857-52A3-A8E9-287AA9C72729",
		"antiSocial": "9.8",
		"narcissistic": "6.2",
		"charismatic": "5.7",
		"goodLooking": "1.6",
		"wealthy": "5.1",
		"funny": "6.2",
		"goodHearted": "3.3",
		"intelligent": "3.5",
		"firstname": "Yuli",
		"compatibilityScore": "5.1"
	},
	{
		"creativity": "5.2",
		"name": "Amir",
		"_id": "30C200B3-56C4-0E24-57AA-AB571DFA957B",
		"antiSocial": "3.7",
		"narcissistic": "5.4",
		"charismatic": "5.2",
		"goodLooking": "2.5",
		"wealthy": "8.8",
		"funny": "2.0",
		"goodHearted": "3.0",
		"intelligent": "1.6",
		"firstname": "Nathaniel",
		"compatibilityScore": "9.9"
	},
	{
		"creativity": "5.8",
		"name": "Lester",
		"_id": "8F4AB8C9-9C05-8053-644A-F976E5AF294A",
		"antiSocial": "2.9",
		"narcissistic": "7.1",
		"charismatic": "9.5",
		"goodLooking": "9.5",
		"wealthy": "6.4",
		"funny": "2.7",
		"goodHearted": "8.2",
		"intelligent": "1.6",
		"firstname": "Quamar",
		"compatibilityScore": "10"
	},
	{
		"creativity": "3.1",
		"name": "Griffith",
		"_id": "EE6F8A49-CEB8-5234-2722-3E830004C982",
		"antiSocial": "6.0",
		"narcissistic": "1.4",
		"charismatic": "9.6",
		"goodLooking": "1.4",
		"wealthy": "6.6",
		"funny": "8.4",
		"goodHearted": "8.5",
		"intelligent": "1.4",
		"firstname": "Reese",
		"compatibilityScore": "10"
	},
	{
		"creativity": "8.1",
		"name": "Erasmus",
		"_id": "A1581A03-02B1-F3FF-6DD6-BFD4834DEF86",
		"antiSocial": "2.9",
		"narcissistic": "6.3",
		"charismatic": "2.9",
		"goodLooking": "8.0",
		"wealthy": "4.9",
		"funny": "6.1",
		"goodHearted": "3.9",
		"intelligent": "4.0",
		"firstname": "Lester",
		"compatibilityScore": "10"
	},
	{
		"creativity": "4.9",
		"name": "Mohammad",
		"_id": "6195766D-2ED9-BDB3-A22B-191B6B523C02",
		"antiSocial": "4.3",
		"narcissistic": "8.8",
		"charismatic": "6.2",
		"goodLooking": "9.0",
		"wealthy": "2.4",
		"funny": "3.3",
		"goodHearted": "3.2",
		"intelligent": "2.2",
		"firstname": "Uriel",
		"compatibilityScore": "10"
	},
	{
		"creativity": "5.5",
		"name": "Burton",
		"_id": "0DF0A730-3998-E0F1-6E39-8BA3739111C6",
		"antiSocial": "1.3",
		"narcissistic": "1.3",
		"charismatic": "4.4",
		"goodLooking": "9.2",
		"wealthy": "9.7",
		"funny": "5.2",
		"goodHearted": "7.0",
		"intelligent": "6.8",
		"firstname": "Ethan",
		"compatibilityScore": "10"
	},
	{
		"creativity": "4.9",
		"name": "Dante",
		"_id": "B82EF295-24D7-9177-8616-B7F44B508524",
		"antiSocial": "6.0",
		"narcissistic": "6.2",
		"charismatic": "4.8",
		"goodLooking": "6.1",
		"wealthy": "8.3",
		"funny": "4.8",
		"goodHearted": "9.2",
		"intelligent": "6.8",
		"firstname": "Holmes",
		"compatibilityScore": "10"
	},
	{
		"creativity": "1.7",
		"name": "Yardley",
		"_id": "F9E1A2AE-80F8-5B4F-B661-7289C01C5BA2",
		"antiSocial": "6.1",
		"narcissistic": "2.7",
		"charismatic": "3.1",
		"goodLooking": "9.2",
		"wealthy": "5.7",
		"funny": "8.4",
		"goodHearted": "2.6",
		"intelligent": "4.2",
		"firstname": "Akeem",
		"compatibilityScore": "10"
	}
]}, 
{
	name:"zaid", 
	_id:"something", 
	data:[
 {
	 "creativity": "7.2",
	 "name": "Richard",
	 "_id": "9FD36909-F364-70DB-BBC0-FA0B1A5AF867",
	 "antiSocial": "6.9",
	 "narcissistic": "2.7",
	 "charismatic": "3.1",
	 "goodLooking": "6.8",
	 "wealthy": "3.5",
	 "funny": "3.6",
	 "goodHearted": "2.1",
	 "intelligent": "4.5",
	 "firstname": "August",
	 "compatibilityScore": "7.2"
 },
 {
	 "creativity": "2.5",
	 "name": "Thor",
	 "_id": "8FFBEB83-7101-D1EE-A37C-37217CF997DF",
	 "antiSocial": "5.9",
	 "narcissistic": "1.5",
	 "charismatic": "9.1",
	 "goodLooking": "6.6",
	 "wealthy": "3.4",
	 "funny": "7.9",
	 "goodHearted": "1.3",
	 "intelligent": "8.0",
	 "firstname": "Uriel",
	 "compatibilityScore": "2.9"
 },
 {
	 "creativity": "1.4",
	 "name": "Herman",
	 "_id": "101ACF5E-F3F2-4A49-1B74-5B04C470F91A",
	 "antiSocial": "5.5",
	 "narcissistic": "6.7",
	 "charismatic": "5.9",
	 "goodLooking": "8.4",
	 "wealthy": "1.4",
	 "funny": "7.6",
	 "goodHearted": "3.7",
	 "intelligent": "7.6",
	 "firstname": "Quamar",
	 "compatibilityScore": "7.0"
 },
 {
	 "creativity": "2.6",
	 "name": "Francis",
	 "_id": "9262CADC-8B27-91BA-E9D7-94EAF20404B8",
	 "antiSocial": "9.1",
	 "narcissistic": "1.3",
	 "charismatic": "3.2",
	 "goodLooking": "3.3",
	 "wealthy": "7.1",
	 "funny": "9.1",
	 "goodHearted": "1.7",
	 "intelligent": "5.7",
	 "firstname": "Gareth",
	 "compatibilityScore": "1.1"
 },
 {
	 "creativity": "9.6",
	 "name": "Castor",
	 "_id": "C7BD43F8-AA07-CEF6-3746-8B1A1D971EB9",
	 "antiSocial": "7.9",
	 "narcissistic": "4.6",
	 "charismatic": "2.0",
	 "goodLooking": "6.1",
	 "wealthy": "4.4",
	 "funny": "9.8",
	 "goodHearted": "7.8",
	 "intelligent": "3.6",
	 "firstname": "Paul",
	 "compatibilityScore": "5.0"
 },
 {
	 "creativity": "4.8",
	 "name": "Axel",
	 "_id": "56EDE1EA-50AA-8EE5-6159-03C8A2A78C18",
	 "antiSocial": "5.2",
	 "narcissistic": "9.4",
	 "charismatic": "9.3",
	 "goodLooking": "2.9",
	 "wealthy": "5.4",
	 "funny": "2.6",
	 "goodHearted": "2.4",
	 "intelligent": "7.4",
	 "firstname": "Hunter",
	 "compatibilityScore": "2.7"
 },
 {
	 "creativity": "3.2",
	 "name": "Shad",
	 "_id": "8FFE751C-A039-89E6-137E-5062A3609757",
	 "antiSocial": "6.5",
	 "narcissistic": "5.7",
	 "charismatic": "5.4",
	 "goodLooking": "3.1",
	 "wealthy": "3.2",
	 "funny": "1.5",
	 "goodHearted": "5.2",
	 "intelligent": "9.8",
	 "firstname": "Murphy",
	 "compatibilityScore": "2.2"
 },
 {
	 "creativity": "4.8",
	 "name": "Ignatius",
	 "_id": "2135503B-CC67-0EAE-37D8-E8E36E1ED6EC",
	 "antiSocial": "7.1",
	 "narcissistic": "1.8",
	 "charismatic": "1.8",
	 "goodLooking": "7.4",
	 "wealthy": "5.7",
	 "funny": "4.7",
	 "goodHearted": "5.1",
	 "intelligent": "1.1",
	 "firstname": "Merrill",
	 "compatibilityScore": "4.7"
 },
 {
	 "creativity": "3.7",
	 "name": "Armand",
	 "_id": "7695ABDD-1DCD-E813-7763-78E76C6462E2",
	 "antiSocial": "6.4",
	 "narcissistic": "7.3",
	 "charismatic": "9.0",
	 "goodLooking": "7.3",
	 "wealthy": "2.7",
	 "funny": "4.2",
	 "goodHearted": "9.8",
	 "intelligent": "3.2",
	 "firstname": "Xanthus",
	 "compatibilityScore": "7.3"
 },
 {
	 "creativity": "4.7",
	 "name": "Tanek",
	 "_id": "F9C4243A-2015-3B40-D2F2-4E11D7F9585B",
	 "antiSocial": "4.0",
	 "narcissistic": "4.2",
	 "charismatic": "1.9",
	 "goodLooking": "7.9",
	 "wealthy": "9.4",
	 "funny": "2.4",
	 "goodHearted": "9.9",
	 "intelligent": "8.3",
	 "firstname": "Plato",
	 "compatibilityScore": "6.1"
 },
 {
	 "creativity": "1.5",
	 "name": "Jonah",
	 "_id": "DF90F9F3-BF27-63EE-03D6-3AC4222ABE89",
	 "antiSocial": "2.2",
	 "narcissistic": "1.7",
	 "charismatic": "8.5",
	 "goodLooking": "6.8",
	 "wealthy": "9.6",
	 "funny": "8.8",
	 "goodHearted": "3.6",
	 "intelligent": "2.9",
	 "firstname": "Erich",
	 "compatibilityScore": "5.0"
 },
 {
	 "creativity": "8.4",
	 "name": "Ciaran",
	 "_id": "200ED9A6-B06B-190C-F496-019AB57C4E42",
	 "antiSocial": "6.6",
	 "narcissistic": "1.7",
	 "charismatic": "3.1",
	 "goodLooking": "1.8",
	 "wealthy": "6.7",
	 "funny": "5.0",
	 "goodHearted": "5.5",
	 "intelligent": "8.6",
	 "firstname": "Honorato",
	 "compatibilityScore": "6.2"
 },
 {
	 "creativity": "6.5",
	 "name": "Rudyard",
	 "_id": "104F68D5-C686-3ED5-B2D9-06B9F8F39AC1",
	 "antiSocial": "1.5",
	 "narcissistic": "9.5",
	 "charismatic": "2.5",
	 "goodLooking": "1.4",
	 "wealthy": "3.9",
	 "funny": "4.7",
	 "goodHearted": "2.1",
	 "intelligent": "2.3",
	 "firstname": "Declan",
	 "compatibilityScore": "4.6"
 },
 {
	 "creativity": "5.3",
	 "name": "Silas",
	 "_id": "8850E9A1-DEAB-9D24-9A75-8E589755571F",
	 "antiSocial": "6.2",
	 "narcissistic": "7.4",
	 "charismatic": "1.9",
	 "goodLooking": "8.1",
	 "wealthy": "3.6",
	 "funny": "5.2",
	 "goodHearted": "8.5",
	 "intelligent": "3.1",
	 "firstname": "Cullen",
	 "compatibilityScore": "6.8"
 },
 {
	 "creativity": "2.1",
	 "name": "Murphy",
	 "_id": "4F4036B2-366F-F23E-A9DF-A89E605F19B3",
	 "antiSocial": "3.4",
	 "narcissistic": "3.1",
	 "charismatic": "4.9",
	 "goodLooking": "2.2",
	 "wealthy": "7.8",
	 "funny": "9.2",
	 "goodHearted": "2.1",
	 "intelligent": "5.9",
	 "firstname": "Thomas",
	 "compatibilityScore": "4.8"
 },
 {
	 "creativity": "4.3",
	 "name": "Keane",
	 "_id": "B9BF92AC-40AD-90F3-3509-4895383DD502",
	 "antiSocial": "3.2",
	 "narcissistic": "9.3",
	 "charismatic": "3.8",
	 "goodLooking": "5.3",
	 "wealthy": "9.5",
	 "funny": "4.0",
	 "goodHearted": "3.2",
	 "intelligent": "2.2",
	 "firstname": "Jeremy",
	 "compatibilityScore": "7.3"
 },
 {
	 "creativity": "9.6",
	 "name": "Wang",
	 "_id": "418ADBE8-E0BF-0197-C26C-67B44EF33923",
	 "antiSocial": "2.8",
	 "narcissistic": "7.9",
	 "charismatic": "9.0",
	 "goodLooking": "2.5",
	 "wealthy": "4.6",
	 "funny": "6.1",
	 "goodHearted": "8.3",
	 "intelligent": "1.4",
	 "firstname": "Walter",
	 "compatibilityScore": "8.4"
 },
 {
	 "creativity": "5.0",
	 "name": "Brett",
	 "_id": "5FF54E07-67F1-63E8-F2ED-B68167F90AF3",
	 "antiSocial": "10",
	 "narcissistic": "7.1",
	 "charismatic": "5.2",
	 "goodLooking": "9.5",
	 "wealthy": "3.9",
	 "funny": "3.8",
	 "goodHearted": "3.3",
	 "intelligent": "7.4",
	 "firstname": "Kevin",
	 "compatibilityScore": "9.6"
 },
 {
	 "creativity": "8.7",
	 "name": "Blaze",
	 "_id": "9FE15288-1180-CB04-12FF-0F3EE945B9E4",
	 "antiSocial": "9.2",
	 "narcissistic": "2.6",
	 "charismatic": "3.0",
	 "goodLooking": "7.2",
	 "wealthy": "4.6",
	 "funny": "3.0",
	 "goodHearted": "2.8",
	 "intelligent": "1.3",
	 "firstname": "Alvin",
	 "compatibilityScore": "9.1"
 },
 {
	 "creativity": "5.9",
	 "name": "Hop",
	 "_id": "DA436FCA-CE0C-7830-73DA-E5779F73DCA0",
	 "antiSocial": "4.6",
	 "narcissistic": "6.7",
	 "charismatic": "7.2",
	 "goodLooking": "4.7",
	 "wealthy": "5.7",
	 "funny": "1.3",
	 "goodHearted": "9.9",
	 "intelligent": "8.7",
	 "firstname": "Ivor",
	 "compatibilityScore": "7.5"
 },
 {
	 "creativity": "8.5",
	 "name": "Axel",
	 "_id": "C1704E62-E80E-53AD-E521-DF363DC59056",
	 "antiSocial": "2.1",
	 "narcissistic": "9.3",
	 "charismatic": "4.9",
	 "goodLooking": "8.4",
	 "wealthy": "9.1",
	 "funny": "9.7",
	 "goodHearted": "7.4",
	 "intelligent": "6.9",
	 "firstname": "Christian",
	 "compatibilityScore": "9.1"
 },
 {
	 "creativity": "8.8",
	 "name": "Barry",
	 "_id": "684DF04A-940D-6D3D-DE6E-773B38D49C8B",
	 "antiSocial": "8.1",
	 "narcissistic": "1.7",
	 "charismatic": "1.1",
	 "goodLooking": "1.1",
	 "wealthy": "7.8",
	 "funny": "2.4",
	 "goodHearted": "4.8",
	 "intelligent": "3.0",
	 "firstname": "Uriah",
	 "compatibilityScore": "7.4"
 },
 {
	 "creativity": "7.1",
	 "name": "Perry",
	 "_id": "71760BD0-528E-8900-4721-0A7AEAC3893B",
	 "antiSocial": "7.8",
	 "narcissistic": "6.9",
	 "charismatic": "9.5",
	 "goodLooking": "2.9",
	 "wealthy": "7.0",
	 "funny": "3.0",
	 "goodHearted": "8.8",
	 "intelligent": "8.3",
	 "firstname": "Brian",
	 "compatibilityScore": "7.8"
 },
 {
	 "creativity": "5.1",
	 "name": "Kyle",
	 "_id": "F7DFBA82-3298-D912-45C1-ED9660CE11F4",
	 "antiSocial": "7.4",
	 "narcissistic": "7.0",
	 "charismatic": "1.4",
	 "goodLooking": "9.3",
	 "wealthy": "8.7",
	 "funny": "7.9",
	 "goodHearted": "9.7",
	 "intelligent": "9.1",
	 "firstname": "Emmanuel",
	 "compatibilityScore": "6.6"
 },
 {
	 "creativity": "9.3",
	 "name": "Zane",
	 "_id": "9339626E-9978-D3FB-6F11-82DD31F64ACE",
	 "antiSocial": "9.5",
	 "narcissistic": "9.0",
	 "charismatic": "9.4",
	 "goodLooking": "3.3",
	 "wealthy": "2.3",
	 "funny": "5.0",
	 "goodHearted": "9.1",
	 "intelligent": "6.5",
	 "firstname": "Kasper",
	 "compatibilityScore": "1.0"
 },
 {
	 "creativity": "7.4",
	 "name": "Stewart",
	 "_id": "7D8BC613-26BE-2F1E-53F4-DFBF4F141160",
	 "antiSocial": "3.5",
	 "narcissistic": "6.6",
	 "charismatic": "8.0",
	 "goodLooking": "10",
	 "wealthy": "6.6",
	 "funny": "2.3",
	 "goodHearted": "7.0",
	 "intelligent": "5.2",
	 "firstname": "George",
	 "compatibilityScore": "3.0"
 },
 {
	 "creativity": "2.1",
	 "name": "Dean",
	 "_id": "43275631-437C-FC6D-AEAD-7CAAA9707B8C",
	 "antiSocial": "9.0",
	 "narcissistic": "2.9",
	 "charismatic": "7.5",
	 "goodLooking": "6.2",
	 "wealthy": "6.3",
	 "funny": "3.6",
	 "goodHearted": "8.2",
	 "intelligent": "2.1",
	 "firstname": "Levi",
	 "compatibilityScore": "2.4"
 },
 {
	 "creativity": "4.0",
	 "name": "Lester",
	 "_id": "9F5C6E14-D102-BE9E-60AA-CDB4B5057969",
	 "antiSocial": "9.5",
	 "narcissistic": "2.4",
	 "charismatic": "2.7",
	 "goodLooking": "2.9",
	 "wealthy": "7.1",
	 "funny": "8.3",
	 "goodHearted": "2.0",
	 "intelligent": "7.9",
	 "firstname": "Ian",
	 "compatibilityScore": "5.8"
 },
 {
	 "creativity": "4.0",
	 "name": "Thaddeus",
	 "_id": "29348FB7-1C32-90E6-4EF5-9FB3CCEBD83F",
	 "antiSocial": "1.7",
	 "narcissistic": "3.7",
	 "charismatic": "8.0",
	 "goodLooking": "2.5",
	 "wealthy": "8.7",
	 "funny": "2.7",
	 "goodHearted": "8.6",
	 "intelligent": "2.9",
	 "firstname": "Blaze",
	 "compatibilityScore": "9.2"
 },
 {
	 "creativity": "3.2",
	 "name": "Brett",
	 "_id": "59DB2573-0D1D-FCC0-4603-EB296CF115D8",
	 "antiSocial": "1.8",
	 "narcissistic": "9.9",
	 "charismatic": "7.2",
	 "goodLooking": "1.6",
	 "wealthy": "5.1",
	 "funny": "7.6",
	 "goodHearted": "5.0",
	 "intelligent": "5.1",
	 "firstname": "Aristotle",
	 "compatibilityScore": "9.3"
 },
 {
	 "creativity": "6.4",
	 "name": "Burke",
	 "_id": "B47F6CAB-CF15-D5A4-2E09-860528E4A1B1",
	 "antiSocial": "4.9",
	 "narcissistic": "6.9",
	 "charismatic": "1.2",
	 "goodLooking": "9.1",
	 "wealthy": "7.8",
	 "funny": "6.7",
	 "goodHearted": "4.1",
	 "intelligent": "2.4",
	 "firstname": "Dane",
	 "compatibilityScore": "5.2"
 },
 {
	 "creativity": "6.4",
	 "name": "Fulton",
	 "_id": "08578E29-E3AC-B76D-FD38-2D51FFAB8232",
	 "antiSocial": "3.4",
	 "narcissistic": "1.8",
	 "charismatic": "9.5",
	 "goodLooking": "1.2",
	 "wealthy": "1.6",
	 "funny": "3.5",
	 "goodHearted": "2.6",
	 "intelligent": "3.2",
	 "firstname": "Vance",
	 "compatibilityScore": "9.1"
 },
 {
	 "creativity": "4.1",
	 "name": "Jameson",
	 "_id": "50CB2CAF-32BA-2C90-3A8C-E24492F21A5B",
	 "antiSocial": "2.6",
	 "narcissistic": "9.0",
	 "charismatic": "4.8",
	 "goodLooking": "7.0",
	 "wealthy": "4.7",
	 "funny": "3.1",
	 "goodHearted": "8.2",
	 "intelligent": "1.9",
	 "firstname": "Tarik",
	 "compatibilityScore": "4.2"
 },
 {
	 "creativity": "8.0",
	 "name": "Basil",
	 "_id": "7C52BD5B-E123-D673-0143-8BF7160DB873",
	 "antiSocial": "8.3",
	 "narcissistic": "8.3",
	 "charismatic": "1.1",
	 "goodLooking": "2.8",
	 "wealthy": "9.5",
	 "funny": "4.6",
	 "goodHearted": "4.7",
	 "intelligent": "7.9",
	 "firstname": "Hu",
	 "compatibilityScore": "7.2"
 },
 {
	 "creativity": "7.8",
	 "name": "Jeremy",
	 "_id": "8DB3B607-7D93-C593-88B5-0CBD86992C2C",
	 "antiSocial": "2.2",
	 "narcissistic": "5.1",
	 "charismatic": "6.4",
	 "goodLooking": "3.8",
	 "wealthy": "10",
	 "funny": "4.2",
	 "goodHearted": "2.9",
	 "intelligent": "1.2",
	 "firstname": "Slade",
	 "compatibilityScore": "8.1"
 },
 {
	 "creativity": "4.0",
	 "name": "Rahim",
	 "_id": "30DA0529-0B33-D650-2FF0-D0368082E85A",
	 "antiSocial": "5.4",
	 "narcissistic": "8.6",
	 "charismatic": "4.8",
	 "goodLooking": "7.8",
	 "wealthy": "9.8",
	 "funny": "1.8",
	 "goodHearted": "3.3",
	 "intelligent": "6.1",
	 "firstname": "Damon",
	 "compatibilityScore": "9.2"
 },
 {
	 "creativity": "7.4",
	 "name": "Amal",
	 "_id": "44353358-E159-C42B-EDC2-4898E0238E11",
	 "antiSocial": "7.6",
	 "narcissistic": "7.7",
	 "charismatic": "1.3",
	 "goodLooking": "6.7",
	 "wealthy": "7.3",
	 "funny": "2.6",
	 "goodHearted": "9.8",
	 "intelligent": "9.9",
	 "firstname": "Tyrone",
	 "compatibilityScore": "5.8"
 },
 {
	 "creativity": "1.7",
	 "name": "Devin",
	 "_id": "A01EEA5E-EF69-2ECA-6AAD-4E9D0E8633E2",
	 "antiSocial": "7.6",
	 "narcissistic": "8.5",
	 "charismatic": "7.6",
	 "goodLooking": "5.7",
	 "wealthy": "5.4",
	 "funny": "8.4",
	 "goodHearted": "1.8",
	 "intelligent": "1.1",
	 "firstname": "Wade",
	 "compatibilityScore": "2.5"
 },
 {
	 "creativity": "2.6",
	 "name": "Luke",
	 "_id": "8AECAAE2-275C-D011-DBE2-41643FDA7E7E",
	 "antiSocial": "1.2",
	 "narcissistic": "4.3",
	 "charismatic": "7.0",
	 "goodLooking": "7.0",
	 "wealthy": "2.4",
	 "funny": "9.1",
	 "goodHearted": "6.8",
	 "intelligent": "3.0",
	 "firstname": "Lance",
	 "compatibilityScore": "3.1"
 },
 {
	 "creativity": "5.1",
	 "name": "Vladimir",
	 "_id": "AD64ECD0-8C50-F644-D7A7-BC091396191F",
	 "antiSocial": "3.6",
	 "narcissistic": "5.5",
	 "charismatic": "3.0",
	 "goodLooking": "5.0",
	 "wealthy": "6.2",
	 "funny": "6.2",
	 "goodHearted": "2.4",
	 "intelligent": "8.2",
	 "firstname": "Ivor",
	 "compatibilityScore": "1.1"
 },
 {
	 "creativity": "6.9",
	 "name": "Mason",
	 "_id": "B9FA84D7-C38D-71AB-E165-6728B76D17DE",
	 "antiSocial": "1.7",
	 "narcissistic": "2.0",
	 "charismatic": "7.7",
	 "goodLooking": "2.8",
	 "wealthy": "8.2",
	 "funny": "3.3",
	 "goodHearted": "5.6",
	 "intelligent": "4.1",
	 "firstname": "Dale",
	 "compatibilityScore": "2.8"
 },
 {
	 "creativity": "10",
	 "name": "Yoshio",
	 "_id": "5402412B-534C-3A26-BB18-B17B92001CA4",
	 "antiSocial": "2.3",
	 "narcissistic": "4.9",
	 "charismatic": "4.1",
	 "goodLooking": "8.3",
	 "wealthy": "7.7",
	 "funny": "6.5",
	 "goodHearted": "10",
	 "intelligent": "2.6",
	 "firstname": "Rafael",
	 "compatibilityScore": "3.5"
 },
 {
	 "creativity": "7.1",
	 "name": "Ira",
	 "_id": "331C60FC-2D34-9C4D-6A40-7BDFE15FC83E",
	 "antiSocial": "3.0",
	 "narcissistic": "5.5",
	 "charismatic": "3.5",
	 "goodLooking": "2.1",
	 "wealthy": "8.1",
	 "funny": "7.9",
	 "goodHearted": "3.6",
	 "intelligent": "6.3",
	 "firstname": "Zane",
	 "compatibilityScore": "8.0"
 },
 {
	 "creativity": "7.1",
	 "name": "Hoyt",
	 "_id": "7E2B8D46-3D69-1E4B-0A1E-87289EE4CFF5",
	 "antiSocial": "2.0",
	 "narcissistic": "4.4",
	 "charismatic": "7.1",
	 "goodLooking": "8.6",
	 "wealthy": "2.1",
	 "funny": "5.4",
	 "goodHearted": "4.5",
	 "intelligent": "3.0",
	 "firstname": "Dylan",
	 "compatibilityScore": "7.9"
 },
 {
	 "creativity": "1.1",
	 "name": "Ignatius",
	 "_id": "12C1F5E1-DE18-AB60-FB30-9BB76833E4AC",
	 "antiSocial": "4.5",
	 "narcissistic": "6.0",
	 "charismatic": "3.6",
	 "goodLooking": "9.2",
	 "wealthy": "5.9",
	 "funny": "6.4",
	 "goodHearted": "4.9",
	 "intelligent": "8.6",
	 "firstname": "Hayes",
	 "compatibilityScore": "2.9"
 },
 {
	 "creativity": "1.9",
	 "name": "Kuame",
	 "_id": "0EF42165-C9E3-BBB8-E489-9F9D8210A06F",
	 "antiSocial": "3.7",
	 "narcissistic": "9.4",
	 "charismatic": "6.8",
	 "goodLooking": "9.4",
	 "wealthy": "5.9",
	 "funny": "9.6",
	 "goodHearted": "7.8",
	 "intelligent": "1.0",
	 "firstname": "Sebastian",
	 "compatibilityScore": "6.0"
 },
 {
	 "creativity": "2.7",
	 "name": "Xenos",
	 "_id": "E77202B5-8561-83E1-CEBF-6C36FFFD2980",
	 "antiSocial": "5.2",
	 "narcissistic": "6.4",
	 "charismatic": "6.4",
	 "goodLooking": "3.5",
	 "wealthy": "6.9",
	 "funny": "6.4",
	 "goodHearted": "4.3",
	 "intelligent": "6.6",
	 "firstname": "Malik",
	 "compatibilityScore": "6.8"
 },
 {
	 "creativity": "9.7",
	 "name": "Demetrius",
	 "_id": "F1BEB79B-A216-556B-A3C1-1477F8676915",
	 "antiSocial": "4.8",
	 "narcissistic": "2.3",
	 "charismatic": "2.6",
	 "goodLooking": "6.5",
	 "wealthy": "9.6",
	 "funny": "2.2",
	 "goodHearted": "1.8",
	 "intelligent": "9.5",
	 "firstname": "Wang",
	 "compatibilityScore": "9.5"
 },
 {
	 "creativity": "4.8",
	 "name": "Reese",
	 "_id": "1A1D4E46-3C7B-9ED0-39F6-612AF3F62573",
	 "antiSocial": "8.2",
	 "narcissistic": "6.8",
	 "charismatic": "4.5",
	 "goodLooking": "6.9",
	 "wealthy": "7.3",
	 "funny": "1.4",
	 "goodHearted": "3.7",
	 "intelligent": "3.4",
	 "firstname": "Castor",
	 "compatibilityScore": "1.8"
 },
 {
	 "creativity": "8.7",
	 "name": "Brent",
	 "_id": "BCEFC04C-42D3-7FC9-034C-C9E9A2C42EB4",
	 "antiSocial": "4.4",
	 "narcissistic": "1.2",
	 "charismatic": "6.0",
	 "goodLooking": "1.6",
	 "wealthy": "5.2",
	 "funny": "2.5",
	 "goodHearted": "2.1",
	 "intelligent": "7.7",
	 "firstname": "Isaac",
	 "compatibilityScore": "8.6"
 },
 {
	 "creativity": "1.0",
	 "name": "Calvin",
	 "_id": "45D8DB25-10A8-A1D9-B840-230CB5E75B22",
	 "antiSocial": "1.1",
	 "narcissistic": "2.0",
	 "charismatic": "5.8",
	 "goodLooking": "7.3",
	 "wealthy": "7.0",
	 "funny": "3.0",
	 "goodHearted": "4.3",
	 "intelligent": "8.9",
	 "firstname": "Deacon",
	 "compatibilityScore": "4.4"
 },
 {
	 "creativity": "6.5",
	 "name": "Avram",
	 "_id": "6FF0E55B-3FF6-F3D4-EAA9-72E104EF5BA9",
	 "antiSocial": "8.9",
	 "narcissistic": "5.2",
	 "charismatic": "9.6",
	 "goodLooking": "10",
	 "wealthy": "4.8",
	 "funny": "4.6",
	 "goodHearted": "4.3",
	 "intelligent": "4.0",
	 "firstname": "Judah",
	 "compatibilityScore": "7.6"
 },
 {
	 "creativity": "6.6",
	 "name": "Ryder",
	 "_id": "E7D67148-C3B5-EA5C-4B55-45DDEBF64D9F",
	 "antiSocial": "9.4",
	 "narcissistic": "8.0",
	 "charismatic": "2.1",
	 "goodLooking": "6.4",
	 "wealthy": "4.9",
	 "funny": "4.3",
	 "goodHearted": "2.4",
	 "intelligent": "3.8",
	 "firstname": "Harper",
	 "compatibilityScore": "6.3"
 },
 {
	 "creativity": "1.5",
	 "name": "Ahmed",
	 "_id": "F7E8FE75-60C1-FF7A-096C-7CA49A81EC37",
	 "antiSocial": "7.3",
	 "narcissistic": "4.6",
	 "charismatic": "8.4",
	 "goodLooking": "5.9",
	 "wealthy": "6.4",
	 "funny": "3.4",
	 "goodHearted": "1.2",
	 "intelligent": "6.0",
	 "firstname": "Vance",
	 "compatibilityScore": "7.0"
 },
 {
	 "creativity": "1.4",
	 "name": "Patrick",
	 "_id": "288646FB-DC64-01A9-1C50-E04D09830AEA",
	 "antiSocial": "5.4",
	 "narcissistic": "7.1",
	 "charismatic": "5.8",
	 "goodLooking": "9.9",
	 "wealthy": "10",
	 "funny": "5.6",
	 "goodHearted": "5.2",
	 "intelligent": "4.9",
	 "firstname": "Jesse",
	 "compatibilityScore": "9.8"
 },
 {
	 "creativity": "2.3",
	 "name": "Abbot",
	 "_id": "A3713B8E-5640-36A1-81FB-72A45C1A6146",
	 "antiSocial": "2.3",
	 "narcissistic": "2.3",
	 "charismatic": "2.7",
	 "goodLooking": "8.5",
	 "wealthy": "7.2",
	 "funny": "6.2",
	 "goodHearted": "3.9",
	 "intelligent": "8.0",
	 "firstname": "George",
	 "compatibilityScore": "4.6"
 },
 {
	 "creativity": "3.7",
	 "name": "Dean",
	 "_id": "95C8F376-68ED-F6E9-9260-09B4E38E672F",
	 "antiSocial": "5.3",
	 "narcissistic": "2.6",
	 "charismatic": "9.5",
	 "goodLooking": "3.2",
	 "wealthy": "1.3",
	 "funny": "4.5",
	 "goodHearted": "5.1",
	 "intelligent": "3.9",
	 "firstname": "Tyler",
	 "compatibilityScore": "9.1"
 },
 {
	 "creativity": "5.6",
	 "name": "Lyle",
	 "_id": "F0FD22AF-F723-7968-5562-ED73A1ACAC83",
	 "antiSocial": "8.7",
	 "narcissistic": "7.8",
	 "charismatic": "6.2",
	 "goodLooking": "7.1",
	 "wealthy": "6.9",
	 "funny": "7.9",
	 "goodHearted": "8.9",
	 "intelligent": "6.2",
	 "firstname": "Brendan",
	 "compatibilityScore": "9.0"
 },
 {
	 "creativity": "5.7",
	 "name": "Preston",
	 "_id": "CF10BD11-004D-0FE9-2759-72DEB74DA253",
	 "antiSocial": "5.4",
	 "narcissistic": "2.5",
	 "charismatic": "2.5",
	 "goodLooking": "4.3",
	 "wealthy": "10",
	 "funny": "2.1",
	 "goodHearted": "9.9",
	 "intelligent": "2.1",
	 "firstname": "Brody",
	 "compatibilityScore": "10"
 },
 {
	 "creativity": "8.4",
	 "name": "Mannix",
	 "_id": "8DCAD606-A580-9F36-AB15-EC5EAF491670",
	 "antiSocial": "5.4",
	 "narcissistic": "2.6",
	 "charismatic": "7.6",
	 "goodLooking": "9.3",
	 "wealthy": "9.9",
	 "funny": "2.0",
	 "goodHearted": "6.8",
	 "intelligent": "2.4",
	 "firstname": "Moses",
	 "compatibilityScore": "5.8"
 },
 {
	 "creativity": "6.0",
	 "name": "Kenyon",
	 "_id": "CE2244C0-7DF2-B4AD-52B2-444D3530AB8F",
	 "antiSocial": "1.5",
	 "narcissistic": "2.0",
	 "charismatic": "3.3",
	 "goodLooking": "3.4",
	 "wealthy": "5.3",
	 "funny": "5.8",
	 "goodHearted": "7.5",
	 "intelligent": "5.8",
	 "firstname": "Palmer",
	 "compatibilityScore": "3.6"
 },
 {
	 "creativity": "9.6",
	 "name": "Benedict",
	 "_id": "9BA2964B-962D-916B-8F42-D618F6BB5D96",
	 "antiSocial": "6.5",
	 "narcissistic": "9.9",
	 "charismatic": "8.8",
	 "goodLooking": "4.8",
	 "wealthy": "6.9",
	 "funny": "7.3",
	 "goodHearted": "3.6",
	 "intelligent": "3.6",
	 "firstname": "Mason",
	 "compatibilityScore": "2.4"
 },
 {
	 "creativity": "2.6",
	 "name": "Ronan",
	 "_id": "405E7D60-251F-9768-6522-D79EC7026BBE",
	 "antiSocial": "7.4",
	 "narcissistic": "5.4",
	 "charismatic": "3.3",
	 "goodLooking": "2.7",
	 "wealthy": "6.1",
	 "funny": "2.6",
	 "goodHearted": "2.4",
	 "intelligent": "9.5",
	 "firstname": "Devin",
	 "compatibilityScore": "1.2"
 },
 {
	 "creativity": "8.7",
	 "name": "Jack",
	 "_id": "26424527-43CE-8DB9-2CCD-9F0D550D8384",
	 "antiSocial": "5.8",
	 "narcissistic": "8.4",
	 "charismatic": "4.0",
	 "goodLooking": "6.0",
	 "wealthy": "8.6",
	 "funny": "7.6",
	 "goodHearted": "7.1",
	 "intelligent": "6.6",
	 "firstname": "Gareth",
	 "compatibilityScore": "7.8"
 },
 {
	 "creativity": "10",
	 "name": "Reece",
	 "_id": "23607060-975A-6EB8-1496-B6DD526D5B16",
	 "antiSocial": "9.3",
	 "narcissistic": "3.1",
	 "charismatic": "5.4",
	 "goodLooking": "2.6",
	 "wealthy": "9.7",
	 "funny": "8.3",
	 "goodHearted": "4.6",
	 "intelligent": "3.3",
	 "firstname": "Harper",
	 "compatibilityScore": "3.1"
 },
 {
	 "creativity": "8.3",
	 "name": "Adam",
	 "_id": "B906102D-5E7D-A53F-244E-14F045EE94E2",
	 "antiSocial": "8.7",
	 "narcissistic": "8.0",
	 "charismatic": "8.0",
	 "goodLooking": "1.1",
	 "wealthy": "8.0",
	 "funny": "7.8",
	 "goodHearted": "8.3",
	 "intelligent": "8.4",
	 "firstname": "Alvin",
	 "compatibilityScore": "7.0"
 },
 {
	 "creativity": "5.1",
	 "name": "Callum",
	 "_id": "E8AD4FA3-4E4F-B106-7084-06544F0C5C70",
	 "antiSocial": "2.1",
	 "narcissistic": "1.7",
	 "charismatic": "1.4",
	 "goodLooking": "8.2",
	 "wealthy": "8.1",
	 "funny": "3.5",
	 "goodHearted": "1.2",
	 "intelligent": "6.4",
	 "firstname": "Alden",
	 "compatibilityScore": "4.9"
 },
 {
	 "creativity": "4.8",
	 "name": "Chancellor",
	 "_id": "3D656D9B-729F-1EE6-2E6B-A50E221C632B",
	 "antiSocial": "5.5",
	 "narcissistic": "7.9",
	 "charismatic": "2.0",
	 "goodLooking": "4.5",
	 "wealthy": "4.5",
	 "funny": "8.4",
	 "goodHearted": "2.3",
	 "intelligent": "1.2",
	 "firstname": "Adam",
	 "compatibilityScore": "3.3"
 },
 {
	 "creativity": "8.9",
	 "name": "Nash",
	 "_id": "1B90F19B-6AD7-5270-A310-C55A2F2EBB41",
	 "antiSocial": "7.9",
	 "narcissistic": "9.2",
	 "charismatic": "6.4",
	 "goodLooking": "3.3",
	 "wealthy": "5.9",
	 "funny": "9.7",
	 "goodHearted": "2.1",
	 "intelligent": "5.9",
	 "firstname": "Alexander",
	 "compatibilityScore": "7.2"
 },
 {
	 "creativity": "1.9",
	 "name": "Troy",
	 "_id": "DA65AD7C-8613-FFB0-885D-4F0A83F86E0D",
	 "antiSocial": "1.1",
	 "narcissistic": "4.7",
	 "charismatic": "2.6",
	 "goodLooking": "6.2",
	 "wealthy": "8.9",
	 "funny": "6.9",
	 "goodHearted": "1.9",
	 "intelligent": "8.1",
	 "firstname": "Colton",
	 "compatibilityScore": "5.5"
 },
 {
	 "creativity": "8.6",
	 "name": "Tanek",
	 "_id": "486A7022-E165-577E-65EE-F76CA1A4A12B",
	 "antiSocial": "3.6",
	 "narcissistic": "8.6",
	 "charismatic": "1.1",
	 "goodLooking": "3.6",
	 "wealthy": "9.6",
	 "funny": "2.8",
	 "goodHearted": "1.9",
	 "intelligent": "2.4",
	 "firstname": "Hoyt",
	 "compatibilityScore": "7.8"
 },
 {
	 "creativity": "4.6",
	 "name": "Igor",
	 "_id": "ADA2F7B0-027B-103E-4067-83932E00EA08",
	 "antiSocial": "6.5",
	 "narcissistic": "4.5",
	 "charismatic": "1.2",
	 "goodLooking": "1.5",
	 "wealthy": "9.0",
	 "funny": "3.2",
	 "goodHearted": "2.4",
	 "intelligent": "4.4",
	 "firstname": "Tyrone",
	 "compatibilityScore": "8.1"
 },
 {
	 "creativity": "6.2",
	 "name": "Tad",
	 "_id": "705DFEDD-C61C-3CB4-0B79-8A2E709DA954",
	 "antiSocial": "9.3",
	 "narcissistic": "4.3",
	 "charismatic": "2.0",
	 "goodLooking": "2.4",
	 "wealthy": "1.8",
	 "funny": "4.3",
	 "goodHearted": "6.5",
	 "intelligent": "9.4",
	 "firstname": "Colin",
	 "compatibilityScore": "1.4"
 },
 {
	 "creativity": "5.5",
	 "name": "Brendan",
	 "_id": "C9633A04-C84C-8ABC-5445-E7BC6F8CFB1D",
	 "antiSocial": "6.2",
	 "narcissistic": "5.0",
	 "charismatic": "7.1",
	 "goodLooking": "3.2",
	 "wealthy": "2.8",
	 "funny": "4.7",
	 "goodHearted": "5.8",
	 "intelligent": "2.4",
	 "firstname": "Yuli",
	 "compatibilityScore": "1.8"
 },
 {
	 "creativity": "9.9",
	 "name": "Trevor",
	 "_id": "0A2E3437-13B6-7C20-C25E-26B0F72E000E",
	 "antiSocial": "8.5",
	 "narcissistic": "9.9",
	 "charismatic": "7.7",
	 "goodLooking": "7.1",
	 "wealthy": "2.3",
	 "funny": "5.1",
	 "goodHearted": "9.0",
	 "intelligent": "1.4",
	 "firstname": "Ferdinand",
	 "compatibilityScore": "7.0"
 },
 {
	 "creativity": "9.4",
	 "name": "Theodore",
	 "_id": "E1321C4C-AE07-4CA6-71D8-C959A8FF54BC",
	 "antiSocial": "5.5",
	 "narcissistic": "7.2",
	 "charismatic": "1.0",
	 "goodLooking": "6.2",
	 "wealthy": "7.0",
	 "funny": "9.4",
	 "goodHearted": "7.8",
	 "intelligent": "3.7",
	 "firstname": "Tobias",
	 "compatibilityScore": "10"
 },
 {
	 "creativity": "8.4",
	 "name": "Jordan",
	 "_id": "B66B32CE-F40E-F461-6BA6-8F0049056AF3",
	 "antiSocial": "8.9",
	 "narcissistic": "8.0",
	 "charismatic": "5.7",
	 "goodLooking": "3.6",
	 "wealthy": "3.6",
	 "funny": "8.5",
	 "goodHearted": "4.1",
	 "intelligent": "4.0",
	 "firstname": "Eric",
	 "compatibilityScore": "1.9"
 },
 {
	 "creativity": "5.3",
	 "name": "Vincent",
	 "_id": "73F9A45D-2753-0107-ECDD-5C0B333C98CA",
	 "antiSocial": "6.9",
	 "narcissistic": "8.6",
	 "charismatic": "5.0",
	 "goodLooking": "8.5",
	 "wealthy": "3.7",
	 "funny": "8.2",
	 "goodHearted": "7.9",
	 "intelligent": "2.2",
	 "firstname": "Nasim",
	 "compatibilityScore": "1.8"
 },
 {
	 "creativity": "5.8",
	 "name": "Troy",
	 "_id": "7D1C0737-47DE-0B50-F0B3-6E54460D7404",
	 "antiSocial": "6.0",
	 "narcissistic": "4.3",
	 "charismatic": "7.3",
	 "goodLooking": "1.7",
	 "wealthy": "4.5",
	 "funny": "9.8",
	 "goodHearted": "1.2",
	 "intelligent": "6.7",
	 "firstname": "Austin",
	 "compatibilityScore": "3.9"
 },
 {
	 "creativity": "8.0",
	 "name": "Warren",
	 "_id": "63EDCCB2-09CA-AA7E-B1C2-CFAF7CB6BB2B",
	 "antiSocial": "9.7",
	 "narcissistic": "1.9",
	 "charismatic": "7.6",
	 "goodLooking": "1.2",
	 "wealthy": "1.5",
	 "funny": "5.0",
	 "goodHearted": "2.5",
	 "intelligent": "2.7",
	 "firstname": "Rudyard",
	 "compatibilityScore": "1.6"
 },
 {
	 "creativity": "1.6",
	 "name": "Theodore",
	 "_id": "1FA91DED-FE28-C7A8-4D4E-560F6661FF4C",
	 "antiSocial": "4.0",
	 "narcissistic": "5.7",
	 "charismatic": "1.7",
	 "goodLooking": "7.5",
	 "wealthy": "4.1",
	 "funny": "5.4",
	 "goodHearted": "4.5",
	 "intelligent": "8.5",
	 "firstname": "Brock",
	 "compatibilityScore": "9.6"
 },
 {
	 "creativity": "8.0",
	 "name": "Cedric",
	 "_id": "83849D59-144F-7880-3CA9-72E260437268",
	 "antiSocial": "2.6",
	 "narcissistic": "8.6",
	 "charismatic": "6.2",
	 "goodLooking": "9.5",
	 "wealthy": "8.6",
	 "funny": "7.7",
	 "goodHearted": "2.7",
	 "intelligent": "2.9",
	 "firstname": "Lyle",
	 "compatibilityScore": "7.3"
 },
 {
	 "creativity": "3.6",
	 "name": "Leonard",
	 "_id": "559B6CE5-5C0F-B7CF-19FC-B28701686193",
	 "antiSocial": "7.6",
	 "narcissistic": "7.2",
	 "charismatic": "7.8",
	 "goodLooking": "4.8",
	 "wealthy": "8.2",
	 "funny": "6.8",
	 "goodHearted": "4.3",
	 "intelligent": "9.3",
	 "firstname": "Ryan",
	 "compatibilityScore": "6.4"
 },
 {
	 "creativity": "4.8",
	 "name": "Knox",
	 "_id": "BD09CF19-1E82-A331-0CDA-AA5B4281B982",
	 "antiSocial": "6.9",
	 "narcissistic": "4.8",
	 "charismatic": "3.6",
	 "goodLooking": "4.8",
	 "wealthy": "8.1",
	 "funny": "1.0",
	 "goodHearted": "3.9",
	 "intelligent": "1.9",
	 "firstname": "Tarik",
	 "compatibilityScore": "9.8"
 },
 {
	 "creativity": "7.9",
	 "name": "George",
	 "_id": "00F654F2-8231-539E-EA6C-E1C238CF74C1",
	 "antiSocial": "8.3",
	 "narcissistic": "9.3",
	 "charismatic": "5.3",
	 "goodLooking": "4.0",
	 "wealthy": "2.6",
	 "funny": "3.4",
	 "goodHearted": "2.1",
	 "intelligent": "7.4",
	 "firstname": "Jermaine",
	 "compatibilityScore": "2.3"
 },
 {
	 "creativity": "9.9",
	 "name": "Driscoll",
	 "_id": "3A315720-B2CF-C624-6B73-0FD3E51A574D",
	 "antiSocial": "4.7",
	 "narcissistic": "1.9",
	 "charismatic": "9.7",
	 "goodLooking": "4.8",
	 "wealthy": "3.8",
	 "funny": "5.2",
	 "goodHearted": "6.1",
	 "intelligent": "7.7",
	 "firstname": "Asher",
	 "compatibilityScore": "7.2"
 },
 {
	 "creativity": "5.2",
	 "name": "Noble",
	 "_id": "B35DCFD7-32C7-5AF9-DA8E-49162E8D368B",
	 "antiSocial": "7.3",
	 "narcissistic": "7.7",
	 "charismatic": "4.8",
	 "goodLooking": "5.4",
	 "wealthy": "5.7",
	 "funny": "6.1",
	 "goodHearted": "9.6",
	 "intelligent": "10",
	 "firstname": "Ivor",
	 "compatibilityScore": "8.9"
 },
 {
	 "creativity": "4.4",
	 "name": "Maxwell",
	 "_id": "7EF1C0A1-8B15-5B87-F25C-1DE0739CA4B3",
	 "antiSocial": "10",
	 "narcissistic": "4.8",
	 "charismatic": "1.4",
	 "goodLooking": "5.3",
	 "wealthy": "1.2",
	 "funny": "1.9",
	 "goodHearted": "6.4",
	 "intelligent": "4.5",
	 "firstname": "Mannix",
	 "compatibilityScore": "9.1"
 },
 {
	 "creativity": "2.7",
	 "name": "Trevor",
	 "_id": "3CAA9B95-5D8E-B3FF-A2C3-3FFEC3423876",
	 "antiSocial": "7.6",
	 "narcissistic": "1.5",
	 "charismatic": "1.4",
	 "goodLooking": "6.4",
	 "wealthy": "5.2",
	 "funny": "4.2",
	 "goodHearted": "7.9",
	 "intelligent": "1.3",
	 "firstname": "Judah",
	 "compatibilityScore": "7.5"
 },
 {
	 "creativity": "5.0",
	 "name": "Armand",
	 "_id": "CBAA9F22-8322-740D-D65B-27012656469A",
	 "antiSocial": "2.2",
	 "narcissistic": "4.8",
	 "charismatic": "3.2",
	 "goodLooking": "7.7",
	 "wealthy": "6.5",
	 "funny": "3.3",
	 "goodHearted": "3.4",
	 "intelligent": "3.0",
	 "firstname": "Cedric",
	 "compatibilityScore": "7.3"
 },
 {
	 "creativity": "8.8",
	 "name": "Eric",
	 "_id": "C6A67C06-8083-CFFF-51A2-67205F539D7A",
	 "antiSocial": "5.8",
	 "narcissistic": "8.8",
	 "charismatic": "4.8",
	 "goodLooking": "9.7",
	 "wealthy": "2.7",
	 "funny": "8.2",
	 "goodHearted": "8.0",
	 "intelligent": "2.8",
	 "firstname": "Kenneth",
	 "compatibilityScore": "3.6"
 },
 {
	 "creativity": "5.9",
	 "name": "Ronan",
	 "_id": "A7EE2B18-A857-52A3-A8E9-287AA9C72729",
	 "antiSocial": "9.8",
	 "narcissistic": "6.2",
	 "charismatic": "5.7",
	 "goodLooking": "1.6",
	 "wealthy": "5.1",
	 "funny": "6.2",
	 "goodHearted": "3.3",
	 "intelligent": "3.5",
	 "firstname": "Yuli",
	 "compatibilityScore": "5.1"
 },
 {
	 "creativity": "5.2",
	 "name": "Amir",
	 "_id": "30C200B3-56C4-0E24-57AA-AB571DFA957B",
	 "antiSocial": "3.7",
	 "narcissistic": "5.4",
	 "charismatic": "5.2",
	 "goodLooking": "2.5",
	 "wealthy": "8.8",
	 "funny": "2.0",
	 "goodHearted": "3.0",
	 "intelligent": "1.6",
	 "firstname": "Nathaniel",
	 "compatibilityScore": "9.9"
 },
 {
	 "creativity": "5.8",
	 "name": "Lester",
	 "_id": "8F4AB8C9-9C05-8053-644A-F976E5AF294A",
	 "antiSocial": "2.9",
	 "narcissistic": "7.1",
	 "charismatic": "9.5",
	 "goodLooking": "9.5",
	 "wealthy": "6.4",
	 "funny": "2.7",
	 "goodHearted": "8.2",
	 "intelligent": "1.6",
	 "firstname": "Quamar",
	 "compatibilityScore": "4.2"
 },
 {
	 "creativity": "3.1",
	 "name": "Griffith",
	 "_id": "EE6F8A49-CEB8-5234-2722-3E830004C982",
	 "antiSocial": "6.0",
	 "narcissistic": "1.4",
	 "charismatic": "9.6",
	 "goodLooking": "1.4",
	 "wealthy": "6.6",
	 "funny": "8.4",
	 "goodHearted": "8.5",
	 "intelligent": "1.4",
	 "firstname": "Reese",
	 "compatibilityScore": "8.5"
 },
 {
	 "creativity": "8.1",
	 "name": "Erasmus",
	 "_id": "A1581A03-02B1-F3FF-6DD6-BFD4834DEF86",
	 "antiSocial": "2.9",
	 "narcissistic": "6.3",
	 "charismatic": "2.9",
	 "goodLooking": "8.0",
	 "wealthy": "4.9",
	 "funny": "6.1",
	 "goodHearted": "3.9",
	 "intelligent": "4.0",
	 "firstname": "Lester",
	 "compatibilityScore": "4.4"
 },
 {
	 "creativity": "4.9",
	 "name": "Mohammad",
	 "_id": "6195766D-2ED9-BDB3-A22B-191B6B523C02",
	 "antiSocial": "4.3",
	 "narcissistic": "8.8",
	 "charismatic": "6.2",
	 "goodLooking": "9.0",
	 "wealthy": "2.4",
	 "funny": "3.3",
	 "goodHearted": "3.2",
	 "intelligent": "2.2",
	 "firstname": "Uriel",
	 "compatibilityScore": "9.4"
 },
 {
	 "creativity": "5.5",
	 "name": "Burton",
	 "_id": "0DF0A730-3998-E0F1-6E39-8BA3739111C6",
	 "antiSocial": "1.3",
	 "narcissistic": "1.3",
	 "charismatic": "4.4",
	 "goodLooking": "9.2",
	 "wealthy": "9.7",
	 "funny": "5.2",
	 "goodHearted": "7.0",
	 "intelligent": "6.8",
	 "firstname": "Ethan",
	 "compatibilityScore": "4.7"
 },
 {
	 "creativity": "4.9",
	 "name": "Dante",
	 "_id": "B82EF295-24D7-9177-8616-B7F44B508524",
	 "antiSocial": "6.0",
	 "narcissistic": "6.2",
	 "charismatic": "4.8",
	 "goodLooking": "6.1",
	 "wealthy": "8.3",
	 "funny": "4.8",
	 "goodHearted": "9.2",
	 "intelligent": "6.8",
	 "firstname": "Holmes",
	 "compatibilityScore": "3.5"
 },
 {
	 "creativity": "1.7",
	 "name": "Yardley",
	 "_id": "F9E1A2AE-80F8-5B4F-B661-7289C01C5BA2",
	 "antiSocial": "6.1",
	 "narcissistic": "2.7",
	 "charismatic": "3.1",
	 "goodLooking": "9.2",
	 "wealthy": "5.7",
	 "funny": "8.4",
	 "goodHearted": "2.6",
	 "intelligent": "4.2",
	 "firstname": "Akeem",
	 "compatibilityScore": "1.7"
 }
]}, 
{
	name:"David Boctor", 
	_id:"something", 
	data:[
 {
	 "creativity": "7.2",
	 "name": "Richard",
	 "_id": "9FD36909-F364-70DB-BBC0-FA0B1A5AF867",
	 "antiSocial": "6.9",
	 "narcissistic": "2.7",
	 "charismatic": "3.1",
	 "goodLooking": "6.8",
	 "wealthy": "3.5",
	 "funny": "3.6",
	 "goodHearted": "2.1",
	 "intelligent": "4.5",
	 "firstname": "August",
	 "compatibilityScore": "7.2"
 },
 {
	 "creativity": "2.5",
	 "name": "Thor",
	 "_id": "8FFBEB83-7101-D1EE-A37C-37217CF997DF",
	 "antiSocial": "5.9",
	 "narcissistic": "1.5",
	 "charismatic": "9.1",
	 "goodLooking": "6.6",
	 "wealthy": "3.4",
	 "funny": "7.9",
	 "goodHearted": "1.3",
	 "intelligent": "8.0",
	 "firstname": "Uriel",
	 "compatibilityScore": "2.9"
 },
 {
	 "creativity": "1.4",
	 "name": "Herman",
	 "_id": "101ACF5E-F3F2-4A49-1B74-5B04C470F91A",
	 "antiSocial": "5.5",
	 "narcissistic": "6.7",
	 "charismatic": "5.9",
	 "goodLooking": "8.4",
	 "wealthy": "1.4",
	 "funny": "7.6",
	 "goodHearted": "3.7",
	 "intelligent": "7.6",
	 "firstname": "Quamar",
	 "compatibilityScore": "7.0"
 },
 {
	 "creativity": "2.6",
	 "name": "Francis",
	 "_id": "9262CADC-8B27-91BA-E9D7-94EAF20404B8",
	 "antiSocial": "9.1",
	 "narcissistic": "1.3",
	 "charismatic": "3.2",
	 "goodLooking": "3.3",
	 "wealthy": "7.1",
	 "funny": "9.1",
	 "goodHearted": "1.7",
	 "intelligent": "5.7",
	 "firstname": "Gareth",
	 "compatibilityScore": "1.1"
 },
 {
	 "creativity": "9.6",
	 "name": "Castor",
	 "_id": "C7BD43F8-AA07-CEF6-3746-8B1A1D971EB9",
	 "antiSocial": "7.9",
	 "narcissistic": "4.6",
	 "charismatic": "2.0",
	 "goodLooking": "6.1",
	 "wealthy": "4.4",
	 "funny": "9.8",
	 "goodHearted": "7.8",
	 "intelligent": "3.6",
	 "firstname": "Paul",
	 "compatibilityScore": "5.0"
 },
 {
	 "creativity": "4.8",
	 "name": "Axel",
	 "_id": "56EDE1EA-50AA-8EE5-6159-03C8A2A78C18",
	 "antiSocial": "5.2",
	 "narcissistic": "9.4",
	 "charismatic": "9.3",
	 "goodLooking": "2.9",
	 "wealthy": "5.4",
	 "funny": "2.6",
	 "goodHearted": "2.4",
	 "intelligent": "7.4",
	 "firstname": "Hunter",
	 "compatibilityScore": "2.7"
 },
 {
	 "creativity": "3.2",
	 "name": "Shad",
	 "_id": "8FFE751C-A039-89E6-137E-5062A3609757",
	 "antiSocial": "6.5",
	 "narcissistic": "5.7",
	 "charismatic": "5.4",
	 "goodLooking": "3.1",
	 "wealthy": "3.2",
	 "funny": "1.5",
	 "goodHearted": "5.2",
	 "intelligent": "9.8",
	 "firstname": "Murphy",
	 "compatibilityScore": "2.2"
 },
 {
	 "creativity": "4.8",
	 "name": "Ignatius",
	 "_id": "2135503B-CC67-0EAE-37D8-E8E36E1ED6EC",
	 "antiSocial": "7.1",
	 "narcissistic": "1.8",
	 "charismatic": "1.8",
	 "goodLooking": "7.4",
	 "wealthy": "5.7",
	 "funny": "4.7",
	 "goodHearted": "5.1",
	 "intelligent": "1.1",
	 "firstname": "Merrill",
	 "compatibilityScore": "4.7"
 },
 {
	 "creativity": "3.7",
	 "name": "Armand",
	 "_id": "7695ABDD-1DCD-E813-7763-78E76C6462E2",
	 "antiSocial": "6.4",
	 "narcissistic": "7.3",
	 "charismatic": "9.0",
	 "goodLooking": "7.3",
	 "wealthy": "2.7",
	 "funny": "4.2",
	 "goodHearted": "9.8",
	 "intelligent": "3.2",
	 "firstname": "Xanthus",
	 "compatibilityScore": "7.3"
 },
 {
	 "creativity": "4.7",
	 "name": "Tanek",
	 "_id": "F9C4243A-2015-3B40-D2F2-4E11D7F9585B",
	 "antiSocial": "4.0",
	 "narcissistic": "4.2",
	 "charismatic": "1.9",
	 "goodLooking": "7.9",
	 "wealthy": "9.4",
	 "funny": "2.4",
	 "goodHearted": "9.9",
	 "intelligent": "8.3",
	 "firstname": "Plato",
	 "compatibilityScore": "6.1"
 },
 {
	 "creativity": "1.5",
	 "name": "Jonah",
	 "_id": "DF90F9F3-BF27-63EE-03D6-3AC4222ABE89",
	 "antiSocial": "2.2",
	 "narcissistic": "1.7",
	 "charismatic": "8.5",
	 "goodLooking": "6.8",
	 "wealthy": "9.6",
	 "funny": "8.8",
	 "goodHearted": "3.6",
	 "intelligent": "2.9",
	 "firstname": "Erich",
	 "compatibilityScore": "5.0"
 },
 {
	 "creativity": "8.4",
	 "name": "Ciaran",
	 "_id": "200ED9A6-B06B-190C-F496-019AB57C4E42",
	 "antiSocial": "6.6",
	 "narcissistic": "1.7",
	 "charismatic": "3.1",
	 "goodLooking": "1.8",
	 "wealthy": "6.7",
	 "funny": "5.0",
	 "goodHearted": "5.5",
	 "intelligent": "8.6",
	 "firstname": "Honorato",
	 "compatibilityScore": "6.2"
 },
 {
	 "creativity": "6.5",
	 "name": "Rudyard",
	 "_id": "104F68D5-C686-3ED5-B2D9-06B9F8F39AC1",
	 "antiSocial": "1.5",
	 "narcissistic": "9.5",
	 "charismatic": "2.5",
	 "goodLooking": "1.4",
	 "wealthy": "3.9",
	 "funny": "4.7",
	 "goodHearted": "2.1",
	 "intelligent": "2.3",
	 "firstname": "Declan",
	 "compatibilityScore": "4.6"
 },
 {
	 "creativity": "5.3",
	 "name": "Silas",
	 "_id": "8850E9A1-DEAB-9D24-9A75-8E589755571F",
	 "antiSocial": "6.2",
	 "narcissistic": "7.4",
	 "charismatic": "1.9",
	 "goodLooking": "8.1",
	 "wealthy": "3.6",
	 "funny": "5.2",
	 "goodHearted": "8.5",
	 "intelligent": "3.1",
	 "firstname": "Cullen",
	 "compatibilityScore": "6.8"
 },
 {
	 "creativity": "2.1",
	 "name": "Murphy",
	 "_id": "4F4036B2-366F-F23E-A9DF-A89E605F19B3",
	 "antiSocial": "3.4",
	 "narcissistic": "3.1",
	 "charismatic": "4.9",
	 "goodLooking": "2.2",
	 "wealthy": "7.8",
	 "funny": "9.2",
	 "goodHearted": "2.1",
	 "intelligent": "5.9",
	 "firstname": "Thomas",
	 "compatibilityScore": "4.8"
 },
 {
	 "creativity": "4.3",
	 "name": "Keane",
	 "_id": "B9BF92AC-40AD-90F3-3509-4895383DD502",
	 "antiSocial": "3.2",
	 "narcissistic": "9.3",
	 "charismatic": "3.8",
	 "goodLooking": "5.3",
	 "wealthy": "9.5",
	 "funny": "4.0",
	 "goodHearted": "3.2",
	 "intelligent": "2.2",
	 "firstname": "Jeremy",
	 "compatibilityScore": "7.3"
 },
 {
	 "creativity": "9.6",
	 "name": "Wang",
	 "_id": "418ADBE8-E0BF-0197-C26C-67B44EF33923",
	 "antiSocial": "2.8",
	 "narcissistic": "7.9",
	 "charismatic": "9.0",
	 "goodLooking": "2.5",
	 "wealthy": "4.6",
	 "funny": "6.1",
	 "goodHearted": "8.3",
	 "intelligent": "1.4",
	 "firstname": "Walter",
	 "compatibilityScore": "8.4"
 },
 {
	 "creativity": "5.0",
	 "name": "Brett",
	 "_id": "5FF54E07-67F1-63E8-F2ED-B68167F90AF3",
	 "antiSocial": "10",
	 "narcissistic": "7.1",
	 "charismatic": "5.2",
	 "goodLooking": "9.5",
	 "wealthy": "3.9",
	 "funny": "3.8",
	 "goodHearted": "3.3",
	 "intelligent": "7.4",
	 "firstname": "Kevin",
	 "compatibilityScore": "9.6"
 },
 {
	 "creativity": "8.7",
	 "name": "Blaze",
	 "_id": "9FE15288-1180-CB04-12FF-0F3EE945B9E4",
	 "antiSocial": "9.2",
	 "narcissistic": "2.6",
	 "charismatic": "3.0",
	 "goodLooking": "7.2",
	 "wealthy": "4.6",
	 "funny": "3.0",
	 "goodHearted": "2.8",
	 "intelligent": "1.3",
	 "firstname": "Alvin",
	 "compatibilityScore": "9.1"
 },
 {
	 "creativity": "5.9",
	 "name": "Hop",
	 "_id": "DA436FCA-CE0C-7830-73DA-E5779F73DCA0",
	 "antiSocial": "4.6",
	 "narcissistic": "6.7",
	 "charismatic": "7.2",
	 "goodLooking": "4.7",
	 "wealthy": "5.7",
	 "funny": "1.3",
	 "goodHearted": "9.9",
	 "intelligent": "8.7",
	 "firstname": "Ivor",
	 "compatibilityScore": "7.5"
 },
 {
	 "creativity": "8.5",
	 "name": "Axel",
	 "_id": "C1704E62-E80E-53AD-E521-DF363DC59056",
	 "antiSocial": "2.1",
	 "narcissistic": "9.3",
	 "charismatic": "4.9",
	 "goodLooking": "8.4",
	 "wealthy": "9.1",
	 "funny": "9.7",
	 "goodHearted": "7.4",
	 "intelligent": "6.9",
	 "firstname": "Christian",
	 "compatibilityScore": "9.1"
 },
 {
	 "creativity": "8.8",
	 "name": "Barry",
	 "_id": "684DF04A-940D-6D3D-DE6E-773B38D49C8B",
	 "antiSocial": "8.1",
	 "narcissistic": "1.7",
	 "charismatic": "1.1",
	 "goodLooking": "1.1",
	 "wealthy": "7.8",
	 "funny": "2.4",
	 "goodHearted": "4.8",
	 "intelligent": "3.0",
	 "firstname": "Uriah",
	 "compatibilityScore": "7.4"
 },
 {
	 "creativity": "7.1",
	 "name": "Perry",
	 "_id": "71760BD0-528E-8900-4721-0A7AEAC3893B",
	 "antiSocial": "7.8",
	 "narcissistic": "6.9",
	 "charismatic": "9.5",
	 "goodLooking": "2.9",
	 "wealthy": "7.0",
	 "funny": "3.0",
	 "goodHearted": "8.8",
	 "intelligent": "8.3",
	 "firstname": "Brian",
	 "compatibilityScore": "7.8"
 },
 {
	 "creativity": "5.1",
	 "name": "Kyle",
	 "_id": "F7DFBA82-3298-D912-45C1-ED9660CE11F4",
	 "antiSocial": "7.4",
	 "narcissistic": "7.0",
	 "charismatic": "1.4",
	 "goodLooking": "9.3",
	 "wealthy": "8.7",
	 "funny": "7.9",
	 "goodHearted": "9.7",
	 "intelligent": "9.1",
	 "firstname": "Emmanuel",
	 "compatibilityScore": "6.6"
 },
 {
	 "creativity": "9.3",
	 "name": "Zane",
	 "_id": "9339626E-9978-D3FB-6F11-82DD31F64ACE",
	 "antiSocial": "9.5",
	 "narcissistic": "9.0",
	 "charismatic": "9.4",
	 "goodLooking": "3.3",
	 "wealthy": "2.3",
	 "funny": "5.0",
	 "goodHearted": "9.1",
	 "intelligent": "6.5",
	 "firstname": "Kasper",
	 "compatibilityScore": "1.0"
 },
 {
	 "creativity": "7.4",
	 "name": "Stewart",
	 "_id": "7D8BC613-26BE-2F1E-53F4-DFBF4F141160",
	 "antiSocial": "3.5",
	 "narcissistic": "6.6",
	 "charismatic": "8.0",
	 "goodLooking": "10",
	 "wealthy": "6.6",
	 "funny": "2.3",
	 "goodHearted": "7.0",
	 "intelligent": "5.2",
	 "firstname": "George",
	 "compatibilityScore": "3.0"
 },
 {
	 "creativity": "2.1",
	 "name": "Dean",
	 "_id": "43275631-437C-FC6D-AEAD-7CAAA9707B8C",
	 "antiSocial": "9.0",
	 "narcissistic": "2.9",
	 "charismatic": "7.5",
	 "goodLooking": "6.2",
	 "wealthy": "6.3",
	 "funny": "3.6",
	 "goodHearted": "8.2",
	 "intelligent": "2.1",
	 "firstname": "Levi",
	 "compatibilityScore": "2.4"
 },
 {
	 "creativity": "4.0",
	 "name": "Lester",
	 "_id": "9F5C6E14-D102-BE9E-60AA-CDB4B5057969",
	 "antiSocial": "9.5",
	 "narcissistic": "2.4",
	 "charismatic": "2.7",
	 "goodLooking": "2.9",
	 "wealthy": "7.1",
	 "funny": "8.3",
	 "goodHearted": "2.0",
	 "intelligent": "7.9",
	 "firstname": "Ian",
	 "compatibilityScore": "5.8"
 },
 {
	 "creativity": "4.0",
	 "name": "Thaddeus",
	 "_id": "29348FB7-1C32-90E6-4EF5-9FB3CCEBD83F",
	 "antiSocial": "1.7",
	 "narcissistic": "3.7",
	 "charismatic": "8.0",
	 "goodLooking": "2.5",
	 "wealthy": "8.7",
	 "funny": "2.7",
	 "goodHearted": "8.6",
	 "intelligent": "2.9",
	 "firstname": "Blaze",
	 "compatibilityScore": "9.2"
 },
 {
	 "creativity": "3.2",
	 "name": "Brett",
	 "_id": "59DB2573-0D1D-FCC0-4603-EB296CF115D8",
	 "antiSocial": "1.8",
	 "narcissistic": "9.9",
	 "charismatic": "7.2",
	 "goodLooking": "1.6",
	 "wealthy": "5.1",
	 "funny": "7.6",
	 "goodHearted": "5.0",
	 "intelligent": "5.1",
	 "firstname": "Aristotle",
	 "compatibilityScore": "9.3"
 },
 {
	 "creativity": "6.4",
	 "name": "Burke",
	 "_id": "B47F6CAB-CF15-D5A4-2E09-860528E4A1B1",
	 "antiSocial": "4.9",
	 "narcissistic": "6.9",
	 "charismatic": "1.2",
	 "goodLooking": "9.1",
	 "wealthy": "7.8",
	 "funny": "6.7",
	 "goodHearted": "4.1",
	 "intelligent": "2.4",
	 "firstname": "Dane",
	 "compatibilityScore": "5.2"
 },
 {
	 "creativity": "6.4",
	 "name": "Fulton",
	 "_id": "08578E29-E3AC-B76D-FD38-2D51FFAB8232",
	 "antiSocial": "3.4",
	 "narcissistic": "1.8",
	 "charismatic": "9.5",
	 "goodLooking": "1.2",
	 "wealthy": "1.6",
	 "funny": "3.5",
	 "goodHearted": "2.6",
	 "intelligent": "3.2",
	 "firstname": "Vance",
	 "compatibilityScore": "9.1"
 },
 {
	 "creativity": "4.1",
	 "name": "Jameson",
	 "_id": "50CB2CAF-32BA-2C90-3A8C-E24492F21A5B",
	 "antiSocial": "2.6",
	 "narcissistic": "9.0",
	 "charismatic": "4.8",
	 "goodLooking": "7.0",
	 "wealthy": "4.7",
	 "funny": "3.1",
	 "goodHearted": "8.2",
	 "intelligent": "1.9",
	 "firstname": "Tarik",
	 "compatibilityScore": "4.2"
 },
 {
	 "creativity": "8.0",
	 "name": "Basil",
	 "_id": "7C52BD5B-E123-D673-0143-8BF7160DB873",
	 "antiSocial": "8.3",
	 "narcissistic": "8.3",
	 "charismatic": "1.1",
	 "goodLooking": "2.8",
	 "wealthy": "9.5",
	 "funny": "4.6",
	 "goodHearted": "4.7",
	 "intelligent": "7.9",
	 "firstname": "Hu",
	 "compatibilityScore": "7.2"
 },
 {
	 "creativity": "7.8",
	 "name": "Jeremy",
	 "_id": "8DB3B607-7D93-C593-88B5-0CBD86992C2C",
	 "antiSocial": "2.2",
	 "narcissistic": "5.1",
	 "charismatic": "6.4",
	 "goodLooking": "3.8",
	 "wealthy": "10",
	 "funny": "4.2",
	 "goodHearted": "2.9",
	 "intelligent": "1.2",
	 "firstname": "Slade",
	 "compatibilityScore": "8.1"
 },
 {
	 "creativity": "4.0",
	 "name": "Rahim",
	 "_id": "30DA0529-0B33-D650-2FF0-D0368082E85A",
	 "antiSocial": "5.4",
	 "narcissistic": "8.6",
	 "charismatic": "4.8",
	 "goodLooking": "7.8",
	 "wealthy": "9.8",
	 "funny": "1.8",
	 "goodHearted": "3.3",
	 "intelligent": "6.1",
	 "firstname": "Damon",
	 "compatibilityScore": "9.2"
 },
 {
	 "creativity": "7.4",
	 "name": "Amal",
	 "_id": "44353358-E159-C42B-EDC2-4898E0238E11",
	 "antiSocial": "7.6",
	 "narcissistic": "7.7",
	 "charismatic": "1.3",
	 "goodLooking": "6.7",
	 "wealthy": "7.3",
	 "funny": "2.6",
	 "goodHearted": "9.8",
	 "intelligent": "9.9",
	 "firstname": "Tyrone",
	 "compatibilityScore": "5.8"
 },
 {
	 "creativity": "1.7",
	 "name": "Devin",
	 "_id": "A01EEA5E-EF69-2ECA-6AAD-4E9D0E8633E2",
	 "antiSocial": "7.6",
	 "narcissistic": "8.5",
	 "charismatic": "7.6",
	 "goodLooking": "5.7",
	 "wealthy": "5.4",
	 "funny": "8.4",
	 "goodHearted": "1.8",
	 "intelligent": "1.1",
	 "firstname": "Wade",
	 "compatibilityScore": "2.5"
 },
 {
	 "creativity": "2.6",
	 "name": "Luke",
	 "_id": "8AECAAE2-275C-D011-DBE2-41643FDA7E7E",
	 "antiSocial": "1.2",
	 "narcissistic": "4.3",
	 "charismatic": "7.0",
	 "goodLooking": "7.0",
	 "wealthy": "2.4",
	 "funny": "9.1",
	 "goodHearted": "6.8",
	 "intelligent": "3.0",
	 "firstname": "Lance",
	 "compatibilityScore": "3.1"
 },
 {
	 "creativity": "5.1",
	 "name": "Vladimir",
	 "_id": "AD64ECD0-8C50-F644-D7A7-BC091396191F",
	 "antiSocial": "3.6",
	 "narcissistic": "5.5",
	 "charismatic": "3.0",
	 "goodLooking": "5.0",
	 "wealthy": "6.2",
	 "funny": "6.2",
	 "goodHearted": "2.4",
	 "intelligent": "8.2",
	 "firstname": "Ivor",
	 "compatibilityScore": "1.1"
 },
 {
	 "creativity": "6.9",
	 "name": "Mason",
	 "_id": "B9FA84D7-C38D-71AB-E165-6728B76D17DE",
	 "antiSocial": "1.7",
	 "narcissistic": "2.0",
	 "charismatic": "7.7",
	 "goodLooking": "2.8",
	 "wealthy": "8.2",
	 "funny": "3.3",
	 "goodHearted": "5.6",
	 "intelligent": "4.1",
	 "firstname": "Dale",
	 "compatibilityScore": "2.8"
 },
 {
	 "creativity": "10",
	 "name": "Yoshio",
	 "_id": "5402412B-534C-3A26-BB18-B17B92001CA4",
	 "antiSocial": "2.3",
	 "narcissistic": "4.9",
	 "charismatic": "4.1",
	 "goodLooking": "8.3",
	 "wealthy": "7.7",
	 "funny": "6.5",
	 "goodHearted": "10",
	 "intelligent": "2.6",
	 "firstname": "Rafael",
	 "compatibilityScore": "3.5"
 },
 {
	 "creativity": "7.1",
	 "name": "Ira",
	 "_id": "331C60FC-2D34-9C4D-6A40-7BDFE15FC83E",
	 "antiSocial": "3.0",
	 "narcissistic": "5.5",
	 "charismatic": "3.5",
	 "goodLooking": "2.1",
	 "wealthy": "8.1",
	 "funny": "7.9",
	 "goodHearted": "3.6",
	 "intelligent": "6.3",
	 "firstname": "Zane",
	 "compatibilityScore": "8.0"
 },
 {
	 "creativity": "7.1",
	 "name": "Hoyt",
	 "_id": "7E2B8D46-3D69-1E4B-0A1E-87289EE4CFF5",
	 "antiSocial": "2.0",
	 "narcissistic": "4.4",
	 "charismatic": "7.1",
	 "goodLooking": "8.6",
	 "wealthy": "2.1",
	 "funny": "5.4",
	 "goodHearted": "4.5",
	 "intelligent": "3.0",
	 "firstname": "Dylan",
	 "compatibilityScore": "7.9"
 },
 {
	 "creativity": "1.1",
	 "name": "Ignatius",
	 "_id": "12C1F5E1-DE18-AB60-FB30-9BB76833E4AC",
	 "antiSocial": "4.5",
	 "narcissistic": "6.0",
	 "charismatic": "3.6",
	 "goodLooking": "9.2",
	 "wealthy": "5.9",
	 "funny": "6.4",
	 "goodHearted": "4.9",
	 "intelligent": "8.6",
	 "firstname": "Hayes",
	 "compatibilityScore": "2.9"
 },
 {
	 "creativity": "1.9",
	 "name": "Kuame",
	 "_id": "0EF42165-C9E3-BBB8-E489-9F9D8210A06F",
	 "antiSocial": "3.7",
	 "narcissistic": "9.4",
	 "charismatic": "6.8",
	 "goodLooking": "9.4",
	 "wealthy": "5.9",
	 "funny": "9.6",
	 "goodHearted": "7.8",
	 "intelligent": "1.0",
	 "firstname": "Sebastian",
	 "compatibilityScore": "6.0"
 },
 {
	 "creativity": "2.7",
	 "name": "Xenos",
	 "_id": "E77202B5-8561-83E1-CEBF-6C36FFFD2980",
	 "antiSocial": "5.2",
	 "narcissistic": "6.4",
	 "charismatic": "6.4",
	 "goodLooking": "3.5",
	 "wealthy": "6.9",
	 "funny": "6.4",
	 "goodHearted": "4.3",
	 "intelligent": "6.6",
	 "firstname": "Malik",
	 "compatibilityScore": "6.8"
 },
 {
	 "creativity": "9.7",
	 "name": "Demetrius",
	 "_id": "F1BEB79B-A216-556B-A3C1-1477F8676915",
	 "antiSocial": "4.8",
	 "narcissistic": "2.3",
	 "charismatic": "2.6",
	 "goodLooking": "6.5",
	 "wealthy": "9.6",
	 "funny": "2.2",
	 "goodHearted": "1.8",
	 "intelligent": "9.5",
	 "firstname": "Wang",
	 "compatibilityScore": "9.5"
 },
 {
	 "creativity": "4.8",
	 "name": "Reese",
	 "_id": "1A1D4E46-3C7B-9ED0-39F6-612AF3F62573",
	 "antiSocial": "8.2",
	 "narcissistic": "6.8",
	 "charismatic": "4.5",
	 "goodLooking": "6.9",
	 "wealthy": "7.3",
	 "funny": "1.4",
	 "goodHearted": "3.7",
	 "intelligent": "3.4",
	 "firstname": "Castor",
	 "compatibilityScore": "1.8"
 },
 {
	 "creativity": "8.7",
	 "name": "Brent",
	 "_id": "BCEFC04C-42D3-7FC9-034C-C9E9A2C42EB4",
	 "antiSocial": "4.4",
	 "narcissistic": "1.2",
	 "charismatic": "6.0",
	 "goodLooking": "1.6",
	 "wealthy": "5.2",
	 "funny": "2.5",
	 "goodHearted": "2.1",
	 "intelligent": "7.7",
	 "firstname": "Isaac",
	 "compatibilityScore": "8.6"
 },
 {
	 "creativity": "1.0",
	 "name": "Calvin",
	 "_id": "45D8DB25-10A8-A1D9-B840-230CB5E75B22",
	 "antiSocial": "1.1",
	 "narcissistic": "2.0",
	 "charismatic": "5.8",
	 "goodLooking": "7.3",
	 "wealthy": "7.0",
	 "funny": "3.0",
	 "goodHearted": "4.3",
	 "intelligent": "8.9",
	 "firstname": "Deacon",
	 "compatibilityScore": "4.4"
 },
 {
	 "creativity": "6.5",
	 "name": "Avram",
	 "_id": "6FF0E55B-3FF6-F3D4-EAA9-72E104EF5BA9",
	 "antiSocial": "8.9",
	 "narcissistic": "5.2",
	 "charismatic": "9.6",
	 "goodLooking": "10",
	 "wealthy": "4.8",
	 "funny": "4.6",
	 "goodHearted": "4.3",
	 "intelligent": "4.0",
	 "firstname": "Judah",
	 "compatibilityScore": "7.6"
 },
 {
	 "creativity": "6.6",
	 "name": "Ryder",
	 "_id": "E7D67148-C3B5-EA5C-4B55-45DDEBF64D9F",
	 "antiSocial": "9.4",
	 "narcissistic": "8.0",
	 "charismatic": "2.1",
	 "goodLooking": "6.4",
	 "wealthy": "4.9",
	 "funny": "4.3",
	 "goodHearted": "2.4",
	 "intelligent": "3.8",
	 "firstname": "Harper",
	 "compatibilityScore": "6.3"
 },
 {
	 "creativity": "1.5",
	 "name": "Ahmed",
	 "_id": "F7E8FE75-60C1-FF7A-096C-7CA49A81EC37",
	 "antiSocial": "7.3",
	 "narcissistic": "4.6",
	 "charismatic": "8.4",
	 "goodLooking": "5.9",
	 "wealthy": "6.4",
	 "funny": "3.4",
	 "goodHearted": "1.2",
	 "intelligent": "6.0",
	 "firstname": "Vance",
	 "compatibilityScore": "7.0"
 },
 {
	 "creativity": "1.4",
	 "name": "Patrick",
	 "_id": "288646FB-DC64-01A9-1C50-E04D09830AEA",
	 "antiSocial": "5.4",
	 "narcissistic": "7.1",
	 "charismatic": "5.8",
	 "goodLooking": "9.9",
	 "wealthy": "10",
	 "funny": "5.6",
	 "goodHearted": "5.2",
	 "intelligent": "4.9",
	 "firstname": "Jesse",
	 "compatibilityScore": "9.8"
 },
 {
	 "creativity": "2.3",
	 "name": "Abbot",
	 "_id": "A3713B8E-5640-36A1-81FB-72A45C1A6146",
	 "antiSocial": "2.3",
	 "narcissistic": "2.3",
	 "charismatic": "2.7",
	 "goodLooking": "8.5",
	 "wealthy": "7.2",
	 "funny": "6.2",
	 "goodHearted": "3.9",
	 "intelligent": "8.0",
	 "firstname": "George",
	 "compatibilityScore": "4.6"
 },
 {
	 "creativity": "3.7",
	 "name": "Dean",
	 "_id": "95C8F376-68ED-F6E9-9260-09B4E38E672F",
	 "antiSocial": "5.3",
	 "narcissistic": "2.6",
	 "charismatic": "9.5",
	 "goodLooking": "3.2",
	 "wealthy": "1.3",
	 "funny": "4.5",
	 "goodHearted": "5.1",
	 "intelligent": "3.9",
	 "firstname": "Tyler",
	 "compatibilityScore": "9.1"
 },
 {
	 "creativity": "5.6",
	 "name": "Lyle",
	 "_id": "F0FD22AF-F723-7968-5562-ED73A1ACAC83",
	 "antiSocial": "8.7",
	 "narcissistic": "7.8",
	 "charismatic": "6.2",
	 "goodLooking": "7.1",
	 "wealthy": "6.9",
	 "funny": "7.9",
	 "goodHearted": "8.9",
	 "intelligent": "6.2",
	 "firstname": "Brendan",
	 "compatibilityScore": "9.0"
 },
 {
	 "creativity": "5.7",
	 "name": "Preston",
	 "_id": "CF10BD11-004D-0FE9-2759-72DEB74DA253",
	 "antiSocial": "5.4",
	 "narcissistic": "2.5",
	 "charismatic": "2.5",
	 "goodLooking": "4.3",
	 "wealthy": "10",
	 "funny": "2.1",
	 "goodHearted": "9.9",
	 "intelligent": "2.1",
	 "firstname": "Brody",
	 "compatibilityScore": "10"
 },
 {
	 "creativity": "8.4",
	 "name": "Mannix",
	 "_id": "8DCAD606-A580-9F36-AB15-EC5EAF491670",
	 "antiSocial": "5.4",
	 "narcissistic": "2.6",
	 "charismatic": "7.6",
	 "goodLooking": "9.3",
	 "wealthy": "9.9",
	 "funny": "2.0",
	 "goodHearted": "6.8",
	 "intelligent": "2.4",
	 "firstname": "Moses",
	 "compatibilityScore": "5.8"
 },
 {
	 "creativity": "6.0",
	 "name": "Kenyon",
	 "_id": "CE2244C0-7DF2-B4AD-52B2-444D3530AB8F",
	 "antiSocial": "1.5",
	 "narcissistic": "2.0",
	 "charismatic": "3.3",
	 "goodLooking": "3.4",
	 "wealthy": "5.3",
	 "funny": "5.8",
	 "goodHearted": "7.5",
	 "intelligent": "5.8",
	 "firstname": "Palmer",
	 "compatibilityScore": "3.6"
 },
 {
	 "creativity": "9.6",
	 "name": "Benedict",
	 "_id": "9BA2964B-962D-916B-8F42-D618F6BB5D96",
	 "antiSocial": "6.5",
	 "narcissistic": "9.9",
	 "charismatic": "8.8",
	 "goodLooking": "4.8",
	 "wealthy": "6.9",
	 "funny": "7.3",
	 "goodHearted": "3.6",
	 "intelligent": "3.6",
	 "firstname": "Mason",
	 "compatibilityScore": "2.4"
 },
 {
	 "creativity": "2.6",
	 "name": "Ronan",
	 "_id": "405E7D60-251F-9768-6522-D79EC7026BBE",
	 "antiSocial": "7.4",
	 "narcissistic": "5.4",
	 "charismatic": "3.3",
	 "goodLooking": "2.7",
	 "wealthy": "6.1",
	 "funny": "2.6",
	 "goodHearted": "2.4",
	 "intelligent": "9.5",
	 "firstname": "Devin",
	 "compatibilityScore": "1.2"
 },
 {
	 "creativity": "8.7",
	 "name": "Jack",
	 "_id": "26424527-43CE-8DB9-2CCD-9F0D550D8384",
	 "antiSocial": "5.8",
	 "narcissistic": "8.4",
	 "charismatic": "4.0",
	 "goodLooking": "6.0",
	 "wealthy": "8.6",
	 "funny": "7.6",
	 "goodHearted": "7.1",
	 "intelligent": "6.6",
	 "firstname": "Gareth",
	 "compatibilityScore": "7.8"
 },
 {
	 "creativity": "10",
	 "name": "Reece",
	 "_id": "23607060-975A-6EB8-1496-B6DD526D5B16",
	 "antiSocial": "9.3",
	 "narcissistic": "3.1",
	 "charismatic": "5.4",
	 "goodLooking": "2.6",
	 "wealthy": "9.7",
	 "funny": "8.3",
	 "goodHearted": "4.6",
	 "intelligent": "3.3",
	 "firstname": "Harper",
	 "compatibilityScore": "3.1"
 },
 {
	 "creativity": "8.3",
	 "name": "Adam",
	 "_id": "B906102D-5E7D-A53F-244E-14F045EE94E2",
	 "antiSocial": "8.7",
	 "narcissistic": "8.0",
	 "charismatic": "8.0",
	 "goodLooking": "1.1",
	 "wealthy": "8.0",
	 "funny": "7.8",
	 "goodHearted": "8.3",
	 "intelligent": "8.4",
	 "firstname": "Alvin",
	 "compatibilityScore": "7.0"
 },
 {
	 "creativity": "5.1",
	 "name": "Callum",
	 "_id": "E8AD4FA3-4E4F-B106-7084-06544F0C5C70",
	 "antiSocial": "2.1",
	 "narcissistic": "1.7",
	 "charismatic": "1.4",
	 "goodLooking": "8.2",
	 "wealthy": "8.1",
	 "funny": "3.5",
	 "goodHearted": "1.2",
	 "intelligent": "6.4",
	 "firstname": "Alden",
	 "compatibilityScore": "4.9"
 },
 {
	 "creativity": "4.8",
	 "name": "Chancellor",
	 "_id": "3D656D9B-729F-1EE6-2E6B-A50E221C632B",
	 "antiSocial": "5.5",
	 "narcissistic": "7.9",
	 "charismatic": "2.0",
	 "goodLooking": "4.5",
	 "wealthy": "4.5",
	 "funny": "8.4",
	 "goodHearted": "2.3",
	 "intelligent": "1.2",
	 "firstname": "Adam",
	 "compatibilityScore": "3.3"
 },
 {
	 "creativity": "8.9",
	 "name": "Nash",
	 "_id": "1B90F19B-6AD7-5270-A310-C55A2F2EBB41",
	 "antiSocial": "7.9",
	 "narcissistic": "9.2",
	 "charismatic": "6.4",
	 "goodLooking": "3.3",
	 "wealthy": "5.9",
	 "funny": "9.7",
	 "goodHearted": "2.1",
	 "intelligent": "5.9",
	 "firstname": "Alexander",
	 "compatibilityScore": "7.2"
 },
 {
	 "creativity": "1.9",
	 "name": "Troy",
	 "_id": "DA65AD7C-8613-FFB0-885D-4F0A83F86E0D",
	 "antiSocial": "1.1",
	 "narcissistic": "4.7",
	 "charismatic": "2.6",
	 "goodLooking": "6.2",
	 "wealthy": "8.9",
	 "funny": "6.9",
	 "goodHearted": "1.9",
	 "intelligent": "8.1",
	 "firstname": "Colton",
	 "compatibilityScore": "5.5"
 },
 {
	 "creativity": "8.6",
	 "name": "Tanek",
	 "_id": "486A7022-E165-577E-65EE-F76CA1A4A12B",
	 "antiSocial": "3.6",
	 "narcissistic": "8.6",
	 "charismatic": "1.1",
	 "goodLooking": "3.6",
	 "wealthy": "9.6",
	 "funny": "2.8",
	 "goodHearted": "1.9",
	 "intelligent": "2.4",
	 "firstname": "Hoyt",
	 "compatibilityScore": "7.8"
 },
 {
	 "creativity": "4.6",
	 "name": "Igor",
	 "_id": "ADA2F7B0-027B-103E-4067-83932E00EA08",
	 "antiSocial": "6.5",
	 "narcissistic": "4.5",
	 "charismatic": "1.2",
	 "goodLooking": "1.5",
	 "wealthy": "9.0",
	 "funny": "3.2",
	 "goodHearted": "2.4",
	 "intelligent": "4.4",
	 "firstname": "Tyrone",
	 "compatibilityScore": "8.1"
 },
 {
	 "creativity": "6.2",
	 "name": "Tad",
	 "_id": "705DFEDD-C61C-3CB4-0B79-8A2E709DA954",
	 "antiSocial": "9.3",
	 "narcissistic": "4.3",
	 "charismatic": "2.0",
	 "goodLooking": "2.4",
	 "wealthy": "1.8",
	 "funny": "4.3",
	 "goodHearted": "6.5",
	 "intelligent": "9.4",
	 "firstname": "Colin",
	 "compatibilityScore": "1.4"
 },
 {
	 "creativity": "5.5",
	 "name": "Brendan",
	 "_id": "C9633A04-C84C-8ABC-5445-E7BC6F8CFB1D",
	 "antiSocial": "6.2",
	 "narcissistic": "5.0",
	 "charismatic": "7.1",
	 "goodLooking": "3.2",
	 "wealthy": "2.8",
	 "funny": "4.7",
	 "goodHearted": "5.8",
	 "intelligent": "2.4",
	 "firstname": "Yuli",
	 "compatibilityScore": "1.8"
 },
 {
	 "creativity": "9.9",
	 "name": "Trevor",
	 "_id": "0A2E3437-13B6-7C20-C25E-26B0F72E000E",
	 "antiSocial": "8.5",
	 "narcissistic": "9.9",
	 "charismatic": "7.7",
	 "goodLooking": "7.1",
	 "wealthy": "2.3",
	 "funny": "5.1",
	 "goodHearted": "9.0",
	 "intelligent": "1.4",
	 "firstname": "Ferdinand",
	 "compatibilityScore": "7.0"
 },
 {
	 "creativity": "9.4",
	 "name": "Theodore",
	 "_id": "E1321C4C-AE07-4CA6-71D8-C959A8FF54BC",
	 "antiSocial": "5.5",
	 "narcissistic": "7.2",
	 "charismatic": "1.0",
	 "goodLooking": "6.2",
	 "wealthy": "7.0",
	 "funny": "9.4",
	 "goodHearted": "7.8",
	 "intelligent": "3.7",
	 "firstname": "Tobias",
	 "compatibilityScore": "10"
 },
 {
	 "creativity": "8.4",
	 "name": "Jordan",
	 "_id": "B66B32CE-F40E-F461-6BA6-8F0049056AF3",
	 "antiSocial": "8.9",
	 "narcissistic": "8.0",
	 "charismatic": "5.7",
	 "goodLooking": "3.6",
	 "wealthy": "3.6",
	 "funny": "8.5",
	 "goodHearted": "4.1",
	 "intelligent": "4.0",
	 "firstname": "Eric",
	 "compatibilityScore": "1.9"
 },
 {
	 "creativity": "5.3",
	 "name": "Vincent",
	 "_id": "73F9A45D-2753-0107-ECDD-5C0B333C98CA",
	 "antiSocial": "6.9",
	 "narcissistic": "8.6",
	 "charismatic": "5.0",
	 "goodLooking": "8.5",
	 "wealthy": "3.7",
	 "funny": "8.2",
	 "goodHearted": "7.9",
	 "intelligent": "2.2",
	 "firstname": "Nasim",
	 "compatibilityScore": "1.8"
 },
 {
	 "creativity": "5.8",
	 "name": "Troy",
	 "_id": "7D1C0737-47DE-0B50-F0B3-6E54460D7404",
	 "antiSocial": "6.0",
	 "narcissistic": "4.3",
	 "charismatic": "7.3",
	 "goodLooking": "1.7",
	 "wealthy": "4.5",
	 "funny": "9.8",
	 "goodHearted": "1.2",
	 "intelligent": "6.7",
	 "firstname": "Austin",
	 "compatibilityScore": "3.9"
 },
 {
	 "creativity": "8.0",
	 "name": "Warren",
	 "_id": "63EDCCB2-09CA-AA7E-B1C2-CFAF7CB6BB2B",
	 "antiSocial": "9.7",
	 "narcissistic": "1.9",
	 "charismatic": "7.6",
	 "goodLooking": "1.2",
	 "wealthy": "1.5",
	 "funny": "5.0",
	 "goodHearted": "2.5",
	 "intelligent": "2.7",
	 "firstname": "Rudyard",
	 "compatibilityScore": "1.6"
 },
 {
	 "creativity": "1.6",
	 "name": "Theodore",
	 "_id": "1FA91DED-FE28-C7A8-4D4E-560F6661FF4C",
	 "antiSocial": "4.0",
	 "narcissistic": "5.7",
	 "charismatic": "1.7",
	 "goodLooking": "7.5",
	 "wealthy": "4.1",
	 "funny": "5.4",
	 "goodHearted": "4.5",
	 "intelligent": "8.5",
	 "firstname": "Brock",
	 "compatibilityScore": "9.6"
 },
 {
	 "creativity": "8.0",
	 "name": "Cedric",
	 "_id": "83849D59-144F-7880-3CA9-72E260437268",
	 "antiSocial": "2.6",
	 "narcissistic": "8.6",
	 "charismatic": "6.2",
	 "goodLooking": "9.5",
	 "wealthy": "8.6",
	 "funny": "7.7",
	 "goodHearted": "2.7",
	 "intelligent": "2.9",
	 "firstname": "Lyle",
	 "compatibilityScore": "7.3"
 },
 {
	 "creativity": "3.6",
	 "name": "Leonard",
	 "_id": "559B6CE5-5C0F-B7CF-19FC-B28701686193",
	 "antiSocial": "7.6",
	 "narcissistic": "7.2",
	 "charismatic": "7.8",
	 "goodLooking": "4.8",
	 "wealthy": "8.2",
	 "funny": "6.8",
	 "goodHearted": "4.3",
	 "intelligent": "9.3",
	 "firstname": "Ryan",
	 "compatibilityScore": "6.4"
 },
 {
	 "creativity": "4.8",
	 "name": "Knox",
	 "_id": "BD09CF19-1E82-A331-0CDA-AA5B4281B982",
	 "antiSocial": "6.9",
	 "narcissistic": "4.8",
	 "charismatic": "3.6",
	 "goodLooking": "4.8",
	 "wealthy": "8.1",
	 "funny": "1.0",
	 "goodHearted": "3.9",
	 "intelligent": "1.9",
	 "firstname": "Tarik",
	 "compatibilityScore": "9.8"
 },
 {
	 "creativity": "7.9",
	 "name": "George",
	 "_id": "00F654F2-8231-539E-EA6C-E1C238CF74C1",
	 "antiSocial": "8.3",
	 "narcissistic": "9.3",
	 "charismatic": "5.3",
	 "goodLooking": "4.0",
	 "wealthy": "2.6",
	 "funny": "3.4",
	 "goodHearted": "2.1",
	 "intelligent": "7.4",
	 "firstname": "Jermaine",
	 "compatibilityScore": "2.3"
 },
 {
	 "creativity": "9.9",
	 "name": "Driscoll",
	 "_id": "3A315720-B2CF-C624-6B73-0FD3E51A574D",
	 "antiSocial": "4.7",
	 "narcissistic": "1.9",
	 "charismatic": "9.7",
	 "goodLooking": "4.8",
	 "wealthy": "3.8",
	 "funny": "5.2",
	 "goodHearted": "6.1",
	 "intelligent": "7.7",
	 "firstname": "Asher",
	 "compatibilityScore": "7.2"
 },
 {
	 "creativity": "5.2",
	 "name": "Noble",
	 "_id": "B35DCFD7-32C7-5AF9-DA8E-49162E8D368B",
	 "antiSocial": "7.3",
	 "narcissistic": "7.7",
	 "charismatic": "4.8",
	 "goodLooking": "5.4",
	 "wealthy": "5.7",
	 "funny": "6.1",
	 "goodHearted": "9.6",
	 "intelligent": "10",
	 "firstname": "Ivor",
	 "compatibilityScore": "8.9"
 },
 {
	 "creativity": "4.4",
	 "name": "Maxwell",
	 "_id": "7EF1C0A1-8B15-5B87-F25C-1DE0739CA4B3",
	 "antiSocial": "10",
	 "narcissistic": "4.8",
	 "charismatic": "1.4",
	 "goodLooking": "5.3",
	 "wealthy": "1.2",
	 "funny": "1.9",
	 "goodHearted": "6.4",
	 "intelligent": "4.5",
	 "firstname": "Mannix",
	 "compatibilityScore": "9.1"
 },
 {
	 "creativity": "2.7",
	 "name": "Trevor",
	 "_id": "3CAA9B95-5D8E-B3FF-A2C3-3FFEC3423876",
	 "antiSocial": "7.6",
	 "narcissistic": "1.5",
	 "charismatic": "1.4",
	 "goodLooking": "6.4",
	 "wealthy": "5.2",
	 "funny": "4.2",
	 "goodHearted": "7.9",
	 "intelligent": "1.3",
	 "firstname": "Judah",
	 "compatibilityScore": "7.5"
 },
 {
	 "creativity": "5.0",
	 "name": "Armand",
	 "_id": "CBAA9F22-8322-740D-D65B-27012656469A",
	 "antiSocial": "2.2",
	 "narcissistic": "4.8",
	 "charismatic": "3.2",
	 "goodLooking": "7.7",
	 "wealthy": "6.5",
	 "funny": "3.3",
	 "goodHearted": "3.4",
	 "intelligent": "3.0",
	 "firstname": "Cedric",
	 "compatibilityScore": "7.3"
 },
 {
	 "creativity": "8.8",
	 "name": "Eric",
	 "_id": "C6A67C06-8083-CFFF-51A2-67205F539D7A",
	 "antiSocial": "5.8",
	 "narcissistic": "8.8",
	 "charismatic": "4.8",
	 "goodLooking": "9.7",
	 "wealthy": "2.7",
	 "funny": "8.2",
	 "goodHearted": "8.0",
	 "intelligent": "2.8",
	 "firstname": "Kenneth",
	 "compatibilityScore": "3.6"
 },
 {
	 "creativity": "5.9",
	 "name": "Ronan",
	 "_id": "A7EE2B18-A857-52A3-A8E9-287AA9C72729",
	 "antiSocial": "9.8",
	 "narcissistic": "6.2",
	 "charismatic": "5.7",
	 "goodLooking": "1.6",
	 "wealthy": "5.1",
	 "funny": "6.2",
	 "goodHearted": "3.3",
	 "intelligent": "3.5",
	 "firstname": "Yuli",
	 "compatibilityScore": "5.1"
 },
 {
	 "creativity": "5.2",
	 "name": "Amir",
	 "_id": "30C200B3-56C4-0E24-57AA-AB571DFA957B",
	 "antiSocial": "3.7",
	 "narcissistic": "5.4",
	 "charismatic": "5.2",
	 "goodLooking": "2.5",
	 "wealthy": "8.8",
	 "funny": "2.0",
	 "goodHearted": "3.0",
	 "intelligent": "1.6",
	 "firstname": "Nathaniel",
	 "compatibilityScore": "9.9"
 },
 {
	 "creativity": "5.8",
	 "name": "Lester",
	 "_id": "8F4AB8C9-9C05-8053-644A-F976E5AF294A",
	 "antiSocial": "2.9",
	 "narcissistic": "7.1",
	 "charismatic": "9.5",
	 "goodLooking": "9.5",
	 "wealthy": "6.4",
	 "funny": "2.7",
	 "goodHearted": "8.2",
	 "intelligent": "1.6",
	 "firstname": "Quamar",
	 "compatibilityScore": "4.2"
 },
 {
	 "creativity": "3.1",
	 "name": "Griffith",
	 "_id": "EE6F8A49-CEB8-5234-2722-3E830004C982",
	 "antiSocial": "6.0",
	 "narcissistic": "1.4",
	 "charismatic": "9.6",
	 "goodLooking": "1.4",
	 "wealthy": "6.6",
	 "funny": "8.4",
	 "goodHearted": "8.5",
	 "intelligent": "1.4",
	 "firstname": "Reese",
	 "compatibilityScore": "8.5"
 },
 {
	 "creativity": "8.1",
	 "name": "Erasmus",
	 "_id": "A1581A03-02B1-F3FF-6DD6-BFD4834DEF86",
	 "antiSocial": "2.9",
	 "narcissistic": "6.3",
	 "charismatic": "2.9",
	 "goodLooking": "8.0",
	 "wealthy": "4.9",
	 "funny": "6.1",
	 "goodHearted": "3.9",
	 "intelligent": "4.0",
	 "firstname": "Lester",
	 "compatibilityScore": "4.4"
 },
 {
	 "creativity": "4.9",
	 "name": "Mohammad",
	 "_id": "6195766D-2ED9-BDB3-A22B-191B6B523C02",
	 "antiSocial": "4.3",
	 "narcissistic": "8.8",
	 "charismatic": "6.2",
	 "goodLooking": "9.0",
	 "wealthy": "2.4",
	 "funny": "3.3",
	 "goodHearted": "3.2",
	 "intelligent": "2.2",
	 "firstname": "Uriel",
	 "compatibilityScore": "9.4"
 },
 {
	 "creativity": "5.5",
	 "name": "Burton",
	 "_id": "0DF0A730-3998-E0F1-6E39-8BA3739111C6",
	 "antiSocial": "1.3",
	 "narcissistic": "1.3",
	 "charismatic": "4.4",
	 "goodLooking": "9.2",
	 "wealthy": "9.7",
	 "funny": "5.2",
	 "goodHearted": "7.0",
	 "intelligent": "6.8",
	 "firstname": "Ethan",
	 "compatibilityScore": "4.7"
 },
 {
	 "creativity": "4.9",
	 "name": "Dante",
	 "_id": "B82EF295-24D7-9177-8616-B7F44B508524",
	 "antiSocial": "6.0",
	 "narcissistic": "6.2",
	 "charismatic": "4.8",
	 "goodLooking": "6.1",
	 "wealthy": "8.3",
	 "funny": "4.8",
	 "goodHearted": "9.2",
	 "intelligent": "6.8",
	 "firstname": "Holmes",
	 "compatibilityScore": "3.5"
 },
 {
	 "creativity": "1.7",
	 "name": "Yardley",
	 "_id": "F9E1A2AE-80F8-5B4F-B661-7289C01C5BA2",
	 "antiSocial": "6.1",
	 "narcissistic": "2.7",
	 "charismatic": "3.1",
	 "goodLooking": "9.2",
	 "wealthy": "5.7",
	 "funny": "8.4",
	 "goodHearted": "2.6",
	 "intelligent": "4.2",
	 "firstname": "Akeem",
	 "compatibilityScore": "1.7"
 }
]}



]

const filtering = [1.1,1.2, 1.3,1.4, 1.5,1.6,1.7,1.8,1.9,2.0,2.1,2.2,2.3,2.4,2.5,2.6,2.7,2.8,2.9,3.0,3.1,3.2,3.3,3.4,3.5,3.6,3.7,3.8,3.9,4.0,4.1,4.2,4.3,4.4,4.5,4.6,4.7,4.8,4.9,5.0,
    5.1,5.2,5.3,5.4,5.5,5.6,5.7,5.8,5.9,6.0,6.1,6.2,6.3,6.4,6.5,6.6,6.7,6.8,6.9,7.0,7.1,7.2,7.3,7.4,7.5,7.5,7.6,7.7,7.8,7.9,8.0,
    8.1,8.2,8.3,8.4,8.5,8.6,8.7,8.9,9.0,9.1,9.2,9.3,9.4,9.5,9.6,9.7,9.8,9.9,10
];
const reverseFiltering = filtering.reverse() 

const refinedData = filtering.map(val => {
	const result = data.filter(val1 => val1); 
	return result.map(val => (
		<View style = {{flexDirection:"row", marginBottom:30 }}>
		
		
		</View>
			))
})
const transform = filtering.map(val => {
	
  return {
   title:val, 
	 //data:data[0].data.filter(val1 => val1.compatibilityScore == val)
	 data:lists.data.getListUsers.data.length > 1  ? lists.data.getListUsers.data[sliderState.currentPage].data.filter(val1 => val1.compatibilityScore == val):[]
  }
})


 




const DATA = [
    {
      title: "1.1",
      data: [
				{
				"creativity": "1.1",
				"name": "Yardley",
				"_id": "F9E1A2AE-80F8-5B4F-B661-7289C01C5BA2",
				"antiSocial": "6.1",
				"narcissistic": "2.7",
				"charismatic": "3.1",
				"goodLooking": "9.2",
				"wealthy": "5.7",
				"funny": "8.4",
				"goodHearted": "2.6",
				"intelligent": "4.2",
				"firstname": "Akeem",
				"compatibilityScore": "1.7"
			}, 
		{
				"creativity": "1.1",
				"name": "Yardley",
				"_id": "F9E1A2AE-80F8-5B4F-B661-7289C01C5BA2",
				"antiSocial": "6.1",
				"narcissistic": "2.7",
				"charismatic": "3.1",
				"goodLooking": "9.2",
				"wealthy": "5.7",
				"funny": "8.4",
				"goodHearted": "2.6",
				"intelligent": "4.2",
				"firstname": "Akeem",
				"compatibilityScore": "1.7"
			},
			
		
		]
    },
    {
      title: "1.2",
      data: [	{
				"creativity": "1.7",
				"name": "Yardley",
				"_id": "F9E1A2AE-80F8-5B4F-B661-7289C01C5BA2",
				"antiSocial": "6.1",
				"narcissistic": "2.7",
				"charismatic": "3.1",
				"goodLooking": "9.2",
				"wealthy": "5.7",
				"funny": "8.4",
				"goodHearted": "2.6",
				"intelligent": "4.2",
				"firstname": "Akeem",
				"compatibilityScore": "1.7"
			},]
    },
    
  ];

const renderItem = ({section, index}) => {
	
	if (index !== 0) return null;
	return  <View>
		 <FlatList
		 data = {section.data}
		 renderItem = {({item,index}) => <Item item = {item} />} 
		 numColumns = {8}
		 keyExtractor={(item, index) => item + index}
		 extraData = {sliderState}
		 />

		 
	 </View>
}

function simTemplate(val){
	if(val == 'humor'){

		 return <Foundation name="lightbulb" size={17} color="green" />
	}
	if(val == 'goodHearted'){
		return <Foundation name="heart" size={17} color="red" />
 }
 if(val == 'creative'){
	return <Foundation name="lightbulb" size={17} color="orange" />
}
if(val == 'funny'){
	return <AntDesign name="smile-circle" size={17} color="pink" />
}
if(val == 'trustworthy'){
	return <FontAwesome name="handshake-o" size={17} color="green" />
}
if(val == 'wealthy'){
	return <FontAwesome name="dollar" size={17} color="green" />
}
if(val == 'goodLooking'){
	return <MaterialIcons name="looks" size={17} color="yellow" />
}
if(val == 'charismatic'){
	return <FontAwesome5 name="grin-stars" size={17} color="red" />
}
if(val == 'narcissistic'){
	return <Octicons name="mirror" size={17} color="maroon" />
}
if(val == 'antiSocial'){
	return <MaterialCommunityIcons name="nature-people" size={17} color="purple" />
}
}

const imageTemplate = (item) => {
	//  if(val){
	// 	  return <Image source = {{uri:val}} style = {{height:30, width:30, borderRadius:15}}/>
	//  }
	const copy = lists.data.getListUsers.data.concat();
	copy.map(val => val.data.sort((a,b) => b.compatibilityScore - a.compatibilityScore));  
	const mainer = copy[0].data.filter(val => val._id == item._id);
	let index = copy[0].data.indexOf(mainer[0]);

	
	 return <TouchableOpacity onPress = {() => {console.log("item firstnamne is from matchmake"+index),navigation.navigate('MatchView', {clientIndex:sliderState.currentPage,listItem:index})}}><MaterialIcons name="account-circle" size={40} color="black" /></TouchableOpacity> 
}

function Item({item,index}){
	 
	 return <View style = {{flexDirection:"row", marginLeft:5}}> 
	 {imageTemplate(item)}
	 <View style = {{position:'absolute', zIndex:100}}>
	 {
		  
		simTemplate(item.simDimension)			  
		 
	 }
	 
	 </View>
	 
	 </View>
}

return( <View style = {{flex:1, }}>
			 <View style = {{flex:0.15}}>
       <ScrollView
horizontal = {true}
pagingEnabled = {true}
showsHorizontalScrollIndicator={false}
scrollEventThrottle={16}
style = {{flex:1}}
onScroll={(event: any) => {
	setSliderPage(event);
}}
>
{sliderTemplate}


</ScrollView>
			 </View>	
	<View style = {{flex:0.8,marginLeft:10, marginRight:10,marginBottom:30}}>
	{/* <ListTemplate list = {data[currentIndex].data} navigation = {navigation}/> */}
	<View >
	<SectionList
      sections={transform}
      keyExtractor={(item, index) => item + index}
			renderItem={renderItem}
			extraData = {sliderState}
			
      renderSectionHeader={({ section: { title } }) => (
        <Text style={styles.header}>{title}</Text>
      )}
    />
	
	</View>
	
	<ScrollView>
		
	</ScrollView>
	</View>
	</View>
	
	)






}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: Constants.statusBarHeight,
      marginHorizontal: 16
    },
    item: {
      backgroundColor: "#f9c2ff",
      padding: 20,
      marginVertical: 8
    },
    header: {
      fontSize: 32,
			backgroundColor: "#fff", 
			marginTop:10,
			marginBottom:10
			
    },
    title: {
      fontSize: 24
    }
  });
  
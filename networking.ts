
import { StyleSheet, Text, View,Button, AsyncStorage, Settings } from 'react-native';
import ApolloClient, { gql, InMemoryCache } from 'apollo-boost';
import {firebase} from './config'; 
import { Foundation } from '@expo/vector-icons';


const localhost: string = 'http://192.168.1.15:3000/graphql';
const production: string = 'https://zabardast.herokuapp.com/graphql'; 
async function getId(){
    const result = await AsyncStorage.getItem('_id')
    console.log(result)
    return result; 
 }
 export function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

export const client = new ApolloClient({ 
    uri: localhost, 
    request: async (operation) => {
      operation.setContext({
        headers: {
          username: await getId() || "not defined" 
        }
      })
    },
    cache: new InMemoryCache({
      dataIdFromObject: (o): string | null => (o.id ? `${o.__typename}-${o.id}` : uuidv4())
    })
    
  });

// firstname:String,
// lastname:String,
// number:String,
// email:String,
// birthday:String,
// gender:String,
// orientation:String,
// inches:String,
// feet:String, 
// enableNotification:Boolean, 
// lat:string, 
// lon:string, 
// enableAccountDiscovery:String, 
// locationPreference:String, 
// maxDistance:Number, 
// genderPreference:String, 
// minAgePreference:Sumber, 
// maxAgePreference:Sumber, 
// profileType:String, 
// photos:['strings'], 
// hometown:String, 
// job:String
interface AccountSettings {
   job?:string, 
   hometown?:string,
   password?:string,  
   photos?:[string], 
   profileType?:string, 
   maxAgePreference?:number, 
   minAgePreference?:number, 
   genderPreference?:string, 
   maxDistance?:number, 
   latPreference?:number, 
   lonPreference?:number, 
   enableAccountDiscovery?:boolean, 
   lat?:string, 
   lon?:string, 
   enableNotification?:boolean, 
   inches?:string, 
   feet?:string, 
   orientation?:string, 
   gender?:string, 
   email?:string, 
   firstname?:string, 
   lastname?:string,
   month?:number, 
   year?:number, 
   timeStamp?:number, 
   posted?:boolean, 
   
   
  }

//addSettingsMutation(userInput: AccountSettingsMutation1!): AccountSettingsMutation!



export async function mutateSettings(obj:AccountSettings, refetchQueries:any) {
 const keys = Object.keys(obj); 
 const data = keys.toString(); 
 
 const ACCOUNT_SETTING_MUTATION = gql`
 mutation namer($userInput:AccountSettingsMutation1!){
      addSettingsMutation(userInput:$userInput){
           ${keys}
      }
 }
`
const result = await client.mutate({mutation:ACCOUNT_SETTING_MUTATION,variables:{userInput:obj}, refetchQueries:refetchQueries});
console.log(result);      
}
export async function uploadImage(response,filename,){
  const data = new FormData();
  const result = response.replace('file://', ''); 
  data.append("username", getId()); 
  data.append('file',  {uri: response,name:filename,filename :'imageName.png',type: 'image/png'});
  data.append('name', 'zaid'); 
  const config = {
    method: 'POST',
    headers: {
     'Accept': 'application/json',
     'Content-Type': 'multipart/form-data',
    },
    body: data,
   };
   fetch("http://192.168.1.15:3000/binaryImage/jaggu", config)
 .then(async (checkStatusAndGetJSONResponse)=>{
   if(checkStatusAndGetJSONResponse.ok){
       
   }     
 }).catch((err)=>{console.log(err)});

}
export const arrayReplace = (arr, obj) => {
	const copyArr = arr.concat(); 
	const result =  copyArr.filter(val => val._id == obj._id); 
  if(result.length == 0){
   copyArr.push(obj); 
   return copyArr; 
  }
  const index = copyArr.findIndex(val => val._id == obj._id); 
  copyArr.splice(index, 1, obj);  
  return arr;  
}


// obj1 = { dimensions}
//arr1 = array of objects with dimensions
 interface obj1 {
  creativity:number, 
  charisma:number, 
  honest:number, 
  looks:number, 
  empathetic:number, 
  humor:number, 
  status:number, 
  wealthy:number, 
  _id:string, 
  dimension:number

}
interface objectWithDimension extends obj1 {
  simDimension:string 
}
interface transfromReturn {
   trait:string, 
   votes:number, 
   aheadOf:number
}

interface section {
  title:number, 
  data:objectWithDimension[] 
}


export function transformCreativity(obj1:obj1, arr1:[obj1]):[transfromReturn] {
 
  const dimensions =  ['creativity', 'charisma', 'honest', 'looks', 'empathetic', 'humor', 'status', 'wealthy']; 
  const mainerObj = []; 
  arr1.push(obj1);
  
  function creativity(){
  const result = arr1.sort((a, b) => {
      return b.creativity - a.creativity;
  });
  //console.log(result)
  const index = result.findIndex(x => x._id == obj1._id); 
  const sub = ((arr1.length -1 ) - index); 
  const percent = (sub/ (result.length - 1))*100;
  mainerObj.push({ trait:'creativity', aheadOf:Math.floor(percent), votes:obj1.creativity}) 
  }
  function charisma(){
  const result = arr1.sort((a, b) => {
      return b.charisma - a.charisma;
  });
  //console.log(result)
  const index = result.findIndex(x => x._id == obj1._id); 
  const sub = ((arr1.length -1 ) - index); 
  const percent = (sub/ (result.length - 1))*100;
  mainerObj.push({ trait:'charisma', aheadOf:Math.floor(percent), votes:obj1.charisma}) 
  }
  function honest(){
  const result = arr1.sort((a, b) => {
      return b.honest - a.honest;
  });
  //console.log(result)
  const index = result.findIndex(x => x._id == obj1._id); 
  const sub = ((arr1.length -1 ) - index); 
  const percent = (sub/ (result.length - 1))*100;
  mainerObj.push({ trait:'honest', aheadOf:Math.floor(percent), votes:obj1.honest}) 
  }
  function looks(){
  const result = arr1.sort((a, b) => {
      return b.looks - a.looks;
  });
  //console.log(result)
  const index = result.findIndex(x => x._id == obj1._id); 
  const sub = ((arr1.length -1 ) - index); 
  const percent = (sub/ (result.length - 1))*100;
  mainerObj.push({ trait:'looks', aheadOf:Math.floor(percent), votes:obj1.looks}) 
  }
  function empathetic(){
  const result = arr1.sort((a, b) => {
      return b.empathetic - a.empathetic;
  });
  const index = result.findIndex(x => x._id == obj1._id); 
  const sub = ((arr1.length -1 ) - index); 
  const percent = (sub/ (result.length - 1))*100;
  mainerObj.push({ trait:'empathetic', aheadOf:Math.floor(percent), votes:obj1.empathetic}) 
  }
  function humor(){
  const result = arr1.sort((a, b) => {
      return b.humor - a.humor;
  });
  const index = result.findIndex(x => x._id == obj1._id); 
  const sub = ((arr1.length -1 ) - index); 
  const percent = (sub/ (result.length - 1))*100;
  mainerObj.push({ trait:'humor', aheadOf:Math.floor(percent), votes:obj1.humor}) 
  }
  function status(){
  const result = arr1.sort((a, b) => {
      return b.status - a.status;
  });
  const index = result.findIndex(x => x._id == obj1._id); 
  const sub = ((arr1.length -1 ) - index); 
  const percent = (sub/ (result.length - 1))*100;
  mainerObj.push({ trait:'status', aheadOf:Math.floor(percent), votes:obj1.status}) 
  }
  function wealthy(){
  const result = arr1.sort((a, b) => {
      return b.wealthy - a.wealthy;
  });
  const index = result.findIndex(x => x._id == obj1._id); 
  const sub = ((arr1.length -1 ) - index); 
  const percent = (sub/ (result.length - 1))*100;
  mainerObj.push({ trait:'wealthy', aheadOf:Math.floor(percent), votes:obj1.wealthy}) 
  }
  creativity(); 
  charisma()
  honest()
  looks()
  empathetic()
  humor()
  status()
  wealthy()
  return mainerObj; 
  }


  export const computeSimDimension = (obj:obj1, arr:obj1[]):objectWithDimension[] => {
  const dimensions =  ['creativity', 'charisma', 'honest', 'looks', 'empathetic', 'humor', 'status', 'wealthy']; 
  const mainerObj:any = []; 
  const result =  arr.map(val => {
     if(val.creativity == obj.creativity){
        return {...val, simDimension:'creativity'}
     }
     if(val.charisma == obj.charisma){
      return {...val, simDimension:'charisma'}
     }
     if(val.empathetic == obj.empathetic){
      return {...val, simDimension:'empathetic'}
     }
     if(val.humor == obj.humor){
      return {...val, simDimension:'humor'}
     }
     if(val.looks == obj.looks){
      return {...val, simDimension:'looks'}
     }
     if(val.status == obj.status){
      return {...val, simDimension:'status'}
     }
     if(val.wealthy == obj.wealthy){
      return {...val, simDimension:'wealthy'}
     }
     if(val.honest == obj.honest){
      return {...val, simDimension:'honest'}
     }
     return val; 
  })
  return result; 
    
}

export const computeSectionLabel = (arr:objectWithDimension[]):section[] => { 
  const filtering = [1.1,1.2, 1.3,1.4, 1.5,1.6,1.7,1.8,1.9,2.0,2.1,2.2,2.3,2.4,2.5,2.6,2.7,2.8,2.9,3.0,3.1,3.2,3.3,3.4,3.5,3.6,3.7,3.8,3.9,4.0,4.1,4.2,4.3,4.4,4.5,4.6,4.7,4.8,4.9,5.0,
    5.1,5.2,5.3,5.4,5.5,5.6,5.7,5.8,5.9,6.0,6.1,6.2,6.3,6.4,6.5,6.6,6.7,6.8,6.9,7.0,7.1,7.2,7.3,7.4,7.5,7.5,7.6,7.7,7.8,7.9,8.0,
    8.1,8.2,8.3,8.4,8.5,8.6,8.7,8.9,9.0,9.1,9.2,9.3,9.4,9.5,9.6,9.7,9.8,9.9,10
   ];
   const reverseFiltering = filtering.reverse(); 



   
   

   const transform = filtering.map(val => {
	
    return {
     title:val, 
     data:arr.filter(val1 => val1.dimension == val)
    }
  })
  const finalTransfrom = transform.map(val => {
     if(val.data.length > 0){
      return {
         title:val.title, 
         data:val.data
      }
     }
     
  })
  const finaler = finalTransfrom.filter(val => val !== undefined); 
  

  return finaler; 

}

  

import { StyleSheet, Text, View,Button, AsyncStorage, Settings } from 'react-native';
import ApolloClient, { gql, InMemoryCache } from 'apollo-boost';
import {firebase} from './config'; 


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
  emphatatic:number, 
  humor:number, 
  status:number, 
  wealthy:number, 
  _id:string, 
}
interface transfromReturn {
   trait:string, 
   votes:number, 
   aheadOf:number
}


export function transformCreativity(obj1:obj1, arr1:[obj1]):[transfromReturn] {
 
  const dimensions =  ['creativity', 'charisma', 'honest', 'looks', 'emphatatic', 'humor', 'status', 'wealthy']; 
  const mainerObj = []; 
  arr1.push(obj1);
  
  function creativity(){
  const result = arr1.sort((a, b) => {
      return b.creativity - a.creativity;
  });
  //console.log(result)
  const index = result.findIndex(x => x._id == 'something'); 
  const sub = ((arr1.length -1 ) - index); 
  const percent = (sub/ (result.length - 1))*100;
  mainerObj.push({ trait:'creativity', aheadOf:Math.floor(percent), votes:obj1.creativity}) 
  }
  function charisma(){
  const result = arr1.sort((a, b) => {
      return b.charisma - a.charisma;
  });
  //console.log(result)
  const index = result.findIndex(x => x._id == 'something'); 
  const sub = ((arr1.length -1 ) - index); 
  const percent = (sub/ (result.length - 1))*100;
  mainerObj.push({ trait:'charisma', aheadOf:Math.floor(percent), votes:obj1.charisma}) 
  }
  function honest(){
  const result = arr1.sort((a, b) => {
      return b.honest - a.honest;
  });
  //console.log(result)
  const index = result.findIndex(x => x._id == 'something'); 
  const sub = ((arr1.length -1 ) - index); 
  const percent = (sub/ (result.length - 1))*100;
  mainerObj.push({ trait:'honest', aheadOf:Math.floor(percent), votes:obj1.honest}) 
  }
  function looks(){
  const result = arr1.sort((a, b) => {
      return b.looks - a.looks;
  });
  //console.log(result)
  const index = result.findIndex(x => x._id == 'something'); 
  const sub = ((arr1.length -1 ) - index); 
  const percent = (sub/ (result.length - 1))*100;
  mainerObj.push({ trait:'looks', aheadOf:Math.floor(percent), votes:obj1.looks}) 
  }
  function emphatatic(){
  const result = arr1.sort((a, b) => {
      return b.emphatatic - a.emphatatic;
  });
  const index = result.findIndex(x => x._id == 'something'); 
  const sub = ((arr1.length -1 ) - index); 
  const percent = (sub/ (result.length - 1))*100;
  mainerObj.push({ trait:'emphatatic', aheadOf:Math.floor(percent), votes:obj1.emphatatic}) 
  }
  function humor(){
  const result = arr1.sort((a, b) => {
      return b.humor - a.humor;
  });
  const index = result.findIndex(x => x._id == 'something'); 
  const sub = ((arr1.length -1 ) - index); 
  const percent = (sub/ (result.length - 1))*100;
  mainerObj.push({ trait:'humor', aheadOf:Math.floor(percent), votes:obj1.humor}) 
  }
  function status(){
  const result = arr1.sort((a, b) => {
      return b.status - a.status;
  });
  const index = result.findIndex(x => x._id == 'something'); 
  const sub = ((arr1.length -1 ) - index); 
  const percent = (sub/ (result.length - 1))*100;
  mainerObj.push({ trait:'status', aheadOf:Math.floor(percent), votes:obj1.status}) 
  }
  function wealthy(){
  const result = arr1.sort((a, b) => {
      return b.wealthy - a.wealthy;
  });
  const index = result.findIndex(x => x._id == 'something'); 
  const sub = ((arr1.length -1 ) - index); 
  const percent = (sub/ (result.length - 1))*100;
  mainerObj.push({ trait:'wealthy', aheadOf:Math.floor(percent), votes:obj1.wealthy}) 
  }
  creativity(); 
  charisma()
  honest()
  looks()
  emphatatic()
  humor()
  status()
  wealthy()
  
  
  
  
  return mainerObj; 
  
  }
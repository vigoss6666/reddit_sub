
import { StyleSheet, Text, View,Button, AsyncStorage, Settings } from 'react-native';
import ApolloClient, { gql, InMemoryCache } from 'apollo-boost';

const localhost: string = 'http://192.168.43.7:3000/graphql';
const production: string = 'https://zabardast.herokuapp.com/graphql'; 
async function getId(){
    const result = await AsyncStorage.getItem('_id')
    return result; 
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
    cache: new InMemoryCache()
    
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

interface lastMessage {
   _id:string, 
   createdAt:Date, 
   text:string, 
   user:{
       _id:string
   } 
}
interface point {
    point:number, 
    pointFor:string, 
    createdAt:Date
}
interface vote {
    answeredBy:string, 
    createdAt:Date, 
    dimension:string, 
    question:string
}


interface database {
 age:number, 
 
 chattedArray:[],
 contactList:[], 
 datingPoolList:[], 
 
 day:number, 
 empathetic:number, 
 creativity:number, 
 humor:number, 
 honest:number, 
 charisma:number, 
 narcissism:number,
 status:number, 
 wealthy:number, 
 looks:number, 
 inches:number, 
 feet:number, 
 firstName:string,
 gamePreview:boolean, 
 gender:string, 
 genderPreference:string, 
 hometown:string, 
 introMatches:[], 
 introRequest:[], 
 introSent:[], 
 job:string, 
 lastMessage:[lastMessage], 
 lastName:string, 
 latitude:number, 
 longitude:number, 
 matchMaker:string, 
 matchMakers:[], 
 maxAge:number, 
 minAge:number, 
 month:number, 
 name:string, 
 phoneNumber:string, 
 photos:[], 
 points:[point], 
 posted:boolean, 
 profilePic:string, 
 school:string, 
 seenChats:[], 
 seen:[], 
 seenClientMatches:[], 
 seenIntros:[], 
 seenMatches:[], 
 state:string, 
 subLocality:string, 
 suggestedMatches:[], 
 timeStamp:Date, 
 votes:[], 
 year:number

}


export const defaultDataObject:database = {

 age:0, 
 
 chattedArray:[],
 contactList:[], 
 datingPoolList:[], 
 
 day:0, 
 empathetic:0, 
 creativity:0, 
 humor:0, 
 honest:0, 
 charisma:0, 
 narcissism:0,
 status:0, 
 wealthy:0, 
 looks:0, 
 inches:0, 
 feet:0, 
 firstName:"",
 gamePreview:false, 
 gender:"", 
 genderPreference:"", 
 hometown:"", 
 introMatches:[], 
 introRequest:[], 
 introSent:[], 
 job:"", 
 lastMessage:[], 
 lastName:"", 
 latitude:0, 
 longitude:0, 
 matchMaker:"", 
 matchMakers:[], 
 maxAge:0, 
 minAge:0, 
 month:0, 
 name:"", 
 phoneNumber:"", 
 photos:[null, null, null, null, null,null], 
 points:[], 
 posted:false, 
 profilePic:"", 
 school:"", 
 seenChats:[], 
 seen:[], 
 seenClientMatches:[], 
 seenIntros:[], 
 seenMatches:[], 
 state:"", 
 subLocality:"", 
 suggestedMatches:[], 
 timeStamp:new Date(), 
 votes:[], 
 year:0 
}
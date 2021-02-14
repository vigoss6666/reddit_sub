import * as React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { MaterialIcons } from '@expo/vector-icons';
import {Button} from 'react-native-elements'; 

interface ClientViewProps {}

const Matchee = (props: ClientViewProps) => {
  const data = { 
      fullName:"Amy Guion", 
      firstName:"Amy", 
      matchMaker:['jandjsnjfk', 'jhadfjbfjs', 'jfbsbfjds'], 
      creativity:5.5, 
      charisma:7.7, 
      looks:3.3, 
      honest:4.4,
      age:'32', 
      job:'influencer', 
      state:'california', 
      subLocality:'westwood', 
      lattitude:'something', 
      longitude:'something', 
      distance:2, 
      photos:[], 
      appUser:false, 
      profilePhoto:"https://i.pinimg.com/originals/f0/a6/4e/f0a64e32194d341befecc80458707565.jpg", 
    
   }
   
  const imageTemplate = data.appUser ? data.photos.map(val => {
       return val.photo ? <TouchableOpacity onPress = {() => console.log("hell oworld")}><Image source = {{uri:val.photo}} style = {{height:75, width:75}}/></TouchableOpacity>:<Feather name="image" size={40} color="black" />
  }):data.profilePhoto ? <Image source = {{uri:data.profilePhoto}} style = {{height:75, width:75}}/>:<Feather name="image" size={40} color="black" /> 



  const matchMaker = [{
       fullName:"David boctor",
       firstName:"David",  
    }];
     
   if(data){
    return (
        <View style={styles.container}>
        <ScrollView>
        <View style = {{flex:0.3, justifyContent:'center', alignItems:'center', marginTop:30}}>
         <Text style = {styles.textStyle}> {data.matchMaker.length} people said  </Text>
         <Text style = {[styles.textStyle, {fontWeight:'bold', fontSize:40, fontStyle:'italic'}]}>{data.fullName || data.firstName}</Text>

         <Text style = {[styles.textStyle, {fontSize:25, fontStyle:'italic', marginLeft:30, marginRight:30}]}> is INTELLIGENT, GOOD HEARTED and CREATIVE </Text>
          </View>
          <View style = {{flex:0.7, marginLeft:30, marginRight:30}}>
                <View style = {[styles.line, {marginTop:40}]}/>
                <Text style = {[styles.textStyle, {alignSelf:'center', fontSize:25}]}>TOP TRAITS</Text>
                <View style = {styles.line}></View>
                <View style = {[styles.line, {marginTop:30}]}/>
                <Text style = {[styles.textStyle, {alignSelf:'center', fontSize:25}]}>{data.firstName}'s details</Text>
                <View style = {styles.line}></View>
                <View style = {{flexDirection:'row',marginTop:15, alignItems:'center'}}>
                <FontAwesome name="birthday-cake" size={24} color="black" />
                <Text style = {styles.iconNames}>{data.age} years old</Text>

                </View>
                <View style = {{flexDirection:'row',marginTop:15, alignItems:'center'}}>
                <FontAwesome name="suitcase" size={24} color="black" />
                <Text style = {styles.iconNames}>{data.job}</Text>

                </View>
                <View style = {{flexDirection:'row',marginTop:15, alignItems:'center'}}>
                <FontAwesome5 name="house-damage" size={24} color="black" />
                <Text style = {styles.iconNames}>Lives in {data.subLocality}</Text>

                </View>
                <View style = {{flexDirection:'row',marginTop:15, alignItems:'center'}}>
                <Entypo name="location-pin" size={24} color="black" />
                <Text style = {styles.iconNames}> {data.distance} miles away</Text>

                </View>
                <View style = {styles.dotted}/>
                <View style = {{flexDirection:'row',marginTop:20, alignItems:'center',marginBottom:10}}>
                <AntDesign name="instagram" size={24} color="black" />
                <Text style = {[styles.iconNames, ] }> Photos</Text>
                </View>
                {imageTemplate}
                <View style = {[styles.line, {marginTop:40}]}/>
                <Text style = {[styles.textStyle, {alignSelf:'center', fontSize:25}]}>{data.firstName.toUpperCase()}'s MATCHMAKERS</Text>
                <View style = {styles.line}></View>
                <View style = {{flexDirection:'row', justifyContent:'center', marginTop:30}}>
                <MaterialIcons name="account-circle" size={40} color="black" />
                <MaterialIcons name="account-circle" size={40} color="black" />
                <MaterialIcons name="account-circle" size={40} color="black" />
                <MaterialIcons name="account-circle" size={40} color="black" />
                <MaterialIcons name="account-circle" size={40} color="black" />
                </View>
                <Text style = {[styles.textStyle, {alignSelf:'center', fontSize:20, fontStyle:'italic', marginTop:10}]}>David Boctor and {matchMaker.length} others</Text>
                <Button title = {"SHARE THIS PROFILE"} containerStyle = {{marginLeft:30, marginRight:30, marginTop:100, marginBottom:200,}} buttonStyle = {{backgroundColor:'green',}}>

                </Button>


                
                

                
          </View>
          </ScrollView>    
          
        </View>
      );    
   }
   return (
        <View style = {{flex:1, justifyContent:'center', alignItems:'center'}}>
            <Text>Loading</Text>
        </View>
   ) 
  
};


export default Matchee;

const styles = StyleSheet.create({
  container: {flex:1}, 
  textStyle:{fontWeight:'500', fontSize:30}, 
  line:{borderBottomWidth:3,}, 
  iconNames:{marginLeft:10, fontSize:17, fontWeight:'500'}, 
  dotted:{borderStyle:'dotted', borderWidth:2, borderRadius:10, marginTop:10 }

});


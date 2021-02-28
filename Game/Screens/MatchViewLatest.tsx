import  React, {useState,useRef,useEffect} from 'react';
import { Text, View, StyleSheet, Dimensions, ScrollView, Image, SafeAreaView, SectionList, FlatList, TouchableOpacity } from 'react-native';
import { MaterialIcons, Foundation, Feather, Entypo,MaterialCommunityIcons  } from '@expo/vector-icons';
import {firebase } from '../../config'; 
import {Button} from 'react-native-elements'; 
import {iconFactory} from '../../src/common/Common'; 
interface MatchViewLatestProps {}

const MatchViewLatest = (props: MatchViewLatestProps) => {
    const {width, height} = Dimensions.get('window'); 
    
    const [sliderState, setSliderState] = useState({ currentPage: 0 });
    const [sliderState1, setSliderState1] = useState({ currentPage: 0 });
    
     
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
    const setSliderPage1 = (event: any) => {
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
    const [pageData, setPageData] = useState([
        {
         client:{
            name:"zaid shaikh", 
            firstName:"zaid"                              
         }, 
          
         data:[]
    }, 
    


])
    const textTemplate = 1 == 1 ? null: <View>
          <View style = {{flexDirection:"row", alignItems:"center", padding:5}}>
          {iconFactory('humor', 20)}
          <Text style = {styles.scores }>Humor:  1 </Text>
          </View>
          <View style = {{flexDirection:"row", alignItems:"center", padding:5}}>
          {iconFactory('empathetic', 20)}
          <Text style = {styles.scores }>Empathetic:  1 </Text>
          </View>
          <View style = {{flexDirection:"row", alignItems:"center", padding:5, marginLeft:5}}>
          {iconFactory('wealthy', 20)}
          <Text style = {styles.scores }>Wealthy:  1 </Text>
          </View>
          <View style = {{flexDirection:"row", alignItems:"center", padding:5}}>
          {iconFactory('looks', 20)}
          <Text style = {styles.scores }>Looks:  1</Text>
          </View>
          <View style = {{flexDirection:"row", alignItems:"center",padding:5}}>
          {iconFactory('status', 20)}
          <Text style = {styles.scores }>Status:  1 </Text>
          </View>
          </View> 
    const sliderTemplate =  pageData.map((val,index) => {
        return <View style={{ width, }} id = {val.client.id}>
        <View style = {{ alignItems:"center", marginTop:20}}>
        <Text style = {{fontWeight:"bold", marginTop:10}}>{ val.client.name }</Text>
        {val.client.profilePic ?<Image source = {{uri:val.client.profilePic}} style = {{height:60, width:60, borderRadius:30}}/> :<MaterialIcons name="account-circle" size={150} color="orange" />}
        
        </View>
        </View>
       })
       const sliderTemplate1 =  pageData.map((val,index) => {
        return <View style={{ width, height:100 }} id = {val.client.id}>
        <View style = {{ alignItems:"center", }}>
        {val.client.profilePic ?<Image source = {{uri:val.client.profilePic}} style = {{height:60, width:60, borderRadius:30}}/> :<MaterialCommunityIcons name="account-circle" size={70} color="blue" />}
        <Text style = {{fontWeight:"bold", marginTop:10}}>{ val.client.name }</Text>
        </View>
        </View>
       })

       const headerTemplate = 1 == 1 ? 

       <View>
        <Text style = {{alignSelf:'center', marginBottom:10, fontWeight:'bold'}}>zaid</Text>   
       <Image source = {{uri:"https://i.pinimg.com/originals/f0/a6/4e/f0a64e32194d341befecc80458707565.jpg"}} style = {{height:200, width:200, borderRadius:100}}/></View>:<MaterialIcons name="account-circle" size={220} color="black" />  
     return (
         <View style = {{flex:1}}>
             <View style = {{flex:0.5}}>
            <View style = {{flex:1}}>
             <ScrollView
contentOffset = {{x:414, y:0}}
style = {{zIndex:1,}} 
horizontal = {true}
pagingEnabled = {true}
scrollEventThrottle={8}
onScroll={(event: any) => {
  setSliderPage(event);
}}
>
{sliderTemplate}
</ScrollView>

<ScrollView
contentOffset = {{x:414, y:0}}
style = {{position:'absolute', top:150, left:50, zIndex:2000}} 
horizontal = {true}
pagingEnabled = {true}
scrollEventThrottle={8}
onScroll={(event: any) => {
  setSliderPage(event);
}}
>
{sliderTemplate1}
</ScrollView>    

</View>    
             </View>
             <View style = {{flex:0.5}}>

             </View>
         </View>
     )
        
};

export default MatchViewLatest;

const styles = StyleSheet.create({
    container: {flex:1},
    scores:{
      fontSize:15, 
      fontWeight:'bold', 
      marginLeft:5
    },
  });


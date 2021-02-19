
import  React, {useState,useRef,useEffect} from 'react';
import { Text, View, StyleSheet,Image, ScrollView, Dimensions } from 'react-native';
import {MaterialIcons} from '@expo/vector-icons'; 
interface SelfMatchViewProps {}

const SelfMatchView = (props: SelfMatchViewProps) => {

    const { width, height } = Dimensions.get('window');
    const [sliderState, setSliderState] = useState({ currentPage: 1 });
    const [listItem1, setListItem] = useState(1);
    const [user, setUser] = useState({
        profilePic:"https://i.pinimg.com/originals/f0/a6/4e/f0a64e32194d341befecc80458707565.jpg",
    }); 
    const data = [
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
    const sliderTemplate = data.map(val => (
        <View style={{ width,  height,}} key = {val._id}>
        <View style = {{ alignItems:"center",}}>
        <Text style = {{fontWeight:"bold"}}>{ val.firstname }</Text>
        <MaterialIcons name="account-circle" size={75} color="black" />
        
        </View>
        </View>
    ))
    const setSliderPage = (event: any) => {
        const { currentPage } = sliderState;
        const { x } = event.nativeEvent.contentOffset;
        
        
        const indexOfNextScreen = Math.floor(x / width);
        if (indexOfNextScreen !== currentPage) {
          //setListItem(listItem1 + 1)
           
           
          
         
          setSliderState({
            ...sliderState,
            currentPage: indexOfNextScreen,
          });
        }
      };
    const headerTemplate = user.profilePic ? <Image source = {{uri:user.profilePic}} style = {{height:80, width:80, borderRadius:40}}/>:<MaterialIcons name="account-circle" size={24} color="black" />
  return (
    <View style={styles.container}>
      <View style = {{flex:1}}>
       <View style = {{flex:1}}>   
      <View style = {{justifyContent:'center', alignItems:'center', marginTop:20, zIndex:1}}>
        {headerTemplate}        

        </View>  
        
        
        <ScrollView

        contentOffset = {{x:414*listItem1, y:0}}
        style = {{flex:1,  position:'absolute', top:60, left:5,zIndex:100,}} 
        horizontal = {true}
        pagingEnabled = {true}
        scrollEventThrottle={8}
        onScroll={(event: any) => {
          setSliderPage(event);
        }}
        >
        {sliderTemplate}
        </ScrollView>
        </View>
        </View>
        
    </View>
  );
};

export default SelfMatchView;

const styles = StyleSheet.create({
  container: {flex:1}
});


import  React, {useState,useRef,useEffect, useContext} from 'react';
import { Text, View, StyleSheet,Image, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import {MaterialIcons, Feather, Foundation, AntDesign, FontAwesome, FontAwesome5, MaterialCommunityIcons} from '@expo/vector-icons'; 
import {Button} from 'react-native-elements'; 
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { iconFactory } from '../../src/common/Common';
import {firebase} from '../../config'; 
import { updateUser } from '../../networking';
import AppContext from '../../AppContext'; 
interface SelfMatchViewProps {}

const SelfMatchView = ({navigation, route}) => {
    const {selfMatchView, userIndex} = route.params; 
    
    const myContext = useContext(AppContext); 
    const {user, userId, createChatThread, generatedMatchSelf, setGeneratedMatchSelf,CustomBackComponent, selfFilter,computeName} = myContext; 
    const [hidden, setHidden]= useState(false);
    const { width, height } = Dimensions.get('window');
    const [sliderState, setSliderState] = useState({ currentPage: userIndex });
    
    const insets = useSafeAreaInsets(); 

    console.log(selfMatchView.data[sliderState.currentPage])
    


    const requestIntro = () => {
       const _id = createChatThread(userId,selfMatchView.data[sliderState.currentPage].phoneNumber);
       setGeneratedMatchSelf((generatedMatchSelf) => [...generatedMatchSelf, selfMatchView.data[sliderState.currentPage].phoneNumber])
       
       const object = {
          client1:userId, 
          client2:selfMatchView.data[sliderState.currentPage].phoneNumber, 
          createdAt:new Date(),
          discoveredBy:userId 
        }
        const db = firebase.firestore(); 
        db.collection('user').doc(userId).set({introSent:firebase.firestore.FieldValue.arrayUnion(selfMatchView.data[sliderState.currentPage].phoneNumber)}, {merge:true}).then(() => {
          db.collection('introductions').doc(_id).set(object, {merge:true}).then(() => navigation.navigate('SelfGame'))
        }) 
        
         
      
    }

    useEffect(() => {
      navigation.setOptions({
        headerLeft:() => <CustomBackComponent navigation = {navigation}/>,
        headerRight:() => <TouchableOpacity onPress = {() => navigation.navigate('SelfSort')} style = {{marginRight:15}}>
        <FontAwesome5 name="sort-numeric-down" size={24} color="black" />
        </TouchableOpacity>
      })
    }, [])
    
    
    
    
    
    const textTemplate = hidden ? null: <View>
          <View style = {{flexDirection:"row", alignItems:"center", padding:5}}>
          {iconFactory(selfFilter.sortOrder[3], 20)}
          <Text style = {styles.scores }>{selfFilter.sortOrder[3].toUpperCase()}  {selfMatchView.data[sliderState.currentPage][selfFilter.sortOrder[3]]}</Text>
          </View>
          <View style = {{flexDirection:"row", alignItems:"center", padding:5}}>
          {iconFactory(selfFilter.sortOrder[4], 20)}
          <Text style = {styles.scores }>{selfFilter.sortOrder[4].toUpperCase()}  {selfMatchView.data[sliderState.currentPage][selfFilter.sortOrder[4]]}</Text>
          </View>
          <View style = {{flexDirection:"row", alignItems:"center", padding:5, marginLeft:5}}>
          {iconFactory(selfFilter.sortOrder[5], 20)}
          <Text style = {styles.scores }>{selfFilter.sortOrder[5].toUpperCase()}  {selfMatchView.data[sliderState.currentPage][selfFilter.sortOrder[5]]}</Text>
          </View>
          <View style = {{flexDirection:"row", alignItems:"center", padding:5}}>
          {iconFactory(selfFilter.sortOrder[6], 20)}
          <Text style = {styles.scores }>{selfFilter.sortOrder[6].toUpperCase()}  {selfMatchView.data[sliderState.currentPage][selfFilter.sortOrder[6]]}</Text>
          </View>
          <View style = {{flexDirection:"row", alignItems:"center",padding:5}}>
          {iconFactory(selfFilter.sortOrder[7], 20)}
          <Text style = {styles.scores }>{selfFilter.sortOrder[7].toUpperCase()}  {selfMatchView.data[sliderState.currentPage][selfFilter.sortOrder[7]]}</Text>
          </View>
          
          
          </View> 
    const sliderTemplate = selfMatchView.data.map(val => (
        <View style={{ width,  height,}} key = {val._id}>
        <View style = {{ alignItems:"center",}}>
        
        {val.profilePic ? <Image source = {{uri:val.profilePic}} style = {{height:80, width:80, borderRadius:40}}/>:<MaterialIcons name="account-circle" size={75} color="black" />}
        <Text style = {{fontWeight:"bold"}}>{ computeName(val) }</Text>
        
        </View>
        </View>
    ))
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
    const headerTemplate = selfMatchView.user.profilePic ? 
    <View>
     <Text style = {{alignSelf:'center', marginBottom:10, fontWeight:'bold'}}>{computeName(selfMatchView.user)}</Text>   
    <Image source = {{uri:selfMatchView.user.profilePic}} style = {{height:200, width:200, borderRadius:100}}/></View>:<MaterialIcons name="account-circle" size={220} color="black" />
  return (
    <View style={[styles.container, {paddingBottom:insets.bottom}]}>
      <View style = {{flex:0.6}}>
       <View style = {{flex:1}}>   
      <View style = {{justifyContent:'center', alignItems:'center', marginTop:20, zIndex:1}}>
        {headerTemplate}        

        </View>  
        
        
        <ScrollView
    
        contentOffset = {{x:414*sliderState.currentPage, y:0}}
        style = {{flex:1,  position:'absolute', top:180, left:90,zIndex:100,}} 
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
        
        
            {/* start coding here */}
            <ScrollView style = {{flex:0.3,}}>
            <View style = {{flexDirection:"row", marginTop:20,}}>
         <TouchableOpacity onPress = {() => setHidden(!hidden)} style = {{marginLeft:30, marginBottom:10, flexDirection:"row", alignItems:"center", }}>
         {hidden ? <Feather name="arrow-down-circle" size={40} color="pink" />:<Feather name="arrow-up-circle" size={40} color="pink" />}
         <View style = {{borderBottomWidth:1, width:Dimensions.get('window').width - 100}}>

         </View>
         </TouchableOpacity>
          
           

        </View>
            <View style = {{flexDirection:"row", justifyContent:'space-around'}}>
            <View>
            <View style = {{flexDirection:"row", alignItems:"center",padding:5}}>
            {iconFactory(selfFilter.sortOrder[0], 20)}
          <Text style = {styles.scores }>{selfFilter.sortOrder[0].toUpperCase()}:  {selfMatchView.data[sliderState.currentPage][selfFilter.sortOrder[0]]}</Text>
          </View>
          <View style = {{flexDirection:"row", alignItems:"center",padding:5}}>
          {iconFactory(selfFilter.sortOrder[1], 20)}
          <Text style = {styles.scores }>{selfFilter.sortOrder[1].toUpperCase()}  {selfMatchView.data[sliderState.currentPage][selfFilter.sortOrder[1]]}</Text>
          </View> 
          <View style = {{flexDirection:"row", alignItems:"center", padding:5}}>
          {iconFactory(selfFilter.sortOrder[2], 20)}
          <Text style = {styles.scores }>{selfFilter.sortOrder[2].toUpperCase()}  {selfMatchView.data[sliderState.currentPage][selfFilter.sortOrder[2]]}</Text>
          </View> 
          
               
               {textTemplate}
            </View>

            <View style = {{alignItems:"center", justifyContent:"center", padding:5, marginTop:5}}>
                <Text style = {{fontSize:30, fontWeight:"900"}}>{selfMatchView.data[sliderState.currentPage].dimension}</Text>
                <Text style = {{fontSize:14, fontWeight:'bold',marginTop:5}}>Compatability Score</Text>
            </View> 

            </View>
            <View style={{
    borderStyle: 'dotted',
    borderWidth: 2,
    borderRadius: 1,
    borderColor:'grey',
     marginBottom:30, 
     marginLeft:30, 
     marginRight:30, 
     marginTop:15
  }}></View>
           <View style = {{flexDirection:"row", justifyContent:"center",alignItems:"center"}}>
           <Feather name="alert-triangle" size={24} color="red" />
           <Text style = {{marginLeft:5, fontWeight:'bold'}}>Narcissism: {selfMatchView.data[sliderState.currentPage].narcissism}</Text>
           </View>
           <View style = {{borderBottomWidth:2, marginLeft:30, marginRight:30, borderBottomColor:"grey", marginTop:10}}>
           </View>
           
           </ScrollView>
           <View style = {{marginTop:10, marginLeft:30, marginRight:30, flex:0.1, marginBottom:15, justifyContent:"center", }}>
           <Button title = "Request Introduction" buttonStyle = {{backgroundColor:"#afd968"}} titleStyle = {{color:"black", fontWeight:'bold'}} onPress = {() => { requestIntro()}}/>
           </View>
        
    </View>
  );
};

export default SelfMatchView;

const styles = StyleSheet.create({
  container: {flex:1},
  scores:{
    fontSize:15, 
    fontWeight:'bold', 
    marginLeft:5, 
    
  },
});

import  React, {useState,useRef,useEffect} from 'react';
import { View, StyleSheet, Text, TextInput,TouchableOpacity,ScrollView,Image, FlatList,Picker,PanResponder,Animated, TouchableWithoutFeedback, SafeAreaView, Dimensions, StatusBar} from 'react-native';
import {Button} from 'react-native-elements'; 
import { useMutation,useQuery } from '@apollo/react-hooks';
import Slider from '../../src/common/Slider'; 
import Slider2 from '../../src/common/Slider2';
import { Feather, Foundation, AntDesign, FontAwesome, FontAwesome5, Octicons, MaterialCommunityIcons } from '@expo/vector-icons';

import { MaterialIcons } from '@expo/vector-icons';
import { gql } from 'apollo-boost';
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
             intelligent 
             goodHearted
             creative
             funny
             trustWorthy
             wealthy
             goodLooking
						 charismatic
             narcissistic
             antiSocial
             firstname
					}
			 } 
		}
 }
`


const template = <View><Text>Hello world</Text></View>

export default function MatchView({navigation,route}){
const {clientIndex, listItem } = route.params;
//console.log(listItem, clientIndex)
const [clientIndex1, setClientIndex] = useState(clientIndex);
const [listItem1, setListItem] = useState(listItem);



const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'First Item',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Second Item',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Third Item',
    },
  ];
const [sliderState, setSliderState] = useState({ currentPage: 1 });
const [sliderState1, setSliderState1] = useState({ currentPage: 1 });
const { width, height } = Dimensions.get('window');
const [hidden, setHidden]= useState(false); 
const [columnNumbers, setColumnNumbers] = useState(3);
     
const {data,loading, error} = useQuery(GET_LIST,);
if(data){
    data.getListUsers.data.map(val => val.data.sort((a,b) => b.compatibilityScore - a.compatibilityScore)); 
      
    const names = ['zaid', 'zaheer', 'jacob' ]; 
    const names1 = ['jean', 'cloudia', 'jacob']
    const mainer = data.getListUsers.data[clientIndex].data.filter(val => val._id == listItem._id);
    console.log("mainer is"+mainer[0].firstname)
    const index = data.getListUsers.data[clientIndex].data.indexOf(mainer[0]); 
    console.log("index is"+index); 
    
     
    const setSliderPage = (event: any) => {
        const { currentPage } = sliderState;
        const { x } = event.nativeEvent.contentOffset;
        console.log(x)
        
        const indexOfNextScreen = Math.floor(x / width);
        if (indexOfNextScreen !== currentPage) {
          setSliderState({
            ...sliderState,
            currentPage: indexOfNextScreen,
          });
        }
      };
      const setSliderPage1 = (event: any) => {
        const { currentPage } = sliderState;
        const { x } = event.nativeEvent.contentOffset;
        console.log(x)
        const indexOfNextScreen = Math.floor(x / width);
        if (indexOfNextScreen !== currentPage) {
          setSliderState1({
            ...sliderState,
            currentPage: indexOfNextScreen,
          });
        }
      };
      const sliderTemplate = data.getListUsers.data[clientIndex].data.map(val => (
        <View style={{ width,  height, }} key = {val._id}>
        <View style = {{ alignItems:"center", marginTop:20}}>
        <Text style = {{fontWeight:"bold"}}>{ val.firstname }</Text>
        <MaterialIcons name="account-circle" size={200} color="black" />
        
        </View>
        </View>
    ))
    const sliderTemplate1 = data.getListUsers.data.map(val => (
        <View style={{ width,  height, }} key = {val.name}>
        <View style = {{ alignItems:"center", marginTop:20}}>
        <MaterialIcons name="account-circle" size={75} color="grey" />
        <Text style = {{fontWeight:"bold"}}>{ val.name }</Text>
        </View>
        </View>
    ))
    const Item = ({ title }) => (
        <View style={styles.item}>
          <Text style={styles.title}>{title}</Text>
        </View>
      );
      const renderItem = ({ item }) => (
        <Item title={item.title} />
      );
      const textTemplate = hidden ? null: <View>
          <View style = {{flexDirection:"row", alignItems:"center", padding:5}}>
          <AntDesign name="smile-circle" size={20} color="pink" />
          <Text style = {styles.scores }>Funny 9.5</Text>
          </View>
          <View style = {{flexDirection:"row", alignItems:"center", padding:5}}>
          <FontAwesome name="handshake-o" size={20} color="green" />
          <Text style = {styles.scores }>TrustWorthy 9.5</Text>
          </View>
          <View style = {{flexDirection:"row", alignItems:"center", padding:5, marginLeft:5}}>
          <FontAwesome name="dollar" size={20} color="green" />
          <Text style = {styles.scores }>Wealthy 9.5</Text>
          </View>
          <View style = {{flexDirection:"row", alignItems:"center", padding:5}}>
          <MaterialIcons name="looks" size={20} color="yellow" />
          <Text style = {styles.scores }>Good Looking 9.5</Text>
          </View>
          <View style = {{flexDirection:"row", alignItems:"center",padding:5}}>
          <FontAwesome5 name="grin-stars" size={20} color="red" />
          <Text style = {styles.scores }>Charismatic 9.5</Text>
          </View>
          
          <View style = {{flexDirection:"row", alignItems:"center",padding:5}}>
          <MaterialCommunityIcons name="nature-people" size={20} color="purple" />
          <Text style = {styles.scores }>Anti-Social 9.5</Text>
          </View>
          </View> 
    
      const { currentPage: pageIndex } = sliderState;
      return(
        <View style = {{flex:1, }}>
        <View style = {{flex:0.6}}>
        <ScrollView
        contentOffset = {{x:414*index, y:0}}
        horizontal = {true}
        pagingEnabled = {true}
        scrollEventThrottle={16}
        style = {{flex:1}}
        onScroll={(event: any) => {
          setSliderPage(event);
        }}
        
        >
        {sliderTemplate}
        </ScrollView>
        <ScrollView
        horizontal = {true}
        contentOffset = {{x:414*2, y:0}}  
        pagingEnabled = {true}
        scrollEventThrottle={16}
        style = {{flex:1, position:'absolute', top:130, left:50,zIndex:100}}
        onScroll={(event: any) => {
          setSliderPage1(event);
        }}
        >
        {sliderTemplate1}
        </ScrollView>
        </View>
        <View style = {{flexDirection:"row", marginTop:20}}>
         <TouchableOpacity onPress = {() => setHidden(!hidden)} style = {{marginLeft:30, marginBottom:10, flexDirection:"row", alignItems:"center", }}>
         {hidden ? <Feather name="arrow-down-circle" size={40} color="pink" />:<Feather name="arrow-up-circle" size={40} color="pink" />}
         <View style = {{borderBottomWidth:1, width:Dimensions.get('window').width - 100}}>

         </View>
         </TouchableOpacity>
          
           

        </View>
        
            {/* start coding here */}
            <ScrollView style = {{flex:0.3,}}>
            <View style = {{flexDirection:"row", justifyContent:'space-around'}}>
            <View>
            <View style = {{flexDirection:"row", alignItems:"center",padding:5}}>
          <Foundation name="lightbulb" size={20} color="green" />
          <Text style = {styles.scores }>Intelligent 9.5</Text>
          </View>
          <View style = {{flexDirection:"row", alignItems:"center",padding:5}}>
          <Foundation name="heart" size={20} color="red" />
          <Text style = {styles.scores }>Good Hearted 9.5</Text>
          </View> 
          <View style = {{flexDirection:"row", alignItems:"center", padding:5}}>
          <Foundation name="lightbulb" size={20} color="orange" />
          <Text style = {styles.scores }>Creative 9.5</Text>
          </View> 
          
               
               {textTemplate}
            </View>

            <View style = {{alignItems:"center", justifyContent:"center", padding:5, marginTop:5}}>
                <Text style = {{fontSize:30, fontWeight:"900"}}>8.7</Text>
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
           <Text style = {{marginLeft:5, fontWeight:'bold'}}>Narcissism: 4.8</Text>
           </View>
           <View style = {{borderBottomWidth:2, marginLeft:30, marginRight:30, borderBottomColor:"grey", marginTop:10}}>
           </View>
           
           </ScrollView>
           <View style = {{marginTop:10, marginLeft:30, marginRight:30, flex:0.2, marginBottom:15, justifyContent:"center", }}>
           <Button title = "Generate Match" buttonStyle = {{backgroundColor:"#afd968"}} titleStyle = {{color:"black", fontWeight:'bold'}}/>
           </View>

        </View>
        )
}
if(loading){
  return <View><Text>Loading</Text></View>
}
if(error){
  return <View><Text>Error</Text></View>
}
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: StatusBar.currentHeight || 0,
    },
    item: {
      backgroundColor: '#f9c2ff',
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
    },
    title: {
      fontSize: 32,
    },
    scores:{
      fontSize:15, 
      fontWeight:'bold', 
      marginLeft:5
    },
    scoreIcons:{

    }
  });
import  React, {useState,useRef,useEffect} from 'react';
import { View, StyleSheet, Text, TextInput,TouchableOpacity,ScrollView,Image, Button,FlatList,Picker,PanResponder,Animated, TouchableWithoutFeedback, SafeAreaView, Dimensions, StatusBar} from 'react-native';
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
						 
					}
			 } 
		}
 }
`


const template = <View><Text>Hello world</Text></View>

export default function MatchView({navigation,route}){
//const {clientIndex, listItem } = route.params; 
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
const [sliderState, setSliderState] = useState({ currentPage: 0 });
const [sliderState1, setSliderState1] = useState({ currentPage: 0 });
const { width, height } = Dimensions.get('window');
const [hidden, setHidden]= useState(false); 
     
const {data,loading, error} = useQuery(GET_LIST,);
if(data){
    // console.log(data.getListUsers.data[clientIndex].data.filter(val => val._id == listItem));
    const names = ['zaid', 'zaheer']; 
    const names1 = ['jean', 'cloudia']
    const [columnNumbers, setColumnNumbers] = useState(3); 
    const setSliderPage = (event: any) => {
        const { currentPage } = sliderState;
        const { x } = event.nativeEvent.contentOffset;
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
        const indexOfNextScreen = Math.floor(x / width);
        if (indexOfNextScreen !== currentPage) {
          setSliderState1({
            ...sliderState,
            currentPage: indexOfNextScreen,
          });
        }
      };
      const sliderTemplate = names.map(val => (
        <View style={{ width,  height, }} key = {val}>
        <View style = {{ alignItems:"center", marginTop:20}}>
        <Text style = {{fontWeight:"bold"}}>{ val }</Text>
        <MaterialIcons name="account-circle" size={200} color="black" />
        
        </View>
        </View>
    ))
    const sliderTemplate1 = names1.map(val => (
        <View style={{ width,  height, }} key = {val}>
        <View style = {{ alignItems:"center", marginTop:20}}>
        <MaterialIcons name="account-circle" size={75} color="grey" />
        <Text style = {{fontWeight:"bold"}}>{ val }</Text>
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
          <View style = {{flexDirection:"row"}}>
          <AntDesign name="smile-circle" size={17} color="pink" />
          <Text>Funny 9.5</Text>
          </View>
          <View style = {{flexDirection:"row"}}>
          <FontAwesome name="handshake-o" size={17} color="green" />
          <Text>TrustWorthy 9.5</Text>
          </View>
          <View style = {{flexDirection:"row"}}>
          <FontAwesome name="dollar" size={17} color="green" />
          <Text>Wealthy 9.5</Text>
          </View>
          <View style = {{flexDirection:"row"}}>
          <MaterialIcons name="looks" size={17} color="yellow" />
          <Text>Good Looking 9.5</Text>
          </View>
          <View style = {{flexDirection:"row"}}>
          <FontAwesome5 name="grin-stars" size={17} color="red" />
          <Text>Charismatic 9.5</Text>
          </View>
          <View style = {{flexDirection:"row"}}>
          <Octicons name="mirror" size={17} color="maroon" />
          <Text>Narcissistic 9.5</Text>
          </View>
          <View style = {{flexDirection:"row"}}>
          <MaterialCommunityIcons name="nature-people" size={17} color="purple" />
          <Text>Anti-Social 9.5</Text>
          </View>
          </View> 
    
      const { currentPage: pageIndex } = sliderState;
      return(
        <View style = {{flex:1, }}>
        <View style = {{flex:0.5}}>
        <ScrollView
        horizontal = {true}
        pagingEnabled = {true}
        scrollEventThrottle={16}
        style = {{flex:1}}
        >
        {sliderTemplate}
        </ScrollView>
        <ScrollView
        horizontal = {true}
        pagingEnabled = {true}
        scrollEventThrottle={16}
        style = {{flex:1, position:'absolute', top:130, left:50,zIndex:100}}
        >
        {sliderTemplate1}
        </ScrollView>
        </View>
        <View style = {{flexDirection:"row"}}>
         <TouchableOpacity onPress = {() => setHidden(!hidden)}>
         {hidden ? <Feather name="arrow-down-circle" size={24} color="pink" />:<Feather name="arrow-up-circle" size={24} color="pink" />}
         </TouchableOpacity>    
        </View>
        
            {/* start coding here */}
            <ScrollView style = {{flex:0.5,}}>
            <View style = {{flexDirection:"row", justifyContent:'space-around'}}>
            <View>
            <View style = {{flexDirection:"row"}}>
          <Foundation name="lightbulb" size={17} color="green" />
          <Text>Intelligent 9.5</Text>
          </View>
          <View style = {{flexDirection:"row"}}>
          <Foundation name="heart" size={17} color="red" />
          <Text>Good Hearted 9.5</Text>
          </View> 
          <View style = {{flexDirection:"row"}}>
          <Foundation name="lightbulb" size={17} color="orange" />
          <Text>Creative 9.5</Text>
          </View> 
          
               
               {textTemplate}
            </View>

            <View>
                <Text>8.7</Text>
            </View> 

            </View>
            <View style={{
    borderStyle: 'dotted',
    borderWidth: 2,
    borderRadius: 1,
    borderColor:'grey',
     marginBottom:30
  }}></View>
           </ScrollView>

        </View>
        )
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
  });
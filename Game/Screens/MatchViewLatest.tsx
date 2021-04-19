import  React, {useState,useRef,useEffect} from 'react';
import { Text, View, StyleSheet, Dimensions, ScrollView, Image, SafeAreaView, SectionList, FlatList, TouchableOpacity } from 'react-native';
import { MaterialIcons, Foundation, Feather, Entypo,MaterialCommunityIcons  } from '@expo/vector-icons';
import {firebase } from '../../config'; 
import {Button} from 'react-native-elements'; 
import {iconFactory} from '../../src/common/Common'; 
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { client } from 'networking';
interface MatchViewLatestProps {}

const MatchViewLatest = ({navigation, route}) => {
    const {width, height} = Dimensions.get('window'); 
    const [hidden, setHidden]= useState(false);
    const insets = useSafeAreaInsets();
    
    
    const tester = route.params.pageData; 
    const clientIndex = route.params.clientIndex; 
    const userIndex = route.params.userIndex; 
    const [sliderState, setSliderState] = useState({ currentPage: clientIndex });
    const [sliderState1, setSliderState1] = useState({ currentPage: userIndex });
     
     
    useEffect(() => {
       navigation.setOptions({
           headerTitle:false, 
           headerLeft:() => (<TouchableOpacity onPress = {() => navigation.navigate('MatchMakeFinal')} style = {{marginLeft:10}}><Text style = {{fontWeight:'bold', color:'blue', fontSize:20}}>Back</Text></TouchableOpacity>)
       }) 
    }, [])

    const setSliderPage = (event: any) => {
        const { currentPage } = sliderState;
        const { x } = event.nativeEvent.contentOffset;
        const indexOfNextScreen = Math.floor(x / width);
        if (indexOfNextScreen !== currentPage && indexOfNextScreen >= 0) {
            setSliderState({
                ...sliderState,
                currentPage: indexOfNextScreen,
            });
            setSliderState1({
                
                currentPage: 0,
            });
        }
    };

    

    const setSliderPage1 = (event: any) => {
        const { currentPage } = sliderState1;
        const { x } = event.nativeEvent.contentOffset;
        
        const indexOfNextScreen = Math.floor(x / width);
        if (indexOfNextScreen !== currentPage && indexOfNextScreen >= 0) {
            setSliderState1({
                ...sliderState1,
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
          
         data:[
             {
              name:"katherine kuckoo", 
              firstName:"Katherine"
            }, 
            {
                name:"Samantha Hikkens", 
                firstName:"Samnatha"
            }, 
        ]
    }, 
    {
        client:{
           name:"kemal pasha", 
           firstName:"zaid"                              
        }, 
         
        data:[
            {
            name:"Samantha Hikkens", 
            firstName:"Samnatha"
            }, 
            {
                name:"Sujata williams", 
                firstName:"sujatha"
            },
    
    ]
   },
])


const computeName = (obj) => {
    if(obj.name){
       return obj.name
    }
    if(obj.firstName && obj.lastName){
       return obj.firstName+obj.lastName
    }
    return obj.firstName
}
    const textTemplate = hidden ? null: <View>
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
    const sliderTemplate =  tester.map((val,index) => {
        return <View style={{ width, }} id = {val.client.phoneNumber}>
        <View style = {{ alignItems:"center", marginTop:20}}>
        <Text style = {{fontWeight:"bold", marginTop:10, marginBottom:10}}>{ computeName(val.client) }</Text>
        {val.client.profilePic ?<Image source = {{uri:val.client.profilePic}} style = {{height:160, width:160, borderRadius:80}}/> :<MaterialIcons name="account-circle" size={150} color="orange" />}
        
        </View>
        </View>
       })
       const sliderTemplate1 =  tester[sliderState.currentPage].data.map((val,index) => {
        return <View style={{ width, height:100 }} id = {val.id}>
        <View style = {{ alignItems:"center", }}>
        {val.profilePic ?<Image source = {{uri:val.profilePic}} style = {{height:60, width:60, borderRadius:30}}/> :<MaterialCommunityIcons name="account-circle" size={70} color="blue" />}
        <Text style = {{fontWeight:"bold", marginTop:10}}>{ val.name }</Text>
        </View>
        </View>
       })

     return (
         <View style = {{flex:1, paddingBottom:insets.bottom}}>
             <View style = {{flex:0.5}}>
            <View style = {{flex:1}}>
             <ScrollView
contentOffset = {{x:414*clientIndex, y:0}}
showsVerticalScrollIndicator={false}
showsHorizontalScrollIndicator={false}
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
contentOffset = {{x:414*sliderState1.currentPage, y:0}}
showsVerticalScrollIndicator={false}
showsHorizontalScrollIndicator={false}
style = {{position:'absolute', top:150, left:50, zIndex:2000}} 
horizontal = {true}
pagingEnabled = {true}
scrollEventThrottle={8}
onScroll={(event: any) => {
  setSliderPage1(event);
}}
>
{sliderTemplate1}
</ScrollView>    

</View>    
             </View>
             <ScrollView style = {{flex:0.4,}}>
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
            {iconFactory('charisma', 20)}
          <Text style = {styles.scores }>Charisma:  {tester[sliderState.currentPage].data[sliderState1.currentPage].charisma}</Text>
          </View>
          <View style = {{flexDirection:"row", alignItems:"center",padding:5}}>
          {iconFactory('creativity', 20)}
          <Text style = {styles.scores }>Creativity:  {tester[sliderState.currentPage].data[sliderState1.currentPage].creativity}</Text>
          </View> 
          <View style = {{flexDirection:"row", alignItems:"center", padding:5}}>
          {iconFactory('honest', 20)}
          <Text style = {styles.scores }> Honest:  {}</Text>
          </View> 
          {textTemplate}
            </View>

            <View style = {{alignItems:"center", justifyContent:"center", padding:5, marginTop:5}}>
                <Text style = {{fontSize:30, fontWeight:"900"}}>{}</Text>
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
           <Text style = {{marginLeft:5, fontWeight:'bold'}}>Narcissism: {}</Text>
           </View>
           <View style = {{borderBottomWidth:2, marginLeft:30, marginRight:30, borderBottomColor:"grey", marginTop:10}}>
           </View>
           
           </ScrollView>
           <View style = {{marginTop:10, marginLeft:30, marginRight:30, flex:0.1, marginBottom:15, justifyContent:"center", }}>
           <Button title = "Generate Match" buttonStyle = {{backgroundColor:"#afd968"}} titleStyle = {{color:"black", fontWeight:'bold'}} onPress = {() => {setEvent(), navigation.navigate('GameHomepage')}}/>
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


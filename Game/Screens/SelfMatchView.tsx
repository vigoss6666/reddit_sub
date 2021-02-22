
import  React, {useState,useRef,useEffect} from 'react';
import { Text, View, StyleSheet,Image, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import {MaterialIcons, Feather, Foundation, AntDesign, FontAwesome, FontAwesome5, MaterialCommunityIcons} from '@expo/vector-icons'; 
import {Button} from 'react-native-elements'; 
import { iconFactory } from '../../src/common/Common';
interface SelfMatchViewProps {}

const SelfMatchView = (props: SelfMatchViewProps) => {
    const [hidden, setHidden]= useState(false);
    const { width, height } = Dimensions.get('window');
    const [sliderState, setSliderState] = useState({ currentPage: 1 });
    const [listItem1, setListItem] = useState(1);
    const [user, setUser] = useState({
       profilePic:"https://i.pinimg.com/originals/f0/a6/4e/f0a64e32194d341befecc80458707565.jpg",
       firstName:"Amy Buckthorpe"
    }); 
    console.log(sliderState)
    
    const data = [
         {
            dimension:4.2,   
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
            humor:900,  
            _id:"something", 
            narcissism:4.2, 

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
            humor:200,  
            _id:"something",
            narcissism:4.2, 
            dimension:9.3, 
        },
        {
            name:"SHarmila",
            firstName:"sharmila",
            profilePic:"https://static.toiimg.com/thumb/msid-71970885,width-800,height-600,resizemode-75,imgsize-1145666,pt-32,y_pad-40/71970885.jpg",
            charisma:1000, 
            creativity:9002, 
            honest:400, 
            looks:400, 
            empathetic:400, 
            status:350, 
            wealthy:350, 
            humor:350,  
            _id:"something",
            narcissism:5.2, 
            dimension:5.5, 
        }
    ]
    const textTemplate = hidden ? null: <View>
          <View style = {{flexDirection:"row", alignItems:"center", padding:5}}>
          {iconFactory('humor', 20)}
          <Text style = {styles.scores }>Humor:  {data[sliderState.currentPage].humor}</Text>
          </View>
          <View style = {{flexDirection:"row", alignItems:"center", padding:5}}>
          {iconFactory('empathetic', 20)}
          <Text style = {styles.scores }>Empathetic:  {user.trustWorthy}</Text>
          </View>
          <View style = {{flexDirection:"row", alignItems:"center", padding:5, marginLeft:5}}>
          {iconFactory('wealthy', 20)}
          <Text style = {styles.scores }>Wealthy:  {user.wealthy}</Text>
          </View>
          <View style = {{flexDirection:"row", alignItems:"center", padding:5}}>
          {iconFactory('looks', 20)}
          <Text style = {styles.scores }>Looks:  {user.goodLooking}</Text>
          </View>
          <View style = {{flexDirection:"row", alignItems:"center",padding:5}}>
          {iconFactory('status', 20)}
          <Text style = {styles.scores }>Status:  {data[sliderState.currentPage].status}</Text>
          </View>
          
          
          </View> 
    const sliderTemplate = data.map(val => (
        <View style={{ width,  height,}} key = {val._id}>
        <View style = {{ alignItems:"center",}}>
        
        {val.profilePic ? <Image source = {{uri:val.profilePic}} style = {{height:80, width:80, borderRadius:40}}/>:<MaterialIcons name="account-circle" size={75} color="black" />}
        <Text style = {{fontWeight:"bold"}}>{ val.firstName }</Text>
        
        </View>
        </View>
    ))
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
    const headerTemplate = user.profilePic ? 
    <View>
     <Text style = {{alignSelf:'center', marginBottom:10, fontWeight:'bold'}}>{user.firstName}</Text>   
    <Image source = {{uri:user.profilePic}} style = {{height:200, width:200, borderRadius:100}}/></View>:<MaterialIcons name="account-circle" size={220} color="black" />
  return (
    <View style={styles.container}>
      <View style = {{flex:0.6}}>
       <View style = {{flex:1}}>   
      <View style = {{justifyContent:'center', alignItems:'center', marginTop:20, zIndex:1}}>
        {headerTemplate}        

        </View>  
        
        
        <ScrollView

        contentOffset = {{x:414*listItem1, y:0}}
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
            {iconFactory('charisma', 20)}
          <Text style = {styles.scores }>Charisma:  {data[sliderState.currentPage].charisma}</Text>
          </View>
          <View style = {{flexDirection:"row", alignItems:"center",padding:5}}>
          {iconFactory('creativity', 20)}
          <Text style = {styles.scores }>Creativity:  {data[sliderState.currentPage].creativity}</Text>
          </View> 
          <View style = {{flexDirection:"row", alignItems:"center", padding:5}}>
          {iconFactory('honest', 20)}
          <Text style = {styles.scores }> Honest:  {data[sliderState.currentPage].honest}</Text>
          </View> 
          
               
               {textTemplate}
            </View>

            <View style = {{alignItems:"center", justifyContent:"center", padding:5, marginTop:5}}>
                <Text style = {{fontSize:30, fontWeight:"900"}}>{data[sliderState.currentPage].dimension}</Text>
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
           <Text style = {{marginLeft:5, fontWeight:'bold'}}>Narcissism: {data[sliderState.currentPage].narcissism}</Text>
           </View>
           <View style = {{borderBottomWidth:2, marginLeft:30, marginRight:30, borderBottomColor:"grey", marginTop:10}}>
           </View>
           
           </ScrollView>
           <View style = {{marginTop:10, marginLeft:30, marginRight:30, flex:0.1, marginBottom:15, justifyContent:"center", }}>
           <Button title = "Generate Match" buttonStyle = {{backgroundColor:"#afd968"}} titleStyle = {{color:"black", fontWeight:'bold'}} onPress = {() => {setEvent(), navigation.navigate('GameHomepage')}}/>
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
    marginLeft:5
  },
});

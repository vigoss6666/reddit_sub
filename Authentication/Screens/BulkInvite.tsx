import React, { useState, useEffect, useContext } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import AppContext from '../../AppContext';
import { CheckBox,Button,Icon } from 'react-native-elements'



interface BulkInviteProps {}

const BulkInvite = ({navigation}) => {
    const myContext = useContext(AppContext);
    const [datingPoolList, setDatingPoolList] = useState([]);  
    const [isChecked, setChecked] = useState(false);
     const {user, userId, contactList, setContactList, setSingleContact, defaultDataObject, datingFlatList,inviteToPlay, setInvitetoplay,db,computeName} = myContext;
    const [inviteButton, setInviteButton] = useState(false); 


     const handleCheckUpdate = (phoneNumber:string) => {
        const clone = datingPoolList.concat();
        const index = clone.findIndex(val => val.phoneNumber == phoneNumber); 
        clone[index].checkSelected = !clone[index].checkSelected; 
        setDatingPoolList(clone); 

     }

     useEffect(() => {
        async function namer(){
            const checkerResult = await db.collection('user').get().then(onResult => {
                const users =  onResult.docs.map(val => val.data());
                console.log("user length is"+users.length) 
                const result = users.filter(person => user.datingPoolList.includes(person.phoneNumber))
                return result; 
             }) 
               const gamer = checkerResult.filter(val => val !== null);

               const finalChecker = gamer.map(val => Object.assign({}, val, {checkSelected:true})); 
               setDatingPoolList(finalChecker)
        } 
        namer()
        
     }, [])
    const Item = ({ title, checkSelected, phoneNumber }) => (
        <View style = {{flexDirection:'row'}}>
     <CheckBox
  title={title}
  checkedIcon='dot-circle-o'
  uncheckedIcon='circle-o'
  checked={checkSelected}
  onPress={() => handleCheckUpdate(phoneNumber)}
  containerStyle = {{backgroundColor:'white',borderWidth:0}}
/>
          
        </View>
      );
      const renderItem = ({ item }) => (
        <Item title={computeName(item)} checkSelected = {item.checkSelected} phoneNumber = {item.phoneNumber}/>
      );
    



  return (
    <View style={styles.container}>
      <View style = {{flexDirection:'row', justifyContent:'space-between',backgroundColor:'white',marginTop:30}}>
       <Text></Text>   
       <Text></Text>
      <TouchableOpacity onPress = {() => navigation.goBack()} style = {{marginRight:30}}> 
        <Text style = {{fontWeight:'bold', color:'red'}}>Cancel</Text>
      </TouchableOpacity>
      </View>  
      <View style = {{justifyContent:'center', alignItems:'center'}}>
         <Text style = {{fontSize:30,fontStyle:'italic', marginTop:50,fontWeight:'bold'}}>Invite Your Friends</Text> 
      </View>
      <FlatList
        style = {{marginTop:30, marginBottom:30}}
        data={datingPoolList}
        renderItem={renderItem}
        keyExtractor={(item, index) => item.phoneNumber + index.toString()}
      />
      <Button
      
  title = {inviteButton == false ? 'Invite To Play':'Invitation Sent'}
  icon = {  inviteButton == false ? <Icon
    name="arrow-right"
    size={20}
    color="white"
    style = {{marginLeft:10}}
    
  />:<Icon
  name="check-circle"
  size={20}
  color="white"
  style = {{marginLeft:10}}
/>}  
  iconRight
  iconContainerStyle = {{marginLeft:10,marginRight:10}}
  type="outline"
  containerStyle = {{backgroundColor:"black",marginLeft:30, marginRight:30,elevation:5}}
  
  titleStyle = {{color:"white", fontWeight:'bold', fontStyle:'italic'}}
  disabledStyle = {{backgroundColor:"grey",}}
  // onPress = {() =>  fire()}
  onPress = {() => {setInviteButton(true), setTimeout(() => navigation.goBack(), 2000)}}
  
>

</Button>    
<View style = {{marginBottom:40}}>

</View>
      

    </View>
  );
};

export default BulkInvite;

const styles = StyleSheet.create({
  container: {
      flex:1, 
      
      backgroundColor:'white'
  }, 
  cancel:{
      alignSelf:'flex-end', 
      marginLeft:30
  },
  checkbox: {
    margin: 8,
  },
});

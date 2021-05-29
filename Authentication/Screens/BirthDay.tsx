import  React, {useState,useRef,useEffect, useContext} from 'react';
import { Platform,View, StyleSheet, Text, TextInput,TouchableOpacity,ScrollView,Image, FlatList,Picker,PanResponder,Animated, TouchableWithoutFeedback, SafeAreaView, Dimensions} from 'react-native';
import {Header,Continue} from '../../src/common/Common'; 
import DateTimePicker from '@react-native-community/datetimepicker';
import {Button} from 'react-native-elements'; 
import AppContext from '../../AppContext'; 
import {updateUser} from '../../networking'; 

export default function BirthDay({navigation, route}){
  const {page} = route.params; 
  const myContext = useContext(AppContext);
  const {user, userId, CustomBackComponent} = myContext; 
  useEffect(() => {
    navigation.setOptions({
      headerTitle:false, 
      headerLeft:() => <CustomBackComponent navigation = {navigation}/>
    })
  }, [])
  
  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);


  const _handlePage = () => {
     if(page == "DetailsSettings"){
        navigation.navigate("DetailsSettings"); 
        return; 
     }

     navigation.navigate('Gender', {page:"something"})
     
  }

  const onChange = (event, selectedDate) => {
    
    const d = new Date(selectedDate); 
    
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };
  const _sendToServer = async () => {
    const d = new Date(date); 
    const month = d.getMonth()
    const year = d.getFullYear()
    const timeStamp =  d.getTime()
    const day = d.getDate(); 
    const namer = new Date(); 
    const age = namer.getFullYear() - year; 
    updateUser(userId, { month,year,timeStamp,day, age}); 
  }

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };
return(
<View style = {{flex:1, }}>
<View style = {{flex:0.2}}>
     
</View>
<View style = {{flex:0.5, }}>
<Header text = {"My Birthday is...."} style = {{alignSelf: 'center',}}/>
<View style = {{marginLeft:30,borderBottomColor:"black", borderBottomWidth:2, width:Dimensions.get('window').width - 60,opacity:0.3,marginTop:10}}/>
    <DateTimePicker
      style = {{marginLeft:150}}
      testID="dateTimePicker"
      value={date}
      mode={"date"}
      is24Hour={true}
      display="default"
      onChange={onChange}
      
    />
    <View style = {{marginLeft:30,borderBottomColor:"black", borderBottomWidth:2, width:Dimensions.get('window').width - 60,opacity:0.3,marginTop:10}}/>
    

</View>
<View style = {{flex:0.3, justifyContent:'center' }}>
 {/* <Continue onPress = {() => {_sendToServer(), navigation.navigate('Gender')}} />     */}
 <Button
  title="Continue"
  type="outline"
  containerStyle = {{backgroundColor:"black",marginLeft:30, marginRight:30}}
  titleStyle = {{color:"white", fontWeight:"700"}}
  disabledStyle = {{backgroundColor:"grey",}}
  onPress = {() => {_sendToServer(), _handlePage() }}
/>
</View>
</View>
)
}
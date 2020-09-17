import  React, {useState,useRef,useEffect} from 'react';
import { Platform,View, StyleSheet, Text, TextInput,TouchableOpacity,ScrollView,Image, FlatList,Picker,PanResponder,Animated, TouchableWithoutFeedback, SafeAreaView, Dimensions} from 'react-native';
import { useMutation,useQuery } from '@apollo/react-hooks';
import {Header,Continue} from '../../src/common/Common'; 
import DateTimePicker from '@react-native-community/datetimepicker';
import { mutateSettings } from '../../networking';
import {Button} from 'react-native-elements'; 

export default function BirthDay({navigation, route}){
  const {page} = route.params; 

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
    console.log(d.getMonth())
    console.log( d.getFullYear())
    console.log( d.getTime())
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };
  const _sendToServer = () => {
    const d = new Date(date); 
    const month = d.getMonth()
    const year = d.getFullYear()
    const timeStamp =  d.getTime()
    mutateSettings({month, year, timeStamp})
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
      testID="dateTimePicker"
      value={date}
      mode={"date"}
      is24Hour={true}
      display="default"
      onChange={onChange}
      textColor = {"red"}
    />
    <View style = {{marginLeft:30,borderBottomColor:"black", borderBottomWidth:2, width:Dimensions.get('window').width - 60,opacity:0.3,marginTop:10}}/>
    <Text style = {{alignSelf:'center', marginTop:20, color:"grey", fontWeight:"bold"}}>Your age will be public</Text>
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
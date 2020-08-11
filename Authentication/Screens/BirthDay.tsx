import  React, {useState,useRef,useEffect} from 'react';
import { Platform,View, StyleSheet, Text, TextInput,TouchableOpacity,ScrollView,Image, Button,FlatList,Picker,PanResponder,Animated, TouchableWithoutFeedback, SafeAreaView, Dimensions} from 'react-native';
import { useMutation,useQuery } from '@apollo/react-hooks';
import {Header,Continue} from '../../src/common/Common'; 
import DateTimePicker from '@react-native-community/datetimepicker';
export default function BirthDay({navigation}){
  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

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
<Header text = {"My birthday is...."} style = {{alignSelf: 'center',}}/>
<View style = {{marginLeft:30,borderBottomColor:"black", borderBottomWidth:1, width:Dimensions.get('window').width - 60,opacity:0.3,marginTop:10}}/>
    <DateTimePicker
      testID="dateTimePicker"
      value={date}
      mode={"date"}
      is24Hour={true}
      display="default"
      onChange={onChange}
      textColor = {"red"}
    />
</View>
<View style = {{flex:0.3, justifyContent:"center", alignItems:"center"}}>
 <Continue />    
</View>
</View>
)
}
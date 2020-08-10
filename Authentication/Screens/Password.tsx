import  React, {useState,useRef,useEffect} from 'react';
import { View, StyleSheet, Text, TextInput,TouchableOpacity,ScrollView,Image, Button,FlatList,Picker,PanResponder,Animated, TouchableWithoutFeedback, SafeAreaView, Dimensions} from 'react-native';
import { useMutation,useQuery } from '@apollo/react-hooks';
import { Header, Continue } from '../../src/common/Common';
import RNPasswordStrengthMeter from 'react-native-password-strength-meter';
export default function Password({navigation}){
    const [password, setPassword] = useState("");

 const MAX_LEN = 15,
 MIN_LEN = 6,
 PASS_LABELS = ["Too Short", "Weak", "Normal", "Strong", "Secure"];
 const onChange = () => {
      console.log("Hello world")
 }

return(
<View style = {{flex:1, }}>
<View style = {{flex:0.2}}>

</View>
<View style = {{flex:0.5, marginLeft:30}}>
<Header text = {"Set a Password"} />
<View style = {{borderBottomWidth:0.4, width:Dimensions.get('window').width - 60, marginTop:20}}/> 
<RNPasswordStrengthMeter
          onChangeText={onChange}
          meterType="bar"
        />
      

</View>
<View style = {{flex:0.3,justifyContent:"center", alignItems:"center"}}>
 <Continue  onPress = {() => verifyEmail()}/>    
</View>
</View>
)
}




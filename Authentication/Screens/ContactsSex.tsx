import  React, {useState,useRef,useEffect} from 'react';
import { View, StyleSheet,  TextInput,TouchableOpacity,ScrollView,Image, Button,FlatList,Picker,PanResponder,Animated, TouchableWithoutFeedback, SafeAreaView} from 'react-native';
import { useMutation,useQuery } from '@apollo/react-hooks';
import {Text, Avatar, Icon} from 'react-native-elements'; 



export default function ContactsSex({navigation}){
const data = [{fullname:"Zaid shaikh"},{fullname:"Zaid shaikh"},{fullname:"Zaid shaikh"},{fullname:"Zaid shaikh"},{fullname:"Zaid shaikh"},{fullname:"Zaid shaikh"},{fullname:"Zaid shaikh"},{fullname:"Zaid shaikh"},{fullname:"Zaid shaikh"}]


return(
<View style = {{flex:1, }}>
<View style = {{flex:0.2, }}>

</View>
<View style = {{flex:0.2}}>
<Text h4 style = {{alignSelf:'center', fontWeight:"600"}}>Tell us about your friends</Text>
<Text h5 style = {{alignSelf:'center', fontWeight:"600"}}>Confirm the sex and age of each friend</Text>
</View>
<View style = {{flex:0.6}}>
<ScrollView>
          {data.map((val,index) => {
            return (
              <TouchableOpacity key={index} 
              style = {{borderWidth:1, height:100,flexDirection:"row",  justifyContent:'space-between', marginLeft:10, marginRight:10, borderLeftWidth:0, borderRightWidth:0,}}
              onPress = {() => { addArray(index)  }}
              >
                  <View style = {{flexDirection:'row', alignItems:'center'}}>
                  <Avatar rounded icon = {{name:'account-circle', color:'black'}} activeOpacity = {0.9} size = {"medium"} />  
                  <Text>{val.fullname}</Text>
                  </View>
                  <View style = {{alignItems:'center', justifyContent:'center', marginRight:10}}>
                     <Icon name = {"check"} iconStyle = {{}}/> 
                  </View>
              </TouchableOpacity>
            )
          })}
        </ScrollView> 
</View>
</View>
)
}
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { iconFactory } from '../../src/common/Common';
import DropDownPicker from 'react-native-dropdown-picker';
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
import {Button} from 'react-native-elements'; 

interface AttributeFilterProps {}
function jsUcfirst(str) 
{
    return str.charAt(0).toUpperCase() + str.slice(1);
}

const AttributeFilter = ({navigation, route}) => {
   const attribute = route.params ? route.params.attribute:'creativity';
   const value = route.params ? route.params.value:'none'; 
   const [attValue, setAttValue] = useState(route.params ? route.params.value:'5.5');    
  return (
    <SafeAreaView >
        <ScrollView>
           <View style = {{marginLeft:30, marginRight:30}}>
       <View style = {[{justifyContent:'space-between', flexDirection:'row', marginTop:30, }]}>
           <Text></Text>
           <Text></Text>
           <TouchableOpacity onPress = {() => navigation.navigate('BrowseSettings')}>
           <Text style = {{fontSize:20, color:'orange', fontWeight:'bold'}}> Cancel</Text>
           </TouchableOpacity>
       </View> 
      <View style = {{justifyContent:'center', alignItems:'center', marginTop:30}}>
          {iconFactory(attribute, 60)}

      </View>
      <View style = {{borderBottomWidth:2, marginTop:10}}/>
      <Text style = {{alignSelf:'center', fontSize:'30', fontWeight:'bold', marginTop:10}}>{attribute.toUpperCase()}</Text>
      <View style = {{borderBottomWidth:2, marginTop:10}}/>
      <Text style = {{fontWeight:'bold', fontSize:15, marginTop:10}}>
      Charisma is a personal quality, evident in the way an individual communicates to others, that makes someone more influential. This power to attract attention and influence people can be embodied in the way someone speaks, what someone says, and how someone looks when communicating. 
      </Text>
      <View style = {{borderBottomWidth:2, marginTop:10}}/>
      <Text style = {{marginTop:10, fontWeight:'bold', color:'grey', fontSize:17}}>FILTER BY</Text>
      <View style = {{borderBottomWidth:2, marginTop:10}}/>
      <View style = {{flexDirection:'row', marginTop:10, justifyContent:'space-between', alignItems:'center', zIndex:100}}>
      <Text style = {{marginTop:10, fontWeight:'bold', fontSize:17}}>{attribute.toUpperCase()}</Text> 
      <DropDownPicker
                        labelStyle = {{fontSize:20, fontWeight:'bold'}}
                        items={[
                        {label: "0.1", value: 0.1},
                        {label: "0.2", value: 0.2},
                        {label: "0.3", value: 0.3},
                        {label: "0.4", value: 0.4},
                        {label: "0.5", value: 0.5},
                        {label: "0.6", value: 0.6},
                        {label: "0.7", value: 0.7},
                        {label: "0.8", value: 0.8},
                        {label: "0.9", value: 0.9},
                        {label: "1.0", value: 1},
                        {label: "1.1", value: 1.1},
                        {label: "1.2", value: 1.2},
                        {label: "1.3", value: 1.3},
                        {label: "1.4", value: 1.4},
                        {label: "1.5", value: 1.5},
                        {label: "1.6", value: 1.6},
                        {label: "1.7", value: 1.7},
                        {label: "1.8", value: 1.8},
                        {label: "1.9", value: 1.9},
                        {label: "2.0", value: 2},
                        {label: "2.1", value: 2.1},
                        {label: "2.2", value: 2.2},
                        {label: "2.3", value: 2.3},
                        {label: "2.4", value: 2.4},
                        {label: "2.5", value: 2.5},
                        {label: "2.6", value: 2.6},
                        {label: "2.7", value: 2.7},
                        {label: "2.8", value: 2.8},
                        {label: "2.9", value: 2.9},
                        {label: "3.0", value: 3},
                        {label: "3.1", value: 3.1},
                        {label: "3.2", value: 3.2},
                        {label: "3.3", value: 3.3},
                        {label: "3.4", value: 3.4},
                        {label: "3.5", value: 3.5},
                        {label: "3.6", value: 3.6},
                        {label: "3.7", value: 3.7},
                        {label: "3.8", value: 3.8},
                        {label: "3.9", value: 3.9},
                        {label: "4.0", value: 4},
                        {label: "4.1", value: 4.1},
                        {label: "4.2", value: 4.2},
                        {label: "4.3", value: 4.3},
                        {label: "4.4", value: 4.4},
                        {label: "4.5", value: 4.5},
                        {label: "4.6", value: 4.6},
                        {label: "4.7", value: 4.7},
                        {label: "4.8", value: 4.8},
                        {label: "4.9", value: 4.9},
                        {label: "5.0", value: 5},
                        {label: "5.1", value: 5.1},
                        {label: "5.2", value: 5.2},
                        {label: "5.3", value: 5.3},
                        {label: "5.4", value: 5.4},
                        {label: "5.5", value: 5.5},
                        {label: "5.6", value: 5.6},
                        {label: "5.7", value: 5.7},
                        {label: "5.8", value: 5.8},
                        {label: "5.9", value: 5.9},
                        {label: "6.0", value: 6},
                        {label: "6.1", value: 6.1},
                        {label: "6.2", value: 6.2},
                        {label: "6.3", value: 6.3},
                        {label: "6.4", value: 6.4},
                        {label: "6.5", value: 6.5},
                        {label: "6.6", value: 6.6},
                        {label: "6.7", value: 6.7},
                        {label: "6.8", value: 6.8},
                        {label: "6.9", value: 6.9},
                        {label: "7.0", value: 7},
                        {label: "7.1", value: 7.1},
                        {label: "7.2", value: 7.2},
                        {label: "7.3", value: 7.3},
                        {label: "7.4", value: 7.4},
                        {label: "7.5", value: 7.5},
                        {label: "7.6", value: 7.6},
                        {label: "7.7", value: 7.7},
                        {label: "7.8", value: 7.8},
                        {label: "7.9", value: 7.9},
                        {label: "8.0", value: 8},
                        {label: "8.1", value: 8.1},
                        {label: "8.2", value: 8.2},
                        {label: "8.3", value: 8.3},
                        {label: "8.4", value: 8.4},
                        {label: "8.5", value: 8.5},
                        {label: "8.6", value: 8.6},
                        {label: "8.7", value: 8.7},
                        {label: "8.8", value: 8.8},
                        {label: "8.9", value: 8.9},
                        {label: "9.0", value: 9},
                        {label: "9.1", value: 9.1},
                        {label: "9.2", value: 9.2},
                        {label: "9.3", value: 9.3},
                        {label: "9.4", value: 9.4},
                        {label: "9.5", value: 9.5},
                        {label: "9.6", value: 9.6},
                        {label: "9.7", value: 9.7},
                        {label: "9.8", value: 9.8},
                        {label: "9.9", value: 9.9},
                        {label: "10", value: 10},
                        
                        
                        
                        
                        
                        
                        
                        
                        
                        
                        
                        
                        
                
                      ]}
                    
                    defaultValue = {value}
                    
                    
                    arrowStyle={{marginRight: 10, size:20}}
                    containerStyle={{height: 70, width:100, justifyContent:"center"}}
                    style={{fontSize:30}}
                    itemStyle={{
                        fontSize:30,
                        backgroundColor:"white", 
                        fontColor:"white",
                        justifyContent: 'flex-start'
                    }}
                    dropDownStyle={{backgroundColor: '#fafafa', zIndex:100}}
                    onChangeItem={item => setAttValue(item.value)}
                    
                />
      
      </View>
      <View style={{
    borderStyle: 'dotted',
    borderWidth: 1,
    borderRadius: 1,
    marginTop:10
  }}>
      
</View>
<View style = {{flexDirection:'row', marginTop:10, justifyContent:'space-between', alignItems:'center'}}>
       <Text style = {{fontSize:20 , fontWeight:'bold'}}>
           Potential Matches
       </Text>
       <View>
           <View style = {{flexDirection:'row',alignItems:'center' }}>
               <Text style = {{marginRight:10, fontSize:18, fontWeight:'bold'}}>203</Text>
               <FontAwesome name="female" size={30} color="red" />
               

           </View>
           <View style = {{flexDirection:'row',alignItems:'center', marginTop:10 }}>
               <Text style = {{marginRight:10, fontSize:18, fontWeight:'bold'}}>203</Text>
               <FontAwesome name="male" size={30} color="blue" />
               

           </View>
       </View>
   </View>
   <View style={{
    borderStyle: 'dotted',
    borderWidth: 1,
    borderRadius: 1,
    marginTop:20
  }}>
      
</View>
<View style = {{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
<View style = {{flexDirection:'row', marginTop:20, marginBottom:20 ,  }}>
           
          <FontAwesome5 name="female" size={35} color="red" />
          <FontAwesome5 name="female" size={35} color="red" />
          <FontAwesome5 name="female" size={35} color="red" />
          <FontAwesome5 name="female" size={35} color="red" />
          <FontAwesome5 name="female" size={45} color="red" />
          <FontAwesome5 name="female" size={35} color="red" />
          <FontAwesome5 name="female" size={35} color="red" />
          
          <FontAwesome5 name="female" size={35} color="red" /></View>
          <View>
              <Text style = {{fontWeight:'bold'}}>AHEAD OF</Text>
              <Text style = {{fontWeight:'bold', color:'red'}}>93 %</Text>
              <Text style = {{fontWeight:'bold'}} >Females</Text>
          </View>
          </View>
          <View style={{
    borderStyle: 'dotted',
    borderWidth: 1,
    borderRadius: 1,
    marginTop:20
  }}></View> 
          <View style = {{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
<View style = {{flexDirection:'row', marginTop:20, marginBottom:20 ,  }}>
           
          <FontAwesome5 name="male" size={35} color="blue" />
          <FontAwesome5 name="male" size={35} color="blue" />
          <FontAwesome5 name="male" size={35} color="blue" />
          <FontAwesome5 name="male" size={35} color="blue" />
          <FontAwesome5 name="male" size={45} color="blue" />
          <FontAwesome5 name="male" size={35} color="blue" />
          <FontAwesome5 name="male" size={35} color="blue" />
          
          <FontAwesome5 name="male" size={35} color="blue" /></View>
          <View>
              <Text style = {{fontWeight:'bold'}}>AHEAD OF</Text>
              <Text style = {{fontWeight:'bold', color:'blue'}}>93 %</Text>
              <Text style = {{fontWeight:'bold'}} >Males</Text>
          </View>
          </View>
          <Button title = {'Save'} containerStyle = {{marginTop:20, marginBottom:30,marginLeft:20, marginRight:20}} buttonStyle = {{backgroundColor:'black'}} onPress = {() => navigation.navigate('BrowseSettings', {attribute:attribute, value:attValue})}/>
          </View> 
    </ScrollView>
    </SafeAreaView>
  );
};

export default AttributeFilter;

const styles = StyleSheet.create({
  container: {flex:1, marginLeft:30, marginRight:30}
});

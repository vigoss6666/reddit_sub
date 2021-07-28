import  React, {useState,useRef,useEffect, useContext} from 'react';
import { View, StyleSheet, Text, TextInput,TouchableOpacity,ScrollView,Image, FlatList,Picker,PanResponder,Animated, TouchableWithoutFeedback, SafeAreaView, Dimensions} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import {Header, Continue} from '../../src/common/Common'; 
import { AntDesign } from '@expo/vector-icons';
import {Button} from 'react-native-elements'; 
import DropDownPicker from 'react-native-dropdown-picker';
 import AppContext from '../../AppContext'; 
import {updateUser} from '../../networking'; 
import { MaterialIcons } from '@expo/vector-icons';
import { CardStyleInterpolators } from '@react-navigation/stack';

export default function Height({navigation,route}){
    const insets = useSafeAreaInsets();
    const myContext = useContext(AppContext); 
    const {userId, CustomBackComponent} = myContext;
    let [feet, setFeet] = useState(null); 
     
    const [gate, setGate] = useState(true); 
    // useEffect(() => {
    //     navigation.setOptions({
    //       headerTitle:false, 
    //       headerLeft:() => <CustomBackComponent navigation = {navigation}/>
    //     })
    //   }, [])
    useEffect(() => {
        navigation.setOptions({
          headerShown:false
        })
      }, [])
    useEffect(() => {
       if(feet !== null){
           setGate(false)
           return; 
       } 
       setGate(true); 
    }, [feet])  
    // const { page } = route.params;  

     

const _sendToServer = () => {
    updateUser(userId,{cms:feet} )
}     

      
const _handleNavigation = () => {
     
     navigation.navigate('AuthPhotos', {page:"something"})

}

return(
<View style = {{flex:1,backgroundColor:'#ffffff',paddingTop:insets.top}}>
<View style = {{flex:0.2,alignItems:'center'}}>
 <TouchableOpacity onPress = {() => navigation.navigate('Height', {page:'something',})}>
<MaterialIcons name="keyboard-arrow-down" size={40} color="black" />
</TouchableOpacity>   
</View>
<View style = {{flex:0.5, marginLeft:30}}>
<Header text = {"What's your height?"}/>
<View style = {{borderBottomWidth:2, width:Dimensions.get('window').width - 60, marginTop:20}}/>
<View style = {{flexDirection:"row", marginTop:30, zIndex:3000}}>
 
 <DropDownPicker
                    
                    items={[
                        {label: '100 cm', value: 100},
                        {label: "101 cm", value: 101},
                        {label: "102 cm", value: 102 },
                        {label: "103 cm", value: 103},
                        {label: "104 cm", value: 104},
                        {label: '105 cm', value: 105},
                        {label: "106 cm", value: 106},
                        {label: "107 cm", value: 107 },
                        {label: "108 cm", value: 108},
                        {label: "109 cm", value: 109},
                        {label: '110 cm', value: 110},
                        {label: "111 cm", value: 111},
                        {label: "112 cm", value: 112 },
                        {label: "113 cm", value: 113},
                        {label: "114 cm", value: 114},
                        {label: '115 cm', value: 115},
                        {label: "116 cm", value: 116},
                        {label: "117 cm", value: 117 },
                        {label: "118 cm", value: 118},
                        {label: "119 cm", value: 119},
                        {label: '120 cm', value: 120},
                        {label: "121 cm", value: 121},
                        {label: "122 cm", value: 122 },
                        {label: "123 cm", value: 123},
                        {label: "124 cm", value: 124},
                        {label: '125 cm', value: 125},
                        {label: "126 cm", value: 126},
                        {label: "127 cm", value: 127 },
                        {label: "128 cm", value: 128},
                        {label: "129 cm", value: 129},
                        {label: '130 cm', value: 130},
                        {label: "131 cm", value: 131},
                        {label: "132 cm", value: 132 },
                        {label: "133 cm", value: 133},
                        {label: "134 cm", value: 134},
                        {label: '135 cm', value: 135},
                        {label: "136 cm", value: 136},
                        {label: "137 cm", value: 137 },
                        {label: "138 cm", value: 138},
                        {label: "139 cm", value: 139},
                        {label: '140 cm', value: 140},
                        {label: "141 cm", value: 141},
                        {label: "142 cm", value: 142 },
                        {label: "143 cm", value: 143},
                        {label: "144 cm", value: 144},
                        {label: '145 cm', value: 145},
                        {label: "146 cm", value: 146},
                        {label: "147 cm", value: 147 },
                        {label: "148 cm", value: 148},
                        {label: "149 cm", value: 149},
                        {label: '150 cm', value: 150},
                        {label: "151 cm", value: 151},
                        {label: "152 cm", value: 152 },
                        {label: "153 cm", value: 153},
                        {label: "154 cm", value: 154},
                        {label: '155 cm', value: 155},
                        {label: "156 cm", value: 156},
                        {label: "157 cm", value: 157 },
                        {label: "158 cm", value: 158},
                        {label: "159 cm", value: 159},
                        {label: '160 cm', value: 160},
                        {label: "161 cm", value: 161},
                        {label: "162 cm", value: 162 },
                        {label: "163 cm", value: 163},
                        {label: "164 cm", value: 164},
                        {label: '165 cm', value: 165},
                        {label: "166 cm", value: 166},
                        {label: "167 cm", value: 167 },
                        {label: "168 cm", value: 168},
                        {label: "169 cm", value: 169},
                        {label: '170 cm', value: 170},
                        {label: "171 cm", value: 171},
                        {label: "172 cm", value: 172 },
                        {label: "173 cm", value: 173},
                        {label: "174 cm", value: 174},
                        {label: '175 cm', value: 175},
                        {label: "176 cm", value: 176},
                        {label: "177 cm", value: 177 },
                        {label: "178 cm", value: 178},
                        {label: "179 cm", value: 179},
                        {label: '180 cm', value: 180},
                        {label: "181 cm", value: 181},
                        {label: "182 cm", value: 182 },
                        {label: "183 cm", value: 183},
                        {label: "184 cm", value: 184},
                        {label: '185 cm', value: 185},
                        {label: "186 cm", value: 186},
                        {label: "187 cm", value: 187 },
                        {label: "188 cm", value: 188},
                        {label: "189 cm", value: 189},
                        {label: '190 cm', value: 190},
                        {label: "191 cm", value: 191},
                        {label: "192 cm", value: 192 },
                        {label: "193 cm", value: 193},
                        {label: "194 cm", value: 194},
                        {label: '195 cm', value: 195},
                        {label: "196 cm", value: 196},
                        {label: "197 cm", value: 197 },
                        {label: "198 cm", value: 198},
                        {label: "199 cm", value: 199},
                        {label: '200 cm', value: 200},
                        {label: "201 cm", value: 201},
                        {label: "202 cm", value: 202 },
                        {label: "203 cm", value: 203},
                        {label: "204 cm", value: 204},
                        {label: '205 cm', value: 205},
                        {label: "206 cm", value: 206},
                        {label: "207 cm", value: 207 },
                        {label: "208 cm", value: 208},
                        {label: "209 cm", value: 209},
                
                      ]}
                    onPress = {() => {console.log("pressed")}}
                    selectedtLabelStyle={{
                         color: 'blue'
                     }}
                    placeholder = {'180 cm'}
                    placeholderStyle={{
                         fontWeight: 'bold',
                         textAlign: 'center', 
                         fontSize:20,
                         color:'grey'
                     }}
                    arrowStyle={{marginRight: 10, size:20}}
                    containerStyle={{height: 70, width:150, justifyContent:"center"}}
                    style={{fontSize:30}}
                    itemStyle={{
                        fontSize:30,
                        backgroundColor:"white", 
                        fontColor:"white",
                        justifyContent: 'flex-start'
                    }}
                    dropDownStyle={{backgroundColor: '#fafafa', zIndex:100}}
                    onChangeItem={item => setFeet(item.value)}
                    selectedLabelStyle={{
                        fontSize:20,
                        backgroundColor:"white", 
                        fontColor:"white",
                        justifyContent: 'flex-start',
                        fontWeight:'bold',
                        
                    }}
                    
                />
 {/* <TouchableOpacity 
 style = {{marginLeft:10,flexDirection:"row",justifyContent:"center", alignItems:"center",borderWidth:1, padding:10}}
 onPress = {() => {navigation.navigate('Inches')}}
 >
  <Text style = {{fontSize:24, marginRight:10}}>{inches}</Text>
  <TouchableOpacity style = {{flexDirection:"column",justifyContent:"center", alignItems:"center"}}>
  <AntDesign name="caretup" size={24} color="black" />
  <AntDesign name="caretdown" size={24} color="black" style = {{marginTop:-15}}/>
  </TouchableOpacity>  
 </TouchableOpacity> */}
 {/* <DropDownPicker
                    
                    items={[
                        {label: '0"', value: 0},
                        {label: '1"', value: 1},
                        {label: '2"', value: 2 },
                        {label: '3"', value: 3},
                        {label: '4"', value: 4},
                        {label: '5"', value: 5},
                        {label: '6"', value: 6},
                        {label: '7"', value: 7 },
                        {label: '8"', value: 8},
                        {label: '9"', value: 9},
                        {label: '10"', value: 10},
                        {label: '11"', value: 11},
                        
                        
                        

                
                      ]}
                    onPress = {() => {console.log("pressed")}}
                    selectedtLabelStyle={{
                         color: 'blue'
                     }}
                    placeholder = {'10 "'}
                    placeholderStyle={{
                         fontWeight: 'bold',
                         textAlign: 'center', 
                         fontSize:20,
                         color:'grey'
                     }}
                    arrowStyle={{marginRight: 10, size:20}}
                    containerStyle={{height: 70, width:100, justifyContent:"center"}}
                    style={{fontSize:40}}
                    itemStyle={{
                        fontSize:20,
                        backgroundColor:"white", 
                        fontColor:"white",
                        justifyContent: 'flex-start'
                    }}
                    activeLabelStyle = {{fontSize:20}}
                    activeItemStyle = {{fontSize:20}}
                    dropDownStyle={{backgroundColor: '#fafafa', zIndex:100}}
                    onChangeItem={item => setInches(item.value)}
                    selectedLabelStyle={{
                        fontSize:20,
                        backgroundColor:"white", 
                        fontColor:"white",
                        justifyContent: 'flex-start',
                        fontWeight:'bold'
                    }}
                    
                    
                /> */}


</View>
<Text style = {{marginBottom:20,marginLeft:17, marginTop:10, color:"grey", fontWeight:"bold"}}>Your height will be verified</Text>
<View style = {{borderBottomWidth:2, width:Dimensions.get('window').width - 60, marginTop:20}}/>
</View>
<View style = {{flex:0.3,justifyContent:"center", }}>
{/* <Continue backgroundColor = {"green"} onPress = {() => {navigation.navigate('Posted')}}/> */}
<Button
  title="Continue"
  type="outline"
  containerStyle = {{backgroundColor:"black",marginLeft:30, marginRight:30}}
  titleStyle = {{color:"white", fontWeight:"bold"}}
  disabledStyle = {{backgroundColor:"grey",}}
  onPress = {() => {_sendToServer(), _handleNavigation() }}
  disabled = {gate}
/>
</View>
</View>
)
}
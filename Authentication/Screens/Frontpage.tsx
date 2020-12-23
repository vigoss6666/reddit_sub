import * as React from 'react';
import { Text, View, StyleSheet, SafeAreaView, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Octicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface FrontPageProps {}

export default function Frontpage({navigation, route}) {
  console.log(route)
    return (
      
        <LinearGradient
          colors={["#e83342", "#c93a71", "#e83342"]}
          style={styles.container}
        >
         <View style = {{flex:0.5, justifyContent:'center', alignItems:'center', }}>   
         <View style = {{flexDirection:"row", justifyContent:"center", flex:0.5,alignItems:'center'}}>
         <Octicons name="broadcast" size={50} color="white" />
          <Text style = {{fontSize:25, marginLeft:5, color:'white'}}>Friends Help Friends</Text>   
         </View>
         </View>
        <View style = {{flex:0.5, justifyContent:'center', alignItems:'center'}}>
         <Text style = {{alignSelf:'center', color:'white', marginLeft:10, marginRight:10}}>
             By clicking Log In,you agree with our Terms. Learn how we process your data 
             in our Privacy Policy and Cookies Policy  
         </Text>
         <TouchableOpacity 
         style = {{flexDirection:"row", zIndex:100, marginTop:30, width:Dimensions.get('window').width - 30, backgroundColor:'white', height:40, borderRadius:20, alignItems:"center",justifyContent:"space-around",  }}
         onPress = {() => navigation.navigate('Phone') }
         >
          
         <MaterialCommunityIcons name="cellphone-message" size={30} color="black" />
         <Text style = {{fontWeight:'bold'}}>LOG IN WITH PHONE</Text>
         <Text></Text>


         </TouchableOpacity>  
         </View>
        </LinearGradient>
    );
  }
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",

    },
  });

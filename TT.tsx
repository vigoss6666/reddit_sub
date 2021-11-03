import  React, {useState,useRef,useEffect, useContext, useMemo} from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';


interface TTProps {}

function Namer({name}){
  const jumper = useMemo(() => {
    
    return <Text>Hello world</Text>
  }, [])
  


 return (
     <View style = {{justifyContent:'center'}}>
         {jumper}
     </View>
 )    

}

const TT = (props: TTProps) => {
    
  
  const [checker, setChecker] = useState(1); 
  
  return (
    <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
      <Namer name = {"huarara"}/>
      <TouchableOpacity onPress = {() => setChecker(checker + 1)}>
          <Text>Press me</Text>
          </TouchableOpacity >
    </View>
  );
};

export default TT;

const styles = StyleSheet.create({
  container: {}
});

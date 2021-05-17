import * as React from 'react';
import { Text, View, StyleSheet, Image, Dimensions } from 'react-native';

interface PointsRequiredProps {}

const PointsRequired = (props: PointsRequiredProps) => {
    const {width, height} = Dimensions.get('window'); 
  return (
    <View style={{flex:1}}>
      <View style = {{flex:0.8,}}>
     <Image source = {{uri:'https://firebasestorage.googleapis.com/v0/b/friends-365d0.appspot.com/o/Screenshot%202021-05-18%20at%201.45.32%20AM.png?alt=media&token=e7c1df6b-c273-4495-b892-4600492958f1'}} style = {{height:800, width:width - 40}}/>   
      </View>
      <View style = {{flex:0.2}}>

      </View>
    </View>
  );
};

export default PointsRequired;

const styles = StyleSheet.create({
  container: {}
});

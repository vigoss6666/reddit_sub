import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';

interface SplashScreenProps {}

const SplashScreen = (props: SplashScreenProps) => {
  return (
    <View style={styles.container}>
      <Text>Friends Loading</Text>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {flex:1, backgroundColor:'red', justifyContent:'center', alignItems:'center'}
});

import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';

interface GameEngineProps {}

const GameEngine = (props: GameEngineProps) => {
  return (
    <View style={styles.container}>
      <Text>GameEngine</Text>
    </View>
  );
};

export default GameEngine;

const styles = StyleSheet.create({
  container: {}
});

import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';

interface PointsErrorProps {}

const PointsError = (props: PointsErrorProps) => {
  return (
    <View style={styles.container}>
      <Text>PointsError</Text>
    </View>
  );
};

export default PointsError;

const styles = StyleSheet.create({
  container: {}
});

import  React, {useState,useRef,useEffect, useContext} from 'react';
import { Text, View, StyleSheet } from 'react-native';

interface ChatLatestProps {}

const ChatLatest = (props: ChatLatestProps) => {
  return (
    <View style={styles.container}>
      <Text>ChatLatest</Text>
    </View>
  );
};

export default ChatLatest;

const styles = StyleSheet.create({
  container: {}
});

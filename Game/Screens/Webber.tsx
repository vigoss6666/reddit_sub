import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

interface WebberProps {}

const Webber = ({route}) => {
    const {uri} = route.params.uri

    console.log(uri)
  return (
    <WebView source={{ uri: uri }} style={{ marginTop: 20 }} />
  );
};

export default Webber;

const styles = StyleSheet.create({
  container: {}
});

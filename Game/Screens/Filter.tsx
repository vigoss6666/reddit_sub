import { Text, View, StyleSheet } from 'react-native';
import React, { useState, useEffect, useRef, useCallback } from 'react';
// @refresh reset
interface FilterProps {}

const BrowseSettings = (props: FilterProps) => {
  return (
    <View style={styles.container}>
      <Text>Filter</Text>
    </View>
  );
};

export default BrowseSettings;

const styles = StyleSheet.create({
  container: {}
});

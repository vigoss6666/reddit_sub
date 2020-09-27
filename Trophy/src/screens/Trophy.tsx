import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import MaterialButtonViolet from "../components/MaterialButtonViolet";
import CupertinoSegmentWithThreeTabs from "../components/CupertinoSegmentWithThreeTabs";

function Untitled(props) {
  return (
    <View style={styles.container}>
      <MaterialButtonViolet
        style={styles.materialButtonViolet}
      ></MaterialButtonViolet>
      <CupertinoSegmentWithThreeTabs
        style={styles.cupertinoSegmentWithThreeTabs}
      ></CupertinoSegmentWithThreeTabs>
      <View style={styles.rect}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,1)"
  },
  materialButtonViolet: {
    height: 36,
    width: 253,
    marginTop: 716,
    alignSelf: "center"
  },
  cupertinoSegmentWithThreeTabs: {
    height: 56,
    width: 375,
    marginTop: -584
  },
  rect: {
    width: 311,
    height: 7,
    backgroundColor: "rgba(0,0,0,1)",
    borderWidth: 1,
    borderColor: "#000000",
    marginTop: 28,
    marginLeft: 34
  }
});

export default Untitled;

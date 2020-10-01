import React, { Component } from "react";
import { StyleSheet, View, ScrollView, Text } from "react-native";
import Icon from "react-native-vector-icons/Entypo";

export default function MatchView(props) {
  return (
    <View style={styles.container}>
      <View style={styles.scrollAreaRow}>
        <View style={styles.scrollArea}>
          <ScrollView
            contentContainerStyle={styles.scrollArea_contentContainerStyle}
          >
            <Text style={styles.loremIpsum2}>
              Charisma{"\n"}Charisma{"\n"}Charisma{"\n"}Charisma{"\n"}Charisma
              {"\n"}Charisma{"\n"}Charisma{"\n"}Charisma{"\n"}Charisma{"\n"}
              Charisma
            </Text>
          </ScrollView>
        </View>
        <View style={styles.loremIpsumColumn}>
          <Text style={styles.loremIpsum}>8.7</Text>
          <Text style={styles.compatibilitySxore}>Compatibility Score</Text>
        </View>
      </View>
      <View style={styles.rectStack}>
        <View style={styles.rect}></View>
        <Icon name="arrow-with-circle-down" style={styles.icon}></Icon>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  scrollArea: {
    width: 192,
    height: 290,
    backgroundColor: "rgba(230, 230, 230,1)"
  },
  scrollArea_contentContainerStyle: {
    height: 290,
    width: 192
  },
  loremIpsum2: {
    fontFamily: "roboto-regular",
    color: "#121212",
    marginTop: 36,
    marginLeft: 40
  },
  loremIpsum: {
    fontFamily: "roboto-regular",
    color: "#121212",
    height: 29,
    width: 115,
    fontSize: 28,
    marginLeft: 34
  },
  compatibilitySxore: {
    fontFamily: "roboto-regular",
    color: "#121212",
    fontSize: 13,
    marginTop: 19
  },
  loremIpsumColumn: {
    width: 149,
    marginLeft: 18,
    marginTop: 116,
    marginBottom: 111
  },
  scrollAreaRow: {
    height: 290,
    flexDirection: "row",
    marginTop: 290,
    marginLeft: 16
  },
  rect: {
    top: 21,
    width: 308,
    height: 4,
    position: "absolute",
    backgroundColor: "rgba(86,75,75,1)",
    left: 38
  },
  icon: {
    top: 0,
    left: 0,
    position: "absolute",
    color: "rgba(139,52,52,1)",
    fontSize: 40
  },
  rectStack: {
    width: 346,
    height: 46,
    marginTop: -352,
    marginLeft: 16
  }
});



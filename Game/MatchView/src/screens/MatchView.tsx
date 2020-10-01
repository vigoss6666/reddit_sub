import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import MaterialCommunityIconsIcon from "react-native-vector-icons/MaterialCommunityIcons";
import EntypoIcon from "react-native-vector-icons/Entypo";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import FeatherIcon from "react-native-vector-icons/Feather";
import MaterialButtonViolet7 from "../components/MaterialButtonViolet7";
import OcticonsIcon from "react-native-vector-icons/Octicons";
import EvilIconsIcon from "react-native-vector-icons/EvilIcons";

function MatchView(props) {
  return (
    <View style={styles.container}>
      <View style={styles.icon5ColumnRow}>
        <View style={styles.icon5Column}>
          <MaterialCommunityIconsIcon
            name="android-auto"
            style={styles.icon5}
          ></MaterialCommunityIconsIcon>
          <EntypoIcon name="emoji-happy" style={styles.icon6}></EntypoIcon>
        </View>
        <View style={styles.creativeColumn}>
          <Text style={styles.creative}>Creative</Text>
          <Text style={styles.funny2}>Funny</Text>
        </View>
        <Text style={styles.loremIpsum}>8.7</Text>
      </View>
      <View style={styles.icon7ColumnRow}>
        <View style={styles.icon7Column}>
          <FontAwesomeIcon
            name="handshake-o"
            style={styles.icon7}
          ></FontAwesomeIcon>
          <FeatherIcon name="dollar-sign" style={styles.icon8}></FeatherIcon>
        </View>
        <View style={styles.loremIpsum2StackColumn}>
          <View style={styles.loremIpsum2Stack}>
            <Text style={styles.loremIpsum2}></Text>
            <Text style={styles.trustworthy}>Trustworthy</Text>
          </View>
          <Text style={styles.wealthy}>Wealthy</Text>
        </View>
        <Text style={styles.compatibilitySxore}>Compatibility Sxore</Text>
      </View>
      <View style={styles.iconRow}>
        <EntypoIcon
          name="arrow-with-circle-down"
          style={styles.icon}
        ></EntypoIcon>
        <View style={styles.rect}></View>
      </View>
      <View style={styles.rect2}></View>
      <View style={styles.icon2Row}>
        <FeatherIcon name="alert-triangle" style={styles.icon2}></FeatherIcon>
        <Text style={styles.narcissism48}>Narcissism: 4.8</Text>
      </View>
      <MaterialButtonViolet7
        style={styles.materialButtonViolet7}
      ></MaterialButtonViolet7>
      <View style={styles.icon3Row}>
        <OcticonsIcon name="smiley" style={styles.icon3}></OcticonsIcon>
        <Text style={styles.intelligent}>Intelligent</Text>
      </View>
      <View style={styles.icon4Row}>
        <EntypoIcon name="heart-outlined" style={styles.icon4}></EntypoIcon>
        <Text style={styles.goodHearted}>Good Hearted</Text>
      </View>
      <View style={styles.icon9Row}>
        <EvilIconsIcon name="eye" style={styles.icon9}></EvilIconsIcon>
        <Text style={styles.goodLooking}>Good Looking</Text>
      </View>
      <View style={styles.icon10Row}>
        <EntypoIcon name="star" style={styles.icon10}></EntypoIcon>
        <Text style={styles.charismatic}>Charismatic</Text>
      </View>
      <View style={styles.icon11Row}>
        <MaterialCommunityIconsIcon
          name="alert"
          style={styles.icon11}
        ></MaterialCommunityIconsIcon>
        <Text style={styles.narcissistic}>Narcissistic</Text>
      </View>
      <View style={styles.icon12Row}>
        <EntypoIcon
          name="creative-commons-attribution"
          style={styles.icon12}
        ></EntypoIcon>
        <Text style={styles.antiSocial}>Anti-social</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  icon5: {
    color: "rgba(128,128,128,1)",
    fontSize: 20
  },
  icon6: {
    color: "rgba(128,128,128,1)",
    fontSize: 20, 
    marginTop:5
  },
  icon5Column: {
    width: 20
  },
  creative: {
    fontFamily: "roboto-regular",
    color: "#121212"
  },
  funny2: {
    fontFamily: "roboto-regular",
    color: "#121212",
    marginTop: 7
  },
  creativeColumn: {
    width: 60,
    marginLeft: 9,
    marginTop: 3,
    marginBottom: 4
  },
  loremIpsum: {
    fontFamily: "roboto-700",
    color: "#121212",
    height: 29,
    width: 115,
    fontSize: 28,
    marginLeft: 129,
    marginTop: 4, 
    fontWeight:"bold"
  },
  icon5ColumnRow: {
    height: 46,
    flexDirection: "row",
    marginTop: 351,
    marginLeft: 41,
    marginRight: 11
  },
  icon7: {
    color: "rgba(128,128,128,1)",
    fontSize: 20
  },
  icon8: {
    color: "rgba(128,128,128,1)",
    fontSize: 20,
    marginTop: 7,
    marginLeft: 5
  },
  icon7Column: {
    width: 25
  },
  loremIpsum2: {
    top: 8,
    left: 6,
    position: "absolute",
    fontFamily: "roboto-regular",
    color: "#121212"
  },
  trustworthy: {
    top: 0,
    left: 0,
    position: "absolute",
    fontFamily: "roboto-regular",
    color: "#121212",
    width:100
  },
  loremIpsum2Stack: {
    width: 74,
    height: 16
  },
  wealthy: {
    fontFamily: "roboto-regular",
    color: "#121212",
    fontSize: 14,
    marginTop: 13
  },
  loremIpsum2StackColumn: {
    width: 100,
    marginLeft: 5,
    marginBottom: 2
  },
  compatibilitySxore: {
    fontFamily: "roboto-700",
    color: "#121212",
    fontSize: 18,
    marginLeft: 49,
    marginTop: 8
  },
  icon7ColumnRow: {
    height: 47,
    flexDirection: "row",
    marginTop: 1,
    marginLeft: 38,
    marginRight: 26
  },
  icon: {
    color: "rgba(139,52,52,1)",
    fontSize: 40
  },
  rect: {
    width: 308,
    height: 4,
    backgroundColor: "rgba(86,75,75,1)",
    marginTop: 23
  },
  iconRow: {
    height: 46,
    flexDirection: "row",
    marginTop: -215,
    marginLeft: 16,
    marginRight: 11
  },
  rect2: {
    width: 308,
    height: 4,
    backgroundColor: "rgba(86,75,75,1)",
    marginTop: 367,
    marginLeft: 41
  },
  icon2: {
    color: "rgba(208,2,27,1)",
    fontSize: 34, 
    marginTop:5, 
    marginRight:-10
  },
  narcissism48: {
    fontFamily: "roboto-700",
    color: "#121212",
    fontSize: 17,
    marginLeft: 19,
    marginTop: 17
  },
  icon2Row: {
    height: 37,
    flexDirection: "row",
    marginTop: -55,
    marginLeft: 92,
    marginRight: 111
  },
  materialButtonViolet7: {
    height: 54,
    width: 270,
    backgroundColor: "rgba(174,208,2,1)",
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 3,
      height: 3
    },
    elevation: 5,
    shadowOpacity: 0.43,
    shadowRadius: 0,
    marginTop: 68,
    marginLeft: 52
  },
  icon3: {
    color: "rgba(128,128,128,1)",
    fontSize: 20
  },
  intelligent: {
    fontFamily: "roboto-regular",
    color: "#121212",
    fontSize: 14,
    marginLeft: 12,
    marginTop: 3
  },
  icon3Row: {
    height: 23,
    flexDirection: "row",
    marginTop: -450,
    marginLeft: 42,
    marginRight: 239
  },
  icon4: {
    color: "rgba(128,128,128,1)",
    fontSize: 20
  },
  goodHearted: {
    fontFamily: "roboto-regular",
    color: "#121212",
    marginLeft: 8,
    marginTop: 3
  },
  icon4Row: {
    height: 23,
    flexDirection: "row",
    marginLeft: 42,
    marginRight: 219
  },
  icon9: {
    color: "rgba(128,128,128,1)",
    fontSize: 20
  },
  goodLooking: {
    fontFamily: "roboto-regular",
    color: "#121212",
    marginLeft: 5
  },
  icon9Row: {
    height: 17,
    flexDirection: "row",
    marginTop: 108,
    marginLeft: 41,
    marginRight: 222
  },
  icon10: {
    color: "rgba(128,128,128,1)",
    fontSize: 20
  },
  charismatic: {
    fontFamily: "roboto-regular",
    color: "#121212",
    marginLeft: 6,
    marginTop: 3
  },
  icon10Row: {
    height: 23,
    flexDirection: "row",
    marginTop: 6,
    marginLeft: 40,
    marginRight: 234
  },
  icon11: {
    color: "rgba(128,128,128,1)",
    fontSize: 20
  },
  narcissistic: {
    fontFamily: "roboto-regular",
    color: "#121212",
    marginLeft: 6,
    marginTop: 3
  },
  icon11Row: {
    height: 23,
    flexDirection: "row",
    marginTop: 5,
    marginLeft: 40,
    marginRight: 236
  },
  icon12: {
    color: "rgba(128,128,128,1)",
    fontSize: 20
  },
  antiSocial: {
    fontFamily: "roboto-regular",
    color: "#121212",
    marginLeft: 5,
    marginTop: 3
  },
  icon12Row: {
    height: 23,
    flexDirection: "row",
    marginTop: 6,
    marginLeft: 41,
    marginRight: 244
  }
});

export default MatchView;

import  React, {useState,useRef,useEffect} from 'react';
import { Text, View, StyleSheet } from 'react-native';
import {Button} from 'react-native-elements'; 
interface BrowseMatchSettingsProps {}

const BrowseMatchSettings = ({navigation, route}) => {
  return (
    <View style={styles.container}>
        <View style = {{justifyContent:'center', alignItems:'center'}}>
        <Button title = {"send settings"} onPress = {() => navigation.navigate('MatchMakeLatest', {finalObject:
            {
            userId:"oumCZOCPbcILPlJcf4qB",
            creativity:1,  
            charisma:1, 
            }             
        })}/>
        </View>
    </View>
  );
};

export default BrowseMatchSettings;

const styles = StyleSheet.create({
  container: {flex:1}
});

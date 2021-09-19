import  React, {useState,useRef,useEffect, useContext} from 'react';
import { Text, View, StyleSheet,Image,Dimensions } from 'react-native';
import AppContext from '../../AppContext'; 
import AsyncStorage from '@react-native-async-storage/async-storage';

interface SignUpCompleteProps {}

const SignUpComplete = ({navigation}) => {
    const myContext = useContext(AppContext); 
    const [userPage, setUserPage] = useState(); 
    const { userId,computeName,CustomBackComponent,setUser,defaultDataObject,setProfilesAuth, setId} = myContext;

    useEffect(() => {
        navigation.setOptions({
            headerShown:false, 
        })
    }, [])

    const _handleGamer = () => {
  AsyncStorage.setItem('user', userId)
  setId(userId)
//   navigation.navigate('Homer', {screen:'Game'})
  navigation.reset({index:0, routes:[{name:"Homer"}]})
    }
    useEffect(() => {
        setTimeout(() => _handleGamer(), 3000)
    }, [])
  return (
    <View style={styles.container}>
      <Image source = {require('../../assets/complete.png')} style = {{height:Dimensions.get('window').height, width:Dimensions.get('window').width}} resizeMode = {'contain'}>

      </Image>
    </View>
  );
};

export default SignUpComplete;

const styles = StyleSheet.create({
  container: {flex:1,backgroundColor: 'white',}
});

import  React, {useState,useRef,useEffect} from 'react';
import { View, StyleSheet, Text, TextInput,TouchableOpacity,ScrollView,Image, Button,FlatList,Picker,PanResponder,Animated, TouchableWithoutFeedback, SafeAreaView, Dimensions, StatusBar, PixelRatio} from 'react-native';
import { useMutation,useQuery } from '@apollo/react-hooks';
import AppIntroSlider from 'react-native-app-intro-slider';
import {Continue} from '../../src/common/Common'; 
import { MaterialIcons } from '@expo/vector-icons';
export default function Intro({navigation,template}){
    const [sliderState, setSliderState] = useState({ currentPage: 0 });
    const { width, height } = Dimensions.get('window');
  
    const setSliderPage = (event: any) => {
      const { currentPage } = sliderState;
      const { x } = event.nativeEvent.contentOffset;
      const indexOfNextScreen = Math.floor(x / width );
      if (indexOfNextScreen !== currentPage) {
        setSliderState({
          ...sliderState,
          currentPage: indexOfNextScreen,
        });
      }
    };
  
    const { currentPage: pageIndex } = sliderState;

    const firstImage = 'https://storage.googleapis.com/nemesis-157710.appspot.com/Intro1.png'; 
    const secondImage = 'https://storage.googleapis.com/nemesis-157710.appspot.com/Intro2.png';
    const thirdImage = 'https://storage.googleapis.com/nemesis-157710.appspot.com/Intro3.png'; 
    const fourthImage = 'https://storage.googleapis.com/nemesis-157710.appspot.com/slide1.png'; 


   
    return (
      <>
        <StatusBar barStyle="dark-content" />
        
          <ScrollView
            style={{ flex:1, zIndex:1000}}
            horizontal={true}
            scrollEventThrottle={16}
            pagingEnabled={true}
            showsHorizontalScrollIndicator={false}
            onScroll={(event: any) => {
              setSliderPage(event);
            }}
          >
            <View style={{ width, height, }}>
            <View style = {{justifyContent:"center", alignItems:"center", marginTop:20}}>
            <MaterialIcons name="account-circle" size={50} color="grey" />
            <Text>Zaid shaikh</Text>
            </View>
            
              
            </View>
            <View style={{ width, height, }}>
            <View style = {{justifyContent:"center", alignItems:"center", marginTop:20}}>
            <MaterialIcons name="account-circle" size={50} color="grey" />
            <Text>Steve Jobs</Text>
            </View>
            
              
            </View>
            <View style={{ width, height, }}>
            <View style = {{justifyContent:"center", alignItems:"center", marginTop:20}}>
            <MaterialIcons name="account-circle" size={50} color="grey" />
            <Text>Fahim matto</Text>
            </View>
              
            </View>
            <View style={{ width, height, }}>
            <View style = {{justifyContent:"center", alignItems:"center", marginTop:20}}>
            <MaterialIcons name="account-circle" size={50} color="grey" />
            <Text>David Boctor</Text>
            </View>
              
            </View>
            <View style={{ width, height, }}>
            <View style = {{justifyContent:"center", alignItems:"center", marginTop:20}}>
            <MaterialIcons name="account-circle" size={50} color="grey" />
            <Text>Amy jackson</Text>
            </View>
            </View>
            
          </ScrollView>
          
          
          {/* <View style={styles.paginationWrapper}>
           
            {Array.from(Array(5).keys()).map((key, index) => (
              <View style={[styles.paginationDots, { opacity: pageIndex === index ? 1 : 0.2 }]} key={index} />
            ))}
            
          </View> */}
          
        
      </>
    );
}
const styles = StyleSheet.create({
    imageStyle: {
      height: PixelRatio.getPixelSizeForLayoutSize(135),
      width: '100%',
    },
    wrapper: {
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical: 30,
    },
    header: {
      fontSize: 30,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    paragraph: {
      fontSize: 17,
    },
    paginationWrapper: {
      position: 'absolute',
      top: 100,
      left: 0,
      right: 0,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
    },
    paginationWrapper1: {
        position: 'absolute',
        bottom: 100,
        left: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft:Dimensions.get('window').width /3 -15, 
        
      },
    paginationDots: {
      height: 10,
      width: 10,
      borderRadius: 10 / 2,
      backgroundColor: '#0898A0',
      marginLeft: 10,
    },
  });
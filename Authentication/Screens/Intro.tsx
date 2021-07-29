import  React, {useState,useRef,useEffect} from 'react';
import { View, StyleSheet, Text, TextInput,TouchableOpacity,ScrollView,Image, FlatList,Picker,PanResponder,Animated, TouchableWithoutFeedback, SafeAreaView, Dimensions, StatusBar, PixelRatio} from 'react-native';
import { useMutation,useQuery } from '@apollo/react-hooks';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AppIntroSlider from 'react-native-app-intro-slider';
import {Continue} from '../../src/common/Common'; 
import {Button} from 'react-native-elements'; 
export default function Intro({navigation}){
    const [sliderState, setSliderState] = useState({ currentPage: 0 });
    const { width, height } = Dimensions.get('window');
    const insets = useSafeAreaInsets();
  
    const setSliderPage = (event: any) => {
      const { currentPage } = sliderState;
      const { x } = event.nativeEvent.contentOffset;
      const indexOfNextScreen = Math.floor(x / width);
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
        <SafeAreaView style={{ flex: 1, paddingTop:insets.top, marginTop:40 }}>
          <ScrollView
            style={{ flex: 0.7,  }}
            horizontal={true}
            scrollEventThrottle={16}
            pagingEnabled={true}
            showsHorizontalScrollIndicator={false}
            onScroll={(event: any) => {
              setSliderPage(event);
            }}
          >
            <View style={{ width, height,backgroundColor:"#ffffff" }}>
              <Image source={{uri:'https://firebasestorage.googleapis.com/v0/b/friends-365d0.appspot.com/o/Screenshot%202021-06-14%20at%205.08.20%20PM.png?alt=media&token=c404a9ca-1044-47b8-a55b-4c5f287fa204'}} style={styles.imageStyle} />
              
            </View>
            <View style={{ width, height,backgroundColor:"#ffffff" }}>
              <Image
                source={{uri:fourthImage}}
                style={styles.imageStyle}
              />
              
            </View>
            <View style={{ width, height,backgroundColor:"#ffffff" }}>
              <Image
                source={{uri:'https://storage.googleapis.com/nemesis-157710.appspot.com/Intro3.png'}}
                style={styles.imageStyle}
              />
              
            </View>
            <View style={{ width, height,backgroundColor:"#ffffff" }}>
              <Image
                source={{uri:secondImage}}
                style={styles.imageStyle}
              />
            </View>
            
          </ScrollView>
          
          
          <View style={styles.paginationWrapper}>
           
            {Array.from(Array(4).keys()).map((key, index) => (
              <View style={[styles.paginationDots, { opacity: pageIndex === index ? 1 : 0.2 }]} key={index} />
            ))}
            
          </View>
          <View style = {{ flex:0.3, backgroundColor:"#ffffff"}}>
          
          <Button containerStyle = {{ marginLeft:30,marginRight:30,backgroundColor:'black'  }} title = {"Continue"} onPress = {() => navigation.navigate('Phone')} type = {'outline'} titleStyle = {{color:'white', fontWeight:'bold'}}/>
          
          
          </View>
          
        </SafeAreaView>
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
      bottom: 300,
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
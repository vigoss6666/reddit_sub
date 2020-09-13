import  React, {useState,useRef,useEffect} from 'react';
import { View, StyleSheet, Text, TextInput,TouchableOpacity,ScrollView,Image, Button,FlatList,Picker,PanResponder,Animated, TouchableWithoutFeedback, SafeAreaView} from 'react-native';
import { useMutation,useQuery } from '@apollo/react-hooks';
import { SliderBox } from "react-native-image-slider-box";

export default function ImageSlider({navigation}){
    
     const setIndexerReducer = (indexer) => {
     images.splice(indexer,1);     
    }
    const [indexer, setIndexer] = useState();  
    const images = [
        "https://source.unsplash.com/1024x768/?nature",
        "https://source.unsplash.com/1024x768/?water",
        "https://source.unsplash.com/1024x768/?girl",
        "https://source.unsplash.com/1024x768/?tree", 
        ]
return(
<View style = {{flex:1,  backgroundColor:"black" }}>
<TouchableOpacity onPress = {() => setIndexerReducer()}>
<Text style = {{color:"white", marginTop:100, fontSize:100}}>{indexer}</Text>
</TouchableOpacity>
<SliderBox 
images = {images} 
style = {{height:400, }}
currentImageEmitter={index => setIndexer(index)}
/>
</View>
)
}
import  React, {useState,useRef,useEffect} from 'react';
import { View, StyleSheet, Text, TextInput,TouchableOpacity,ScrollView,Image, Button,FlatList,Picker,PanResponder,Animated, TouchableWithoutFeedback, SafeAreaView, Dimensions} from 'react-native';
import { useMutation,useQuery } from '@apollo/react-hooks';
import { MaterialIcons } from '@expo/vector-icons';
export default function CustomSlider({navigation,names = ['zaid', 'zaheer']}){
    const [sliderState, setSliderState] = useState({ currentPage: 0 });
    const { width, height } = Dimensions.get('window');
    
  
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
    const sliderTemplate = names.map(val => (
      <View style={{ width,  height, }} key = {val}>
      <View style = {{ alignItems:"center", marginTop:20}}>
      <MaterialIcons name="account-circle" size={75} color="black" />
      <Text style = {{fontWeight:"bold"}}>{ val }</Text>
      </View>
      </View>
  ))
  
    const { currentPage: pageIndex } = sliderState;

return(
<View style = {{flex:1, justifyContent:'center', alignItems:'center'}}>
<ScrollView
horizontal = {true}
pagingEnabled = {true}
scrollEventThrottle={16}
style = {{flex:1}}
>
{sliderTemplate}
</ScrollView>
</View>
)
}    
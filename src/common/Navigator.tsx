import  React, {useState,useRef,useEffect} from 'react';
import { View, StyleSheet, Text, TextInput,TouchableOpacity,ScrollView,Image, Button,FlatList,Picker,PanResponder,Animated, TouchableWithoutFeedback, SafeAreaView} from 'react-native';
import { useMutation,useQuery } from '@apollo/react-hooks';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Chat from '../../Chat/Screens/Chat';  

export const Tab = createMaterialTopTabNavigator();
       function MyTabs() {
         return (
           <Tab.Navigator>
             <Tab.Screen name="Home" component={Chat} />
             <Tab.Screen name="Settings" component={Chat} />
             <Tab.Screen name="Settings" component={Chat} />
             <Tab.Screen name="Settings" component={Chat} />
             <Tab.Screen name="Settings" component={Chat} />
           </Tab.Navigator>
         );
       }
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import React, { useState, useEffect, useRef } from 'react';
import { Text, View, Button, Platform } from 'react-native';
import { AudioGetter } from '../../src/common/Common'; 





export default function Tester1({navigation}) {
    
  
    return (
     <View>
         <AudioGetter audio = "https://firebasestorage.googleapis.com/v0/b/friends-365d0.appspot.com/o/audio%2Fnamer1?alt=media&token=0551ba16-db5c-4374-8e25-817dfd2025cd"/>
     </View>
    );
  }
  
  
  
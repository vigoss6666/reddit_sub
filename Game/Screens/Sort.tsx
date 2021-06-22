import React, { useState, useEffect, useRef, createContext, useContext, useCallback  } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import AppContext from '../../AppContext';
// @refresh reset
import DraggableFlatList, {
    RenderItemParams,
  } from 'react-native-draggable-flatlist'; 


interface SortProps {}
const NUM_ITEMS = 9;

function getColor(i: number) {
  const multiplier = 255 / (NUM_ITEMS - 1);
  const colorVal = i * multiplier;
  return `rgb(${colorVal}, ${Math.abs(128 - colorVal)}, ${255 - colorVal})`;
}

const exampleData: Item[] = [
    
    {
     key:'namer', 
     label:'Creativity', 
     backgroundColor:'black'
    },
    {
        key:'namer1', 
        label:'Charisma', 
        backgroundColor:'black'
    },
    {
        key:'namer2', 
        label:'Honest', 
        backgroundColor:'black'
    },
    {
        key:'namer3', 
        label:'Looks', 
        backgroundColor:'black'
    },
    {
        key:'namer4', 
        label:'Empathetic', 
        backgroundColor:'black'
    },
    {
        key:'namer5', 
        label:'Humor', 
        backgroundColor:'black'
    },
    {
        key:'namer6', 
        label:'Status', 
        backgroundColor:'black'
    },
    {
        key:'namer7', 
        label:'Wealthy', 
        backgroundColor:'black'
    },


]

type Item = {
  key: string;
  label: string;
  backgroundColor: string;
};

const Sort = ({navigation, route}) => {
    const myContext = useContext(AppContext);
    const {client} = route.params; 
    const {clientFilter, setClientFilter, CustomBackComponent} = myContext;
    const [data, setData] = useState(exampleData);
    const [currentClientFilter, setCurrentClientFilter] = useState({});
    const [sortData, setSortData] = useState([]); 
    const [clientIndex, setClientIndex] = useState(); 
    
    
    


    useEffect(() => {
      const index = clientFilter.findIndex(val => val.client == client.phoneNumber); 
      setClientIndex(index); 
      setCurrentClientFilter(clientFilter[index]); 
      const result = clientFilter[index].sortOrder.map(val => {
         return Object.assign({}, {key:val,label:val, backgroundColor:'black' }) 
         
      })
      setSortData(result); 

    }, [client])


    useEffect(() => {
      navigation.setOptions({
        headerTitle:false, 
        headerLeft:() => <CustomBackComponent navigation = {navigation}/>
      })
    }, [])

    useEffect(() => {
       if(sortData.length){
        const result = sortData.map(val => val.label); 
        const copy = JSON.parse(JSON.stringify(clientFilter)); 
        copy[clientIndex].sortOrder = result; 
        setClientFilter(copy);

       }
       

    }, [sortData])


    const setClientSort = () => {
       const result = sortData.map(val => val.label); 
       const copy = JSON.parse(JSON.stringify(clientFilter)); 
       copy[clientIndex].sortOrder = result; 
       setClientFilter(copy); 

    }

    const renderItem = useCallback(
      ({ item, index, drag, isActive }: RenderItemParams<Item>) => {
        return (
          <TouchableOpacity
            style={{
              height: 100,
              backgroundColor: isActive ? 'red' : item.backgroundColor,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onLongPress={drag}>
            <Text
              style={{
                fontWeight: 'bold',
                color: 'white',
                fontSize: 32,
              }}>
              {item.label}
            </Text>
          </TouchableOpacity>
        );
      },
      []
    );
  
    return (
      <View style={{ flex: 1 }}>
        <CustomBackComponent navigation = {navigation}/>
      <DraggableFlatList
          data={sortData}
          renderItem={renderItem}
          keyExtractor={(item, index) => `draggable-item-${item.key}`}
          onDragEnd={({ data }) => setSortData(data)}
        />
      </View>
    );
  }
  


export default Sort;

const styles = StyleSheet.create({
  container: {}
});

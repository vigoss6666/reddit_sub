import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
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

const Sort = (props: SortProps) => {
    const [data, setData] = useState(exampleData);

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
        <DraggableFlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item, index) => `draggable-item-${item.key}`}
          onDragEnd={({ data }) => setData(data)}
        />
      </View>
    );
  }
  


export default Sort;

const styles = StyleSheet.create({
  container: {}
});

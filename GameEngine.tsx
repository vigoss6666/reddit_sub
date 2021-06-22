import  React, {useState,useRef,useEffect, useContext, useLayoutEffect, useCallback, forwardRef, createRef} from 'react';
import { Text, View, StyleSheet, StatusBar, Image } from 'react-native';
import { GameEngine } from "react-native-game-engine";

function Finger({position}) {
  
    const x = position[0] - RADIUS / 2;
    const y = position[1] - RADIUS / 2;
    return (
      // <View style={[styles.finger, { left: x, top: y }]} />
     <View>
     <Text>Anna Haro</Text>  
     <Image source = {{uri:'https://i.pinimg.com/originals/1d/df/a9/1ddfa98a7e262b691614bc30923a40d5.jpg'}} style = {{height:100, width:100,borderRadius:50,   left:x,top:y }}/>
     
     </View> 
    );
  
}
const MoveFinger = (entities, { touches }) => {

  touches.filter(t => t.type === "move").forEach(t => {
    let finger = entities[t.id];
    console.log(t.id)
    console.log("x"+finger.position[0])
    console.log("y"+finger.position[1])
    // if(finger.position[0] == 170 && finger.position[1]){
    //   console.log("in drag area")
    // }
    if (finger && finger.position) {
      finger.position = [
        finger.position[0] + t.delta.pageX,
        finger.position[1] + t.delta.pageY
      ];
    }
  });

  return entities;
};

interface GameEngineProps {}
const RADIUS = 20; 
const GoodGame = (props: GameEngineProps) => {
  
  return (
    <GameEngine
    style={styles.container}
    systems={[MoveFinger]}
    entities={{
      1: { position: [40,  200], renderer: <Finger position = {[40,  200]}/>}, //-- Notice that each entity has a unique id (required)
      2: { position: [100, 200], renderer: <Finger position = {[100,  200]}/>}, //-- and a renderer property (optional). If no renderer
      // 3: { position: [160, 200], renderer: <Finger />}, //-- is supplied with the entity - it won't get displayed.
      // 4: { position: [220, 200], renderer: <Finger />},
      // 5: { position: [280, 200], renderer: <Finger />}
    }}>
       <StatusBar hidden={true} />

</GameEngine>
  );
};

export default GoodGame;

const styles = StyleSheet.create({
  finger: {
    borderColor: "#CCC",
    borderWidth: 4,
    borderRadius: RADIUS * 2,
    width: RADIUS * 2,
    height: RADIUS * 2,
    backgroundColor: "pink",
    position: "absolute"
  }
});
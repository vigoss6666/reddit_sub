import React, { useState, useEffect, useRef, createContext, useContext, } from 'react';
import { Text, View, StyleSheet, StatusBar, } from 'react-native';
import Matter from "matter-js";
import { GameEngine } from "react-native-game-engine";

interface GameProps {}

const Game = (props: GameProps) => {
  let engine = Matter.Engine.create({enableSleeping: false});
  let world = engine.world;
  world.gravity.y = 0.25;
  const boxSize = 50;
  const gameEngine = useRef().current; 
  let bird = Matter.Bodies.rectangle( 100, 100, 50, 50);
  return (
    <View style={styles.container}>
      <GameEngine
      style = {styles.gameContainer}
          ref={ref => gameEngine}
          entities = {{
            physics: {engine: engine, world: world},
            bird:{body:bird, size: [50, 50], color: 'red', }
          }}
          
          
          running={false}>
          <StatusBar hidden={true} />
        </GameEngine>
    </View>
  );
};

export default Game;

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#fff',
  },
  gameContainer: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
  },
});

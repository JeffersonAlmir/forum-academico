import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity,} from 'react-native';

export type ButtonProps={
  handleNavigation:()=> void;
}

export default function CreateDepButton({handleNavigation}:ButtonProps){

  return(
    <View style={styles.container} >
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => handleNavigation()}
        activeOpacity={0.7}
      >
        <Text style={styles.text}>+</Text>
      </TouchableOpacity>
    </View>
  )
} 

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    left:140,
  },
  button: {
    width: 54,
    height: 54,
    borderRadius: 27, 
    backgroundColor: '#53AEE0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 24, 
    textAlign: 'center',         
    },
});


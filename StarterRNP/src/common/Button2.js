import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const Button2 = ({ props, onPress, text, backgroundColor, textColor }) => {
  return (
      <TouchableOpacity
        onPress={onPress}
        style={[styles.button, {backgroundColor: backgroundColor}]}>
        <Text style={[styles.text, {color: textColor}]}>{text}
        </Text>
      </TouchableOpacity>
  )
}
const styles={
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0,
    borderColor: 'transparent',
    borderRadius: 30,
    width: 130,
    height: 55,
    overflow: 'hidden',
    opacity:0.8,
    marginTop: 15,
    marginRight: 5,
    marginLeft: 5
  },
  text:{
    alignSelf:'center',
    fontSize:16,
    fontWeight:'bold',
    paddingTop:10,
    paddingBottom:10,
    backgroundColor:'transparent',
    opacity: 0.8
  }
}

export {Button2} ;

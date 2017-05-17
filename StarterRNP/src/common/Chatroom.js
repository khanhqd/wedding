import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';

const Chatroom = ({ name, description, onPress }) => {
  return(
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={styles.avatarContainer}>

      </View>
      <View style={styles.contentBox}>
        <Text style={styles.name}>Phòng: {name}
        </Text>
        <Text style={styles.description}>Mô tả: {description}
        </Text>
      </View>
      <View style={styles.icon}>

      </View>
    </TouchableOpacity>
  )
}
const styles = {
  container: {
    flexDirection: 'row',
    height: 120,
    backgroundColor: 'white',
    borderColor: '#eee',
    borderBottomWidth: 1,
    borderRadius: 15,
    padding: 10,
    marginTop: 5,
    marginBottom: 10,
    marginLeft: 15,
    marginRight: 15,
    elevation: 3
  },
  avatarContainer: {
    flex: 1,
  },
  contentBox: {
    flex: 4
  },
  icon: {
    flex: 0.5
  },
  name: {
    fontWeight: 'bold',
    fontSize: 18
  },
  description: {
    fontSize: 15
  }
};
export { Chatroom };

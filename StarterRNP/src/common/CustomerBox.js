import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';

const CustomerBox = ({ name, phone, note }) => {
  return(
    <TouchableOpacity style={styles.container}>
      <View style={styles.avatarContainer}>

      </View>
      <View style={styles.contentBox}>
        <Text style={styles.name}>{name}
        </Text>
        <Text style={styles.phone}>SĐT: {phone}
        </Text>
        <Text style={styles.phone}>Ghi chú: {note}
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
    height: 100,
    backgroundColor: 'white',
    borderColor: '#eee',
    borderBottomWidth: 1,
    padding: 10
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
    fontSize: 16
  },
  phone: {
    fontSize: 14
  }
};
export { CustomerBox };

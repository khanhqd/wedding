import React from 'react';
import { View, Text, Dimensions, Platform, TouchableOpacity } from 'react-native';
var {height, width} = Dimensions.get('window');

const NewsItem = ({ title, date }) => {
    return (
      <View style={styles.container}>
        <View style={styles.leftBox}>
          <Text style={styles.title}>{title}
          </Text>
        </View>
        <View style={styles.rightBox}>
          <Text
          numberOfLines={2}
          ellipsizeMode="tail"
          style={styles.date}>{date}
          </Text>
        </View>
      </View>
    )
}
const styles={
  container: {
    width: '100%',
    height: 80,
    borderBottomWidth: 1,
    borderColor: 'rgba(199, 199, 199, 0.84)',
    paddingLeft: 15,
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  leftBox: {
    justifyContent: 'center',
    flex: 5,
    paddingTop: 15,
    paddingBottom: 15
  },
  rightBox: {
    justifyContent: 'flex-end',
    width: 80,
    alignItems: 'center',
    paddingTop: 15,
    paddingBottom: 15,
    paddingRight: 10
  },
  title: {
    fontWeight: '500',
    fontSize: 15
  },
  date: {
    fontSize: 13,
    color: 'grey'
  },
  info1: {
    flexDirection: 'row'
  }
}
export { NewsItem }

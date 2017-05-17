import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  AsyncStorage,
  Dimensions,
  PushNotificationIOS,
  StatusBar
} from 'react-native';
var {height, width} = Dimensions.get('window');
var PushNotification = require('react-native-push-notification');
import { Navigation } from 'react-native-navigation';
import { Button2 } from '../common';
import PhotoView from 'react-native-photo-view';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class ImageAlbum extends Component {
  static navigatorStyle = {
    navBarHidden: true
  }
  constructor(props) {
    super(props);
    this.state = {
      openModal: false,
      phoneOrder: ''
    }
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
      <StatusBar hidden={true} />
        <View style={{ height: 50, width: width, padding: 20, alignSelf: 'flex-start' }}>
          <TouchableOpacity
          onPress={() => {
            this.props.navigator.pop({
            animated: true
          })}}
          style={styles.buttonNav}>
            <Icon
              name="reply"
              style={styles.actionButtonIcon} />
          </TouchableOpacity>
        </View>
        <PhotoView
          source={{ uri: this.props.data }}
          minimumZoomScale={1}
          maximumZoomScale={3}
          androidScaleType="center"
          onLoad={() => console.log("Image loaded!")}
          style={{ width: width, height: height, position: 'absolute', alignItems: 'center', justifyContent: 'center'}} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: 'center',
    width: width,
    height: height,
    position: 'absolute'
  },
  actionButtonIcon: {
    fontSize: 22,
    height: 22,
    color: 'black',
  },
  buttonNav: {
    height: 50
  }
});

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
  StatusBar,
  ListView
} from 'react-native';
var {height, width} = Dimensions.get('window');
var PushNotification = require('react-native-push-notification');
import { Navigation } from 'react-native-navigation';
import { Button2 } from '../common';
import { firebaseApp } from '../app.js';
import Grid from 'react-native-grid-component';
import Modal from 'react-native-simple-modal';

export default class Album extends Component {
  static navigatorButtons = {
    leftButtons: [{
      icon: require('../../img/back-icon.png'),
      id: 'back'
    }],
  };
  static navigatorStyle = {
    navBarBackgroundColor: 'rgb(203, 51, 10)',
    navBarTextColor: 'white',
    navBarSubtitleTextColor: '#ff0000',
    navBarButtonColor: '#ffffff',
    statusBarTextColorScheme: 'light',
    tabBarBackgroundColor: '#4dbce9',
    tabBarButtonColor: '#ffffff',
    tabBarSelectedButtonColor: '#ffff00'
  };
  constructor(props) {
    super(props);
    this.state = {
      openModal: false,
      phoneOrder: '',
      contentSource: new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2})
    }
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    this.items = [];
    this.itemsRef = firebaseApp.database().ref("Album");
  }
  componentDidMount() {
    this.itemsRef.on('child_added',(dataSnapshot) => {
      this.items.push({
        id: dataSnapshot.key,
        link:dataSnapshot.val().link,
      });
      this.setState({
        contentSource: this.state.contentSource.cloneWithRows(this.items),
      })
    });
  }
  onNavigatorEvent(event) {
    if (event.id === 'back') {
      this.props.navigator.pop({
        animated: true
      });
    }
  }
  _renderItem = (data, i) => {
    Url = require('../../img/image-button2.jpg')
    return (
      <TouchableOpacity onPress={() => {
        this.props.navigator.push({
          screen: 'screen.ImageAlbum',
          animated: true,
          passProps: { data: data.link }
        });
      }} style={styles.item} key={i}>
        <Image source={{ uri: data.link}} resizeMode="cover" style={styles.itemImage}/>
      </TouchableOpacity>
    )
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar hidden={true} />
        <Grid
          style={styles.list}
          renderItem={this._renderItem}
          data={this.items}
          itemsPerRow={2}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row'
  },
  items: {
    flex: 1,
    margin: 5,
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 15
  },
  background: {
    flex: 1,
    alignItems: 'center',
    width: width,
    height: height-100,
    position: 'absolute'
  },
  item: {
    flex: 1,
    height: width/2,
    margin: 1,
  },
  itemImage: {
    flex: 1,
    height: width/2,
    width: width/2
  },
  list: {
    flex: 1
  },
});

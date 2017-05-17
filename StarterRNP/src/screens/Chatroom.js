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
  ListView,
  StatusBar
} from 'react-native';
var {height, width} = Dimensions.get('window');
var PushNotification = require('react-native-push-notification');
import { Navigation } from 'react-native-navigation';
import { Spinner, Input, Button2 } from '../common';
import { firebaseApp } from '../app.js';

export default class Chatroom extends Component {
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
      newContent: '',
      loading: false,
      contentSource: new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2})
    }
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    this.items = [];
    this.itemsRef = firebaseApp.database().ref("Chatroom");
  }
  onNavigatorEvent(event) {
    if (event.id === 'back') {
      this.props.navigator.pop({
        animated: true
      });
    }
  }
  addContent() {
    if(this.state.newContent != '') {
      this.itemsRef.child(this.props.roomID).child('/content').push({
        content: this.state.newContent,
        name: this.props.chatName
      })
      this.setState({
        newContent: '',
        openModal:false
      })
    }
  }
  componentDidMount() {
    this.itemsRef.child(this.props.roomID).child('/content').on('child_added',(dataSnapshot) => {
      this.setState({
        loading: true
      });
      this.items.push({
        id: dataSnapshot.key,
        name:dataSnapshot.val().name,
        content:dataSnapshot.val().content
      });
      if (dataSnapshot != null) {
        this.setState({
          contentSource: this.state.contentSource.cloneWithRows(this.items),
          loading: false
        })
      } else {
        this.setState({
          loading: false
        })
      }
    });
  }
  loading() {
    if (this.state.loading) {
      return (
        <Spinner />
      )
    } else {
      return (
        <ListView
          dataSource={this.state.contentSource}
          enableEmptySections={true}
          renderRow={this.renderRow.bind(this)}/>
      )
    }
  }
  renderRow(rowData) {
      return (
        <View style={{ flexDirection: 'row', padding: 5, paddingTop:1, marginLeft: 10, marginRight: 10 }}>
          <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'black' }}>{rowData.name}
          </Text>
          <Text style={{ fontSize: 15, color: 'black' }}>:   {rowData.content}
          </Text>
        </View>
      );
    }
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <StatusBar hidden={true} />
        <View style={{ flex: 6, paddingRight: 10 }}>
          {this.loading()}
        </View>
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', margin: 5, padding: 5 }}>
          <View style={{ flex: 6 }}>
            <Input
              title="Chat:"
              value={this.state.newContent}
              onChangeText={(newContent) => this.setState({ newContent })}
              placeholder="...."/>
          </View>
          <View style={{ flex: 1, height: 100 }}>
            <TouchableOpacity
              onPress={() => this.addContent()}
              style={styles.button}>
              <Text style={styles.text}>Gửi
              </Text>
            </TouchableOpacity>
          </View>
        </View>
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
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0,
    borderColor: 'transparent',
    borderRadius: 30,
    overflow: 'hidden',
    marginTop: 15,
    marginRight: 5,
    marginLeft: 5,
    backgroundColor: "rgb(203, 51, 10)"
  },
  text:{
    color: "white",
    alignSelf:'center',
    fontSize:16,
    fontWeight:'bold',
    paddingTop:10,
    paddingBottom:10,
    backgroundColor:'transparent',
  }
});

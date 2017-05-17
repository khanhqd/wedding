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
  Alert,
  StatusBar
} from 'react-native';
var {height, width} = Dimensions.get('window');
var PushNotification = require('react-native-push-notification');
import { Navigation } from 'react-native-navigation';
import Modal from 'react-native-simple-modal';
import { Input, Button2 } from '../common';

export default class Home extends Component {
  static navigatorStyle = {
    navBarBackgroundColor: '#607797',
    navBarTextColor: 'white',
    statusBarTextColorScheme: 'light',
    navBarHidden: true,
  };
  constructor(props) {
    super(props);
    this.state = {
      openModal: false,
      chatName: '',
    };
  }
  toChatroom() {
    if (this.state.chatName != '') {
      this.props.navigator.push({
        title: "Chọn phòng chat",
        screen: 'screen.RoomSelect',
        animated: true,
        passProps: { chatName: this.state.chatName }
      });
    } else {
      Alert.alert("Vui lòng nhập tên")
    }
  }
  toFriendList() {
    this.props.navigator.push({
      title: "Danh sách",
      screen: 'screen.FriendList',
      animated: true,
    });
  }
  toAlbum() {
    this.props.navigator.push({
      title: "Album",
      screen: 'screen.Album',
      animated: true,
    });
  }
  toDating() {
    this.props.navigator.push({
      title: "Lịch trình",
      screen: 'screen.Dating',
      animated: true,
    });
  }
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>

        <View style={styles.container}>
          <TouchableOpacity style={styles.items}
          onPress={() => {this.toFriendList()}}>
            <Image
            source={require('../../img/image-button.jpg')}
            style={styles.imageButton}
            resizeMode="cover">
              <Text style={styles.title}>Danh sách khách mời
              </Text>
            </Image>
          </TouchableOpacity>
          <TouchableOpacity style={styles.items}
          onPress={() => {this.setState({openModal: true})}}>
            <Image
            source={require('../../img/image-button2.jpg')}
            style={styles.imageButton}
            resizeMode="cover">
              <Text style={styles.title}>Phòng chat
              </Text>
            </Image>
          </TouchableOpacity>
        </View>
        <View style={styles.container}>
          <TouchableOpacity style={styles.items}
          onPress={() => {this.toAlbum()}}>
            <Image
            source={require('../../img/image-button3.jpg')}
            style={styles.imageButton}
            resizeMode="cover">
              <Text style={styles.title}>Album ảnh
              </Text>
            </Image>
          </TouchableOpacity>
          <TouchableOpacity style={styles.items}
          onPress={() => {this.toDating()}}>
            <Image
            source={require('../../img/image-button4.jpg')}
            style={styles.imageButton}
            resizeMode="cover">
              <Text style={styles.title}>Lịch trình
              </Text>
            </Image>
          </TouchableOpacity>
        </View>
        <Modal
            open={this.state.openModal}
            modalDidOpen={() => console.log('modal did open')}
            modalDidClose={() => this.setState({openModal: false})}
            closeOnTouchOutside={true}
            style={{alignItems: 'center'}}>
            <View >
               <Text style={{fontSize: 20, marginBottom: 10, fontWeight:'bold'}}>Vui lòng nhập bút danh:</Text>
                <Input
                  title="Bút danh:"
                  value={this.state.chatName}
                  onChangeText={(chatName) => this.setState({ chatName })}
                  placeholder="Dương Quá"/>
                <View style={{flexDirection:'row', alignSelf: 'center'}}>
                  <Button2
                    textColor="white"
                    backgroundColor = "rgb(203, 51, 10)"
                    text="Cancel"
                    onPress={() => {this.setState({openModal: false})}}/>
                  <Button2
                    textColor="white"
                    backgroundColor = "rgb(203, 51, 10)"
                    text="OK"
                    onPress={() => this.toChatroom()}/>
                </View>
            </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  items: {
    flex: 1,
    margin: 5,
    borderColor: 'transparent',
    borderWidth: 1,
    borderRadius: 10,
  },
  imageButton: {
    height: height/2-10,
    width: width/2-10,
  },
  title: {
    fontSize: 18,
    color: 'rgb(203, 51, 10)',
    backgroundColor: 'white',
    borderRadius: 5,
    alignSelf: 'center',
    margin: 5,
    opacity: 0.8,
    fontWeight: 'bold'
  }
});

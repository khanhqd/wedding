import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  ScrollView,
  Image,
  TouchableOpacity,
  AsyncStorage,
  Dimensions,
  ListView,
  StatusBar,
  Alert
} from 'react-native';
var {height, width} = Dimensions.get('window');
var PushNotification = require('react-native-push-notification');
import { Navigation } from 'react-native-navigation';
import { Spinner, Input, Button2, Chatroom, CreateRoom, Button3 } from '../common';
import { firebaseApp } from '../app.js';
import ActionButton from 'react-native-action-button';
import Modal from 'react-native-simple-modal';
import Icon from 'react-native-vector-icons/Ionicons';

export default class RoomSelect extends Component {
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
      loading: true,
      nameAdded: '',
      descriptionAdded: '',
      passState: 'OFF',
      pass: '',
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
  addRoom() {
    if(this.state.nameAdded != '') {
      this.itemsRef.push({
        name: this.state.nameAdded,
        host: this.props.chatName,
        description: this.state.descriptionAdded,
      })
      this.setState({
        openModal:false
      })
    }
  }
  componentDidMount() {
    this.itemsRef.on('child_added',(dataSnapshot) => {
      this.items.push({
        id: dataSnapshot.key,
        name:dataSnapshot.val().name,
        description:dataSnapshot.val().description
      });
      this.setState({
        contentSource: this.state.contentSource.cloneWithRows(this.items),
        loading: false
      })
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
  modal() {
    return (
      <View >
         <Text style={{fontSize: 20, marginBottom: 10, fontWeight:'bold'}}>Tạo phòng mới:</Text>
          <CreateRoom
            name={this.state.nameAdded}
            onChangeTextName={(nameAdded) => this.setState({ nameAdded })}
            description={this.state.descriptionAdded}
            onChangeTextDescription={(descriptionAdded) => this.setState({ descriptionAdded })}/>
          <View style={styles.passBox}>
            <TextInput
              placeholder="Nhập mật khẩu (nếu cần)"
              style={styles.input}
              value={this.state.pass}
              onChangeText={(pass) => this.setState({ pass })}/>
            <Button3
              title={this.state.passState}
              onPress={() => { this.passSwitch(); }}
            />
          </View>
          <View style={{flexDirection:'row', alignSelf: 'center'}}>
            <Button2
              textColor="white"
              backgroundColor = "rgb(203, 51, 10)"
              text="Hủy"
              onPress={() => {this.setState({openModal: false})}}/>
            <Button2
              textColor="white"
              backgroundColor = "rgb(203, 51, 10)"
              text="Tạo"
              onPress={() => this.addRoom()}/>
          </View>
      </View>
    )
  }
  renderRow(data) {
      return (
        <Chatroom
          onPress={() => {
            this.props.navigator.push({
              title: data.name,
              screen: 'screen.Chatroom',
              passProps: { roomID: data.id ,chatName: this.props.chatName, }
            });
          }}
          name={data.name}
          description={data.description}/>
      );
    }
  passSwitch() {
      if (this.state.passState == 'OFF') {
        this.setState({
          passState: 'ON',
        });
        Alert.alert("Đã đặt pass là: "+ this.state.pass)
      } else {
        this.setState({ passState: 'OFF' });
        Alert.alert("Đã hủy pass");
      }
  }
  render() {
    return (
      <View style={styles.container}>
        <StatusBar hidden={true} />
        <View style={{ flex: 6, paddingRight: 10 }}>
          {this.loading()}
        </View>
        <ActionButton buttonColor="rgb(203, 51, 10)">
          <ActionButton.Item buttonColor="#32B34E" title="Tạo phòng"
          onPress={() => {this.setState({ openModal: true })}}>
            <Icon name="md-create" style={styles.actionButtonIcon} />
          </ActionButton.Item>
        </ActionButton>
        <Modal
            open={this.state.openModal}
            modalDidOpen={() => console.log('modal did open')}
            modalDidClose={() => this.setState({openModal: false})}
            closeOnTouchOutside={true}
            style={{alignItems: 'center'}}>
            {this.modal()}
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ddd'
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
  },
  actionButtonIcon: {
    fontSize: 22,
    height: 22,
    color: 'white',
  },
  passBox:{
    borderRadius: 3,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
    backgroundColor: '#ffffff',
    margin: 5,
    padding: 10,
    marginVertical: 1,
    overflow: 'hidden',
    elevation:2,
    flexDirection: 'row'
  },
  input: {
    color: 'rgb(1, 94, 170)',
    paddingRight: 5,
    paddingLeft: 5,
    fontSize:15,
    lineHeight:25,
    flex:3
  },
});

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
  Alert,
  Picker,
  TextInput,
  StatusBar
} from 'react-native';
var {height, width} = Dimensions.get('window');
var PushNotification = require('react-native-push-notification');
import ActionButton from 'react-native-action-button';
import Modal from 'react-native-simple-modal';
import Icon from 'react-native-vector-icons/Ionicons';
import { firebaseApp } from '../app.js';
import { Navigation } from 'react-native-navigation';
const Item = Picker.Item;
import { CustomerBox, Spinner, Button2, InsertCustomer, SearchBar } from '../common';
export default class FriendList extends Component {
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
      loading: true,
      phoneOrder: '',
      newContent: '',
      nameAdded: '',
      phoneAdded: '',
      finder: '',
      finderType: '',
      note: '',
      modalState: true,
      dataSource: new ListView.DataSource({
              rowHasChanged: (row1, row2) => row1 !== row2,
            }),
    };
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    this._renderRow = this._renderRow.bind(this);
  }
  onNavigatorEvent(event) {
    if (event.id === 'back') {
      this.props.navigator.pop({
        animated: true
      });
    }
  }
  componentDidMount() {
    console.log("Willmount đây");
    var items = [];
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(items)
    });
    const rootRef = firebaseApp.database().ref("FriendList");
    const queryRef = rootRef;
    queryRef.on('child_added', snap => {
        items.push({
          key: snap.key,
          name: snap.val().name,
          phone: snap.val().phone,
          note: snap.val().note
        });
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(items),
          loading: false
        });
    })
  }
  onValueChange = (key: string, value: string) => {
    const newState = {};
    newState[key] = value;
    this.setState(newState);
  };
  searchBegin() {
    if (this.state.finderType != '') {
      console.log("bắt đầu tìm");
      var items = [];
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(items),
        openModal: false
      });
      const rootRef = firebaseApp.database().ref("FriendList");
      const filterRef = rootRef.orderByChild(this.state.finderType).equalTo(this.state.finder);
      filterRef.once("child_added", (snap) => {
        // get children as an array
            items.push({
              key: snap.key,
              name: snap.val().name,
              phone: snap.val().phone,
            });
            this.setState({
              dataSource: this.state.dataSource.cloneWithRows(items),
            });
      });
    } else {
      Alert.alert("Vui lòng chọn loại tìm kiếm")
    }
  }
  loading() {
    if (this.state.loading) {
      return (
        <Spinner />
      )
    } else {
      return (
        <ListView
          dataSource={this.state.dataSource}
          enableEmptySections={true}
          renderRow={(data) => this._renderRow(data)}/>
      )
    }
  }
  modal() {
    if (this.state.modalState) {
      return (
        <View>
          <View style={styles.searchbar}>
              <TextInput
                placeholder="nội dung..."
                style={styles.input}
                value={this.state.finder}
                onChangeText={(finder) => this.setState({ finder })}/>
              <Picker
                  style={{ flex:2 }}
                  selectedValue={this.state.finderType}
                  onValueChange={this.onValueChange.bind(this, 'finderType')}>
                  <Item label="Số điện thoại" value="phone" />
                  <Item label="Tên" value="name" />
              </Picker>
          </View>
          <View style={{flexDirection:'row', alignSelf: 'center'}}>
            <Button2
              textColor="white"
              backgroundColor = "rgb(203, 51, 10)"
              text="Cancel"
              onPress={() => {this.setState({openModal: false})}}/>
            <Button2
              textColor="white"
              backgroundColor = "rgb(203, 51, 10)"
              text="Tìm"
              onPress={() => this.searchBegin()}/>
          </View>
        </View>
      )
    } else {
      return (
        <View >
           <Text style={{fontSize: 20, marginBottom: 10, fontWeight:'bold'}}>Thêm nội dung mới:</Text>
            <InsertCustomer
              valueName={this.state.nameAdded}
              onChangeTextName={(nameAdded) => this.setState({ nameAdded })}
              valuePhone={this.state.phoneAdded}
              onChangeTextPhone={(phoneAdded) => this.setState({ phoneAdded })}
              note={this.state.note}
              onChangeTextNote={(note) => this.setState({ note })}/>
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
                onPress={() => this.addContent()}/>
            </View>
        </View>
      )
    }
  }
  addContent() {
    if(this.state.nameAdded !== '' && this.state.phoneAdded !== '') {
      firebaseApp.database().ref("FriendList").push({
        name: this.state.nameAdded,
        phone: this.state.phoneAdded,
        note: this.state.note
      })
      this.setState({
        nameAdded: '',
        phoneAdded: '',
        note: '',
        openModal:false
      })
    } else {
        Alert.alert("Vui lòng điền đầy đủ thông tin")
    }
  }
  _renderRow(data) {
      return (
          <CustomerBox name={data.name} phone={data.phone} note={data.note}/>
      );
    }
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#ddd' }}>
        <StatusBar hidden={true} />
        {this.loading()}

        <ActionButton buttonColor="rgb(203, 51, 10)">
          <ActionButton.Item buttonColor="#32B34E" title="Đăng ký"
          onPress={() => {this.setState({ modalState: false, openModal: true })}}>
            <Icon name="md-create" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item buttonColor="#b33632" title="Tìm kiếm"
          onPress={() => {this.setState({ modalState: true, openModal: true })}}>
            <Icon name="md-search" style={styles.actionButtonIcon} />
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
    flexDirection: 'row'
  },
  items: {
    flex: 1,
    margin: 5,
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 15
  },
  actionButtonIcon: {
    fontSize: 22,
    height: 22,
    color: 'white',
  },
  searchbar: {
    backgroundColor: 'white',
    borderRadius: 10,
    height: 45,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'grey',
    elevation: 2
  },
  input: {
    paddingRight: 5,
    paddingLeft: 5,
    fontSize:15,
    lineHeight:25,
    flex:2
  },
});

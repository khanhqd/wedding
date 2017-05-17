
import React, { Component } from 'react';
import { View, Text, Image, AsyncStorage, TouchableOpacity, StyleSheet, Dimensions, findNodeHandle, StatusBar, Alert } from 'react-native';
import * as firebase from 'firebase';
var {height, width} = Dimensions.get('window');
import { LoginInput, Button2 } from '../common';
import { Navigation } from 'react-native-navigation';
import { firebaseApp } from '../app.js';
import ResponsiveImage from 'react-native-responsive-image';

class LoginForm extends Component {
  static navigatorStyle = {
    navBarHidden: true
  }
  constructor(props) {
    super(props);
    this.state = {
      error: '',
      name: '',
      phone: '',
      loading: false,
      statusLogin: false,
    };
    this.items = [];
    this.itemsRef = firebaseApp.database().ref("LoginAcc");
  }
  componentDidMount() {
    this.itemsRef.child("Access").push({
      name: '1',
    })
  }
  upFirebase() {
    if(this.state.phone != '') {
      this.itemsRef.child(this.state.phone).set({
        name: this.state.name,
      });
      this.props.navigator.push({
        screen: 'screen.Home',
        animated: true,
      });
    } else {
      Alert.alert("Vui lòng nhập số điện thoại hoặc bấm bỏ qua")
    }
  }
  onPress1() {
    this.props.navigator.push({
      screen: 'screen.Home',
      animated: true,
    });
  }
  onPress2() {
    this.upFirebase();
  }
  render() {
    return (
      <Image
      source={require('../../img/login-img.png')}
      style={styles.background}
      resizeMode="cover">
        <StatusBar hidden={true} />
        <View style={{ flex: 2.5, alignItems: 'center', justifyContent: 'flex-start', margin: 80 }}>
          <Image
            source={require('../../img/Logo-login.png')}
            style={{ height: 90, width: 90, opacity: 0.8, borderRadius: 10 }}/>
        </View>

        <View style={{ flex: 1 }}>
          <LoginInput
            inputHeight={55}
            inputWidth={280}
            label='Quý danh'
            icon='user'
            spacing={0}
            onChangeText={(name) => this.setState({ name })}
            value={this.state.name}/>
          <LoginInput
            inputHeight={55}
            inputWidth={280}
            label='Số điện thoại'
            icon='phone-square'
            onChangeText={(phone) => this.setState({ phone })}
            value={this.state.phone}/>

            <View style={{flexDirection:'row'}}>
              <Button2
              onPress={this.onPress1.bind(this)}
              backgroundColor = "white"
              textColor="rgb(203, 51, 10)"
              text="Bí mật :| bỏ qua"/>
              <Button2
              onPress={() => {this.onPress2()}}
              textColor="white"
              backgroundColor = "rgb(203, 51, 10)"
              text="Dzô"/>
            </View>

        </View>

        <View style={{ flex: 1 }}>
        </View>
      </Image>
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

});
export default LoginForm;

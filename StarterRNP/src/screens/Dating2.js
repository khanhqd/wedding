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
  Linking,
  StatusBar,
  ListView
} from 'react-native';
var {height, width} = Dimensions.get('window');
import { Button2 } from '../common';
import { firebaseApp } from '../app.js';
import { Navigation } from 'react-native-navigation';
var url = 'geo:20.935478, 106.343413';
import MapView from 'react-native-maps';

export default class Dating extends Component {
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
    this.itemsRef = firebaseApp.database().ref("Dating");
  }
  componentDidMount() {
    this.itemsRef.on('child_added',(dataSnapshot) => {
      this.items.push({
        id: dataSnapshot.key,
        link:dataSnapshot.val().link,
      });
    });
    this.itemsRef.child("Content").on('child_added',(dataSnapshot) => {
      this.setState({
        content: dataSnapshot.val().content
      });
    });
  }
  onNavigatorEvent(event) {
    if (event.id === 'back') {
      this.props.navigator.pop({
        animated: true
      });
    }
  }
  handleLink = () => {
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        console.log('Don\'t know how to open URI: ' + url);
      }
    });
  };

  listImg() {
    return this.items.map( (data) => {
      return(
        <Image
          key={data.id}
          style={{width: width-10, height: width-10, paddingTop: 10 }}
          source={{ uri: data.link }}/>
      )
    })
  };
  render() {
    return (
      <ScrollView style={{ flex: 1 }}>
        <StatusBar hidden={true} />
        {this.listImg()}
        <View style={styles.containerMap}>
        <MapView
          initialRegion={{
            latitude: 21.025317,
            longitude: 105.816797,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}>
          <MapView.Marker
            coordinate={{latitude: 21.025317,longitude: 105.816797}}
            title='Night Pizza'
            description='0163.5815.969'
          />
        </MapView>
        <Text style={{ padding: 5, fontSize: 15, fontWeight: 'bold' }}>{this.state.content}
        </Text>
        </View>
        <View style={styles.button}>
          <Button2
            textColor="white"
            backgroundColor = "rgb(203, 51, 10)"
            text="Chỉ đường"
            onPress={() => this.handleLink()}/>
        </View>
      </ScrollView>
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
  containerMap: {
     top: 0,
     left: 0,
     right: 0,
     bottom: 20,
     justifyContent: 'center',
     alignItems: 'center',
 },
 button: {
    alignItems: 'center',
    margin: 10
  },
});

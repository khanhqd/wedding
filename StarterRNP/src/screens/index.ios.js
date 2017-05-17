import { Navigation } from 'react-native-navigation';

import Home from './Home.ios.js';
import LoginForm from './LoginForm.ios.js';
import FriendList from './FriendList.js';
import Chatroom from './Chatroom.js';
import Album from './Album.js';
import Dating from './Dating.js';
import ImageAlbum from './ImageAlbum.js';
import RoomSelect from './RoomSelect.js';
// register all screens of the app (including internal ones)
export function registerScreens() {
  Navigation.registerComponent('screen.LoginForm', () => LoginForm);
  Navigation.registerComponent('screen.Home', () => Home);
  Navigation.registerComponent('screen.FriendList', () => FriendList);
  Navigation.registerComponent('screen.Chatroom', () => Chatroom);
  Navigation.registerComponent('screen.Album', () => Album);
  Navigation.registerComponent('screen.Dating', () => Dating);
  Navigation.registerComponent('screen.ImageAlbum', () => ImageAlbum);
  Navigation.registerComponent('screen.RoomSelect', () => RoomSelect);
}

import {Navigation} from 'react-native-navigation';

import Login from './Login';
import Home from './Home';
import CreateRun from './CreateRun';
import StartRun from './StartRun';
import News from './News';
// register all screens of the app (including internal ones)
export function registerScreens() {

  Navigation.registerComponent('parcel.Login', () => Login);
  Navigation.registerComponent('parcel.Home', () => Home);
  Navigation.registerComponent('parcel.CreateRun', () => CreateRun);
  Navigation.registerComponent('parcel.StartRun', () => StartRun);
  Navigation.registerComponent('parcel.News', () => News);

}

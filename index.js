/**
 * @format
 */

import { AppRegistry, LogBox, Platform } from 'react-native';
import App from './src/App';
import { name as appNameIos } from './appIos.json';
import { name as appNameAndroid } from './appAndroid.json';

LogBox.ignoreAllLogs();
AppRegistry.registerComponent(Platform.OS == 'ios' ? appNameIos : appNameAndroid, () => App);

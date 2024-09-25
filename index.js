/**
 * @format
 */

import {AppRegistry, Alert, NativeModules, NativeEventEmitter } from 'react-native';
import App from './App';
import {name as appName} from './app.json';

import ReactNativeForegroundService from "@supersami/rn-foreground-service";
ReactNativeForegroundService.register({
  config : {
    alert : true,
    onServiceErrorCallBack : () => {
      console.log("Error", "Error while running service");
    }
  }
});


AppRegistry.registerComponent(appName, () => App);

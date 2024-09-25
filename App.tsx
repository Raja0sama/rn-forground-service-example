import React, {useEffect} from 'react';
import {Alert, Button, Linking, Platform, View} from 'react-native';
import ReactNativeForegroundService from '@supersami/rn-foreground-service';
import Permissions from "react-native-permissions";

export default function App() {
  useEffect(() => {
    ReactNativeForegroundService.add_task(() => log(), {
      delay: 1000,
      onLoop: true,
      taskId: 'taskid',
      onError: e => console.log(`Error logging:`, e),
    });
  }, []);

  const startTask = async () => {
    if (Platform.Version >= 33) {
      const response = await Permissions.request(
        Permissions.PERMISSIONS.ANDROID.POST_NOTIFICATIONS
      );
      

      if (response === Permissions.RESULTS.BLOCKED) {
        Alert.alert(
          'Permission Blocked',
          'Notification permission is blocked. Please enable it from the app settings.',
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Open Settings', onPress: () => Linking.openSettings() },
          ]
        );
        return;
      } else if (response !== Permissions.RESULTS.GRANTED) {
        console.log("Did not get the permission");
        return;
      }
    }

    ReactNativeForegroundService.start({
      id: 1244,
      title: 'Foreground Service',
      message: 'We are live World',
      icon: 'ic_launcher',
      button: true,
      button2: true,
      buttonText: 'Button',
      button2Text: 'Anther Button',
      buttonOnPress: 'cray',
      ServiceType : 'dataSync',
      setOnlyAlertOnce: "true",
      color: '#000000',
      progress: {
        max: 100,
        curr: 50,
      },
    });
  };

  const stopTask = () => {
    ReactNativeForegroundService.stop();
  };
  return (
    <View>
      <Button onPress={startTask} title="Start The foreground Service" />
      <Button onPress={stopTask} title="Stop The foreground Service" />
    </View>
  );
}

const log = () => console.log('Hellow World');
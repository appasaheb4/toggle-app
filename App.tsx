import React, {useEffect, useState, useCallback} from 'react';
import type {PropsWithChildren} from 'react';
import {
  Image,
  StatusBar,
  NativeModules,
  useColorScheme,
  View,
  Alert,
} from 'react-native';

import {ToggleSwitch, FullScreenProgress} from './src/components';
import {postDeviceDetails} from './src/services';

type AppProps = PropsWithChildren<{
  toggle?: boolean;
}>;

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const [loading, setLoading] = useState<boolean>(false);
  const [inputs, setInputs] = useState<AppProps>({
    toggle: false,
  });

  const disableScreenshot = async () => {
    try {
      const result = await NativeModules.ScreenshotModule.disable();
      console.log(result);
    } catch (e) {
      console.log(e);
    }
  };

  const allowScreenshot = async () => {
    try {
      const result = await NativeModules.ScreenshotModule.allow();
      console.log(result);
      // we consider that the user has taken a screenshot after 4 seconds
      // No here not detecting the screenshot, just a dummy call
      // I will check later how to detect the screenshot in react native
      setTimeout(() => {
        deviceDetailsService(true);
      }, 4000);
    } catch (e) {
      console.log(e);
    }
  };

  const deviceDetailsService = async (toggle: boolean) => {
    try {
      if (toggle) {
        setLoading(true);
        await postDeviceDetails().then((res: any) => {
          console.log(res);
          setLoading(false);
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    disableScreenshot();
  }, []);

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <Image
        source={require('./src/library/assets/logo.png')}
        style={{marginBottom: 60}}
      />
      <ToggleSwitch
        initialValue={inputs.toggle}
        label={inputs.toggle ? 'Activated' : 'Active'}
        onToggle={(value: boolean) => {
          if (value) {
            allowScreenshot();
          } else {
            disableScreenshot();
          }
          setInputs({...inputs, toggle: value});
        }}
      />
      {loading && <FullScreenProgress />}
    </View>
  );
}

export default App;

import React, {useEffect, useState} from 'react';
import type {PropsWithChildren} from 'react';
import {
  Image,
  StatusBar,
  NativeModules,
  useColorScheme,
  View,
} from 'react-native';

import {ToggleSwitch, FullScreenProgress} from './src/components';

import startListening from './src/helper/ScreenshotDetector';
import Singleton from './src/helper/Singleton';

type AppProps = PropsWithChildren<{
  toggle?: boolean;
}>;

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const [inputs, setInputs] = useState<AppProps>({
    toggle: false,
  });

  useEffect(() => {
    startListening();
  }, []);

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
      {Singleton?.getLoading() && <FullScreenProgress />}
    </View>
  );
}

export default App;

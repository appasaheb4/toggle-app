import {NativeEventEmitter, NativeModules} from 'react-native';

const {ScreenshotDetector} = NativeModules;
const screenshotDetectorEmitter = new NativeEventEmitter(ScreenshotDetector);

const startListening = () => {
  ScreenshotDetector.startListening();

  screenshotDetectorEmitter.addListener('ScreenshotDetected', event => {
    console.log('Screenshot detected!', event);
    // Handle the event in your React Native app
    // later api calling here
  });
};

export default startListening;

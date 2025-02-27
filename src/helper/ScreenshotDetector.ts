import {Alert, NativeEventEmitter, NativeModules} from 'react-native';
import {postDeviceDetails} from '../services';
import Singleton from './Singleton';

const {ScreenshotDetector} = NativeModules;
const screenshotDetectorEmitter = new NativeEventEmitter(ScreenshotDetector);

const startListening = async () => {
  ScreenshotDetector.startListening();

  screenshotDetectorEmitter.addListener('ScreenshotDetected', async event => {
    console.log('Screenshot detected!', event);
    Singleton.setLoading(true);
    await postDeviceDetails(event?.path).then((res: any) => {
      Alert.alert(
        'Screenshot Detected',
        'Screenshot has been detected and sent to the server',
      );
      Singleton.setLoading(false);
    });
  });
};

export default startListening;

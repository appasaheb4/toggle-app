import mockRNDeviceInfo from 'react-native-device-info/jest/react-native-device-info-mock';
jest.mock('react-native-device-info', () => mockRNDeviceInfo);
jest.mock('react-native', () => ({
  useWindowDimensions: () => jest.fn(),
  Platform: {select: () => ({})},
  StyleSheet: {
    create: () => ({}),
  },
  NativeModules: {
    TestConnectNative: () => ({}),
  },
  Dimensions: {get: () => ({})},
  AppState: {
    currentState: 'active',
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
  },
}));

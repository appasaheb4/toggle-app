const ReactNative = jest.requireActual('react-native');

const mockStyleSheet = {
  create: jest.fn(styles => styles),
};

module.exports = {
  ...ReactNative,
  StyleSheet: mockStyleSheet,
};

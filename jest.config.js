module.exports = {
  preset: 'react-native',
  setupFiles: ['./__mocks__/globalMock.js'],
  moduleNameMapper: {
    '^react-native$': '<rootDir>/__mocks__/react-native.js',
  },
};

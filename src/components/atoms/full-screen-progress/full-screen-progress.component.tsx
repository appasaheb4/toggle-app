import {
  View,
  Modal,
  Pressable,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
// import LottieView from 'lottie-react-native';

// export const animation = {
//   loading: require('./loading.json'),
// };

export const FullScreenProgress = () => {
  return (
    <View>
      <Modal
        animationType="fade"
        transparent
        visible={true}
        onRequestClose={() => {
          // this.hideModal();
        }}>
        <Pressable
          onPress={() => {}}
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0,0,0,0.5)',
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height,
          }}>
          <ActivityIndicator size="large" color="#ffffff" />
        </Pressable>
      </Modal>
    </View>
  );
};

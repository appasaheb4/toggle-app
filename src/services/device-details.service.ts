import DeviceInfo from 'react-native-device-info';

const baseUrl = 'https://dummyjson.com';
const addUserUrl = baseUrl + '/users/add';
export const postDeviceDetails = async () => {
  try {
    const result = fetch(addUserUrl, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        os: DeviceInfo.getSystemName(),
        imei: DeviceInfo.getUniqueId(),
        location: DeviceInfo.getAvailableLocationProviders(),
        publicIp: DeviceInfo.getIpAddress(),
        screenshotStatus: {get: true},
      }),
    })
      .then(res => res.json())
      .then(res => {
        return res;
      });
    return result;
  } catch (e) {
    console.log(e);
    return;
  }
};

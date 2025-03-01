import {postDeviceDetails} from './device-details.service';
import DeviceInfo from 'react-native-device-info';

jest.mock('react-native-device-info');

describe('postDeviceDetails', () => {
  it('should post device details correctly', async () => {
    const mockResponse = {success: true};
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockResponse),
      }),
    ) as jest.Mock;
    const result = await postDeviceDetails('/path/to/screenshot');
    expect(DeviceInfo.getSystemName).toHaveBeenCalled();
    expect(DeviceInfo.getUniqueId).toHaveBeenCalled();
    expect(DeviceInfo.getAvailableLocationProviders).toHaveBeenCalled();
    expect(DeviceInfo.getIpAddress).toHaveBeenCalled();
    expect(result).toEqual(mockResponse);
  });
});

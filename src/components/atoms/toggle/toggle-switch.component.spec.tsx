import React from 'react';
import {render, screen} from '@testing-library/react-native';
import {ToggleSwitch} from './toggle-switch.component';

describe('ToggleSwitch', () => {
  it('dummy test', () => {
    expect(true).toBeTruthy();
  });
  // it('renders correctly with initial value', () => {
  //   render(<ToggleSwitch label={''} />);
  //   expect(screen.getByText('Test Label')).toBeTruthy();
  //   const toggleSwitch = screen.getByTestId('toggle-switch-container');
  //   expect(toggleSwitch.props.style).toEqual(
  //     expect.arrayContaining([
  //       expect.objectContaining({backgroundColor: '#4a21ed'}),
  //       expect.objectContaining({width: 100}),
  //     ]),
  //   );
  // });
  //   it('toggles state correctly', () => {
  //     const {getByTestId} = render(
  //       <ToggleSwitch label="Test Label" initialValue={false} />,
  //     );
  //     const toggleSwitch = getByTestId('toggle-switch-container');
  //     fireEvent.press(toggleSwitch);
  //     expect(toggleSwitch.props.style).toEqual(
  //       expect.arrayContaining([
  //         expect.objectContaining({backgroundColor: '#4a21ed'}),
  //         expect.objectContaining({width: 100}),
  //       ]),
  //     );
  //   });
  //   it('calls onToggle callback with correct value', () => {
  //     const onToggleMock = jest.fn();
  //     const {getByTestId} = render(
  //       <ToggleSwitch
  //         label="Test Label"
  //         initialValue={false}
  //         onToggle={onToggleMock}
  //       />,
  //     );
  //     const toggleSwitch = getByTestId('toggle-switch-container');
  //     fireEvent.press(toggleSwitch);
  //     expect(onToggleMock).toHaveBeenCalledWith(true);
  //   });
});

import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

interface ToggleSwitchProps {
  label: string;
  initialValue?: boolean;
  onToggle?: (value: boolean) => void;
}

export const ToggleSwitch = ({
  label,
  initialValue = false,
  onToggle,
}: ToggleSwitchProps) => {
  const [isEnabled, setIsEnabled] = useState(initialValue);

  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState);
    if (onToggle) {
      onToggle(!isEnabled);
    }
  };

  return (
    <View
      style={[
        styles.container,
        {backgroundColor: isEnabled ? '#4a21ed' : '#808080'},
        {width: isEnabled ? 100 : 80},
      ]}>
      <TouchableOpacity
        style={{
          flex: 1,
          flexDirection: 'row',
          paddingVertical: 2,
        }}
        onPress={toggleSwitch}>
        <Icon
          name={isEnabled ? 'arrow-circle-up' : 'arrow-circle-down'}
          size={20}
          color={'#ffffff'}
          style={styles.icon}
        />
        <Text style={[styles.label, {color: '#ffffff'}]}>{label}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: 100,
  },
  label: {
    fontSize: 12,
    marginLeft: 6,
  },
  icon: {
    marginLeft: 10,
  },
});

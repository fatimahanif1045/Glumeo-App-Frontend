// frontend/components/Button.js
import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

const CustomButton = ({ title, onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <Text>{title}</Text>
  </TouchableOpacity>
);

export default CustomButton;

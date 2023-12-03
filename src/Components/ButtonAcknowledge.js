import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import styles from '../Utils/Styles';

const ButtonAcknowledge = ({ children, onPress }) => (
  <TouchableOpacity style={styles.buttonAcknowldge} onPress={onPress}>
    <Text style={styles.buttonText}>{children}</Text>
  </TouchableOpacity>
);

export default ButtonAcknowledge;

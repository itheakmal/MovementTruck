import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import styles from '../Utils/Styles';

const Button = ({ children, onPress, ...props }) => (
  <TouchableOpacity style={styles.button} onPress={onPress} {...props}>
    <Text style={styles.buttonText}>{children}</Text>
  </TouchableOpacity>
);

export default Button;

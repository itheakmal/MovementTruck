import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import styles from '../Utils/Styles';

const ButtonTable = ({ children, onPress }) => (
  <TouchableOpacity style={styles.buttonTable} onPress={onPress}>
    <Text style={styles.buttonText}>{children}</Text>
  </TouchableOpacity>
);

export default ButtonTable;

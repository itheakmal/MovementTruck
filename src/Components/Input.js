import React from 'react';
import { TextInput } from 'react-native';
import styles from '../Utils/Styles';

const Input = ({ ...props }) => (
  <TextInput style={styles.input} {...props} />
);

export default Input;

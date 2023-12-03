import React from 'react';
import { View, Text } from 'react-native';
import styles from '../Utils/Styles';

const MyView = ({ children, ...props }) => <View {...props}>{children}</View>;

export default MyView;
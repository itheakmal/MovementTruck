import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import styles from '../Utils/Styles';

const ButtonTableStatus = ({ children, onPress, buttonTableBackground}) => {
  if (buttonTableBackground === 'buttonTableColorBlue') {
    return (<TouchableOpacity style={styles.buttonTableColorBlue} onPress={onPress}>
      <Text style={styles.buttonTextTable}>{children}</Text>
    </TouchableOpacity>
    );
  } else if (buttonTableBackground === 'buttonTableColorRed') {
    return (<TouchableOpacity style={styles.buttonTableColorRed} onPress={onPress}>
      <Text style={styles.buttonTextTable}>{children}</Text>
    </TouchableOpacity>
    );
  } else {
    return (<TouchableOpacity style={styles.buttonTableColor} onPress={onPress}>
      <Text style={styles.buttonTextTable}>{children}</Text>
    </TouchableOpacity>
    );
  }
}


export default ButtonTableStatus;

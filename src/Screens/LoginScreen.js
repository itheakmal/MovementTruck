import React, { useState, useContext } from 'react';
import { View, Text, Image, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Button from '../Components/Button';
import Input from '../Components/Input';
import AuthService from '../Services/AuthService';
import UserContext from '../Contexts/UserContext';
import styles from '../Utils/Styles';
import { validateEmail } from '../Utils/Utils';

const LoginScreen = () => {
  const [email, setEmail] = useState('jemal@tctran.com.au');
  const [password, setPassword] = useState('Totalcare5');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { setUser } = useContext(UserContext);

  const navigation = useNavigation();

  const handleLogin = async () => {
    setError('')
    setLoading(true)
    if (email === '' && password === '') {
      setError('Email or Password can not be empty')
      setLoading(false)

      return
    }
    const testEmail = validateEmail(email)
    console.log('testEmail', testEmail)
    if (!validateEmail(email)) {
      setError('Not valid Email Address')
      setLoading(false)

      return
    }
    try {
      const { response, status } = await AuthService.loginService(email, password);
      if (status === 'error') {
        setError(response)
      } else if (status === 'success') {
        // const newUser = response["registration"] = 98760
        // return false
        response.registration = 98765
        console.log('response', response)
        setUser(response)
        navigation.navigate('Switch');
      }
      // console.log('first', user)

    } catch (error) {
      setError(response.message)

      // handle login error here
    } finally {
      setLoading(false)
    }
  };

  return (
    <SafeAreaView style={styles.loginContainer}>
      <View style={styles.loginContainer}>
        {/* <Image source={require('../assets/truck.png')} style={styles.logo} /> */}
        <Text style={styles.title}>Trucking Company</Text>
        <Input
          // placeholder="Email"
          placeholder="jemal@tctran.com.au"
          onChangeText={setEmail}
          value={email}
          style={styles.input}
          inputMode='email'
        />
        <Input
          // placeholder="Password"
          type={'password'}
          placeholder="Totalcare5"
          onChangeText={setPassword}
          value={password}
          secureTextEntry
          style={styles.input}
        />
        <Button onPress={handleLogin} disabled={loading}>Login</Button>
        {!!(error) && <View style={styles.errorWrapper}>
          <Text style={styles.errorMessage}>{error}</Text>
        </View>}

      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;

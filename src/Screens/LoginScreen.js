import React, { useState, useContext } from 'react';
import { View, Text, Image, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Button from '../Components/Button';
import Input from '../Components/Input';
import AuthService from '../Services/AuthService';
import UserContext from '../Contexts/UserContext';
import styles from '../Utils/Styles';
import { validateEmail } from '../Utils/Utils';
import { getVehicle } from '../Services/networkRequests';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  // const [email, setEmail] = useState('jemal@tctran.com.au');
  // const [password, setPassword] = useState('Totalcare5');
  const [password, setPassword] = useState('');
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
        const { data, status } = await getVehicle(response.id)
        if (status === 'error') {
          setError(data)
        } else {
          response.registration = data.car_number_plate
          response.vehicle_id = data.id
        }
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
        <Text style={styles.title}>Login</Text>
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
        <Button onPress={handleLogin} disabled={loading}>{loading ? 'Loading...' : 'Login'}</Button>
        {!!(error) && <View style={styles.errorWrapper}>
          <Text style={styles.errorMessage}>{error}</Text>
        </View>}

      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;

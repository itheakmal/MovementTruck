import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { UserProvider } from './src/Contexts/UserContext';
import LoginScreen from './src/Screens/LoginScreen';
import JobsScreen from './src/Screens/JobsScreen';
import CheckListScreen from './src/Screens/CheckListScreen';
import SwitchScreen from './src/Screens/SwitchScreen';
import { StatusBar } from 'react-native';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <UserProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Login'>
          <Stack.Screen name="Login" component={LoginScreen} options={{
          title: 'Total Care Driver',
          headerStyle: {
            backgroundColor: '#333',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }} />
          <Stack.Screen name="Switch" component={SwitchScreen} options={{headerShown:false}} />
          <Stack.Screen name="Jobs" component={JobsScreen} options={({ route }) => {
            console.log( ' route.params', route.params)
            console.log( ' route.params', route)
            return { title: route.params.name }
          }} />
          <Stack.Screen name="CheckList" component={CheckListScreen} options={({ route }) => {
            console.log( ' route.params', route.params)
            console.log( ' route.params', route)
            return { title: route.params.name }
          }} />
        </Stack.Navigator>
      </NavigationContainer>
      <StatusBar backgroundColor="#333" barStyle="light-content" /> 
    </UserProvider>
  );
}

export default App;

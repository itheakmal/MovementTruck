import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { UserProvider } from './src/Contexts/UserContext';
import LoginScreen from './src/Screens/LoginScreen';
import JobsScreen from './src/Screens/JobsScreen';
import CheckListScreen from './src/Screens/CheckListScreen';
import SwitchScreen from './src/Screens/SwitchScreen';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <UserProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Login'>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Switch" component={SwitchScreen} />
          <Stack.Screen name="Jobs" component={JobsScreen} />
          {/* <Stack.Screen name="CheckList" component={CheckListScreen} /> */}
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
}

export default App;

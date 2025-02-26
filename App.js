import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Importez vos écrans
import SignIn from './src/views/Auth/SignIn';
import SignUp from './src/views/Auth/SignUp';
import ForgotPwd from './src/views/Auth/ForgotPwd';
import Otp from './src/views/Auth/Otp';
import Home from './src/views/Home';
import Settings from './src/views/Settings';
import Profile from './src/views/Profile';

const Stack = createNativeStackNavigator();

const App = (props) => {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Settings" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Otp" component={Otp} />
          <Stack.Screen name="SignIn" component={SignIn} />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="ForgotPwd" component={ForgotPwd} />

          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Settings" component={Settings} />
          <Stack.Screen name="Profile" component={Profile} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

export default App;

import React, { useState } from 'react';
import { NativeWindStyleSheet } from 'nativewind';
NativeWindStyleSheet.setOutput({ default: 'native' });
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Text, TextInput, TouchableOpacity, View, Alert, ActivityIndicator } from 'react-native';
import { ToastService } from '../../services/ToastService';

export default function SignIn() {
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSelected, setSelection] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleLogin = (navigation) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      ToastService.showError('Error', 'Please enter a valid email address.', 'bottom');
      return;
    }

    if (!password || password.length < 5) {
      ToastService.showError('Error', 'Password must be at least 5 characters long.', 'bottom');
      return;
    }
    setIsLoading(true);

    // Simulate API request
    setTimeout(() => {
      setIsLoading(false);
      Alert.alert('Successfully logged in!');
      navigation.navigate('Home'); // Assuming there is a Home screen
    }, 2000);
  };

  return (
    <>
      <View className="flex-1 p-4 bg-white">
        <Text className="text-3xl font-bold mb-4 mt-10">Login</Text>
        <Text className="text-base text-gray-500 mb-8">
          Use your email or continue with social to login to your account.
        </Text>

        <View className="border border-gray-400 rounded mb-4 w-full flex-row items-center">
          <TextInput
            placeholder="Email"
            className="flex-1 text-base p-4"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <Icon name="mail-outline" size={24} color="#666" style={{ marginRight: 15 }} />
        </View>

        <View className="border border-gray-400 rounded mb-4 w-full flex-row items-center">
          <TextInput
            placeholder="Password"
            className="flex-1 text-base p-4"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!passwordVisible}
          />
          <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
            <Icon name={passwordVisible ? "visibility" : "visibility-off"} size={24} color="#666" style={{ marginRight: 15 }} />
          </TouchableOpacity>
        </View>

        <View className="mb-4 flex-row items-center justify-between">
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity
              onPress={() => setSelection(!isSelected)}
              style={{
                backgroundColor: isSelected ? 'rgb(249 115 22)' : '#E5E7EB',
                borderWidth: 1,
                borderColor: '#D1D5DB',
                borderRadius: 4,
                padding: 8,
                marginRight: 8,
              }}
            >
              {isSelected && <Icon name="check" size={1} color="#FFFFFF" />}
            </TouchableOpacity>
            <Text className="text-gray-500">Remember me</Text>
          </View>

          <TouchableOpacity onPress={() => navigation.navigate('ForgotPwd')}>
            <Text className="text-gray-500">Forgot Password?</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          className="bg-orange-500 rounded p-4 mb-4 w-full flex-row items-center justify-center"
          onPress={() => handleLogin(navigation)}
          disabled={isLoading}
        >
          {isLoading ? (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <ActivityIndicator size="small" color="#FFF" />
              <Text className="text-white ml-2">Request processing, please wait...</Text>
            </View>
          ) : (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Icon name="login" size={24} color="white" />
              <Text className="text-white text-center font-bold ml-2">Login</Text>
            </View>
          )}
        </TouchableOpacity>

        <View className="absolute bottom-7 left-0 right-0 items-center p-4">
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text className="text-gray-500 text-center">Create an account.</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Toast />
    </>
  );
}
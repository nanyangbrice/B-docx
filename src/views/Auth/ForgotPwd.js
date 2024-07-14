// Exemple pour ForgotPwd.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { NativeWindStyleSheet } from 'nativewind';
import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { ToastService } from '../../services/ToastService';

NativeWindStyleSheet.setOutput({ default: 'native' });

export default function ForgotPwd() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleResetPwd = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      ToastService.showError('Error', 'Please enter a valid email address.', 'bottom');
      return;
    }
    // Start the loading indicator
    setIsLoading(true);

    // Simulate an API request
    setTimeout(() => {
      setIsLoading(false);
      Alert.alert('A reset email has been sent to your email address!');
      navigation.navigate('SignIn');
    }, 2000);
  };

  return (
    <>
      <View className="flex-1 p-4 bg-white">
        <Text className="text-3xl font-bold mb-4 mt-10">Forgot Password</Text>
        <Text className="text-base text-gray-500 mb-8">
          Enter your email address to receive your new password.
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

        <TouchableOpacity
          className="bg-orange-500 rounded p-4 mb-4 w-full flex-row items-center justify-center"
          onPress={handleResetPwd}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator size="small" color="#FFF" />
          ) : (
            <Text className="text-white text-center font-bold">Reset Password</Text>
          )}
        </TouchableOpacity>

        <View className="absolute bottom-7 left-0 right-0 items-center p-4">
          <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
            <Text className="text-gray-500 text-center">I remember my password.</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      <Toast />
    </>
  );
}

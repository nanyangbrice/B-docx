import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { NativeWindStyleSheet } from 'nativewind';
import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { ToastService } from '../../services/ToastService';

NativeWindStyleSheet.setOutput({ default: 'native' });

export default function SignUp() {
  const navigation = useNavigation();
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSelected, setSelection] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const handleSignUp = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!fullname || fullname.length < 8) {
      ToastService.showError('Error', 'Fullname must be at least 08 characters.', 'bottom');
      return;
    }

    if (!email || !emailRegex.test(email)) {
      ToastService.showError('Error', 'Please enter a valid email address.', 'bottom');
      return;
    }

    function isInteger(value) {
      if (typeof value === 'string' || typeof value === 'number') {
        const parsedValue = parseInt(value, 10);
        return !isNaN(parsedValue) && parsedValue.toString() === value.toString();
      }
      return false;
    }

    if (!phone || phone.length != 9) {
      ToastService.showError('Error', 'Your phone number is not valid.', 'bottom');
      return;
    }

    if (isInteger(phone)) {
      ToastService.showError('Error', 'Phone number is not int.', 'bottom');
      return;
    }

    if (!password || password.length != 5) {
      ToastService.showError('Error', 'Password must be at least 05 characters long.', 'bottom');
      return;
    }

    if (!phone || password !== confirmPassword) {
      ToastService.showError('Error', 'Passwords do not match', 'bottom');
      return;
    }
    
    
    navigation.navigate('SignIn');
  };

  return (
    <>
      <View className="flex-1 p-4 bg-white">
        <Text className="text-3xl font-bold mb-4 mt-10">Sign Up</Text>
        <Text className="text-base text-gray-500 mb-8">
          Enter your personal information to create an account.
        </Text>

        <View className="border border-gray-400 rounded mb-4 w-full flex-row items-center">
          <TextInput
            placeholder="Fullname"
            className="flex-1 text-base p-4"
            value={fullname}
            onChangeText={setFullname}
            keyboardType="email"
            autoCapitalize="none"
          />
          <Icon name="person" size={24} color="#666" style={{ marginRight: 15 }} />
        </View>

        <View className="border border-gray-400 rounded mb-4 w-full flex-row items-center">
          <TextInput
            placeholder="Email"
            className="flex-1 text-base p-4"
            value={email}
            onChangeText={setEmail}
            keyboardType="email"
            autoCapitalize="none"
          />
          <Icon name="mail-outline" size={24} color="#666" style={{ marginRight: 15 }} />
        </View>

        <View className="border border-gray-400 rounded mb-4 w-full flex-row items-center">
          <TextInput
            placeholder="Phone"
            className="flex-1 text-base p-4"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
          />
          <Icon name="smartphone" size={24} color="#666" style={{ marginRight: 15 }} />
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

        <View className="border border-gray-400 rounded mb-4 w-full flex-row items-center">
          <TextInput
            placeholder="Confirm Password"
            className="flex-1 text-base p-4"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={!confirmPasswordVisible}
          />
          <TouchableOpacity onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)}>
            <Icon name={confirmPasswordVisible ? "visibility" : "visibility-off"} size={24} color="#666" style={{ marginRight: 15 }} />
          </TouchableOpacity>
        </View>

        <View className="mb-4 flex-row align-items-center">
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
            {isSelected && <Icon name="check" size={1.5} color="#FFFFFF" />}
          </TouchableOpacity>
          <Text className="text-gray-500">Agree with </Text>
          <Text className="font-bold">Terms & Conditions</Text>
        </View>

        <TouchableOpacity
          className="bg-orange-500 rounded p-4 mb-4 w-full"
          onPress={handleSignUp}
        >
          <Text className="text-white text-center font-bold">Create Account</Text>
        </TouchableOpacity>

        <View className="absolute bottom-7 left-0 right-0 items-center p-4">
          <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
            <Text className="text-gray-500 text-center">Already have an account?</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Toast />
    </>
  );
}

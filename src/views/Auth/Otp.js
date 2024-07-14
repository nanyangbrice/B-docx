import React, { useState } from 'react';
import { NativeWindStyleSheet } from 'nativewind';
NativeWindStyleSheet.setOutput({ default: 'native' });
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Text, TextInput, TouchableOpacity, View, Alert, ActivityIndicator } from 'react-native';
import { ToastService } from '../../services/ToastService';

export default function Otp({ navigation }) {
  const [code, setCode] = useState(['', '', '', '', '']);

  const handleCodeChange = (index, value) => {
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
  };

  const handleVerify = () => {
    Alert.alert('Code verified!');
    navigation.navigate('SignIn');
  };

  return (
    <View className="flex-1 p-4 bg-white">
      <Text className="text-3xl font-bold mb-4 mt-10">Verify Code</Text>
      <Text className="text-base text-gray-500 mb-8">
        Enter the 4-digit code sent to you at your email.
      </Text>
      <View>
        <View className="flex-row justify-center mb-4">
          {code.map((digit, index) => (
            <TextInput
              key={index}
              className="border border-gray-500 rounded-md text-center p-3 mx-2 w-14  text-3xl font-bold text-orange-600"
              maxLength={1}
              keyboardType="number-pad"
              value={digit}
              onChangeText={(value) => handleCodeChange(index, value)}
            />
          ))}
        </View>
        <TouchableOpacity
          className="bg-orange-500 rounded p-4 mb-4 w-full flex-row items-center justify-center"
          onPress={handleVerify}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Icon name="login" size={24} color="white" />
            <Text className="text-white text-center font-bold ml-2">Login</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity className="mt-4" onPress={() => Alert.alert('Code resent!')}>
          <Text className="text-center text-gray-500">Resend</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

NativeWindStyleSheet.create({
  // styles...
});

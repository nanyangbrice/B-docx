import React, { useEffect, useState, useCallback } from 'react';
import { SafeAreaView, View, ScrollView, Text, TouchableOpacity, Switch, Image } from 'react-native';
import { NativeWindStyleSheet } from 'nativewind';
NativeWindStyleSheet.setOutput({ default: 'native' });
import FeatherIcon from 'react-native-vector-icons/Feather';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';



const fetchLocation = async (setLocation) => {
  const url = 'https://ipapi.co/json/';

  
  try {
    const response = await axios.get(url);
    setLocation(response.data);
    console.log(response.data);
  } catch (error) {
    console.error('Erreur lors de la récupération de la localisation:', error);
  }
};

const updateOnlineStatus = (setOnlineStatus, fetchLocation, setLocation) => {
  setOnlineStatus(navigator.onLine);
  if (navigator.onLine) {
    fetchLocation(setLocation);
  } else {
    setLocation(null);
  }
};

export default function Profile() {
  const navigation = useNavigation();
  const [form, setForm] = useState({
    emailNotifications: true,
    pushNotifications: false,
  });
  const [location, setLocation] = useState(null);
  const [onlineStatus, setOnlineStatus] = useState(navigator.onLine);
  const [account, setAccount] = useState(null);

  useEffect(() => {
    const handleOnline = () => updateOnlineStatus(setOnlineStatus, fetchLocation, setLocation);
    const handleOffline = () => updateOnlineStatus(setOnlineStatus, fetchLocation, setLocation);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    if (navigator.onLine) {
      fetchLocation(setLocation);
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleToggle = useCallback(
    (key) => {
      setForm((prevForm) => ({
        ...prevForm,
        [key]: !prevForm[key],
      }));
    },
    [setForm]
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-200">
      <View className="flex-grow flex-shrink basis-0 p-0">
        <View className="flex-row items-center justify-between w-full px-4 mt-5">
          <View className="w-10 h-10 items-start justify-center">
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <FeatherIcon color="#000" name="arrow-left" size={24} />
            </TouchableOpacity>
          </View>
          <Text numberOfLines={1} className="text-xl font-semibold text-black flex-grow flex-shrink basis-0">
            Profile
          </Text>
        </View>
        <ScrollView contentContainerStyle={{ paddingHorizontal: 16 }}>
          <View className="py-3">
            <View className="items-center ">
              <Image source={{ uri: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2.5&w=256&h=256&q=80' }} className="w-20 h-20 rounded-full" />
              <Text className="text-xl font-bold mt-2">Nanyang Brice</Text>
            </View>

            <View className="rounded-lg shadow-md mt-3">
              <View className="border-t border-gray-200">
                <View onPress={() => { /* handle onPress */ }} className="h-11 w-full flex-row items-center px-4 bg-white rounded-t-lg">
                  <Text className="text-base text-black font-semibold">Username</Text>
                  <View className="flex-grow flex-shrink basis-0" />
                  <Text className="text-base text-gray-500 mr-1">Unity2001#</Text>
                </View>
              </View>
              <View className="border-t border-gray-200">
                <TouchableOpacity onPress={() => { /* handle onPress */ }} className="h-11 w-full flex-row items-center px-4 bg-white">
                  <Text className="text-base text-black font-semibold">Fullname</Text>
                  <View className="flex-grow flex-shrink basis-0" />
                  <Text className="text-base font-medium text-gray-500 mr-1">Nanyang Brice</Text>
                  <FeatherIcon color="#bcbcbc" name="chevron-right" size={19} />
                </TouchableOpacity>
              </View>

              <View className="border-t border-gray-200">
                <TouchableOpacity onPress={() => { /* handle onPress */ }} className="h-11 w-full flex-row items-center px-4 bg-white">
                  <Text className="text-base text-black font-semibold">Phone</Text>
                  <View className="flex-grow flex-shrink basis-0" />
                  <Text className="text-base font-medium text-gray-500 mr-1">{location ? `(${location.country_calling_code})` : ''}</Text>
                  <FeatherIcon color="#bcbcbc" name="chevron-right" size={19} />
                </TouchableOpacity>
              </View>

              <View className="border-t border-b border-gray-200">
                <View onPress={() => { /* handle onPress */ }} className="h-11 w-full flex-row items-center px-4 bg-white rounded-b-lg">
                  <Text className="text-base text-black font-semibold">ISP</Text>
                  <View className="flex-grow flex-shrink basis-0" />
                  <Text className="text-base font-medium text-gray-500 mr-1">{location ? `${location.org}` : 'Loading...'}</Text>
                </View>
              </View>
            </View>
          </View>
          

          <View className="py-3">
            <Text className="m-2 ml-3 text-sm font-medium text-gray-600 uppercase">Login informations</Text>
            <View className="rounded-lg shadow-md">
              <View className="border-t border-gray-200">
                <TouchableOpacity onPress={() => { /* handle onPress */ }} className="h-11 w-full flex-row items-center px-4 bg-white rounded-t-lg">
                  <Text className="text-base text-black font-semibold">Email</Text>
                  <View className="flex-grow flex-shrink basis-0" />
                  <Text className="text-base font-medium text-gray-500 mr-1">nanyangbrice@gmail.com</Text>
                  <FeatherIcon color="#bcbcbc" name="chevron-right" size={19} />
                </TouchableOpacity>
              </View>
              <View className="border-t border-b border-gray-200">
                <TouchableOpacity onPress={() => { /* handle onPress */ }} className="h-11 w-full flex-row items-center px-4 bg-white rounded-b-lg">
                  <Text className="text-base text-black font-semibold">Update Password</Text>
                  <View className="flex-grow flex-shrink basis-0" />
                  <FeatherIcon color="#bcbcbc" name="chevron-right" size={19} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          

          <View className="py-3">
            <Text className="m-2 ml-3 text-sm font-medium text-gray-600 uppercase">Others informations</Text>
            <View className="rounded-lg shadow-md">
              <View className="border-t border-gray-200">
                <View onPress={() => { /* handle onPress */ }} className="h-11 w-full flex-row items-center px-4 bg-white rounded-t-lg">
                  <Text className="text-base text-black font-semibold">Country</Text>
                  <View className="flex-grow flex-shrink basis-0" />
                  <Text className="text-base font-medium text-gray-500 mr-1">{location ? `${location.country_name}, ${location.country_capital}` : 'Loading...'}</Text>
                </View>
              </View>
              <View className="border-t border-gray-200">
                <View onPress={() => { /* handle onPress */ }} className="h-11 w-full flex-row items-center px-4 bg-white">
                  <Text className="text-base text-black font-semibold">Ip Adress</Text>
                  <View className="flex-grow flex-shrink basis-0" />
                  <Text className="text-base font-medium text-gray-500 mr-1">{location ? `${location.ip}` : 'Loading...'}</Text>
                </View>
              </View>
              <View className="border-t border-b border-gray-200">
                <TouchableOpacity onPress={() => { /* handle onPress */ }} className="h-11 w-full flex-row items-center px-4 bg-white rounded-b-lg">
                  <Text className="text-base text-black font-semibold">App version</Text>
                  <View className="flex-grow flex-shrink basis-0" />
                  <Text className="text-base font-medium text-gray-500 mr-1">2.24</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

import React, { useEffect, useState, useCallback } from 'react';
import { SafeAreaView, View, ScrollView, Text, TouchableOpacity, Switch, Image } from 'react-native';
import { NativeWindStyleSheet } from 'nativewind';
NativeWindStyleSheet.setOutput({ default: 'native' });
import FeatherIcon from 'react-native-vector-icons/Feather';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';


const fetchLocation = async (setLocation) => {
    const url = 'http://ip-api.com/json';
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

export default function Settings() {
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
                        <TouchableOpacity onPress={() => { /* handle onPress */ }}>
                            <FeatherIcon color="#000" name="arrow-left" size={24} />
                        </TouchableOpacity>
                    </View>
                    <Text numberOfLines={1} className="text-xl font-semibold text-black flex-grow flex-shrink basis-0">
                        Settings
                    </Text>
                </View>
                <ScrollView contentContainerStyle={{ paddingHorizontal: 16 }}>
                    <View className="py-3">
                        <Text className="m-2 ml-3 text-sm font-medium text-gray-600 uppercase">Account</Text>
                        <View className="rounded-lg shadow-md">
                            <View  className="p-3 bg-white rounded-lg flex-row items-center">
                                <Image
                                    alt="User Avatar"
                                    source={{
                                        uri: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2.5&w=256&h=256&q=80',
                                    }}
                                    className="w-15 h-15 rounded-full mr-3"
                                    style={{ width: 60, height: 60, borderRadius: 30, marginRight: 12 }}
                                />
                                <View className="mr-auto">
                                    <Text className="text-lg font-semibold text-gray-900">John Doe</Text>
                                    <Text className="mt-1 text-base font-normal text-gray-500">john@example.com</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View className="py-3">
                        <Text className="m-2 ml-3 text-sm font-medium text-gray-600 uppercase">Preferences</Text>
                        <View className="rounded-lg shadow-md">
                            <View className="border-t border-gray-200">
                                <TouchableOpacity onPress={() => { navigation.navigate('Profile') }} className="h-11 w-full flex-row items-center px-4 bg-white rounded-t-lg">
                                    <FeatherIcon color="#000" name="user" size={18} />
                                    <Text className="text-base text-black ml-3">Profile</Text>
                                    <View className="flex-grow flex-shrink basis-0" />
                                    <FeatherIcon color="#bcbcbc" name="chevron-right" size={19} />
                                </TouchableOpacity>
                            </View>
                            <View className="border-t border-gray-200">
                                <TouchableOpacity onPress={() => { /* handle onPress */ }} className="h-11 w-full flex-row items-center px-4 bg-white">
                                    <FeatherIcon color="#000" name="map" size={18} />
                                    <Text className="text-base text-black ml-3">Country</Text>
                                    <View className="flex-grow flex-shrink basis-0" />
                                    <Text className="text-base font-medium text-gray-500 mr-1">{location ? `${location.country}, ${location.city}` : 'Loading...'}</Text>
                                </TouchableOpacity>
                            </View>
                            <View className="border-t border-gray-200">
                                <TouchableOpacity onPress={() => { /* handle onPress */ }} className="h-11 w-full flex-row items-center px-4 bg-white">
                                    <FeatherIcon color="#000" name="map-pin" size={18} />
                                    <Text className="text-base text-black ml-3">IP address</Text>
                                    <View className="flex-grow flex-shrink basis-0" />
                                    <Text className="text-base font-medium text-gray-500 mr-1">{location ? `${location.query}` : 'Loading...'}</Text>
                                </TouchableOpacity>
                            </View>
                            <View className="border-t border-gray-200">
                                <TouchableOpacity className="h-11 w-full flex-row items-center px-4 bg-white">
                                    {location ? <FeatherIcon color="#000" name="wifi" size={18} /> : <FeatherIcon color="#000" name="wifi-off" size={18} />}
                                    <Text className="text-base text-black ml-3">Connection Status</Text>
                                    <View className="flex-grow flex-shrink basis-0" />
                                    <Text className="text-base font-medium text-gray-500 mr-1">{location ? 'Online' : 'Offline'}</Text>
                                </TouchableOpacity>
                            </View>
                            <View className="border-t border-gray-200">
                                <View className="h-11 w-full flex-row items-center px-4 bg-white">
                                    <FeatherIcon color="#000" name="globe" size={18} />
                                    <Text className="text-base text-black ml-3">Language</Text>
                                    <View className="flex-grow flex-shrink basis-0" />
                                    <Text className="text-base font-medium text-gray-500 mr-2">English</Text>
                                    <Switch
                                        onValueChange={() => handleToggle('emailNotifications')}
                                        style={{ transform: [{ scaleX: 0.95 }, { scaleY: 0.95 }] }}
                                        value={form.emailNotifications}
                                    />
                                </View>
                            </View>
                            <View className="border-t border-gray-200">
                                <View className="h-11 w-full flex-row items-center px-4 bg-white">
                                    <FeatherIcon color="#000" name="moon" size={18} />
                                    <Text className="text-base text-black ml-3">Display color</Text>
                                    <View className="flex-grow flex-shrink basis-0" />
                                    <Switch
                                        onValueChange={() => handleToggle('emailNotifications')}
                                        style={{ transform: [{ scaleX: 0.95 }, { scaleY: 0.95 }] }}
                                        value={form.emailNotifications}
                                    />
                                </View>
                            </View>
                        </View>
                    </View>
                    <View className="py-3">
                        <Text className="m-2 ml-3 text-sm font-medium text-gray-600 uppercase">Resources</Text>
                        <View className="rounded-lg shadow-md">
                            <View className="border-t border-gray-200">
                                <TouchableOpacity onPress={() => { /* handle onPress */ }} className="h-11 w-full flex-row items-center px-4 bg-white rounded-t-lg">
                                    <FeatherIcon color="#000" name="phone-call" size={18} />
                                    <Text className="text-base text-black ml-3">Contact Us</Text>
                                    <View className="flex-grow flex-shrink basis-0" />
                                    <FeatherIcon color="#bcbcbc" name="chevron-right" size={19} />
                                </TouchableOpacity>
                            </View>
                            <View className="border-t border-gray-200">
                                <TouchableOpacity onPress={() => { /* handle onPress */ }} className="h-11 w-full flex-row items-center px-4 bg-white">
                                    <FeatherIcon color="#000" name="book-open" size={18} />
                                    <Text className="text-base text-black ml-3">Report Bug</Text>
                                    <View className="flex-grow flex-shrink basis-0" />
                                    <FeatherIcon color="#bcbcbc" name="chevron-right" size={19} />
                                </TouchableOpacity>
                            </View>
                            <View className="border-t border-b border-gray-200">
                                <TouchableOpacity onPress={() => { /* handle onPress */ }} className="h-11 w-full flex-row items-center px-4 bg-white rounded-b-lg">
                                    <FeatherIcon color="#000" name="shield" size={18} />
                                    <Text className="text-base text-black ml-3">Terms and Privacy</Text>
                                    <View className="flex-grow flex-shrink basis-0" />
                                    <FeatherIcon color="#bcbcbc" name="chevron-right" size={19} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
}

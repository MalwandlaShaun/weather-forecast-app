// src/components/SearchBar.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { observer } from 'mobx-react-lite';
import weatherStore from '../stores/weatherStore';

const SearchBar = observer(({ onClose }) => {
    const [searchText, setSearchText] = useState('');
    const { favorites } = weatherStore;

    const handleSearch = () => {
        if (searchText.trim()) {
            weatherStore.fetchWeatherData(searchText);
            onClose();
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-app-bg">
            <View className="px-4 pt-4">
                <View className="flex-row items-center mb-6">
                    <TouchableOpacity onPress={onClose} className="mr-4">
                        <Ionicons name="close" size={24} color="white" />
                    </TouchableOpacity>
                    <Text className="text-text-primary text-xl font-semibold">Weather</Text>
                </View>

                <View className="flex-row items-center bg-card-bg rounded-lg px-3 py-2 mb-6">
                    <Ionicons name="search" size={20} color="#888888" />
                    <TextInput
                        className="flex-1 text-text-primary ml-2 h-10"
                        placeholder="Search for a city or airport"
                        placeholderTextColor="#888888"
                        value={searchText}
                        onChangeText={setSearchText}
                        onSubmitEditing={handleSearch}
                        autoFocus
                    />
                    {searchText.length > 0 && (
                        <TouchableOpacity onPress={() => setSearchText('')}>
                            <Ionicons name="close-circle" size={20} color="#888888" />
                        </TouchableOpacity>
                    )}
                </View>

                <View className="mb-6">
                    <Text className="text-text-primary text-lg font-semibold mb-2">My Location</Text>
                    <TouchableOpacity
                        className="flex-row items-center px-4 py-3 bg-card-bg rounded-lg"
                        onPress={() => {
                            weatherStore.fetchWeatherData('Johannesburg');
                            onClose();
                        }}
                    >
                        <View className="flex-1">
                            <Text className="text-text-primary font-semibold">Johannesburg</Text>
                            <Text className="text-text-secondary text-sm">Current Location</Text>
                        </View>
                        <View className="flex-row items-center">
                            <Text className="text-text-primary text-2xl font-semibold mr-2">21°</Text>
                            <Text className="text-text-secondary text-sm">Partly Cloudy</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                <View>
                    <Text className="text-text-primary text-lg font-semibold mb-2">Other Cities</Text>
                    <TouchableOpacity
                        className="flex-row items-center px-4 py-3 bg-card-bg rounded-lg mb-2"
                        onPress={() => {
                            weatherStore.fetchWeatherData('Pretoria');
                            onClose();
                        }}
                    >
                        <View className="flex-1">
                            <Text className="text-text-primary font-semibold">Pretoria</Text>
                            <Text className="text-text-secondary text-sm">11:13 PM</Text>
                        </View>
                        <View className="flex-row items-center">
                            <Text className="text-text-primary text-2xl font-semibold mr-2">22°</Text>
                            <Text className="text-text-secondary text-sm">Not as warm</Text>
                        </View>
                    </TouchableOpacity>

                    {favorites.map((city, index) => (
                        <TouchableOpacity
                            key={index}
                            className="flex-row items-center px-4 py-3 bg-card-bg rounded-lg mb-2"
                            onPress={() => {
                                weatherStore.fetchWeatherData(city);
                                onClose();
                            }}
                        >
                            <View className="flex-1">
                                <Text className="text-text-primary font-semibold">{city}</Text>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
        </SafeAreaView>
    );
});

export default SearchBar;
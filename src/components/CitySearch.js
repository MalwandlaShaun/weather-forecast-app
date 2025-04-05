// src/components/CitySearch.js
import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { observer } from 'mobx-react-lite';
import weatherStore from '../stores/weatherStore';

const CitySearch = observer(() => {
    const [searchText, setSearchText] = useState('');

    const handleSearch = () => {
        if (searchText.trim()) {
            weatherStore.fetchWeatherData(searchText.trim());
            setSearchText('');
        }
    };

    return (
        <View className="flex-row items-center bg-white rounded-full px-4 py-2 mb-4 shadow-sm">
            <TextInput
                className="flex-1 text-gray-700 pl-2"
                placeholder="Search city..."
                value={searchText}
                onChangeText={setSearchText}
                onSubmitEditing={handleSearch}
            />
            <TouchableOpacity onPress={handleSearch} className="ml-2">
                <Ionicons name="search" size={24} color="#4A90E2" />
            </TouchableOpacity>
        </View>
    );
});

export default CitySearch;
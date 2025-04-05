// src/components/FavoritesList.js
import React from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { observer } from 'mobx-react-lite';
import weatherStore from '../stores/weatherStore';

const FavoritesList = observer(() => {
    const { favorites, fetchWeatherData, removeFavorite } = weatherStore;

    if (!favorites.length) {
        return (
            <View className="p-4 bg-white rounded-lg shadow-sm mb-4">
                <Text className="text-gray-500 text-center">No favorite cities yet</Text>
            </View>
        );
    }

    const renderItem = ({ item }) => (
        <View className="flex-row justify-between items-center p-3 border-b border-gray-100">
            <TouchableOpacity
                className="flex-1"
                onPress={() => fetchWeatherData(item)}
            >
                <Text className="text-lg text-gray-800">{item}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => removeFavorite(item)}>
                <Ionicons name="close-circle-outline" size={24} color="#FF6B6B" />
            </TouchableOpacity>
        </View>
    );

    return (
        <View className="bg-white rounded-lg shadow-sm mb-4">
            <Text className="text-lg font-bold p-3 border-b border-gray-100">Favorite Cities</Text>
            <FlatList
                data={favorites}
                renderItem={renderItem}
                keyExtractor={item => item}
            />
        </View>
    );
});

export default FavoritesList;
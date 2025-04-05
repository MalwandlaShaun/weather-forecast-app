// src/components/CurrentWeather.js
import React from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { observer } from 'mobx-react-lite';
import weatherStore from '../stores/weatherStore';
import WeatherIcon from './WeatherIcon';

const CurrentWeather = observer(() => {
    const { currentWeather, loading, error, toggleFavorite, isFavorite, temperatureSymbol, convertTemperature } = weatherStore;

    if (loading) {
        return <ActivityIndicator size="large" color="#4A90E2" className="my-4" />;
    }

    if (error) {
        return <Text className="text-red-500 text-center my-4">Error: {error}</Text>;
    }

    if (!currentWeather) {
        return <Text className="text-gray-500 text-center my-4">Search for a city to see weather</Text>;
    }

    const temp = Math.round(convertTemperature(currentWeather.main.temp));
    const { description, icon } = currentWeather.weather[0];

    return (
        <View className="bg-white rounded-lg p-5 shadow-md mb-5">
            <View className="flex-row justify-between items-center mb-4">
                <View>
                    <Text className="text-3xl font-bold text-gray-800">{currentWeather.name}</Text>
                    <Text className="text-gray-500">{new Date().toLocaleDateString()}</Text>
                </View>
                <TouchableOpacity onPress={() => toggleFavorite(currentWeather.name)}>
                    <Ionicons name={isFavorite ? "heart" : "heart-outline"} size={28} color={isFavorite ? "#FF6B6B" : "#BDBDBD"} />
                </TouchableOpacity>
            </View>

            <View className="flex-row items-center justify-between">
                <View className="flex-row items-center">
                    <WeatherIcon iconCode={icon} size={64} />
                    <View className="ml-2">
                        <Text className="text-5xl font-bold text-gray-800">{temp}{temperatureSymbol}</Text>
                        <Text className="text-gray-600 capitalize">{description}</Text>
                    </View>
                </View>

                <View>
                    <View className="flex-row items-center mb-2">
                        <Ionicons name="water-outline" size={18} color="#4A90E2" />
                        <Text className="ml-1 text-gray-700">{currentWeather.main.humidity}% Humidity</Text>
                    </View>
                    <View className="flex-row items-center">
                        <Ionicons name="speedometer-outline" size={18} color="#4A90E2" />
                        <Text className="ml-1 text-gray-700">{currentWeather.main.pressure} hPa</Text>
                    </View>
                    <View className="flex-row items-center mt-2">
                        <Ionicons name="wind-outline" size={18} color="#4A90E2" />
                        <Text className="ml-1 text-gray-700">{currentWeather.wind.speed} m/s</Text>
                    </View>
                </View>
            </View>
        </View>
    );
});

export default CurrentWeather;
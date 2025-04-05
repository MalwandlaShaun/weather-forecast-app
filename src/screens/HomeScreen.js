// src/screens/HomeScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import { observer } from 'mobx-react-lite';
import { Ionicons } from '@expo/vector-icons';
import weatherStore from '../stores/weatherStore';
import HourlyForecast from '../components/HourlyForecast';
import DailyForecast from '../components/DailyForecast';
import SearchBar from '../components/SearchBar';

const HomeScreen = observer(({ navigation }) => {
    const { currentWeather, loading, error, currentCity, temperatureSymbol } = weatherStore;
    const [showSearch, setShowSearch] = useState(false);

    useEffect(() => {
        // Load data for the default city when component mounts
        if (!currentWeather && !loading) {
            weatherStore.fetchWeatherData('Seongnam-si');
        }
    }, []);

    if (!currentWeather && !loading) {
        return (
            <SafeAreaView className="flex-1 bg-app-bg">
                <View className="flex-1 justify-center items-center">
                    <Text className="text-text-primary text-lg">Loading weather data...</Text>
                </View>
            </SafeAreaView>
        );
    }

    // Handle error state
    if (error) {
        return (
            <SafeAreaView className="flex-1 bg-app-bg">
                <View className="flex-1 justify-center items-center p-4">
                    <Text className="text-red-500 text-lg mb-4">Unable to load weather data</Text>
                    <TouchableOpacity
                        className="bg-accent-blue px-4 py-2 rounded-full"
                        onPress={() => weatherStore.fetchWeatherData('Seongnam-si')}
                    >
                        <Text className="text-white">Retry</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }

    // Render main content when data is available
    return (
        <SafeAreaView className="flex-1 bg-app-bg">
            {showSearch ? (
                <SearchBar onClose={() => setShowSearch(false)} />
            ) : (
                <ScrollView className="flex-1">
                    {/* Header with city name and temperature */}
                    <View className="px-5 pt-8 pb-4">
                        <Text className="text-text-primary text-2xl font-semibold">{currentCity}</Text>
                        <View className="flex-row items-start mt-2">
                            <Text className="text-text-primary text-7xl font-thin">
                                {Math.round(currentWeather.main.temp)}°
                            </Text>
                        </View>
                        <Text className="text-text-primary text-xl mt-2">
                            {currentWeather.weather[0].main}
                        </Text>
                        <Text className="text-text-secondary text-sm mt-1">
                            H:{Math.round(currentWeather.main.temp_max)}° L:{Math.round(currentWeather.main.temp_min)}°
                        </Text>

                        <Text className="text-text-secondary text-xs mt-6">
                            Cloudy conditions from 1AM-9AM, with showers expected at 8AM.
                        </Text>
                    </View>

                    {/* Hourly forecast section */}
                    <View className="px-5 py-3">
                        <Text className="text-text-secondary text-xs mb-1">NOW</Text>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="py-2">
                            {[
                                { time: 'Now', icon: 'cloud', temp: '21°' },
                                { time: '10PM', icon: 'cloud-outline', temp: '20°' },
                                { time: '11PM', icon: 'cloud', temp: '19°' },
                                { time: '12AM', icon: 'cloud', temp: '19°' },
                                { time: '1AM', icon: 'cloud', temp: '18°' },
                            ].map((item, index) => (
                                <View key={index} className="items-center mr-6">
                                    <Text className="text-text-secondary text-xs mb-2">{item.time}</Text>
                                    <Ionicons name={item.icon} size={24} color="white" />
                                    <Text className="text-text-primary text-sm mt-2">{item.temp}</Text>
                                </View>
                            ))}
                        </ScrollView>
                    </View>

                    {/* 10-day forecast section */}
                    <View className="px-5 py-3 mt-2">
                        <Text className="text-text-secondary text-xs mb-1">10-DAY FORECAST</Text>
                        <DailyForecast />
                    </View>

                    {/* Navigation buttons */}
                    <View className="flex-row justify-center py-4 mt-2">
                        <TouchableOpacity className="px-2" onPress={() => navigation.navigate('Tabs', { screen: 'Home' })}>
                            <View className="h-1 w-8 bg-text-primary rounded-full" />
                        </TouchableOpacity>
                        <TouchableOpacity className="px-2" onPress={() => navigation.navigate('Tabs', { screen: 'Details' })}>
                            <View className="h-1 w-8 bg-text-secondary rounded-full" />
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            )}

            {/* Search button */}
            {!showSearch && (
                <TouchableOpacity
                    className="absolute bottom-6 right-6 bg-text-primary rounded-full p-3"
                    onPress={() => setShowSearch(true)}
                >
                    <Ionicons name="search" size={24} color="black" />
                </TouchableOpacity>
            )}
        </SafeAreaView>
    );
});

export default HomeScreen;
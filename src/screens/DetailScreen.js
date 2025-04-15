// src/screens/DetailScreen.js
import React from 'react';
import { View, Text, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { observer } from 'mobx-react-lite';
import weatherStore from '../stores/weatherStore';

const DetailSection = ({ title, children }) => (
    <View className="mb-8">
        <View className="flex-row items-center mb-2">
            <Ionicons name="ellipse" size={10} color="#4A90E2" />
            <Text className="text-text-secondary uppercase text-xs ml-1">{title}</Text>
        </View>
        {children}
    </View>
);

const DetailScreen = observer(({ navigation }) => {

    console.log("DetailsScreen component rendering")
    const { currentWeather, currentCity } = weatherStore;

    if (!currentWeather) {
        return (
            <SafeAreaView className="flex-1 bg-app-bg">
                <View className="flex-1 justify-center items-center">
                    <Text className="text-text-primary">Loading weather data...</Text>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView className="flex-1 bg-app-bg">
            <ScrollView className="flex-1 px-5">
                {/* Header */}
                <View className="pt-8 pb-4">
                    <Text className="text-text-primary text-2xl font-semibold">{currentCity}</Text>
                    <Text className="text-text-primary text-xl mt-1">
                        21° | Partly Cloudy
                    </Text>
                </View>


                <DetailSection title="10-DAY FORECAST">
                    <TouchableOpacity
                        className="flex-row items-center justify-between bg-card-bg rounded-xl p-3 mt-2"
                        onPress={() => navigation.navigate('Tabs', { screen: 'Home' })}
                    >
                        <Text className="text-text-primary">See All</Text>
                        <Ionicons name="chevron-forward" size={20} color="white" />
                    </TouchableOpacity>
                </DetailSection>

                {/* UV Index Section */}
                <DetailSection title="UV INDEX">
                    <View className="bg-card-bg rounded-xl p-4">
                        <Text className="text-text-primary text-2xl font-semibold">0</Text>
                        <Text className="text-text-primary mt-1">Low</Text>
                        <View className="h-2 bg-app-bg rounded-full mt-3 mb-1">
                            <View className="h-2 bg-green-500 rounded-full" style={{ width: '10%' }} />
                        </View>
                        <Text className="text-text-secondary text-sm mt-1">
                            Low for the rest of the day
                        </Text>
                    </View>
                </DetailSection>

                {/* Sunrise/Sunset Section */}
                <DetailSection title="SUNRISE">
                    <View className="bg-card-bg rounded-xl p-4">
                        <Text className="text-text-primary text-lg mb-1">6:28AM</Text>
                        <Text className="text-text-secondary text-sm">Sunset: 6:10PM</Text>
                    </View>
                </DetailSection>

                {/* Wind Section */}
                <DetailSection title="WIND">
                    <View className="bg-card-bg rounded-xl p-4 flex-row items-center">
                        <View className="mr-6">
                            <Ionicons name="arrow-down" size={24} color="white" />
                        </View>
                        <View>
                            <Text className="text-text-primary text-lg">1</Text>
                            <Text className="text-text-secondary text-sm">mph</Text>
                        </View>
                    </View>
                </DetailSection>

                {/* Rainfall Section */}
                <DetailSection title="RAINFALL">
                    <View className="bg-card-bg rounded-xl p-4">
                        <Text className="text-text-primary text-lg mb-1">0 mm</Text>
                        <Text className="text-text-secondary text-sm">in last 24h</Text>
                        <Text className="text-text-secondary text-sm">Expected in next 24h</Text>
                    </View>
                </DetailSection>

                {/* Pressure Section */}
                <DetailSection title="PRESSURE">
                    <View className="bg-card-bg rounded-xl p-4">
                        <Text className="text-text-primary text-lg mb-1">73%</Text>
                        <Text className="text-text-secondary text-sm">Similar to the actual temperature</Text>
                        <Text className="text-text-secondary text-sm mt-4">The dew point is 16° right now.</Text>
                    </View>
                </DetailSection>

                {/* Navigation buttons */}
                <View className="flex-row justify-center py-4 mt-2 mb-6">
                    <TouchableOpacity className="px-2" onPress={() => navigation.navigate('Tabs', { screen: 'Home' })}>
                        <View className="h-1 w-8 bg-text-secondary rounded-full" />
                    </TouchableOpacity>
                    <TouchableOpacity className="px-2" onPress={() => navigation.navigate('Tabs', { screen: 'Details' })}>
                        <View className="h-1 w-8 bg-text-primary rounded-full" />
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
});

export default DetailScreen;
// src/screens/FavoritesScreen.js
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import FavoritesList from '../components/FavoritesList';

const FavoritesScreen = ({ navigation }) => {
    return (
        <SafeAreaView className="flex-1 bg-gray-100">
            <View className="p-4">
                <View className="flex-row items-center mb-4">
                    <TouchableOpacity onPress={() => navigation.goBack()} className="mr-3">
                        <Ionicons name="arrow-back" size={24} color="#4A90E2" />
                    </TouchableOpacity>
                    <Text className="text-2xl font-bold text-gray-800">Favorites</Text>
                </View>

                <FavoritesList />
            </View>
        </SafeAreaView>
    );
};

export default FavoritesScreen;
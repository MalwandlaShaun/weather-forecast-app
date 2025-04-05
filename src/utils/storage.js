// src/utils/storage.js
import AsyncStorage from '@react-native-async-storage/async-storage';

const FAVORITES_KEY = 'weather_favorites';

export const saveFavorite = async (city) => {
    try {
        const favorites = await getFavorites();
        if (!favorites.includes(city)) {
            favorites.push(city);
            await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
        }
        return favorites;
    } catch (error) {
        console.error('Error saving favorite:', error);
        throw error;
    }
};

export const removeFavorite = async (city) => {
    try {
        const favorites = await getFavorites();
        const updatedFavorites = favorites.filter(item => item !== city);
        await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));
        return updatedFavorites;
    } catch (error) {
        console.error('Error removing favorite:', error);
        throw error;
    }
};

export const getFavorites = async () => {
    try {
        const favorites = await AsyncStorage.getItem(FAVORITES_KEY);
        return favorites ? JSON.parse(favorites) : [];
    } catch (error) {
        console.error('Error getting favorites:', error);
        return [];
    }
};

export const saveLastViewedCity = async (city) => {
    try {
        await AsyncStorage.setItem('last_city', city);
    } catch (error) {
        console.error('Error saving last city:', error);
    }
};

export const getLastViewedCity = async () => {
    try {
        return await AsyncStorage.getItem('last_city') || 'London'; // Default city
    } catch (error) {
        console.error('Error getting last city:', error);
        return 'London'; // Default city
    }
};
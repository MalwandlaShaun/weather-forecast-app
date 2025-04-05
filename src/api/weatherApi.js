// src/api/weatherApi.js
import axios from 'axios';

const API_KEY = 'YOUR_API_KEY'; // Replace with your actual API key
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const fetchCurrentWeather = async (city) => {
    try {
        const response = await axios.get(`${BASE_URL}/weather`, {
            params: {
                q: city,
                appid: API_KEY,
                units: 'metric', // or 'imperial' for Fahrenheit
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching current weather:', error);
        throw error;
    }
};

export const fetch5DayForecast = async (city) => {
    try {
        const response = await axios.get(`${BASE_URL}/forecast`, {
            params: {
                q: city,
                appid: API_KEY,
                units: 'metric', // or 'imperial' for Fahrenheit
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching forecast:', error);
        throw error;
    }
};

// Modify src/api/weatherApi.js to include hourly data
/*
export const fetch5DayForecast = async (city) => {
    try {
        const response = await axios.get(`${BASE_URL}/forecast`, {
            params: {
                q: city,
                appid: API_KEY,
                units: 'metric',
                cnt: 40, // Get up to 40 time points (3-hour intervals for 5 days)
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching forecast:', error);
        throw error;
    }
};*/

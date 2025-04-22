import axios from 'axios';
import { BASE_URL, API_KEY } from "@env";

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

// api.openweathermap.org/data/2.5/forecast/daily?q=London&units=metric&cnt=7&appid={API key}
export const fetch5DayForecast = async (city) => {
    try {
        const response = await axios.get(`${BASE_URL}/forecast/daily`, {
            params: {
                q: city,
                cnt: 5, // 5-day forecast
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

import axios from 'axios';
import dotenv from 'dotenv'


dotenv.config()
//https://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID={API key}
export const fetchCurrentWeather = async (city) => {
    try {
        const response = await axios.get(`${process.env.BASE_URL}/weather`, {
            params: {
                q: city,
                appid: process.env.API_KEY,
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
    // const city = 'johannesburg'; // Hardcoded city name as requested

    try {
        const response = await axios.get(`${process.env.BASE_URL}/forecast/daily`, {
            params: {
                q: city,
                cnt: 5, // 5-day forecast
                appid: process.env.API_KEY,
                units: 'metric', // or 'imperial' for Fahrenheit
            },
        });
        return response.data;
    } catch (error) {
        console.error();
        console.error('Error fetching forecast for Johannesburg:', error);
        throw error;
    }
};



/*export const fetch5DayForecast = async (city) => {
   // const city = 'johannesburg'; // Hardcoded city name as requested

    // Construct the parameters object
    const params = {
        q: city,
        cnt: 5, // 5-day forecast
        appid: API_KEY,
        units: 'metric', // or 'imperial' for Fahrenheit
    };

    // Construct the full URL with query parameters for logging
    const queryString = Object.keys(params)
        .map(key => `${key}=${encodeURIComponent(params[key])}`)
        .join('&');
    const fullUrl = `${BASE_URL}/forecast/daily?${queryString}`;

    try {
        const response = await axios.get(`${BASE_URL}/forecast/daily`, { params });
        return response.data;
    } catch (error) {
        // Log the full endpoint URL that was called
        console.error('Error fetching forecast. Full endpoint URL:', fullUrl);
        console.error('Error details:', error);
        throw error;
    }
};*/
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

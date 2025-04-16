/*
// src/stores/weatherStore.js
import { makeAutoObservable, runInAction } from 'mobx';
import { fetchCurrentWeather, fetch5DayForecast } from '../api/weatherApi';
import {
    saveFavorite,
    removeFavorite,
    getFavorites,
    saveLastViewedCity,
    getLastViewedCity
} from '../utils/storage';

class WeatherStore {
    currentWeather = null;
    forecast = [];
    favorites = [];
    loading = false;
    error = null;
    currentCity = '';
    temperatureUnit = 'celsius'; // 'celsius' or 'fahrenheit'

    constructor() {
        makeAutoObservable(this);
        this.init();
    }

    async init() {
        try {
            const favorites = await getFavorites();
            const lastCity = await getLastViewedCity();

            runInAction(() => {
                this.favorites = favorites;
                this.currentCity = lastCity;
            });

            if (lastCity) {
                this.fetchWeatherData(lastCity);
            }
        } catch (error) {
            console.error('Initialization error:', error);
        }
    }

    async fetchWeatherData(city) {
        try {
            this.loading = true;
            this.error = null;

            const [currentWeather, forecastData] = await Promise.all([
                fetchCurrentWeather(city),
                fetch5DayForecast(city)
            ]);

            // Process forecast data to get daily forecasts
            const dailyForecasts = this.processForecastData(forecastData);

            runInAction(() => {
                this.currentWeather = currentWeather;
                this.forecast = dailyForecasts;
                this.currentCity = city;
                this.loading = false;
            });

            saveLastViewedCity(city);
        } catch (error) {
            runInAction(() => {
                this.error = error.message;
                this.loading = false;
            });
        }
    }

    processForecastData(forecastData) {
        // Group forecast data by day
        const dailyData = {};

        forecastData.list.forEach(item => {
            const date = new Date(item.dt * 1000).toDateString();

            if (!dailyData[date]) {
                dailyData[date] = item;
            }
        });

        // Convert to array
        return Object.values(dailyData).slice(0, 5); // Get 5 days
    }

    async toggleFavorite(city) {
        try {
            let updatedFavorites;

            if (this.favorites.includes(city)) {
                updatedFavorites = await removeFavorite(city);
            } else {
                updatedFavorites = await saveFavorite(city);
            }

            runInAction(() => {
                this.favorites = updatedFavorites;
            });
        } catch (error) {
            console.error('Error toggling favorite:', error);
        }
    }

    toggleTemperatureUnit() {
        this.temperatureUnit = this.temperatureUnit === 'celsius' ? 'fahrenheit' : 'celsius';
    }

    convertTemperature(temp) {
        if (this.temperatureUnit === 'fahrenheit') {
            return (temp * 9/5) + 32;
        }
        return temp;
    }

    get isFavorite() {
        return this.favorites.includes(this.currentCity);
    }

    get temperatureSymbol() {
        return this.temperatureUnit === 'celsius' ? '°C' : '°F';
    }
}

export default new WeatherStore();*/
// src/stores/weatherStore.js
import { makeAutoObservable, runInAction } from 'mobx';
import { fetchCurrentWeather, fetch5DayForecast } from '../api/weatherApi';
import { saveFavorite, removeFavorite, getFavorites, saveLastViewedCity, getLastViewedCity } from '../utils/storage';

class WeatherStore {
    currentWeather = null;
    forecast = null;
    favorites = [];
    loading = false;
    error = null;
    currentCity = '';
    temperatureUnit = 'celsius'; // 'celsius' or 'fahrenheit'

    constructor() {
        makeAutoObservable(this);
        this.init();
    }

    async init() {
        try {
            const favorites = await getFavorites();
            const lastCity = await getLastViewedCity() || 'Johannesburg';

            runInAction(() => {
                this.favorites = favorites;
                this.currentCity = lastCity;
            });

            if (lastCity) {
                this.fetchWeatherData(lastCity);
            }
        } catch (error) {
            console.error('Initialization error:', error);
        }
    }

    async fetchWeatherData(city) {
        try {
            this.loading = true;
            this.error = null;

            const [currentWeather, forecastData] = await Promise.all([
                fetchCurrentWeather(city),
                // fetch5DayForecast(city)
            ]);

            runInAction(() => {
                this.currentWeather = currentWeather;
                this.forecast = forecastData;
                this.currentCity = city;
                this.loading = false;
            });

            saveLastViewedCity(city);
        } catch (error) {
            runInAction(() => {
                this.error = error.message;
                this.loading = false;
            });
        }
    }

    async toggleFavorite(city) {
        try {
            let updatedFavorites;

            if (this.favorites.includes(city)) {
                updatedFavorites = await removeFavorite(city);
            } else {
                updatedFavorites = await saveFavorite(city);
            }

            runInAction(() => {
                this.favorites = updatedFavorites;
            });
        } catch (error) {
            console.error('Error toggling favorite:', error);
        }
    }

    toggleTemperatureUnit() {
        this.temperatureUnit = this.temperatureUnit === 'celsius' ? 'fahrenheit' : 'celsius';
    }

    convertTemperature(temp) {
        if (this.temperatureUnit === 'fahrenheit') {
            return (temp * 9/5) + 32;
        }
        return temp;
    }

    get isFavorite() {
        return this.favorites.includes(this.currentCity);
    }

    get temperatureSymbol() {
        return this.temperatureUnit === 'celsius' ? '°C' : '°F';
    }

    getWeatherIcon(condition) {
        const weatherIcons = {
            'Clear': 'sunny',
            'Clouds': 'cloud',
            'Rain': 'rainy',
            'Drizzle': 'rainy',
            'Thunderstorm': 'thunderstorm',
            'Snow': 'snow',
            'Mist': 'water-outline',
            'Fog': 'water',
            'Haze': 'water',
        };

        return weatherIcons[condition] || 'cloud';
    }
}

export default new WeatherStore();
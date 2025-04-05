// Add this to src/components/HourlyForecast.js
import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { observer } from 'mobx-react-lite';
import weatherStore from '../stores/weatherStore';
import WeatherIcon from './WeatherIcon';

const HourlyForecast = observer(({ forecastData }) => {
    const { temperatureSymbol, convertTemperature } = weatherStore;

    // Take the first day's hourly forecasts (limited to 8 hours)
    const hourlyData = forecastData.list.slice(0, 8);

    return (
        <View className="mb-5">
            <Text className="text-lg font-bold text-gray-800 mb-2">Today's Hourly Forecast</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {hourlyData.map(item => {
                    const time = new Date(item.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                    const temp = Math.round(convertTemperature(item.main.temp));

                    return (
                        <View key={item.dt} className="mr-4 items-center bg-white p-3 rounded-lg shadow-sm" style={{ width: 80 }}>
                            <Text className="font-medium text-gray-700">{time}</Text>
                            <WeatherIcon iconCode={item.weather[0].icon} size={30} />
                            <Text className="text-lg font-bold">{temp}{temperatureSymbol}</Text>
                        </View>
                    );
                })}
            </ScrollView>
        </View>
    );
});

export default HourlyForecast;
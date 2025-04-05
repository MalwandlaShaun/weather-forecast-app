// src/components/ForecastItem.js
import React from 'react';
import { View, Text } from 'react-native';
import { observer } from 'mobx-react-lite';
import weatherStore from '../stores/weatherStore';
import WeatherIcon from './WeatherIcon';

const ForecastItem = observer(({ item }) => {
    const { temperatureSymbol, convertTemperature } = weatherStore;
    const date = new Date(item.dt * 1000);
    const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
    const temp = Math.round(convertTemperature(item.main.temp));

    return (
        <View className="bg-white rounded-lg p-3 shadow-sm mr-4 items-center" style={{ width: 100 }}>
            <Text className="font-bold text-gray-700">{dayName}</Text>
            <WeatherIcon iconCode={item.weather[0].icon} size={40} />
            <Text className="text-xl font-bold text-gray-800">{temp}{temperatureSymbol}</Text>
            <Text className="text-gray-600 text-xs capitalize">{item.weather[0].description}</Text>
        </View>
    );
});

export default ForecastItem;
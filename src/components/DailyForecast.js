// src/components/DailyForecast.js
import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { observer } from 'mobx-react-lite';
import weatherStore from '../stores/weatherStore';

const DailyForecast = observer(() => {
    // Hard-coded data to match the design
    const dailyData = [
        { day: 'Today', icon: 'sunny', high: 29, low: 15, rainChance: 0 },
        { day: 'Mon', icon: 'cloud', high: 27, low: 16, rainChance: 30 },
        { day: 'Tue', icon: 'cloud', high: 25, low: 20, rainChance: 40 },
        { day: 'Wed', icon: 'rainy', high: 25, low: 17, rainChance: 70 },
        { day: 'Thu', icon: 'rainy', high: 25, low: 17, rainChance: 60 },
        { day: 'Fri', icon: 'cloudy', high: 26, low: 20, rainChance: 50 },
        { day: 'Sat', icon: 'sunny', high: 25, low: 18, rainChance: 0 },
        { day: 'Sun', icon: 'rainy', high: 21, low: 13, rainChance: 60 },
        { day: 'Mon', icon: 'cloud', high: 19, low: 12, rainChance: 30 },
        { day: 'Tue', icon: 'sunny', high: 25, low: 16, rainChance: 0 },
    ];

    return (
        <View>
            {dailyData.map((item, index) => (
                <View
                    key={index}
                    className={`flex-row items-center justify-between py-3 ${
                        index < dailyData.length - 1 ? 'border-b border-gray-800' : ''
                    }`}
                >
                    <View className="w-16">
                        <Text className="text-text-primary">{item.day}</Text>
                        {item.rainChance > 0 && (
                            <Text className="text-text-secondary text-xs">{item.rainChance}%</Text>
                        )}
                    </View>

                    <View className="w-8 items-center">
                        <Ionicons
                            name={item.icon}
                            size={20}
                            color={item.icon === 'sunny' ? '#FFD700' : 'white'}
                        />
                    </View>

                    <View className="flex-1 flex-row items-center">
                        <View className="flex-row items-center flex-1">
                            <View className="h-1 rounded-full bg-forecast-bar flex-1" />
                        </View>
                        <Text className="text-text-primary ml-2 w-8 text-right">{item.high}°</Text>
                        <Text className="text-text-secondary ml-2 w-8 text-right">{item.low}°</Text>
                    </View>
                </View>
            ))}
        </View>
    );
});

export default DailyForecast;
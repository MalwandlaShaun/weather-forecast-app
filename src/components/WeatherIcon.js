// src/components/WeatherIcon.js
import React from 'react';
import { Image } from 'react-native';

const WeatherIcon = ({ iconCode, size = 50 }) => {
    const iconUrl = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;

    return (
        <Image
            source={{ uri: iconUrl }}
            style={{ width: size, height: size }}
            className="bg-transparent"
        />
    );
};

export default WeatherIcon;
# Weather Forecast App

A React Native application that displays weather information for cities worldwide, built with Expo.

![Weather App Screenshot](https://via.placeholder.com/800x400?text=Weather+App+Screenshot)

## Features

### Core Features
- 🔍 Search weather by city name
- 🌤️ Display current weather conditions
- 📅 Show 5-day weather forecasts
- ⭐ Save favorite cities

### Bonus Features
- 🌡️ Toggle between Celsius and Fahrenheit
- 📱 Offline storage for favorite cities
- 🎨 Dynamic weather icons based on conditions
- ⏰ Hourly weather breakdown

## Tech Stack

- **React Native** - Mobile app framework
- **Expo** - Development platform
- **Axios** - API client
- **React Query** - Data fetching and caching
- **MobX** - State management
- **NativeWind** - Styling with Tailwind CSS
- **AsyncStorage** - Local storage
- **React Navigation** - Navigation

## Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/weather-forecast-app.git
cd weather-forecast-app
```

2. Install dependencies
```bash
npm install
```

3. Create a `.env` file in the root directory and add your OpenWeatherMap API key
```
OPENWEATHER_API_KEY=your_api_key_here
```

4. Start the development server
```bash
npx expo start
```

## Project Structure

```
weather-app/
├── app/
│   ├── components/        # Reusable UI components
│   ├── hooks/             # Custom hooks
│   ├── navigation/        # Navigation configuration
│   ├── screens/           # App screens
│   ├── services/          # API services
│   ├── stores/            # MobX stores
│   └── utils/             # Helper functions
├── assets/                # Images, icons, fonts
├── app.json               # Expo configuration
└── App.js                 # Entry point
```

## Key Components

### Screens

- **HomeScreen**: Displays current weather and forecast for selected city
- **SearchScreen**: Search for cities and add them to favorites
- **DetailScreen**: Detailed weather information for a specific city
- **FavoritesScreen**: List of saved favorite cities

### State Management

The app uses MobX for state management. The main store is `weatherStore`, which handles:

- Fetching and storing weather data
- Managing favorite cities
- Temperature unit conversion
- Persisting data with AsyncStorage

## API Integration

The app uses the [OpenWeatherMap API](https://openweathermap.org/api) for weather data:

- Current weather data
- 5-day forecast
- Weather icons

## Data Flow

1. User searches for a city
2. App fetches current weather data from OpenWeatherMap
3. App fetches 5-day forecast using coordinates from current weather
4. Data is stored in MobX store
5. UI components observe and render data from store
6. Favorite cities are persisted in AsyncStorage

## Implementation Details

### Temperature Unit Toggle

The app allows users to switch between Celsius and Fahrenheit:

```javascript
// In weatherStore.js
toggleTemperatureUnit() {
  this.temperatureUnit = this.temperatureUnit === 'celsius' ? 'fahrenheit' : 'celsius';
}

getTemperature(celsius) {
  return this.temperatureUnit === 'celsius' 
    ? celsius 
    : this.convertToFahrenheit(celsius);
}
```

### Favorites Management

Cities can be added to favorites and persisted locally:

```javascript
// Add to favorites
async addToFavorites(cityData) {
  if (!this.favorites.some(city => city.id === cityData.id)) {
    this.favorites.push(cityData);
    await this.saveFavorites();
  }
}

// Save to AsyncStorage
async saveFavorites() {
  try {
    await AsyncStorage.setItem('@favorites', JSON.stringify(this.favorites));
  } catch (error) {
    console.error('Error saving favorites:', error);
  }
}
```

### Weather Icons

The app uses dynamic weather icons from OpenWeatherMap:

```javascript
// In weatherUtils.js
export const getWeatherIcon = (iconCode) => {
  return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
};
```

## Testing

Run tests using Jest:

```bash
npm test
```

The app includes:
- Unit tests for components
- Integration tests for API services
- Store validation tests

## Building for Production

### Generate Android APK

```bash
eas build -p android --profile preview
```

### Generate iOS Build

```bash
eas build -p ios --profile preview
```

## Performance Considerations

- API responses are cached to reduce network requests
- Images are optimized for performance
- Offline support for favorite cities

## Troubleshooting

**API Key Issues**: Ensure your OpenWeatherMap API key is correctly set in the `.env` file.

**Build Errors**: Make sure you have the latest Expo SDK and dependencies installed.

**City Not Found**: Verify the city name is correct and try alternative spellings.

## License

[MIT](LICENSE)

## Acknowledgements

- [OpenWeatherMap](https://openweathermap.org/) for the weather data API
- [Expo](https://expo.dev/) for the development platform
- [PlusNarrative](https://plusnarrative.com/) for the project inspiration

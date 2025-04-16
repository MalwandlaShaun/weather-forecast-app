// App.js
/*import React from 'react';
import { StatusBar } from 'expo-status-bar';
import {SafeAreaView, View} from 'react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AppNavigator from './src/navigation/AppNavigator';
import HomeScreen from "./src/screens/HomeScreen";

const queryClient = new QueryClient();

export default function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <SafeAreaView>
                <StatusBar  />
                <AppNavigator />
            </SafeAreaView>
        </QueryClientProvider>
    );
}*/
// App.js
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AppNavigator from './src/navigation/AppNavigator';
import "./src/global.css"

const queryClient = new QueryClient();

export default function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <View className="flex-1 bg-app-bg">
                <StatusBar style="light" />
                <AppNavigator />
            </View>
        </QueryClientProvider>
    );
}
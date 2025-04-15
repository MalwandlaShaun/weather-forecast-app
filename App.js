// App.js
import React from 'react';
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
                {/*<StatusBar  />*/}
                <HomeScreen />
            </SafeAreaView>
        </QueryClientProvider>
    );
}
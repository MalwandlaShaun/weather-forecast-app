// App.js
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AppNavigator from './src/navigation/AppNavigator';

const queryClient = new QueryClient();

export default function App() {
    // @ts-ignore

    return (
        <QueryClientProvider client={queryClient}>
            {// @ts-ignore
            <View className="flex-1 bg-app-bg">
                <StatusBar style="light" />
                <AppNavigator />
            </View>
            }
        </QueryClientProvider>
    );
}
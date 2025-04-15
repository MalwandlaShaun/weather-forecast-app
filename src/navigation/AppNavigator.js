// src/navigation/AppNavigator.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Image } from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import DetailScreen from '../screens/DetailScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// TabIcon component similar to your working example
const TabIcon = ({ focused, icon, highlightedIcon }) => {
    const iconSource = focused ? highlightedIcon : icon;

    return (
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <Image
                source={iconSource}
                style={{ width: 24, height: 24 }}
                resizeMode="contain"
            />
        </View>
    );
};

// Separate stack navigators for each tab
const HomeStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            {/* Add more screens to this stack as needed */}
        </Stack.Navigator>
    );
};

const DetailStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="DetailScreen" component={DetailScreen} />
            {/* Add more screens to this stack as needed */}
        </Stack.Navigator>
    );
};

// Tab navigator configuration with tabs config array
const TabNavigator = () => {
    const tabsConfig = [
        {
            label: "HomeTab",
            icon: require('../../assets/icons/chart.png'), // Update path to your actual icon
            highlightedIcon: require('../../assets/icons/high-lighted/chart.png'), // Update path
            component: HomeStack,
        },
        {
            label: "DetailTab",
            icon: require('../../assets/icons/profile-circle.png'), // Update path to your actual icon
            highlightedIcon: require('../../assets/icons/high-lighted/profile-circle.png'), // Update path
            component: DetailStack,
        },
    ];

    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: "black",
                    height: 60,
                    paddingBottom: 5,
                },
                tabBarActiveTintColor: "white",
                tabBarInactiveTintColor: "gray",
            }}
        >
            {tabsConfig.map((tab, index) => (
                <Tab.Screen
                    key={index}
                    name={tab.label}
                    component={tab.component}
                    options={{
                        tabBarShowLabel: false,
                        tabBarIcon: ({ focused }) => (
                            <TabIcon
                                focused={focused}
                                icon={tab.icon}
                                highlightedIcon={tab.highlightedIcon}
                            />
                        ),
                    }}
                />
            ))}
        </Tab.Navigator>
    );
};

// Main stack with initial routing
const MainStack = () => {
    return (
        <Stack.Navigator
            initialRouteName="Tabs"
            screenOptions={{ headerShown: false }}
        >
            <Stack.Screen name="Tabs" component={TabNavigator} />
            {/* Add other non-tab screens here that should be accessible from anywhere */}
        </Stack.Navigator>
    );
};

// Root navigator container
const AppNavigator = () => {
    return (
        <NavigationContainer>
            <MainStack />
        </NavigationContainer>
    );
};

export default AppNavigator;
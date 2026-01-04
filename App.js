import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { TrialProvider } from './contexts/TrialContext';

// Import screens
import WelcomeScreen from './screens/WelcomeScreen';
import PantryScreen from './screens/PantryScreen';
import ScannerScreen from './screens/ScannerScreen';
import MealSuggestionsScreen from './screens/MealSuggestionsScreen';
import PaywallScreen from './screens/PaywallScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <TrialProvider>
      <NavigationContainer>
        <StatusBar style="dark" />
        <Stack.Navigator
          initialRouteName="Welcome"
          screenOptions={{
            headerShown: false,
            cardStyle: { backgroundColor: '#f8f9fa' },
          }}
        >
          <Stack.Screen 
            name="Welcome" 
            component={WelcomeScreen}
            options={{ title: 'Welcome' }}
          />
          <Stack.Screen 
            name="Pantry" 
            component={PantryScreen}
            options={{ title: 'My Pantry' }}
          />
          <Stack.Screen 
            name="Scanner" 
            component={ScannerScreen}
            options={{ title: 'Scan Items' }}
          />
          <Stack.Screen 
            name="MealSuggestions" 
            component={MealSuggestionsScreen}
            options={{ title: 'Meal Ideas' }}
          />
          <Stack.Screen 
            name="Paywall" 
            component={PaywallScreen}
            options={{ title: 'Subscribe' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </TrialProvider>
  );
}

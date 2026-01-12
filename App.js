import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { LanguageProvider } from './src/context/LanguageContext';
import LandingScreen from './src/screens/LandingScreen';
import OptionsScreen from './src/screens/OptionsScreen';
import FormTypeScreen from './src/screens/FormTypeScreen';
import OfflineDetailsScreen from './src/screens/OfflineDetailsScreen';
import OnlineDetailsScreen from './src/screens/OnlineDetailsScreen';
import ChatbotScreen from './src/screens/ChatbotScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <LanguageProvider>
      <NavigationContainer>
        <Stack.Navigator 
          initialRouteName="Landing"
          screenOptions={{
            headerStyle: {
              backgroundColor: '#4A90E2',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        >
          <Stack.Screen 
            name="Landing" 
            component={LandingScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen 
            name="Options" 
            component={OptionsScreen}
            options={{ title: 'Select Option' }}
          />
          <Stack.Screen 
            name="FormType" 
            component={FormTypeScreen}
            options={{ title: 'Form Type' }}
          />
          <Stack.Screen 
            name="OfflineDetails" 
            component={OfflineDetailsScreen}
            options={{ title: 'Offline Details' }}
          />
          <Stack.Screen 
            name="OnlineDetails" 
            component={OnlineDetailsScreen}
            options={{ title: 'Online Details' }}
          />
          <Stack.Screen 
            name="Chatbot" 
            component={ChatbotScreen}
            options={{ title: 'AI Assistant' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </LanguageProvider>
  );
}


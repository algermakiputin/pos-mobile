import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function SalesLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{headerShown: false}}>
        <Stack.Screen 
          name="Sales" 
          options={{ 
            headerShown: true,
            headerTitle: 'Sales',
            headerTitleAlign:'center'
          }} 
          />
       <Stack.Screen 
          name="SalesDetails" 
          options={{ 
            headerShown: true,
            headerTitle: 'Sales Details',
            headerTitleAlign:'center'
          }} 
          />
      </Stack>
    </ThemeProvider>
  );
}

import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { Fragment, useEffect, useState } from 'react';
import 'react-native-reanimated';
import * as eva from '@eva-design/eva';
import { ApplicationProvider} from '@ui-kitten/components';
import { useColorScheme } from '@/hooks/useColorScheme';
import { ApolloProvider } from '@apollo/client';
import client from './src/ApolloClient';
import { MenuProvider } from 'react-native-popup-menu';
import {
  Inter_100Thin,
  Inter_200ExtraLight,
  Inter_300Light,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
  Inter_900Black,
} from '@expo-google-fonts/inter';
import { default as mapping } from './mapping.json';
import UserContext from './context/userContext';
import { userDefaultValue } from './context/userContext';
// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    Inter_100Thin,
    Inter_200ExtraLight,
    Inter_300Light,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
    Inter_900Black,
  });
  const [user, setUser] = useState(userDefaultValue.user);
  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ApolloProvider client={client}>
      <ApplicationProvider {...eva} theme={eva.light} customMapping={mapping}>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <MenuProvider>
            <UserContext.Provider value={{ user: user, setUser}}>
              <Stack
                  initialRouteName='(users)'
                >
                <Stack.Screen name="(users)" options={{ headerShown: false}}/>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen name="(categories)" options={{ headerShown: false}}/>
                <Stack.Screen name="(suppliers)" options={{ headerShown: false}}/>
                <Stack.Screen name="index" options={{ headerShown: false}}/>
                <Stack.Screen name="+not-found" />
              </Stack>
            </UserContext.Provider>
          </MenuProvider>
        </ThemeProvider>
      </ApplicationProvider>
    </ApolloProvider>
  );
}

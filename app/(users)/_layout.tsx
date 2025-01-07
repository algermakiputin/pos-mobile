import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import 'react-native-reanimated';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function UsersLayout() {

  return (
    <Stack screenOptions={{headerShown: true, title: 'qew', headerTitle: 'qeqwe'}}>
      <Stack.Screen 
        name="Profile" 
        options={{
          headerShown: true,
          headerTitle: 'Profile',
          headerTitleAlign:'center'
        }}
        />
      <Stack.Screen 
        name="Login" 
        options={{
          headerShown: false,
        }}
        />
      <Stack.Screen 
        name="Register" 
        options={{
          headerShown: true,
        }}
        />
    </Stack>
  );
}

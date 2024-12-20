import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { Fragment } from 'react';
import 'react-native-reanimated'; 

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function SuppliersLayout() { 

  return (
    <Fragment> 
      <Stack>
        <Stack.Screen name="Suppliers" options={{
          headerTitle: "Suppliers"
        }} />
        <Stack.Screen name="NewSupplier" options={{ 
            headerTitle: 'New Supplier',  
        }} />
      </Stack> 
    </Fragment>
  );
}

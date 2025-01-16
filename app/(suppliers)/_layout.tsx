import { Stack, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { Fragment } from 'react';
import { TouchableOpacity } from 'react-native';
import 'react-native-reanimated'; 
import { Text } from '@ui-kitten/components';
import { routes } from '../types/routes';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function SuppliersLayout() { 
  const route = useRouter();

  const newSupplierHandler = () => {
    route.navigate({pathname: routes.newSupplier as any});
  }

  return (
    <Fragment> 
      <Stack>
        <Stack.Screen name="Suppliers" options={{
          headerTitle: "Suppliers",
          headerTitleAlign: 'center',
          headerRight: () => (
            <TouchableOpacity onPress={newSupplierHandler}>
              <Text>New</Text>
            </TouchableOpacity>
          )
        }} />
        <Stack.Screen 
          name="NewSupplier" 
          options={{ 
            headerTitle: 'New Supplier',  
          }} 
          />
        <Stack.Screen 
          name="EditSupplier" 
          options={{ 
            headerTitle: 'Edit Supplier',  
          }} 
          />
      </Stack> 
    </Fragment>
  );
}

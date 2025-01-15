import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';;
import { Stack, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import 'react-native-reanimated';
import { useColorScheme } from '@/hooks/useColorScheme';
import { routes } from '@/app/types/routes';
import { TouchableOpacity, View } from 'react-native';
import { Text } from '@ui-kitten/components';
import InventoryContext, { defaultValue, ObjectFilterEnum, ObjectValue } from './context/InventoryContext';
import { useState } from 'react';
// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function InventoryLayout() {
  const colorScheme = useColorScheme();
  const [ filter, setFilter ] = useState(defaultValue.filters);
  const [selectedCategory, setSelectedCategory] = useState<ObjectValue[]>([]);
  const [selectedSupplier, setSelectedSupplier] = useState<ObjectValue[]>([]);

  const route = useRouter();
  const filterHandler = (filterName: string, value: string | string[]) => {
    setFilter(prevState => ({
      ...prevState,
      [filterName]: filterName == "query" ? value : [...value]
    }));
  }

  const removeFilter = (filterName: ObjectFilterEnum, id: String) => {
    const newFilterValue = filter[filterName]?.filter((category: ObjectValue) => category.id != id);
    filterHandler(filterName, newFilterValue);
  }

  const applyFilterHandler = () => {
    filterHandler('categories', selectedCategory as any);
    filterHandler('suppliers', selectedSupplier as any);
    route.back();
  }

  const filterHeaderRight = () => {
    return (
      <TouchableOpacity onPress={applyFilterHandler}>
        <View>
          <Text>Apply</Text>
        </View>
      </TouchableOpacity>
    )
  }

  const value = {
    filters: filter, 
    setFilter: filterHandler, 
    selectedCategory, 
    selectedSupplier, 
    setSelectedCategory, 
    setSelectedSupplier,
    removeFilter
  }
  return (
    <InventoryContext.Provider value={value}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen 
            name={routes.inventory} 
            options={{ 
              headerShown: true,
              headerTitle: 'Inventory',
              headerTitleAlign:'center',
            }} 
            />
          <Stack.Screen 
            name={routes.newItem}
            options={{ 
              headerShown: true,
              headerTitle: 'New Item',
              headerTitleAlign:'center'
            }} 
            /> 
          <Stack.Screen 
            name={routes.editItem}
            options={{ 
              headerShown: true,
              headerTitle: 'Edit Item',
              headerTitleAlign:'center'
            }} 
            />
          <Stack.Screen 
            name={routes.itemFilter}
            options={{ 
              headerShown: true,
              headerTitle: 'Filter Item',
              headerTitleAlign:'center',
              headerRight: filterHeaderRight,
            }} 
            />
          <Stack.Screen 
            name="ViewItem"
            options={{ 
              headerShown: true,
              headerTitle: 'Item Details',
              headerTitleAlign:'center'
            }} 
            />
        </Stack>
      </ThemeProvider>
    </InventoryContext.Provider>
  );
}

import { Stack, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { Fragment } from 'react';
import 'react-native-reanimated';
import { TouchableOpacity, View, Text } from 'react-native';
import { MenuProvider } from 'react-native-popup-menu';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function CategoriesLayout() { 
  const router = useRouter();
  const HeaderRight = () => {
    return (
      <TouchableOpacity onPress={() => router.navigate({pathname: '/NewCategory'})}>
        <View>
          <Text>New </Text>
        </View>
      </TouchableOpacity>
    )
  };
  return (
    <MenuProvider>
      <Fragment> 
        <Stack>
          <Stack.Screen name="Categories" options={{
            headerTitle: "Categories",
            headerTitleAlign: "center",
            headerRight: () => <HeaderRight />
          }} />
          <Stack.Screen name="NewCategory" options={{ 
            headerTitle: 'New Category',  
          }} />
        </Stack> 
      </Fragment>
    </MenuProvider>
  );
}

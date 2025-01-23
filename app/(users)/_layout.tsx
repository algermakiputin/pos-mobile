import { Text } from '@ui-kitten/components';
import { Stack, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { TouchableOpacity, View } from 'react-native';
import 'react-native-reanimated';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function UsersLayout() {
  const router = useRouter();

  const HeaderRight = () => {
    return (
      <TouchableOpacity onPress={() => router.navigate({pathname: '/NewUser'})}>
        <View>
          <Text>New </Text>
        </View>
      </TouchableOpacity>
    )
  };
  
  return (
    <Stack screenOptions={{headerShown: true, title: 'qew', headerTitle: 'qeqwe'}} initialRouteName='Login'>
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
          headerShown: false,
        }}
        />
      <Stack.Screen 
        name="ManageUsers" 
        options={{
          headerShown: true,
          headerTitle: 'Manage Users',
          headerTitleAlign: 'center',
          headerRight: HeaderRight
        }}
        />
      <Stack.Screen 
        name="NewUser" 
        options={{
          headerShown: true,
          headerTitle: 'New User',
          headerTitleAlign: 'center'
        }}
        />
      <Stack.Screen 
        name="EditUser" 
        options={{
          headerShown: true,
          headerTitle: 'Update User',
          headerTitleAlign: 'center'
        }}
        />
    </Stack>
  );
}

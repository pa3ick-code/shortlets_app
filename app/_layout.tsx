import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useFonts } from 'expo-font';
import { router, Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import 'react-native-reanimated';
import Colors from '@/constants/Colors';


export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    'UbuntuBold': require('../assets/fonts/ubuntu-bold.ttf'),
    'UbuntuMedium': require('../assets/fonts/ubuntu-medium.ttf'),
    UbuntuRegular: require('../assets/fonts/ubuntu-regular.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

      <Stack.Screen 
        name="(modals)/login" 
        options={{ 
          presentation: "modal",
          headerRight: ()=>(
            <TouchableOpacity onPress={ ()=> router.back() }>
              <FontAwesome6 name="times-circle" size={24} color={Colors.grey} />
            </TouchableOpacity>
          )
        }} 
      />

      <Stack.Screen 
        name="(modals)/bookings" 
        options={{ 
          presentation: "modal",
          headerRight: ()=>(
            <TouchableOpacity onPress={ ()=> router.back() }>
              <FontAwesome6 name="times-circle" size={24} color={Colors.grey} />
            </TouchableOpacity>
          )
        }} 
      />

      <Stack.Screen 
        name="listings/[id]" 
        options={{ 
          presentation: "transparentModal",
          animation: "fade",
          headerRight: ()=>(
            <TouchableOpacity onPress={ ()=> router.back() }>
              <FontAwesome6 name="times-circle" size={24} color={Colors.grey} />
            </TouchableOpacity>
          )
        }} 
      />
    </Stack>
  );
}

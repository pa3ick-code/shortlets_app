import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useFonts } from 'expo-font';
import { Stack, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import 'react-native-reanimated';
import Colors from '@/constants/Colors';
import { ClerkProvider, useAuth } from '@clerk/clerk-expo';
import { tokenCache } from '@clerk/clerk-expo/token-cache'
import Toast from 'react-native-toast-message';


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

  return (
    <ClerkProvider tokenCache={tokenCache}>
      <RootLayoutNav />
      <Toast />
    </ClerkProvider>
  );
}

function RootLayoutNav() {
  const router = useRouter();
  const { isLoaded, isSignedIn } = useAuth();

  useEffect(() => {
    if(isLoaded && !isSignedIn){
      router.push('/(modals)/login')
    }
  }, [isLoaded])

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
        name="listing/[id]" 
        options={{ 
          headerTitle: '',
          headerTransparent: true,
          animation: "fade",
          headerBackTitle: 'back',
          // headerRight: ()=>(
          //   <TouchableOpacity onPress={ ()=> router.back() }>
          //     <FontAwesome6 name="times-circle" size={24} color={Colors.grey} />
          //   </TouchableOpacity>
          // )
        }} 
      />
    </Stack>
  );
}

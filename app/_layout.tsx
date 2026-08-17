// app/_layout.tsx
import { useEffect } from 'react';
import { Stack, useRouter, useSegments } from 'expo-router';
import { useAuthStore } from '../stores/authStore';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import {
  PlusJakartaSans_400Regular,
  PlusJakartaSans_500Medium,
  PlusJakartaSans_600SemiBold,
  PlusJakartaSans_700Bold,
  PlusJakartaSans_800ExtraBold,
} from '@expo-google-fonts/plus-jakarta-sans';
import {
  NotoKufiArabic_400Regular,
  NotoKufiArabic_500Medium,
  NotoKufiArabic_600SemiBold,
  NotoKufiArabic_700Bold,
  NotoKufiArabic_800ExtraBold,
} from '@expo-google-fonts/noto-kufi-arabic';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { isAuthenticated, isLoading, needsRoleSelection } = useAuthStore();
  const segments = useSegments();
  const router = useRouter();

  const [fontsLoaded] = useFonts({
    'PlusJakartaSans-Regular': PlusJakartaSans_400Regular,
    'PlusJakartaSans-Medium': PlusJakartaSans_500Medium,
    'PlusJakartaSans-SemiBold': PlusJakartaSans_600SemiBold,
    'PlusJakartaSans-Bold': PlusJakartaSans_700Bold,
    'PlusJakartaSans-ExtraBold': PlusJakartaSans_800ExtraBold,
    'NotoKufiArabic-Regular': NotoKufiArabic_400Regular,
    'NotoKufiArabic-Medium': NotoKufiArabic_500Medium,
    'NotoKufiArabic-SemiBold': NotoKufiArabic_600SemiBold,
    'NotoKufiArabic-Bold': NotoKufiArabic_700Bold,
    'NotoKufiArabic-ExtraBold': NotoKufiArabic_800ExtraBold,
  });

  useEffect(() => {
    if (isLoading || !fontsLoaded) return;

    SplashScreen.hideAsync();

    const inAuthGroup = segments[0] === '(auth)';
    const isRoleSelection = (segments as any)[1] === 'role-selection';

    if (!isAuthenticated && !inAuthGroup) {
      router.replace('/(auth)/login');
    } else if (isAuthenticated) {
      if (needsRoleSelection && !isRoleSelection) {
        router.replace('/(auth)/role-selection');
      } else if (!needsRoleSelection && inAuthGroup) {
        router.replace('/(tabs)');
      }
    }
  }, [isAuthenticated, needsRoleSelection, segments, isLoading, fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <>
      <StatusBar style="auto" />
      <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: '#FFFFFF' } }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      </Stack>
    </>
  );
}

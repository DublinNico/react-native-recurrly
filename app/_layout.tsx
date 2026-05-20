import "@/global.css";
import { SplashScreen, Stack } from "expo-router";
import {useFonts} from "expo-font";
import { useEffect } from "react";

SplashScreen.preventAutoHideAsync().catch(console.error);

export default function RootLayout() {
  const [fontsLoaded] = useFonts ({
    'sans-regular': require('../assets/assets/fonts/PlusJakartaSans-Regular.ttf'),
    'sans-bold': require('../assets/assets/fonts/PlusJakartaSans-Bold.ttf'),
    'sans-medium': require('../assets/assets/fonts/PlusJakartaSans-Medium.ttf'),
    'sans-semibold': require('../assets/assets/fonts/PlusJakartaSans-SemiBold.ttf'),
    'sans-extrabold': require('../assets/assets/fonts/PlusJakartaSans-ExtraBold.ttf'),
    'sans-light': require('../assets/assets/fonts/PlusJakartaSans-Light.ttf')
  })

  useEffect(() => {
    if(fontsLoaded) {
      SplashScreen.hideAsync()
    }
  }, [fontsLoaded])

  if (!fontsLoaded) return null;

  return <Stack screenOptions={{ headerShown: false }} />;
}

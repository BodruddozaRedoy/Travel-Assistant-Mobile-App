import { Redirect } from "expo-router";
import { useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";

export default function OnboardingIndex() {
  useEffect(() => {
    const hideSplash = async () => {
      try {
        await SplashScreen.hideAsync();
      } catch (error) {
        console.log(error)
      }
    };

    hideSplash();
  }, []);

  return <Redirect href="/onboarding/screen1" />;
}

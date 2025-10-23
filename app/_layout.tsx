// import { usePushNotifications } from "@/hooks/usePushNotification";
import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function RootLayout() {
    // const { expoPushToken, notification } = usePushNotifications();
    // console.log("Push Token:", expoPushToken);
    // console.log("Notification:", notification);
    return (
        <GestureHandlerRootView>
            <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="onboarding" />
            </Stack>
        </GestureHandlerRootView>
    );
}

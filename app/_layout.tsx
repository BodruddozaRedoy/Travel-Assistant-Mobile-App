// import { usePushNotifications } from "@/hooks/usePushNotification";
import {
    QueryClient,
    QueryClientProvider
} from '@tanstack/react-query';
import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Toast from 'react-native-toast-message';

const queryClient = new QueryClient()

export default function RootLayout() {
    // const { expoPushToken, notification } = usePushNotifications();
    // console.log("Push Token:", expoPushToken);
    // console.log("Notification:", notification);
    return (
        <QueryClientProvider client={queryClient}>
            <GestureHandlerRootView>
                <Stack screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="onboarding" />
                    <Toast />
                </Stack>
            </GestureHandlerRootView>
        </QueryClientProvider>
    );
}

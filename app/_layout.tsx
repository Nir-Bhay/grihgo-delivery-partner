/**
 * GRIHGO Delivery Partner App - Root Layout
 * Simplified version without custom splash logic
 */

import { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import * as SplashScreen from 'expo-splash-screen';
import { ThemeProvider, I18nProvider } from '@/contexts';
import { sounds } from '@/utils/sounds';
import { logger } from '@/utils/logger';

const TAG = 'RootLayout';

// Hide splash screen immediately when app loads
SplashScreen.hideAsync();

export default function RootLayout() {
    useEffect(() => {
        logger.lifecycle(TAG, 'mount');
        sounds.init();

        return () => {
            logger.lifecycle(TAG, 'unmount');
            sounds.cleanup();
        };
    }, []);

    return (
        <GestureHandlerRootView style={styles.container}>
            <ThemeProvider>
                <I18nProvider>
                    <StatusBar style="dark" />
                    <Stack
                        screenOptions={{
                            headerShown: false,
                            animation: 'slide_from_right',
                        }}
                    >
                        <Stack.Screen name="index" />
                        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
                        <Stack.Screen name="(main)" options={{ headerShown: false }} />
                        <Stack.Screen
                            name="order"
                            options={{
                                headerShown: false,
                                presentation: 'modal',
                            }}
                        />
                    </Stack>
                </I18nProvider>
            </ThemeProvider>
        </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

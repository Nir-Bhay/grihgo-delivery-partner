/**
 * GRIHGO Delivery Partner App - Root Layout
 * Fixed splash screen handling for stable app startup
 */

import { useEffect, useState, useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as SplashScreen from 'expo-splash-screen';
import { ThemeProvider, I18nProvider } from '@/contexts';
import { useAuthStore } from '@/store/authStore';
import { sounds } from '@/utils/sounds';
import { logger } from '@/utils/logger';

const TAG = 'RootLayout';

// Prevent splash screen from auto-hiding before app is ready
SplashScreen.preventAutoHideAsync().catch(() => {
    // Ignore errors - splash may already be hidden
});

export default function RootLayout() {
    const [appIsReady, setAppIsReady] = useState(false);
    const [storeHydrated, setStoreHydrated] = useState(false);

    useEffect(() => {
        async function prepare() {
            try {
                logger.lifecycle(TAG, 'mount');

                // Wait for Zustand store to hydrate from AsyncStorage
                const unsubscribe = useAuthStore.persist.onFinishHydration(() => {
                    setStoreHydrated(true);
                });

                // Check if already hydrated
                if (useAuthStore.persist.hasHydrated()) {
                    setStoreHydrated(true);
                }

                // Initialize sounds safely
                await sounds.init();

                return () => {
                    unsubscribe();
                };
            } catch (e) {
                console.warn('App preparation error:', e);
                // Still mark hydrated to prevent app from hanging
                setStoreHydrated(true);
            } finally {
                // Mark app as ready regardless of errors
                setAppIsReady(true);
            }
        }

        prepare();

        return () => {
            logger.lifecycle(TAG, 'unmount');
            sounds.cleanup();
        };
    }, []);

    const onLayoutRootView = useCallback(async () => {
        if (appIsReady && storeHydrated) {
            // Hide splash screen after layout is complete AND store is hydrated
            await SplashScreen.hideAsync();
        }
    }, [appIsReady, storeHydrated]);

    // Wait for both app ready AND store hydration
    if (!appIsReady || !storeHydrated) {
        return null;
    }

    return (
        <SafeAreaProvider>
            <GestureHandlerRootView style={styles.container} onLayout={onLayoutRootView}>
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
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

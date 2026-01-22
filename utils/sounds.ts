/**
 * GRIHGO Delivery Partner App - Sound Effects
 * Audio feedback for order alerts and actions
 */

import { Audio } from 'expo-av';
import { Platform } from 'react-native';

// Sound instances cache
let orderAlertSound: Audio.Sound | null = null;
let successSound: Audio.Sound | null = null;

export const sounds = {
    /**
     * Initialize audio system - with safe fallback for Android
     */
    init: async () => {
        if (Platform.OS === 'web') return;

        try {
            await Audio.setAudioModeAsync({
                allowsRecordingIOS: false,
                playsInSilentModeIOS: true,
                staysActiveInBackground: false,
                shouldDuckAndroid: true,
            });
        } catch (error) {
            // Silently fail - audio is not critical for app function
            console.warn('Failed to initialize audio:', error);
        }
    },

    /**
     * Play order alert sound
     */
    orderAlert: async () => {
        if (Platform.OS === 'web') return;

        try {
            // Using system sound as fallback - you can add custom sound files
            if (!orderAlertSound) {
                const { sound } = await Audio.Sound.createAsync(
                    // Using a built-in beep pattern
                    { uri: 'https://notificationsounds.com/storage/sounds/file-sounds-1152-pristine.mp3' },
                    { shouldPlay: true, volume: 1.0 }
                );
                orderAlertSound = sound;
            } else {
                await orderAlertSound.replayAsync();
            }
        } catch (error) {
            console.warn('Failed to play order alert:', error);
        }
    },

    /**
     * Play success sound
     */
    success: async () => {
        if (Platform.OS === 'web') return;

        try {
            if (!successSound) {
                const { sound } = await Audio.Sound.createAsync(
                    { uri: 'https://notificationsounds.com/storage/sounds/file-sounds-1150-eventually.mp3' },
                    { shouldPlay: true, volume: 0.7 }
                );
                successSound = sound;
            } else {
                await successSound.replayAsync();
            }
        } catch (error) {
            console.warn('Failed to play success sound:', error);
        }
    },

    /**
     * Cleanup sounds on unmount
     */
    cleanup: async () => {
        if (orderAlertSound) {
            await orderAlertSound.unloadAsync();
            orderAlertSound = null;
        }
        if (successSound) {
            await successSound.unloadAsync();
            successSound = null;
        }
    },
};

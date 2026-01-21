/**
 * GRIHGO Delivery Partner App - Haptic Feedback Utility
 * Vibration and haptic feedback for enhanced UX
 */

import * as Haptics from 'expo-haptics';
import { Platform } from 'react-native';

export const haptics = {
    /**
     * Light haptic for button press
     */
    light: () => {
        if (Platform.OS !== 'web') {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }
    },

    /**
     * Medium haptic for confirmations
     */
    medium: () => {
        if (Platform.OS !== 'web') {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        }
    },

    /**
     * Heavy haptic for important actions
     */
    heavy: () => {
        if (Platform.OS !== 'web') {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
        }
    },

    /**
     * Success haptic for completed actions
     */
    success: () => {
        if (Platform.OS !== 'web') {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        }
    },

    /**
     * Warning haptic for alerts
     */
    warning: () => {
        if (Platform.OS !== 'web') {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
        }
    },

    /**
     * Error haptic for failures
     */
    error: () => {
        if (Platform.OS !== 'web') {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
        }
    },

    /**
     * Selection haptic for toggles and selections
     */
    selection: () => {
        if (Platform.OS !== 'web') {
            Haptics.selectionAsync();
        }
    },
};

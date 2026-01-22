/**
 * GRIHGO Delivery Partner App - Theme Context
 * Dark mode support with persistent theme preference
 */

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useColorScheme } from 'react-native';

type ThemeMode = 'light' | 'dark' | 'system';

interface ThemeContextType {
    mode: ThemeMode;
    isDark: boolean;
    setMode: (mode: ThemeMode) => void;
    toggleTheme: () => void;
    colors: typeof lightColors | typeof darkColors;
}

// Light Theme Colors
export const lightColors = {
    background: '#F5F7F6',
    surface: '#FFFFFF',
    surfaceSecondary: '#F3F4F6',
    primary: '#1A7F4B',
    primaryLight: '#E8F8F0',
    textPrimary: '#1F2937',
    textSecondary: '#6B7280',
    textMuted: '#9CA3AF',
    border: '#E5E7EB',
    divider: '#F3F4F6',
    success: '#10B981',
    error: '#EF4444',
    warning: '#F59E0B',
};

// Dark Theme Colors
export const darkColors = {
    background: '#111827',
    surface: '#1F2937',
    surfaceSecondary: '#374151',
    primary: '#34D399',
    primaryLight: '#064E3B',
    textPrimary: '#F9FAFB',
    textSecondary: '#D1D5DB',
    textMuted: '#9CA3AF',
    border: '#374151',
    divider: '#4B5563',
    success: '#10B981',
    error: '#EF4444',
    warning: '#F59E0B',
};

const THEME_STORAGE_KEY = '@grihgo_theme';

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
    const systemColorScheme = useColorScheme();
    const [mode, setModeState] = useState<ThemeMode>('system');

    const isDark = mode === 'system'
        ? systemColorScheme === 'dark'
        : mode === 'dark';

    const colors = isDark ? darkColors : lightColors;

    useEffect(() => {
        // Load saved theme preference
        AsyncStorage.getItem(THEME_STORAGE_KEY)
            .then(saved => {
                if (saved && ['light', 'dark', 'system'].includes(saved)) {
                    setModeState(saved as ThemeMode);
                }
            })
            .catch((error) => {
                // Silently fail - use default theme
                console.warn('Failed to load theme preference:', error);
            });
    }, []);

    const setMode = (newMode: ThemeMode) => {
        setModeState(newMode);
        AsyncStorage.setItem(THEME_STORAGE_KEY, newMode).catch((error) => {
            console.warn('Failed to save theme preference:', error);
        });
    };

    const toggleTheme = () => {
        const newMode = isDark ? 'light' : 'dark';
        setMode(newMode);
    };

    return (
        <ThemeContext.Provider value={{ mode, isDark, setMode, toggleTheme, colors }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme(): ThemeContextType {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}

/**
 * GRIHGO Delivery Partner App - Card Component
 * Reusable card container with variants
 */

import React from 'react';
import { View, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import { colors, spacing, borderRadius, shadows } from '@/constants';

export type CardVariant = 'default' | 'elevated' | 'bordered' | 'flat';

interface CardProps {
    children: React.ReactNode;
    variant?: CardVariant;
    onPress?: () => void;
    style?: ViewStyle;
    padding?: keyof typeof spacing | number;
}

export function Card({
    children,
    variant = 'default',
    onPress,
    style,
    padding = 'lg',
}: CardProps) {
    const cardPadding = typeof padding === 'number' ? padding : spacing[padding];

    const cardStyles: ViewStyle[] = [
        styles.base,
        styles[variant],
        { padding: cardPadding },
        style,
    ].filter(Boolean) as ViewStyle[];

    if (onPress) {
        return (
            <TouchableOpacity style={cardStyles} onPress={onPress} activeOpacity={0.8}>
                {children}
            </TouchableOpacity>
        );
    }

    return <View style={cardStyles}>{children}</View>;
}

const styles = StyleSheet.create({
    base: {
        backgroundColor: colors.light.surface,
        borderRadius: borderRadius.lg,
    },
    default: {
        ...shadows.md,
    },
    elevated: {
        ...shadows.lg,
    },
    bordered: {
        borderWidth: 1,
        borderColor: colors.light.border,
    },
    flat: {
        // No shadow
    },
});

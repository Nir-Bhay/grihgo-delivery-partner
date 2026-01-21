/**
 * GRIHGO Delivery Partner App - Badge Component
 * Status badges and labels
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, typography, spacing, borderRadius } from '@/constants';

export type BadgeVariant = 'success' | 'warning' | 'error' | 'info' | 'default' | 'primary';
export type BadgeSize = 'sm' | 'md';

interface BadgeProps {
    text: string;
    variant?: BadgeVariant;
    size?: BadgeSize;
}

export function Badge({ text, variant = 'default', size = 'md' }: BadgeProps) {
    const variantColors = {
        success: { bg: '#E8F8F0', text: colors.success },
        warning: { bg: '#FEF3E6', text: colors.warning },
        error: { bg: '#FDE8E8', text: colors.error },
        info: { bg: '#E8F4FD', text: colors.info },
        default: { bg: colors.light.surfaceSecondary, text: colors.light.textSecondary },
        primary: { bg: '#E8F8F0', text: colors.primary },
    };

    const colorSet = variantColors[variant];

    return (
        <View style={[
            styles.badge,
            styles[size],
            { backgroundColor: colorSet.bg }
        ]}>
            <Text style={[
                styles.text,
                styles[`text_${size}`],
                { color: colorSet.text }
            ]}>
                {text}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    badge: {
        alignSelf: 'flex-start',
    },
    sm: {
        paddingHorizontal: spacing.sm,
        paddingVertical: spacing.xs,
        borderRadius: borderRadius.xs,
    },
    md: {
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.xs,
        borderRadius: borderRadius.sm,
    },
    text: {
        fontWeight: '600',
    },
    text_sm: {
        ...typography.tiny,
    },
    text_md: {
        ...typography.caption,
    },
});

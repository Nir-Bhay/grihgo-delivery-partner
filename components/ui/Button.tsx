/**
 * GRIHGO Delivery Partner App - Button Component
 * Primary button with multiple variants and states
 */

import React from 'react';
import {
    TouchableOpacity,
    Text,
    StyleSheet,
    ActivityIndicator,
    ViewStyle,
    TextStyle,
} from 'react-native';
import { colors, typography, spacing, borderRadius } from '@/constants';
import { logger } from '@/utils/logger';

const TAG = 'Button';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
    title: string;
    onPress: () => void;
    variant?: ButtonVariant;
    size?: ButtonSize;
    disabled?: boolean;
    loading?: boolean;
    fullWidth?: boolean;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    style?: ViewStyle;
    textStyle?: TextStyle;
}

export function Button({
    title,
    onPress,
    variant = 'primary',
    size = 'md',
    disabled = false,
    loading = false,
    fullWidth = true,
    leftIcon,
    rightIcon,
    style,
    textStyle,
}: ButtonProps) {
    const handlePress = () => {
        logger.action(TAG, 'press', { title, variant, disabled });
        if (!disabled && !loading) {
            onPress();
        }
    };

    const isDisabled = disabled || loading;

    const buttonStyles: ViewStyle[] = [
        styles.base,
        styles[`size_${size}`],
        styles[variant],
        fullWidth && styles.fullWidth,
        isDisabled && styles.disabled,
        style,
    ].filter(Boolean) as ViewStyle[];

    const textStyles: TextStyle[] = [
        styles.text,
        styles[`text_${size}`],
        styles[`${variant}Text`],
        isDisabled && styles.disabledText,
        textStyle,
    ].filter(Boolean) as TextStyle[];

    const spinnerColor = variant === 'outline' || variant === 'ghost'
        ? colors.primary
        : '#FFFFFF';

    return (
        <TouchableOpacity
            style={buttonStyles}
            onPress={handlePress}
            disabled={isDisabled}
            activeOpacity={0.8}
        >
            {loading ? (
                <ActivityIndicator color={spinnerColor} size="small" />
            ) : (
                <>
                    {leftIcon}
                    <Text style={textStyles}>{title}</Text>
                    {rightIcon}
                </>
            )}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    base: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: spacing.sm,
    },
    fullWidth: {
        width: '100%',
    },

    // Sizes
    size_sm: {
        height: 36,
        paddingHorizontal: spacing.md,
        borderRadius: borderRadius.sm,
    },
    size_md: {
        height: 48,
        paddingHorizontal: spacing.xl,
        borderRadius: borderRadius.sm,
    },
    size_lg: {
        height: 56,
        paddingHorizontal: spacing['2xl'],
        borderRadius: borderRadius.md,
    },

    // Variants
    primary: {
        backgroundColor: colors.primary,
    },
    secondary: {
        backgroundColor: colors.light.surface,
        borderWidth: 1,
        borderColor: colors.light.border,
    },
    outline: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: colors.primary,
    },
    danger: {
        backgroundColor: colors.error,
    },
    ghost: {
        backgroundColor: 'transparent',
    },

    disabled: {
        opacity: 0.5,
    },

    // Text Styles
    text: {
        ...typography.body,
        fontWeight: '600',
    },
    text_sm: {
        fontSize: 14,
    },
    text_md: {
        fontSize: 16,
    },
    text_lg: {
        fontSize: 18,
    },

    primaryText: {
        color: '#FFFFFF',
    },
    secondaryText: {
        color: colors.light.textPrimary,
    },
    outlineText: {
        color: colors.primary,
    },
    dangerText: {
        color: '#FFFFFF',
    },
    ghostText: {
        color: colors.primary,
    },
    disabledText: {
        // No additional styling
    },
});

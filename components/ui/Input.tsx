/**
 * GRIHGO Delivery Partner App - Input Component
 * Text input with variants for phone, OTP, password
 */

import React, { useState } from 'react';
import {
    View,
    TextInput,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInputProps,
} from 'react-native';
import { colors, typography, spacing, borderRadius, layout } from '@/constants';
import { logger } from '@/utils/logger';

const TAG = 'Input';

export type InputVariant = 'default' | 'phone' | 'password';

interface InputProps extends Omit<TextInputProps, 'style'> {
    label?: string;
    error?: string;
    variant?: InputVariant;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    disabled?: boolean;
    containerStyle?: object;
}

export function Input({
    label,
    error,
    variant = 'default',
    leftIcon,
    rightIcon,
    disabled = false,
    containerStyle,
    onFocus,
    onBlur,
    ...rest
}: InputProps) {
    const [isFocused, setIsFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleFocus = (e: any) => {
        logger.debug(TAG, 'Focus', { label });
        setIsFocused(true);
        onFocus?.(e);
    };

    const handleBlur = (e: any) => {
        logger.debug(TAG, 'Blur', { label });
        setIsFocused(false);
        onBlur?.(e);
    };

    const containerStyles = [
        styles.container,
        isFocused && styles.containerFocused,
        error && styles.containerError,
        disabled && styles.containerDisabled,
    ];

    return (
        <View style={containerStyle}>
            {label && <Text style={styles.label}>{label}</Text>}

            <View style={containerStyles}>
                {/* Phone prefix */}
                {variant === 'phone' && (
                    <View style={styles.phonePrefix}>
                        <Text style={styles.phonePrefixText}>🇮🇳 +91</Text>
                    </View>
                )}

                {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}

                <TextInput
                    style={[
                        styles.input,
                        variant === 'phone' && styles.phoneInput,
                        leftIcon && styles.inputWithLeftIcon,
                        rightIcon && styles.inputWithRightIcon,
                    ]}
                    placeholderTextColor={colors.light.textMuted}
                    editable={!disabled}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    secureTextEntry={variant === 'password' && !showPassword}
                    keyboardType={variant === 'phone' ? 'phone-pad' : 'default'}
                    {...rest}
                />

                {/* Password toggle */}
                {variant === 'password' && (
                    <TouchableOpacity
                        style={styles.rightIcon}
                        onPress={() => setShowPassword(!showPassword)}
                    >
                        <Text style={styles.toggleText}>
                            {showPassword ? 'Hide' : 'Show'}
                        </Text>
                    </TouchableOpacity>
                )}

                {rightIcon && <View style={styles.rightIcon}>{rightIcon}</View>}
            </View>

            {error && <Text style={styles.error}>{error}</Text>}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        height: layout.inputHeight,
        backgroundColor: colors.light.surface,
        borderWidth: 1,
        borderColor: colors.light.border,
        borderRadius: borderRadius.sm,
        paddingHorizontal: spacing.lg,
    },
    containerFocused: {
        borderColor: colors.primary,
    },
    containerError: {
        borderColor: colors.error,
    },
    containerDisabled: {
        backgroundColor: colors.light.surfaceSecondary,
        opacity: 0.7,
    },

    label: {
        ...typography.smallMedium,
        color: colors.light.textPrimary,
        marginBottom: spacing.sm,
    },

    input: {
        flex: 1,
        ...typography.body,
        color: colors.light.textPrimary,
        height: '100%',
    },
    inputWithLeftIcon: {
        marginLeft: spacing.sm,
    },
    inputWithRightIcon: {
        marginRight: spacing.sm,
    },

    phonePrefix: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingRight: spacing.md,
        borderRightWidth: 1,
        borderRightColor: colors.light.border,
        marginRight: spacing.md,
    },
    phonePrefixText: {
        ...typography.body,
        color: colors.light.textPrimary,
    },
    phoneInput: {
        // Additional phone styling if needed
    },

    leftIcon: {
        marginRight: spacing.sm,
    },
    rightIcon: {
        marginLeft: spacing.sm,
    },
    toggleText: {
        ...typography.small,
        color: colors.primary,
        fontWeight: '600',
    },

    error: {
        ...typography.small,
        color: colors.error,
        marginTop: spacing.xs,
    },
});

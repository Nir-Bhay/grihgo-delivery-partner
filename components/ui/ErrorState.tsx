/**
 * GRIHGO Delivery Partner App - Error State Component
 * Displays friendly error messages with retry option
 */

import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, typography, spacing, borderRadius, shadows } from '@/constants';
import { Icon } from './Icon';

interface ErrorStateProps {
    title?: string;
    message?: string;
    onRetry?: () => void;
    type?: 'network' | 'error' | 'empty' | 'permission';
}

const ERROR_CONFIGS = {
    network: {
        icon: 'wifi' as const,
        title: 'No Internet Connection',
        message: 'Please check your connection and try again',
        color: '#6B7280',
    },
    error: {
        icon: 'warning' as const,
        title: 'Something Went Wrong',
        message: 'We encountered an error. Please try again.',
        color: colors.error,
    },
    empty: {
        icon: 'package' as const,
        title: 'Nothing Here Yet',
        message: 'Data will appear here when available',
        color: colors.light.textMuted,
    },
    permission: {
        icon: 'location' as const,
        title: 'Permission Required',
        message: 'Please grant the required permission to continue',
        color: '#D97706',
    },
};

export function ErrorState({
    title,
    message,
    onRetry,
    type = 'error'
}: ErrorStateProps) {
    const config = ERROR_CONFIGS[type];

    return (
        <View style={styles.container}>
            <View style={[styles.iconContainer, { backgroundColor: `${config.color}15` }]}>
                <Icon name={config.icon} size={40} color={config.color} />
            </View>

            <Text style={styles.title}>{title || config.title}</Text>
            <Text style={styles.message}>{message || config.message}</Text>

            {onRetry && (
                <TouchableOpacity
                    style={styles.retryButton}
                    onPress={onRetry}
                    activeOpacity={0.9}
                >
                    <Icon name="refresh" size={18} color="#FFFFFF" />
                    <Text style={styles.retryText}>Try Again</Text>
                </TouchableOpacity>
            )}
        </View>
    );
}

// Offline Banner Component
export function OfflineBanner({ visible }: { visible: boolean }) {
    if (!visible) return null;

    return (
        <View style={styles.offlineBanner}>
            <Icon name="wifi" size={16} color="#FFFFFF" />
            <Text style={styles.offlineText}>No Internet Connection</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: spacing['2xl'],
    },
    iconContainer: {
        width: 88,
        height: 88,
        borderRadius: 44,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: spacing.xl,
    },
    title: {
        ...typography.h4,
        color: colors.light.textPrimary,
        marginBottom: spacing.sm,
        textAlign: 'center',
    },
    message: {
        ...typography.body,
        color: colors.light.textSecondary,
        textAlign: 'center',
        marginBottom: spacing.xl,
    },
    retryButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.primary,
        paddingHorizontal: spacing.xl,
        paddingVertical: spacing.md,
        borderRadius: borderRadius.lg,
        gap: spacing.sm,
    },
    retryText: {
        ...typography.bodyMedium,
        color: '#FFFFFF',
    },

    // Offline Banner
    offlineBanner: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#EF4444',
        paddingVertical: spacing.sm,
        gap: spacing.sm,
    },
    offlineText: {
        ...typography.small,
        color: '#FFFFFF',
    },
});

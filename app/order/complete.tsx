/**
 * GRIHGO Delivery Partner App - Order Complete Screen
 * Premium success screen with celebration animation
 */

import { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { colors, typography, spacing, borderRadius, shadows } from '@/constants';
import { Icon } from '@/components/ui';
import { logger } from '@/utils/logger';
import { mockNewOrder } from '@/services/mock';

const TAG = 'OrderCompleteScreen';

export default function OrderCompleteScreen() {
    const order = mockNewOrder;

    useEffect(() => {
        logger.lifecycle(TAG, 'mount');
        return () => logger.lifecycle(TAG, 'unmount');
    }, []);

    const handleDone = () => {
        logger.navigate(TAG, 'dashboard');
        router.replace('/(main)/(tabs)/home');
    };

    const handleViewEarnings = () => {
        logger.navigate(TAG, 'earnings');
        router.replace('/(main)/(tabs)/earnings');
    };

    return (
        <View style={styles.container}>
            {/* Success Header */}
            <View style={styles.headerGradient}>
                <SafeAreaView edges={['top']} style={styles.headerSafe}>
                    {/* Celebration Icon */}
                    <View style={styles.celebrationContainer}>
                        <View style={styles.successCircle}>
                            <Icon name="checkmark" size={48} color="#FFFFFF" />
                        </View>
                        <Text style={styles.successTitle}>Delivery Complete!</Text>
                        <Text style={styles.successSubtitle}>
                            Order #{order.id} has been delivered successfully
                        </Text>
                    </View>
                </SafeAreaView>
            </View>

            <View style={styles.content}>
                {/* Earnings Card */}
                <View style={styles.earningsCard}>
                    <View style={styles.earningsHeader}>
                        <Icon name="wallet" size={20} color={colors.primary} />
                        <Text style={styles.earningsLabel}>Your Earnings</Text>
                    </View>
                    <Text style={styles.earningsAmount}>₹{order.earnings.total}</Text>

                    <View style={styles.earningsBreakdown}>
                        <View style={styles.breakdownRow}>
                            <Text style={styles.breakdownLabel}>Base Pay</Text>
                            <Text style={styles.breakdownValue}>₹{order.earnings.base}</Text>
                        </View>
                        {order.earnings.peakBonus > 0 && (
                            <View style={styles.breakdownRow}>
                                <View style={styles.breakdownLabelRow}>
                                    <Icon name="fire" size={12} color="#D97706" />
                                    <Text style={[styles.breakdownLabel, { color: '#D97706' }]}>Peak Bonus</Text>
                                </View>
                                <Text style={[styles.breakdownValue, { color: '#D97706' }]}>+₹{order.earnings.peakBonus}</Text>
                            </View>
                        )}
                        {order.earnings.tip > 0 && (
                            <View style={styles.breakdownRow}>
                                <View style={styles.breakdownLabelRow}>
                                    <Icon name="heart" size={12} color="#DB2777" />
                                    <Text style={[styles.breakdownLabel, { color: '#DB2777' }]}>Tip</Text>
                                </View>
                                <Text style={[styles.breakdownValue, { color: '#DB2777' }]}>+₹{order.earnings.tip}</Text>
                            </View>
                        )}
                    </View>
                </View>

                {/* Stats Row */}
                <View style={styles.statsRow}>
                    <View style={styles.statCard}>
                        <View style={[styles.statIcon, { backgroundColor: '#E8F8F0' }]}>
                            <Icon name="location" size={18} color={colors.primary} />
                        </View>
                        <Text style={styles.statValue}>{order.distance} km</Text>
                        <Text style={styles.statLabel}>Distance</Text>
                    </View>
                    <View style={styles.statCard}>
                        <View style={[styles.statIcon, { backgroundColor: '#FEF3C7' }]}>
                            <Icon name="time" size={18} color="#D97706" />
                        </View>
                        <Text style={styles.statValue}>{order.estimatedTime} min</Text>
                        <Text style={styles.statLabel}>Duration</Text>
                    </View>
                    <View style={styles.statCard}>
                        <View style={[styles.statIcon, { backgroundColor: '#DBEAFE' }]}>
                            <Icon name="star" size={18} color="#2563EB" />
                        </View>
                        <Text style={styles.statValue}>4.8</Text>
                        <Text style={styles.statLabel}>Your Rating</Text>
                    </View>
                </View>

                {/* Next Order Prompt */}
                <View style={styles.nextOrderCard}>
                    <View style={styles.nextOrderIcon}>
                        <Icon name="scooter" size={24} color={colors.primary} />
                    </View>
                    <View style={styles.nextOrderInfo}>
                        <Text style={styles.nextOrderTitle}>Ready for more?</Text>
                        <Text style={styles.nextOrderSubtitle}>New orders are waiting for you!</Text>
                    </View>
                </View>
            </View>

            {/* Footer */}
            <View style={styles.footer}>
                <TouchableOpacity
                    style={styles.viewEarningsButton}
                    onPress={handleViewEarnings}
                >
                    <Icon name="wallet" size={18} color={colors.primary} />
                    <Text style={styles.viewEarningsText}>View Earnings</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.doneButton}
                    onPress={handleDone}
                    activeOpacity={0.9}
                >
                    <Text style={styles.doneButtonText}>Back to Home</Text>
                    <Icon name="forward" size={18} color="#FFFFFF" />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F7F6',
    },

    // Header
    headerGradient: {
        backgroundColor: '#1A7F4B',
    },
    headerSafe: {
        paddingHorizontal: spacing.xl,
        paddingBottom: spacing['2xl'],
    },
    celebrationContainer: {
        alignItems: 'center',
        paddingTop: spacing['2xl'],
    },
    successCircle: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: 'rgba(255,255,255,0.2)',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: spacing.lg,
    },
    successTitle: {
        ...typography.h2,
        color: '#FFFFFF',
        marginBottom: spacing.xs,
    },
    successSubtitle: {
        ...typography.body,
        color: 'rgba(255,255,255,0.8)',
        textAlign: 'center',
    },

    // Content
    content: {
        flex: 1,
        paddingHorizontal: spacing.xl,
        paddingTop: spacing.xl,
    },

    // Earnings Card
    earningsCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: borderRadius.xl,
        padding: spacing.xl,
        marginBottom: spacing.lg,
        ...shadows.md,
    },
    earningsHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.sm,
        marginBottom: spacing.sm,
    },
    earningsLabel: {
        ...typography.small,
        color: colors.light.textMuted,
    },
    earningsAmount: {
        fontSize: 44,
        fontWeight: '700',
        color: colors.primary,
        marginBottom: spacing.lg,
    },
    earningsBreakdown: {
        borderTopWidth: 1,
        borderTopColor: '#F3F4F6',
        paddingTop: spacing.md,
    },
    breakdownRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: spacing.sm,
    },
    breakdownLabelRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.xs,
    },
    breakdownLabel: {
        ...typography.small,
        color: colors.light.textSecondary,
    },
    breakdownValue: {
        ...typography.smallMedium,
        color: colors.light.textPrimary,
    },

    // Stats Row
    statsRow: {
        flexDirection: 'row',
        gap: spacing.md,
        marginBottom: spacing.lg,
    },
    statCard: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        borderRadius: borderRadius.lg,
        padding: spacing.md,
        alignItems: 'center',
        ...shadows.sm,
    },
    statIcon: {
        width: 40,
        height: 40,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: spacing.sm,
    },
    statValue: {
        ...typography.bodyMedium,
        color: colors.light.textPrimary,
    },
    statLabel: {
        ...typography.tiny,
        color: colors.light.textMuted,
    },

    // Next Order Card
    nextOrderCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#E8F8F0',
        borderRadius: borderRadius.xl,
        padding: spacing.lg,
        borderWidth: 1,
        borderColor: '#BBF7D0',
    },
    nextOrderIcon: {
        width: 52,
        height: 52,
        borderRadius: 14,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: spacing.md,
    },
    nextOrderInfo: {
        flex: 1,
    },
    nextOrderTitle: {
        ...typography.bodyMedium,
        color: colors.primary,
    },
    nextOrderSubtitle: {
        ...typography.small,
        color: colors.light.textSecondary,
    },

    // Footer
    footer: {
        flexDirection: 'row',
        gap: spacing.md,
        paddingHorizontal: spacing.xl,
        paddingVertical: spacing.lg,
        backgroundColor: '#FFFFFF',
        borderTopWidth: 1,
        borderTopColor: '#E5E7EB',
    },
    viewEarningsButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#E8F8F0',
        paddingVertical: spacing.lg,
        borderRadius: borderRadius.lg,
        gap: spacing.sm,
    },
    viewEarningsText: {
        ...typography.bodyMedium,
        color: colors.primary,
    },
    doneButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.primary,
        paddingVertical: spacing.lg,
        borderRadius: borderRadius.lg,
        gap: spacing.sm,
    },
    doneButtonText: {
        ...typography.bodyMedium,
        color: '#FFFFFF',
    },
});

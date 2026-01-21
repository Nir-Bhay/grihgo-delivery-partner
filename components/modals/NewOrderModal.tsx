/**
 * GRIHGO Delivery Partner App - New Order Modal
 * Premium bottom sheet modal for accepting/declining orders
 */

import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Modal,
    TouchableOpacity,
    Dimensions,
} from 'react-native';
import { colors, typography, spacing, borderRadius, shadows } from '@/constants';
import { Icon } from '@/components/ui';
import { logger } from '@/utils/logger';
import { Order } from '@/types';

const TAG = 'NewOrderModal';
const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const ORDER_TIMEOUT = 30;

interface NewOrderModalProps {
    visible: boolean;
    order: Order;
    onAccept: (orderId: string) => void;
    onDecline: (orderId: string) => void;
    onTimeout: (orderId: string) => void;
}

export function NewOrderModal({
    visible,
    order,
    onAccept,
    onDecline,
    onTimeout,
}: NewOrderModalProps) {
    const [timeRemaining, setTimeRemaining] = useState(ORDER_TIMEOUT);
    const [accepting, setAccepting] = useState(false);

    useEffect(() => {
        if (!visible) {
            setTimeRemaining(ORDER_TIMEOUT);
            return;
        }

        logger.debug(TAG, 'Modal opened', { orderId: order.id });

        const interval = setInterval(() => {
            setTimeRemaining((prev) => {
                if (prev <= 1) {
                    logger.action(TAG, 'timeout', { orderId: order.id });
                    onTimeout(order.id);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [visible, order.id]);

    const formatTime = (seconds: number): string => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const handleAccept = async () => {
        logger.action(TAG, 'accept', { orderId: order.id, earnings: order.earnings.total });
        setAccepting(true);

        setTimeout(() => {
            setAccepting(false);
            onAccept(order.id);
        }, 500);
    };

    const handleDecline = () => {
        logger.action(TAG, 'decline', { orderId: order.id, timeRemaining });
        onDecline(order.id);
    };

    const timerProgress = timeRemaining / ORDER_TIMEOUT;

    return (
        <Modal
            visible={visible}
            transparent
            animationType="slide"
            onRequestClose={handleDecline}
        >
            {/* Dark map background overlay */}
            <View style={styles.overlay}>
                <View style={styles.mapPlaceholder}>
                    <Icon name="location" size={48} color="#4B5563" />
                    <Text style={styles.mapText}>Map Navigation</Text>
                </View>
            </View>

            {/* Bottom Sheet */}
            <View style={styles.bottomSheet}>
                {/* Handle */}
                <View style={styles.handleContainer}>
                    <View style={styles.handle} />
                </View>

                {/* Header with Timer */}
                <View style={styles.header}>
                    <View style={styles.headerLeft}>
                        <Text style={styles.title}>New Order</Text>
                        <View style={styles.orderIdBadge}>
                            <Text style={styles.orderIdText}>#{order.id}</Text>
                        </View>
                    </View>
                    <View style={[
                        styles.timerBadge,
                        timeRemaining <= 10 && styles.timerBadgeUrgent
                    ]}>
                        <View style={styles.timerCircle}>
                            <View
                                style={[
                                    styles.timerProgress,
                                    {
                                        width: `${timerProgress * 100}%`,
                                        backgroundColor: timeRemaining <= 10 ? colors.error : colors.primary
                                    }
                                ]}
                            />
                        </View>
                        <Text style={[
                            styles.timerText,
                            timeRemaining <= 10 && styles.timerTextUrgent
                        ]}>
                            {formatTime(timeRemaining)}
                        </Text>
                    </View>
                </View>

                {/* Restaurant Info */}
                <View style={styles.locationCard}>
                    <View style={styles.locationRow}>
                        <View style={[styles.locationIcon, { backgroundColor: '#FEF3C7' }]}>
                            <Icon name="restaurant" size={20} color="#D97706" />
                        </View>
                        <View style={styles.locationInfo}>
                            <Text style={styles.locationLabel}>PICKUP FROM</Text>
                            <Text style={styles.locationName}>{order.restaurant.name}</Text>
                            <Text style={styles.locationAddress}>{order.restaurant.address}</Text>
                        </View>
                        <View style={styles.distanceBadge}>
                            <Text style={styles.distanceText}>1.2 km</Text>
                        </View>
                    </View>

                    {/* Route Line */}
                    <View style={styles.routeLine}>
                        <View style={styles.routeDot} />
                        <View style={styles.routeDash} />
                        <View style={styles.routeDistanceBadge}>
                            <Text style={styles.routeDistanceText}>{order.distance} km</Text>
                        </View>
                        <View style={styles.routeDash} />
                        <View style={[styles.routeDot, { backgroundColor: colors.primary }]} />
                    </View>

                    {/* Delivery Location */}
                    <View style={styles.locationRow}>
                        <View style={[styles.locationIcon, { backgroundColor: '#E8F8F0' }]}>
                            <Icon name="location" size={20} color={colors.primary} />
                        </View>
                        <View style={styles.locationInfo}>
                            <Text style={styles.locationLabel}>DELIVER TO</Text>
                            <Text style={styles.locationName}>{order.customer.address}</Text>
                            <Text style={styles.locationAddress}>Est. {order.estimatedTime} min</Text>
                        </View>
                    </View>
                </View>

                {/* Earnings Section */}
                <View style={styles.earningsCard}>
                    <View style={styles.earningsMain}>
                        <Text style={styles.earningsAmount}>₹{order.earnings.total}</Text>
                        <Text style={styles.earningsLabel}>Estimated Earnings</Text>
                    </View>
                    <View style={styles.earningsBreakdown}>
                        <View style={styles.earningItem}>
                            <Text style={styles.earningValue}>₹{order.earnings.base}</Text>
                            <Text style={styles.earningLabel}>Base</Text>
                        </View>
                        {order.earnings.peakBonus > 0 && (
                            <View style={styles.earningItem}>
                                <Text style={[styles.earningValue, { color: '#D97706' }]}>+₹{order.earnings.peakBonus}</Text>
                                <Text style={styles.earningLabel}>Peak</Text>
                            </View>
                        )}
                    </View>
                </View>

                {/* Action Buttons */}
                <View style={styles.actions}>
                    <TouchableOpacity
                        style={styles.declineButton}
                        onPress={handleDecline}
                        activeOpacity={0.8}
                    >
                        <Icon name="close" size={20} color={colors.light.textSecondary} />
                        <Text style={styles.declineText}>Decline</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.acceptButton, accepting && styles.acceptButtonLoading]}
                        onPress={handleAccept}
                        disabled={accepting}
                        activeOpacity={0.9}
                    >
                        <Text style={styles.acceptText}>
                            {accepting ? 'Accepting...' : 'Accept Order'}
                        </Text>
                        {!accepting && <Icon name="forward" size={18} color="#FFFFFF" />}
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: '#1F2937',
    },
    mapPlaceholder: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    mapText: {
        ...typography.body,
        color: '#6B7280',
        marginTop: spacing.sm,
    },

    // Bottom Sheet
    bottomSheet: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        paddingHorizontal: spacing.xl,
        paddingBottom: spacing['3xl'],
        ...shadows.xl,
    },
    handleContainer: {
        alignItems: 'center',
        paddingVertical: spacing.md,
    },
    handle: {
        width: 40,
        height: 4,
        backgroundColor: '#E5E7EB',
        borderRadius: 2,
    },

    // Header
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: spacing.lg,
    },
    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.sm,
    },
    title: {
        ...typography.h4,
        color: colors.light.textPrimary,
    },
    orderIdBadge: {
        backgroundColor: '#F3F4F6',
        paddingHorizontal: spacing.sm,
        paddingVertical: 4,
        borderRadius: borderRadius.sm,
    },
    orderIdText: {
        ...typography.tiny,
        color: colors.light.textMuted,
    },
    timerBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F3F4F6',
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.sm,
        borderRadius: borderRadius.lg,
        gap: spacing.sm,
    },
    timerBadgeUrgent: {
        backgroundColor: '#FEE2E2',
    },
    timerCircle: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: '#E5E7EB',
        overflow: 'hidden',
    },
    timerProgress: {
        height: '100%',
        borderRadius: 12,
    },
    timerText: {
        ...typography.bodyMedium,
        color: colors.light.textPrimary,
        fontFamily: 'monospace',
    },
    timerTextUrgent: {
        color: colors.error,
    },

    // Location Card
    locationCard: {
        backgroundColor: '#F9FAFB',
        borderRadius: borderRadius.xl,
        padding: spacing.lg,
        marginBottom: spacing.lg,
    },
    locationRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    locationIcon: {
        width: 44,
        height: 44,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: spacing.md,
    },
    locationInfo: {
        flex: 1,
    },
    locationLabel: {
        ...typography.tiny,
        color: colors.light.textMuted,
        letterSpacing: 0.5,
        marginBottom: 2,
    },
    locationName: {
        ...typography.bodyMedium,
        color: colors.light.textPrimary,
        marginBottom: 2,
    },
    locationAddress: {
        ...typography.small,
        color: colors.light.textSecondary,
    },
    distanceBadge: {
        backgroundColor: '#E8F8F0',
        paddingHorizontal: spacing.sm,
        paddingVertical: 4,
        borderRadius: borderRadius.sm,
    },
    distanceText: {
        ...typography.tiny,
        color: colors.primary,
        fontWeight: '600',
    },

    // Route Line
    routeLine: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: spacing.md,
        paddingLeft: 22,
    },
    routeDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#D97706',
    },
    routeDash: {
        flex: 1,
        height: 1,
        backgroundColor: '#D1D5DB',
    },
    routeDistanceBadge: {
        backgroundColor: '#FFFFFF',
        paddingHorizontal: spacing.sm,
        paddingVertical: 4,
        borderRadius: borderRadius.full,
        marginHorizontal: spacing.sm,
    },
    routeDistanceText: {
        ...typography.tiny,
        color: colors.light.textMuted,
    },

    // Earnings Card
    earningsCard: {
        flexDirection: 'row',
        backgroundColor: '#E8F8F0',
        borderRadius: borderRadius.xl,
        padding: spacing.lg,
        marginBottom: spacing.xl,
        alignItems: 'center',
    },
    earningsMain: {
        flex: 1,
    },
    earningsAmount: {
        fontSize: 32,
        fontWeight: '700',
        color: colors.primary,
    },
    earningsLabel: {
        ...typography.small,
        color: colors.light.textSecondary,
    },
    earningsBreakdown: {
        flexDirection: 'row',
        gap: spacing.md,
    },
    earningItem: {
        alignItems: 'center',
    },
    earningValue: {
        ...typography.smallMedium,
        color: colors.light.textPrimary,
    },
    earningLabel: {
        ...typography.tiny,
        color: colors.light.textMuted,
    },

    // Actions
    actions: {
        flexDirection: 'row',
        gap: spacing.md,
    },
    declineButton: {
        flex: 1,
        flexDirection: 'row',
        height: 52,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F3F4F6',
        borderRadius: borderRadius.lg,
        gap: spacing.sm,
    },
    declineText: {
        ...typography.bodyMedium,
        color: colors.light.textSecondary,
    },
    acceptButton: {
        flex: 2,
        flexDirection: 'row',
        height: 52,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.primary,
        borderRadius: borderRadius.lg,
        gap: spacing.sm,
    },
    acceptButtonLoading: {
        backgroundColor: '#059669',
    },
    acceptText: {
        ...typography.bodyMedium,
        color: '#FFFFFF',
    },
});

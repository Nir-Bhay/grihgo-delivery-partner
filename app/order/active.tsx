/**
 * GRIHGO Delivery Partner App - Active Order Screen
 * Premium order tracking with brand header and enhanced progress indicators
 */

import { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Linking,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { colors, typography, spacing, borderRadius, shadows } from '@/constants';
import { Button, Card, Icon } from '@/components/ui';
import { mockNewOrder } from '@/services/mock';
import { logger } from '@/utils/logger';

const TAG = 'ActiveOrderScreen';

type OrderStage = 'pickup' | 'enroute' | 'deliver';

const STAGES: { key: OrderStage; label: string; icon: string }[] = [
    { key: 'pickup', label: 'Pickup', icon: 'restaurant' },
    { key: 'enroute', label: 'En Route', icon: 'scooter' },
    { key: 'deliver', label: 'Deliver', icon: 'location' },
];

export default function ActiveOrderScreen() {
    const [currentStage, setCurrentStage] = useState<OrderStage>('pickup');
    const [loading, setLoading] = useState(false);
    const [showItems, setShowItems] = useState(false);

    const order = mockNewOrder;

    useEffect(() => {
        logger.lifecycle(TAG, 'mount', { orderId: order.id, stage: currentStage });
        return () => logger.lifecycle(TAG, 'unmount');
    }, []);

    const handleBack = () => {
        logger.navigate(TAG, 'dashboard');
        router.back();
    };

    const handleCall = () => {
        const phone = currentStage === 'pickup'
            ? order.restaurant.phone
            : order.customer.phone;
        logger.action(TAG, 'call', { phone, stage: currentStage });
        Linking.openURL(`tel:${phone}`);
    };

    const handleNavigate = () => {
        logger.action(TAG, 'navigate', { stage: currentStage });
        router.push('/navigation' as any);
    };

    const handleStageAction = async () => {
        logger.action(TAG, 'stageAction', { stage: currentStage });
        setLoading(true);

        setTimeout(() => {
            setLoading(false);
            if (currentStage === 'pickup') {
                setCurrentStage('enroute');
            } else if (currentStage === 'enroute') {
                setCurrentStage('deliver');
            } else {
                logger.navigate(TAG, 'confirm');
                router.push('/order/confirm');
            }
        }, 1000);
    };

    const getActionButtonText = () => {
        switch (currentStage) {
            case 'pickup': return 'Arrived at Restaurant';
            case 'enroute': return 'Arrived at Customer';
            case 'deliver': return 'Complete Delivery';
            default: return 'Continue';
        }
    };

    const getCurrentLocation = () => {
        if (currentStage === 'pickup') {
            return {
                name: order.restaurant.name,
                address: order.restaurant.address,
                distance: '1.2 km',
                time: '5 min',
                type: 'restaurant' as const,
            };
        } else {
            return {
                name: order.customer.name,
                address: order.customer.address,
                distance: `${order.distance} km`,
                time: `${order.estimatedTime} min`,
                floor: order.customer.floor,
                type: 'customer' as const,
            };
        }
    };

    const location = getCurrentLocation();
    const stageIndex = STAGES.findIndex((s) => s.key === currentStage);

    return (
        <View style={styles.container}>
            {/* Brand Header */}
            <View style={styles.headerGradient}>
                <SafeAreaView edges={['top']} style={styles.headerSafe}>
                    <View style={styles.topBar}>
                        <TouchableOpacity
                            style={styles.backButton}
                            onPress={handleBack}
                        >
                            <Icon name="back" size={24} color="#FFFFFF" />
                        </TouchableOpacity>
                        <View style={styles.orderIdBadge}>
                            <Text style={styles.orderIdText}>Order #{order.id}</Text>
                        </View>
                        <TouchableOpacity style={styles.helpButton}>
                            <Icon name="help" size={20} color="#FFFFFF" />
                        </TouchableOpacity>
                    </View>

                    {/* Stage Progress */}
                    <View style={styles.stageProgress}>
                        {STAGES.map((stage, index) => {
                            const isCompleted = index < stageIndex;
                            const isCurrent = index === stageIndex;

                            return (
                                <View key={stage.key} style={styles.stageItem}>
                                    {/* Connector */}
                                    {index > 0 && (
                                        <View style={[
                                            styles.stageConnector,
                                            isCompleted && styles.stageConnectorCompleted,
                                        ]} />
                                    )}

                                    {/* Circle */}
                                    <View style={[
                                        styles.stageCircle,
                                        (isCompleted || isCurrent) && styles.stageCircleActive,
                                    ]}>
                                        {isCompleted ? (
                                            <Icon name="checkmark" size={14} color="#FFFFFF" />
                                        ) : (
                                            <Icon
                                                name={stage.icon as any}
                                                size={14}
                                                color={isCurrent ? '#FFFFFF' : 'rgba(255,255,255,0.5)'}
                                            />
                                        )}
                                    </View>

                                    {/* Label */}
                                    <Text style={[
                                        styles.stageLabel,
                                        isCurrent && styles.stageLabelActive,
                                    ]}>
                                        {stage.label}
                                    </Text>
                                </View>
                            );
                        })}
                    </View>
                </SafeAreaView>
            </View>

            {/* Map Placeholder */}
            <View style={styles.mapContainer}>
                <View style={styles.mapPlaceholder}>
                    <Icon name="location" size={40} color={colors.light.textMuted} />
                    <Text style={styles.mapText}>Map Navigation</Text>
                </View>
                <TouchableOpacity style={styles.centerLocationButton}>
                    <Icon name="location" size={20} color={colors.primary} />
                </TouchableOpacity>
            </View>

            {/* Bottom Section */}
            <View style={styles.bottomSection}>
                {/* Location Card */}
                <View style={styles.locationCard}>
                    <View style={styles.locationHeader}>
                        <View style={[
                            styles.locationIcon,
                            { backgroundColor: location.type === 'restaurant' ? '#FEF3C7' : '#E8F8F0' }
                        ]}>
                            <Icon
                                name={location.type === 'restaurant' ? 'restaurant' : 'user'}
                                size={20}
                                color={location.type === 'restaurant' ? '#D97706' : colors.primary}
                            />
                        </View>
                        <View style={styles.locationInfo}>
                            <Text style={styles.locationName}>{location.name}</Text>
                            <Text style={styles.locationAddress} numberOfLines={1}>{location.address}</Text>
                            {location.floor && (
                                <Text style={styles.locationFloor}>{location.floor}</Text>
                            )}
                        </View>
                        <View style={styles.locationMeta}>
                            <View style={styles.distanceBadge}>
                                <Text style={styles.distanceText}>{location.distance}</Text>
                            </View>
                            <Text style={styles.timeText}>{location.time}</Text>
                        </View>
                    </View>

                    {/* Quick Actions */}
                    <View style={styles.actionButtons}>
                        <TouchableOpacity style={styles.actionButton} onPress={handleCall}>
                            <View style={[styles.actionIconContainer, { backgroundColor: '#DBEAFE' }]}>
                                <Icon name="phone" size={18} color="#2563EB" />
                            </View>
                            <Text style={styles.actionButtonText}>Call</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.actionButton} onPress={handleNavigate}>
                            <View style={[styles.actionIconContainer, { backgroundColor: '#E8F8F0' }]}>
                                <Icon name="navigate" size={18} color={colors.primary} />
                            </View>
                            <Text style={styles.actionButtonText}>Navigate</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.actionButton}>
                            <View style={[styles.actionIconContainer, { backgroundColor: '#FCE7F3' }]}>
                                <Icon name="chat" size={18} color="#DB2777" />
                            </View>
                            <Text style={styles.actionButtonText}>Chat</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Order Items Collapsible */}
                <TouchableOpacity
                    style={styles.orderItemsHeader}
                    onPress={() => setShowItems(!showItems)}
                >
                    <View style={styles.orderItemsLeft}>
                        <Icon name="package" size={16} color={colors.light.textMuted} />
                        <Text style={styles.orderItemsTitle}>{order.items.length} Items</Text>
                    </View>
                    <View style={styles.earningsBadge}>
                        <Text style={styles.earningsText}>₹{order.earnings.total}</Text>
                    </View>
                    <Icon
                        name={showItems ? 'up' : 'down'}
                        size={14}
                        color={colors.light.textMuted}
                    />
                </TouchableOpacity>

                {showItems && (
                    <View style={styles.orderItems}>
                        {order.items.map((item, index) => (
                            <View key={index} style={styles.orderItem}>
                                <Text style={styles.orderItemQty}>{item.quantity}x</Text>
                                <Text style={styles.orderItemName}>{item.name}</Text>
                            </View>
                        ))}
                    </View>
                )}

                {/* Main Action Button */}
                <TouchableOpacity
                    style={[styles.mainButton, loading && styles.mainButtonLoading]}
                    onPress={handleStageAction}
                    disabled={loading}
                    activeOpacity={0.9}
                >
                    <Text style={styles.mainButtonText}>
                        {loading ? 'Updating...' : getActionButtonText()}
                    </Text>
                    {!loading && <Icon name="forward" size={18} color="#FFFFFF" />}
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
    },
    topBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: spacing.md,
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 12,
        backgroundColor: 'rgba(255,255,255,0.15)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    orderIdBadge: {
        backgroundColor: 'rgba(255,255,255,0.2)',
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.xs,
        borderRadius: borderRadius.full,
    },
    orderIdText: {
        ...typography.small,
        color: '#FFFFFF',
        fontWeight: '600',
    },
    helpButton: {
        width: 40,
        height: 40,
        borderRadius: 12,
        backgroundColor: 'rgba(255,255,255,0.15)',
        justifyContent: 'center',
        alignItems: 'center',
    },

    // Stage Progress
    stageProgress: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: spacing.lg,
    },
    stageItem: {
        alignItems: 'center',
        flex: 1,
    },
    stageConnector: {
        position: 'absolute',
        left: -40,
        top: 14,
        width: 40,
        height: 2,
        backgroundColor: 'rgba(255,255,255,0.3)',
    },
    stageConnectorCompleted: {
        backgroundColor: '#FFFFFF',
    },
    stageCircle: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: 'rgba(255,255,255,0.2)',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: spacing.xs,
    },
    stageCircleActive: {
        backgroundColor: '#FFFFFF',
    },
    stageLabel: {
        ...typography.tiny,
        color: 'rgba(255,255,255,0.7)',
    },
    stageLabelActive: {
        color: '#FFFFFF',
        fontWeight: '600',
    },

    // Map
    mapContainer: {
        flex: 1,
        backgroundColor: '#E5E7EB',
        margin: spacing.lg,
        marginTop: 0,
        borderRadius: borderRadius.xl,
        overflow: 'hidden',
    },
    mapPlaceholder: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    mapText: {
        ...typography.body,
        color: colors.light.textMuted,
        marginTop: spacing.sm,
    },
    centerLocationButton: {
        position: 'absolute',
        right: spacing.md,
        bottom: spacing.md,
        width: 44,
        height: 44,
        borderRadius: 12,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        ...shadows.md,
    },

    // Bottom Section
    bottomSection: {
        paddingHorizontal: spacing.xl,
        paddingBottom: spacing.xl,
    },

    // Location Card
    locationCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: borderRadius.xl,
        padding: spacing.lg,
        marginBottom: spacing.md,
        ...shadows.sm,
    },
    locationHeader: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: spacing.lg,
    },
    locationIcon: {
        width: 48,
        height: 48,
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: spacing.md,
    },
    locationInfo: {
        flex: 1,
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
    locationFloor: {
        ...typography.tiny,
        color: colors.light.textMuted,
        marginTop: 2,
    },
    locationMeta: {
        alignItems: 'flex-end',
    },
    distanceBadge: {
        backgroundColor: '#E8F8F0',
        paddingHorizontal: spacing.sm,
        paddingVertical: 2,
        borderRadius: borderRadius.sm,
        marginBottom: 4,
    },
    distanceText: {
        ...typography.tiny,
        color: colors.primary,
        fontWeight: '600',
    },
    timeText: {
        ...typography.tiny,
        color: colors.light.textMuted,
    },

    // Action Buttons
    actionButtons: {
        flexDirection: 'row',
        gap: spacing.md,
    },
    actionButton: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: spacing.sm,
    },
    actionIconContainer: {
        width: 44,
        height: 44,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: spacing.xs,
    },
    actionButtonText: {
        ...typography.tiny,
        color: colors.light.textSecondary,
    },

    // Order Items
    orderItemsHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: spacing.md,
        backgroundColor: '#FFFFFF',
        borderRadius: borderRadius.lg,
        marginBottom: spacing.md,
        ...shadows.sm,
    },
    orderItemsLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        gap: spacing.sm,
    },
    orderItemsTitle: {
        ...typography.body,
        color: colors.light.textPrimary,
    },
    earningsBadge: {
        backgroundColor: '#E8F8F0',
        paddingHorizontal: spacing.sm,
        paddingVertical: 4,
        borderRadius: borderRadius.sm,
        marginRight: spacing.sm,
    },
    earningsText: {
        ...typography.smallMedium,
        color: colors.primary,
    },
    orderItems: {
        backgroundColor: '#FFFFFF',
        borderRadius: borderRadius.lg,
        padding: spacing.md,
        marginTop: -spacing.sm,
        marginBottom: spacing.md,
        ...shadows.sm,
    },
    orderItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: spacing.xs,
    },
    orderItemQty: {
        ...typography.smallMedium,
        color: colors.primary,
        width: 30,
    },
    orderItemName: {
        ...typography.small,
        color: colors.light.textSecondary,
    },

    // Main Button
    mainButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.primary,
        paddingVertical: spacing.lg,
        borderRadius: borderRadius.lg,
        gap: spacing.sm,
    },
    mainButtonLoading: {
        backgroundColor: '#059669',
    },
    mainButtonText: {
        ...typography.bodyMedium,
        color: '#FFFFFF',
    },
});

/**
 * GRIHGO Delivery Partner App - Dashboard Screen
 * Premium home screen with status toggle, earnings, and order modal
 * 
 * Design Principles Applied:
 * - Generous whitespace for premium feel
 * - Rich header with brand colors
 * - Stats cards with icons for quick info scanning
 * - Smooth animations and micro-interactions
 */

import { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Animated,
    Dimensions,
    Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { colors, typography, spacing, borderRadius, shadows } from '@/constants';
import { Card, Badge, Icon } from '@/components/ui';
import { NewOrderModal } from '@/components/modals';
import { mockNewOrder, mockOrderHistory } from '@/services/mock';
import { logger } from '@/utils/logger';
import { Order } from '@/types';

const TAG = 'DashboardScreen';
const { width } = Dimensions.get('window');

// Mock today's earnings
const mockEarnings = {
    today: 1245,
    trips: 8,
    hours: 4.5,
    distance: 32.5,
    bonus: 150,
};

// Mock user data
const mockUser = {
    name: 'Rahul',
    rating: 4.8,
};

export default function DashboardScreen() {
    const [isOnline, setIsOnline] = useState(true);
    const [showNewOrderModal, setShowNewOrderModal] = useState(false);
    const [currentOrder, setCurrentOrder] = useState<Order | null>(null);

    // Animations
    const pulseAnim = useRef(new Animated.Value(1)).current;
    const statusScaleAnim = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        logger.lifecycle(TAG, 'mount');

        // Pulsing animation for waiting indicator
        const pulse = Animated.loop(
            Animated.sequence([
                Animated.timing(pulseAnim, {
                    toValue: 1.3,
                    duration: 1000,
                    useNativeDriver: true,
                }),
                Animated.timing(pulseAnim, {
                    toValue: 1,
                    duration: 1000,
                    useNativeDriver: true,
                }),
            ])
        );
        pulse.start();

        return () => {
            logger.lifecycle(TAG, 'unmount');
            pulse.stop();
        };
    }, []);

    // Simulate incoming order after 5 seconds when online
    useEffect(() => {
        if (isOnline && !currentOrder) {
            const timer = setTimeout(() => {
                logger.debug(TAG, 'Simulating new order');
                setShowNewOrderModal(true);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [isOnline, currentOrder]);

    const handleToggleStatus = () => {
        Animated.sequence([
            Animated.timing(statusScaleAnim, { toValue: 0.95, duration: 100, useNativeDriver: true }),
            Animated.timing(statusScaleAnim, { toValue: 1, duration: 100, useNativeDriver: true }),
        ]).start();

        logger.action(TAG, 'toggleStatus', { from: isOnline, to: !isOnline });
        setIsOnline(!isOnline);
    };

    const handleAcceptOrder = (orderId: string) => {
        logger.action(TAG, 'acceptOrder', { orderId });
        setShowNewOrderModal(false);
        setCurrentOrder(mockNewOrder);
        router.push('/order/active');
    };

    const handleDeclineOrder = (orderId: string) => {
        logger.action(TAG, 'declineOrder', { orderId });
        setShowNewOrderModal(false);
    };

    const handleOrderTimeout = (orderId: string) => {
        logger.action(TAG, 'orderTimeout', { orderId });
        setShowNewOrderModal(false);
    };

    const handleViewActiveOrder = () => {
        logger.navigate(TAG, 'order/active');
        router.push('/order/active');
    };

    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return 'Good Morning';
        if (hour < 17) return 'Good Afternoon';
        return 'Good Evening';
    };

    return (
        <View style={styles.container}>
            {/* Header with Brand Color */}
            <View style={[styles.headerGradient, !isOnline && styles.headerOffline]}>
                <SafeAreaView edges={['top']} style={styles.headerSafe}>
                    {/* Top Bar */}
                    <View style={styles.topBar}>
                        <TouchableOpacity
                            style={styles.menuButton}
                            onPress={() => router.push('/(main)/(tabs)/profile')}
                        >
                            <Icon name="menu" size={24} color="#FFFFFF" />
                        </TouchableOpacity>

                        <View style={styles.logoContainer}>
                            <Image
                                source={require('@/assets/logo.png')}
                                style={styles.logoSmall}
                                resizeMode="contain"
                            />
                        </View>

                        <TouchableOpacity
                            style={styles.notificationButton}
                            onPress={() => router.push('/notifications')}
                        >
                            <Icon name="bell" size={22} color="#FFFFFF" />
                            <View style={styles.notificationBadge} />
                        </TouchableOpacity>
                    </View>

                    {/* Greeting & Status */}
                    <View style={styles.greetingSection}>
                        <Text style={styles.greeting}>{getGreeting()}, {mockUser.name}!</Text>
                        <View style={styles.ratingBadge}>
                            <Icon name="star" size={14} color="#FFD700" />
                            <Text style={styles.ratingText}>{mockUser.rating}</Text>
                        </View>
                    </View>

                    {/* Status Toggle Card */}
                    <Animated.View style={[styles.statusCardContainer, { transform: [{ scale: statusScaleAnim }] }]}>
                        <TouchableOpacity
                            style={[styles.statusCard, !isOnline && styles.statusCardOffline]}
                            onPress={handleToggleStatus}
                            activeOpacity={0.9}
                        >
                            <View style={styles.statusLeft}>
                                <View style={[styles.statusIndicator, isOnline && styles.statusIndicatorOnline]}>
                                    {isOnline && (
                                        <Animated.View
                                            style={[
                                                styles.statusPulse,
                                                {
                                                    transform: [{ scale: pulseAnim }], opacity: pulseAnim.interpolate({
                                                        inputRange: [1, 1.3],
                                                        outputRange: [0.5, 0]
                                                    })
                                                }
                                            ]}
                                        />
                                    )}
                                    <View style={[styles.statusDot, isOnline && styles.statusDotOnline]} />
                                </View>
                                <View>
                                    <Text style={styles.statusTitle}>
                                        {isOnline ? "You're Online" : "You're Offline"}
                                    </Text>
                                    <Text style={styles.statusSubtitle}>
                                        {isOnline ? 'Ready to receive orders' : 'Tap to go online'}
                                    </Text>
                                </View>
                            </View>
                            <View style={[styles.toggleButton, isOnline && styles.toggleButtonOnline]}>
                                <Icon
                                    name="power"
                                    size={20}
                                    color={isOnline ? colors.primary : colors.light.textMuted}
                                />
                            </View>
                        </TouchableOpacity>
                    </Animated.View>
                </SafeAreaView>
            </View>

            <ScrollView
                style={styles.content}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {/* Earnings Hero Card */}
                <View style={styles.earningsCard}>
                    <View style={styles.earningsHeader}>
                        <Text style={styles.earningsLabel}>Today's Earnings</Text>
                        <TouchableOpacity onPress={() => router.push('/(main)/(tabs)/earnings')}>
                            <Text style={styles.viewAllText}>View Details →</Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.earningsAmount}>₹{mockEarnings.today.toLocaleString()}</Text>

                    {mockEarnings.bonus > 0 && (
                        <View style={styles.bonusBadge}>
                            <Icon name="fire" size={14} color="#FF6B35" />
                            <Text style={styles.bonusText}>+₹{mockEarnings.bonus} bonus earned!</Text>
                        </View>
                    )}

                    {/* Stats Grid */}
                    <View style={styles.statsGrid}>
                        <View style={styles.statItem}>
                            <View style={[styles.statIconContainer, { backgroundColor: '#E8F8F0' }]}>
                                <Icon name="package" size={18} color={colors.primary} />
                            </View>
                            <Text style={styles.statValue}>{mockEarnings.trips}</Text>
                            <Text style={styles.statLabel}>Orders</Text>
                        </View>
                        <View style={styles.statDivider} />
                        <View style={styles.statItem}>
                            <View style={[styles.statIconContainer, { backgroundColor: '#FEF3C7' }]}>
                                <Icon name="time" size={18} color="#D97706" />
                            </View>
                            <Text style={styles.statValue}>{mockEarnings.hours}h</Text>
                            <Text style={styles.statLabel}>Online</Text>
                        </View>
                        <View style={styles.statDivider} />
                        <View style={styles.statItem}>
                            <View style={[styles.statIconContainer, { backgroundColor: '#DBEAFE' }]}>
                                <Icon name="location" size={18} color="#2563EB" />
                            </View>
                            <Text style={styles.statValue}>{mockEarnings.distance}</Text>
                            <Text style={styles.statLabel}>km</Text>
                        </View>
                    </View>
                </View>

                {/* Active Order Card */}
                {currentOrder && (
                    <TouchableOpacity
                        style={styles.activeOrderCard}
                        onPress={handleViewActiveOrder}
                        activeOpacity={0.9}
                    >
                        <View style={styles.activeOrderContent}>
                            <View style={styles.activeOrderLeft}>
                                <View style={styles.activeOrderBadge}>
                                    <View style={styles.activePulse} />
                                    <Text style={styles.activeOrderBadgeText}>ACTIVE</Text>
                                </View>
                                <Text style={styles.activeOrderRestaurant}>{currentOrder.restaurant.name}</Text>
                                <Text style={styles.activeOrderAddress}>
                                    {currentOrder.customer.address.split(',')[0]}
                                </Text>
                            </View>
                            <View style={styles.activeOrderRight}>
                                <Text style={styles.activeOrderEarnings}>₹{currentOrder.earnings.total}</Text>
                                <Icon name="forward" size={20} color="#FFFFFF" />
                            </View>
                        </View>
                    </TouchableOpacity>
                )}

                {/* Waiting for Orders */}
                {isOnline && !currentOrder && (
                    <View style={styles.waitingCard}>
                        <Animated.View style={[styles.waitingPulse, { transform: [{ scale: pulseAnim }] }]} />
                        <View style={styles.waitingDot} />
                        <Text style={styles.waitingText}>Looking for orders nearby...</Text>
                    </View>
                )}

                {/* Offline Prompt */}
                {!isOnline && (
                    <TouchableOpacity
                        style={styles.offlineCard}
                        onPress={handleToggleStatus}
                        activeOpacity={0.9}
                    >
                        <Icon name="moon" size={40} color={colors.light.textMuted} />
                        <Text style={styles.offlineTitle}>You're Currently Offline</Text>
                        <Text style={styles.offlineSubtitle}>Tap the button above to start receiving orders</Text>
                        <View style={styles.goOnlineButton}>
                            <Text style={styles.goOnlineText}>Go Online</Text>
                        </View>
                    </TouchableOpacity>
                )}

                {/* Quick Actions */}
                <View style={styles.quickActions}>
                    <Text style={styles.sectionTitle}>Quick Actions</Text>
                    <View style={styles.actionsGrid}>
                        <TouchableOpacity
                            style={styles.actionCard}
                            onPress={() => router.push('/(main)/(tabs)/earnings')}
                        >
                            <View style={[styles.actionIcon, { backgroundColor: '#E8F8F0' }]}>
                                <Icon name="wallet" size={22} color={colors.primary} />
                            </View>
                            <Text style={styles.actionLabel}>Earnings</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.actionCard}
                            onPress={() => router.push('/(main)/(tabs)/orders')}
                        >
                            <View style={[styles.actionIcon, { backgroundColor: '#FEF3C7' }]}>
                                <Icon name="package" size={22} color="#D97706" />
                            </View>
                            <Text style={styles.actionLabel}>Orders</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.actionCard}
                            onPress={() => router.push('/help')}
                        >
                            <View style={[styles.actionIcon, { backgroundColor: '#DBEAFE' }]}>
                                <Icon name="help" size={22} color="#2563EB" />
                            </View>
                            <Text style={styles.actionLabel}>Support</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.actionCard}
                            onPress={() => router.push('/(main)/(tabs)/profile')}
                        >
                            <View style={[styles.actionIcon, { backgroundColor: '#FCE7F3' }]}>
                                <Icon name="user" size={22} color="#DB2777" />
                            </View>
                            <Text style={styles.actionLabel}>Profile</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Recent Orders */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Recent Orders</Text>
                        <TouchableOpacity onPress={() => router.push('/(main)/(tabs)/orders')}>
                            <Text style={styles.viewAllText}>See All</Text>
                        </TouchableOpacity>
                    </View>

                    {mockOrderHistory.slice(0, 3).map((order, index) => (
                        <View key={order.id} style={[styles.orderCard, index === 0 && styles.orderCardFirst]}>
                            <View style={styles.orderIconContainer}>
                                <Icon name="restaurant" size={20} color={colors.primary} />
                            </View>
                            <View style={styles.orderInfo}>
                                <Text style={styles.orderRestaurant}>{order.restaurant.name}</Text>
                                <Text style={styles.orderRoute}>
                                    {order.restaurant.address.split(',')[0]} → {order.customer.address.split(',')[0]}
                                </Text>
                                <Text style={styles.orderTime}>30 min ago</Text>
                            </View>
                            <View style={styles.orderEarnings}>
                                <Text style={styles.orderAmount}>₹{order.earnings.total}</Text>
                                <View style={styles.completedBadge}>
                                    <Icon name="checkmark" size={10} color={colors.success} />
                                </View>
                            </View>
                        </View>
                    ))}
                </View>
            </ScrollView>

            {/* New Order Modal */}
            <NewOrderModal
                visible={showNewOrderModal}
                order={mockNewOrder}
                onAccept={handleAcceptOrder}
                onDecline={handleDeclineOrder}
                onTimeout={handleOrderTimeout}
            />
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
        paddingBottom: spacing.xl + 40,
    },
    headerOffline: {
        backgroundColor: '#4A5568',
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
    menuButton: {
        width: 40,
        height: 40,
        borderRadius: 12,
        backgroundColor: 'rgba(255,255,255,0.15)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoContainer: {
        flex: 1,
        alignItems: 'center',
    },
    logoSmall: {
        width: 36,
        height: 36,
    },
    notificationButton: {
        width: 40,
        height: 40,
        borderRadius: 12,
        backgroundColor: 'rgba(255,255,255,0.15)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    notificationBadge: {
        position: 'absolute',
        top: 8,
        right: 8,
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#FF6B35',
    },

    // Greeting
    greetingSection: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: spacing.sm,
        marginBottom: spacing.lg,
    },
    greeting: {
        ...typography.h3,
        color: '#FFFFFF',
        flex: 1,
    },
    ratingBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.2)',
        paddingHorizontal: spacing.sm,
        paddingVertical: spacing.xs,
        borderRadius: borderRadius.full,
        gap: 4,
    },
    ratingText: {
        ...typography.smallMedium,
        color: '#FFFFFF',
    },

    // Status Card
    statusCardContainer: {
        marginTop: spacing.sm,
    },
    statusCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: borderRadius.xl,
        padding: spacing.lg,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        ...shadows.lg,
    },
    statusCardOffline: {
        backgroundColor: '#F5F7F6',
    },
    statusLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.md,
    },
    statusIndicator: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: '#F0F0F0',
        justifyContent: 'center',
        alignItems: 'center',
    },
    statusIndicatorOnline: {
        backgroundColor: '#E8F8F0',
    },
    statusPulse: {
        position: 'absolute',
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: colors.primary,
    },
    statusDot: {
        width: 16,
        height: 16,
        borderRadius: 8,
        backgroundColor: '#9CA3AF',
    },
    statusDotOnline: {
        backgroundColor: colors.primary,
    },
    statusTitle: {
        ...typography.bodyMedium,
        color: colors.light.textPrimary,
    },
    statusSubtitle: {
        ...typography.small,
        color: colors.light.textMuted,
        marginTop: 2,
    },
    toggleButton: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#F0F0F0',
        justifyContent: 'center',
        alignItems: 'center',
    },
    toggleButtonOnline: {
        backgroundColor: '#E8F8F0',
    },

    // Content
    content: {
        flex: 1,
        marginTop: -40,
    },
    scrollContent: {
        paddingHorizontal: spacing.xl,
        paddingBottom: spacing['3xl'],
    },

    // Earnings Card
    earningsCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: borderRadius.xl,
        padding: spacing.xl,
        ...shadows.md,
        marginBottom: spacing.lg,
    },
    earningsHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: spacing.sm,
    },
    earningsLabel: {
        ...typography.small,
        color: colors.light.textSecondary,
    },
    viewAllText: {
        ...typography.small,
        color: colors.primary,
        fontWeight: '600',
    },
    earningsAmount: {
        fontSize: 36,
        fontWeight: '700',
        color: colors.light.textPrimary,
        marginBottom: spacing.sm,
    },
    bonusBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF7ED',
        paddingHorizontal: spacing.sm,
        paddingVertical: spacing.xs,
        borderRadius: borderRadius.full,
        alignSelf: 'flex-start',
        marginBottom: spacing.lg,
        gap: 4,
    },
    bonusText: {
        ...typography.small,
        color: '#EA580C',
        fontWeight: '600',
    },
    statsGrid: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingTop: spacing.lg,
        borderTopWidth: 1,
        borderTopColor: '#E5E7EB',
    },
    statItem: {
        alignItems: 'center',
        flex: 1,
    },
    statIconContainer: {
        width: 40,
        height: 40,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: spacing.sm,
    },
    statValue: {
        ...typography.h4,
        color: colors.light.textPrimary,
    },
    statLabel: {
        ...typography.tiny,
        color: colors.light.textMuted,
        marginTop: 2,
    },
    statDivider: {
        width: 1,
        height: 50,
        backgroundColor: '#E5E7EB',
    },

    // Active Order
    activeOrderCard: {
        backgroundColor: colors.primary,
        borderRadius: borderRadius.xl,
        overflow: 'hidden',
        marginBottom: spacing.lg,
        ...shadows.md,
    },
    activeOrderContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: spacing.lg,
    },
    activeOrderLeft: {
        flex: 1,
    },
    activeOrderBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        marginBottom: spacing.sm,
    },
    activePulse: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#FFFFFF',
    },
    activeOrderBadgeText: {
        ...typography.tiny,
        color: '#FFFFFF',
        fontWeight: '700',
        letterSpacing: 1,
    },
    activeOrderRestaurant: {
        ...typography.h4,
        color: '#FFFFFF',
        marginBottom: 2,
    },
    activeOrderAddress: {
        ...typography.small,
        color: 'rgba(255,255,255,0.8)',
    },
    activeOrderRight: {
        alignItems: 'flex-end',
        gap: spacing.sm,
    },
    activeOrderEarnings: {
        ...typography.h3,
        color: '#FFFFFF',
    },

    // Waiting
    waitingCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: borderRadius.xl,
        padding: spacing.xl,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        marginBottom: spacing.lg,
        ...shadows.sm,
    },
    waitingPulse: {
        position: 'absolute',
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: colors.primary,
        opacity: 0.3,
        left: spacing.xl,
    },
    waitingDot: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: colors.primary,
        marginRight: spacing.md,
    },
    waitingText: {
        ...typography.body,
        color: colors.light.textSecondary,
    },

    // Offline
    offlineCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: borderRadius.xl,
        padding: spacing['2xl'],
        alignItems: 'center',
        marginBottom: spacing.lg,
        ...shadows.sm,
    },
    offlineTitle: {
        ...typography.h4,
        color: colors.light.textPrimary,
        marginTop: spacing.lg,
        marginBottom: spacing.xs,
    },
    offlineSubtitle: {
        ...typography.body,
        color: colors.light.textMuted,
        textAlign: 'center',
        marginBottom: spacing.lg,
    },
    goOnlineButton: {
        backgroundColor: colors.primary,
        paddingVertical: spacing.md,
        paddingHorizontal: spacing['2xl'],
        borderRadius: borderRadius.full,
    },
    goOnlineText: {
        ...typography.bodyMedium,
        color: '#FFFFFF',
    },

    // Quick Actions
    quickActions: {
        marginBottom: spacing.xl,
    },
    actionsGrid: {
        flexDirection: 'row',
        gap: spacing.md,
    },
    actionCard: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        borderRadius: borderRadius.lg,
        padding: spacing.lg,
        alignItems: 'center',
        ...shadows.sm,
    },
    actionIcon: {
        width: 48,
        height: 48,
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: spacing.sm,
    },
    actionLabel: {
        ...typography.small,
        color: colors.light.textSecondary,
    },

    // Section
    section: {
        marginBottom: spacing['2xl'],
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: spacing.md,
    },
    sectionTitle: {
        ...typography.h4,
        color: colors.light.textPrimary,
        marginBottom: spacing.md,
    },

    // Order Card
    orderCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: borderRadius.lg,
        padding: spacing.lg,
        marginBottom: spacing.sm,
        ...shadows.sm,
    },
    orderCardFirst: {
        marginTop: 0,
    },
    orderIconContainer: {
        width: 44,
        height: 44,
        borderRadius: 12,
        backgroundColor: '#E8F8F0',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: spacing.md,
    },
    orderInfo: {
        flex: 1,
    },
    orderRestaurant: {
        ...typography.bodyMedium,
        color: colors.light.textPrimary,
        marginBottom: 2,
    },
    orderRoute: {
        ...typography.small,
        color: colors.light.textSecondary,
        marginBottom: 2,
    },
    orderTime: {
        ...typography.tiny,
        color: colors.light.textMuted,
    },
    orderEarnings: {
        alignItems: 'flex-end',
    },
    orderAmount: {
        ...typography.bodyMedium,
        color: colors.primary,
        marginBottom: 4,
    },
    completedBadge: {
        width: 18,
        height: 18,
        borderRadius: 9,
        backgroundColor: '#E8F8F0',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

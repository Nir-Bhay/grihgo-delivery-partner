/**
 * GRIHGO Delivery Partner App - Orders Screen
 * Premium orders screen with brand header, tabs, and enhanced order cards
 */

import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { colors, typography, spacing, borderRadius, shadows } from '@/constants';
import { Card, Badge, Icon } from '@/components/ui';
import { mockOrderHistory, mockActiveOrders } from '@/services/mock';
import { logger } from '@/utils/logger';
import { Order } from '@/types';

const TAG = 'OrdersScreen';

type Tab = 'active' | 'history';

export default function OrdersScreen() {
    const [tab, setTab] = useState<Tab>('history');

    useEffect(() => {
        logger.lifecycle(TAG, 'mount');
        return () => logger.lifecycle(TAG, 'unmount');
    }, []);

    const getStatusConfig = (status: string) => {
        switch (status) {
            case 'DELIVERED':
                return { text: 'Completed', color: colors.success, bgColor: '#E8F8F0', icon: 'checkmark' };
            case 'CANCELLED':
                return { text: 'Cancelled', color: colors.error, bgColor: '#FEE2E2', icon: 'close' };
            case 'PICKED_UP':
            case 'EN_ROUTE':
                return { text: 'In Transit', color: '#D97706', bgColor: '#FEF3C7', icon: 'scooter' };
            default:
                return { text: 'Active', color: '#2563EB', bgColor: '#DBEAFE', icon: 'time' };
        }
    };

    const formatTime = (date: Date) => {
        const now = new Date();
        const diff = now.getTime() - date.getTime();
        const hours = Math.floor(diff / (1000 * 60 * 60));
        if (hours < 1) return 'Just now';
        if (hours < 24) return `${hours}h ago`;
        const days = Math.floor(hours / 24);
        return `${days}d ago`;
    };

    const handleOrderPress = (orderId: string) => {
        logger.navigate(TAG, 'orderDetails', { orderId });
        router.push(`/order/${orderId}`);
    };

    const renderOrder = ({ item: order }: { item: Order }) => {
        const statusConfig = getStatusConfig(order.status);

        return (
            <TouchableOpacity
                style={styles.orderCard}
                onPress={() => handleOrderPress(order.id)}
                activeOpacity={0.9}
            >
                {/* Status indicator bar */}
                <View style={[styles.statusBar, { backgroundColor: statusConfig.color }]} />

                <View style={styles.orderContent}>
                    <View style={styles.orderHeader}>
                        <View style={styles.orderIdRow}>
                            <Text style={styles.orderId}>#{order.id}</Text>
                            <View style={[styles.statusBadge, { backgroundColor: statusConfig.bgColor }]}>
                                <Icon name={statusConfig.icon as any} size={10} color={statusConfig.color} />
                                <Text style={[styles.statusText, { color: statusConfig.color }]}>
                                    {statusConfig.text}
                                </Text>
                            </View>
                        </View>
                        <Text style={styles.time}>{formatTime(order.createdAt)}</Text>
                    </View>

                    <View style={styles.orderBody}>
                        <View style={styles.restaurantRow}>
                            <View style={styles.restaurantIcon}>
                                <Icon name="restaurant" size={18} color={colors.primary} />
                            </View>
                            <View style={styles.restaurantInfo}>
                                <Text style={styles.restaurantName}>{order.restaurant.name}</Text>
                                <Text style={styles.route}>
                                    {order.restaurant.address.split(',')[0]} → {order.customer.address.split(',')[0]}
                                </Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.orderFooter}>
                        <View style={styles.distanceBadge}>
                            <Icon name="location" size={12} color={colors.light.textMuted} />
                            <Text style={styles.distanceText}>{order.distance} km</Text>
                        </View>

                        <View style={styles.earningsRow}>
                            {order.earnings.tip > 0 && (
                                <View style={styles.tipBadge}>
                                    <Icon name="heart" size={10} color="#D97706" />
                                    <Text style={styles.tipText}>+₹{order.earnings.tip}</Text>
                                </View>
                            )}
                            <Text style={styles.amount}>₹{order.earnings.total}</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    const orders = tab === 'active' ? mockActiveOrders : mockOrderHistory;

    return (
        <View style={styles.container}>
            {/* Brand Header */}
            <View style={styles.headerGradient}>
                <SafeAreaView edges={['top']} style={styles.headerSafe}>
                    <View style={styles.topBar}>
                        <Text style={styles.headerTitle}>Orders</Text>
                        <View style={styles.headerBadge}>
                            <Text style={styles.headerBadgeText}>{mockOrderHistory.length} Total</Text>
                        </View>
                    </View>

                    {/* Tabs */}
                    <View style={styles.tabs}>
                        <TouchableOpacity
                            style={[styles.tab, tab === 'active' && styles.tabActive]}
                            onPress={() => setTab('active')}
                        >
                            {mockActiveOrders.length > 0 && (
                                <View style={styles.tabDot} />
                            )}
                            <Text style={[styles.tabText, tab === 'active' && styles.tabTextActive]}>
                                Active
                            </Text>
                            {mockActiveOrders.length > 0 && (
                                <View style={[styles.tabCount, tab === 'active' && styles.tabCountActive]}>
                                    <Text style={[styles.tabCountText, tab === 'active' && styles.tabCountTextActive]}>
                                        {mockActiveOrders.length}
                                    </Text>
                                </View>
                            )}
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.tab, tab === 'history' && styles.tabActive]}
                            onPress={() => setTab('history')}
                        >
                            <Text style={[styles.tabText, tab === 'history' && styles.tabTextActive]}>
                                History
                            </Text>
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
            </View>

            {/* Orders List */}
            <FlatList
                data={orders}
                keyExtractor={(item) => item.id}
                renderItem={renderOrder}
                contentContainerStyle={styles.list}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={
                    <View style={styles.empty}>
                        <View style={styles.emptyIcon}>
                            <Icon name="package" size={48} color={colors.light.textMuted} />
                        </View>
                        <Text style={styles.emptyTitle}>No orders yet</Text>
                        <Text style={styles.emptySubtitle}>
                            {tab === 'active'
                                ? 'Go online to start receiving orders'
                                : 'Your completed orders will appear here'
                            }
                        </Text>
                    </View>
                }
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
        paddingBottom: spacing.md,
    },
    headerSafe: {
        paddingHorizontal: spacing.xl,
    },
    topBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: spacing.md,
        marginBottom: spacing.lg,
    },
    headerTitle: {
        ...typography.h3,
        color: '#FFFFFF',
    },
    headerBadge: {
        backgroundColor: 'rgba(255,255,255,0.2)',
        paddingHorizontal: spacing.sm,
        paddingVertical: spacing.xs,
        borderRadius: borderRadius.full,
    },
    headerBadgeText: {
        ...typography.tiny,
        color: '#FFFFFF',
    },

    // Tabs
    tabs: {
        flexDirection: 'row',
        backgroundColor: 'rgba(255,255,255,0.15)',
        borderRadius: borderRadius.lg,
        padding: 4,
    },
    tab: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: spacing.sm,
        borderRadius: borderRadius.md,
        gap: 6,
    },
    tabActive: {
        backgroundColor: '#FFFFFF',
    },
    tabDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: '#FF6B35',
    },
    tabText: {
        ...typography.small,
        color: 'rgba(255,255,255,0.7)',
    },
    tabTextActive: {
        color: colors.primary,
        fontWeight: '600',
    },
    tabCount: {
        backgroundColor: 'rgba(255,255,255,0.3)',
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: borderRadius.full,
    },
    tabCountActive: {
        backgroundColor: '#E8F8F0',
    },
    tabCountText: {
        ...typography.tiny,
        color: '#FFFFFF',
    },
    tabCountTextActive: {
        color: colors.primary,
    },

    // List
    list: {
        padding: spacing.xl,
        paddingBottom: spacing['3xl'],
    },

    // Order Card
    orderCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: borderRadius.xl,
        marginBottom: spacing.md,
        overflow: 'hidden',
        ...shadows.sm,
    },
    statusBar: {
        height: 3,
    },
    orderContent: {
        padding: spacing.lg,
    },
    orderHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: spacing.md,
    },
    orderIdRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.sm,
    },
    orderId: {
        ...typography.small,
        color: colors.light.textMuted,
    },
    statusBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: spacing.sm,
        paddingVertical: 4,
        borderRadius: borderRadius.full,
        gap: 4,
    },
    statusText: {
        ...typography.tiny,
        fontWeight: '600',
    },
    time: {
        ...typography.tiny,
        color: colors.light.textMuted,
    },

    orderBody: {
        marginBottom: spacing.md,
    },
    restaurantRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    restaurantIcon: {
        width: 40,
        height: 40,
        borderRadius: 10,
        backgroundColor: '#E8F8F0',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: spacing.md,
    },
    restaurantInfo: {
        flex: 1,
    },
    restaurantName: {
        ...typography.bodyMedium,
        color: colors.light.textPrimary,
        marginBottom: 2,
    },
    route: {
        ...typography.small,
        color: colors.light.textSecondary,
    },

    orderFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: spacing.md,
        borderTopWidth: 1,
        borderTopColor: '#F3F4F6',
    },
    distanceBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    distanceText: {
        ...typography.small,
        color: colors.light.textMuted,
    },
    earningsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.sm,
    },
    tipBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FEF3C7',
        paddingHorizontal: spacing.sm,
        paddingVertical: 2,
        borderRadius: borderRadius.full,
        gap: 4,
    },
    tipText: {
        ...typography.tiny,
        color: '#D97706',
        fontWeight: '600',
    },
    amount: {
        ...typography.h4,
        color: colors.primary,
    },

    // Empty
    empty: {
        alignItems: 'center',
        paddingVertical: spacing['4xl'],
    },
    emptyIcon: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#F3F4F6',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: spacing.lg,
    },
    emptyTitle: {
        ...typography.h4,
        color: colors.light.textPrimary,
        marginBottom: spacing.xs,
    },
    emptySubtitle: {
        ...typography.body,
        color: colors.light.textMuted,
        textAlign: 'center',
    },
});

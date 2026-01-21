/**
 * GRIHGO Delivery Partner App - Notifications Screen
 * Premium notifications with brand header and enhanced styling
 */

import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { colors, typography, spacing, borderRadius, shadows } from '@/constants';
import { Icon, IconName } from '@/components/ui';
import { logger } from '@/utils/logger';
import { NotificationItem } from '@/types';

const TAG = 'NotificationsScreen';

const mockNotifications: NotificationItem[] = [
    {
        id: '1',
        type: 'ORDER',
        title: 'New Order Available',
        message: 'A new order is available near your location',
        timestamp: new Date(Date.now() - 5 * 60 * 1000),
        read: false,
    },
    {
        id: '2',
        type: 'EARNINGS',
        title: 'Weekly Earnings Updated',
        message: 'Your weekly earnings of ₹28,500 have been calculated',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        read: false,
    },
    {
        id: '3',
        type: 'BONUS',
        title: 'Peak Hour Bonus Active!',
        message: 'Earn extra ₹20 per order between 12-2 PM',
        timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
        read: true,
    },
    {
        id: '4',
        type: 'PROMO',
        title: 'Complete 100 deliveries',
        message: 'Complete 100 deliveries this month for ₹500 bonus',
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
        read: true,
    },
];

const getIconConfig = (type: string): { name: IconName; color: string; bgColor: string } => {
    switch (type) {
        case 'ORDER': return { name: 'package', color: colors.primary, bgColor: '#E8F8F0' };
        case 'EARNINGS': return { name: 'wallet', color: '#2563EB', bgColor: '#DBEAFE' };
        case 'BONUS': return { name: 'trophy', color: '#D97706', bgColor: '#FEF3C7' };
        case 'ALERT': return { name: 'warning', color: colors.error, bgColor: '#FEE2E2' };
        case 'PROMO': return { name: 'fire', color: '#DB2777', bgColor: '#FCE7F3' };
        default: return { name: 'bell', color: colors.light.textMuted, bgColor: '#F3F4F6' };
    }
};

export default function NotificationsScreen() {
    const [notifications, setNotifications] = useState(mockNotifications);

    useEffect(() => {
        logger.lifecycle(TAG, 'mount');
        return () => logger.lifecycle(TAG, 'unmount');
    }, []);

    const formatTime = (date: Date) => {
        const diff = Date.now() - date.getTime();
        const minutes = Math.floor(diff / (1000 * 60));
        if (minutes < 60) return `${minutes}m ago`;
        const hours = Math.floor(minutes / 60);
        if (hours < 24) return `${hours}h ago`;
        return `${Math.floor(hours / 24)}d ago`;
    };

    const handleNotificationPress = (id: string) => {
        logger.action(TAG, 'openNotification', { id });
        setNotifications(prev =>
            prev.map(n => n.id === id ? { ...n, read: true } : n)
        );
    };

    const handleMarkAllRead = () => {
        setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    };

    const unreadCount = notifications.filter(n => !n.read).length;

    return (
        <View style={styles.container}>
            {/* Brand Header */}
            <View style={styles.headerGradient}>
                <SafeAreaView edges={['top']} style={styles.headerSafe}>
                    <View style={styles.topBar}>
                        <TouchableOpacity
                            style={styles.backButton}
                            onPress={() => router.back()}
                        >
                            <Icon name="back" size={24} color="#FFFFFF" />
                        </TouchableOpacity>
                        <Text style={styles.headerTitle}>Notifications</Text>
                        <TouchableOpacity
                            style={styles.markReadButton}
                            onPress={handleMarkAllRead}
                        >
                            <Icon name="checkmark" size={16} color="#FFFFFF" />
                        </TouchableOpacity>
                    </View>

                    {unreadCount > 0 && (
                        <View style={styles.unreadBadge}>
                            <Text style={styles.unreadBadgeText}>{unreadCount} unread</Text>
                        </View>
                    )}
                </SafeAreaView>
            </View>

            <FlatList
                data={notifications}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.list}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => {
                    const iconConfig = getIconConfig(item.type);
                    return (
                        <TouchableOpacity
                            style={[styles.notificationCard, !item.read && styles.unreadCard]}
                            onPress={() => handleNotificationPress(item.id)}
                            activeOpacity={0.9}
                        >
                            <View style={[styles.iconContainer, { backgroundColor: iconConfig.bgColor }]}>
                                <Icon name={iconConfig.name} size={18} color={iconConfig.color} />
                            </View>
                            <View style={styles.content}>
                                <View style={styles.titleRow}>
                                    <Text style={styles.title}>{item.title}</Text>
                                    {!item.read && <View style={styles.unreadDot} />}
                                </View>
                                <Text style={styles.message}>{item.message}</Text>
                                <Text style={styles.time}>{formatTime(item.timestamp)}</Text>
                            </View>
                        </TouchableOpacity>
                    );
                }}
                ListEmptyComponent={
                    <View style={styles.empty}>
                        <View style={styles.emptyIcon}>
                            <Icon name="bell" size={40} color={colors.light.textMuted} />
                        </View>
                        <Text style={styles.emptyTitle}>No notifications</Text>
                        <Text style={styles.emptySubtitle}>You're all caught up!</Text>
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
    },
    headerSafe: {
        paddingHorizontal: spacing.xl,
        paddingBottom: spacing.lg,
    },
    topBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: spacing.lg,
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 12,
        backgroundColor: 'rgba(255,255,255,0.15)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTitle: {
        ...typography.h4,
        color: '#FFFFFF',
    },
    markReadButton: {
        width: 40,
        height: 40,
        borderRadius: 12,
        backgroundColor: 'rgba(255,255,255,0.15)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    unreadBadge: {
        backgroundColor: 'rgba(255,255,255,0.2)',
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.xs,
        borderRadius: borderRadius.full,
        alignSelf: 'flex-start',
    },
    unreadBadgeText: {
        ...typography.tiny,
        color: '#FFFFFF',
    },

    // List
    list: {
        padding: spacing.xl,
        paddingBottom: spacing['3xl'],
    },

    // Notification Card
    notificationCard: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        borderRadius: borderRadius.xl,
        padding: spacing.lg,
        marginBottom: spacing.md,
        ...shadows.sm,
    },
    unreadCard: {
        borderLeftWidth: 3,
        borderLeftColor: colors.primary,
    },
    iconContainer: {
        width: 44,
        height: 44,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: spacing.md,
    },
    content: {
        flex: 1,
    },
    titleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: spacing.xs,
    },
    title: {
        ...typography.bodyMedium,
        color: colors.light.textPrimary,
        flex: 1,
    },
    unreadDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: colors.primary,
    },
    message: {
        ...typography.small,
        color: colors.light.textSecondary,
        marginBottom: spacing.xs,
    },
    time: {
        ...typography.tiny,
        color: colors.light.textMuted,
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
    },
});
